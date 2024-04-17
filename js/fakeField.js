// This is an example of fields. It is also used at the launch of the page to avoid having empty forms and table's header.
let fields = [
    {id: 1, type: 'text', name: 'Name'},
    {id: 2, type: 'text', name: 'Age'},
    {id: 3, type: 'select', name: 'Color', options: ['Red', 'Blue', 'Yellow', 'Pink']},
];
let nextId = fields[fields.length - 1].id + 1;