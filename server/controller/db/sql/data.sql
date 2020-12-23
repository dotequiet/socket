CREATE TABLE IF NOT EXISTS `booklet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `effect` tinyint(1) DEFAULT 0,
  `version` varchar(20) DEFAULT NULL,
  `system` varchar(20) DEFAULT NULL,
  `dataInfo` varchar(225) DEFAULT NULL,
  `updateTime` varchar(20) DEFAULT NULL,
  `createTime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

/**
CREATE TABLE `booklet` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键自增长ID',
  `effect` tinyint(2) NOT NULL DEFAULT 0 COMMENT '该条设置是否有效，0无效，1有效',
  `version` varchar(20) NOT NULL DEFAULT '' COMMENT '版本号',
  `system` varchar(20) NOT NULL DEFAULT '' COMMENT '系统',
  `dataInfo` varchar(225) NOT NULL DEFAULT '' COMMENT '版本介绍信息',
  `updateTime` varchar(11) NOT NULL DEFAULT 0 COMMENT '发布时间',
  `createTime` varchar(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='版本管理'
*/
