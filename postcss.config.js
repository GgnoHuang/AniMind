
// 嵌套的css必須配置這個檔案
// 先安裝npm install postcss-nesting --save-dev
// 就會跑出這檔案
module.exports = {
  plugins: {
    'postcss-nesting': {},// 新增這條上去才不會warn
    tailwindcss: {},
    autoprefixer: {},
  },
}
