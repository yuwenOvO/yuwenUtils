---
layout: home

title: Yuwen Utils
titleTemplate: Front-end learning

hero:
  name: Yuwen Utils
  text: Front-end learning
  tagline: Front-end learning, record the bits and pieces of front-end learning
  image:
    src: /vitepress-logo-large.webp
    alt: Yuwen Utils
  actions:
    - theme: brand
      text: Get Started
      link: /docs/introduction
    - theme: alt
      text: Github
      link: https://github.com/yuwenOvO/yuwenUtils

features:
  - icon: 🎨
    title: Secondary development components
    details: Secondary development components, based on the popular component library of vue for secondary development to make it more in line with business needs.
    link: /components/button
    linkText: View components
  - icon: 📚
    title: Learning documents
    details: Learning documents, record the bits and pieces of front-end learning.
    link: /docs/introduction
    linkText: View documents
  - icon: 🛠️
    title: Software tool installation document
    details: Software tool installation, record the software tool installation in the front-end development process.
    link: /tools/docker
    linkText: View documents

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