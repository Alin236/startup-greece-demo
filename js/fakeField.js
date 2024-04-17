// This is an example of fields. It is also used at the launch of the page to avoid having empty forms and header's table.
let fields = [
    {id: 1, type: 'text', name: 'name'},
    {id: 2, type: 'text', name: 'age'},
    {id: 3, type: 'select', name: 'color', options: ['red', 'blue', 'yellow', 'pink']},
];
let nextId = fields[fields.length - 1].id + 1;