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

// Function to display CSV data in a table
function displayCSVData(file, tableId) {
    fetch(`data/${file}`)
        .then(response => response.text())
        .then(data => {
            const table = document.getElementById(tableId);
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].split(',');
                const row = document.createElement('tr');

                for (let j = 0; j < headers.length; j++) {
                    const cell = (i === 0) ? document.createElement('th') : document.createElement('td');
                    cell.textContent = cells[j];
                    row.appendChild(cell);
                }
                fragment.appendChild(row);
            }
            table.appendChild(fragment);
        });
}

// Load CSV data into tables
displayCSVData('virgin.csv', 'virgin-table');
displayCSVData('bred.csv', 'bred-table');
displayCSVData('floor.csv', 'floor-table');
displayCSVData('sales.csv', 'sales-table');

// Function to add an image to the left of all tables
function addImageToTables(imageUrl) {
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = 'Table Image'; // Add an alt text for accessibility

    const tableContainers = document.querySelectorAll('.table-container');
    const tableHeight = document.getElementById('virgin-table').clientHeight; // Get the height of one of the tables (assuming they have the same height)

    image.style.height = tableHeight + 'px'; // Set the image's height to match the table's height

    tableContainers.forEach(container => {
        container.insertBefore(image.cloneNode(true), container.firstChild);
    });
}

// Add a single image to the left of all tables with the same height as the tables
addImageToTables('https://assets.axieinfinity.com/axies/123123/axie/axie-full-transparent.png');
