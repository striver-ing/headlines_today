# encoding=utf-8
import sys
sys.path.append("..")

import utils.tools as tools
from utils.log import log
from base.collector import Collector
from base.root_url import AddRootUrl
from html_parser.parser_control import PaserControl

def init():
    pass

if __name__ == '__main__':
    log.info("--------begin--------")

    addRootUrl = AddRootUrl()
    addRootUrl.start()

    coll = Collector()
    coll.start()

    paserCount = int(tools.getConfValue("html_parser", "parser_count"))
    while paserCount:
       paser = PaserControl()
       paser.start()
       paserCount = paserCount - 1