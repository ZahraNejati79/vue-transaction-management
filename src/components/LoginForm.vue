<template>
  <div class="max-w-xl bg-white rounded-lg">
    <h1 class="text-xl font-bold w-full text-center mb-8 mt-4">
      {{ action === "signup" ? "ثبت نام" : "ورود" }}
    </h1>
    <form
      @submit.prevent="handleLogin"
      class="flex flex-col items-start justify-center min-w-[25rem] md:gap-8 px-8"
    >
      <!-- userName -->
      <div class="flex flex-col items-start justify-center gap-2 w-full">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          نام کاربری</label
        >
        <input
          type="text"
          v-model.lazy="userData.username"
          class="textField__input"
          required
        />
      </div>
      <!-- password -->
      <div class="flex flex-col items-start justify-center gap-2 w-full">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          رمز عبور</label
        >
        <input
          type="password"
          v-model.lazy="userData.password"
          class="textField__input"
          required
        />
      </div>

      <button class="w-full btn btn--primary mb-8">
        {{ action === "signup" ? "ثبت نام" : "ورود" }}
      </button>
    </form>

    <div v-if="action === 'login'" @click="goToSignup">
      هنور ثبت نام نکرده اید؟
    </div>
    <div v-if="action === 'signup'" @click="goToLogin">
      قبلا ثبت نام کرده اید؟
    </div>
  </div>
</template>
<script setup>
import { reactive, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
const props = defineProps(["action"]);
const router = useRouter();
const userData = reactive({
  username: "",
  password: "",
});
const user = useUserStore();
// const user = useUserStore();
const goToSignup = () => {
  router.push("/signup");
};
const goToLogin = () => {
  router.push("/login");
};
function handleLogin() {
  props.action === "signup" ? user.signup(userData) : user.login(userData);
}
</script>
