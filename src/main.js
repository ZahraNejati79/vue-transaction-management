import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import "vue3-toastify/dist/index.css";
import router from "./router/router";
import Unicon from "vue-unicons";
import {
  uniHome,
  uniSignout,
  uniBookMedical,
  uniChart,
  uniUserSquare,
  uniSignin,
  uniEdit,
  uniTrashAlt,
  uniMultiply,
  uniFilter,
  uniCloudDownload,
  uniPrint,
  uniBars,
} from "vue-unicons/dist/icons";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";

Unicon.add([
  uniHome,
  uniSignout,
  uniBookMedical,
  uniChart,
  uniUserSquare,
  uniSignin,
  uniEdit,
  uniTrashAlt,
  uniMultiply,
  uniFilter,
  uniCloudDownload,
  uniPrint,
  uniBars,
]);

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueApexCharts);
app.use(Unicon);
app.use(Vue3PersianDatetimePicker, {
  name: "CustomDatePicker",
  props: {
    format: "YYYY-MM-DD",
    displayFormat: "jYYYY-jMM-jDD",
    editable: false,
    inputClass: "form-control my-custom-class-name",
    placeholder: "Please select a date",
    altFormat: "YYYY-MM-DD",
    color: "#4a6dff",
    autoSubmit: false,
  },
});
app.mount("#app");
