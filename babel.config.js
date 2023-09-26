module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
// 安装 Vant组件库
// yarn add vant@latest-v2 -S
// 自动按需引入组件 (推荐)
// yarn add babel-plugin-import -D
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
