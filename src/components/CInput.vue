<template>
  <div class="input-box">
    <span class="label">{{ props.label }}</span>
    <div class="input">
      <svg-icon :iconClass="props.iconClass" className="icon" />
      <input v-model="props.value" :placeholder="props.placeholder" :type="props.type" :maxlength="props.maxlength" @input="input">
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: String,
  iconClass: String,
  name: String,
  value: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  maxlength: {
    type: Number,
    default: 11
  }
})
const emit = defineEmits([
  'userNameInput',
  'passwordInput'
])
const input = (e) => {
  emit(props.name+'Input' as any, e.target.value)
}
</script>

<style lang="scss" scoped>
.input-box {
  width: 320px;
  border-bottom: 1px solid #C4C4C4;

  .label {
    font-size: 14px;
    background: linear-gradient(270deg, #FFFFFF 0%, #32C5FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .input {
    height: 32px;
    display: flex;
    align-items: center;
    margin-top: 4px;

    .icon {
      font-size: 24px;
      color: rgba(255, 255, 255, 0.5);
    }

    input {
      background-color: rgba(0, 0, 0, 0);
      border: none;
      outline: none;
      color: #71D7FF;
      font-size: 20px;
      height: 20px;
      line-height: 20px;
      margin-left: 20px;
    }
  }
}
</style>