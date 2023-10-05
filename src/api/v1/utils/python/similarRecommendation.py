import sys
from sklearn.metrics.pairwise import cosine_similarity

# Nhận dữ liệu từ đối số đã truyền
movie_target = sys.argv[0]
movies = sys.argv[1]

# Tạo một ma trận thể loại, mỗi hàng là một bộ phim và mỗi cột là một thể loại
genre_matrix = []
genre_set = set()
for movie in movies:
    genre_set.update([item["name"] for item from movie["genres"]])
genre_list = list(genre_set)
for movie in movies:
    genre_vector = [1 if genre in [item["name"] for item from movie["genres"]] else 0 for genre in genre_list]
    genre_matrix.append(genre_vector)

# Tính toán độ tương đồng Cosine similarity giữa các bộ phim
similarity_matrix = cosine_similarity(genre_matrix)

# Lấy các bộ phim có độ tương đồng cao nhất với một bộ phim cụ thể
target_movie_index =    # Thay đổi thành chỉ số của bộ phim bạn muốn đề xuất
similar_movies_indices = (-similarity_matrix[target_movie_index]).argsort()[1:]  # Sắp xếp và loại bỏ bộ phim gốc
similar_movies = [(movies[i]["title"], similarity_matrix[target_movie_index][i]) for i in similar_movies_indices]

# In ra các bộ phim đề xuất
for movie, similarity in similar_movies:
    print(f"{movie}: Similarity = {similarity:.2f}")