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

/**
 * This function encodes the fields variable into a suitable string ready to be dowloaded as a .csv file.
 * 
 * @param {Array} fields - The fields variable.
 * @returns {string} A string suitable to be dowloaded as a .csv file.
 */
function encodeFields(fields){
    // The properties of the fields variable.
    let properties = ['id', 'name', 'type', 'options'];

    // It creates the header.
    let firstRow = properties.join(columnSeparator) + rowSeparator;

    // It creates the other rows for each fields.
    let otherRows = fields.map(function(field){
        // The row is created according to the properties of the fields variable.
        let rowString = properties.map(function(property){
            let element = field[property];

            // The property 'options' contains an array, so it is processed differently.
            if(property == 'options'){
                if(element == undefined)
                    element = '';
                else
                    element = element.join(optionSeparator); // The elements in the options array are separated by the optionSeparator value.
            }

            return element;
        }).join(columnSeparator); // The columns are separated by the columnSeparator value.
        return rowString;
    }).join(rowSeparator); // The rows are separated by the rowSeparator value.

    let fieldsString = firstRow + otherRows;
    fieldsString += rowSeparator;
    return fieldsString;
}

/**
 * This function encodes the data variable into a suitable string ready to be dowloaded as a .csv file.
 * 
 * @param {Array} data - The data variable.
 * @returns {string} A string suitable to be dowloaded as a .csv file.
 */
function encodeData(data){
    // It gathers the ids of the fields variable.
    let ids = fields.map(field => field['id']);

    // It creates the header, the header contains the ids of each fields.
    let firstRow = ids.join(columnSeparator) + rowSeparator;

    // It creates the other rows for each data.
    let otherRows = data.map(function(d){
        // The row is created according to the ids of the fields variable.
        let rowString = ids.map(key => d[key])
            .join(columnSeparator); // The columns are separated by the columnSeparator value.
        return rowString;
    }).join(rowSeparator); // The rows are separated by the rowSeparator value.

    let dataString = firstRow + otherRows;
    dataString += rowSeparator;
    return dataString;
}

/**
 * This function launches a dowload for the user using a link.
 * 
 * @param {string} stringToDowload - The string to dowload.
 * @param {*} link - A jQuery object refering to a <a> tag.
 */
function downloadWithLink(stringToDowload, link){
    let dataBlob = new Blob([stringToDowload], {type: fileType});
    let dataUrl = URL.createObjectURL(dataBlob);
    link.attr('href', dataUrl);
    link[0].click();
    URL.revokeObjectURL(dataUrl);
}

// Those handlers manage the exportation of the fields and data variable into a .csv file.
exportFieldsButton.on('click', function(){
    let fieldsString = encodeFields(fields);
    downloadWithLink(fieldsString, exportFieldsLink);
});
exportDataButton.on('click', function(){
    let dataString = encodeData(data);
    downloadWithLink(dataString, exportDataLink);
});

/**
 * This function decodes a string that represent the fields variable.
 * It does not change the fields variable.
 * This function is the reciprocal function of encodeFields.
 * 
 * @param {string} fieldsString - A string representing the fields variable.
 * @returns {Array} The fields variable represented by the argument.
 */
function decodeFields(fieldsString){
    // It constructs the fields variable according to the rowSeparator and columnSeparator variables.
    // The fields variable will be an Array of Array instead of an Array of Object.
    let fields = fieldsString.split(rowSeparator)
                        .map((rowString) => rowString.split(columnSeparator));

    // It removes the last line being an empty row. 
    if(fields[fields.length - 1].length == 1 && fields[fields.length - 1][0] == '')
        fields.pop();

    // It gets the properties of the fields variable stored in the header (the first line).
    let properties = fields.shift();

    // It transforms the fields variable into an Array of Object instead of an Array of Array according to the properties variable.
    fields = fields.map(function(field){
        let fieldObject = {};
        properties.forEach((property, i) => fieldObject[property] = field[i]);
        return fieldObject;
    });

    // Ids are transformed in numbers.
    fields.forEach(field => field.id = Number(field.id));

    // An additional process is necessary for the "options" property.
    fields.forEach(field => field.options = field.options.split(optionSeparator));
    
    return fields;
}
/**
 * This function decodes a string that represent the data variable.
 * It does not change the data variable.
 * This function is the reciprocal function of encodeData.
 * 
 * @param {string} dataString - A string representing the data variable.
 * @returns {Array} The data variable represented by the argument.
 */
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

// Those handlers manage the importation of .csv file representing the fields and data variable.
// They also recreate the "Delete field" form, the custom form and the data table.
importFieldsInput.on('change', function(){
    let file = importFieldsInput.get(0).files[0];

    fileReader.onload = function(){
        let fieldsString = fileReader.result;

        // It modifies the fields variable.
        fields = decodeFields(fieldsString);
        nextId = fields[fields.length - 1].id + 1;
        createDeleteFieldForm();
        createForm();
        createTable();
    };

    fileReader.readAsText(file);
})
importDataInput.on('change', function(){
    let file = importDataInput.get(0).files[0];

    fileReader.onload = function(){
        let dataString = fileReader.result;

        // It modifies the data variable.
        data = decodeData(dataString);
        createTable();
    };

    fileReader.readAsText(file);
})
