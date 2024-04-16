$(':radio').on('click', function(event){
    $('#select-items').prop('disabled', event.target.value != 'select');
});