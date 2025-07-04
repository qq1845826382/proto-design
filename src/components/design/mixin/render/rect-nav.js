// import * as rectConfig from '@/core/rect-config'
import jsx from 'vue-jsx'
import event from '@/core/event'
// 左侧导航只展示图片型组件，可拖拽创建对应流程控件
let {
  span,
  div
} = jsx
let _renderRectNav = function () {
  let me = this
  // 根据图片名称映射图片资源，键名即组件类型
  // require 语句在构建时会被 webpack 处理为图片 URL
  let images = {
    process: require('@/../res/process.png'),
    PPS: require('@/../res/PPS.png'),
    connector: require('@/../res/connector.png'),
    customer: require('@/../res/customer.png'),
    fifo: require('@/../res/fifo.png'),
    stock: require('@/../res/stock.png'),
  }
  let retTags = Object.keys(images).map(type => {
    let img = jsx.bind('img')
    // 使用对应图片作为控件图标
    let children = [img({ attrs_src: images[type], style_width: '24px', style_height: '24px' })]
    return span({
      'class_label': true,
      on_mousedown (e) {
        e.stopPropagation()
        me.mouse.eventType = 'create'
        me.mouse.createType = type
        me._startMouseDown(e)
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