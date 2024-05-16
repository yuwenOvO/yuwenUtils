import { createRequire } from "module";
import { defineConfig, type DefaultTheme } from "vitepress";

const require = createRequire(import.meta.url);
const pkg = require("@yuwen/ui/package.json");

export default defineConfig({
  lang: "en-US",
  description: "A good UI framework",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/en/docs/": { base: "/en/docs/", items: sidebarGuide() },
      "/en/components/": { base: "/en/components/", items: sidebarReference() },
    },

    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present yuwen",
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Docs",
      link: "/en/docs/introduction",
      activeMatch: "/en/docs/",
    },
    {
      text: "Components",
      link: "/en/components/button",
      activeMatch: "/en/components/",
    },
    {
      text: pkg.version,
      items: [
        {
          text: "Changelog",
          link: "https://www.bilibili.com/",
        },
        {
          text: "Contributing",
          link: "https://www.bilibili.com/",
        },
      ],
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Introduction",
      link: "introduction",
    },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Button",
      link: "button",
    },

    {
      text: "Radio",
      link: "radio",
    },
  ];
}
