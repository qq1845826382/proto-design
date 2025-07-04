import {
  middleLeft,
  middleTop,
  tNumber,
} from '@/core/base'
import event from '@/core/event'
export default {
  data () {
    return {
      mouse: {
        ing: false,
        startLeft: 0,
        startTop: 0,
        currLeft: 0,
        currTop: 0,
        // eventType 解释
        // move: 移动 rect
        // resize: 放大 rect
        // rotate: 旋转 rect
        // create: 新建 rect
        // cirlce: 圈选组件
        // movePage: 页面列表移动排序
        eventType: '',
        resizerDir: '',
        createType: '',
        // 鼠标对象
        e: {},
      },
    }
  },
  methods: {
    // 鼠标按下时初始化坐标并记录状态
    _startMouseDown (e) {
      let point = this._getMousePoint(e)
      this.mouse.startLeft = this.mouse.currLeft = point.left
      this.mouse.startTop = this.mouse.currTop = point.top
      // 当没有选中组件且事件类型为移动时，不进入拖拽状态
      if (!this.currRectId && this.mouse.eventType === 'move') {
        this.mouse.ing = false
      }
      else {
        this.mouse.ing = true
      }
      // 鼠标位置记录，用于 _move 等函数
      this.mouse.e = e
      // 开始拖拽前同步临时数据，保证移动/旋转基准正确
      if (this.currRectId && ['move', 'resize', 'rotate'].includes(this.mouse.eventType)) {
        let rect = this.objects[this.currRectId]
        this._updateRectTempData(rect)
      }
    },
  },
  created () {
    let me = this
    let mouse = this.mouse
    let mousedown = (e) => {
      this._startMouseDown(e)
      event.$emit('windowMouseDown', e)
    }
    let mousemove = (e) => {
      let currRect = this.objects[this.currRectId]
      if (!mouse.ing){
        return
      }
      mouse.e = e
      let scale = this.scale
      let mousePoint = this._getMousePoint(e)
      let left = mouse.currLeft = mousePoint.left 
      let top = mouse.currTop = mousePoint.top
      let eventType = mouse.eventType
      let mx = (left - mouse.startLeft) / scale
      let my = (top - mouse.startTop) / scale

      if (eventType === 'resize'){
        me._resize(mx, my)
      }
      else if (eventType === 'rotate'){
        let mousePoint = {
          left: mouse.currLeft,
          top: mouse.currTop,
        }
        me._rotate(mousePoint)
      }
      else if (eventType === 'move'){
        me._move(currRect, mx, my)
      }
      else if (eventType === 'create'){
        if ( (e.clientX > middleLeft) && (e.clientY > middleTop) ){
          let createType = mouse.createType
          let data = this.rectConfig[createType]
          let rect = this._createRect(createType)
          this._updateRectTempData(rect)
          this._moveTo(rect, 
            tNumber(left - data.width / 2),
            tNumber(top - data.height / 2)
          )
          mouse.eventType = 'move'
          mouse.startLeft = left
          mouse.startTop = top
          me._focusRect(rect, e)
        }
      }
    }
    let mouseup = () => {
      if (!mouse.ing){
        return
      }
      // circle 在结束时候判定，提高性能
      if (mouse.eventType === 'circle'){
        this._focusRectWhenCircle()
      }
      mouse.ing = false
      mouse.eventType = ''
      mouse.e = {}
      this._clearGuideShow()
      this._historyPush()
    }
    this.windowEventAdd('mousedown', mousedown)
    this.windowEventAdd('mousemove', mousemove)
    this.windowEventAdd('mouseup', mouseup)
    // 右键
    this.windowEventAdd('contextmenu', (e) => {
      e.preventDefault()
    })
    // event
    event.$on('windowMouseDown', (e) => {
      this._startMouseDown(e)
    })
  },
  mounted () {
    let $middle = this.$refs.middle
    $middle.addEventListener('scroll', () => {
      this._renderRule()
    })
  }
}