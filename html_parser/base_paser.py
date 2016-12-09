# encoding=utf8
import sys
sys.path.append("..")

import base.constance as Constance
import utils.tools as tools
from utils.log import log

db = tools.getConnectedDB()

def getWebsiteId(domain):
    website = list(db.website.find({'domain':domain}))
    websiteId = None
    if len(website) > 0:
        websiteId = website[0]['_id']
    else:
        log.warning('website表中无%s信息，需先手动添加'%domain)

    return websiteId

def getRegexTypeId(regType):
    regexType = list(db.regex_type.find({'type':regType}))
    regexTypeId = None
    if len(regexType) > 0:
        regexTypeId = regexType[0]['_id']
    else:
        log.warning('regex_type无%s信息，需先手动添加'%regType)

    return regexTypeId

def getRegex(websiteId, regTypeId):
    regexs = []
    for regex in db.regexs.find({'website_id':websiteId, 'type_id':regTypeId}, {'regex':1, '_id':0}):
        regexs.append(regex['regex'])
    return regexs

##################################################
def addUrl(url, websiteId, depth, description = '', status = Constance.TODO):
    for i in db.urls.find({'url':url}):
        return

    urlDict = {'url':url, 'website_id':websiteId, 'depth':depth, 'description':description, 'status':status}
    db.urls.save(urlDict)

def updateUrl(url, status):
    db.urls.update({'url':url}, {'$set':{'status':status}}, multi=True)

def addContentInfo(title, abstract, imgUrl, originlUrl, releaseTime, videoUrl, content, columnId):
    '''
    @summary:
    ---------
    @param title: 添加文章内容
    @param abstract:
    @param imgUrl:
    @param originlUrl:
    @param releaseTime:
    @param videoUrl:
    @param content:
    @param columnId 栏目id
    ---------
    @result:
    '''

    isAudio = videoUrl and True or False
    isDownload = False

    contentInfoDict = {
        'title':title,
        'abstract':abstract,
        'img_url':imgUrl,
        'originl_url':originlUrl,
        'release_time':releaseTime,
        'video_url':videoUrl,
        'content':content,
        'column_id':columnId
        }

    # 查找数据库，根据url和websiteid看是否有相同的纪录，若有，则比较纪录信息，将信息更全的纪录更新到数据库中
    for doc in db.app_content_info.find({'originl_url':originlUrl}, {'_id':0}):
        isDiffent = False
        warning = '\n' + '-' * 50 + '\n'
        for key, value in doc.items():
            if len(str(doc[key])) < len(str(contentInfoDict[key])):
                isDiffent = True
                warning = warning + '更新 old %s: %s\n     new %s: %s\n'%(key, doc[key], key,contentInfoDict[key])
                doc[key] =contentInfoDict[key]

            else:
                warning = warning + '留守 old %s: %s\n     new %s: %s\n'%(key, doc[key], key,contentInfoDict[key])

        if isDiffent:
            warning = '已存在：\n' + warning + '-' * 50
            log.warning(warning)

            db.app_content_info.update({'originl_url':originlUrl}, {'$set':doc})
        else:
            log.warning('已存在originlUrl:  ' + originlUrl)
        return

    db.app_content_info.save(contentInfoDict)