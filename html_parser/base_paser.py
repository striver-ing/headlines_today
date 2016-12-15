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

def addContentInfo(title, abstract, imgUrl, imgPath, originalUrl, releaseTime, videoUrl, videoPath, content, columnId, isDownload, sensitive_id, violate_id):
    '''
    @summary:
    ---------
    @param title: 添加文章内容
    @param abstract:
    @param imgUrl:
    @param originalUrl:
    @param releaseTime:
    @param videoUrl:
    @param content:
    @param columnId 栏目id
    ---------
    @result:
    '''

    isAudio = videoUrl and 1 or 0
    createTime = tools.getCurrentDate()

    contentInfoDict = {
        'title':title,
        'abstract':abstract,
        'img_url':imgUrl,
        'image_local_path':imgPath,
        'original_url':originalUrl,
        'release_time':releaseTime,
        'video_url':videoUrl,
        'video_local_path':videoPath,
        'content':content,
        'column_id':columnId,
        'is_audio':isAudio,
        'is_download':isDownload,
        'create_time':createTime,
        'sensitive_id':sensitive_id,
        'violate_id':violate_id,
        'storage_id':2,
        'app_id':4
        }

    db.app_content_info.save(contentInfoDict)

    if sensitive_id or violate_id:
        db.vioation_content_info.save(contentInfoDict)