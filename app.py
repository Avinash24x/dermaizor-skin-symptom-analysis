from flask import Flask, request, jsonify, render_template
import joblib
import json

# --------------------------------------------------
# Create Flask application
# --------------------------------------------------

app = Flask(__name__)


# --------------------------------------------------
# Load machine learning model and TF-IDF vectorizer
# --------------------------------------------------

model = joblib.load("skin_disease_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")


# --------------------------------------------------
# Load general educational care information
# --------------------------------------------------

with open("first_aid_steps.json", "r", encoding="utf-8") as file:
    first_aid_steps = json.load(file)


# --------------------------------------------------
# Home page
# --------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")


# --------------------------------------------------
# Prediction API
# --------------------------------------------------

@app.route("/predict", methods=["POST"])
def predict():

    try:

        # Get JSON data from frontend
        data = request.get_json()

        # Check whether data was received
        if not data:
            return jsonify({
                "error": "No data was received."
            }), 400

        # Get symptoms
        symptoms = data.get("symptoms", "").strip()

        # Validate symptoms
        if not symptoms:
            return jsonify({
                "error": "Please enter your symptoms."
            }), 400

        # Limit extremely large inputs
        if len(symptoms) > 500:
            return jsonify({
                "error": "Please keep your symptom description under 500 characters."
            }), 400

        # Convert symptoms into TF-IDF numbers
        symptoms_tfidf = vectorizer.transform([symptoms])

        # Make prediction
        prediction = model.predict(symptoms_tfidf)

        # Get predicted disease
        disease = prediction[0]

        # Get educational care information
        care_steps = first_aid_steps.get(
            disease,
            [
                "Please consult a qualified healthcare professional "
                "for appropriate advice."
            ]
        )

        # Send result back to frontend
        return jsonify({
            "disease": disease,
            "firstAidSteps": care_steps
        })

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "error": "Unable to process the prediction. Please try again."
        }), 500


# --------------------------------------------------
# Start Flask application
# --------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)