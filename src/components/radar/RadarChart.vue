<template>
  <BoxSolt :style="style" title="雷达扫描图" titleIcon="close">
    <div class="radar-box">
      <canvas id="radar" class="radar" width="380" height="312">您的浏览器暂不支持Canvas</canvas>
    </div>
  </BoxSolt>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import BoxSolt from "@/components/BoxSolt.vue";
import createRadar from './radar';
export default defineComponent({
  name: "LineChart",
  components: {
    BoxSolt,
  },
  setup() {
    const style = {
      width: "400px",
      height: "365px",
      marginTop: "20px"
    };
    onMounted(() => {
      const radar = createRadar('radar');
      if(radar) radar.scan();
      setTimeout(() => {
        radar.addPoints(120, 120);
        radar.removePoints();
      }, 2000);
    })
    return {
      style
    };
  },
});
</script>
<style lang="scss" scoped>
.radar-box {
  width: 100%;
  height: 100%;
  background-color: #0A1A06;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.radar {
  // height: 100%;
  // background-color: #fff;
  background: url("@/assets/radar.png");
}
</style>