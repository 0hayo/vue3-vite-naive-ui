<template>
  <BoxSolt :style="style" title="雷达高清监控画面" titleIcon="close">
    <Video></Video>
  </BoxSolt>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BoxSolt from "@/components/BoxSolt.vue";
import Video from "@/components/video/Video.vue";
export default defineComponent({
  name: "LineChart",
  components: {
    BoxSolt,
    Video,
  },
  setup() {
    const style = {
      width: "400px",
      height: "310px"
    };
    return {
      style
    };
  },
});
</script>