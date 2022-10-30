chrome.runtime.onMessage.addListener(message)

function message(request){
        console.log(request.cols);
}
