import color from './color'
let base = {
  name: '对象',
  top: 0,
  left: 0,
  width: 200,
  height: 100,
  angle: 0,
  zIndex: 0,
  text: '&nbsp;',
  color: color.black,
  fontSize: 12,
  fontFamily: 'SourceHanSansSC',
  backgroundColor: color.white,
  borderRadius: 0,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: color.black,
  opacity: 100,
  textAlignX: 'center',
  textAlignY: 'center',
  // 是否编辑
  isEdit: false,
  // 是否 name 编辑
  isNameEdit: false,
  // 是否打开，group 专用
  isOpen: false,
  // 是否等比缩放
  isSameRatio: false,
  // 是否锁定
  isLock: false,
}

// 默认矩形
let rect = {
  ...base,
  name: '矩形',
}
let circle = {
  ...base,
  name: '圆形',
  borderRadius: '100%',
  width: 100,
}
// 产能组件，基于圆形并新增 "capacity" 字段
let capacity = {
  ...circle,
  name: '产能',
  // 产能数值，默认空字符串
  capacity: '',
}
// 流程控件，使用图片作为元素图
let process = {
  ...rect,
  name: '流程',
}
// PPS 控件，与流程控件属性一致，仅修改名称
let pps = {
  ...rect,
  name: 'PPS',
}
// connector 控件
let connector = {
  ...rect,
  name: 'connector',
}
// customer 控件
let customer = {
  ...rect,
  name: 'customer',
}
// fifo 控件
let fifo = {
  ...rect,
  name: 'fifo',
}
// stock 控件
let stock = {
  ...rect,
  name: 'stock',
}
let group = {
  ...base,
  name: '群组'
}
let tempGroup = {
  ...base,
  name: '临时群组',
}
let text = {
  ...base,
  name: '文本',
  border: null,
  text: '双击编辑文本',
  width: 72,
  height: 17,
  isAutoSize: true,
  borderWidth: 0,
}
let line = {
  ...base,
  name: '线条',
  backgroundColor: color.gray,
  borderWidth: 1,
  height: 1,
  isAngleLock: false,
}
export {
  rect,
  circle,
  text,
  group,
  tempGroup,
  line,
  capacity,
  process,
  pps,
  connector,
  customer,
  fifo,
  stock,
}
