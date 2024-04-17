// let fields = [];

let selectDeleteField = $('#delete-field');
let selectDefaultText = selectDeleteField.children().first().html();

// This function creates/recreates the "Delete field" form according to the fields variable.
function createDeleteFieldForm(){
    destroyDeleteFieldForm();
    let option = $('<option>').html(selectDefaultText);
    selectDeleteField.append(option);

    fields.forEach(function(field){
        option = $('<option>')
            .val(field.id)
            .html(field.name);
        selectDeleteField.append(option);
    })
}

createDeleteFieldForm();

// This function removes the options in the select of the "Delete field" form.
function destroyDeleteFieldForm(){
    selectDeleteField.html('');
}

// This function is called when the "Delete field" form is submitted.
// It gathers the id of the field that must be deleted and remove it from the fields variable.
// It also calls functions that recreate the custom form, the "Delete field" form and the data table.
function submitDeleteFieldForm(){
    let fieldIdToDelete = selectDeleteField.val();
    if(fieldIdToDelete == selectDefaultText)
        return;

    let indexToDelete = fields.findIndex(field => field.id == fieldIdToDelete);
    if(indexToDelete == -1)
        return;
    fields.splice(indexToDelete, 1);
    
    createDeleteFieldForm();
    createForm();
    createTable();
}

// This event handler manages the submission of the "Delete field" form.
$('#delete-field-form > button').on('click', function(event){
    event.preventDefault();
    submitDeleteFieldForm();
})