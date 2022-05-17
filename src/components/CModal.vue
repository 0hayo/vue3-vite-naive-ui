<template>
  <n-modal v-model:show="showCModal" :style="style" :close-on-esc="false" :mask-closable="false">
    <div class="c-modal">
      <div class="c-modal_header">
        <div class="c-modal_header_title">
          <svg-icon :iconClass="header.iconClass" className="icon" @click="close" />
          <span>{{ header.title }}</span>
        </div>
        <svg-icon iconClass="close" className="icon" @click="close" />
      </div>
      <TimeInput></TimeInput>
      <slot></slot>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import TimeInput from './TimeInput.vue';
interface Header {
  iconClass: string
  title: string
}

const { style } = defineProps({
  style: {
    type: Object,
    default: {}
  }
})

const showCModal = inject('showCModal');
const header = inject('header') as Header;
const close = inject('close');

</script>

<style lang="scss" scoped>
.c-modal {
  // width: 620px;
  // height: 910px;
  border: 15px solid #000;
  border-image-source: url("@/assets/borderbg.png");
  border-image-slice: 15 15;
  background: rgba(18, 32, 51, 0.6);
  backdrop-filter: blur(30px);
  color: #fff;

  &_header {
    display: flex;
    justify-content: space-between;

    &_title {
      font-size: 14px;
      background: linear-gradient(270deg, #FFFFFF 0%, #32C5FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      border-bottom: 1px solid #32c5ff;
      padding-right: 5px;

      .icon {
        color: #32c5ff;
      }
    }
  }
}
</style>