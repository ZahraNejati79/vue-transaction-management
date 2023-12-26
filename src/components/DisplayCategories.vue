<template>
  <div
    class="bg-primary-100 bg-opacity-30 h-full w-4/6 md:w-1/2 2xl:w-1/3 flex flex-col items-center justify-center pt-4 rounded-lg"
  >
    <h1 class="w-full text-center text-sm font-bold">{{ name }}</h1>
    <ul class="w-full text-sm">
      <li
        class="transition duration-300 flex items-center justify-between hover:bg-primary-100 p-4 border-b bprder-primary-100 last:border-b-0"
        v-for="category in categories"
      >
        <span>{{ category.name }}</span>
        <div class="flex items-center justify-center gap-2 md:gap-4">
          <button
            @click="handleDeleteCategory(category.id)"
            class="cursor-pointer"
          >
            <unicon
              class="w-4 h-4 md:h-6 md:w-6"
              name="trash-alt"
              fill="royalblue"
            ></unicon>
          </button>
          <button
            @click="handleEditCategoryItem(category)"
            class="cursor-pointer"
          >
            <unicon
              class="w-4 h-4 md:h-6 md:w-6"
              name="edit"
              fill="royalblue"
            ></unicon>
          </button>
          <Modal :isOpen="isOpenModal" @closeModal="isOpenModal = false">
            <CategoryForm
              :existingCategory="selectedEditCategory"
              action="edit"
              @update-category-list="handleUpdateCategory"
              @close-modal="isOpenModal = false"
            />
          </Modal>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { deleteCategory } from "../service/category/deleteCategory";
import { defineProps, defineEmits, ref } from "vue";
import Modal from "../utils/Modal.vue";
import CategoryForm from "./CategoryForm.vue";

const isOpenModal = ref(false);
const selectedEditCategory = ref({});
const props = defineProps(["categories", "name"]);
const emit = defineEmits(["update-category-list"]);

//send emit to categryPage for update categoryList
function handleUpdateCategory() {
  emit("update-category-list");
}

function handleDeleteCategory(categoryId) {
  deleteCategory(categoryId).then(() => handleUpdateCategory());
}

//  open modal and send category props to form Category for edit
function handleEditCategoryItem(category) {
  isOpenModal.value = true;
  selectedEditCategory.value = category;
}
</script>
