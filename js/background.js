//
// //  Send columns length to popup.js
// function receiver( request ) {
//     columns = request.columns
//     chrome.tabs.sendMessage(sender.tab.id , columns)
//
// }

    var columns = ""
 

    
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            chrome.storage.session.set({
                "columns": request.columns
            }, () => {})
        })
 
