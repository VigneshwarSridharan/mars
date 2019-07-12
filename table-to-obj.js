(() => {
    let mainTable = document.querySelector('.L3container>.datatable>tbody')
    let rows = Array.apply(null,mainTable.children);

    function tableToObj(rows) {
        let result = {};
        rows.map(item => {
            let data = Array.apply(null,item.children);
    
            if(data.length == 2) {
                let [key,value] = data;
                if(Array.apply(null,value.children).length) {
                    let tmpRows = Array.apply(null,value.children[0].children[0].children)
                    result[key.innerText] = tableToObj(tmpRows);
                    return
                }
                result[key.innerText] = value.innerText;
            }
        })
        return result;

    }
    delete rows[0]
    let endResult = tableToObj(rows)
    

    console.clear();
    console.log(JSON.stringify(endResult));
})()