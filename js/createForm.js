// let fields = [];

let dataForm = $('#data-form > div').first();

function createForm(){
    fields.forEach(function(field){
        let div = $('<div>');
        let label = $('<label>')
            .prop('for', field.name)
            .html(field.name);
        let input;
        if(field.type == 'select'){
            input = $('<select>')
                .prop('id', field.name)
                .prop('name', field.name);
            field.options.forEach(function(value){
                let option = $('<option>')
                    .val(value)
                    .html(value);
                input.append(option);
            })
        }
        else{ 
            input = $('<input>')
                .prop('id', field.name)
                .prop('type', field.type)
                .prop('name', field.name);
        }

        div.append(label);
        div.append(input);
        dataForm.append(div);
    })
}

createForm();