// let fields = [];

let selectDeleteField = $('#delete-field');
let selectDefaultText = selectDeleteField.children().first().html();

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

function destroyDeleteFieldForm(){
    selectDeleteField.html('');
}

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

$('#delete-field-form > button').on('click', function(event){
    event.preventDefault();
    submitDeleteFieldForm();
})