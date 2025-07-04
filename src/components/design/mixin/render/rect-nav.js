import * as rectConfig from '@/core/rect-config'
import jsx from 'vue-jsx'
import event from '@/core/event'
// 引入流程图标资源
import processImg from '@/../res/process.emf'
let {
  span,
  div
} = jsx
// vIcon 用于显示组件图标
let vIcon = jsx.bind('v-icon')
let _renderRectNav = function () {
  let me = this
  // 只保留流程控件
  let retTags = ['process'].map(type => {
    let children = [rectConfig[type].name]
    if (type === 'process') {
      children = [
        jsx.create('img', {
          attrs_src: processImg,
          style_width: '28px',
          style_height: '28px'
        })
      ]
    }
    return span({
      'class_label': true,
      on_mousedown (e) {
        e.stopPropagation()
        me.mouse.eventType = 'create'
        me.mouse.createType = type
        event.$emit('windowMouseDown', e)
      },
    }, ...children)
  })
  return div({
    'class_proto-rect-tags': true,
    'class_card': true,
  },
    div({
      'class_card-header': true
    }, 
      div({
        'class_card-title': true,
        'class_h6': true,
      }, '组件')
    ),
    div({
      'class_card-body': true,
    },
      ...retTags,
    ),
  )
}
export {
  _renderRectNav
}