import joblib
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from utils import remove_duplicates_preserve_order, string_array_to_dict

class CF(object):
    def __init__(self, model=None, Y_data=None, k=2, dist_func = cosine_similarity, uuCF = 1):
        if (model != None):
            self.load_model(model)
        else:
            self.uuCF = uuCF # user-user (1) or item-item (0) CF
            self.Y_data = Y_data if uuCF else Y_data[:, [1, 0, 2]]
            self.k = k # number of neighbor points
            self.mu = None
            self.nu = None
            self.S = None
            self.dist_func = dist_func

        # users and items
        self.users = remove_duplicates_preserve_order(self.Y_data[:, 0])
        self.items = remove_duplicates_preserve_order(self.Y_data[:, 1])
        self.users_dict = string_array_to_dict(self.users)
        self.items_dict = string_array_to_dict(self.items)

    def load_model(self, path):
        model = joblib.load(path)
        self.uuCF = model['uuCF']
        self.Y_data = model['Y_data']
        self.k = model['k']
        self.mu = model['mu']
        self.nu = model['nu']
        self.S = model['S']
        self.dist_func = model['dist_func']

    def normalize_Y(self):
        users = self.Y_data[:, 0]  # all users - first col of the Y_data
        self.mu = np.zeros((len(self.users)))
        self.nu = np.zeros((len(self.users), len(self.items)))
        for user_index, user in enumerate(self.users):
            ids = np.where(users == user)[0]
            items = self.Y_data[ids, 1]
            ratings = self.Y_data[ids, 2]

            # take mean
            m = np.mean(ratings)
            if np.isnan(m):
                m = 0  # to avoid empty array and nan value
            self.mu[user_index] = m

            # normalize
            for rating_index, rating in enumerate(ratings):
                self.nu[user_index][self.items_dict[items[rating_index]]] = rating - m

    def similarity(self):
        self.S = self.dist_func(self.nu)

    def fit(self):
        self.normalize_Y()
        self.similarity()

    def __pred(self, u, i, normalized=1):
        # Bước 1: Tìm tất cả người dùng đã đánh giá mục i
        ids = np.where(self.Y_data[:, 1] == i)[0]
        # Bước 2: Người dùng đã đánh giá mục i
        users_rated_i = self.Y_data[ids, 0]
        # Bước 3: Tìm sự tương tự giữa người dùng hiện tại và những người khác đã đánh giá mục i
        sim = self.S[self.users_dict[u], [self.users_dict[user] for user in users_rated_i]]
        # Bước 4: Tìm k người dùng tương tự nhất
        a = np.argsort(sim)[-self.k:]
        # và cấp độ tương tự tương ứng
        nearest_s = sim[a]
        # Mỗi người dùng gần nhất đã đánh giá mục i như thế nào
        r = self.nu.T[self.items_dict[i], [self.users_dict[user] for user in users_rated_i[a]]]
        if normalized:
            # Thêm một số rất nhỏ, ví dụ, 1e-8, để tránh chia cho 0
            return np.array(r * nearest_s).sum() / (np.abs(nearest_s).sum() + 1e-8)

        return np.array(r * nearest_s).sum() / (np.abs(nearest_s).sum() + 1e-8) + self.mu[self.users_dict[u]]

    def pred(self, u, i, normalized=1):
        if self.uuCF: return self.__pred(u, i, normalized)
        return self.__pred(i, u, normalized)

    def recommend(self, u, normalized=1):
        ids = np.where(self.Y_data[:, 0] == u)[0]
        items_rated_by_u = self.Y_data[ids, 1].tolist()
        recommended_items = []
        for item in self.items:
            if item not in items_rated_by_u:
                rating = self.pred(u, item)
                if rating > 0:
                    recommended_items.append(item)

        return recommended_items

    def model_evaluation(self, test_data):
        SE = 0
        n_tests = len(test_data)
        for n in range(n_tests):
            pred = self.pred(test_data[n, 0], test_data[n, 1], normalized=0)
            SE += (pred - test_data[n, 2]) ** 2

        RMSE = np.sqrt(SE / n_tests)
        return RMSE

    def save_model(self, path='./dataset/CF_model.pkl'):
        model = {}
        model['uuCF'] = self.uuCF
        model['Y_data'] = self.Y_data
        model['k'] = self.k
        model['mu'] = self.mu
        model['nu'] = self.nu
        model['S'] = self.S
        model['dist_func'] = self.dist_func
        joblib.dump(model, path)
