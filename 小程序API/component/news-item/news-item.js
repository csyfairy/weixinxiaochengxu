Component({
  options: {
    // 组件配置项  isolated 表示组件样式隔离
    styleIsolation: 'isolated'
  },
  properties: {
    // 这里定义了room属性，属性值可以在组件使用时通过父组件传递进来
    pastData: Array,
    pastDate: Array
  },
  data: {
    // 这里是一些组件内部数据,动态数据和默认数据
    someData: {}
  },
  methods: {


  }
})