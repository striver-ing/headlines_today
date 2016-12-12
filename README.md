今日头条爬虫技术说明
==========

整体思路
--------

1. 抓取今日头条app的数据包
2. 分析数据包，找出请求的数据（如文章列表，文章url等）
3. 根据文章url等信息，抓取文章内容
4. 若文章中包含视频，则取视频url，然后下载

具体实现
------

### 一、抓包 ###

1. 工具：`Fiddler`、 `android`手机、`google浏览器`
2. 步骤：  
    （1）本示例采用[Fiddler](http://fiddler2.com/ "Fiddler")来抓包，安装到电脑，我的电脑是win10
   
    （2）具体配置及使用请见[http://jingyan.baidu.com/article/03b2f78c7b6bb05ea237aed2.html](http://jingyan.baidu.com/article/03b2f78c7b6bb05ea237aed2.html "百度经验")

    （3）打开今日头条app，开始抓包，抓取到的包如下：![](http://i.imgur.com/fC3y96p.png)

    （4）经分析得知左侧的json文件及为文章列表，如图![](http://i.imgur.com/I2Z8Iph.png)

    如右侧第一个content所指的json文件，文件内容为![](http://i.imgur.com/lwaDLHP.png)此时手机上的信息为

    <img src = "http://i.imgur.com/LFSL1AA.png" width = "40%"> 

    可得上面的结论正确

### 二、分析 ###
    
1. 分析所抓到的文章列表数据包：大致分为两类，一类是有视频的文章，一类则是没有视频的文章。
   有视频的文章json内容里均有`video_id`这个key，如下图所示：![](http://i.imgur.com/T4hqaIc.png)
2. 没有视频的文章：json文件内容均包含`title`、 `abstract`、 `article_url`等信息，具体内容如下.
    <pre>
    {
        "read_count":7089,
        "media_name":"数码日记",
        "ban_comment":0,
        "abstract":"一般情况下，购买手机后我们都会买SIM卡，这是无可厚非的事情。但也有些网友买手机仅仅是作为备用机，用于日常上网使用，而在没有SIM卡的情况下，手机要想联网，只能通过连接Wi-Fi的方式实现。",
        "image_list":[
            {
                "url":"http://p1.pstatp.com/list/ef6000f83af6113a252",
                "width":698,
                "url_list":[
                    {
                        "url":"http://p1.pstatp.com/list/ef6000f83af6113a252"
                    },
                    {
                        "url":"http://p4.pstatp.com/list/ef6000f83af6113a252"
                    },
                    {
                        "url":"http://p.pstatp.com/list/ef6000f83af6113a252"
                    }
                ],
                "uri":"list/ef6000f83af6113a252",
                "height":392
            },
            {
                "url":"http://p3.pstatp.com/list/ef6000f83f79a941883",
                "width":981,
                "url_list":[
                    {
                        "url":"http://p3.pstatp.com/list/ef6000f83f79a941883"
                    },
                    {
                        "url":"http://p6.pstatp.com/list/ef6000f83f79a941883"
                    },
                    {
                        "url":"http://p.pstatp.com/list/ef6000f83f79a941883"
                    }
                ],
                "uri":"list/ef6000f83f79a941883",
                "height":551
            },
            {
                "url":"http://p3.pstatp.com/list/ef6000f8405551c32f2",
                "width":943,
                "url_list":[
                    {
                        "url":"http://p3.pstatp.com/list/ef6000f8405551c32f2"
                    },
                    {
                        "url":"http://p6.pstatp.com/list/ef6000f8405551c32f2"
                    },
                    {
                        "url":"http://p.pstatp.com/list/ef6000f8405551c32f2"
                    }
                ],
                "uri":"list/ef6000f8405551c32f2",
                "height":530
            }
        ],
        "has_video":false,
        "article_type":0,
        "tag":"digital",
        "has_m3u8_video":0,
        "keywords":"MIUI,SIM卡,Wi-Fi",
        "user_verified":1,
        "aggr_type":1,
        "cell_type":0,
        "article_sub_type":0,
        "bury_count":0,
        "title":"​不插SIM卡，不用Wi-Fi，小米手机也能上网",
        "ignore_web_transform":1,
        "source_icon_style":1,
        "tip":0,
        "hot":0,
        "share_url":"http://toutiao.com/a6351618096909779201/?iid=6181230843&app=news_article",
        "has_mp4_video":0,
        "source":"数码日记",
        "comment_count":22,
        "article_url":"http://toutiao.com/group/6351618096909779201/",
        "filter_words":[
            {
                "id":"8:0",
                "name":"重复、旧闻",
                "is_selected":false
            },
            {
                "id":"9:1",
                "name":"内容质量差",
                "is_selected":false
            },
            {
                "id":"5:32370023",
                "name":"来源:数码日记",
                "is_selected":false
            },
            {
                "id":"2:306461588",
                "name":"路由器",
                "is_selected":false
            },
            {
                "id":"6:47522",
                "name":"小米手机",
                "is_selected":false
            }
        ],
        "publish_time":1478851309,
        "action_list":[
            {
                "action":1,
                "extra":{
    
                },
                "desc":""
            },
            {
                "action":3,
                "extra":{
    
                },
                "desc":""
            },
            {
                "action":7,
                "extra":{
    
                },
                "desc":""
            },
            {
                "action":9,
                "extra":{
    
                },
                "desc":""
            }
        ],
        "gallary_image_count":4,
        "cell_layout_style":1,
        "tag_id":6351618096909779000,
        "video_style":0,
        "verified_content":"头条问答数码专家，安卓领域老兵",
        "display_url":"http://toutiao.com/group/6351618096909779201/",
        "large_image_list":[
    
        ],
        "item_id":6351618007961175000,
        "repin_count":117,
        "cell_flag":11,
        "user_info":{
            "user_id":3378232303,
            "name":"数码日记",
            "verified_content":"头条问答数码专家，安卓领域老兵",
            "avatar_url":"http://p3.pstatp.com/thumb/1209/1834968385",
            "follow":false,
            "user_verified":true,
            "description":""
        },
        "source_open_url":"sslocal://media_account?media_id=3392972202",
        "level":0,
        "digg_count":0,
        "behot_time":1478855948,
        "cursor":1478855948999,
        "url":"http://toutiao.com/group/6351618096909779201/",
        "preload_web":1,
        "user_repin":0,
        "has_image":true,
        "item_version":0,
        "media_info":{
            "user_id":3378232303,
            "verified_content":"",
            "avatar_url":"http://p2.pstatp.com/large/1209/1834968385",
            "media_id":3392972202,
            "name":"数码日记",
            "follow":false,
            "recommend_reason":"",
            "is_star_user":false,
            "user_verified":true
        },
        "group_id":6351618096909779000,
        "middle_image":{
            "url":"http://p1.pstatp.com/list/ef6000f83af6113a252",
            "width":698,
            "url_list":[
                {
                    "url":"http://p1.pstatp.com/list/ef6000f83af6113a252"
                },
                {
                    "url":"http://p4.pstatp.com/list/ef6000f83af6113a252"
                },
                {
                    "url":"http://p.pstatp.com/list/ef6000f83af6113a252"
                }
            ],
            "uri":"list/ef6000f83af6113a252",
            "height":392
        }
    }
    </pre>

3. 有视频的文章：json文件内容均包含`title`、 `abstract`、 `article_url`等信息，具体内容如下。我们可访问article_url,经过多次采样暂得出今日头条的视频均为内连接。
    <pre>
    {
        "read_count":146886,
        "video_id":"5419c21565a643c7b84ca101ec202087",
        "media_name":"快娱乐",
        "ban_comment":0,
        "abstract":"谢谢观看，欢迎订阅",
        "video_detail_info":{
            "show_pgc_subscribe":1,
            "video_preloading_flag":1,
            "group_flags":32832,
            "direct_play":1,
            "detail_video_large_image":{
                "url":"http://p1.pstatp.com/video1609/f8a0006db230575a16a",
                "width":580,
                "url_list":[
                    {
                        "url":"http://p1.pstatp.com/video1609/f8a0006db230575a16a"
                    },
                    {
                        "url":"http://p4.pstatp.com/video1609/f8a0006db230575a16a"
                    },
                    {
                        "url":"http://p.pstatp.com/video1609/f8a0006db230575a16a"
                    }
                ],
                "uri":"video1609/f8a0006db230575a16a",
                "height":326
            },
            "video_id":"5419c21565a643c7b84ca101ec202087",
            "video_watch_count":131308,
            "video_type":0,
            "video_watching_count":0
        },
        "image_list":[
    
        ],
        "has_video":true,
        "article_type":0,
        "tag":"news_military",
        "has_m3u8_video":0,
        "video_duration":149,
        "user_verified":0,
        "aggr_type":1,
        "cell_type":0,
        "article_sub_type":0,
        "group_flags":32832,
        "bury_count":70,
        "title":"教官训练女兵，反被女兵打",
        "ignore_web_transform":1,
        "source_icon_style":4,
        "tip":0,
        "hot":0,
        "share_url":"http://toutiao.com/a6349548387310305537/?iid=6181230843&app=news_article",
        "has_mp4_video":0,
        "source":"快娱乐",
        "comment_count":64,
        "article_url":"http://toutiao.com/group/6349548387310305537/",
        "filter_words":[
            {
                "id":"8:0",
                "name":"重复、旧闻",
                "is_selected":false
            },
            {
                "id":"9:1",
                "name":"内容质量差",
                "is_selected":false
            },
            {
                "id":"5:62489742",
                "name":"来源:快娱乐",
                "is_selected":false
            },
            {
                "id":"1:1648",
                "name":"军事",
                "is_selected":false
            },
            {
                "id":"6:17453",
                "name":"女兵",
                "is_selected":false
            }
        ],
        "video_play_info":"{"status":10,"message":"success","video_duration":149.6,"video_list":{"video_1":{"definition":"360p","vtype":"mp4","vwidth":640,"vheight":282,"bitrate":401498,"size":8828747,"main_url":"aHR0cDovL3Y2LnBzdGF0cC5jb20vdmlkZW8vYy9lY2JjZjhlNGVkMjc0ZTUwOWY1MWU3MjI2MzA0Y2NjMi8/RXhwaXJlcz0xNDc4ODU5NzY4JkFXU0FjY2Vzc0tleUlkPXFoMGg5VGRjRU1ybTFWbFIyYWQlMkYmU2lnbmF0dXJlPXZ2eWdnTDRkQTRrVGdJSHNHMEdENnN3NnUlMkJFJTNE","backup_url_1":"aHR0cDovL3Y0LnBzdGF0cC5jb20vMDZlZWY4NzU1NDVmMDUyMzk2YTk4NGQ1N2JiOTllODUvNTgyNThkZTgvdmlkZW8vYy9lY2JjZjhlNGVkMjc0ZTUwOWY1MWU3MjI2MzA0Y2NjMi8=","preload_size":327680,"play_load_min_step":2,"play_load_max_step":10},"video_2":{"definition":"480p","vtype":"mp4","vwidth":854,"vheight":376,"bitrate":609772,"size":12723821,"main_url":"aHR0cDovL3Y3LnBzdGF0cC5jb20vNzU5M2E4MzRkYmQ3YWRlYTFjZWZlYzNiMjczYTgzY2YvNTgyNThkZTgvdmlkZW8vYy8yOTdiYmZkMzlhZTU0NDk1YjFmOGJiODJmMmVjZDIyYi8=","backup_url_1":"aHR0cDovL3Y2LnBzdGF0cC5jb20vdmlkZW8vYy8yOTdiYmZkMzlhZTU0NDk1YjFmOGJiODJmMmVjZDIyYi8/RXhwaXJlcz0xNDc4ODU5NzY4JkFXU0FjY2Vzc0tleUlkPXFoMGg5VGRjRU1ybTFWbFIyYWQlMkYmU2lnbmF0dXJlPWx4TWZpYmZvSkIyUUladUxkMjJYQktKQ2dWRSUzRA==","preload_size":327680,"play_load_min_step":2,"play_load_max_step":10},"video_3":{"definition":"720p","vtype":"mp4","vwidth":952,"vheight":420,"bitrate":795675,"size":16199930,"main_url":"aHR0cDovL3Y3LnBzdGF0cC5jb20vOGU3MmU3Yzk5YjAwMjg5ZjM0ODkzMTNiM2RkNjlmNDYvNTgyNThkZTgvdmlkZW8vYy9kN2Y0MjQwNWZlY2E0ZDY2YmI0NjMyYzllYmY1NTYwNy8=","backup_url_1":"aHR0cDovL3Y2LnBzdGF0cC5jb20vdmlkZW8vYy9kN2Y0MjQwNWZlY2E0ZDY2YmI0NjMyYzllYmY1NTYwNy8/RXhwaXJlcz0xNDc4ODU5NzY4JkFXU0FjY2Vzc0tleUlkPXFoMGg5VGRjRU1ybTFWbFIyYWQlMkYmU2lnbmF0dXJlPUZDakVUc29vcThoZFF3T1ppRFplTHh4S1QlMkZnJTNE","preload_size":327680,"play_load_min_step":2,"play_load_max_step":10}}}",
        "publish_time":1478370922,
        "action_list":[
            {
                "action":1,
                "extra":{
    
                },
                "desc":""
            },
            {
                "action":3,
                "extra":{
    
                },
                "desc":""
            },
            {
                "action":7,
                "extra":{
    
                },
                "desc":""
            },
            {
                "action":9,
                "extra":{
    
                },
                "desc":""
            }
        ],
        "cell_layout_style":1,
        "tag_id":6349548387310305000,
        "video_style":0,
        "verified_content":"",
        "display_url":"http://toutiao.com/group/6349548387310305537/",
        "large_image_list":[
    
        ],
        "item_id":6349554764748948000,
        "repin_count":644,
        "cell_flag":11,
        "user_info":{
            "user_id":6380739542,
            "name":"快娱乐",
            "verified_content":"",
            "avatar_url":"http://p1.pstatp.com/thumb/6cb001cda8a0c6718e0",
            "follow":false,
            "user_verified":false,
            "description":""
        },
        "source_open_url":"sslocal://media_account?media_id=6382924961",
        "level":0,
        "like_count":167,
        "digg_count":167,
        "behot_time":1478855563,
        "cursor":1478855563999,
        "url":"http://toutiao.com/group/6349548387310305537/",
        "preload_web":0,
        "user_repin":0,
        "has_image":false,
        "item_version":0,
        "media_info":{
            "user_id":6380739542,
            "verified_content":"",
            "avatar_url":"http://p2.pstatp.com/large/6cb001cda8a0c6718e0",
            "media_id":6382924961,
            "name":"快娱乐",
            "follow":false,
            "recommend_reason":"",
            "is_star_user":false,
            "user_verified":false
        },
        "group_id":6349548387310305000,
        "middle_image":{
            "url":"http://p1.pstatp.com/list/f8a0006db230575a16a",
            "width":640,
            "url_list":[
                {
                    "url":"http://p1.pstatp.com/list/f8a0006db230575a16a"
                },
                {
                    "url":"http://p4.pstatp.com/list/f8a0006db230575a16a"
                },
                {
                    "url":"http://p.pstatp.com/list/f8a0006db230575a16a"
                }
            ],
            "uri":"list/f8a0006db230575a16a",
            "height":282
        }
    }
    </pre>

4. 下载视频：访问article_url 到文章页面，分析并求得视频url，然后下载。
    具体如下：

    （1）拿[http://www.toutiao.com/a6345277767186268418/](http://www.toutiao.com/a6345277767186268418/ "SNH48《哎呦爱哟》MV花絮")为例，用谷歌浏览器打开该网页，内容如图：![](http://i.imgur.com/9qFGLi0.png)按F12可检查视频url，如图：![](http://i.imgur.com/SCyqa25.png)经次刷新，检查视频地址，如下：
    <pre>
    http://v4.pstatp.com/f8da252eabe1c04285e88d59d5456f77/58202d03/video/c/d77569e2c637407180e5410d89a8a1b6/

    http://v4.pstatp.com/a78185c3924c7a43a197a64ecbfc0325/58203cf5/video/c/d77569e2c637407180e5410d89a8a1b6/
    
    http://v6.pstatp.com/video/c/d77569e2c637407180e5410d89a8a1b6/?Signature=%2BO79a1MPRqjDF6mX3k%2BMfI4glQM%3D&Expires=1478511382&KSSAccessKeyId=qh0h9TdcEMrm1VlR2ad/
    
    http://v6.pstatp.com/video/c/d77569e2c637407180e5410d89a8a1b6/?Signature=WegICc2e0Xcb%2FxuriBVw7SxtZfY%3D&Expires=1478511397&KSSAccessKeyId=qh0h9TdcEMrm1VlR2a
    
    http://v4.pstatp.com/68bff4aaceee235cbda85420869ee25a/58203d2b/video/c/d77569e2c637407180e5410d89a8a1b6/d/
    
    http://v6.pstatp.com/video/c/d77569e2c637407180e5410d89a8a1b6/?Signature=H6jlwWrc6MZAFQ8eqn5h8C0qJXw%3D&Expires=1478511498&KSSAccessKeyId=qh0h9TdcEMrm1VlR2ad/
    </pre>

    可知同一个视频，地址是即时的，每次都在变化，再访问以前的地址就被拒绝了，因此在求得url后需要立即下载。

    （2）程序取视频url：由第3点有视频的文章下面陈列出的json文件可知，我们可以取到加密后的视频url，如：
    <pre> "main_url":"aHR0cDovL3Y3LnBzdGF0cC5jb20vOGU3MmU3Yzk5YjAwMjg5ZjM0ODkzMTNiM2RkNjlmNDYvNTgyNThkZTgvdmlkZW8vYy9kN2Y0MjQwNWZlY2E0ZDY2YmI0NjMyYzllYmY1NTYwNy8="
    </pre>
    那么是否可以将这个加密后的url解密？既然谷歌浏览器检查到的视频url是解密后的，那么我想前台可能会有解密的方法，继续用谷歌浏览器检查该网页，点击Network，观察网页在加载时所请求的文件，如图：![](http://i.imgur.com/bO5vfeg.png)据分析得出`tt-video.js`文件与视频有关，查看该文件的源代码，找到如下解密url的函数
    <pre>
    //参数为main_url
    //返回解密后的url
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
    </pre>

    取到视频url后，我们就可以下载该视频了，下载视频代码如下：
    <pre>
    import os
    import urllib

    def downloadFile(url, filename):
        directory = os.path.dirname(filename)
        mkdir_p(directory)
        urllib.urlretrieve(url, filename)
    </pre>

5. 加载等多文章：当上拉查看更多文章时，经过抓包我们可以发现app请求的是同一个url只是参数有些变化，如图：![](http://i.imgur.com/lfOKu7d.png)

    我们拿两个请求来举例

    请求一
    <pre>
    http://is.snssdk.com/api/news/feed/v47/?category=video&refer=1&count=20&min_behot_time=1478077174&last_refresh_sub_entrance_interval=1478077371&loc_mode=6&loc_time=1478076298&latitude=39.90511&longitude=116.355647&city=%E5%8C%97%E4%BA%AC%E5%B8%82&tt_from=pull&lac=4124&cid=43070&cp=53841b92aebbbq1&iid=6060889792&device_id=33418245041&ac=wifi&channel=xiaomi&aid=13&app_name=news_article&version_code=584&version_name=5.8.4&device_platform=android&ab_version=87590%2C86575%2C83095%2C86231%2C86001%2C79287%2C87752%2C87331%2C85046%2C86854%2C88106%2C87982%2C88088%2C87881%2C82679%2C87838%2C88067%2C87804%2C87828%2C87030%2C87498%2C87035%2C86724%2C87988&ab_client=a1%2Cc4%2Ce1%2Cf2%2Cg2%2Cf7&ab_feature=z1&abflag=3&ssmix=a&device_type=MI+2A&device_brand=Xiaomi&language=zh&os_api=16&os_version=4.1.1&uuid=860954025518090&openudid=60fcf5fe7e721c17&manifest_version_code=584&resolution=720*1280&dpi=320&update_version_code=5844&_rticket=1478077371937
    </pre>

    请求二
    <pre>
    http://is.snssdk.com/api/news/feed/v47/?category=video&refer=1&count=20&max_behot_time=1478074962&last_refresh_sub_entrance_interval=1478077377&loc_mode=6&loc_time=1478076298&latitude=39.90511&longitude=116.355647&city=%E5%8C%97%E4%BA%AC%E5%B8%82&tt_from=pre_load_more&lac=4124&cid=43070&cp=55841d9ba3bc1q1&iid=6060889792&device_id=33418245041&ac=wifi&channel=xiaomi&aid=13&app_name=news_article&version_code=584&version_name=5.8.4&device_platform=android&ab_version=87590%2C86575%2C83095%2C86231%2C86001%2C79287%2C87752%2C87331%2C85046%2C86854%2C88106%2C87982%2C88088%2C87881%2C82679%2C87838%2C88067%2C87804%2C87828%2C87030%2C87498%2C87035%2C86724%2C87988&ab_client=a1%2Cc4%2Ce1%2Cf2%2Cg2%2Cf7&ab_feature=z1&abflag=3&ssmix=a&device_type=MI+2A&device_brand=Xiaomi&language=zh&os_api=16&os_version=4.1.1&uuid=860954025518090&openudid=60fcf5fe7e721c17&manifest_version_code=584&resolution=720*1280&dpi=320&update_version_code=5844&_rticket=1478077377769
    </pre>

    为了看清楚一些，把参数单独列出如下
    <pre>
    concern_id  6286225228934679042
    refer   1
    count   20
    max_behot_time  1478067863
    last_refresh_sub_entrance_interval  1478075051
    loc_mode    6
    loc_time    1478072878
    latitude    39.90511
    longitude   116.355647
    city    北京市
    tt_from pre_load_more
    lac 4124
    cid 43070
    cp  59831b9fa22abq1
    iid 6060889792
    device_id   33418245041
    ac  wifi
    channel xiaomi
    aid 13
    app_name    news_article
    version_code    584
    version_name    5.8.4
    device_platform android
    ab_version  87590,86575,83095,86231,86001,79287,87752,87331,85046,86854,88106,87982,88088,87881,82679,87838,88067,87804,87828,87030,87498,87035,86724,87988
    ab_client   a1,c4,e1,f2,g2,f7
    ab_feature  z1
    abflag  3
    ssmix   a
    device_type MI 2A
    device_brand    Xiaomi
    language    zh
    os_api  16
    os_version  4.1.1
    uuid    860954025518090
    openudid    60fcf5fe7e721c17
    manifest_version_code   584
    resolution  720*1280
    dpi 320
    update_version_code 5844
    _rticket    1478075051350
    </pre>

    经过相互对比，我们可知变化的参数为
    <pre>
    max_behot_time  1478073762 #截止这个时间段的头条
    cp  548a1492afbc3q1  #虽然改变但不影响显示结果 不用管
    last_refresh_sub_entrance_interval  1478077379 #当前时间  精确到秒
    _rticket    1478077379699 #当前时间  精确到毫秒
    </pre>

    因此我们只需要拼出这个地址，就可以加载更多文章了。

---

数据库 MongoDB
---
数据库名：`headlines_today`

`urls`表

| 字段名              | 数据类型| 长度 | 说明       | 描述 |
|:-------------------|:-------|:----|:----------|:----|
|title||||标题|
|url||||url|
|status||||状态|
|origin||||来源|

子标签表`app_column_info`:

| 字段名              | 数据类型| 长度 | 说明       | 描述 |
|:-------------------|:-------|:----|:----------|:----|
|COLUMN_ID|||||
|COLUMN_NAME||||


子标签表`app_content_info`:

| 字段名              | 数据类型| 长度 | 说明       | 描述 |
|:-------------------|:-------|:----|:----------|:----|
|column_id||||APP子栏目ID|
|title||||
|original_url||||文章（视听节目）原始地址|
|release_time||||
|content||||
|abstract_image_url||||
|image_local_path||||
|video_url||||
|video_local_path||||
|is_audio||||
|is_download||||
|create_time||||
