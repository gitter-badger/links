/**
 * Auth service
 */
 app.service('UserService', function($http, $q, baseUrl) {

   var activate = function(activationCode) {
    return $http({
      method: 'GET',
      url: baseUrl + '/user/activate/' + activationCode,
      withCredentials: true
    }).then(function(response) {
      // Activation is OK, return
      if (response.status === 200) {
        return '';
      }
      return $q.reject(response.data.message);
    }, function(response) {
      return $q.reject(response.data.message);
    });
  }, 
  register = function(user) {
    return $http({
      method: 'POST',
      url: baseUrl + '/user/register',
      withCredentials: true,
      data: user
    }).then(function(response) {
      // Registration is OK, return the user in JSON format
      if (response.status === 200) {
        return response.data;
      }
      return $q.reject(response.data.message);
    }, function(response) {
      return $q.reject(response.data.message);
    });
  };

   return {
    activate: activate,
    register: register
  };

 });