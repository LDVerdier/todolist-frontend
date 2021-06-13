const categoriesList = {
  categoriesListing : {},

  loadCategoriesFromAPI: function(){
    // console.log('load !');

    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };

    let endpoint = app.apiBaseUrl + '/categories';
    fetch(endpoint, fetchOptions)
      .then(utils.convertResponseToJson)
      .then(categoriesList.registerCategoriesListing)
      .then(categoriesList.displayCategoriesInHeader)
      .then(categoriesList.displayCategoriesInTaskForm)
      ;
  },

  registerCategoriesListing: function(categoriesListing){
    // console.log(categoriesListing);

      for(let categoryData of categoriesListing){
        // console.log(categoryData);
        //nous enregistrons les catégories dans un tableau associatif
        // l'id des catégories servira d'index
        let categoryId = categoryData.id;
        categoriesList.categoriesListing[categoryId] = categoryData;
      }

    return categoriesListing; // ici categoriesListing n'a pas changé, mais le return me permet d'enchainer sur le then() suivant
  },

  displayCategoriesInHeader: function(categoriesListing){
    // cibler le select dans le header
    let selectElement = document.querySelector('select.filters__choice')
    categoriesList.displayCategoriesInSelectElement(selectElement, categoriesListing);
    return categoriesListing;
  },

  displayCategoriesInTaskForm: function(categoriesListing){
    // cibler le select dans le formulaire
    let selectElement = document.querySelector('.task--add select');
    categoriesList.displayCategoriesInSelectElement(selectElement, categoriesListing);
  },

  displayCategoriesInSelectElement: function(selectElement, categoriesListing){
    for (let categoryData of categoriesListing){
      let optionElement = document.createElement('option');
      optionElement.textContent = categoryData.name;
      optionElement.setAttribute('value', categoryData.id);
      selectElement.appendChild(optionElement);
    }
  },

};