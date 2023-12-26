<template>
  <div
    class="flex items-center justify-center gap-8 max-w-lg mx-auto px-4 mb-8"
  >
    <div
      class="bg-primary-100 bg-opacity-30 hover:bg-opacity-50 w-40 h-28 md:w-60 md:h-40 p-4 rounded-lg"
    >
      <h2>درآمد</h2>
      <div class="flex flex-col items-center justify-center p-2 md:p-4">
        <span class="text-xl md:text-2xl">{{ totalAmount.income }}</span>
        <span class="text-sm md:text-lg">تومان</span>
      </div>
    </div>
    <div
      class="bg-primary-100 bg-opacity-30 hover:bg-opacity-50 w-40 h-28 md:w-60 md:h-40 p-4 rounded-lg"
    >
      <h2>مخارج</h2>
      <div class="flex flex-col items-center justify-center p-2 md:p-4">
        <span class="text-xl md:text-2xl">{{ totalAmount.expense }}</span>
        <span class="text-sm md:text-lg">تومان</span>
      </div>
    </div>
  </div>
  <section class="flex flex-col items-center justify-center mt-4">
    <div
      class="text-sm flex items-center justify-between w-full max-w-full md:max-w-2xl px-4 py-2 rounded-lg"
    >
      <div>تراکنش ها</div>
      <div class="flex items-center justify-center md:gap-2">
        <button class="btn flex items-center justify-center gap-1">
          <span>پرینت </span><unicon name="print" fill="royalblue"></unicon>
        </button>
        <button
          @click="downloadExcelFile"
          class="btn flex items-center justify-center gap-1"
        >
          <span>دانلود</span>
          <unicon name="cloud-download" fill="royalblue"></unicon>
        </button>
        <button
          @click="isOpenFilterModal = true"
          class="btn flex items-center justify-center gap-1"
        >
          <span>فیلتر</span> <unicon name="filter" fill="royalblue"></unicon>
        </button>
      </div>
    </div>

    <div class="overflow-x-auto shadow-md sm:rounded-lg mt-2">
      <DisplayTransactionList
        @update-transaction-list="updateTransactionList"
        :transactions="transactionList"
      />
    </div>
    <Modal @closeModal="isOpenFilterModal = false" :isOpen="isOpenFilterModal">
      <FilterTransactionForm
        @resetFilter="resetFilterTransactions"
        :filter-value="filterValue"
        @closeModal="isOpenFilterModal = false"
      />
    </Modal>
  </section>
</template>
<script setup>
import { ref, onMounted, reactive, watchEffect, watch } from "vue";
import DisplayTransactionList from "../components/DisplayTransactionList.vue";
import Modal from "../utils/Modal.vue";
import FilterTransactionForm from "../components/FilterTransactionForm.vue";
import { getFilteredTransactions } from "../service/reports/getFilteredTransactions";
import { getTotalAmount } from "../service/reports/getTotalAmount";
import { downloadExcel } from "../service/reports/downloadExcel ";

const transactionList = ref([]);
const isOpenFilterModal = ref(false);

const totalAmount = reactive({
  income: 0,
  expense: 0,
});
const filterValue = ref({
  trans_type: "",
  category: "",
  date: "",
});

async function downloadExcelFile() {
  await downloadExcel(filterValue.value);
}

// when user reset filter
function resetFilterTransactions() {
  filterValue.value = {
    trans_type: "",
    category: "",
    date: "",
  };
}

async function updateTransactionList() {
  // update dispaly transacion
  console.log("updatefunction", filterValue.value);
  const data = await getFilteredTransactions(filterValue.value);
  transactionList.value = data;

  // update dispaly total transaction
  const total = await getTotalAmount(filterValue.value);
  totalAmount.income = total.total_in;
  totalAmount.expense = total.total_out;
}

watchEffect(async () => {
  await updateTransactionList();
});
</script>
