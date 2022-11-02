// chrome.runtime.onMessage.addListener(message)
//
// function message(request) {
//     chrome.runtime.sendMessage({
//         msg: "something_completed",
//         columns: request.columns,
//     });
//
// }
//

chrome.runtime.onMessage.addListener(getColumns)

function getColumns( request ) {
    chrome.storage.local.set({["cols"]: request.columns});
}
