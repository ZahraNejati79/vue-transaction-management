<template>
  <header class="flex items-center justify-between max-w-lg mx-auto mb-8">
    <div
      class="bg-primary-100 bg-opacity-30 hover:bg-opacity-50 w-60 h-40 p-4 rounded-lg"
    >
      <h2>درآمد کل</h2>
      <div class="flex flex-col items-center justify-center p-4">
        <span class="text-4xl">258,000</span>
        <span>تومان</span>
      </div>
    </div>
    <div
      class="bg-primary-100 bg-opacity-30 hover:bg-opacity-50 w-60 h-40 p-4 rounded-lg"
    >
      <h2>مخارج کل</h2>
      <div class="flex flex-col items-center justify-center p-4">
        <span class="text-4xl">28,000</span>
        <span>تومان</span>
      </div>
    </div>
  </header>
  <section class="flex flex-col items-center justify-center mt-4 bg-gray-600">
    <header
      class="flex items-center justify-between w-full max-w-full md:max-w-2xl px-4 py-2 rounded-lg"
    >
      <div>تراکنش های اخیر</div>
      <div class="flex items-center justify-center gap-2">
        <button class="btn flex items-center justify-center gap-2">
          <span>پرینت </span><unicon name="print" fill="royalblue"></unicon>
        </button>
        <button
          @click="downloadExcelFile"
          class="btn flex items-center justify-center gap-2"
        >
          <span>دانلود</span>
          <unicon name="cloud-download" fill="royalblue"></unicon>
        </button>
        <button
          @click="isOpenFilterModal = true"
          class="btn flex items-center justify-center gap-2"
        >
          <span>فیلتر</span> <unicon name="filter" fill="royalblue"></unicon>
        </button>
      </div>
    </header>

    <div class="overflow-x-auto shadow-md sm:rounded-lg mt-2">
      <DisplayTransactionList
        @update-transaction-list="updateTransactionList"
        :transactions="transactionList"
      />
    </div>
    <Modal @closeModal="isOpenFilterModal = false" :isOpen="isOpenFilterModal">
      <FilterTransactionForm @filter-to-params="getFilteredTransaction" />
    </Modal>
  </section>
</template>
<script setup>
import { deleteCategory } from "../service/category/deleteCategory";
import { defineProps, defineEmits, ref, onMounted } from "vue";
import { getTransactions } from "../service/transaction/getTransactions";
import DisplayTransactionList from "../components/DisplayTransactionList.vue";
import { getCategoryReport } from "../service/reports/getCategoryReport";
import { downloadAndDisplayExcel } from "../service/reports/downloadAndDisplayExcel ";
import Modal from "../utils/Modal.vue";
import FilterTransactionForm from "../components/FilterTransactionForm.vue";
import { getFilteredTransactions } from "../service/reports/getFilteredTransactions";
const transactionList = ref([]);
const isOpenFilterModal = ref(false);

async function downloadExcelFile() {
  await downloadAndDisplayExcel();
}

async function updateTransactionList() {
  // get  transaction list
  getTransactions().then((transactions) => {
    transactionList.value = transactions;
  });
}
onMounted(() => {
  updateTransactionList();
});

async function getFilteredTransaction(filters) {
  getFilteredTransactions(filters).then(
    (data) => (transactionList.value = data)
  );
}
</script>
