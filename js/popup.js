chrome.storage.local.get(['cols'], ( result ) => {
    let columns = result.cols;
    // console.log('Value currently is ' + columns);
    document.querySelector('#element').innerHTML = columns;

});








