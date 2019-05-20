export const createSprint = (callback, projectId) => {
    const name = prompt("Please Provide Sprint Name", "Unnamed");
    const startDate = prompt("Please Provide Sprint Start Date ", "01/01/1900");
    const endDate = prompt("Please Provide Sprint End Date", "04/28/2019");
    const newSprint = { name, startDate, endDate };
    if(projectId){
        newSprint.sprintProjectId = projectId
    }
    callback(newSprint);
}

export const createProject = (callback) => {
    const name = prompt("Please Provide Project Name", "Unnamed");
    const newProject = {name};
    callback(newProject);
}

export const createTask = (callback, sprintId) => {
    const title = prompt("Please Provide Task Title", "Unnamed");
    const description = prompt("Please Provide Task Description", "This is a task to create");
    const status = prompt("Please Provide Task Status", "open");
    const newTask = {title, description, status};
    if(sprintId){
        newTask.taskSprintId = sprintId;
    }
    callback(newTask);
}