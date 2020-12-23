CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键自增长ID',
  `pid` varchar(11) NOT NULL DEFAULT '' COMMENT '文档专属PID',
  `effect` tinyint(2) NOT NULL DEFAULT 0 COMMENT '该条设置是否有效，0无效，1有效',
  `author` varchar(20) NOT NULL DEFAULT '' COMMENT '创建者',
  `system` varchar(20) NOT NULL DEFAULT '' COMMENT '系统',
  `title` varchar(1000) NOT NULL DEFAULT '' COMMENT '标题',
  `bookDesc` varchar(20000) NOT NULL DEFAULT '' COMMENT '描述',
  `body` longtext NOT NULL DEFAULT '' COMMENT '文档内容',
  `sort` tinyint(5) NOT NULL DEFAULT 0 COMMENT '顺序',
  `isChildren` int(5) NOT NULL DEFAULT 0 COMMENT '是否存在子节点',
  `updateTime` varchar(20) NOT NULL DEFAULT 0 COMMENT '修改时间',
  `createTime` varchar(20) NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='使用文档'
