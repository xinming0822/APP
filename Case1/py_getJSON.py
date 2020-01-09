# Using Python to get JSON from http and save as json file


import requests
import json
data = requests.get(url="https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=4")
with open("act_list.json","w",encoding="utf-8") as myFile:
    json.dump(data.json(), myFile,ensure_ascii=False)
myFile.close()
