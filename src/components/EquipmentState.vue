<template>
  <BoxSolt :style="style" title="设备状态" titleIcon="close" moreIcon="close">
    <div class="eq-box">
      <div class="eq" v-for="item in equipments" :key="item.name">
        <p class="name">{{ item.name }}</p>
        <svg-icon :iconClass="item.icon" className="icon" />
        <p class="num">{{ item.num }}个</p>
        <p class="state">{{ item.state }}</p>
      </div>
    </div>
  </BoxSolt>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BoxSolt from "@/components/BoxSolt.vue";
export default defineComponent({
  name: "EquipmentState",
  components: {
    BoxSolt,
  },
  setup() {
    const style = {
      width: "400px",
      height: "220px",
      marginTop: "20px",
    };
    const equipments = [
      {
        name: '雷达',
        icon: 'touxiang',
        num: 1,
        state: '全部在线'
      },
      {
        name: '地听器',
        icon: 'touxiang',
        num: 7,
        state: '全部在线'
      },
      {
        name: '声纳',
        icon: 'touxiang',
        num: 4,
        state: '全部在线'
      }
    ]
    return {
      style,
      equipments
    };
  },
});
</script>
<style lang="scss" scoped>
.eq-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .eq {
    text-align: center;
    font-size: 14px;
    .name, .num {
      background: linear-gradient(270deg, #FFFFFF 0%, #32C5FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    .state {
      color: #ECFFFB;
    }
    .icon {
      font-size: 32px;
    }
  }
}
</style>