const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const subtaskStartDateInput = document.getElementById("subtaskStartDate");
const subtaskEndDateInput = document.getElementById("subtaskEndDate");

startDateInput.addEventListener("input", updateSubtaskStartDateMin);
endDateInput.addEventListener("input", updateSubtaskEndDateMax);

function updateSubtaskStartDateMin() {
  subtaskStartDateInput.min = startDateInput.value;
  // Ensure that subtaskStartDate is not greater than subtaskEndDate
  if (subtaskStartDateInput.value > subtaskEndDateInput.value) {
    subtaskStartDateInput.value = subtaskEndDateInput.value;
  }
}

function updateSubtaskEndDateMax() {
  subtaskEndDateInput.max = endDateInput.value;
  // Ensure that subtaskEndDate is not less than subtaskStartDate
  if (subtaskEndDateInput.value < subtaskStartDateInput.value) {
    subtaskEndDateInput.value = subtaskStartDateInput.value;
  }
}
