# Dermaizor

## AI-Powered Skin Symptom Analysis & Health Awareness

Dermaizor is an educational web application that analyzes free-text skin-related symptoms using natural language processing and machine learning.

Users can describe their symptoms in their own words, and the application processes the text using TF-IDF and a multiclass Logistic Regression model to provide an educational condition category along with general awareness information.

> **Important:** Dermaizor is an educational project and is not a medical diagnostic tool. Its predictions should not be considered a medical diagnosis or a substitute for professional medical advice.

---

## Features

- Free-text skin symptom input
- Natural language symptom analysis
- TF-IDF text vectorization
- Multiclass Logistic Regression classification
- General care and awareness information
- Professional-care guidance
- Character limit and input validation
- Responsive web interface
- Local Flask backend
- Lightweight machine learning architecture
- No GPU required for inference

---

## How It Works

The application follows a simple machine learning pipeline:

```text
User Symptom Description
          ↓
      Text Input
          ↓
    TF-IDF Vectorizer
          ↓
Logistic Regression Model
          ↓
  Predicted Condition
          ↓
General Awareness Information


## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- Flask

### Machine Learning

- Scikit-learn
- TF-IDF Vectorization
- Logistic Regression

### Data & Model

- Pandas
- Joblib
- CSV dataset
- JSON awareness information