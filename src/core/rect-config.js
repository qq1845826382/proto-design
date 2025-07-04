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
// 流程控件，使用图片作为元素图。
// 新增的图片型组件都与流程组件字段相同，仅尺寸不同，且默认无边框
let process = {
  ...rect,
  name: '流程',
  width: 156,  // 图片原始宽度
  height: 99,  // 图片原始高度
  borderWidth: 0,
}
// 以下组件与流程组件除名称外完全一致，用于渲染不同图片，
// 并根据对应图片设置默认尺寸
let PPS = {
  ...process,
  name: 'PPS',
  width: 174,
  height: 98,
}
let connector = {
  ...process,
  name: 'connector',
  width: 155,
  height: 37,
}
let customer = {
  ...process,
  name: 'customer',
  width: 174,
  height: 117,
}
let fifo = {
  ...process,
  name: 'fifo',
  width: 100,
  height: 25,
}
let stock = {
  ...process,
  name: 'stock',
  width: 80,
  height: 75,
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
  PPS,
  connector,
  customer,
  fifo,
  stock,
}
