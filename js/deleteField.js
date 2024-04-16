// let fields = [];

let selectDeleteField = $('#delete-field');
let selectDefaultText = selectDeleteField.html();

function createDeleteFieldForm(){
    selectDeleteField.html('');
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