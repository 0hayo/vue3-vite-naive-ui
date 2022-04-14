<template>
  <div ref="chartRef" :style="{ height, width }" />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, onMounted, onBeforeMount, onBeforeUnmount, nextTick, watchEffect, watch} from "vue";
//引入echarts
import * as echarts from "echarts";
export default defineComponent({
  name: "BaseEcharts",
  props: {
    width: {
      type: String,
      default: "500px",
    },
    height: {
      type: String,
      default: "300px",
    },
    options: {
      type: Object,
      default: () => ({})
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const initCharts = () => {
      const myChart = echarts.init(proxy?.$refs.chartRef as HTMLElement, '', { renderer: 'canvas' });
      // watchEffect(()=>{
        myChart.setOption(props.options);
        watch(() => props.flag, () => {
          myChart.setOption(props.options);
        })
      // })
    };
    onMounted(() => {
      initCharts();
    });
    return {

    };
  }
});
</script>

<style lang="scss" scoped></style>
