<template>
  <BoxSolt :style="style" title="报警趋势统计图" titleIcon="appstore">
    <BaseEcharts :options="options" :flag="flag" width="380px" height="200px" />
  </BoxSolt>
</template>

<script lang="ts" setup>
import BoxSolt from "@/components/BoxSolt.vue";
import BaseEcharts from "@/components/echarts/BaseEcharts.vue";
import EquipmentApi from '@/api/equipment';
import { StatisticsResult } from '@/typings/global'
import { onMounted, reactive, ref } from 'vue';
import { FormatDate, TimeType } from '@/utils';

onMounted(() => {
  getDateArr();
  getWarningLog();
})

let flag = ref(false);
const style = {
  width: "400px",
  height: "257px",
  marginTop: "20px",
};
const options: any = {
  grid: {
    left: '3%',
    right: '4%',
    top: '10%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  legend: {
    data: ["地听", "声纳", "雷达"],
    bottom: 0,
    textStyle: {
      color: "#fff"
    }
  },
  series: []
};

const params = reactive({
  beginDate: '2022-05-20',
  endDate: '2022-06-27'
});
const getWarningLog = async () => {
  try {
    const data = await EquipmentApi.statistics<StatisticsResult>(params);
    const list = data.result;
    const dt = list.dt.map(v => v.num)
    const dtObj = {
      name: "地听",
      type: "line",
      data: dt
    }
    const sonar = list.sonar.map(v => v.num)
    const sonarObj = {
      name: "声纳",
      type: "line",
      data: sonar
    }
    const radar = list.radar.map(v => v.num)
    const radarObj = {
      name: "雷达",
      type: "line",
      data: radar
    }
    options.series = [dtObj, sonarObj, radarObj];
    flag.value = !flag.value;
  } catch (error) {
    console.log(error);
  }
};
const getDateArr = () => {
  const dateArr: Array<string> = [];
  const date = new Date();
  for (let i = 0; i < 7; i++) {
    const date1 = FormatDate(date.getTime() - i * 24 * 60 * 60 * 1000, TimeType.yyyy_mm_dd);
    dateArr.push(date1)
  }
  options.xAxis.data = dateArr;
}
</script>