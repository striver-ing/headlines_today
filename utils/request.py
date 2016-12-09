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
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language':' zh-Hans-CN;q=1',
    'User-Agent': 'MomoChat/7.4.0 ios/634 (iPhone 7 Plus; iOS 10.1.1; zh_CN; iPhone9,2; S1)'
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
    return urlresponse.read().decode('gbk', 'ignore')

if __name__ == '__main__':
    hosturl = "https://live-api.immomo.com/v3/room/profile/full"
    postData = {
        'input':'www.facebook.com',
        'token':'3e1fa79db944e3c1547f8e61228c743a'
    }
    html = geturlopen(hosturl)

    print(html)
