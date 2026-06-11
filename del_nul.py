import os
path = r"\\?\D:\不干胶落地页\nul"
try:
    os.remove(path)
    print("DELETED")
except Exception as e:
    print(f"ERROR: {e}")
