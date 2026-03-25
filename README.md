# Vue Admin Template

一个基于 `Vue 3 + TypeScript + Vite + Vue Router + Pinia + Element Plus` 的后台项目模板，已经预置布局、登录流、路由守卫、请求封装、环境变量拆分和基础页面。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Element Plus
- Yarn 1

## 本地启动

```bash
yarn install
cp .env.example .env
cp .env.development.example .env.development
yarn dev
```

默认开发环境开启 `mock`，不依赖真实后端也能直接看到登录页、工作台和个人中心。

## 构建

```bash
yarn build
```

## 环境变量

真实环境文件不再入库，仓库只保留示例文件：

- `.env.example`
- `.env.development.example`
- `.env.production.example`

推荐做法：

```bash
cp .env.example .env
cp .env.development.example .env.development
cp .env.production.example .env.production
```

然后根据你的后端地址调整：

- `VITE_APP_TITLE`
- `VITE_REQUEST_TIMEOUT`
- `VITE_API_BASE_URL`
- `VITE_USE_MOCK`

## 项目结构

```text
src/
  api/          接口定义
  layouts/      后台布局
  mock/         本地 mock 数据
  router/       路由表与守卫
  stores/       Pinia 状态管理
  types/        公共类型
  utils/        工具函数
  views/        页面
```

## CI

已内置 GitHub Actions，在 `push` 到 `main` 和 `pull_request` 时自动执行：

```bash
yarn install --frozen-lockfile
yarn build
```
