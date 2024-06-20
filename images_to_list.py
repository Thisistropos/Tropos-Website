import os
import sys

list_of_files = os.listdir(sys.argv[1])

with open("images_list.txt", "w") as file:
    string = ', '.join([f'"{filename}"' for filename in list_of_files])
    formatted_string = f"[{string}]"
    file.write(formatted_string)





