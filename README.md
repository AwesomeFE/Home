# Home

## 全栈代码构架结构：

```

├── client              // 客户端代码
│ ├── build                 // 前端构建代码
│ │ ├── loaders                 // 构建loader
│ │ ├── plugins                 // 构建插件
│ │ ├── index.js                // 主入口文件
│ │ ├── config.base.js          // 构建基础配置
│ │ ├── config.staging.js       // 预生产环境构建配置
│ │ ├── config.production.js    // 生产环境构建配置
│ │ ├── config.development.js   // 开发环境构建配置
│ │
│ ├── dist              // 构建文件目录
│ ├── src               // 前端源代码
│ │ ├── admin               // 管理员后台前端项目源代码
│ │ ├── client              // 主网站前端项目代码
│ │ │ ├── components            // 共用组件
│ │ │ ├── directives            // 共用指令
│ │ │ ├── scss                  // 共用样式
│ │ │ ├── constants             // 共用静态变量
│ │ │ ├── pages                 // 页面代码
│ │ │ ├── services              // 网络服务代码
│ │ │ ├── vuex                  // vuex数据管理
│ │ │ ├── main.js               // 主入口文件
│ │ │ ├── main.scss             // 主scss文件
│ │ │ ├── router.js             // 路由配置
│ │ │
│ ├── index.html        // 前端共用HTML文件
│
├── config          // 全局配置表
│ ├── index.js          // 配置主文件
│ ├── staging.env       // 预生产环境全局配置
│ ├── production.env    // 生产环境全局配置
│ ├── development.env   // 开发环境全局配置
│
├── logs            // 日志文件夹
├── server          // 后台服务代码
│ ├── src               // 后台源代码
│ │ ├── constants           // 后台公共静态变量
│ │ ├── controllers         // 后台models控制器代码，即models apis方法
│ │ ├── models              // 后台数据模型
│ │ ├── routes              // 后台路由
│ │ ├── services            // 后台服务代码
│ │ ├── app.js              // 后台主代码
│ │ │
│ ├── index.js          // 后台代码主入口
│
├── test            // 测试文件夹
├── uploads         // 用户上传文件
├── .babelrc        // babel配置表
├── README.md       // Readme.md
├── package.json    // package.json
├── jsconfig.json   // vscode配置

```

## 运行环境

- node v7.10 以上
- mongodb v3.4.4 以上

## 安装项目

- 由于项目使用ccap做图形验证码生成，所以在windows环境下请安装C++编译环境
- 加入了后台切图功能，需要预安装以下软件：
  - mac OSX 用户运行 `brew install pkg-config cairo libpng jpeg giflib`
  - Windows 用户：
    - 先安装[Chocolatey](https://chocolatey.org/)
    - 再安装cairo[32位](http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip)/[64位](http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip)并且解压到C:\GTK目录下.
    - 然后再运行 `choco install -y python2 gtk-runtime microsoft-build-tools libjpeg-turbo`
- 安装项目依赖包`npm install`

## 启动项目

- 启动mongodb数据库
- 针对相应环境，填写config文件夹下的配置表 [development|staging|production].cofig
- 在开发模式下：
  - 启动后台服务代码 `npm run development:server`
  - 启动前台服务代码 `npm run development:client`
- 在预生产/生产模式下：
  - 启动主程 `npm run staging` 或者 `npm run production`
  
## 运行测试

- 启动数据库
- 启动测试代码 `npm run test`

