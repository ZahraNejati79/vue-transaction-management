<template>
  <div class="h-full w-full text-lg">
    <div class="flex flex-col items-center justify-center w-full mx-auto">
      <button
        @click="isOpenModal = true"
        class="py-4 mb-4 text-primary-900 font-bold"
      >
        افزودن عنوان جدید
      </button>
      <Modal @closeModal="isOpenModal = false" :isOpen="isOpenModal">
        <CategoryForm
          @closeModal="isOpenModal = false"
          action="submit"
          :initial-dtate="{ group: 1, name: '' }"
          @update-category-list="updateCategoryList"
        />
      </Modal>
      <section
        class="flex flex-col items-center md:flex-row justify-between xl:justify-evenly gap-8 w-full md:items-stretch"
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
  // get expense categories
  getCategories("out").then((expenseCategoryList) => {
    expenseCategories.value = expenseCategoryList;
  });

  // get income categories
  getCategories("in").then(
    (incomeCategoryList) => (incomeCategories.value = incomeCategoryList)
  );
}
onMounted(() => {
  updateCategoryList();
});
</script>
