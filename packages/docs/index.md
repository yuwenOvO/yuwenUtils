---
layout: home

title: YuwenDocs
titleTemplate: 前端学习

hero:
  name: YuwenDocs
  text: 前端学习
  tagline: 前端学习，记录前端学习的点点滴滴
  image:
    src: /vitepress-logo-large.webp
    alt: YuwenDocs
  actions:
    - theme: brand
      text: 起步
      link: /docs/introduction
    - theme: alt
      text: Github
      link: https://github.com/yuwenOvO/yuwenUtils

features:
  - icon: 🎨
    title: 二开组件
    details: 二开组件，基于vue流行的组件库进行二次开发，使其更符合业务需求。
    link: /components/button
    linkText: 查看组件
  - icon: 📚
    title: 学习文档
    details: 学习文档，记录前端学习的点点滴滴。
    link: /docs/introduction
    linkText: 查看文档
  - icon: 🛠️
    title: 软件工具安装文档
    details: 软件工具安装，记录前端开发过程中的软件工具安装。
    link: /tools/docker
    linkText: 查看文档

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
