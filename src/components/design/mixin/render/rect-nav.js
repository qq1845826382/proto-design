// import * as rectConfig from '@/core/rect-config'
import jsx from 'vue-jsx'
import event from '@/core/event'
// 引入流程控件图片
import processImg from '@/../res/process.png'
import ppsImg from '@/../res/PPS.png'
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
  // 可创建的流程类控件列表
  let imgMap = {
    process: processImg,
    pps: ppsImg,
    connector: connectorImg,
    customer: customerImg,
    fifo: fifoImg,
    stock: stockImg,
  }
  let retTags = Object.keys(imgMap).map(type => {
    let img = jsx.bind('img')
    // 每个图标对应不同图片
    let children = [img({ attrs_src: imgMap[type], style_width: '24px', style_height: '24px' })]
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