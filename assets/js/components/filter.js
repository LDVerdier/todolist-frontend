const filter = {
  addAllEventListeners: function(filterElement){
    filterElement.addEventListener('click', filter.handleClickOnFilterButton);
  },

  handleClickOnFilterButton: function(event){
    const filterType = event.target.dataset.filter;
    for (let filterElement of filtersList.filterButtonsList){
      filterElement.classList.remove('is-info', 'is-selected');
    }

    
    // console.log(archivedTasksList);
    // console.log(notArchivedTasksList);
    const completeTasksList = document.querySelectorAll('.tasks .task.task--complete:not([data-archive-status="2"])');
    const incompleteTasksList = document.querySelectorAll('.tasks .task:not(.task--complete):not([data-archive-status="2"]')
    // console.log(completeTasksList);
    // console.log(incompleteTasksList);


    switch (filterType) {
      case 'all':
        for (let taskElement of completeTasksList){
          task.display(taskElement);
        }
        for (let taskElement of incompleteTasksList){
          task.display(taskElement);
        }
        
        break;
    
      case 'complete':
        for (let taskElement of completeTasksList){
          task.display(taskElement);
        }
        for (let taskElement of incompleteTasksList){
          task.hide(taskElement);
        }
        break;
    
      case 'incomplete':
        for (let taskElement of incompleteTasksList){
          task.display(taskElement);
        }
        for (let taskElement of completeTasksList){
          task.hide(taskElement);
        }
        break;
    
      default:
        break;
    }

    event.target.classList.add('is-info', 'is-selected');
  },

  toggleArchiveView: function(event){
    const archivedTasksList = document.querySelectorAll('.tasks .task[data-archive-status="2"]');
    const notArchivedTasksList = document.querySelectorAll('.tasks .task[data-archive-status="1"]');

    console.log(event.target.textContent);

    if(event.target.textContent == 'Voir les archives'){
      event.target.textContent = 'Voir les tâches non archivées';
      for (let taskElement of archivedTasksList){
        task.display(taskElement);
      }
      for (let taskElement of notArchivedTasksList){
        task.hide(taskElement);
      }
      // console.log('bop');
    } else {
      event.target.textContent = 'Voir les archives';
      for (let taskElement of archivedTasksList){
        task.hide(taskElement);
      }
      for (let taskElement of notArchivedTasksList){
        task.display(taskElement);
      }
      // console.log('bop');
    }
    // console.log('click');
  },

};