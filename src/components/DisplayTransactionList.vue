<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead class="text-xs text-gray-700 bg-primary-100">
      <tr>
        <th scope="col" class="px-2 py-2 md:px-6 md:py-4 hidden md:block">#</th>
        <th scope="col" class="px-2 py-2 md:px-6 md:py-4">توضیح</th>
        <th scope="col" class="px-2 py-2 md:px-6 md:py-4">دسته</th>
        <th scope="col" class="px-2 py-2 md:px-6 md:py-4">قیمت</th>
        <th scope="col" class="px-2 py-2 md:px-6 md:py-4">تاریخ</th>
        <th scope="col" class="px-2 py-2 md:px-6 md:py-4">ویرایش</th>
        <th scope="col" class="px-2 py-2 md:px-6 md:py-4">حذف</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(transaction, index) in transactions"
        class="odd:bg-white even:bg-primary-100 even:bg-opacity-10 border-b text-xs md:text-sm"
      >
        <td
          class="whitespace-nowrap px-3 py-2 md:px-6 md:py-4 font-medium hidden md:block"
        >
          {{ index + 1 }}
        </td>
        <td class="px-3 py-2 md:px-6 md:py-4">{{ transaction.description }}</td>
        <td class="px-3 py-2 md:px-6 md:py-4">{{ transaction.category }}</td>
        <td class="px-3 py-2 md:px-6 md:py-4">
          <span class="p-2"> {{ transaction.amount }} </span>
          <!-- ><span class="text-xs hidden md:block">تومان</span> -->
        </td>
        <td class="px-3 py-2 md:px-6 md:py-4">
          <div
            href="#"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {{ transaction.date }}
          </div>
        </td>
        <td class="px-3 py-2 md:px-6 md:py-4 flex items-center justify-center">
          <button
            @click="handleEditTrasnactionItem(transaction)"
            class="cursor-pointer"
          >
            <unicon
              class="w-4 h-4 md:h-6 md:w-6"
              name="edit"
              fill="royalblue"
            ></unicon>
          </button>
        </td>
        <td class="px-2 py-1 md:px-6 md:py-4">
          <button
            @click="handleDeleteTransaction(transaction.id)"
            class="cursor-pointer text-xs"
          >
            <unicon
              class="w-4 h-4 md:h-6 md:w-6"
              name="trash-alt"
              fill="royalblue"
            ></unicon>
          </button>
        </td>
        <Modal :isOpen="isOpenModal" @closeModal="isOpenModal = false">
          <TransactionForm
            :existingTransaction="selectedEditTransaction"
            action="edit"
            @update-transaction-list="handleUpdateTransaction"
            @close-modal="isOpenModal = false"
          />
        </Modal>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { deleteTransaction } from "../service/transaction/deleteTransaction";
import Modal from "../utils/Modal.vue";
import TransactionForm from "./TransactionForm.vue";
const isOpenModal = ref(false);
const selectedEditTransaction = ref({});

const props = defineProps(["transactions"]);
const emit = defineEmits(["update-transaction-list"]);

//send emit to parent for update list
function handleUpdateTransaction() {
  emit("update-transaction-list");
}

// delete transaction
function handleDeleteTransaction(transactionId) {
  deleteTransaction(transactionId).then(() => handleUpdateTransaction());
}

//  open modal and send transaction props to form transaction for edit
function handleEditTrasnactionItem(transaction) {
  isOpenModal.value = true;
  selectedEditTransaction.value = transaction;
}
</script>
