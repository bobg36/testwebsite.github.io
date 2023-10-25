// Function to toggle column visibility
function toggleColumnVisibility(tableId, column) {
    const table = document.getElementById(tableId);
    const columnIndex = Array.from(table.rows[0].cells).findIndex(cell => cell.textContent === column);

    if (columnIndex >= 0) {
        const rows = table.rows;
        for (let i = 0; i < rows.length; i++) {
            const cell = rows[i].cells[columnIndex];
            cell.style.display = cell.style.display === 'none' ? '' : 'none';
        }
    }
}

// Add event listeners to the buttons
const columnButtons = document.querySelectorAll('.column-buttons button');
columnButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tableId = button.parentElement.getAttribute('data-table');
        const column = button.getAttribute('data-column');
        toggleColumnVisibility(tableId, column);
    });
});

// Sample data loading (You should replace this with your data loading logic)
function displayCSVData(file, tableId) {
    fetch(`data/${file}`)
        .then(response => response.text())
        .then(data => {
            const table = document.getElementById(tableId);
            const rows = data.split('\n');
            const headerRow = table.insertRow();
            const headers = rows[0].split(',');
            headers.forEach(header => {
                const headerCell = headerRow.insertCell();
                headerCell.textContent = header;
            });
            for (let i = 1; i < rows.length; i++) {
                const dataRow = table.insertRow();
                const cells = rows[i].split(',');
                cells.forEach(cell => {
                    const dataCell = dataRow.insertCell();
                    dataCell.textContent = cell;
                });
            }
        });
}

displayCSVData('data1.csv', 'data1-table');
displayCSVData('data2.csv', 'data2-table');
