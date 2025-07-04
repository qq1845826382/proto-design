<style scoped lang="scss">
.process-dialog-mask {
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
  width: 400px;
}
.process-dialog .tab {
  display: flex;
}
.process-dialog .tab a {
  flex: 1;
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
}
.process-dialog .tab a.active {
  font-weight: bold;
  border-bottom: 2px solid #666;
}
</style>
<script>
import Vue from 'vue'
import jsx from 'vue-jsx'
let { div, a } = jsx
const ProcessDialog = {
  name: 'ProcessDialog',
  data () {
    return {
      isOpen: false,
      currTab: 0,
    }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    _renderTabs () {
      let me = this
      let tabProps = index => ({
        'class_tab-item': true,
        'class_active': this.currTab === index,
        on_click () { me.currTab = index }
      })
      return div('.tab tab-block',
        a(tabProps(0), '产品'),
        a(tabProps(1), '流程设置')
      )
    },
    _renderMain () {
      let me = this
      if (!this.isOpen) { return null }
      return div('.process-dialog-mask',
        {
          on_click () { me.close() }
        },
        div('.process-dialog card',
          {
            on_click (e) { e.stopPropagation() }
          },
          div('.card-header', this._renderTabs()),
          div('.card-body',
            this.currTab === 0 ? div('') : div('')
          )
        )
      )
    }
  },
  render (h) {
    jsx.h = h
    return this._renderMain()
  }
}
let globalDialog
Vue.prototype.$processDialog = function () {
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
