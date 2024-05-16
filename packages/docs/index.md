---
layout: home

title: Yuwen UI
titleTemplate: 二次封装的组件库

hero:
  name: Yuwen UI
  text: 二次封装的组件库
  tagline: 二次封装的组件库，使用起来更简单
  image:
    src: /vitepress-logo-large.webp
    alt: Yuwen UI
  actions:
    - theme: brand
      text: 起步
      link: /docs/introduction
    - theme: alt
      text: Github
      link: https://github.com/element-plus/element-plus

features:
  - icon: 💡
    title: 快速启动
    details: 按需加载文件，无需打包！
  - icon: ⚡️
    title: 闪电般的热更新
    details: 无论应用大小，热模块替换（HMR）始终保持快速。
  - icon: 🛠️
    title: 丰富的功能
    details: 支持开箱即用的TypeScript、JSX、CSS等。

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