# 开发指南：新增可拖拽组件并在面板设置额外字段

## 1. 新增组件配置
1. 在 `src/core/rect-config.js` 中声明新的组件配置对象，通常基于 `rect` 或 `circle` 进行扩展，例如：
   ```javascript
   let capacity = {
     ...circle,            // 继承圆形基础属性
     name: '产能',          // 在组件列表中显示的名称
     capacity: '',         // 新增字段，存储产能数值
   }
   ```
2. 记得在文件末尾的 `export` 中导出该对象。

## 2. 允许从左侧导航创建组件
1. 打开 `src/components/design/mixin/render/rect-nav.js`。
2. `retTags` 数组决定了可创建的组件类型，按需加入新类型：
   ```javascript
   let retTags = ['rect', 'circle', 'text', 'line', 'capacity']
   ```
3. 如果需要自定义图标，可在映射逻辑中处理：
   ```javascript
   if (type === 'capacity') {
     children = [vIcon({ props_name: 'circle' })]  // 使用圆形图标
   }
   ```

## 3. 在样式面板添加额外选项
1. 修改 `src/components/design/mixin/render/setting.js`，在生成表单控件时判断组件类型：
   ```javascript
   if (rect.type === 'rect-capacity') {
     let $capacity = div({ 'class_proto-setting-box-item': true },
       span('产能'),
       input({ ...getInputJsxProps('capacity') })
     )
     children = [...children, $capacity]
   }
   ```
2. `getInputJsxProps` 用于生成输入框常用的 jsx 属性，包含 `on_change` 事件更新数据并推入历史记录。

## 4. 组件名称与渲染
- 组件类型的命名采用 `rect-xxx` 规则，如文件中对 `capacity` 配置后实际组件类型为 `rect-capacity`。
- 渲染函数多数定义在 `src/components/design/mixin/render` 目录下，通过 `jsx` 创建虚拟 DOM。

## 5. 编写详细注释
- 项目多处使用 `vue-jsx`，建议在关键逻辑处给出函数/变量作用解释，便于后续维护。

以上内容能帮助后续的开发者更快地理解如何添加新组件以及在样式面板引入自定义字段。
