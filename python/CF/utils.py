def remove_duplicates_preserve_order(input_list):
    seen = set()
    result = []
    for item in input_list:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

def string_array_to_dict(string_array):
    string_dict = {value: index for index, value in enumerate(string_array)}
    return string_dict