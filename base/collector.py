# -*- coding: utf-8 -*-
'''
Created on 2016-11-23 14:41
---------
@summary:
---------
@author: Boris
'''


import sys
sys.path.append("..")

import threading
import time
import base.constance as Constance
import utils.tools as tools
from utils.log import log
import os

mylock = threading.RLock()

#test
DEBUG =False
DEPTH = 0

class Singleton(object):
    def __new__(cls,*args,**kwargs):
        if not hasattr(cls,'_inst'):
            cls._inst=super(Singleton,cls).__new__(cls,*args,**kwargs)

        return cls._inst

class Collector(threading.Thread, Singleton):
    _db = tools.getConnectedDB()
    _threadStop = False
    _urls = []
    _nullTimes = 0
    _interval = int(tools.getConfValue("collector", "sleep_time"))

    #初始时将正在做的任务至为未做
    _db.urls.update({'status':Constance.DOING}, {'$set':{'status':Constance.TODO}}, multi=True)

    if DEBUG:
        log.debug("is debug depth = %s"%DEPTH)

    def __init__(self):
        super(Collector, self).__init__()

    def run(self):
        while not Collector._threadStop:
            self.__inputData()
            time.sleep(Collector._interval)

    def stop(self):
        Collector._threadStop = True

    def __inputData(self):
        if len(Collector._urls) > int(tools.getConfValue("collector", "max_size")):
            return
        mylock.acquire() #加锁

        depth = int(tools.getConfValue("collector", "depth"))
        urlCount = int(tools.getConfValue("collector", "url_count"))
        if DEBUG:
            urlsList = Collector._db.urls.find({"status":Constance.TODO, "depth":DEPTH},{"url":1, "_id":0,"depth":1, "description":1}).sort([("depth",1)]).limit(urlCount)
        else:
            urlsList = Collector._db.urls.find({"status":Constance.TODO, "depth":{"$lte":depth}},{"url":1, "_id":0,"depth":1, "description":1}).sort([("depth",1)]).limit(urlCount)#sort -1 降序 1 升序

        urlsList = list(urlsList)
        Collector._urls.extend(urlsList)
        #更新已取到的url状态为doing
        for url in urlsList:
            Collector._db.urls.update(url, {'$set':{'status':Constance.DOING}})

        if self.isAllHaveDone():
            self.stop()

        mylock.release()

    def isFinished(self):
        return Collector._threadStop

    def isAllHaveDone(self):
        allowedNullTimes = int(tools.getConfValue("collector", 'allowed_null_times'))
        if Collector._urls == []:
            Collector._nullTimes += 1
            if Collector._nullTimes >= allowedNullTimes:
                return True
        else:
            Collector._nullTimes = 0
            return False


    def getUrls(self, count):
        mylock.acquire() #加锁

        urls = Collector._urls[:count]
        del Collector._urls[:count]

        mylock.release()

        return urls
