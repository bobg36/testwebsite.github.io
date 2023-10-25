document.addEventListener("DOMContentLoaded", function () {
    // List of CSV files you want to load
    const csvFiles = ["data/data1.csv", "data/data2.csv"];

    // Function to load and parse CSV files
    function loadCSVData(file) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    header: true,
                    dynamicTyping: true,
                    complete: function (results) {
                        displayData(results.data);
                    }
                });
            });
    }

    // Function to display data on the page
    function displayData(data) {
        const dataContainer = document.getElementById("data-container");

        data.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("data-item");

            // Customize how you display each item from the CSV here
            itemDiv.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
            `;

            dataContainer.appendChild(itemDiv);
        });
    }

    // Load data from CSV files
    csvFiles.forEach(loadCSVData);
});
