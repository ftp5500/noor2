//  Get the number of columns from background.js

chrome.storage.session.get(['columns'], (result) => {
   
    // Check if resutl columns not undefined or null 
    let totalColumns = result.columns != undefined || result.columns != null ?  Object.keys(result.columns).length : 0 ;

    let params = {
        active: true,
        currentWindow: true
    }

    var p = document.querySelector('#count')
    var btn_group = document.querySelector('.btn-group');
    let all_content = document.querySelector('.all-content');
    var text_area = document.querySelector('.userInput');
    var rasid = document.querySelector('#rasid');
    var oneValueButton = document.querySelector('.one-value-button');
    var oneValueInput = document.querySelector('.one-value-input');
    var maxValueBtn = document.querySelector('.max-value-btn');
    var eraseAll = document.querySelector('.erase-all');
    autosize(document.querySelector('textarea'));
    try {
        if (totalColumns > 0) {
            // Creat an object to send it to contnet.js if max-value- btn clicked
            maxValueBtn.addEventListener("click", () => {
                chrome.tabs.query(params, (tabs) => {
                    let msg = {
                        txt: "fill_with_max_value",
                        colsNumber: p.innerHTML,


                    }
                    chrome.tabs.sendMessage(tabs[0].id, msg)
                })
            })

            eraseAll.addEventListener("click", () => {
                chrome.tabs.query(params, (tabs) => {
                    let msg = {
                        txt: "erase_all",
                        colsNumber: p.innerHTML,


                    }
                    chrome.tabs.sendMessage(tabs[0].id, msg)
                })
            })
            for (var i = 0; i < totalColumns; i++) {
                var radioButton = document.createElement("input");
                radioButton.setAttribute("type", "radio")
                radioButton.className = "checked:bg-yellow-300 m-1 checked:border-transparent px-1 text-right"
                radioButton.setAttribute("name", "btnradio")
                radioButton.setAttribute("value", i)
                radioButton.id = `radio${i}`
                var label = document.createElement("label");
                label.className = "px-2"
                label.setAttribute("for", radioButton.id)
                label.innerHTML = `${i + 1}`
                btn_group.appendChild(radioButton)
                btn_group.appendChild(label)
                radioButton.addEventListener("change", (e) => {
                    // console.log(e.target.value);
                    var columnNumber = e.target.value;
                    delete columnNumber
                    columnNumber = e.target.value
                    p.innerHTML = columnNumber
                    all_content.hidden = false


                    //  1- create an object to send it to content.js if rasid button clicked
                    rasid.addEventListener("click", () => {

                        chrome.tabs.query(params, (tabs) => {
                            let msg = {
                                txt: "fill_value_list",
                                colsNumber: p.innerHTML,
                                the_value: text_area.value.split("\n")
                            }
                            chrome.tabs.sendMessage(tabs[0].id, msg)
                        })
                    });

                    //  2- create an object to send it to content.js if one-value-button  clicked
                    oneValueButton.addEventListener("click", () => {
                        chrome.tabs.query(params, (tabs) => {
                            let msg = {
                                txt: "fill_one_value",
                                colsNumber: p.innerHTML,
                                the_value: oneValueInput.value
                            }
                            chrome.tabs.sendMessage(tabs[0].id, msg)
                        })
                    })


                    chrome.tabs.query(params, (tabs) => {
                        let msg = {
                            txt: "colorAllInputs",
                            colsNumber: p.innerHTML,
                        }
                        chrome.tabs.sendMessage(tabs[0].id, msg)
                    })
                })
            }

        }
    } catch (error) {
        console.log(error)
    }


})
