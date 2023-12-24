import http from "../httpService";
import * as XLSX from "xlsx";

export const downloadAndDisplayExcel = async () => {
  try {
    // Make a GET request to your server endpoint that generates the Excel file
    const response = await http.get("/report/report_excel/", {
      responseType: "arraybuffer", // Set responseType to 'arraybuffer' for binary data
    });

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
    console.error("Error downloading and displaying Excel file:", error);
    // Handle the error, show a notification, etc.
  }
};
