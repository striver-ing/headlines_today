/*
Navicat MySQL Data Transfer

Source Server         : appdb
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : appdb

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-12-06 11:44:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for app_column_info
-- ----------------------------
DROP TABLE IF EXISTS `app_column_info`;
CREATE TABLE `app_column_info` (
  `ID` int(8) NOT NULL AUTO_INCREMENT COMMENT '存储ID',
  `APP_ID` int(8) DEFAULT NULL COMMENT 'APPID',
  `COLUMN_ID` varchar(255) DEFAULT NULL COMMENT 'APP子栏目ID',
  `COLUMN_NAME` varchar(128) DEFAULT NULL COMMENT '栏目名称',
  `PARENT_ID` int(8) DEFAULT NULL COMMENT '父栏目ID',
  `CREATE_TIME` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `APP_ID` (`APP_ID`,`COLUMN_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for app_config_info
-- ----------------------------
DROP TABLE IF EXISTS `app_config_info`;
CREATE TABLE `app_config_info` (
  `ID` int(8) DEFAULT NULL COMMENT '存储ID',
  `STORAGE_URL` varchar(128) DEFAULT NULL COMMENT '存储URL（相对地址）'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for app_content_info 所有的数据
-- ----------------------------
DROP TABLE IF EXISTS `app_content_info`;
CREATE TABLE `app_content_info` (
  `ID` int(8) NOT NULL AUTO_INCREMENT COMMENT '存储ID',
  `APP_ID` int(8) DEFAULT NULL COMMENT 'APPID',
  `COLUMN_ID` int(8) DEFAULT NULL COMMENT 'APP子栏目ID',
  `CONTENT_ID` varchar(128) DEFAULT NULL COMMENT '文章唯一ID',
  `RELEASE_TIME` datetime DEFAULT NULL COMMENT '文章（视听节目）发布时间',
  `TITLE` varchar(128) DEFAULT NULL COMMENT '文章（视听节目）标题文本',
  `ORIGINAL_URL` varchar(128) DEFAULT NULL COMMENT '文章（视听节目）原始地址',
  `CONTENT` text COMMENT '正文（介绍）等文本内容',
  `ABSTRACT_IMAGE_URL` varchar(128) DEFAULT NULL COMMENT '摘要图像网络地址',
  `ABSTRACT_IMAGE_LOCAL_PATH` varchar(128) DEFAULT NULL COMMENT '摘要图像本地相对地址',
  `VIDEO_URL` varchar(128) DEFAULT NULL COMMENT '视听节目网络地址',
  `VIDEO_LOCAL_PATH` varchar(128) DEFAULT NULL COMMENT '视听节目本地相对地址',
  `ISAUDIO` int(8) DEFAULT '0' COMMENT '该链接是否有视听 0-无 1-有',
  `ISDOWNLOAD` int(8) DEFAULT '0' COMMENT '媒体资源是否已下载 0-无 1-有',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `VIOLATE_ID` int(8) DEFAULT NULL COMMENT '违规知识库ID',
  `SENSITIVE_ID` int(8) DEFAULT NULL COMMENT '敏感事件ID',
  `STORAGE_ID` int(8) DEFAULT NULL,
  `CHECK_STATUS` int(2) DEFAULT NULL,
  `CHECK_TIME` datetime DEFAULT NULL,
  `CHECK_USER` int(8) DEFAULT NULL,
  `DOWN_STO_ID` int(8) DEFAULT NULL,
  PRIMARY KEY (`ID`,`CREATE_TIME`),
  UNIQUE KEY `APP_ID` (`APP_ID`,`COLUMN_ID`,`CONTENT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6378 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for violation_content_info 违规的数据
-- ----------------------------
DROP TABLE IF EXISTS `violation_content_info`;
CREATE TABLE `violation_content_info` (
  `ID` int(8) NOT NULL AUTO_INCREMENT COMMENT '存储ID',
  `CONTENT_ID` int(8) NOT NULL COMMENT '对应APP_CONTENT_INFO的存储ID',
  `APP_ID` int(8) DEFAULT NULL COMMENT 'APPID',
  `COLUMN_ID` int(8) DEFAULT NULL COMMENT 'APP栏目ID',
  `RELEASE_TIME` datetime DEFAULT NULL COMMENT '文章（视听节目）发布时间',
  `TITLE` varchar(128) DEFAULT NULL COMMENT '文章（视听节目）标题文本',
  `ORIGINAL_URL` varchar(128) DEFAULT NULL COMMENT '文章（视听节目）原始地址',
  `CONTENT` text COMMENT '正文（介绍）等文本内容',
  `ABSTRACT_IMAGE_URL` varchar(128) DEFAULT NULL COMMENT '摘要图像网络地址',
  `ABSTRACT_IMAGE_LOCAL_PATH` varchar(128) DEFAULT NULL COMMENT '摘要图像本地相对地址',
  `VIDEO_URL` varchar(128) DEFAULT NULL COMMENT '视听节目网络地址',
  `VIDEO_LOCAL_PATH` varchar(128) DEFAULT NULL COMMENT '视听节目本地相对地址',
  `STORAGE_ID` int(8) DEFAULT NULL COMMENT '本地地址相对路径ID',
  `VIOLATE_ID` int(8) DEFAULT NULL COMMENT '违规知识库ID',
  `SENSITIVE_ID` int(8) DEFAULT NULL COMMENT '敏感事件ID',
  `ISAUDIO` int(8) DEFAULT NULL COMMENT '该链接是否有视听 0-无 1-有',
  `CREATE_TIME` datetime DEFAULT NULL,
  `CHECK_STATUS` int(8) DEFAULT NULL,
  `CHECK_TIME` datetime DEFAULT NULL,
  `CHECK_USER` int(8) DEFAULT NULL,
  `DOWN_STO_ID` int(8) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2689 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for app_info
-- ----------------------------
DROP TABLE IF EXISTS `app_info`;
CREATE TABLE `app_info` (
  `APP_ID` int(8) NOT NULL COMMENT 'APPID',
  `APP_NAME` varchar(25) DEFAULT NULL COMMENT 'APP名称',
  `DEVELOPER` varchar(100) NOT NULL COMMENT '开发商',
  `ICON_URL` varchar(255) DEFAULT NULL COMMENT 'APP图标网络地址',
  `ICON_LOCAL_PATH` varchar(255) DEFAULT NULL COMMENT 'APP图标本地地址',
  `CONTENT_IMAGE_URL` varchar(1000) DEFAULT NULL COMMENT 'APP内容截图网络地址',
  `CONTENT_IMAGE_LOCAL_PATH` varchar(1000) DEFAULT NULL COMMENT 'APP内容截图本地地址',
  `SUMMARY` varchar(1024) DEFAULT NULL COMMENT '简介',
  `DOWNLOAD_COUNT` varchar(64) DEFAULT NULL COMMENT '下载量',
  `GOOD_RATE` varchar(64) DEFAULT NULL COMMENT '好评率',
  `MONITOR` int(8) DEFAULT '1' COMMENT '是否监测 0-启用  1-关闭',
  `CREATE_USER_ID` int(8) DEFAULT NULL COMMENT '创建用户ID',
  `UPDATE_TIME` datetime DEFAULT NULL COMMENT 'APP最后更新时间',
  `CREATE_TIME` datetime DEFAULT NULL COMMENT '创建时间',
  `STORAGE_ID` int(8) DEFAULT NULL,
  PRIMARY KEY (`APP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for app_user
-- ----------------------------
DROP TABLE IF EXISTS `app_user`;
CREATE TABLE `app_user` (
  `user_id` int(8) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sensitive_event_info
-- ----------------------------
DROP TABLE IF EXISTS `sensitive_event_info`;
CREATE TABLE `sensitive_event_info` (
  `ID` int(8) NOT NULL AUTO_INCREMENT COMMENT '存储ID',
  `EVENT_NAME` varchar(16) DEFAULT NULL COMMENT '事件名称',
  `CREATE_TIME` datetime DEFAULT NULL COMMENT '创建时间',
  `KEYWORD1` varchar(1024) DEFAULT NULL COMMENT '必须包含字段',
  `KEYWORD2` varchar(1024) DEFAULT NULL COMMENT '包含一个字段',
  `KEYWORD3` varchar(1024) DEFAULT NULL COMMENT '不能包含字段',
  `VOICE_KEYWORD` varchar(1024) DEFAULT NULL COMMENT '语音关键词',
  `CREATE_USER_ID` int(8) DEFAULT NULL COMMENT '创建用户ID',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for story_info
-- ----------------------------
DROP TABLE IF EXISTS `story_info`;
CREATE TABLE `story_info` (
  `ID` int(8) NOT NULL AUTO_INCREMENT COMMENT '存储ID',
  `APP_ID` int(8) DEFAULT NULL COMMENT 'APPID',
  `COLUMN_ID` int(8) DEFAULT NULL COMMENT 'APP子栏目ID',
  `CONTENT_ID` varchar(128) DEFAULT NULL COMMENT 'APP内部ID',
  `NAME` varchar(128) DEFAULT NULL COMMENT '小说名称',
  `AUTHOR` varchar(128) DEFAULT NULL COMMENT '作者',
  `SUMMARY` text COMMENT '简介',
  `ORIGINAL_URL` varchar(128) DEFAULT NULL COMMENT '原始地址',
  `IMAGE_URL` varchar(128) DEFAULT NULL COMMENT '封面地址',
  `IMAGE_PATH` varchar(128) DEFAULT NULL COMMENT '封面本地地址',
  `DIRECTORY_NAME` text COMMENT '章节名称',
  `DIRECTORY_URL` text COMMENT '章节URL',
  `DIRECTORY_PATH` text COMMENT '章节本地路径',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `STORAGE_ID` int(8) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `APP_ID` (`APP_ID`,`COLUMN_ID`,`CONTENT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=610 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for violation_knowledge_info
-- ----------------------------
DROP TABLE IF EXISTS `violation_knowledge_info`;
CREATE TABLE `violation_knowledge_info` (
  `ID` int(8) NOT NULL AUTO_INCREMENT COMMENT '存储ID',
  `NAME` varchar(32) DEFAULT NULL COMMENT '知识库名称',
  `KEYWORD1` varchar(1024) DEFAULT NULL COMMENT '必须包含字段',
  `KEYWORD2` varchar(1024) DEFAULT NULL COMMENT '包含一个字段',
  `KEYWORD3` varchar(1024) DEFAULT NULL COMMENT '不能包含字段',
  `VOICE_KEYWORD` varchar(1024) DEFAULT NULL COMMENT '语音关键词',
  `CREATE_USER_ID` int(8) DEFAULT NULL COMMENT '创建用户ID',
  `CREATE_TIME` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
