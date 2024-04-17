// let fields = [];
// let data = [];
let tableHeader = $('#table > thead');
let tableBody = $('#table > tbody');


function createTable(){
    let headerRow = $('<tr>');
    let ids = [];

    fields.forEach(function(field){
        let column = $('<td>').html(field.name);
        headerRow.append(column);
        ids.push(field.id);
    });
    
    data.forEach(function(d){
        let row = $('<tr>');

        ids.forEach(function(id){
            let column = $('<td>').html(d[id]);
            row.append(column);
        })

        tableBody.append(row);
    });
}

createTable();