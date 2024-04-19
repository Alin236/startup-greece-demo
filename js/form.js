// let fields = [];
let data = [];
// let columnSeparator = ';';

let dataForm = $('#data-form > div').first();

// This function creates/recreates the custom form according to the fields variable.
function createForm(){
    destroyForm();

    // For each fields it creates an input/select field.
    fields.forEach(function(field){
        let div = $('<div>');
        let label = $('<label>')
            .prop('for', field.id)
            .html(field.name);
        let input;
        if(field.type == 'select'){
            input = $('<select>')
                .prop('id', field.id)
                .prop('name', field.id);
            field.options.forEach(function(value){
                let option = $('<option>')
                    .val(value)
                    .html(value);
                input.append(option);
            })
        }
        else{ 
            input = $('<input>')
                .prop('id', field.id)
                .prop('type', field.type)
                .prop('name', field.id);
        }

        div.append(label);
        div.append(input);
        dataForm.append(div);
    })
}

createForm();

// This function is called when the custom form is submitted.
// It gathers the data informations from all the custom fields and add it to the data variable.
// It also calls a function that add a new row to the data table.
function submitForm(){
    let inputs = $('#data-form input').add('#data-form select');

    let d = {}
    inputs.each(function(_, input){
        input = $(input);
        // The character columnSeparator is replaced by ",", because it is used to encode/decode the fields variable in order to import/export it.
        let value = input.val().replaceAll(columnSeparator, ',');
        let key = input.prop('name');
        d[key] = value;
    })
    data.push(d);
    addTableRow(d);
    resetForm();
}

// This event handler manages the submission of the custom form.
$('#data-form > button').on('click', function(event){
    event.preventDefault();
    submitForm();
});

// This function cleans the fields of the custom form.
function resetForm(){
    $('#data-form input').val('');

    // Select fields are putted back to their first value.
    selects = $('#data-form select');
    selects.each(function(_, select){
        select = $(select);
        let firstOption = select.children().first().val();
        select.val(firstOption);
    });
}

// This function removes the fields of the custom form.
function destroyForm(){
    dataForm.html('');
}