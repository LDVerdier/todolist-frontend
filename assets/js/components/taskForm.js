const taskForm = {
  initializeForm: function(){
    // console.log('bip');
    let formElement = document.querySelector('.task--add form');
    // console.log(formElement);
    formElement.addEventListener('submit',taskForm.handleAddTaskFormSubmit);
  },

  handleAddTaskFormSubmit: function(event){
    event.preventDefault();
    //récupérer les champs du formulaire
    const taskNameInput = event.target.querySelector('.task__name-edit.input');
    const taskCategorySelect = event.target.querySelector(".task__category select");
    //recupérer leurs valeurs
    const newTaskName = taskNameInput.value;
    const newTaskCategory = taskCategorySelect.value;

    if(newTaskName !== '' &&  Number.isInteger(parseInt(newTaskCategory))){
      console.log('ok');
  
      let endpoint = app.apiBaseUrl + '/tasks';
      //console.log(endpoint);

      let data = {
        title: newTaskName,
        categoryId: newTaskCategory,
        completion: 0,
	      status: 1
      };

      let myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");

      let fetchOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: myHeaders,
        body: JSON.stringify(data),
      };
      console.log(JSON.stringify(data));
  
      fetch(endpoint, fetchOptions)
      .then(function(response){
        if(response.status == 201){
          console.log('Insertion effectuée !');
          return response.json();
        } else {
          console.log('Echec insertion');
        }
      })
      .then(function(response){
        // console.log(response.category.name);
        let taskElement = task.createDOMElement(newTaskName, response.category.name, response.id, response.completion);
        tasksList.addTaskInDOM(taskElement);
      }
      
      );
    

      //réinitialiser les champs
      taskNameInput.value = '';
      taskCategorySelect.value = 'Choisir une catégorie';
    } else {
      console.log('non ok');
    }


    //donner le focus à nouveau au formulaire
    taskNameInput.focus();
  },
};