import os

# Check if it's a real file
try:
    with open(r"\\?\D:\不干胶落地页\nul", "rb") as f:
        content = f.read()
        print(f"Size: {len(content)} bytes")
        print(f"Content: {content[:100]}")
except FileNotFoundError:
    print("NOT A REAL FILE (device)")
except Exception as e:
    print(f"Error: {e}")

# Check directory listing
for f in os.listdir(r"D:\不干胶落地页"):
    if f.lower() == "nul":
        print(f"Found in listing: {f}")
        break
else:
    print("Not in listing")
