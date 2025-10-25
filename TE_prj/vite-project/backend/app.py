from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
import numpy as np
import difflib
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load dataset from CSV (robustly read rows of correct length)
csv_path = r'c:/Users/Eesha Potnis/Desktop/f1/TE_prj/vite-project/src/data/science_careers.csv'
import csv
clean_rows = []
with open(csv_path, encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    expected_len = len(header)
    for row in reader:
        if len(row) == expected_len:
            clean_rows.append(row)
        # else: skip malformed row
data = pd.DataFrame(clean_rows, columns=header)

# Normalize title column if present
if 'title' not in data.columns and 'career' in data.columns:
    data['title'] = data['career']

data['title_norm'] = data['title'].astype(str).str.strip().str.lower()

def find_career_row(career_query: str):
    """Try exact match, then substring match, then fuzzy match on the title column."""
    if not career_query:
        return None
    q = career_query.strip().lower()

    # exact match
    row = data[data['title_norm'] == q]
    if not row.empty:
        return row.iloc[0]

    # substring match
    row = data[data['title_norm'].str.contains(q, na=False)]
    if not row.empty:
        return row.iloc[0]

    # try fuzzy match against available titles
    titles = data['title_norm'].dropna().unique().tolist()
    matches = difflib.get_close_matches(q, titles, n=1, cutoff=0.6)
    if matches:
        row = data[data['title_norm'] == matches[0]]
        if not row.empty:
            return row.iloc[0]

    return None

# Prepare features for demo ML (if columns exist)
data['recommended_12th_subjects'] = data.get('recommended_12th_subjects', pd.Series([''] * len(data)))
data['interest'] = data['recommended_12th_subjects'].astype(str).str.split('|').str[0].str.lower()
data['skill'] = data['title'].astype(str).str.extract(r'(Engineering|Science|Design|Medical|Pharmacy|Architecture|Data Science|Environmental|Agriculture|Veterinary|Forensic|Marine|Geology|Astronomy|Interdisciplinary)', expand=False).fillna('general').str.lower()
data['marks'] = 80
data['career'] = data['title']

interest_map = {v: i for i, v in enumerate(data['interest'].unique())}
skill_map = {v: i for i, v in enumerate(data['skill'].unique())}
career_map = {v: i for i, v in enumerate(data['career'].unique())}
career_map_rev = {i: v for v, i in career_map.items()}

data['interest_enc'] = data['interest'].map(interest_map)
data['skill_enc'] = data['skill'].map(skill_map)
data['career_enc'] = data['career'].map(career_map)

X = data[['marks', 'interest_enc', 'skill_enc']]
y = data['career_enc']

clf = DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf.fit(X, y)

def get_metrics(X, y, clf):
    y_pred = clf.predict(X)
    cm = confusion_matrix(y, y_pred)
    acc = accuracy_score(y, y_pred)
    prec = precision_score(y, y_pred, average='macro', zero_division=0)
    rec = recall_score(y, y_pred, average='macro', zero_division=0)
    f1 = f1_score(y, y_pred, average='macro', zero_division=0)
    return {
        'confusion_matrix': cm.tolist(),
        'accuracy': acc,
        'precision': prec,
        'recall': rec,
        'f1_score': f1
    }


@app.route('/roadmap-details', methods=['GET'])
def roadmap_details():
    # Accept career from query param ?career= or from JSON body or form data
    career = request.args.get('career') or (request.get_json(silent=True) or {}).get('career') or request.form.get('career')
    if not career:
        return jsonify({'error': 'Career not specified'}), 400

    row = find_career_row(career)
    if row is None:
        return jsonify({'error': 'Career not found'}), 404

    details = row.to_dict()
    # Ensure roadmap_steps is an array
    if 'roadmap_steps' in details and isinstance(details['roadmap_steps'], str):
        details['roadmap_steps'] = [s for s in details['roadmap_steps'].split('|') if s]
    else:
        details['roadmap_steps'] = details.get('roadmap_steps') or []
    return jsonify(details)


@app.route('/predict', methods=['POST'])
def predict():
    req = request.get_json()
    marks = req.get('marks', 80)  # Default to 80 if not provided
    interest = (req.get('interest') or '').lower()
    skill = (req.get('skill') or '').lower()
    interest_enc = interest_map.get(interest, 0)
    skill_enc = skill_map.get(skill, 0)
    X_new = np.array([[marks, interest_enc, skill_enc]])
    pred = clf.predict(X_new)[0]
    career_title = data[data['career_enc'] == pred]['title'].values[0] if pred in data['career_enc'].values else 'Unknown'
    return jsonify({'career': career_title})


@app.route('/metrics', methods=['GET'])
def metrics():
    m = get_metrics(X, y, clf)
    tree_rules = export_text(clf, feature_names=['marks', 'interest', 'skill'])
    return jsonify({
        'metrics': m,
        'tree': tree_rules
    })


# Data storage for admin-managed content (in production, use a database)
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')
FEEDBACK_FILE = os.path.join(DATA_DIR, 'feedback.json')

def load_feedback():
    if os.path.exists(FEEDBACK_FILE):
        with open(FEEDBACK_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_feedback(feedback_data):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(FEEDBACK_FILE, 'w') as f:
        json.dump(feedback_data, f, indent=2)

# Admin authentication (simple for demo - in production use proper auth)
def check_admin_auth():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return False
    token = auth_header.split(' ')[1]
    # Simple token check - in production use JWT or proper auth
    return token == 'admin-token-123'

@app.route('/admin/roadmaps', methods=['GET', 'POST', 'PUT', 'DELETE'])
def admin_roadmaps():
    if not check_admin_auth():
        return jsonify({'error': 'Unauthorized'}), 401

    if request.method == 'GET':
        # Return current roadmaps data
        try:
            with open(os.path.join(DATA_DIR, 'careerRoadmaps.js'), 'r') as f:
                content = f.read()
                # Extract the JSON part (remove export const ...)
                start = content.find('{')
                end = content.rfind('}') + 1
                roadmaps = json.loads(content[start:end])
                return jsonify(roadmaps)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method in ['POST', 'PUT']:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        try:
            # Load existing roadmaps
            with open(os.path.join(DATA_DIR, 'careerRoadmaps.js'), 'r') as f:
                content = f.read()
                start = content.find('{')
                end = content.rfind('}') + 1
                roadmaps = json.loads(content[start:end])

            # Update or add roadmap
            key = data.get('key')
            if not key:
                return jsonify({'error': 'Roadmap key required'}), 400

            roadmaps[key] = data['data']

            # Save back
            updated_content = f"export const careerRoadmaps = {json.dumps(roadmaps, indent=2)};"
            with open(os.path.join(DATA_DIR, 'careerRoadmaps.js'), 'w') as f:
                f.write(updated_content)

            return jsonify({'message': 'Roadmap updated successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'DELETE':
        key = request.args.get('key')
        if not key:
            return jsonify({'error': 'Roadmap key required'}), 400

        try:
            with open(os.path.join(DATA_DIR, 'careerRoadmaps.js'), 'r') as f:
                content = f.read()
                start = content.find('{')
                end = content.rfind('}') + 1
                roadmaps = json.loads(content[start:end])

            if key in roadmaps:
                del roadmaps[key]

                updated_content = f"export const careerRoadmaps = {json.dumps(roadmaps, indent=2)};"
                with open(os.path.join(DATA_DIR, 'careerRoadmaps.js'), 'w') as f:
                    f.write(updated_content)

                return jsonify({'message': 'Roadmap deleted successfully'})
            else:
                return jsonify({'error': 'Roadmap not found'}), 404

        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/admin/jobs', methods=['GET', 'POST', 'PUT', 'DELETE'])
def admin_jobs():
    if not check_admin_auth():
        return jsonify({'error': 'Unauthorized'}), 401

    jobs_file = os.path.join(DATA_DIR, 'jobs.js')

    if request.method == 'GET':
        try:
            with open(jobs_file, 'r') as f:
                content = f.read()
                # Extract array part
                start = content.find('[')
                end = content.rfind(']') + 1
                jobs = json.loads(content[start:end])
                return jsonify(jobs)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        try:
            with open(jobs_file, 'r') as f:
                content = f.read()
                start = content.find('[')
                end = content.rfind(']') + 1
                jobs = json.loads(content[start:end])

            # Add new job with ID
            data['id'] = max([j.get('id', 0) for j in jobs] + [0]) + 1
            jobs.append(data)

            updated_content = f"export const jobs = {json.dumps(jobs, indent=2)};"
            with open(jobs_file, 'w') as f:
                f.write(updated_content)

            return jsonify({'message': 'Job added successfully', 'id': data['id']})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'PUT':
        data = request.get_json()
        if not data or 'id' not in data:
            return jsonify({'error': 'Job ID required'}), 400

        try:
            with open(jobs_file, 'r') as f:
                content = f.read()
                start = content.find('[')
                end = content.rfind(']') + 1
                jobs = json.loads(content[start:end])

            # Find and update job
            for i, job in enumerate(jobs):
                if job.get('id') == data['id']:
                    jobs[i] = data
                    break
            else:
                return jsonify({'error': 'Job not found'}), 404

            updated_content = f"export const jobs = {json.dumps(jobs, indent=2)};"
            with open(jobs_file, 'w') as f:
                f.write(updated_content)

            return jsonify({'message': 'Job updated successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'DELETE':
        job_id = request.args.get('id', type=int)
        if job_id is None:
            return jsonify({'error': 'Job ID required'}), 400

        try:
            with open(jobs_file, 'r') as f:
                content = f.read()
                start = content.find('[')
                end = content.rfind(']') + 1
                jobs = json.loads(content[start:end])

            jobs = [j for j in jobs if j.get('id') != job_id]

            updated_content = f"export const jobs = {json.dumps(jobs, indent=2)};"
            with open(jobs_file, 'w') as f:
                f.write(updated_content)

            return jsonify({'message': 'Job deleted successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/admin/opportunities', methods=['GET', 'POST', 'PUT', 'DELETE'])
def admin_opportunities():
    if not check_admin_auth():
        return jsonify({'error': 'Unauthorized'}), 401

    opp_file = os.path.join(DATA_DIR, 'opportunities.js')

    if request.method == 'GET':
        try:
            with open(opp_file, 'r') as f:
                content = f.read()
                start = content.find('[')
                end = content.rfind(']') + 1
                opportunities = json.loads(content[start:end])
                return jsonify(opportunities)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        try:
            with open(opp_file, 'r') as f:
                content = f.read()
                start = content.find('[')
                end = content.rfind(']') + 1
                opportunities = json.loads(content[start:end])

            data['id'] = max([o.get('id', 0) for o in opportunities] + [0]) + 1
            opportunities.append(data)

            updated_content = f"export const opportunities = {json.dumps(opportunities, indent=2)};"
            with open(opp_file, 'w') as f:
                f.write(updated_content)

            return jsonify({'message': 'Opportunity added successfully', 'id': data['id']})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'PUT':
        data = request.get_json()
        if not data or 'id' not in data:
            return jsonify({'error': 'Opportunity ID required'}), 400

        try:
            with open(opp_file, 'r') as f:
                content = f.read()
                start = content.find('[')
                end = content.rfind(']') + 1
                opportunities = json.loads(content[start:end])

            for i, opp in enumerate(opportunities):
                if opp.get('id') == data['id']:
                    opportunities[i] = data
                    break
            else:
                return jsonify({'error': 'Opportunity not found'}), 404

            updated_content = f"export const opportunities = {json.dumps(opportunities, indent=2)};"
            with open(opp_file, 'w') as f:
                f.write(updated_content)

            return jsonify({'message': 'Opportunity updated successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'DELETE':
        opp_id = request.args.get('id', type=int)
        if opp_id is None:
            return jsonify({'error': 'Opportunity ID required'}), 400

        try:
            with open(opp_file, 'r') as f:
                content = f.read()
                start = content.find('[')
                end = content.rfind(']') + 1
                opportunities = json.loads(content[start:end])

            opportunities = [o for o in opportunities if o.get('id') != opp_id]

            updated_content = f"export const opportunities = {json.dumps(opportunities, indent=2)};"
            with open(opp_file, 'w') as f:
                f.write(updated_content)

            return jsonify({'message': 'Opportunity deleted successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/feedback', methods=['GET', 'POST'])
def feedback():
    if request.method == 'GET':
        career = request.args.get('career')
        if career:
            feedback_data = load_feedback()
            career_feedback = feedback_data.get(career, [])
            return jsonify(career_feedback)
        else:
            return jsonify(load_feedback())

    elif request.method == 'POST':
        data = request.get_json()
        if not data or 'career' not in data or 'rating' not in data:
            return jsonify({'error': 'Career and rating required'}), 400

        feedback_data = load_feedback()
        if data['career'] not in feedback_data:
            feedback_data[data['career']] = []

        feedback_entry = {
            'rating': data['rating'],
            'comment': data.get('comment', ''),
            'timestamp': datetime.now().isoformat(),
            'user_id': data.get('user_id', 'anonymous')
        }

        feedback_data[data['career']].append(feedback_entry)
        save_feedback(feedback_data)

        return jsonify({'message': 'Feedback submitted successfully'})

@app.route('/feedback/aggregate', methods=['GET'])
def feedback_aggregate():
    feedback_data = load_feedback()
    aggregates = {}

    for career, feedbacks in feedback_data.items():
        if feedbacks:
            ratings = [f['rating'] for f in feedbacks]
            aggregates[career] = {
                'average_rating': sum(ratings) / len(ratings),
                'total_reviews': len(ratings),
                'rating_distribution': {
                    1: ratings.count(1),
                    2: ratings.count(2),
                    3: ratings.count(3),
                    4: ratings.count(4),
                    5: ratings.count(5)
                }
            }
        else:
            aggregates[career] = {
                'average_rating': 0,
                'total_reviews': 0,
                'rating_distribution': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
            }

    return jsonify(aggregates)

# Community & Networking Endpoints

@app.route('/forums', methods=['GET', 'POST'])
def forums():
    forums_file = os.path.join(DATA_DIR, 'forums.json')

    if request.method == 'GET':
        career = request.args.get('career')
        try:
            if os.path.exists(forums_file):
                with open(forums_file, 'r') as f:
                    forums_data = json.load(f)
            else:
                forums_data = {}

            if career:
                return jsonify(forums_data.get(career, []))
            else:
                return jsonify(forums_data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'POST':
        data = request.get_json()
        if not data or 'career' not in data or 'title' not in data or 'content' not in data:
            return jsonify({'error': 'Career, title, and content required'}), 400

        try:
            if os.path.exists(forums_file):
                with open(forums_file, 'r') as f:
                    forums_data = json.load(f)
            else:
                forums_data = {}

            if data['career'] not in forums_data:
                forums_data[data['career']] = []

            post = {
                'id': len(forums_data[data['career']]) + 1,
                'title': data['title'],
                'content': data['content'],
                'author': data.get('author', 'Anonymous'),
                'replies': [],
                'timestamp': datetime.now().isoformat()
            }

            forums_data[data['career']].append(post)
            with open(forums_file, 'w') as f:
                json.dump(forums_data, f, indent=2)

            return jsonify({'message': 'Post created successfully', 'id': post['id']})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/forums/<int:post_id>/reply', methods=['POST'])
def forum_reply(post_id):
    data = request.get_json()
    if not data or 'career' not in data or 'content' not in data:
        return jsonify({'error': 'Career and content required'}), 400

    forums_file = os.path.join(DATA_DIR, 'forums.json')

    try:
        if os.path.exists(forums_file):
            with open(forums_file, 'r') as f:
                forums_data = json.load(f)
        else:
            return jsonify({'error': 'Forum not found'}), 404

        career_posts = forums_data.get(data['career'], [])
        for post in career_posts:
            if post['id'] == post_id:
                reply = {
                    'content': data['content'],
                    'author': data.get('author', 'Anonymous'),
                    'timestamp': datetime.now().isoformat()
                }
                post['replies'].append(reply)
                break
        else:
            return jsonify({'error': 'Post not found'}), 404

        with open(forums_file, 'w') as f:
            json.dump(forums_data, f, indent=2)

        return jsonify({'message': 'Reply added successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/user-content', methods=['GET', 'POST'])
def user_content():
    content_file = os.path.join(DATA_DIR, 'user_content.json')

    if request.method == 'GET':
        content_type = request.args.get('type')
        try:
            if os.path.exists(content_file):
                with open(content_file, 'r') as f:
                    content_data = json.load(f)
            else:
                content_data = []

            if content_type:
                filtered = [c for c in content_data if c.get('type') == content_type]
                return jsonify(filtered)
            else:
                return jsonify(content_data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'POST':
        data = request.get_json()
        if not data or 'type' not in data or 'title' not in data or 'content' not in data:
            return jsonify({'error': 'Type, title, and content required'}), 400

        try:
            if os.path.exists(content_file):
                with open(content_file, 'r') as f:
                    content_data = json.load(f)
            else:
                content_data = []

            content = {
                'id': len(content_data) + 1,
                'type': data['type'],
                'title': data['title'],
                'content': data['content'],
                'author': data.get('author', 'Anonymous'),
                'tags': data.get('tags', []),
                'timestamp': datetime.now().isoformat()
            }

            content_data.append(content)
            with open(content_file, 'w') as f:
                json.dump(content_data, f, indent=2)

            return jsonify({'message': 'Content submitted successfully', 'id': content['id']})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/mentors', methods=['GET'])
def mentors():
    mentors_file = os.path.join(DATA_DIR, 'mentors.json')

    try:
        if os.path.exists(mentors_file):
            with open(mentors_file, 'r') as f:
                mentors_data = json.load(f)
        else:
            # Default mentors data
            mentors_data = [
                {'id': 1, 'name': 'John Doe', 'career': 'Software Engineer', 'experience': '10 years', 'availability': 'Weekends'},
                {'id': 2, 'name': 'Jane Smith', 'career': 'Data Scientist', 'experience': '8 years', 'availability': 'Evenings'}
            ]
            with open(mentors_file, 'w') as f:
                json.dump(mentors_data, f, indent=2)

        return jsonify(mentors_data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Print accuracy
    y_pred = clf.predict(X)
    acc = accuracy_score(y, y_pred)
    print(f"Model Accuracy: {acc:.2f}")
    # Print info gain (feature importances)
    importances = clf.feature_importances_
    feature_names = ['marks', 'interest', 'skill']
    print("Information Gain (Feature Importances):")
    for name, imp in zip(feature_names, importances):
        print(f"  {name}: {imp:.4f}")
    port = int(os.environ.get('FLASK_RUN_PORT', 5000))
    host = os.environ.get('FLASK_RUN_HOST', '127.0.0.1')
    app.run(host=host, port=port, debug=True)
