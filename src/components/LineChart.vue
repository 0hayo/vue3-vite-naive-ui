<template>
  <BoxSolt :style="style" title="报警趋势统计图" titleIcon="close">
    <BaseEcharts :options="options" width="380px" height="178px"/>
  </BoxSolt>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BoxSolt from "@/components/BoxSolt.vue";
import BaseEcharts from "@/components/echarts/BaseEcharts.vue";
export default defineComponent({
  name: "LineChart",
  components: {
    BoxSolt,
    BaseEcharts,
  },
  setup() {
    const style = {
      width: "400px",
      height: "232px",
      marginTop: "20px",
    };
    const options = {
      grid: {
        left: '3%',
        right: '4%',
        top: '10%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads"],
        bottom: 0,
        textStyle: {
          color: "#fff"
        }
      },
      series: [
        {
          name: "Email",
          type: "line",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    };
    return {
      options,
      style,
    };
  },
});
</script>