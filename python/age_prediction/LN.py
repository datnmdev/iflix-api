import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_squared_error

class LN(object):
    def __init__(self, age_prediction_model=joblib.load('./LN_dataset/age_prediction_model.pkl'), pre_data=pd.read_excel('./LN_dataset/pre_data/training_set.xlsx').to_numpy()):
        self.pre_data = pre_data
        self.age_prediction_model = age_prediction_model

    def extract(self):
        self.X = self.pre_data[:, :-1]
        self.y = self.pre_data[:, -1]

    def fit(self):
        self.extract()
        model = LinearRegression()
        model.fit(self.X, self.y)
        self.age_prediction_model = model

    def pred(self, features_matrix):
        return self.age_prediction_model.predict(features_matrix)

    def evaluate(self, test_set):
        y = test_set[:, -1]
        X = self.pred(test_set[:, :-1])
        y_pred = np.array(X).flatten()

        # Tính MAE và MSE
        mae = mean_absolute_error(y, y_pred)
        mse = mean_squared_error(y, y_pred)

        # Vẽ biểu đồ dự đoán so với sai số (Prediction vs. Residuals plot)
        plt.figure(figsize=(12, 6))

        # Vẽ biểu đồ scatter plot
        plt.plot()
        plt.scatter(X, y, c='b', s=40, label='Actual')
        plt.scatter(X, y_pred, c='r', s=40, label='Predicted')
        plt.title('Scatter Plot (Actual vs. Predicted)')
        plt.xlabel('X')
        plt.ylabel('y')
        plt.legend()

        plt.show()

        print(f"Mean Absolute Error (MAE): {mae:.2f}")
        print(f"Mean Squared Error (MSE): {mse:.2f}")

    def save(self, path='./LN_dataset/age_prediction_model.pkl'):
        joblib.dump(self.age_prediction_model, path)