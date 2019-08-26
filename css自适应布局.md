/* 超小屏幕（手机，小于 768px） */
/* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */

/* 小屏幕（平板，大于等于 768px） */
@media (min-width: @screen-sm-min) { ... }

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: @screen-md-min) { ... }

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: @screen-lg-min) { ... }

@media (max-width: @screen-xs-max) { ... }
@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) { ... }
@media (min-width: @screen-md-min) and (max-width: @screen-md-max) { ... }
@media (min-width: @screen-lg-min) { ... }

layout-sider 侧边栏
layout-header 顶部栏
layout-footer 页脚栏
layout-content 内容面板
layout-header-bar 菜单栏
layout-nav 导航栏
menu 菜单
breadcrumb 面包屑

wrapper 页面外围控制整体布局宽度
container/content 容器，用于最外层
layout 布局
head/header 页头部分
foot/footer 页脚部分
nav 主导航
subnav 二级导航
menu 菜单
submenu 子菜单
sidebar 侧边栏
sidebar_a,sidebar_b 左侧边栏，右侧边栏
main 页面主体
tag 标签
msg/message 提示信息
tips 小技巧
vote 投票
friendlink 友情链接
title 标题
summary 摘要
loginbar 登录条
search_input 搜索输入框
hot 热门热点
search 搜索
search_output 搜索输出、搜索结果
search_results 搜索结果
searchbar 搜索条
copyright 版本信息
branding 商标
logo 网站logo
siteinfo 网站信息
siteinfolegal 法律声明
siteinfocredits 信誉
joinus 加入我们
partner 合作伙伴
service 服务
register 注册
arr/arrow 箭头
guide 指南
sitemap 地图
list 列表
homepage 首页
subpage 二级页面
tool/toolbar 工具栏
drop-down-menu/dropmenu 下拉菜单
status 状态
scroll 滚动条
tab 标签
left right center 居左 居中 居右
news 新闻
download 下载
banner 广告条/横幅
products 产品
prices 价格
description 描述
review 评论
blog 博客
forum 论坛
keyword 关键字
faqs(FAQs) 常见问题


css命名

master.css,style.css 主要的
module.css 模块
base.css 基本共用
layout.css 布局
themes.css主体
columns.css专栏
font.css字体
forms.css表单
mend.css补丁
print.css打印