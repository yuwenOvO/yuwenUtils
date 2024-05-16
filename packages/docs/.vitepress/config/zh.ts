import { createRequire } from "module";
import { defineConfig, type DefaultTheme } from "vitepress";

const require = createRequire(import.meta.url);
const pkg = require("@yuwen/ui/package.json");

export default defineConfig({
  lang: "zh-CN",
  description: "一个好用的UI框架",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/docs/": { base: "/docs/", items: sidebarGuide() },
      "/components/": { base: "/components/", items: sidebarReference() },
    },

    editLink: {
      pattern: "https://www.bilibili.com/",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2024-${new Date().getFullYear()} yuwen`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "文档",
      link: "/docs/introduction",
      activeMatch: "/docs/",
    },
    {
      text: "组件",
      link: "/components/button",
      activeMatch: "/components/",
    },
    {
      text: pkg.version,
      items: [
        {
          text: "更新日志",
          link: "https://www.bilibili.com/",
        },
        {
          text: "参与贡献",
          link: "https://www.bilibili.com/",
        },
      ],
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "简介",
      link: "introduction",
    },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "button组件",
      link: "button",
    },
    {
      text: "radio组件",
      link: "radio",
    },
  ];
}
