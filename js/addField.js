let radioText = $('#radio-text'); // Unused variable
let radioSelect = $('#radio-select');
let inputName = $('#field-name');
let inputItems = $('#select-items');
let separator = ';';
// let optionSeparator = '|';
// let columnSeparator = ';';

// This event handler changes the "Add field" form according to the type of field the user want to add.
$('#add-field-form :radio').on('click', function(event){
    $('#select-items').prop('disabled', event.target.value != 'select');
});

// This function is called when the "Add field" form is submitted.
// It gathers details about the new field that must be added and add it to the fields variable.
// It also calls functions that recreate the custom form, the "Delete field" form and the data table.
function submitAddFieldForm(){
    let field = {};
    // The character columnSeparator is replaced by ",", because it is used to encode/decode the fields variable in order to import/export it.
    let name = inputName.val().replaceAll(columnSeparator, ',');
    field.name = name;

    let type;
    if(radioSelect.prop('checked')){
        type = 'select';
        // The character optionSeparator is replaced by "-", because it is used to encode/decode the fields variable in order to import/export it.
        let options = inputItems.val().replaceAll(optionSeparator, '-').split(separator);
        field.options = options;
    }
    else
        type = 'text';

    field.type = type;
    field.id = nextId;
    nextId++;

    fields.push(field);

    createForm();
    createTable();
    createDeleteFieldForm();
    resetAddFieldForm();
}

// This event handler manages the submission of the "Add field" form.
$('#add-field-form > button').on('click', function(event){
    event.preventDefault();
    submitAddFieldForm();
})

// This function cleans the fields of the "Add field" form.
function resetAddFieldForm(){
    inputName.val('');
    inputItems.val('');
}

