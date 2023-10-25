// Function to display CSV data
function displayCSVData(file, tableId) {
    fetch(`data/${file}`)
        .then(response => response.text())
        .then(data => {
            const table = document.getElementById(tableId);

            // Split the CSV data into rows
            const rows = data.split('\n');

            // Display the header row
            const headerRow = table.insertRow();
            const headers = rows[0].split(',');
            headers.forEach(header => {
                const headerCell = headerRow.insertCell();
                headerCell.textContent = header;
            });

            // Display the first 5 rows of data
            for (let i = 1; i < 6 && i < rows.length; i++) {
                const dataRow = table.insertRow();
                const cells = rows[i].split(',');
                cells.forEach(cell => {
                    const dataCell = dataRow.insertCell();
                    dataCell.textContent = cell;
                });
            }
        });
}

// Display data from data1.csv
displayCSVData('data1.csv', 'data1-table');

// Display data from data2.csv
displayCSVData('data2.csv', 'data2-table');
