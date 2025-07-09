---
outline: deep
---

# 介绍

Nest（NestJS）是一个用于构建高效、可扩展 [Node.js](https://nodejs.org/) 服务器端应用程序的框架。它使用渐进式的JavaScript，完全支持并构建于 [TypeScript](https://www.typescriptlang.org/) 上（同时仍然允许开发者使用纯JavaScript进行编码），结合了面向对象编程（OOP）、函数式编程（FP）和函数响应式编程（FRP）的元素。

在内部，Nest使用强大的HTTP服务器框架，如 [Express](https://expressjs.com/)（默认）并且可以选择配置为使用 [Fastify](https://github.com/fastify/fastify)！

Nest在这些常见的Node.js框架（Express/Fastify）之上提供了一层抽象，同时也直接向开发者暴露了它们的API。这使得开发者可以自由使用众多为底层平台提供的第三方模块。

## 原理

近年来，多亏了Node.js，JavaScript已成为Web前后端应用程序的“通用语言”。这催生了一些了不起的项目，比如 [Angular](https://angular.io/)、[React](https://reactjs.org/) 和 [Vue](https://vuejs.org/)，它们提高了开发者的生产力，使得创建快速、可测试和可扩展的前端应用程序成为可能。然而，尽管存在大量出色的库、助手和工具供Node（以及服务器端JavaScript）使用，但没有一个能有效地解决主要问题——<b>架构</b>。

Nest提供了一个开箱即用的应用程序架构，允许开发者和团队创建高度可测试、可扩展、松耦合且易于维护的应用程序。这个架构在很大程度上受到了Angular的启发。

## 安装

开始使用，您可以使用[Nest CLI](https://nestjs.inode.club/cli/overview)搭建项目，或者克隆一个起始项目（两者都会产生相同的结果）。

使用Nest CLI搭建项目，请运行以下命令。这将创建一个新的项目目录，并在该目录中填充初始的核心Nest文件和支持模块，为您的项目创建一个常规的基础结构。对于首次使用者，建议使用Nest CLI来创建新项目。

```bash
npm i -g @nestjs/cli
nest new project-name
```

::: tip
要使用更严格的功能集创建新的TypeScript项目，请在`nest new`命令中添加`--strict`标志。
:::

或者，使用Git安装TypeScript起始项目：

```bash
git clone https://github.com/nestjs/typescript-starter.git project
cd project
npm install
npm run start
```

::: tip
如果您想要克隆存储库但不需要git历史记录，您可以使用[degit](https://github.com/Rich-Harris/degit)工具。
:::

在浏览器中打开 `http://localhost:3000/`

要安装JavaScript版本的起始项目，请在上面的命令序列中使用javascript-starter.git。

您还可以通过使用npm（或yarn）手动从头开始创建新项目。在这种情况下，您需要自己负责创建项目的样板文件。
