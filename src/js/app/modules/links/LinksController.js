
app.controller('LinksController', 
  function($scope, $timeout, LinksService, SettingsService){

    // init page css class
    $scope.pageClass = 'links-page';
    // init search from localStorage (if any)
    $scope.searchLinks = localStorage.getItem('local.links.search');
    $scope.user = SettingsService.user();

    loadLinks();

    $scope.redirect = function(link){
      $timeout(function(){
        if (!link.count){
          link.count = 0;
        }
        link.count++;
        LinksService.update(link);
        
      });
      window.open(link.url, '_blank').focus();
    };

    $scope.getTags = function(tags){
      console.log('get tags');
      if (tags){
        return tags.split(';');
      } 
    };

    $scope.clickTag = function(tag, $event){
      $event.preventDefault();
      $event.stopImmediatePropagation();
      $scope.searchLinks = tag;
    };

    $scope.onKeyPress = function($event){
      
      // clear & focus search box 
      if ($event.keyCode === 27){
        $scope.searchLinks = "";
        document.querySelector('.search-links').focus();
      }
      // focus search box
      else if($event.ctrlKey && $event.key === "f"){
        document.querySelector('.search-links').focus();
        $event.preventDefault();
        $event.stopImmediatePropagation();
      }

    };

    $scope.$watch('searchLinks',function(newValue, oldValue){
      if (newValue !== oldValue){
        localStorage.setItem('local.links.search', newValue);
      }
    });

    function loadLinks(){
       // get links and sort them by title
      LinksService.getLinks().then(function(links){
        if (angular.isArray(links)){
          $scope.links = links.sort(function compare(a,b) {
              if (a.title < b.title)
                 return -1;
              if (a.title > b.title)
                return 1;
              return 0;
            });
        }
      });
    }
});