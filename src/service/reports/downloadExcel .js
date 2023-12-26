import http from "../httpService";
import * as XLSX from "xlsx";

export const downloadExcel = async (params) => {
  try {
    // Make a GET request to your server endpoint that generates the Excel file
    let response;
    if (params.date.length == 1) {
      response = await http.get(
        `/report/report_excel/?trans_type=${params.trans_type}&date=${params.date}&category=${params.category}`,
        {
          responseType: "arraybuffer", // Set responseType to 'arraybuffer' for binary data
        }
      );
    } else if (params.date.length == 2) {
      response = await http.get(
        `/report/report_excel/?trans_type=${params.trans_type}&start_date=${params.date[0]}&end_date=${params.date[1]}&category=${params.category}`,
        {
          responseType: "arraybuffer", // Set responseType to 'arraybuffer' for binary data
        }
      );
    } else {
      response = await http.get(
        `/report/report_excel/?trans_type=${params.trans_type}&category=${params.category}`,
        {
          responseType: "arraybuffer", // Set responseType to 'arraybuffer' for binary data
        }
      );
    }

    // const response = await http.get("/report/report_excel/", {
    //   responseType: "arraybuffer", // Set responseType to 'arraybuffer' for binary data
    // });

    // Convert the binary data to a Blob
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "your_excel_file.xlsx";
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link element
    document.body.removeChild(link);
  } catch (error) {
    console.error(
      "Error downloading and displaying Excel file:",
      error.message
    );
    // Handle the error, show a notification, etc.
  }
};
