<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box_title">雷达水声探测周界安防系统</div>
      <div class="login-box_input">
        <CInput label="用户名" iconClass="name" name="userName" :value="userName" placeholder="在此输入登录账号" @userNameInput="userNameInput" />
        <CInput label="密码" iconClass="password" name="password" :value="password" placeholder="在此输入登录密码" type="password" @passwordInput="passwordInput" />
      </div>
      <div class="login-box_btn">
        <button class="login-box_btn-bt" @click="login">
          <div class="text">登&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp录</div>
        </button>
      </div>
    </div>
  </div>
  <div v-if="loading" class="loading">
    <img src="../assets/loading.gif" alt="">
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CInput from '@/components/CInput.vue';
import userApi from '@/api/user'
const loading = ref(false);
const userName = ref('')
const password = ref('')
const router = useRouter()
const store = useStore()
const login = () => {
  userApi.login(userName.value, password.value).then(data => {
    try {
      const result = data.result;
      store.dispatch('login', result)
      loading.value = true;
      document.body.requestFullscreen();
      router.push({
        path: '/'
      })
    } catch (error) {
      
    }
  })
}
const userNameInput = (v) => {
  userName.value = v;
}
const passwordInput = (v) => {
  password.value = v;
}
</script>

<style scoped lang="scss">
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #122E3B;
  display: flex;
  justify-content: center;
  align-items: center;

  &-box {
    width: 800px;
    height: 438px;
    background: url("../assets/login_bg.png") no-repeat;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);

    &_title {
      width: 100%;
      height: 62px;
      text-align: center;
      line-height: 62px;
      font-size: 32px;
      background: linear-gradient(180deg, #FFFFFF 0%, #38C6FE 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-top: 12px;
    }

    &_input {
      width: 100%;
      height: 130px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;
    }

    &_btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 70px;

      &-bt {
        width: 208px;
        height: 44px;
        padding: 3px 0;
        border: 2px solid #000;
        border-image-source: url("@/assets/login_btn.png");
        border-image-slice: 2;
        outline: none;
        background-color: rgba(255, 255, 255, 0);
        box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.6);

        .text {
          height: 100%;
          height: 34px;
          font-size: 20px;
          color: #38C6FE;
          line-height: 34px;
          background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 52.08%, rgba(255, 255, 255, 0) 100%);
        }

        &:active {
          box-shadow: none;
          filter: drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.6));
        }
      }
    }
  }
}

.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>