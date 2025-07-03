import * as rectConfig from '@/core/rect-config'
import jsx from 'vue-jsx'
import event from '@/core/event'
let {
  span,
  div
} = jsx
// vIcon 用于显示组件图标
let vIcon = jsx.bind('v-icon')
let _renderRectNav = function () {
  let me = this
  // 新增可创建的组件类型 "capacity"
  let retTags = ['rect', 'circle', 'text', 'line', 'capacity'].map(type => {
    let children = [rectConfig[type].name]
    // capacity 组件使用圆形图标
    if (type === 'capacity') {
      children = [vIcon({props_name: 'circle'})]
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