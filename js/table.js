// let fields = [];
// let data = [];
let tableHeader = $('#table > thead');
let tableBody = $('#table > tbody');

// This function creates/recreates the custom form according to the fields and data variables.
function createTable(){
    destroyTable();

    // First, it creates the table's header according to the fields variable.
    let headerRow = $('<tr>');
    let ids = [];

    fields.forEach(function(field){
        let column = $('<th>').html(field.name);
        headerRow.append(column);
        ids.push(field.id);
    });

    tableHeader.append(headerRow);
    
    // Then, it creates the table's row according to the data variable and the ids of the fields variable.
    data.forEach(function(d){
        addTableRowWithIds(d, ids);
    });
}

createTable();

/**
 * This function adds a row to the data table.
 * 
 * @param {Object} d - A row of data.
 */
function addTableRow(d){
    ids = fields.map(field => field['id']);

    addTableRowWithIds(d, ids);
}

/**
 * This function adds a row to the data table.
 * 
 * @param {Object} d - A row of data.
 * @param {Array} ids - The ids of the fields (the ids can be found in the fields variable).
 */
function addTableRowWithIds(d, ids){
    let row = $('<tr>');

    ids.forEach(function(id){
        let column = $('<td>').html(d[id]);
        row.append(column);
    })

    tableBody.append(row);
}

// This function empties the table.
function destroyTable(){
    tableHeader.html('');
    tableBody.html('');
}