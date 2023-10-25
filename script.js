document.addEventListener("DOMContentLoaded", function () {
    // List of CSV files you want to load
    const csvFiles = ["data/data1.csv", "data/data2.csv", "data/data3.csv", "data/data4.csv"];

    // Function to load and parse CSV files
    function loadCSVData(file) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    header: true,
                    dynamicTyping: true,
                    complete: function (results) {
                        displayData(results.data, file);
                    }
                });
            });
    }

    // Function to display data on the page
    function displayData(data, fileName) {
        const dataContainer = document.getElementById("data-container");

        // Create a container for the data from each file
        const fileContainer = document.createElement("div");
        fileContainer.classList.add("file-container");

        const fileTitle = document.createElement("h2");
        fileTitle.textContent = `Data from ${fileName}`;

        fileContainer.appendChild(fileTitle);

        // Display the first 5 rows of data
        for (let i = 0; i < Math.min(5, data.length); i++) {
            const row = data[i];
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("data-row");

            // Customize how you display each item from the CSV here
            rowDiv.innerHTML = `
                <h3>${row.name}</h3>
                <p>${row.description}</p>
            `;

            fileContainer.appendChild(rowDiv);
        }

        dataContainer.appendChild(fileContainer);
    }

    // Load data from CSV files
    csvFiles.forEach(loadCSVData);
});
