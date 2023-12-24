<template>
  <div class="h-full w-full text-lg">
    <div class="flex flex-col items-center justify-center w-full mx-auto">
      <section
        class="border border-gray-300 flex flex-col items-center justify-center gap-8 p-8 rounded-lg"
      >
        <form
          class="flex flex-col items-start justify-center min-w-[25rem] gap-4 px-8"
          @submit.prevent="editUserHandler"
        >
          <!-- usrname -->
          <div class="flex flex-col items-start justify-between gap-2 w-full">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >نام کاربری</label
            >
            <input
              type="text"
              v-model.lazy="userDate.username"
              class="textField__input"
              required
            />
          </div>
          <!-- passwod -->
          <div class="flex flex-col items-start justify-between gap-2 w-full">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              رمز عبور</label
            >
            <input
              type="text"
              v-model.lazy="userDate.passwod"
              class="textField__input"
            />
          </div>
          <!-- first_name -->
          <div class="flex flex-col items-start justify-between gap-2 w-full">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >نام
            </label>
            <input
              type="text"
              v-model.lazy="userDate.first_name"
              class="textField__input"
              required
            />
          </div>
          <!-- last_name -->
          <div class="flex flex-col items-start justify-between gap-2 w-full">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >نام خانوادگی</label
            >
            <input
              type="text"
              v-model.lazy="userDate.last_name"
              class="textField__input"
              required
            />
          </div>

          <button class="btn btn--primary w-full mt-4">ویرایش</button>
        </form>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getUser } from "../service/user/getUser";
import { editUser } from "../service/user/editUser";
const userDate = ref({
  username: "",
  passwod: "",
  first_name: "",
  last_name: "",
});
function editUserHandler() {
  editUser(userDate.value).then(() => updateUserData());
}
function updateUserData() {
  getUser().then((data) => (userDate.value = data));
}
onMounted(() => {
  updateUserData();
});
</script>
