chrome.runtime.onMessage.addListener(message)

function message(request) {
    chrome.runtime.sendMessage({
        msg: "something_completed",
        columns: request.columns,
    });
}


