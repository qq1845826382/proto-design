import * as rectConfig from '@/core/rect-config'
import jsx from 'vue-jsx'
import event from '@/core/event'
// 引入流程控件图片
import processImg from '@/../res/process.png'
let {
  span,
  div
} = jsx
let _renderRectNav = function () {
  let me = this
  // 仅保留流程控件
  let retTags = ['process'].map(type => {
    // 控件图标使用流程图片
    let img = jsx.bind('img')
    let children = [img({attrs_src: processImg, style_width: '24px', style_height: '24px'})]
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