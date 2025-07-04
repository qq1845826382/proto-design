<style lang="scss">
.process-dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.process-dialog {
  width: 300px;
}
.process-dialog-tabs {
  display: flex;
  border-bottom: 1px solid #bcc3ce;
}
.process-dialog-tab {
  flex: 1;
  text-align: center;
  padding: 4px 0;
  cursor: pointer;
}
.process-dialog-tab-active {
  background: #f1f1fc;
}
</style>
<script>
// 流程控件的配置对话框，包含两个选项卡：产品 和 流程设置
import Vue from 'vue'
import jsx from 'vue-jsx'
let { div, a } = jsx
let ProcessDialog = {
  name: 'ProcessDialog',
  data () {
    return {
      // 是否显示对话框
      isOpen: false,
      // 当前激活的选项卡
      tab: 'product',
    }
  },
  methods: {
    // 打开对话框
    open () {
      this.isOpen = true
      this.tab = 'product'
    },
    // 关闭对话框
    close () {
      this.isOpen = false
    },
    // 渲染选项卡头部
    _renderTabs () {
      let me = this
      return div('.process-dialog-tabs',
        a({
          'class_process-dialog-tab': true,
          'class_process-dialog-tab-active': this.tab === 'product',
          on_click () { me.tab = 'product' }
        }, '产品'),
        a({
          'class_process-dialog-tab': true,
          'class_process-dialog-tab-active': this.tab === 'setting',
          on_click () { me.tab = 'setting' }
        }, '流程设置')
      )
    },
    // 渲染主内容
    _renderMain () {
      let me = this
      let maskProps = {
        'class_process-dialog-mask': true,
        on_click () { me.close() }
      }
      if (!this.isOpen) {
        maskProps = {
          ...maskProps,
          style_display: 'none',
        }
      }
      return div(maskProps,
        div('.process-dialog card', {
          on_click (e) { e.stopPropagation() }
        },
          div('.card-header', this._renderTabs()),
          div('.card-body', '')
        )
      )
    }
  },
  render (h) {
    jsx.h = h
    return this._renderMain()
  }
}
// 通过 Vue 原型提供全局方法，便于随时调用
let globalDialog
Vue.prototype.$processDialog = function () {
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
