
    var tables = document.querySelectorAll("tr")
    for (var i = 1; i < tables.length; i++) {
        var cols = tables[ i ].querySelectorAll("  td > input[type=text]");
        if(cols.length > 0){
            console.log(cols);
          let message = {
              columns:cols.length
          }
          chrome.runtime.sendMessage(message)
        }

    }

