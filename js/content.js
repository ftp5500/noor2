var tableRows = document.querySelectorAll("  tr  ");
var table = [document.querySelectorAll("table")];


var all_tables = document.querySelectorAll("table");
window.ourTables;
window.thLen;
window.thWithInput
Object.keys(all_tables).forEach(function ( key ) {
    var x = all_tables[ key ].querySelector("td > input[type=text]")
    if (x !== null) {
        window.ourTables = key
        window.thLen = all_tables[ key ].querySelectorAll("th ").length
        window.thWithInput = all_tables[ key ].querySelectorAll("th > input[type=text] ").length
    }
});


let final = (Number(window.ourTables) + 1) + Number(window.thLen)


//* SEND TO BACKGROUND
try {


    var tables = document.querySelectorAll("tr")
    for (var i = 1; i < tables.length; i++) {
        var cols = tables[ i ].querySelectorAll("  td > input[type=text]");

        for (let j = 0; j < cols.length; j++) {
            let message = {
                columns: cols,
                // attribute: cols[ j ].getAttribute("readonly")
            };
            chrome.runtime.sendMessage(message)
        }


    }


    //* GET FROM POPUP VALUE THEN DO THIS CONTENT 👇🏻
    chrome.runtime.onMessage.addListener(gotMessage)

    function gotMessage( message ) {

        if (message.txt === "colorAllInputs") {
            choiceColumn()
        }

        // Fill inputs by columns
        fillInputs()

        // fill all inputs with max value
        fillMaxValue()

        // erase all inputs
        eraseAllValue()

        //  First choice the column
        function choiceColumn() {

            for (var i = 1; i < tableRows.length; i++) {
                var cols = tableRows[ i ].querySelectorAll("td > input[type=text]");
                for (var j = 0; j < cols.length; j++) {
                    cols[ message.colsNumber ].style.backgroundColor = "#ddfcee"
                    cols[ message.colsNumber ].style.color = "black"
                    cols[ message.colsNumber ].style.outline = "none"
                    cols[ message.colsNumber ].style.border = "solid #BDBDBD 0.5px"
                }
            }

        }

        // Then fill by columns
        function fillInputs() {
            let marks = message.the_value
            /*Table Rows*/
            for (var i = 1; i < tableRows.length; i++) {
                var cols = tableRows[ i ].querySelectorAll("td > input[type=text]");
                var mark;

                if (message.txt === "fill_value_list") {
                    if (Number(window.thWithInput) > 0) {
                        mark = marks[ i - final ]
                    } else {
                        mark = marks[ i - (Number(window.ourTables) + 1) ]
                    }

                } else if (message.txt === "fill_one_value") {
                    mark = marks
                } else {
                    return;
                }
                if (mark === undefined) {
                    mark = ""
                }
                for (var j = 0; j < cols.length; j++) {
                    cols[ message.colsNumber ].value = mark
                }
            }

        }

        // fill with max value
        function fillMaxValue() {
            if (message.txt === "fill_with_max_value") {
                const tables = document.querySelectorAll("table")

                for (let table of tables) {
                    if (table.rows.length > 1) {
                        for (let i = 0; i < table.rows.length; i++) {
                            if (table.rows[ i ].querySelectorAll("th").length <= 0) {
                                let columns = table.rows[ i ].querySelectorAll("td input[type=text]")
                                for (let j = 0; j < columns.length; j++) {

                                    columns[ j ].value = columns[ j ].getAttribute("maxnumber")

                                }
                            }

                        }
                    }

                }
            }


        }

        // Erase all value
        function eraseAllValue() {
            if (message.txt === "erase_all") {
                const tables = document.querySelectorAll("table")
                for (let table of tables) {
                    if (table.rows.length > 1) {
                        for (let i = 0; i < table.rows.length; i++) {
                            if (table.rows[ i ].querySelectorAll("th").length <= 0) {
                                let columns = table.rows[ i ].querySelectorAll("td input[type=text]")
                                for (let j = 0; j < columns.length; j++) {
                                    columns[ j ].value = ""
                                }
                            }

                        }
                    }

                }
            }
        }

    }
} catch (err) {
    console.log(err);
}
