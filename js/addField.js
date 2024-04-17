let radioText = $('#radio-text');
let radioSelect = $('#radio-select');
let inputName = $('#field-name');
let inputItems = $('#select-items');
let separator = ';';

$('#add-field-form :radio').on('click', function(event){
    $('#select-items').prop('disabled', event.target.value != 'select');
});

function submitAddFieldForm(){
    let field = {};
    let name = inputName.val();
    field.name = name;

    let type;
    if(radioSelect.prop('checked')){
        type = 'select';
        let options = inputItems.val().split(separator);
        field.options = options;
    }
    else
        type = 'text';
    field.type = type
    field.id = nextId;
    nextId++;
    fields.push(field);
    createForm();
    createTable();
    createDeleteFieldForm();
    resetAddFieldForm();
}

$('#add-field-form > button').on('click', function(event){
    event.preventDefault();
    submitAddFieldForm();
})

function resetAddFieldForm(){
    inputName.val('');
    inputItems.val('');
}

