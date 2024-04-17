// let fields = [];

let dataForm = $('#data-form > div').first();

function createForm(){
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

function submitForm(){
    let inputs = $('#data-form input').add('#data-form select');

    let d = {}
    inputs.each(function(_, input){
        input = $(input);
        d[input.prop('name')] = input.val();
    })
    data.push(d);
    addTableRow(d);
    resetForm();
}

$('#data-form > button').on('click', function(event){
    event.preventDefault();
    submitForm();
});

function resetForm(){
    $('#data-form input').val('');
    selects = $('#data-form select');
    selects.each(function(_, select){
        select = $(select);
        let firstOption = select.children().first().val();
        select.val(firstOption);
    });
}