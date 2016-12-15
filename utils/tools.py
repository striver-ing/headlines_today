# encoding=utf8

import sys
sys.path.append("..")

import re
import pymongo
import json
import configparser #读配置文件的
from urllib.parse import quote
from utils.log import log
from tld import get_tld
from urllib import request
import requests
import time
import os
import execjs
# pip install PyExecJS
from selenium import webdriver
import time

def getHtml(url, code = ''):
    html = None
    try:
        page = request.urlopen(quote(url,safe='/:?=&'), timeout = 3)
        html = page.read()

        if code:
            html = html.decode(code,'ignore')
        else:
            htmlCodeUtf8 = html.decode('utf-8','ignore')
            htmlCodeGB2312 = html.decode('gb2312','ignore')

            html = len(htmlCodeGB2312) > len(htmlCodeUtf8) and htmlCodeGB2312 or htmlCodeUtf8

        page.close()

    except Exception as e:
        log.error(e)
    return html


def getHtmlByRequests(url, code = ''):
    html = None
    try:
        r = requests.get(url)
        if code:
            r.encoding = code
        html = r.text

    except Exception as e:
        log.error(e)
    return html

def getJsonByRequests(url, params = None):
    json = {}
    try:
        response = requests.get(url, params = params)
        json = response.json()
    except Exception as e:
        log.error(e)

    return json

def getUrls(html):
    urls = re.compile('<a.*?href="(https?.*?)"').findall(str(html))
    return list(set(urls))

def fitUrl(urls, identis):
    identis = isinstance(identis, str) and [identis] or identis
    fitUrls = []
    for link in urls:
        for identi in identis:
            if identi in link:
                fitUrls.append(link)
    return list(set(fitUrls))

def getInfo(html,regexs, allowRepeat = False):
    regexs = isinstance(regexs, str) and [regexs] or regexs

    for regex in regexs:
        infos = re.findall(regex,str(html),re.S)
        # infos = re.compile(regexs).findall(str(html))
        if len(infos) > 0:
            break

    return allowRepeat and infos or sorted(set(infos),key=infos.index)

def delHtmlTag(content):
    content = replaceStr(content, '<script(.|\n)*?</script>')
    content = replaceStr(content, '<style(.|\n)*?</style>')
    content = replaceStr(content, '<!--(.|\n)*?-->')
    content = replaceStr(content, '<(.|\n)*?>')
    content = replaceStr(content, '&.*?;')
    content = replaceStr(content, '\s')

    return content

def jointUrl(url, params):
    paramStr = "?"
    for key, value in params.items():
        value = isinstance(value, str) and value or str(value)
        paramStr += key + "=" + value + "&"

    return url + paramStr[:-1]


def isHaveChinese(content):
    regex = '[\u4e00-\u9fa5]+'
    chineseWord = getInfo(content, regex)
    return chineseWord and True or False

##################################################
"""
    匹配相关函数
"""
# 匹配域名
def filterDomain(urls, domain):
    '''
    @summary:  通过域名过滤不是domain所在的URL
    ---------
    @param urls: URL 列表
    @param domain: 所需域名
    ---------
    @result: 返回一个过滤后新的列表
    '''
    urls = isinstance(urls, str) and [urls] or urls

    def _Rule(url):
        try:
            return get_tld(url) == domain
        except Exception as e:
            log.debug("******** Invalid URL %s ********"%url)
            return False

    return filter(_Rule, urls)

# 规则匹配
def filterRule(urls, rules):
    '''
    @summary: 通过ruleList过滤不符合规则的URL
    ---------
    @param urls: URL 列表
    @param rules: 需要过滤的关键字字符串或列表
    ---------
    @result: 返回一个过滤后新的列表
    '''
    urls = isinstance(urls, str) and [urls] or urls
    rules = isinstance(rules, str) and [rules] or rules

    def _Rule(url):
        for rule in rules:
            if url.find(rule) != -1:
                return False
        return True

    return filter(_Rule, urls)

def filterHttp(urls, rule  = 'http'):
    '''
    @summary: 过滤不是http开头的url
    ---------
    @param urls: url list
    @param rule: must be str  only one
    ---------
    @result: filtered list
    '''
    urls = isinstance(urls, str) and [urls] or urls
    def _Rule(url):
        if re.match(rule, url):
            return True
        return False
    return filter(_Rule, urls)

##################################################
def getJson(jsonStr):
    '''
    @summary: 取json对象
    ---------
    @param jsonStr: json格式的字符串
    ---------
    @result: 返回json对象
    '''
    jsonObject = {}
    try:
        jsonObject =  json.loads(jsonStr)
    except Exception as e:
        # log.error(e)
        pass

    return jsonObject


def getJsonValue(jsonObject, key):
    '''
    @summary:
    ---------
    @param jsonObject: json对象或json格式的字符串
    @param key: 建值 如果在多个层级目录下 可写 key1.key2  如{'key1':{'key2':3}}
    ---------
    @result: 返回对应的值，如果没有，返回''
    '''
    currentKey = ''
    value = ''
    try:
        jsonObject = isinstance(jsonObject, str) and getJson(jsonObject) or jsonObject

        currentKey = key.split('.')[0]
        value      = jsonObject[currentKey]

        key        = key[key.find('.') + 1:]
    except Exception as e:
            return value

    if key == currentKey:
        return value
    else:
        return getJsonValue(value, key)

##################################################
def replaceStr(sourceStr, regex, replaceStr = ''):
    '''
    @summary: 替换字符串
    ---------
    @param sourceStr: 原字符串
    @param regex: 正则
    @param replaceStr: 用什么来替换 默认为''
    ---------
    @result: 返回替换后的字符串
    '''
    strInfo = re.compile(regex)
    return strInfo.sub(replaceStr, sourceStr)

##################################################
def getConfValue(section, key):
    cf = configparser.ConfigParser()
    cf.read("../spider.conf")
    return cf.get(section, key)

#################时间转换相关####################
def timeListToString(timeList):
    times = 0
    for word in timeList:
        times = times + timeToString(word)
    return str(times)

def timeToString(time):
    timeList = time.split(':')
    if len(timeList) == 3 :
        return int(timeList[0]) * 3600 + int(timeList[1]) * 60 + int(timeList[2])
    elif len(timeList) == 2:
        return int(timeList[0]) * 60 + int(timeList[1])
    else: return 0

##################################################
class DB():
    client = pymongo.MongoClient("localhost",27017)
    db = client.headlines_today

db = DB.db
def getConnectedDB():
    return db

###############################################

def dateToTimestamp(date, time_format = '%Y-%m-%d %H:%M:%S'):
    '''
    @summary:
    ---------
    @param date:将"2011-09-28 10:00:00"时间格式转化为时间戳
    @param format:时间格式
    ---------
    @result: 返回时间戳
    '''

    timestamp = time.mktime(time.strptime(date, time_format))
    return int(timestamp)

def timestampToDate(timestamp, time_format = '%Y-%m-%d %H:%M:%S'):
    '''
    @summary:
    ---------
    @param timestamp: 将时间戳转化为日期
    @param format: 日期格式
    ---------
    @result: 返回日期
    '''

    date = time.localtime(timestamp)
    return time.strftime(time_format, date)

def getCurrentTimestamp():
    return  int(time.time())

def getCurrentDate(dateFormat = '%Y-%m-%d %H:%M:%S'):
    return time.strftime(dateFormat, time.localtime(time.time()))

#############################################

def execJs(jsCode):
    '''
    @summary: 执行js代码
    ---------
    @param jsCode: js代码
    ---------
    @result: 返回执行结果
    '''

    return execjs.eval(jsCode)

def compileJs(jsFunc):
    '''
    @summary: 编译js函数
    ---------
    @param jsFunc:js函数
    ---------
    @result: 返回函数对象 调用 fun('jsFunName', param1,param2)
    '''

    ctx = execjs.compile(jsFunc)
    return ctx.call

#######################################
def mkdir(path):
    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5
        pass

def downloadFile(url, basePath, filename, callFunc = ''):
    filePath = basePath + filename
    directory = os.path.dirname(filePath)
    mkdir(directory)

    if url:
        try:
            log.debug('''
                         正在下载 %s
                         存储路径 %s
                      '''
                         %(url, filePath))

            request.urlretrieve(url, filePath)

            log.debug('''
                         下载完毕 %s
                         文件路径 %s
                      '''
                         %(url, filePath)
                     )

            callFunc and callFunc()
            return 1
        except Exception as e:
            log.error(e)
            return 0
    else:
        return 0

def capture(url, save_fn="capture.png"):
    directory = os.path.dirname(save_fn)
    mkdir(directory)

    browser = webdriver.PhantomJS(executable_path = 'D:/software/phantomjs-2.1.1-windows/phantomjs-2.1.1-windows/bin/phantomjs')
    browser.set_window_size(1200, 900)
    browser.get(url) # Load page
    browser.execute_script("""
            (function () {
              var y = 0;
              var step = 100;
              window.scroll(0, 0);

              function f() {
                if (y < document.body.scrollHeight) {
                  y += step;
                  window.scroll(0, y);
                  setTimeout(f, 50);
                } else {
                  window.scroll(0, 0);
                  document.title += "scroll-done";
                }
              }

              setTimeout(f, 1000);
            })();
        """)

    for i in range(30):
        if "scroll-done" in browser.title:
            break
        time.sleep(1)

    browser.save_screenshot(save_fn)
    browser.close()

if __name__ == "__main__":
   # capture("http://www.jb51.net", '../dd.png')
   downloadFile('http://img.lzep.cn/ep/other/ckplayer6.5/ckplayer.swf', '.', 'video.swf')