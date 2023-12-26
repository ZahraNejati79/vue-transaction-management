<template>
  <div class="h-full w-full text-lg">
    <div class="flex flex-col items-center justify-center w-full mx-auto">
      <button
        @click="isOpenModal = true"
        class="py-4 mb-4 text-primary-900 font-bold"
      >
        افزودن تراکنش جدید
      </button>
      <section
        class="flex flex-col md:flex-row items-center justify-center gap-8"
      >
        <Chart
          :options="incomeChartInput.options"
          :series="incomeChartInput.series"
          name="درآمد"
        />
        <Chart
          :options="expenseChartInput.options"
          :series="expenseChartInput.series"
          name="مخارج"
        />
      </section>
      <Modal @closeModal="isOpenModal = false" :isOpen="isOpenModal">
        <TransactionForm
          @closeModal="isOpenModal = false"
          @update-transaction-list="updateTransactionChart"
        />
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import TransactionForm from "../components/TransactionForm.vue";
import Modal from "../utils/Modal.vue";
import Chart from "../components/Chart.vue";
import { getCategoryTotal } from "../service/reports/getCategoryTotal";
const isOpenModal = ref(false);

const incomeChartInput = reactive({
  options: {
    labels: [],
  },
  series: [],
});

const expenseChartInput = reactive({
  options: {
    labels: [],
  },
  series: [],
});

async function updateTransactionChart() {
  const dataIncomeChart = await getCategoryTotal("in");
  const incomeChart = convertData(dataIncomeChart);
  incomeChartInput.options.labels = incomeChart.labels;
  incomeChartInput.series = incomeChart.series;

  const dataExpenseChart = await getCategoryTotal("out");
  const expenseChart = convertData(dataExpenseChart);
  expenseChartInput.options.labels = expenseChart.labels;
  expenseChartInput.series = expenseChart.series;
}

onMounted(async () => {
  await updateTransactionChart();
});

// convert data to input chart Component
function convertData(data) {
  const labels = [];
  const series = [];

  data.forEach((item) => {
    labels.push(item.category__name);
    series.push(item.total_amount);
  });

  return { labels, series };
}
</script>
