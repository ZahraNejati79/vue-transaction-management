<template>
  <div class="h-full w-full text-lg">
    <div class="flex flex-col items-center justify-center w-full mx-auto">
      <button @click="isOpenModal = true" class="text-primart-500 py-4">
        افزودن عنوان جدید
      </button>
      <Modal @closeModal="isOpenModal = false" :isOpen="isOpenModal">
        <CategoryForm
          action="submit"
          :initial-dtate="{ group: 1, name: '' }"
          @update-category-list="updateCategoryList"
        />
      </Modal>
      <section
        class="flex flex-col md:flex-row justify-between gap-8 w-full h- items-stretch"
      >
        <DisplayCategories
          name="دسته های دخل"
          :categories="incomeCategories"
          @update-category-list="updateCategoryList"
        />
        <DisplayCategories
          name="دسته های خرج"
          :categories="expenseCategories"
          @update-category-list="updateCategoryList"
        />
      </section>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import DisplayCategories from "../components/DisplayCategories.vue";
import Modal from "../utils/Modal.vue";
import CategoryForm from "../components/CategoryForm.vue";
import { getCategories } from "../service/category/getCategories";
const incomeCategories = ref([]);
const expenseCategories = ref([]);
const isOpenModal = ref(false);

async function updateCategoryList() {
  // get expense
  getCategories("out").then((expenseCategoryList) => {
    expenseCategories.value = expenseCategoryList;
  });

  // get income
  getCategories("in").then(
    (incomeCategoryList) => (incomeCategories.value = incomeCategoryList)
  );
}
onMounted(() => {
  updateCategoryList();
});
</script>
