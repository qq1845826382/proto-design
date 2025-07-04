<style lang="scss">
.process-dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.process-dialog {
  background: #fff;
  border: 1px solid #bcc3ce;
  width: 400px;
}
.process-dialog-tabs {
  display: flex;
  border-bottom: 1px solid #bcc3ce;
}
.process-dialog-tab {
  flex: 1;
  text-align: center;
  padding: 6px 0;
  cursor: pointer;
}
.process-dialog-tab-active {
  background: #e6e6e6;
}
.process-dialog-content {
  padding: 20px;
}
</style>
<script>
import Vue from 'vue'
import jsx from 'vue-jsx'
import event from '@/core/event'
let { div, span } = jsx
let ProcessDialog = {
  name: 'ProcessDialog',
  data () {
    return {
      isOpen: false,
      tab: '产品',
    }
  },
  methods: {
    open () {
      this.isOpen = true
      this.tab = '产品'
    },
    close () {
      this.isOpen = false
    }
  },
  created () {
    event.$on('windowMouseDown', () => {
      this.close()
    })
  },
  render (h) {
    jsx.h = h
    if (!this.isOpen) {
      return null
    }
    let me = this
    let tabs = ['产品', '流程设置'].map(t => {
      return span({
        'class_process-dialog-tab': true,
        'class_process-dialog-tab-active': me.tab === t,
        on_click () { me.tab = t }
      }, t)
    })
    return div('.process-dialog-mask',
      {
        on_click () { me.close() }
      },
      div('.process-dialog',
        { on_click (e) { e.stopPropagation() } },
        div('.process-dialog-tabs', ...tabs),
        div('.process-dialog-content')
      )
    )
  }
}
let globalDialog
Vue.prototype.$processDialog = () => {
  if (!globalDialog) {
    let Ctor = Vue.extend(ProcessDialog)
    globalDialog = new Ctor
    globalDialog.$mount(document.createElement('div'))
    document.body.appendChild(globalDialog.$el)
  }
  globalDialog.open()
}
export default ProcessDialog
</script>
