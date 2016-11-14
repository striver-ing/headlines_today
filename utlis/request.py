# -*-coding:UTF-8 -*-

# author: 初行
# qq: 121866673
# mail: zxbd1016@163.com
# message: I need a python job
# time: 2014/10/8

import urllib
import http.cookiejar

#设置一个cookie处理器，它负责从服务器下载cookie到本地，并且在发送请求时带上本地的cookie
cj = http.cookiejar.LWPCookieJar()
cookie_support = urllib.request.HTTPCookieProcessor(cj)
opener = urllib.request.build_opener(cookie_support, urllib.request.HTTPHandler)
urllib.request.install_opener(opener)

# default header
HEADER = {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding':'gzip, deflate, sdch',
    'Accept-Language':'zh-CN,zh;q=0.8',
    'Cache-Control':'max-age=0',
    'Connection':'keep-alive',
    'Host':'site.ip138.com',
    'Referer':'http://site.ip138.com/www.facebook.com/',
    'Upgrade-Insecure-Requests':1,
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36'
}

# operate method
def geturlopen(hosturl, postData = {}, headers = HEADER):
    # encode postdata
    enpostdata =  urllib.parse.urlencode(postData).encode('utf-8')
    # request url
    urlrequest = urllib.request.Request(hosturl, enpostdata, headers)
    # open url
    urlresponse = urllib.request.urlopen(urlrequest)
    # return url
    return urlresponse.read().decode('utf-8', 'ignore')

if __name__ == '__main__':
    hosturl = "http://site.ip138.com/www.facebook.com/"
    postData = {
        'input':'www.facebook.com',
        'token':'3e1fa79db944e3c1547f8e61228c743a'
    }
    html = geturlopen(hosturl)

    print(html)
