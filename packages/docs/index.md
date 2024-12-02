---
layout: home

title: Docs
titleTemplate: 前端经验分享

hero:
  name: Docs
  text: Where there is a will there is a way
  tagline: 杂七杂八的流水账中混杂着一些技术文
  image:
    src: /vitepress-logo-large.webp
    alt: Docs
  actions:
    - theme: brand
      text: 探索
      link: /docs/introduction
    - theme: alt
      text: Github
      link: https://github.com/yuwenOvO/yuwenUtils

features:
  - icon: 📚
    title: 一些博客文章
    details: 杂七杂八的内容，胡乱一通写，成分很复杂
    link: /docs/introduction
    linkText: 看看
  - icon: 📝
    title: 学习文档
    details: 学习过程记录的一些笔记
    link: /docs/introduction
    linkText: 瞅瞅
  - icon: 🛠️
    title: 软件工具安装文档
    details: 软件工具安装，记录前端开发过程中的软件工具安装。
    link: /tools/docker
    linkText: 瞧瞧
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
