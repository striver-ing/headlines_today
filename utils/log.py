# encoding=utf8
import logging
import os
from logging.handlers import RotatingFileHandler

PROJECT_NAME = 'headlines_today'
CURRENT_PATH = os.path.abspath('.')
PROJEC_TPATH = CURRENT_PATH[:CURRENT_PATH.find(PROJECT_NAME) + len(PROJECT_NAME)]
FILE_NAME    = PROJEC_TPATH+'\\log\\%s.log'%PROJECT_NAME
LOG_FORMAT   = '%(thread)d %(threadName)s %(asctime)s %(filename)s %(funcName)s [line:%(lineno)d] %(levelname)s %(message)s'

if not os.path.exists(PROJEC_TPATH+'\\log\\'):
    os.makedirs(PROJEC_TPATH+'\\log\\')

logging.basicConfig(level=logging.DEBUG,
    format= LOG_FORMAT,
    datefmt='%Y-%m-%d %H:%M:%S',
    # filename=FILE_NAME,
    # filemode='w'
    )

# console = logging.StreamHandler()
# console.setLevel(logging.DEBUG)
# formatter = logging.Formatter(LOG_FORMAT)
# console.setFormatter(formatter)
# logging.getLogger('').addHandler(console)

#定义一个RotatingFileHandler，最多备份5个日志文件，每个日志文件最大10M
Rthandler = RotatingFileHandler(FILE_NAME, mode = 'w',  maxBytes=10*1024*1024,backupCount=20)
Rthandler.setLevel(logging.DEBUG)
formatter = logging.Formatter(LOG_FORMAT)
Rthandler.setFormatter(formatter)
logging.getLogger('').addHandler(Rthandler)

log = logging

#日志级别大小关系为：critical > error > warning > info > debug