export const deleteProject = (callback, projectId) => {
    const deleteProject = {id:projectId};
    callback(deleteProject);
}