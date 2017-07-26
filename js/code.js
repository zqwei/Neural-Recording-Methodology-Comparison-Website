// jquery methods for $(document).ready

$(function(){
    var strTemp = $('#code_content').text();
    strTemp = strTemp.replace(/\s/g, '');
    if(!strTemp){
        $('#code_content').load('context/_code_collection.html');
    };


    $('#code_menu a').on('click', function(){
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');
        var str = $(this).text();
        str = str.replace(/\s+/g, '_').toLowerCase();
        $('#code_content').load('context/_code_' + str + '.html')
    });
}()
);