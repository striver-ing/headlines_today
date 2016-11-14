# -*- coding: utf-8 -*-
'''
Created on 2016-11-07 13:38
---------
@summary:
---------
@author: Boris
'''

from selenium import webdriver
import time

driver = webdriver.PhantomJS(executable_path = 'D:/software/phantomjs-2.1.1-windows/phantomjs-2.1.1-windows/bin/phantomjs')
driver.get('http://toutiao.com/a6346451923281527042/')
time.sleep(10)
print(driver.page_source)
driver.close()