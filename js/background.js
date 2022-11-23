// chrome.runtime.onMessage.addListener(receiver);
var columns = ""
//
// //  Send columns length to popup.js
// function receiver( request ) {
//     columns = request.columns
//     chrome.tabs.sendMessage(sender.tab.id , columns)
//
// }

chrome.runtime.onMessage.addListener((request , sender , sendResponse) => {
    chrome.storage.local.set({"columns": request.columns}, () => {
    })
})
