# ResourceMontior-frontend

答辩罢了💩

配合 [ResourceMontior-backend](https://github.com/What-a-mess/ResourceMontior-backend) 食用

~~说明文档之后说不定会补~~

## 基本功能

- CPU
  - 查看占用率
  - 查看基本信息（型号，主频，物理/逻辑内核数）
- 硬盘
  - 查看占用率（忙时间比例）
  - 查看IO速度
- (TODO) home页面展示overall信息
- (TODO) 查看内存占用
- (TODO) 查看文件系统情况（可能不会单独放在一个页面中）
- (TODO) 保存过去一分钟内的全部信息

采用[store模式（全局状态管理）](https://cn.vuejs.org/guide/scaling-up/state-management.html)管理所有数据，并使用一个全局的Timer拉取数据

## 项目结构

```
src
├─api         # 与后端交互的axios配置
├─assets      # 资源文件夹
│  └─css
├─components  # 一些可以复用的组件（单页面组件直接放在src/下）
└─utils       # 一些小工具，目前包括vue-router配置以及store配置
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
