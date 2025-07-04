// 根据环境变量 PUBLIC_PATH 动态设置构建后的静态资源前缀
// 在 GitHub Pages 部署时使用默认为 '/proto'
// Docker 部署时可以通过设置 PUBLIC_PATH=/ 来让网站在根路径访问
const publicPath = process.env.PUBLIC_PATH || '/proto'

module.exports = {
  // 开启运行时编译器，方便在模板中使用运行时动态渲染
  runtimeCompiler: true,
  // 指定静态资源的基础路径
  publicPath,
}