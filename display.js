
// Function to display tasks and subtasks in a table
innerHTML ='';
function displayTasks(tasks) {
  //const table = document.createElement('table');
  innerHTML = `
    <tr>
      <th>Task ID</th>
      <th>Task Name</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Status</th>
      <th>action</th>
    </tr>
  `;

  tasks.forEach((task, parentIndex) => {
    // console.log(parentIndex)
   // const row = document.createElement('tr');
    innerHTML += `
      <tr> Parent Task </tr>
      <tr>
      <td>${task.parentTaskId}</td>
      <td>${task.parentTaskName}</td>
      <td>${task.startDate}</td>
      <td>${task.endDate}</td>
      <td>${task.status}</td>
      <td class="task-button">
      <button class="edit-button"  onclick="editParent(${parentIndex})">Edit</button>  
      <button class="delete-button" onclick="deleteParent(${parentIndex})" >Delete </button>
      <button class="add-subtask"  onclick= "addSubtask(${parentIndex})">Add Subtask
      </button>  

    </td></tr>
    `;

    // if (task.subtasks.length > 0) {
    //   innerHTML += `<tr>
    //   <th> Sub-Tasks </th>
    // </tr>
    // `;
    // }

 //   table.appendChild(row);

    task.subtasks.forEach((subtask,subTaskIndex) => {
    //  const subtaskRow = document.createElement('tr');
    innerHTML += `
        <tr> Subtask </tr>
        <tr>
        <td>${subtask.subTaskId}</td>
        <td>${subtask.subTaskName}</td>
        <td>${new Date(subtask.subtaskStartDate).toDateString()}</td>
        <td>${new Date(subtask.subtaskEndDate).toDateString()}</td>
        <td>${subtask.subtaskStatus}</td>
        <td class="task-button">
         <button id="edit-button" id="edit" class="edit-button" onclick="edit_record(${parentIndex},${subTaskIndex})" >Edit</button>
         <button id="delete-button" id ="delete" class ="delete-button" onclick="delete_record(${parentIndex},${subTaskIndex})"> delete </button>
      </td></tr>
      `;
    });
  });

 let tableBody = document.getElementById('tableBody');
 tableBody.innerHTML = innerHTML;
}