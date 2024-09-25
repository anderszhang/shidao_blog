---
title: npm常用工具库
article: false
date: 2024-09-25
category:
  - 前端
tag:
  - 前端，npm
---
首先说明，同样的功能可能会有不同的工具可以完成， 以下仅列出我比较熟悉的一些库。

# 命令行
- minimist 轻量级命令行解析参数包
- picocolors 一个轻量级的终端颜色输出库
- prompts 轻量、美观、友好的交互式命令行
- cac 一个创建命令行程序的库

# 开发工具
- nanoid 唯一标识生成库，比uuid小而且快
- ufo 一个路径处理的库 
- pathe一个跨平台的路径处理库

# 系统
- cross-spaw 跨平台的进程处理库

# html 处理
- parse5 一个html解析和序列化库

# 文件处理
- mrmime 文件mime类型识别
- picomatch 一个文件匹配器

# 日志
- debug 一个灵活输入日志的库

# web服务器
- connect 一个可扩展的http服务框架，可以集成多个插件处理请求，与node:http.createServer()配合使用
- ws 一个WebSocket library
- cors 一个支持跨域处理的库，和connect配合使用

# 构建工具
- unbuild  rollup的进一步封装，更简单，适用于构建一些库
- esbuild  go语言编写，速度飞快，目前还没有用在生产环境
- chokidar 一个跨平台的文件watch库
- dotenv 加载.env配置文件
- dotenv-expand 将.env配置扩展至process.env

# CSS
- postcss  css处理工具库，做迷你化，格式化，补前缀等功能