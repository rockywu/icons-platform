# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.20)
# Database: icons
# Generation Time: 2017-07-24 09:36:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table audit_icons
# ------------------------------------------------------------

DROP TABLE IF EXISTS `audit_icons`;

CREATE TABLE `audit_icons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '字体id',
  `p_id` int(11) NOT NULL DEFAULT '0' COMMENT '申请项目id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '关联用户表（users - u_id)',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '字体名称',
  `hash` char(32) NOT NULL DEFAULT '' COMMENT '字体内容hash',
  `svg` text NOT NULL COMMENT '字体svg详细内容',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '字体状态（0-临时,1-通过，2-待审， 3-不过）',
  `audit_uid` int(11) NOT NULL DEFAULT '0' COMMENT '对其审核用户',
  `r_id` int(11) NOT NULL DEFAULT '0' COMMENT '替换管理关系id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table icons
# ------------------------------------------------------------

DROP TABLE IF EXISTS `icons`;

CREATE TABLE `icons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL COMMENT '上传人id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `svg` text NOT NULL COMMENT '图标svg',
  `hash` char(32) NOT NULL DEFAULT '' COMMENT '图标hash',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '图标昵称',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '0为系统添加，1为历史添加',
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash` (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table logs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `logs`;

CREATE TABLE `logs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `json_log` text NOT NULL COMMENT '操作日志',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table projects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '项目id',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '项目名称',
  `tag` varchar(50) NOT NULL DEFAULT '' COMMENT '项目标签',
  `flag` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0-为有效，1-为删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0为系统项目，1为个人项目',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table relation_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relation_tags`;

CREATE TABLE `relation_tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `i_id` int(11) NOT NULL COMMENT '字体id',
  `tag` varchar(20) NOT NULL DEFAULT '' COMMENT '标签名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table relations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relations`;

CREATE TABLE `relations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `i_id` int(11) NOT NULL COMMENT '字体id',
  `p_id` int(11) NOT NULL COMMENT '项目id',
  `u_id` int(11) NOT NULL COMMENT '关联人id',
  `unicode` char(4) NOT NULL COMMENT '字体编码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最新更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `u_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` char(10) NOT NULL DEFAULT '' COMMENT '用户公司id',
  `user_name` varchar(50) NOT NULL DEFAULT '' COMMENT '中文名',
  `user_code` varchar(10) NOT NULL COMMENT '用户企业编号',
  `user_email` varchar(50) NOT NULL COMMENT '用户邮箱',
  `english_name` varchar(50) NOT NULL DEFAULT '' COMMENT '英文名',
  `permissions` varchar(256) NOT NULL DEFAULT '' COMMENT '用户权限用“|”分隔',
  `group` int(11) NOT NULL COMMENT '组编号',
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
