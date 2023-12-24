<template>
  <div class="h-full w-full text-lg">
    <div class="flex flex-col items-center justify-center w-full mx-auto">
      <button @click="isOpenModal = true" class="text-primart-500 py-4">
        افزودن تراکنش جدید
      </button>
      <section
        class="flex flex-col md:flex-row items-center justify-center gap-8"
      >
        <Chart :options="options" :series="series" name="درآمد" />
        <Chart :options="options" :series="series" name="مخارج" />
      </section>
      <Modal @closeModal="isOpenModal = false" :isOpen="isOpenModal">
        <TransactionForm @update-transaction-list="updateTransactions" />
      </Modal>
      <!-- <section
        class="flex flex-col md:flex-row justify-between gap-8 w-full h- items-stretch"
      >
        <DisplayTransactions
          name="دخل ها"
          :transactions="incomeTransactions"
          @update-transaction-list="updateTransactionsList"
        />
        <DisplayTransactions
          name="خرج ها"
          :transactions="expenseTransactions"
          @update-transaction-list="updateTransactionsList"
        />
      </section> -->

      <button @click="getCategoryTotalClick">get</button>
      <div v-for="total in totalCategoryIncome">{{ total }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getTransactions } from "../service/transaction/getTransactions";
import { getCategoryTotal } from "../service/reports/getCategoryTotal";
import TransactionForm from "../components/TransactionForm.vue";
import Modal from "../utils/Modal.vue";
import DisplayTransactions from "../components/DisplayTransactions.vue";
import Chart from "../components/Chart.vue";

const isOpenModal = ref(false);
const incomeTransactions = ref([]);
const expenseTransactions = ref([]);
const options = ref({});
const series = ref([44, 55, 41, 17, 15]);
const totalCategoryExpense = ref([]);
const totalCategoryIncome = ref([]);

async function updateTransactionList() {
  // get expense transaction
  getTransactions(1).then((expenses) => {
    expenseTransactions.value = expenses;
  });

  // get income transaction
  getTransactions(2).then((incomes) => (incomeTransactions.value = incomes));
}

// function updateTransactions (){
//     getTransactions().then((trans)=>transactions.value = trans);
// }
// onMounted( () => {
//   updateTransactions()
//   console.log("transaction",transactions.value)
// });

onMounted(() => {
  updateTransactionList();
  console.log(totalCategoryIncome);
});
function convertData(data) {
  console.log(data);
  const labels = [];
  const series = [];

  data.forEach((item) => {
    labels.push(item.category__name);
    series.push(item.total_amount);
  });

  return { labels, series };
}
function getCategoryTotalClick() {
  getCategoryTotal("in").then((data) => (totalCategoryIncome.value = data));
}

// const chartInput = ref([]);
// function getCategoryReportHandle() {
//   getCategoryReport().then((reports) => (chartInput.value = reports));
// }
</script>
