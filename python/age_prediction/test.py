import numpy as np

arr = np.array([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])

# Sử dụng np.argsort để lấy chỉ mục cho sắp xếp tăng dần
sorted_indices = np.argsort(arr)

# Mảng chỉ mục này sẽ chỉ mục để sắp xếp mảng theo thứ tự tăng dần
print(sorted_indices)