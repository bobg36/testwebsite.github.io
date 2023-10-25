function processCSV() {
    // Make an XMLHttpRequest to fetch the CSV file
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/sales.csv", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Split the CSV content into rows
            var rows = xhr.responseText.split('\n');
            // console.log(rows)
            // Extract the ID from the first row
            var id_from_csv = rows[1].split(',');
            var id = id_from_csv[0]

            // Generate the dynamic URL
            var dynamic_url = `https://assets.axieinfinity.com/axies/${id}/axie/axie-full-transparent.png`;

            // Get the image element by its id
            var imgElement = document.getElementById("dynamicImage");

            // Update the image source
            imgElement.src = dynamic_url;
        }
    };
    xhr.send();
}

// Call the processCSV function to load the dynamic image
processCSV();



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
            let firstId = null; // Variable to store the first ID

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].split(',');
                const row = document.createElement('tr');

                for (let j = 0; j < headers.length; j++) {
                    const cell = (i === 0) ? document.createElement('th') : document.createElement('td');
                    cell.textContent = cells[j];
                    if (i === 0 && headers[j] === "ID") {
                        firstId = cells[j];
                    }
                    row.appendChild(cell);
                }
                fragment.appendChild(row);
            }
            table.appendChild(fragment);
            if (firstId) {
                addFirstIdToTables(firstId);
            }
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

    image.style.height = (tableHeight*0.5) + 'px'; // Set the image's height to match the table's height
    image.style.width = 'auto';

    tableContainers.forEach(container => {
        container.insertBefore(image.cloneNode(true), container.firstChild);
    });
}
