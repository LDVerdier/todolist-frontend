const app = {
  apiBaseUrl: 'http://0.0.0.0:8080',

  init: function () {
    tasksList.loadTasksFromAPI();
    categoriesList.loadCategoriesFromAPI();
    taskForm.initializeForm();
    filtersList.initializeFilters();
  },
};

document.addEventListener('DOMContentLoaded', app.init);