import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

import joblib


# 1. Read the dataset
data = pd.read_csv("Skin_text_classifier.csv")


# 2. Separate input and output
X = data["symptoms"]
y = data["disease"]


# 3. Split the dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# 4. Create TF-IDF vectorizer
vectorizer = TfidfVectorizer()


# 5. Convert training text into numbers
X_train_tfidf = vectorizer.fit_transform(X_train)


# 6. Convert testing text into numbers
X_test_tfidf = vectorizer.transform(X_test)


# 7. Create Logistic Regression model
model = LogisticRegression(max_iter=1000)


# 8. Train the model
model.fit(X_train_tfidf, y_train)


# 9. Test the model
predictions = model.predict(X_test_tfidf)


# 10. Calculate accuracy
accuracy = accuracy_score(y_test, predictions)


print("Training completed!")
print("Training data shape:", X_train_tfidf.shape)
print("Testing data shape:", X_test_tfidf.shape)
print("Accuracy:", accuracy)


# 11. Save the model
joblib.dump(model, "skin_disease_model.pkl")


# 12. Save the TF-IDF vectorizer
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")


print("Model saved as skin_disease_model.pkl")
print("Vectorizer saved as tfidf_vectorizer.pkl")