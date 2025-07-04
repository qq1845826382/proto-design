import jsx from 'vue-jsx'
import { tNumber } from '@/core/base'
let {
  div,
  span,
  input,
} = jsx
let _renderSetting = function () {
  let me = this
  let rect = this._safeObject(
    this.currRectId || this._getSelectedRects()[0]
  )
  let children = []
  if (rect) {
    let rectData = rect.data
    let isLock = rectData.isLock
    let getInputJsxProps = (prop) => {
      let value = rectData[prop]
      if (typeof value === 'number') {
        value = tNumber(value, 0)
      }
      return {
        'class_form-input': true,
        'class_input-sm': true,
        domProps_value: value,
        domProps_type: 'number',
        props_value: value,
        domProps_disabled: isLock,
        props_disabled: isLock,
        key: prop,
        'on_change' (e) {
          let v = parseInt(e.target.value)
          rect.data[prop] = v
          me._historyPush()
        }
      }
    }
    // X 坐标
    children.push(div({'class_proto-setting-box-item': true},
      span('X轴坐标'),
      input({
        ...getInputJsxProps('left'),
        on_change (e) {
          let v = parseInt(e.target.value)
          me._moveLeftTo(rect, v)
          me._historyPush()
        }
      })
    ))
    // Y 坐标
    children.push(div({'class_proto-setting-box-item': true},
      span('Y轴坐标'),
      input({
        ...getInputJsxProps('top'),
        on_change (e) {
          let v = parseInt(e.target.value)
          me._moveTopTo(rect, v)
          me._historyPush()
        }
      })
    ))
    // 宽度
    children.push(div({'class_proto-setting-box-item': true},
      span('宽度'),
      input({
        ...getInputJsxProps('width'),
        on_change (e) {
          let v = Math.max(10, parseInt(e.target.value))
          me._resizeWidthTo(rect, v)
          me._historyPush()
        }
      })
    ))
    // 高度
    children.push(div({'class_proto-setting-box-item': true},
      span('高度'),
      input({
        ...getInputJsxProps('height'),
        on_change (e) {
          let v = Math.max(10, parseInt(e.target.value))
          me._resizeHeightTo(rect, v)
          me._historyPush()
        }
      })
    ))
    // 角度
    children.push(div({'class_proto-setting-box-item': true},
      span('角度'),
      input({
        ...getInputJsxProps('angle'),
        on_change (e) {
          let v = parseInt(e.target.value) % 360
          if (v < 0) { v += 360 }
          me._rotateTo(rect, v)
          me._historyPush()
        }
      })
    ))
  }
  return div({
    'class_card': true,
    'class_proto-setting': true,
  },
    div('.card-header',
      div('.card-title h6', '样式'),
    ),
    div('.card-body',
      ...children,
    )
  )
}
export {
  _renderSetting,
}