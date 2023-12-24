<template>
  <div
    class="bg-white h-full w-full md:w-1/2 flex flex-col items-center justify-center pt-4 rounded-lg"
  >
    <h1 class="w-full text-center">{{ name }}</h1>
    <ul class="w-full">
      <li
        :class="
          transaction.group === 'expense'
            ? 'hover:bg-red-0'
            : 'hover:bg-primary-100'
        "
        class="transition duration-300 flex items-center justify-between p-4 border-b bprder-primary-100 last:border-b-0"
        v-for="transaction in transactions"
      >
        <span>
          <span class="text-xl p-2"> {{ transaction.amount }} </span
          ><span class="text-sm">تومان</span>
        </span>
        <div class="flex items-center justify-center gap-2 md:gap-4">
          <button
            @click="handleDeleteTransaction(transaction.id)"
            class="cursor-pointer"
          >
            <unicon name="trash-alt" fill="royalblue"></unicon>
          </button>
          <button class="cursor-pointer">
            <unicon name="edit" fill="royalblue"></unicon>
          </button>
          <!-- <Modal :isOpen="isOpenModal" @closeModal="isOpenModal = false">
            <CategoryForm
              :existingCategory="selectedEditCategory"
              action="edit"
              @update-category-list="handleUpdateCategory"
              @close-modal="isOpenModal = false"
            />
          </Modal> -->
        </div>
      </li>
    </ul>
    <div></div>
  </div>
</template>
<script setup>
import { deleteCategory } from "../service/category/deleteCategory";
import { defineProps, defineEmits, ref } from "vue";
import Modal from "../utils/Modal.vue";
import CategoryForm from "./CategoryForm.vue";

const isOpenModal = ref(false);
const selectedEditTransaction = ref({});
const props = defineProps(["transactions", "name"]);
const emit = defineEmits(["update-category-list"]);

//send emit to categryPage for update categoryList
function handleUpdateTransaction() {
  emit("update-category-list");
}

function handleDeleteTransaction(transactionId) {
  deleteCategory(transactionId).then(() => handleUpdateTransaction());
}

//  open modal and send category props to form Category for edit
function handleEditCategoryItem(category) {
  isOpenModal.value = true;
  selectedEditTransaction.value = category;
}
</script>
