# -*- coding: utf-8 -*-
'''
Created on 2016-10-26 13:52
---------
@summary: 清空urls表
---------
@author: Boris
'''

import tools

db = tools.getConnectedDB()

db.urls.remove()