// let fields = [];
// let data = [];
let tableHeader = $('#table > thead');
let tableBody = $('#table > tbody');

function createTable(){
    destroyTable();
    let headerRow = $('<tr>');
    let ids = [];

    fields.forEach(function(field){
        let column = $('<td>').html(field.name);
        headerRow.append(column);
        ids.push(field.id);
    });

    tableHeader.append(headerRow);
    
    data.forEach(function(d){
        addTableRowWithIds(d, ids);
    });
}

createTable();

function addTableRow(d){
    ids = fields.map(field => field['id']);

    addTableRowWithIds(d, ids);
}

function addTableRowWithIds(d, ids){
    let row = $('<tr>');

    ids.forEach(function(id){
        let column = $('<td>').html(d[id]);
        row.append(column);
    })

    tableBody.append(row);
}

function destroyTable(){
    tableHeader.html('');
    tableBody.html('');
}