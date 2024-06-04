---
layout: home

title: Docs
titleTemplate: Front-end learning

hero:
  name: Docs
  text: Where there is a will there is a way
  tagline: There are technical papers mixed in with the miscellany
  image:
    src: /vitepress-logo-large.webp
    alt: Docs
  actions:
    - theme: brand
      text: Explore
      link: /docs/introduction
    - theme: alt
      text: Github
      link: https://github.com/yuwenOvO/yuwenUtils

features:
  - icon: 📚
    title: Some blog posts
    details: A hodgepodge of content, written in a haphazard manner, with a complex composition.
    link: /components/button
    linkText: View components
  - icon: 📝
    title: Learning documents
    details: Some notes recorded during the study process
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
