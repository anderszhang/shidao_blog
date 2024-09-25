---
title: 加了一个评论系统
description: vuepress 集成 arttalk
date: 2024-5-23
categroy: 
    - 记录
tag: 
    - vuepress
    - artalk
---

上午为这个博客加了一个评论功能，我使用的VuePress Theme Hope这个主题，已经集成了多种评论系统，本以为很容易就可以集成进来，具体操作时也多少踩了点坑。

刚开始选择的是官方推荐的Waline插件， 按照教程一步步操作，在Vercel部署完后，才发现最后的Vercel.app域名在国内无法访问，这就比较尴尬了。虽然网上有可以配置自有二级域名的方案，奈何我这个域名在国内备案，不想再在此路上再尝试。

换了第二选择artalk, 这个支持docker私有部署，确实方便了很多。按着教程部署完，成功启动。 artalk服务默认使用8080端口，为了安全起见，在nginx加了一条映射配置，将artalk/路径的请求转发评论服务端口,测试可以成功访问。

更改前端配置theme.ts，集成artalk， 访问测试，发现artalk报了一个错误， 服务返回站点名称不存在，原来artalk要求vuepress站点的名称和设置中的站点名称必须一致。 在后台修改站点名称后再次测试， 可以评论成功。 但界面默认为英文,修改下配置，完成，

``` ts title="theme.ts"
  plugins: {
    comment: {
      provider: "Artalk",
      server: "https://shidao.info/artalk",
      locale: "zh-CN"
    }
  }

```