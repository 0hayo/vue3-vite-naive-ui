<template>
  <div class="box-solt" :style="style">
    <div class="head">
      <div class="title">
        <svg-icon :iconClass="titleIcon" className="icon" />
        {{ title }}
      </div>
      <div class="more" v-if="moreIcon" @click="RTHandle()">
        <svg-icon :iconClass="moreIcon" className="icon" />
        {{ RTName }}
      </div>
    </div>
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { style, title, titleIcon, moreIcon, RTHandle, RTName } = defineProps({
  style: {
    type: Object,
    default: {
      width: "400px",
      height: "400px",
    },
  },
  title: {
    type: String,
    default: "入侵报警日志",
  },
  titleIcon: {
    type: String,
    default: "",
  },
  moreIcon: {
    type: String,
    default: "",
  },
  RTName: {
    type: String,
    default: "",
  },
  RTHandle: {
    type: Function,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.box-solt {
  box-sizing: border-box;
  border: 10px solid #000;
  border-image-source: url("@/assets/borderbg.png");
  border-image-slice: 10;
  background: rgba(18, 32, 51, 0.6);
  backdrop-filter: blur(30px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 14px;
      background: linear-gradient(270deg, #ffffff 0%, #32c5ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block;
      border-bottom: 1px solid #32c5ff;

      .icon {
        color: #32c5ff;
      }
    }

    .more {
      font-size: 10px;
      cursor: pointer;

      &:active {
        color: #32c5ff;
      }
    }
  }

  .main {
    width: 100%;
    height: calc(100% - 33.39px);
    margin-top: 10px;
  }
}
</style>