
        const startDateInput = document.getElementById("startDate");
        const endDateInput = document.getElementById("endDate");
        const statusSelect = document.getElementById("status");
        
        startDateInput.addEventListener("input", updateEndDateMin);
        endDateInput.addEventListener("input", updateStartDateMax);
        startDateInput.addEventListener("input", updateStatusOptions);
        endDateInput.addEventListener("input", updateStatusOptions);
        
        function updateEndDateMin() {
            endDateInput.min = startDateInput.value;
            if (endDateInput.value < startDateInput.value) {
                endDateInput.value = startDateInput.value;
            }
        }
        
        function updateStartDateMax() {
            startDateInput.max = endDateInput.value;
            if (startDateInput.value > endDateInput.value) {
                startDateInput.value = endDateInput.value;
            }
        }

        function updateStatusOptions() {
            // ... (same status update logic as before)
            let startDate = new Date(startDateInput.value);
            let endDate = new Date(endDateInput.value);
            let currentDate = new Date();
            

            // Reset options and default selectedIndex
            statusSelect.innerHTML = "";
            statusSelect.selectedIndex = -1;

            const options = [];

            if (currentDate > endDate) {
                options.push({ value: "duePass", text: "Due Passed", class: "due-pass" });
            }
            
            if (startDate <= currentDate && currentDate <= endDate) {
                options.push({ value: "inProgress", text: "In Progress", class: "in-progress" });
            }
            
            if (currentDate >= startDate && currentDate <= endDate) {
                options.push({ value: "completed", text: "Completed", class: "completed" });
            }
            
            options.push({ value: "cancel", text: "Canceled", class: "canceled" });

            options.forEach(option => {
                const optionElem = document.createElement("option");
                optionElem.value = option.value;
                optionElem.textContent = option.text;
                optionElem.classList.add(option.class);
                statusSelect.appendChild(optionElem);
            });
        }
       