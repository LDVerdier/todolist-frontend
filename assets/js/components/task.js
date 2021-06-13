const task = {
  addAllEventListeners: function(taskElement){
    //ciblage du nom de la tâche
    let taskNameElement = taskElement.querySelector('.task__name-display');
    taskNameElement.addEventListener('click', task.handleClickOnTaskName);

    //ciblage du bouton d'édition de la tâche
    let taskEditButtonElement = taskElement.querySelector('.task__button--modify');
    taskEditButtonElement.addEventListener('click', task.handleClickOnEditButton);

    //ciblage de l'input d'édition
    let taskInputNameElement = taskElement.querySelector('.task__name-edit');
    //on surveille deux éléments : perte de focus du champ et relâchement de la touche entrée
    taskInputNameElement.addEventListener('blur', task.handleBlurOnTaskInputName);
    taskInputNameElement.addEventListener('keyup', task.handleKeyUpOnTaskInputName);

    //ciblage du bouton incomplete
    let taskIncompleteButtonElement = taskElement.querySelector('.task__button--incomplete');

    //ajout de l'écouteur d'événement
    taskIncompleteButtonElement.addEventListener('click', task.handleClickOnIncompleteButton);

    //ciblage du bouton de tâche validate
    let taskValidateButtonElement = taskElement.querySelector('.task__button--validate');

    //écouteur d'événement
    taskValidateButtonElement.addEventListener('click', task.handleClickOnValidateButton);

    let taskArchiveButtonElement = taskElement.querySelector('.task__button--archive');
    taskArchiveButtonElement.addEventListener('click', task.handleClickOnArchiveButton);
    let taskDesarchiveButtonElement = taskElement.querySelector('.task__button--desarchive');
    taskDesarchiveButtonElement.addEventListener('click', task.handleClickOnDesarchiveButton);

  },

  handleClickOnTaskName: function(event){
    let taskNameElement = event.currentTarget;
    // console.log(taskNameElement);
    // taskNameElement.textContent = 'yo !';

    let taskElement = taskNameElement.closest('.task');
    // console.log(taskElement);
    taskElement.classList.add('task--edit');

    let taskNameInputElement = taskElement.querySelector('.task__name-edit');
    taskNameInputElement.focus();

    //placer le curseur à la fin de l'input
    //récupérer la taille de texte dans l'input
    let length = taskNameInputElement.value.length;
    //placer le curseur à la fin de l'input (on débute une sélection à la fin de l'input
    //et on arrête la sélection à la fin de l'input. Cela fait une sélection vide)
    taskNameInputElement.setSelectionRange(length,length);

  },

  handleClickOnEditButton: function(event){
    task.handleClickOnTaskName(event);
  },

  handleClickOnValidateButton: function(event){
    let validateButtonElement = event.currentTarget;
    let taskElement = validateButtonElement.closest('.task');
    taskElement.classList.replace("task--todo" , "task--complete");
    task.setCompletion(taskElement,100);
    //récupérer l'id
    let taskElementId = taskElement.dataset.taskId;
    //console.log(taskElementId);

    let endpoint = app.apiBaseUrl + '/tasks/' + taskElementId;
    //console.log(endpoint);

    let data = {
      completion: 100,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    let fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: myHeaders,
      body: JSON.stringify(data),
    };

    fetch(endpoint, fetchOptions)
    .then(function(response){
      if(response.status == 200){
        console.log('Mise à jour effectuée !');
      }
    });
  },

  handleClickOnIncompleteButton: function(event){
    // console.log('click !');
    let incompleteButtonElement = event.currentTarget;
    let taskElement = incompleteButtonElement.closest('.task');
    taskElement.classList.replace("task--complete", "task--todo");
    task.setCompletion(taskElement,0);
    //récupérer l'id
    let taskElementId = taskElement.dataset.taskId;
    //console.log(taskElementId);

    let endpoint = app.apiBaseUrl + '/tasks/' + taskElementId;
    //console.log(endpoint);

    let data = {
      completion: 0,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    let fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: myHeaders,
      body: JSON.stringify(data),
    };

    fetch(endpoint, fetchOptions)
    .then(function(response){
      if(response.status == 200){
        console.log('Mise à jour effectuée !');
      }
    });
  },

  handleClickOnArchiveButton: function(event){
    // console.log('archive !');
    const taskToArchive = event.currentTarget.closest('.task');
    userAnswer = window.confirm('Voulez-vous vraiment archiver cette tâche ?');
    // console.log(userAnswer);
    if(userAnswer){
      task.archive(taskToArchive);
    }
  },

  handleClickOnDesarchiveButton: function(event){
    const taskToDesarchive = event.currentTarget.closest('.task');
    userAnswer = window.confirm('Voulez-vous vraiment désarchiver cette tâche ?');
    console.log(userAnswer);
    if(userAnswer){
      task.desarchive(taskToDesarchive);
    }
  },

  handleBlurOnTaskInputName: function(event){
    //récupération de la valeur saisie par l'utilisateur
    // console.log(event);
    // console.log(event.currentTarget);
    let taskInputNameElement = event.currentTarget;
    let taskNewName = taskInputNameElement.value;

    let incompleteButtonElement = event.currentTarget;
    let taskElement = incompleteButtonElement.closest('.task');

    let taskNameElement = taskElement.querySelector('.task__name-display');
    if(taskNameElement.textContent === taskNewName){
      console.log('Le nom est resté identique');
      return;
    }
    //récupérer l'id
    let taskElementId = taskElement.dataset.taskId;
    //console.log(taskElementId);

    let endpoint = app.apiBaseUrl + '/tasks/' + taskElementId;
    //console.log(endpoint);

    let data = {
      title: taskNewName,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    let fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      // cache: 'no-cache',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    console.log(fetchOptions);
    fetch(endpoint, fetchOptions)
    .then(function(response){
      if(response.status == 200){
        console.log('Mise à jour effectuée !');
        let taskNameElement = taskElement.querySelector('.task__name-display');
        taskNameElement.textContent = taskNewName;

        taskElement.classList.remove('task--edit');
      } else {
        console.log('Erreur de la mise à jour');
      }
    });

  },

  handleKeyUpOnTaskInputName: function(event){
    if(event.key === 'Enter'){
      // task.handleBlurOnTaskInputName(event);
      event.currentTarget.blur();
    }
  },

  display: function(taskElement){
    taskElement.classList.remove('is-hidden');
  },

  hide: function(taskElement){
    taskElement.classList.add('is-hidden');
  },

  archive: function(taskElement){
    console.log(taskElement);


    //effectuer un patch sur le champ status
    let taskElementId = taskElement.dataset.taskId;
    //console.log(taskElementId);

    let endpoint = app.apiBaseUrl + '/tasks/' + taskElementId;
    //console.log(endpoint);

    let data = {
      status: 2,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    let fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      // cache: 'no-cache',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    console.log(fetchOptions);
    fetch(endpoint, fetchOptions)
    .then(function(response){
      if(response.status == 200){
        console.log('Mise à jour effectuée !');
        taskElement.classList.remove('task--todo', 'task--complete', 'task--edit');
        taskElement.classList.add('task--archive');

      } else {
        console.log('Erreur de la mise à jour');
      }
    });
  },

  desarchive: function(taskElement){
    //effectuer un patch sur le champ status
    let taskElementId = taskElement.dataset.taskId;
    //console.log(taskElementId);

    let endpoint = app.apiBaseUrl + '/tasks/' + taskElementId;
    //console.log(endpoint);

    let data = {
      status: 1,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    let fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      // cache: 'no-cache',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    console.log(fetchOptions);
    fetch(endpoint, fetchOptions)
    .then(function(response){
      if(response.status == 200){
        console.log('Mise à jour effectuée !');
        taskElement.classList.remove('task--archive');
        taskElement.classList.add('task--todo');

      } else {
        console.log('Erreur de la mise à jour');
      }
    });
    
  },

  createDOMElement: function(newTaskName, newTaskCategory, newTaskId, newTaskArchiveStatus, newTaskCompletion = 0){
    //créer un clone du contenu du template template.content.cloneNode(true);
    const template = document.getElementById('newTaskTemplate');
    const newTask = template.content.cloneNode(true);

    //assigner des valeurs aux champs à compléter, en fonction des champs du formulaire
    newTask.querySelector('.task__name-display').textContent = newTaskName;
    newTask.querySelector('.task__name-edit.input').setAttribute('value', newTaskName);
    newTask.querySelector('.task__category p').textContent = newTaskCategory;
    newTask.querySelector('.task.task--todo').dataset.category = newTaskCategory;
    newTask.querySelector('.task.task--todo').dataset.taskId = newTaskId;
    newTask.querySelector('.task.task--todo').dataset.archiveStatus = newTaskArchiveStatus;
    newTask.querySelector('.progress-bar__level').style.width = newTaskCompletion + '%';
    task.addAllEventListeners(newTask);
    // console.log('element du DOM créé !');
    return newTask;
  },

  setCompletion: function(taskElement, completion){
    let progressBar = taskElement.querySelector('.progress-bar__level');
    progressBar.style.width = completion + '%';
    return taskElement;
  },

  setStatus: function(taskElement, status){
    console.log('setStatus chargé');
    console.log(taskElement);
    taskElement.then(
      function(taskElement){

        taskElement.classList.replace('task--todo', 'task--' + status);
      }

    )
    // return taskElement;
    
  },

  setId: function(taskElement, id){
    taskElement.querySelector('.task').dataset.taskId = id;
    //return taskElement;
  },

};