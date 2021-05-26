
var vm = new Vue({
    el: '#app',
    methods: {
      loading: function () {

          setTimeout( function() {
            document.getElementById("loading").classList.add('hide');
            setTimeout( function() {
              document.getElementById("loading").classList.add('esconder');
            }, 2000)
          }, 2000)
        
      }
    }

  });