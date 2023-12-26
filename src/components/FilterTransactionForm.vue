<template>
  <form
    class="flex flex-col items-start justify-center min-w-[25rem] max-w-lg gap-8 md:px-8 mx-auto px-12"
  >
    <!-- trans_type -->
    <div class="flex items-center justify-center gap-4">
      <div class="flex items-center justify-center gap-2 cursor-pointer">
        <input
          type="radio"
          id="expense"
          value="out"
          v-model="filterData.trans_type"
        />
        <label class="cursor-pointer" for="expense">خرج</label>
      </div>

      <div class="flex items-center justify-center gap-2 cursor-pointer">
        <input
          type="radio"
          id="income"
          value="in"
          v-model="filterData.trans_type"
        />
        <label class="cursor-pointer" for="income">دخل</label>
      </div>
    </div>

    <!-- category -->
    <div class="flex items-center justify-between gap-2 w-full">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >دسته</label
      >
      <select v-model="filterData.category" class="textField__input">
        <option v-for="category in categoryList" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- data -->
    <custom-date-picker
      range="true"
      class="w-full rounded-lg"
      v-model="filterData.date"
    ></custom-date-picker>

    <button
      @click="resetFilterHandler"
      class="btn w-full text-primary-900 font-bold py-3 px-4 bg-white shadow-lg shadow-primary-200 border border-primary-900"
    >
      حذف فیلتر
    </button>
  </form>
</template>
<script setup>
import { reactive, onMounted, ref, watchEffect, defineEmits } from "vue";
import { getCategories } from "../service/category/getCategories";

const emit = defineEmits("filter-to-params", "closeModal", "resetFilter");
const props = defineProps(["closeModal", "filterValue"]);
const filterData = reactive(props.filterValue);

const categoryList = ref([]);

function updateCategory() {
  getCategories(filterData.trans_type).then(
    (categories) => (categoryList.value = categories)
  );
}
onMounted(() => {
  updateCategory();
});

watchEffect(() => {
  updateCategory();
});

function resetFilterHandler() {
  emit("resetFilter");
  emit("closeModal");
}
</script>
