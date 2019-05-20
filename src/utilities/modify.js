export const renameProject = (callback, projectId, projectName) => {
    const name = prompt("Please Provide New Project Name", projectName);
    const renamedProject = {id:projectId, name};
    callback(renamedProject);
}

export const removeSprintFromProject = (callback, sprintId) => {
    const updatedSprint = {id:sprintId, sprintProjectId: null};
    callback(updatedSprint);
}

export const updateSprintProject = (callback, sprintId, projectId) => {
    const updatedSprint = {sprintId, projectId};
    if(projectId === "-1"){
        updatedSprint.projectId = null;
    }
    callback(updatedSprint);
}