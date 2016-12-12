# encoding=utf8
import sys
sys.path.append("../..")

import html_parser.base_paser as basePaser
from html_parser.base_paser import *

parseVideoUrlJSFunc = '''
function base64decode (e) {
    var t, r, n, o, i, a, u, l = [ - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
    for (a = e.length, i = 0, u = ""; i < a;) {
        do t = l[255 & e.charCodeAt(i++)];
        while (i < a && t == -1);
        if (t == -1) break;
        do r = l[255 & e.charCodeAt(i++)];
        while (i < a && r == -1);
        if (r == -1) break;
        u += String.fromCharCode(t << 2 | (48 & r) >> 4);
        do {
            if (n = 255 & e.charCodeAt(i++), 61 == n) return u;
            n = l[n]
        } while ( i < a && n == - 1 );
        if (n == -1) break;
        u += String.fromCharCode((15 & r) << 4 | (60 & n) >> 2);
        do {
            if (o = 255 & e.charCodeAt(i++), 61 == o) return u;
            o = l[o]
        } while ( i < a && o == - 1 );
        if (o == -1) break;
        u += String.fromCharCode((3 & n) << 6 | o)
    }
    return u
}
'''

#外部传进url
def parseUrl(urlInfo):
    log.debug('处理 %s'%urlInfo)
    sourceUrl = urlInfo['url']
    depth = urlInfo['depth']
    description = urlInfo['description']

    if depth == 0:
        parseList(sourceUrl, description)

def parseList(sourceUrl, description):
    log.debug("parseList url = %s"%sourceUrl)

    columnId = description

    json = tools.getJsonByRequests(sourceUrl)
    # json = tools.getHtml(sourceUrl, 'utf-8')
    # json = tools.getJson(json)

    if not json:
        basePaser.updateUrl(sourceUrl, Constance.EXCEPTION)
        return

    datas = dict(json)['data']
    for data in datas:
        data = tools.getJsonValue(data, 'content')

        title = tools.getJsonValue(data, 'title')
        abstract = tools.getJsonValue(data, 'abstract')
        abstract = abstract and abstract or tools.getJsonValue(data, 'content')

        imgUrl = tools.getJsonValue(data, 'image_list.url')
        imgUrl = imgUrl and  imgUrl or tools.getJsonValue(data, 'middle_image.url')
        imgUrl = imgUrl and  imgUrl or tools.getJsonValue(data, 'large_image_list.url')
        imgUrl = imgUrl and imgUrl.replace('.webp', '.jpg') or imgUrl

        originlUrl = tools.getJsonValue(data, 'article_url')
        originlUrl = originlUrl and originlUrl or tools.getJsonValue(data, 'share_url')

        releaseTime = tools.getJsonValue(data, 'publish_time')
        releaseTime = releaseTime and releaseTime or tools.getJsonValue(data, '1481012423')
        releaseTime = releaseTime and tools.timestampToDate(releaseTime) or releaseTime

        videoMsg = tools.getJsonValue(data, 'video_play_info') #需要处理
        videoMainUrl = tools.getJsonValue(videoMsg, 'video_list.video_2.main_url')
        videoMainUrl = videoMainUrl and videoMainUrl or tools.getJsonValue(videoMsg, 'video_list.video_1.main_url')
        parseVideoUrl = tools.compileJs(parseVideoUrlJSFunc)
        videoUrl = parseVideoUrl('base64decode', videoMainUrl)

        html = tools.getHtml(originlUrl)
        regexs = [
            'class="article-content">(.*?)<div class="article-actions">',
            '<div class="content">(.*?)<div class="suggestion-list-con"',
            '<!-- 文章内容 -->(.*?)<!-- @end 文章内容 -->',
            'class="yi-content-text">(.*?)<div class="yi-normal"',
            '<p.*?>(.*?)</p>'
        ]

        if videoUrl:
            content = abstract
        else:
            content = ''.join(tools.getInfo(html, regexs))
            content = tools.delHtmlTag(content)

        if len(content) < len(abstract):
            content = abstract

        log.debug('''
            title:        %s
            abstract :    %s
            imgUrl :      %s
            originlUrl:   %s
            releaseTime : %s
            videoMainUrl: %s
            videoUrl:     %s
            content :     %s
            columnId:     %s

            '''
            %(title, abstract, imgUrl, originlUrl, releaseTime, videoMainUrl, videoUrl, content, columnId)
            )

        # 下载
        basePath = Constance.FILE_LOCAL_PATH
        isDownload = 0
        def callFunc():
            global isDownload
            isDownload = 1
            print('isDownload %d'%isDownload)

        # 下载图片
        imgName = ''
        if imgUrl:
            imgName = 'iamges/' + tools.getCurrentDate(dateFormat = '%Y-%m-%d') + "/" + tools.getCurrentDate(dateFormat = '%Y%m%d%H%M%S') + '.jpg'
            isDownload = tools.downloadFile(imgUrl, basePath, imgName,  callFunc)
            if not isDownload:
                imgName = ''


        # 下载视频
        videoName = ''
        if videoUrl:
            videoName = 'videos/' + tools.getCurrentDate(dateFormat = '%Y-%m-%d') + "/" + tools.getCurrentDate(dateFormat = '%Y%m%d%H%M%S') + '.mp4'
            isDownload = tools.downloadFile(videoUrl, basePath, videoName, callFunc)
            if not isDownload:
                videoName = ''

        if originlUrl:
            basePaser.addContentInfo(title, abstract, imgUrl, imgName, originlUrl, releaseTime, videoUrl, videoName, content, columnId, isDownload)


    basePaser.updateUrl(sourceUrl, Constance.DONE)

# url = 'http://is.snssdk.com/api/news/feed/v46/?vid=B0DB5DD0-FF94-4773-85B1-EFC11132C2A4&city=&iid=6542551421&device_platform=iphone&ssmix=a&last_refresh_sub_entrance_interval=1481094800&openudid=7064ff7d773ef8efeb5d6a25f62cd3d85035674f&ab_version=91796,89593,83095,89184,87331,93903,94158,94056,93418,93085,92848,93981,31210,94178,93319,94042,92438,93526,93357,94163,94003,92487,87496,93887,87988&app_name=news_article&device_id=34633749953&ab_client=a1,f2,f7,e1&strict=0&detail=1&concern_id=&count=20&cp=548e4d7f7b1BCq1&category=news_local&ab_feature=z1&device_type=iPhone9,2&idfv=B0DB5DD0-FF94-4773-85B1-EFC11132C2A4&version_code=5.8.6&refer=1&os_version=10.1.1&max_behot_time=1481091071&user_city=%E6%B3%B8%E5%B7%9E&live_sdk_version=1.3.0&aid=13&channel=App%20Store&language=zh-Hans-CN&image=1&LBS_status=deny&tt_from=load_more&resolution=1242*2208&loc_mode=0&ac=WIFI&idfa=D2E02B97-0F35-486F-9CD4-A2EC13BBC8FB'
# parseList(url, '')