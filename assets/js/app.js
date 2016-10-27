new Vue({
    el: "#app",
    data: {
        palindrome: '',
        success: false,
        result: 'Type a word'
    },
    watch: {
        palindrome: function(val) {
          var $this = this;
            $.ajax({
                    'url': "/palindrome",
                    'data': { 'word': val }
                })
                .success(function(data) {
                  $this.success = true;
                  $this.result = "Yes! This is palindrome!";
                })
                .error(function(data) {
                  $this.success = false;
                  $this.result = "No.";
                })
        }
    }
})
