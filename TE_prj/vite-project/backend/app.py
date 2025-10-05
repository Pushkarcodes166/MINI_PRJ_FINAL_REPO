from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
import numpy as np

app = Flask(__name__)
CORS(app)



# Load dataset from CSV
csv_path = r'C:/Users/Eesha Potnis/Desktop/TE_prj_final/TE_prj/vite-project/src/data/science_careers.csv'
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

# For ML, create synthetic features for demo (since CSV is descriptive)
# We'll use recommended_12th_subjects, title, and id for mapping
data['interest'] = data['recommended_12th_subjects'].str.split('|').str[0].str.lower()
data['skill'] = data['title'].str.extract(r'(Engineering|Science|Design|Medical|Pharmacy|Architecture|Data Science|Environmental|Agriculture|Veterinary|Forensic|Marine|Geology|Astronomy|Interdisciplinary)', expand=False).fillna('general').str.lower()
data['marks'] = 80  # Placeholder, as marks are not in CSV
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

# ...existing route definitions...

@app.route('/roadmap-details', methods=['GET'])
def roadmap_details():
    career = request.args.get('career', '').strip().lower()
    if not career:
        return jsonify({'error': 'Career not specified'}), 400
    # Case-insensitive, whitespace-insensitive match
    row = data[data['title'].str.strip().str.lower() == career]
    if row.empty:
        return jsonify({'error': 'Career not found'}), 404
    details = row.iloc[0].to_dict()
    details['roadmap_steps'] = details['roadmap_steps'].split('|') if 'roadmap_steps' in details else []
    return jsonify(details)
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
import numpy as np

app = Flask(__name__)
CORS(app)


# Load dataset from CSV

csv_path = r'C:/Users/Eesha Potnis/Desktop/TE_prj_final/TE_prj/vite-project/src/data/science_careers.csv'
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

# For ML, create synthetic features for demo (since CSV is descriptive)
# We'll use recommended_12th_subjects, title, and id for mapping
data['interest'] = data['recommended_12th_subjects'].str.split('|').str[0].str.lower()
data['skill'] = data['title'].str.extract(r'(Engineering|Science|Design|Medical|Pharmacy|Architecture|Data Science|Environmental|Agriculture|Veterinary|Forensic|Marine|Geology|Astronomy|Interdisciplinary)', expand=False).fillna('general').str.lower()
data['marks'] = 80  # Placeholder, as marks are not in CSV
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

# Encode categorical features
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

@app.route('/predict', methods=['POST'])
def predict():
    req = request.get_json()
    marks = req.get('marks', 80)  # Default to 80 if not provided
    interest = req.get('interest', '').lower()
    skill = req.get('skill', '').lower()
    interest_enc = interest_map.get(interest, 0)
    skill_enc = skill_map.get(skill, 0)
    X_new = np.array([[marks, interest_enc, skill_enc]])
    pred = clf.predict(X_new)[0]
    # Return the exact career title from CSV
    career_title = data[data['career_enc'] == pred]['title'].values[0] if pred in data['career_enc'].values else 'Unknown'
    return jsonify({'career': career_title})


# Metrics and tree now use CSV dataset
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
    app.run(debug=True)
