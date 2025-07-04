<style lang="scss">
.process-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.process-dialog {
  background: #fff;
  width: 400px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.process-dialog-tabs {
  display: flex;
  border-bottom: 1px solid #ccc;
}
.process-dialog-tab {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
}
.process-dialog-tab-active {
  font-weight: bold;
}
.process-dialog-content {
  min-height: 150px;
  padding: 10px;
}
</style>
<script>
import Vue from 'vue'
import jsx from 'vue-jsx'
let { div } = jsx
let ProcessDialog = {
  name: 'ProcessDialog',
  data () {
    return {
      isOpen: false,
      currTab: '产品',
    }
  },
  methods: {
    open () { this.isOpen = true },
    close () { this.isOpen = false },
    switchTab (tab) { this.currTab = tab },
  },
  render (h) {
    jsx.h = h
    if (!this.isOpen) {
      return null
    }
    let me = this
    let tab = (name) => div({
      'class_process-dialog-tab': true,
      'class_process-dialog-tab-active': me.currTab === name,
      on_click () { me.switchTab(name) },
    }, name)
    return div('.process-dialog-overlay', {
      on_click () { me.close() },
    },
      div('.process-dialog', {
        on_click (e) { e.stopPropagation() },
      },
        div('.process-dialog-tabs',
          tab('产品'),
          tab('流程设置'),
        ),
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
