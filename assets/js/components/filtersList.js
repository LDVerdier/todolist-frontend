//représente la liste de toutes les tâches

const filtersList = {

  filterButtonsList: null,

  initializeFilters: function (){
    //récupérer tous les filtres dans une variable
    filtersList.filterButtonsList = document.querySelectorAll('.filters__choice.button');

    //pour chaque filtre  récupéré, enregistrer les events listeners qui nous intéressent
    for (let filterElement of filtersList.filterButtonsList){
      filter.addAllEventListeners(filterElement);
    }

    const seeArchiveLink = document.querySelector('a.filters__choice');
    seeArchiveLink.addEventListener('click', filter.toggleArchiveView);
  },

};