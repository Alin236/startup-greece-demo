let importFieldsInput = $('#importFieldsInput');
let importDataInput = $('#importDataInput');
let fileReader = new FileReader();
let rowSeparator = '\r\n';
let optionSeparator = '|';
let columnSeparator = ';';
let fileType = 'text/csv';
let exportFieldsLink = $('#exportFieldsLink');
let exportDataLink = $('#exportDataLink');
let exportFieldsButton = $('#exportFieldsButton');
let exportDataButton = $('#exportDataButton');
// let data = [];
// let fields = [];

function encodeFields(fields){
    let properties = ['id', 'name', 'type', 'options'];
    let firstRow = properties.join(columnSeparator) + rowSeparator;

    let fieldsString = firstRow + fields.map(function(field){
        let rowString = properties.map(function(property){
            let element = field[property];
            if(property == 'options'){
                if(element == undefined)
                    element = '';
                else
                    element = element.join(optionSeparator);
            }
            return element;
        }).join(columnSeparator);
        return rowString;
    }).join(rowSeparator);

    fieldsString += rowSeparator;
    return fieldsString;
}
function encodeData(data){
    let ids = fields.map(field => field['id']);
    let firstRow = ids.join(columnSeparator) + rowSeparator;

    let dataString = firstRow + data.map(function(d){
        let rowString = ids.map(key => d[key])
            .join(columnSeparator);
        return rowString;
    }).join(rowSeparator);

    dataString += rowSeparator;
    return dataString;
}

function downloadWithLink(stringToDowload, link){
    let dataBlob = new Blob([stringToDowload], {type: fileType});
    let dataUrl = URL.createObjectURL(dataBlob);
    link.attr('href', dataUrl);
    link[0].click();
    URL.revokeObjectURL(dataUrl);
}

exportFieldsButton.on('click', function(){
    let fieldsString = encodeFields(fields);
    downloadWithLink(fieldsString, exportFieldsLink);
});
exportDataButton.on('click', function(){
    let dataString = encodeData(data);
    downloadWithLink(dataString, exportDataLink);
});

function decodeFields(fieldsString){
    let fields = fieldsString.split(rowSeparator)
                        .map((rowString) => rowString.split(columnSeparator));

    if(fields[fields.length - 1].length == 1 && fields[fields.length - 1][0] == '')
        fields.pop();

    let properties = fields.shift();
    fields = fields.map(function(field){
        let fieldObject = {};
        properties.forEach((property, i) => fieldObject[property] = field[i]);
        return fieldObject;
    });

    fields.forEach(field => field.options = field.options.split(optionSeparator));
    
    return fields;
}
function decodeData(dataString){
    let data = dataString.split(rowSeparator)
                        .map((rowString) => rowString.split(columnSeparator));
    
    if(data[data.length - 1].length == 1 && data[data.length - 1][0] == '')
        data.pop();

    let properties = data.shift();
    data = data.map(function(d){
        let dObject = {};
        properties.forEach((property, i) => dObject[property] = d[i]);
        return dObject;
    });

    return data;
}

importFieldsInput.on('change', function(event){
    let file = importFieldsInput.get(0).files[0];

    fileReader.onload = function(){
        let fieldsString = fileReader.result;
        fields = decodeFields(fieldsString);
        createDeleteFieldForm();
        createForm();
        createTable();
    };

    fileReader.readAsText(file);
})
importDataInput.on('change', function(event){
    let file = importDataInput.get(0).files[0];

    fileReader.onload = function(){
        let dataString = fileReader.result;
        data = decodeData(dataString);
        createTable();
    };

    fileReader.readAsText(file);
})
