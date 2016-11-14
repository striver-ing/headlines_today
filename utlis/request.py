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
    'Accept':'*/*',
    'Accept-Encoding':'identity;q=1, *;q=0',
    'Accept-Language':'zh-CN,zh;q=0.8',
    'Cache-Control':'max-age=0',
    'Host':'v6.pstatp.com',
    'Proxy-Connection':'keep-alive',
    'Range':'bytes=0-',
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
    'Referer' : 'http://www.toutiao.com/a6349023694543945985/'
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
    return urlresponse

if __name__ == '__main__':
    hosturl = "http://www.toutiao.com/a6349023694543945985/"
    postData = {
        'Signature':'q2F+WD1tkfp2oIkf/2gNnLhrfAA=',
        'Expires':1478849441,
        'KSSAccessKeyId':'qh0h9TdcEMrm1VlR2ad/'
    }
    html = geturlopen(hosturl)

    print(html)
