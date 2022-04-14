<template>
  <div>
    <div>
      {{ address }}
      <svg-icon iconClass="noNet" />
    </div>
    <n-button @click="login">naive-ui</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { NButton } from 'naive-ui';
export default defineComponent({
  name: 'login',
  components: {
    NButton
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const login = () => {
      document.body.requestFullscreen();
      store.dispatch('addToken', '111')
      router.push({
        path: '/'
      })
    }
    return { login };
  }
})
</script>>
<style scoped>
</style>