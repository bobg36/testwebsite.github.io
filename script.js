document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("csv-table");

    // Replace 'data.csv' with the actual path to your CSV file.
    const csvFilePath = 'data.csv';

    // Fetch the CSV file
    fetch(csvFilePath)
        .then((response) => response.text())
        .then((data) => {
            const rows = data.split("\n");

            // Create the table headers from the first row
            const headers = rows[0].split(",");
            const headerRow = document.createElement("tr");

            for (let header of headers) {
                const th = document.createElement("th");
                th.textContent = header;
                headerRow.appendChild(th);
            }

            table.appendChild(headerRow);

            // Create table rows from the remaining data
            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(",");
                const row = document.createElement("tr");

                for (let cellData of rowData) {
                    const cell = document.createElement("td");
                    cell.textContent = cellData;
                    row.appendChild(cell);
                }

                table.appendChild(row);
            }
        })
        .catch((error) => console.error("Error fetching CSV file:", error));
});
