import cv2
import numpy as np
import pandas as pd
import joblib
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import math

import extract_feature as ef

class SVM(object):
    def __init__(self, model=None, training_set=None):
        self.model = model
        self.training_set = training_set

    def extract_for_image(self):
        image_paths = self.training_set['image_path'].values

        image_features = []
        for image_path in image_paths:
            image_features.append(list(ef.extract_feature_image(image_path)))

        self.X = image_features
        self.y = self.training_set['level'].values

    def fit_with_image_feature(self):
        self.extract_for_image()
        svm_classifier = SVC(kernel='linear')
        svm_classifier.fit(self.X, self.y)
        self.model = svm_classifier

    def extract_for_audio(self):
        audio_paths = self.training_set['audio_path'].values

        audio_features = []
        for audio_path in audio_paths:
            audio_features.append(list(ef.extract_feature_audio(audio_path)))

        self.X = audio_features
        self.y = self.training_set['label'].values

    def fit_with_audio_feature(self):
        self.extract_for_audio()
        svm_classifier = SVC(kernel='linear')
        svm_classifier.fit(self.X, self.y)
        self.model = svm_classifier

    def pred_based_on_images(self, video_path):
        video_capture = cv2.VideoCapture(video_path)

        predicted_labels_of_frames = []
        while True:
            # Đọc một frame từ video
            ret, frame = video_capture.read()

            # Kiểm tra xem việc đọc frame có thành công hay không
            if not ret:
                break

            predicted_labels_of_frames.append(self.model.predict([ef.extract_feature_image(image_data=frame)])[0])

        # Đóng video capture
        video_capture.release()
        print(predicted_labels_of_frames)
        predicted_level = np.max(predicted_labels_of_frames)
        print(predicted_level)
        return predicted_level

    def pred_based_on_audio(self, audio_path):
        audio_feature = ef.extract_feature_audio(audio_path)
        return self.model.predict([audio_feature])

    def save(self, path):
        joblib.dump(self.model, path)

svm = SVM(training_set=pd.read_excel('./SVM_dataset/pre_data/discomfort/training_set.xlsx'))
svm.fit_with_audio_feature()
svm.save('./SVM_dataset/discomfort/')
print(svm.pred_based_on_audio('audio.mp3'))