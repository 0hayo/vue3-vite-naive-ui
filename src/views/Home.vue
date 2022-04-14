<template>
  <Map></Map>
  <div class="content">
    <Header />
    <div class="left">
      <Timeline />
      <LineChart />
      <EquipmentState />
    </div>
    <div class="right">
      <MinVideo />
      <RadarChart />
      <SonarChart />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Map from '@/components/Map.vue';
import Header from '@/components/Header.vue';
import Timeline from '@/components/Timeline.vue';
import LineChart from '@/components/LineChart.vue';
import EquipmentState from '@/components/EquipmentState.vue';
import MinVideo from '@/components/video/MinVideo.vue';
import RadarChart from '@/components/radar/RadarChart.vue';
import SonarChart from '@/components/SonarChart.vue';
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  .left {
    position: absolute;
    top: 94px;
    left: 20px;
    width: 400px;
    height: calc(100vh - 150px);
    // background: linear-gradient(270deg, #060C16 0%, rgba(9, 28, 45, 0.9) 50.06%, #11182D 101.04%);
    // box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  }
  .right {
    position: absolute;
    top: 94px;
    right: 20px;
    width: 400px;
    height: calc(100vh - 150px);
    // background: linear-gradient(270deg, #060C16 0%, rgba(9, 28, 45, 0.9) 50.06%, #11182D 101.04%);
    // box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  }
}
</style>