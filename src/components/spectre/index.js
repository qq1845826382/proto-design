import SpColor from './color'
import SpContextmenu from './contextmenu'
// 新增对话框组件，用于流程控件的双击配置
import ProcessDialog from './process-dialog'
let components = [
  SpColor,
  SpContextmenu,
  ProcessDialog,
]
let install = (Vue) => {
  components.forEach(com => {
    Vue.component(com.name, com)
  })
}
export default {
  install,
}
