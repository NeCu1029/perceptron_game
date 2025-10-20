import random
import json

arr = []
for _ in range(500):
    x = random.random()
    y = random.random()
    arr.append((x, y))
with open("files/points1.json", "w") as f:
    json.dump(arr, f)

arr = []
for _ in range(500):
    x = random.random()
    y = random.random()
    arr.append((x, y))
with open("files/points2.json", "w") as f:
    json.dump(arr, f)
