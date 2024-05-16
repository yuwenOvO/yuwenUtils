---
layout: home

title: Yuwen UI
titleTemplate: Component library for secondary packaging

hero:
  name: Yuwen UI
  text: Component library for secondary packaging
  tagline: Component library for secondary packaging, which is easier to use
  image:
    src: /vitepress-logo-large.webp
    alt: Yuwen UI
  actions:
    - theme: brand
      text: Get Started
      link: /docs/introduction
    - theme: alt
      text: Github
      link: https://github.com/element-plus/element-plus

features:
  - icon: 💡
    title: Instant Server Start
    details: On demand file serving over native ESM, no bundling required!
  - icon: ⚡️
    title: Lightning Fast HMR
    details: Hot Module Replacement (HMR) that stays fast regardless of app size.
  - icon: 🛠️
    title: Rich Features
    details: Out-of-the-box support for TypeScript, JSX, CSS and more.

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