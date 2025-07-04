<style scoped lang="scss">
/* 弹框额外样式，可根据需求调整 */
</style>
<script>
import Vue from 'vue'
import jsx from 'vue-jsx'
// 绑定 Element UI 组件
const ElDialog = jsx.bind('el-dialog')
const ElTabs = jsx.bind('el-tabs')
const ElTabPane = jsx.bind('el-tab-pane')

// 使用 Element UI 渲染的流程配置弹框
let ProcessDialog = {
  name: 'ProcessDialog',
  data () {
    return {
      // 控制弹框显示与隐藏
      isOpen: false,
      // 当前选中的标签页
      tab: '产品',
    }
  },
  methods: {
    // 打开弹框时重置到默认标签
    open () {
      this.isOpen = true
      this.tab = '产品'
    },
    // 关闭弹框
    close () {
      this.isOpen = false
    }
  },
  // 不再监听全局鼠标事件，避免点击选项卡或
  // 拖拽其他组件时弹框被意外关闭
  render (h) {
    jsx.h = h
    // 弹框隐藏时不渲染任何内容
    if (!this.isOpen) {
      return null
    }
    let me = this
    return ElDialog({
      props_visible: this.isOpen,
      'on_update:visible': v => { me.isOpen = v },
      props_title: '流程配置',
      props_width: '400px',
      // 点击遮罩层即可关闭弹框
      props_closeOnClickModal: true,
      // 显示右上角关闭按钮
      props_showClose: true,
      on_close: this.close,
    },
      ElTabs({
        props_value: this.tab,
        on_input: val => { me.tab = val }
      },
        [
          ElTabPane({ props_label: '产品', props_name: '产品' }),
          ElTabPane({ props_label: '流程设置', props_name: '流程设置' })
        ]
      )
    )
  }
}
let globalDialog
// 将弹框实例挂载到 Vue 原型，方便全局调用
Vue.prototype.$processDialog = () => {
  if (!globalDialog) {
    let Ctor = Vue.extend(ProcessDialog)
    globalDialog = new Ctor()
    globalDialog.$mount(document.createElement('div'))
    document.body.appendChild(globalDialog.$el)
  }
  globalDialog.open()
}
export default ProcessDialog
</script>
