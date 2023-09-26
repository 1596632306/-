// 基于postcss插件 实现项目vw适配
// 1.安装插件  yarn add postcss-px-to-viewport@1.1.1 -D
// 2根目录下新建postcss.config.js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
}
