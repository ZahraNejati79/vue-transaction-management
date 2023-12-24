<template>
  <aside class="h-screen bg-white border-gray-200">
    <ul class="h-full p-2 flex flex-col items-center justify-start">
      <SildebarItem name="خانه" icon="home" to="/" />
      <SildebarItem name="دسته بندی" icon="book-medical" to="/category" />
      <SildebarItem name="گزارش گیری" icon="chart" to="reports" />
      <SildebarItem
        v-if="user.isAuthenticatedUser"
        name="پروفایل"
        icon="user-square"
        to="profile"
      />
      <SildebarItem
        v-if="!user.isAuthenticatedUser"
        name="ورود/ثبت نام"
        icon="signin"
        to="/login"
      />

      <li
        @click="logoutHandler"
        class="w-full transition duration-300 flex items-center justify-start gap-4 px-4 py-4 cursor-pointer md:hover:bg-primary-100 rounded-lg"
      >
        <span>
          <unicon name="signout" fill="royalblue"></unicon>
        </span>
        <span class="hidden sm:block text-lg">خروج</span>
      </li>
    </ul>
  </aside>
</template>
<script setup>
import { useUserStore } from "../store/user";
import SildebarItem from "../utils/SildebarItem.vue";
import { useRouter } from "vue-router";
const user = useUserStore();
console.log("user is sidebar", user.isAuthenticatedUser);

const router = useRouter();
function logoutHandler() {
  user.logout();
  router.push("/login");
}
</script>
