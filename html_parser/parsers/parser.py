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

        # 检测数据库中是否存在，若存在则退出
        result = db.app_content_info.find({'title':title})
        if list(result):
             continue

        abstract = tools.getJsonValue(data, 'abstract')
        abstract = abstract and abstract or tools.getJsonValue(data, 'content')

        imgUrl = tools.getJsonValue(data, 'image_list.url')
        imgUrl = imgUrl and  imgUrl or tools.getJsonValue(data, 'middle_image.url')
        imgUrl = imgUrl and  imgUrl or tools.getJsonValue(data, 'large_image_list.url')
        imgUrl = imgUrl and imgUrl.replace('.webp', '.jpg') or imgUrl

        originalUrl = tools.getJsonValue(data, 'article_url')
        originalUrl = originalUrl and originalUrl or tools.getJsonValue(data, 'share_url')

        releaseTime = tools.getJsonValue(data, 'publish_time')
        releaseTime = releaseTime and releaseTime or tools.getJsonValue(data, '1481012423')
        releaseTime = releaseTime and tools.timestampToDate(releaseTime) or releaseTime

        videoMsg = tools.getJsonValue(data, 'video_play_info') #需要处理
        videoMainUrl = tools.getJsonValue(videoMsg, 'video_list.video_2.main_url')
        videoMainUrl = videoMainUrl and videoMainUrl or tools.getJsonValue(videoMsg, 'video_list.video_1.main_url')
        parseVideoUrl = tools.compileJs(parseVideoUrlJSFunc)
        videoUrl = parseVideoUrl('base64decode', videoMainUrl)

        html = tools.getHtml(originalUrl)
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

        # 敏感事件
        sensitive_id = None
        sensitive_event_infos = db.sensitive_event_info.find({})
        for sensitive_event_info in sensitive_event_infos:
            keywords = sensitive_event_info['keyword1']
            keywords = keywords.split(',')
            for keyword in keywords:
                if keyword and (keyword in title or keyword in content):
                    sensitive_id = sensitive_event_info['_id']
                    break

            if sensitive_id:
                break

        # 违规事件
        violate_id = None
        vioation_knowledge_infos = db.vioation_knowledge_info.find({})
        for vioation_knowledge_info in vioation_knowledge_infos:
            keywords = vioation_knowledge_info['keyword1']
            keywords = keywords.split(' ')
            for keyword in keywords:
                if keyword and (keyword in title or keyword in content):
                    violate_id = vioation_knowledge_info['_id']
                    break

            if violate_id:
                break

        log.debug('''
            title:        %s
            abstract :    %s
            imgUrl :      %s
            originalUrl:  %s
            releaseTime : %s
            videoMainUrl: %s
            videoUrl:     %s
            content :     %s
            columnId:     %d
            sensitive_id: %d
            violate_id:   %d

            '''
            %(title, abstract, imgUrl, originalUrl, releaseTime, videoMainUrl, videoUrl, content, columnId, sensitive_id and sensitive_id or 0, violate_id and violate_id or 0)
            )

        # 如果是视频栏 并且不包含敏感或违法信息 则不下载
        if columnId == Constance.VIDEO:
            if not sensitive_id and not violate_id:
                continue

        # 下载
        basePath = Constance.FILE_LOCAL_PATH
        isDownload = 0
        def callFunc():
            global isDownload
            isDownload = 1

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

        if originalUrl:
            basePaser.addContentInfo(title, abstract, imgUrl, imgName, originalUrl, releaseTime, videoUrl, videoName, content, columnId, isDownload, sensitive_id, violate_id)


    basePaser.updateUrl(sourceUrl, Constance.DONE)
