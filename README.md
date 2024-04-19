# Demo for Startup Greece
A demo task for Startup Greece.

## Tasks
- Create a custom build form where the user can add or remove fields (only 2 types will be used: text and select).
- Create a table that will display data saved by the user. The table's header must contain the name of each field.

## Notes
- Both back-end and front-end implementations can be used.
- The form and table must be on the same page.
- No need to spend too much time on the design, the focus should be on the main functionality.
- Only use JavaScript and jQuery. The use of a JS framework is not allowed.
- The use of other JavaScript & jQuery libraries is allowed.

## Evaluation
Tasks will be evaluated according to:
- Information gathering capabilities and suitability of data,
- Language style and structure of the text,
- Understanding of tasks.

# Solution
## Content
The page contains:
### Forms
Three forms:
- The custom form, where the user can add data to the data table. The custom form fields are modifiable via the "Add field" form and the "Delete field" form.
- The "Add field" form, where the user can add fields to the custom form. The user can choose to add a text or select field and can name the field. In case of a select field the user can specify the selectable options.
- The "Delete field" form, where the user can select one of the custom form field and delete it.

### Data table
A table that displays the data stored by the user.

The table's header contains the name of the custom fields and will change when the user adds or deletes a field.

### Save data section
A "Save data" section, where the user can save the custom fields and the data into .csv files.

## Front-end only
This solution is front-end only.

## Launch
Being a front-end only solution, the page can be launched by opening the [index.html](index.html) file in a browser.

## Export/Import data
Being a front-end only solution, in order to store the data, the user can export/import the custom fields and the data into 2 .csv files.

In the .csv file, the custom fields will be stored in a table where the column names are id, name, type and options. The id is automatically given, the name is the one inserted by the user, the type is either text or select and the options represent the selectable options for a select field.

In the .csv file, the data will be stored in a table where the column names are numbers. The numbers represent the ids of the custom fields.

The columns are separated by ";".
The options for a select field are separated by "|".

Two examples .csv can be found in the [save folder](save) named [fields.example.csv](fields.example.csv) and [data.example.csv](data.example.csv).

## Design
A few amount of css is used, mainly to add borders and to change the size and position of elements.

## Library
The only library used is jQuery.