<template>
  <header
    class="bg-primary-100 w-full h-16 shadow-lg flex justify-center items-center px-4 mb-8 sticky top-0"
  >
    <nav
      class="container flex justify-between items-center md:max-w-6xl lg:max-w-7xl"
    >
      <!-- mobile navbar -->
      <div className="md:hidden ">
        <div
          v-if="isOpenNavModal"
          className="fixed inset-0 bg-opacity-20 backdrop-blur-sm "
          id="container"
        >
          <div
            dir="rtl"
            className=" w-[60vw] h-screen absolute top-0  right-0  bg-primary-100"
          >
            <div className="w-full text-left border-b-2 ">
              <button @click="isOpenNavModal = false">
                <unicon name="multiply" fill="royalblue"></unicon>
                >
                <AiOutlineClose />
              </button>
            </div>
            <ul className=" flex-col border-t-gray-500 pt-4">
              <SildebarItem name="خانه" icon="home" to="/" />
              <SildebarItem
                name="دسته بندی"
                icon="book-medical"
                to="/category"
              />
              <SildebarItem name="گزارش گیری" icon="chart" to="/reports" />
              <SildebarItem
                v-if="user.isAuthenticatedUser"
                name="پروفایل"
                icon="user-square"
                to="/profile"
              />
              <SildebarItem
                v-if="!user.isAuthenticatedUser"
                name="ورود/ثبت نام"
                icon="signin"
                to="/login"
              />

              <li
                v-if="user.isAuthenticatedUser"
                @click="logoutHandler"
                class="w-ful transition duration-300 flex items-center justify-start gap-4 px-4 py-4 cursor-pointer md:hover:bg-primary-100 rounded-lg"
              >
                <span class="flex items-center justify-center">
                  <unicon name="signout" fill="royalblue"></unicon>
                </span>
                <span class="text-sm">خروج</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          v-if="!isOpenNavModal"
          @click="isOpenNavModal = !isOpenNavModal"
        >
          <unicon name="bars" fill="royalblue"></unicon>
        </button>
      </div>
      <div
        className="md:min-w-[50%] 2xl:min-w-[40%] flex items-center md:text-lg justify-between"
      >
        <ul className="hidden w-full md:flex md:items-center gap-x-4  ">
          <SildebarItem name="خانه" icon="home" to="/" />
          <SildebarItem name="دسته بندی" icon="book-medical" to="/category" />
          <SildebarItem name="گزارش گیری" icon="chart" to="reports" />
        </ul>
      </div>

      <div>
        <ul className="flex items-center justify-center md:gap-8 gap-2">
          <router-link v-if="user.isAuthenticatedUser" to="/profile">
            <li class="flex items-center justify-center p-4">
              <unicon name="user-square" fill="royalblue"></unicon>
            </li>
          </router-link>
          <router-link v-if="!user.isAuthenticatedUser" to="/login">
            <li class="flex items-center justify-center p-4">
              <unicon name="signin" fill="royalblue"></unicon>
            </li>
          </router-link>
          <li
            v-if="user.isAuthenticatedUser"
            @click="logoutHandler"
            class="flex items-center justify-center p-4"
          >
            <unicon name="signout" fill="royalblue"></unicon>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { ref } from "vue";
import SildebarItem from "../utils/SildebarItem.vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
const isOpenNavModal = ref(false);
const user = useUserStore();

const router = useRouter();
function logoutHandler() {
  user.logout();
  router.push("/login");
}
</script>
