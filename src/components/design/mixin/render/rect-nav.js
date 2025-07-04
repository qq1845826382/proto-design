// import * as rectConfig from '@/core/rect-config'
import jsx from 'vue-jsx'
import event from '@/core/event'
// 引入流程控件图片
// 引入所有图片，键名与组件类型一致
// 组件图标统一通过 require 引入，避免构建时路径解析问题
// 键名即组件类型，值为图片资源路径
const images = {
  process: require('@/../res/process.png'),
  PPS: require('@/../res/PPS.png'),
  connector: require('@/../res/connector.png'),
  customer: require('@/../res/customer.png'),
  fifo: require('@/../res/fifo.png'),
  stock: require('@/../res/stock.png'),
}
let {
  span,
  div
} = jsx
// 渲染左侧组件导航
// 每个可拖拽组件都会生成一个 span，拖拽时会创建相应类型的组件
let _renderRectNav = function () {
  let me = this
  // 根据 images 对象生成所有可拖拽组件
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