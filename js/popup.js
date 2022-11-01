document.addEventListener('DOMContentLoaded',()=>{
    var element = document.querySelector("#columns-length")
    chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {

        if (request.msg === "something_completed") {
            //  To do something
            console.log(request.columns)
            if(element){
                element.textContent =  `${request.columns}`
            }

        }
    });


} )

