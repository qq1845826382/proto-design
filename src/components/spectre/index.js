import SpColor from './color'
import SpContextmenu from './contextmenu'
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
