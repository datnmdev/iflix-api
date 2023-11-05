import numpy as np
from librosa.feature import mfcc
import librosa as lbr
from moviepy.editor import VideoFileClip
from skimage.feature import hog
from skimage import io, color, transform

def extract_feature_image(path=None, image_data=None):
    if (path != None):
        # Đọc hình ảnh màu
        image_data = io.imread(path)

    # Kiểm tra số kênh màu của ảnh
    if len(image_data.shape) == 3 and image_data.shape[2] == 4:
        # Chuyển đổi ảnh từ RGBA thành RGB
        image_data = color.rgba2rgb(image_data)

    # Chuyển hình ảnh màu thành hình ảnh xám
    image_gray = color.rgb2gray(image_data)

    # Resize hình ảnh xuống 100x100
    image_resized = transform.resize(image_gray, (100, 100))

    # Trích xuất đặc trưng HOG
    features, hog_image = hog(image_resized, visualize=True)

    return features

def extract_feature_audio(path):
    # Đọc tệp âm thanh
    y, sr = lbr.load(path)

    # Trích xuất MFCCs
    mfccs_features = mfcc(y=y, sr=sr, n_mfcc=13)
    mfccs_scaled_features = np.mean(mfccs_features.T, axis=0)

    return mfccs_scaled_features
