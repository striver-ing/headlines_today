# encoding=utf8
import sys
sys.path.append("..")

import threading
import fileinput
import base.constance as Constance
import utils.tools as tools
from utils.log import log
import random

db = tools.getConnectedDB()

class AddRootUrl(threading.Thread):
    _addUrlFuncs = []

    def __init__(self):
        super(AddRootUrl, self).__init__()

    def run(self):
        self.addHeadlinesListUrl()


    def addUrl(self, url, description = '', depth = 0, status = Constance.TODO):
        for i in db.urls.find({'url':url}):
            return

        urlDict = {'url':url, 'description':description, 'depth':depth, 'status':Constance.TODO}
        db.urls.save(urlDict)

    def addHeadlinesListUrl(self):
        baseUrl = 'http://is.snssdk.com/api/news/feed/v46/'
        params = {
                    'version_code'                       : '5.8.6',
                    'app_name'                           : 'news_article',
                    'vid'                                : 'B0DB5DD0-FF94-4773-85B1-EFC11132C2A4',
                    'device_id'                          : '34633749953',
                    'channel'                            : 'App Store',
                    'resolution'                         : '1242*2208',
                    'aid'                                : 13,
                    'ab_version'                         : '91796,89593,83095,89184,87331,93903,94158,94056,93418,93085,92848,93981,31210,94178,93319,94042,92438,93526,93357,94163,94003,92487,87496,93887,87988',
                    'ab_feature'                         : 'z1',
                    'build_version'                      : '5.9.0.5',
                    'openudid'                           : '7064ff7d773ef8efeb5d6a25f62cd3d85035674f',
                    'live_sdk_version'                   : '1.3.0',
                    'idfv'                               : 'B0DB5DD0-FF94-4773-85B1-EFC11132C2A4',
                    'ac'                                 : 'WIFI',
                    'os_version'                         : '10.1.1',
                    'ssmix'                              : 'a',
                    'device_platform'                    : 'iphone',
                    'iid'                                : 6542551421,
                    'ab_client'                          : 'a1,f2,f7,e1',
                    'device_type'                        : 'iPhone9,2',
                    'idfa'                               : 'D2E02B97-0F35-486F-9CD4-A2EC13BBC8FB',
                    'LBS_status'                         : 'deny',
                    'category'                           : 'news_local',
                    'city'                               : '',
                    'concern_id'                         : '',
                    'count'                              : 20,
                    'cp'                                 : '548e4d7f7b1BCq1',
                    'detail'                             : 1,
                    'image'                              : 1,
                    'language'                           : 'zh-Hans-CN',
                    'last_refresh_sub_entrance_interval' : 1482077184,
                    'loc_mode'                           : 0,
                    'max_behot_time'                     : 1481063762,
                    'refer'                              : 1,
                    'strict'                             : 0,
                    'tt_from'                            : 'load_more',
                    'user_city'                          : '泸州'
        }

        contentReleasedTime = tools.getConfValue('content', 'content_released_time')
        timeInterval = int(tools.getConfValue('content', 'time_interval'))
        contentReleasedTime = tools.dateToTimestamp(contentReleasedTime)
        currentTimestamp = tools.getCurrentTimestamp()

        maxBehotTime = currentTimestamp
        while maxBehotTime >= contentReleasedTime:
            maxBehotTime -= timeInterval

            currentTimestamp = currentTimestamp + random.randint(60, 300)

            # 泸州的文章
            params['category'] = 'news_local'
            params['last_refresh_sub_entrance_interval'] = currentTimestamp# + random.randint(60, 300)
            params['max_behot_time'] = maxBehotTime

            url = tools.jointUrl(baseUrl, params)
            self.addUrl(url, Constance.NEWS_LOCAL)

            # 视频
            params['category'] = 'video'
            params['last_refresh_sub_entrance_interval'] = currentTimestamp# + random.randint(60, 300)
            params['max_behot_time'] = maxBehotTime

            url = tools.jointUrl(baseUrl, params)
            self.addUrl(url, Constance.VIDEO)