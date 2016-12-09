# enconding = utf8
import pymongo
from pymongo.collection import Collection
import urllib.parse
import os
import shutil
import sys
from tld import get_tld

sys.path.append("..")
from utils.log import log

MONGO_HOST = 'localhost'
MONGO_PORT = 27017

PROJECT_NAME = 'spider-text-message'
CURRENT_PATH = os.path.abspath('.')
PROJEC_TPATH = CURRENT_PATH[:CURRENT_PATH.find(PROJECT_NAME) + len(PROJECT_NAME)]
FILE_PATH = PROJEC_TPATH + '\\TextMessage\\'

class MongoDB():
    def __init__(self, db = '', host = MONGO_HOST, port = MONGO_PORT):
        self.host = host
        self.port = port
        self.db = db

    def getMongoDB(self):
        try:
            self.client = pymongo.MongoClient(self.host, self.port)
            self.db = self.client.spider_text_message  #这需要手动填mongodb数据库名
            return self.db
        except:
            print('connect mongodb error.')

    def close(self):
        self.client.close()

# 二级域名
def getDomain(url):
    try:
        domain = get_tld(url)
        domainStartPos = url.find(domain)
        domainEndPos = domainStartPos + len(domain)
        secondDomainStartPos = url.rfind('.', 0, domainStartPos - 1) + 1

        if secondDomainStartPos == 0:
            secondDomainStartPos = url.find('//') + 2

        secondDomain = url[secondDomainStartPos: domainEndPos]
        secondDomain = secondDomain.replace('www.', '')
        return secondDomain
    except Exception as e:
        print (e)
        return domain

def export():
    log.info('*'*40)
    log.info('正在导出数据...')
    dataCount = 0

    mongoDB = MongoDB()
    db = mongoDB.getMongoDB()

    if os.path.exists(FILE_PATH):
        shutil.rmtree(FILE_PATH)#删除

    flag = True
    while flag:
        flag = False
        datas = db.text_info.find({})
        for data in datas:
            url = data['url']
            website = list(db.website.find({'_id':data['website_id']}))[0]['web_name']

            fileName = getDomain(url) + ".xml"
            fileName = FILE_PATH + website + "\\" + fileName

            # 创建文件夹
            if not os.path.exists(FILE_PATH + website + "\\"):
                os.makedirs(FILE_PATH + website + "\\")

            #创建文件 追加方式写入
            file = open(fileName, 'a',  encoding='utf8')

            # 写文件
            # print('正在导出 %s --> %s'%(data['title'], fileName))
            value = (data['title'], data['release_time'], data['charset'], data['author'], data['url'], data['keyword'], data['content'])
            text = \
'''
<text>
<title>%s</title>
<foundtime>%s</foundtime>
<charset>%s</charset>
<author>%s</author>
<Url>%s</Url>
<keyword>%s</keyword>
<summary>%s</summary>
</text>

'''
            file.write(text%value)
            dataCount = dataCount + 1
            file.close()

    mongoDB.close()
    log.info('已导出数据到 %s  共%d条'%(FILE_PATH, dataCount))
    # pause

if __name__ == '__main__':
    export()