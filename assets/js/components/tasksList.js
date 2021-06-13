//représente la liste de toutes les tâches

const tasksList = {

  addTaskInDOM: function(taskElement){
    //cibler l'élément où on doit insérer la tâche
    //si la tâche a un statut 2 : masquer.
    
    const tasksList = document.querySelector('.tasks');
    tasksList.prepend(taskElement);
    //console.log('element ajouté au DOM !');

  },

  /**
   * Gets all tasks from distant API and then inserts them
   * in the DOM
   */
  loadTasksFromAPI: function(){
    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };

    let endpoint = app.apiBaseUrl + '/tasks';
    fetch(endpoint, fetchOptions)
      .then(utils.convertResponseToJson)
      .then(tasksList.displayTasks);
  },

  /**Specifically inserts in DOM a list of tasks
   * 
   * @param {*} tasksListing 
   */
  displayTasks: function(tasksListing){
    for (let taskData of tasksListing){

      let taskName = taskData.title;
      let categoryName = taskData.category.name;
      let taskCompletion = taskData.completion;
      let taskId = taskData.id;
      let taskArchiveStatus = taskData.status;

      // console.log(taskData);
      let taskElement = task.createDOMElement(taskName, categoryName, taskId, taskArchiveStatus, taskCompletion);
      // console.log(taskElement);
      if (taskArchiveStatus == 2){
        // task.archive(taskElement);
        // task.setStatus(taskElement, 'archive');
        taskElement.querySelector('.task').classList.replace('task--todo', 'task--archive');
        task.hide(taskElement.querySelector('.task'));
      }
      // task.setCompletion(taskElement, taskCompletion);
      // task.setId(taskElement, taskData.id);
      tasksList.addTaskInDOM(taskElement);
    }
  },
};