// import * as rectConfig from '@/core/rect-config'
import jsx from 'vue-jsx'
import event from '@/core/event'
// 引入流程控件图片
// 引入所有图片，键名与组件类型一致
import processImg from '@/../res/process.png'
import PPSImg from '@/../res/PPS.png'
import connectorImg from '@/../res/connector.png'
import customerImg from '@/../res/customer.png'
import fifoImg from '@/../res/fifo.png'
import stockImg from '@/../res/stock.png'
let {
  span,
  div
} = jsx
let _renderRectNav = function () {
  let me = this
  // 根据图片数组生成所有可拖拽组件
  let images = {
    process: processImg,
    PPS: PPSImg,
    connector: connectorImg,
    customer: customerImg,
    fifo: fifoImg,
    stock: stockImg,
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