Vue.component('bar-chart',{
  extends: VueChartJs.Bar,
  props: {
    bzp: {
      type: Boolean,
      default: false,
    },
    arp: {
      type: Boolean,
      default: false,
    },
    rc: {
      type: Object,
      default: {}
    },
    al:{
      type: String,
      default: "append",
    },
    ytc: {
      type: String,
      default: "append",
    },
    ytp: {
      type: String,
      default: "left"
    },
    yfsp: {
      type: String,
      default: "italic"
    },
    lg: {
      type: Boolean,
      default: true
    },
    ygl: {
      type: Boolean,
      default: true,
    },
    yts: {
      type: Boolean,
      default: true,
    },
    steps: {
      type: Number,
      default: 2,
    }
  },
  data() {
    return {
      
      chartData: {
        labels: ["2023-02", "2023-03", "2023-04", "2023-05"],
        datasets: [{
          label: 'Bar Chart',
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          pointBorderColor: '#2554FF',
          data: [10, 11, 12, 13]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {
            filter: function(item, chart){
              // console.log(this.al)
              // if (this.al != undefined)item.text += this.al
              return true
            }
          }
        },
        tooltips: {
          enabled: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: true,
              },
              gridLines: {
                display: true,
                drawBorder: true,
              }
            }
          ],
          yAxes: [{
            position: 'left',
            ticks: {
              display: true,
              beginAtZero: false,
              min: undefined,
              max: undefined,
              fontStyle: "italic", // bold,
              stepSize: undefined,
              
              callback: function(value){
                return value
              }
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }
          ]
        }
      }
    }
  },
  methods:{
    render(){
      this.resetCanvas()
      this.renderChart(this.chartData, this.options)
    },
    resetCanvas(){// canvas에 chart rendering 시 이전 chart를 지움
      this.$data._chart.destroy() 
    }
   
  },
  watch: {
    bzp: function(value, oldValue){
      console.log("beginAtZero")
      this.options.scales.yAxes[0].ticks.beginAtZero = value
      this.render()  
    },
    arp: function(value, oldValue){
      console.log("maintainAspectRatio")
      this.options.maintainAspectRatio = value
      this.render()  
    },
    rc: function(value, oldValue){
      this.render()  
    },
    al: function(value, oldValue){
      const filter = (item, chart) => {
        if (value != undefined)item.text = item.text + " " + value
        return true
      }
      
      this.options.legend.labels.filter = filter
      this.render()  
    },
    ytc: function(value, oldValue){
      console.log(value)
      const callback = (yvalue) => {
        return yvalue + " " + value
      }
      
      this.options.scales.yAxes[0].ticks.callback = callback
      this.render()  
    },
    ytp: function(value, oldValue){
      this.options.scales.yAxes[0].position = value
      this.render()  
    },
    yfsp: function(value, oldValue){
      this.options.scales.yAxes[0].ticks.fontStyle = value
      this.render()  
    },
    lg: function(value, oldValue){
      this.options.legend.display = value
      this.render()  
    },
    yts: function(value, oldValue){
      this.options.scales.yAxes[0].ticks.display = value
      this.render()  
    },
    ygl: function(value, oldValue){
      this.options.scales.yAxes[0].gridLines.display = value
      this.render()  
    },
    steps: function(value, oldValue){
      console.log(value)
      this.options.scales.yAxes[0].ticks.stepSize = value
      this.render()
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
  }
)

var vm = new Vue({
  el: '.app',
  data: {
    yticksStepSize: undefined,
    yticksStepSizeProp: undefined,
    
    yticksProp: true,
    yGridLinesProp: true,
    legendProp: true,
    
    yFontStyleProp: 'italic',
    yFontStylePropList: [
      {name: 'italic', value: 'italic'},
      {name: 'bold', value: 'bold'}
    ],
    
    ytickPositionProp: 'left',
    ytickPositionList: [
      {name: 'left', value: 'left'},
      {name: 'right', value: 'right'}
    ],
    legend: "",
    appendLegendProp: "",
    
    yticksAppend: "",
    yAxesTicksCallbackProp: "",
    
    aspectRatioProp: false,
    beginZeroProp: false,
    
    width: 100,
    resizeWidth: 100,
    
    height: 100,
    resizeHeight: 100,
    
    
    message: "This is Basic Bar Chart with options",
    subMessage: "See code for options not listed below",
  },
  watch: {
  },
  computed: {
    resizeChart: function() {
      let result = {"width": this.resizeWidth + "%", "height": this.resizeHeight+"%"};
      console.log(result)
      return result
    }
  },
  methods: {
    changeBeginZeroProp(){
      this.beginZeroProp = !(this.beginZeroProp)
    },
    changeAspectRatioProp(){ // 그래프가 height 밖으로 나감
      this.aspectRatioProp = !(this.aspectRatioProp)
    },
    changeWidth(){
      this.resizeWidth = this.width
    },
    changeHeight(){
      this.resizeHeight = this.height
    },
    appendLegend(){
      this.appendLegendProp = this.legend
    },
    appendYticks(){
      this.yAxesTicksCallbackProp = this.yticksAppend
    },
    changeLegend(){
      this.legendProp = (!this.legendProp)
    },
    changeYticks(){
      this.yticksProp = (!this.yticksProp)
    },
    changeYgridLines(){
      this.yGridLinesProp = (!this.yGridLinesProp)
    },
    changeStepSize(){
      this.yticksStepSizeProp = this.yticksStepSize
    }
  },
})