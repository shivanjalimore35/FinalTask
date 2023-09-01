var searchRecords = [];
var tasks = [];

let addTaskButton = document.getElementById("addTask");
let taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function () {
  addTask();
  resetForm();
});

// function addTask() {
//   readData();
// }
function addTask() {
  if (validateTaskId()) {
    readData();
    resetForm();
  } else {
    alert("This ID is already present. Please try again with a different ID.");
  }
}

function validateTaskId() {
  let taskId = document.getElementById("taskId").value;
  // Check if taskId is already present in tasks array
  const isTaskIdValid = !tasks.some((task) => task.parentTaskId === taskId);
  return isTaskIdValid;
}

function readData() {
  let taskId = document.getElementById("taskId").value;
  let taskName = document.getElementById("taskName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let status = document.getElementById("status").value;

  if (!taskId || !taskName || !startDate || !endDate || !status) {
    console.log("Please fill all the fields 123.");
  } else {
    const task = {
      parentTaskId: taskId,
      parentTaskName: taskName,
      startDate: startDate,
      endDate: endDate,
      status: status,
      subtasks: [],
    };

    tasks.push(task);
    console.log("task Added :", tasks);

    // Reset form fields
    taskId.value = "";
    taskName.value = "";
    startDate.value = "";
    endDate.value = "";
    status.value = "";

    console.log("Task added successfully.");
  }
}



// ---------------------------------------------------------------for subtask(start)---------------------------------------------
const addSubtaskBtn = document.getElementById("addSubtaskBtn");
const subtaskForm = document.getElementById("subtaskFormFields");
// ----------------------to display auto generated ID---------------------------------------------
function addSubtask(paretTaskIndex) {
  document.getElementById("subtaskForm").style.display = "block";
  document.getElementById("taskForm").style.display = "none";

  let subtaskCount = tasks[paretTaskIndex].subtasks.length + 1; // Count existing subtasks
  let GaneratedSubtaskId = `${tasks[paretTaskIndex].parentTaskId}.${subtaskCount}`;
  document.getElementById("subtaskId").value = GaneratedSubtaskId;
}

// Add an event listener to the "Cancel" button in the subtask form
document.getElementById("cancelSubtask").addEventListener("click", function () {
  // Hide the subtask form
  document.getElementById("subtaskForm").style.display = "none";
  document.getElementById("taskForm").style.display = "block";

  // Clear subtask form fields
  document.getElementById("subtaskName").value = "";
  document.getElementById("subtaskStartDate").value = "";
  document.getElementById("subtaskEndDate").value = "";
  document.getElementById("subtaskStatus").value = "";
});

// Add an event listener to the "Submit Subtask" button in the subtask form
function submitsubtask()  {
  let subtaskId = document.getElementById("subtaskId").value;
  let subtaskName = document.getElementById("subtaskName").value;
  let subtaskStartDate = document.getElementById("subtaskStartDate").value;
  let subtaskEndDate = document.getElementById("subtaskEndDate").value;
  let subtaskStatus = document.getElementById("subtaskStatus").value;
  let taskIdToAddSubtask=subtaskId.split('.');
  console.log(taskIdToAddSubtask[0])
  
  // let parentTaskId_value = document.getElementById("taskId").value;
  //const taskName = document.getElementById('taskName').value;

  const subtasks = {
    subTaskId: subtaskId,
    subTaskName: subtaskName,
    subtaskStartDate: subtaskStartDate,
    subtaskEndDate: subtaskEndDate,
    subtaskStatus: subtaskStatus,
  };

  const paretTaskIndex = tasks.findIndex(
    (task) => task.parentTaskId === taskIdToAddSubtask[0]
  );
  console.log(paretTaskIndex + "  ..... " + taskIdToAddSubtask[0]);
  tasks[paretTaskIndex].subtasks.push(subtasks);

  console.log("subtTask array :", tasks);

  console.log(
    `Subtask ${subtaskId} has been added to the Main Task Name=${taskName} having ID=${taskIdToAddSubtask[0]}.`
  );

  // Clear subtask form fields
  document.getElementById("subtaskName").value = "";
  document.getElementById("subtaskStartDate").value = "";
  document.getElementById("subtaskEndDate").value = "";
  document.getElementById("subtaskStatus").value = "";

  /********************************************************** */
  const taskId = document.getElementById("taskId").value;
  //Auto-generate subtask ID based on main task ID and count

  subtaskCount = tasks[paretTaskIndex].subtasks.length + 1; // Count existing subtasks
  GaneratedSubtaskId = `${taskId}.${subtaskCount}`;
  document.getElementById("subtaskId").value = GaneratedSubtaskId;

  // --------------------------------------------------subtask(end)------------------------------------------------------------
  displayTasks(tasks);
};

// Add an event listener to update the table when tasks change
addTaskButton.addEventListener("click", function () {
  displayTasks(tasks);
});

function resetForm() {
  document.getElementById("taskId").value = "";
  document.getElementById("taskName").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("status").selectedIndex = 0;
}

//--------------------------------------------edit-----------------------------------------------------------
function edit_record(parentObjectIndex, indexToEdit) {
  // console.log(tasks[parentObjectIndex].subtasks[indexToEdit].subTaskId)
  document.getElementById("subtaskId").value =
    tasks[parentObjectIndex].subtasks[indexToEdit].subTaskId;
  document.getElementById("subtaskName").value =
    tasks[parentObjectIndex].subtasks[indexToEdit].subTaskName;
  document.getElementById("subtaskStartDate").value =
    tasks[parentObjectIndex].subtasks[indexToEdit].subtaskStartDate;
  document.getElementById("subtaskEndDate").value =
    tasks[parentObjectIndex].subtasks[indexToEdit].SubTaskEndDate;
  document.getElementById("subtaskStatus").value =
    tasks[parentObjectIndex].subtasks[indexToEdit].subtaskStatus;
  tasks[parentObjectIndex].subtasks.splice(indexToEdit, 1);
}
// -------------------------------------------------delete subtask--------------------------------------------------------------------------------

function delete_record(parentObjectIndex, indexToDelete) {
  let confirmation = confirm("do you want to delete sunTask ??");
  const subtasktodelete = tasks[parentObjectIndex].subtasks;
  console.log(subtasktodelete);
  if (confirmation) {
    subtasktodelete.splice(indexToDelete, 1);
  }

  displayTasks(tasks);
}
//-------------------Delete Parent Task--------------------------------------------------
function deleteParent(indexToDelete) {
  // console.log(parentObjectIndex);
  let confirmation = confirm("do you want to delete main Task ??");
  if (confirmation) {
    tasks.splice(indexToDelete,1);
     }
     displayTasks(tasks);
}
// ----------------------------------Edit parent Task--------------------------------------------
function editParent(indexToEdit) {
  document.getElementById("taskId").value =
  //  console.log(parentTaskId);
    tasks[indexToEdit].parentTaskId;
  document.getElementById("taskName").value =
    tasks[indexToEdit].parentTaskName;
  document.getElementById("startDate").value =
    tasks[indexToEdit].startDate;
  document.getElementById("endDate").value =
    tasks[indexToEdit].endDate;
  document.getElementById("status").value =
    tasks[indexToEdit].status;
  tasks.splice(indexToEdit, 1);
}

// --------------------------------------8888888----------------------------------------------------
function search() {
  let searchBy = document.getElementById("search").value;
  searchBy = searchBy.trimStart();

  let search_value = document.getElementById("search-field").value;

  switch (searchBy) {
    case "main Task Name":
      searchRecords = filterByMainTaskName(tasks, search_value);
      break;
    case "Subtask Name":
      searchRecords = filterBySubTaskName(tasks, search_value);
      break;
    case "start Date":
      searchRecords = filterByStartDate(tasks, search_value);
      break;
    case "End Date":
      searchRecords = filterByEndDate(tasks, search_value);
      break;
    case "status":
      searchRecords = filterByStatus(tasks, search_value);
      break;
    default:
      console.log("choose search by option");
  }

  console.log(searchRecords);
  displayTasks(searchRecords);
  document.getElementById("search-field").value = "";
}

// Filter tasks by main task name
function filterByMainTaskName(taskArray, taskName) {
  taskName = taskName.trim().toLowerCase();
  console.log(taskName);
  return taskArray.filter((task) =>
    task.parentTaskName.toLowerCase().includes(taskName)
  );
}

// Filter tasks by subtask name
function filterBySubTaskName(taskArray, subtaskName) {
  const newtaskarray = [];
  subtaskName = subtaskName.trim().toLowerCase();
  tasks.forEach((task) => {
    const newtask = 
      {
        endDate: task.endDate,
        parentTaskId: task.parentTaskId,
        parentTaskName: task.parentTaskName,
        startDate: task.startDate,
        status: task.status,
        subtasks: [],
      }
    task.subtasks.forEach((subtask) => {
      if (subtask.subTaskName == subtaskName) {
        newtask.subtasks.push(subtask);
        console.log(newtask)
      }
    });
    if(newtask.subtasks.length>0){
      
    newtaskarray.push(newtask)
    }console.log(newtaskarray)
  });
  // return taskArray.map((task) => ({
  //   ...task,                                         //spread oparator
  //   subTask: task.subtasks.filter((subTask) =>
  //     subTask.subTaskName.toLowerCase().includes(subtaskName)

  //   ),
  // })).filter((task) => task.subTask.length > 0);
}

// Filter tasks by start date
// function filterByStartDate(taskArray, startDate) {
//   startDate = startDate.trim(); // Date format: YYYY-MM-DD
//   return taskArray
//     .map((task) => ({
//       ...task,
//       subTask: task.subTask.filter(
//         (subTask) => subTask.subtaskStartDate === startDate
//       ),
//     }))
//     .filter((task) => task.subTask.length > 0);
// }

// // Filter tasks by end date
// function filterByEndDate(taskArray, endDate) {
//   endDate = endDate.trim(); // Date format: YYYY-MM-DD
//   return taskArray
//     .map((task) => ({
//       ...task,
//       subTask: task.subTask.filter((subTask) => subTask.endDate === endDate),
//     }))
//     .filter((task) => task.subTask.length > 0);
// }

// // Filter tasks by status
// function filterByStatus(taskArray, status) {
//   status = status.trim().toLowerCase();
//   return taskArray
//     .map((task) => ({
//       ...task,
//       subTask: task.subTask.filter((subTask) =>
//         subTask.status.toLowerCase().includes(status)
//       ),
//     }))
//     .filter((task) => task.subTask.length > 0);
// }
