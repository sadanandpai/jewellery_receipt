(function(){
//services
services = angular.module('Jewel.Service',[]);
services.service('jewelService',jewelService);
jewelService.$inject = ['$http'];

function jewelService($http){
  var service = this;

  service.get_data = function () {
     //response = $http.get('https://jewel-api.herokuapp.com/jewel/');
     response = $http.get('http://localhost:3000/jewel/');
     return response;
    };
  service.get_invNum = function () {
     //response = $http.get('https://jewel-api.herokuapp.com/inv_num/');
     response = $http.get('http://localhost:3000/count/jewel');
     return response;
    };

  service.get_by_id = function (id) {
     //response = $http.get('https://jewel-api.herokuapp.com/jewel/' + id);
     response = $http.get('http://localhost:3000/jewel/' + id);
     return response;
  };
  
  service.insert_record = function (data_obj) {
     //response = $http.post('https://jewel-api.herokuapp.com/jewel/',data_obj);
     response = $http.post('http://localhost:3000/jewel/',data_obj);
     return response;
  };
  
  service.delete_record = function (id) {
     //response = $http.delete('https://jewel-api.herokuapp.com/jewel/' + id);
     response = $http.delete('http://localhost:3000/jewel/' + id);
     return response;
  };
}
  
})();

