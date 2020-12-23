# 前端本地开发指南

## 安装

> 下载项目

```sh
$ cd  /项目文件夹
$ git clone https://github.com/dotequiet/socket.git .
```


> 安装依赖

```sh
$ npm install
# or
$ yarn
```

## 启动服务

> 启动本地服务 默认地址：http://localhost:xxxx

```sh
$ npm run build:dll
$ npm run dev
```



# 前端配置说明

## 服务代理

> proxy配置  ./build/webpack.dev.js  注意：修改配置需要重新编译 `npm run dev`

```json
devServer: {
        proxy: [{
            target: '',
            secure: false,
            changeOrigin: true,
        }]
    }
```

## svg 文件编译

> 新引入的svg文件需要编辑后才可正常使用

```sh
$ npm run svg
```



# 上线步骤

## 编译打包

```sh
$ npm run build
```



# 其他说明

## 自定义脚本 ./package.json

```json
"scripts": {
    // node断点开发
    "startnodeinspect": "nodemon --inspect --inspect-brk server/start.js",
    // node开发
    "startnode": "nodemon server/start.js",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "start": "webpack-dev-server --inline --config ./build/webpack.dev.js --progress --colors",
    "build:dev": "webpack --config ./build/webpack.dev.js",
    // node编译
    "build:node": "babel server --out-dir dist --source-maps --presets=@babel/env",
    "build": "webpack --config ./build/webpack.prod.js",
    // 编译 svg 图标
    "svg": "vsvg -s ./svg -t ./src/icons",
    // 打包通用库
    "build:dll": "webpack --config ./build/webpack.dll.js"
  }
```
