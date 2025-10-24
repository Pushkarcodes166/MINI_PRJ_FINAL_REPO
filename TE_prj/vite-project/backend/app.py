from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
import numpy as np
import difflib
import os

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
