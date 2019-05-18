/*
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-17 10:50:47
 */
$(function () {
    $('#search-input').popover({
        title: '提示',
        placement: 'bottom',
        content: '请输入关键字',
        container: 'body',
        tigger: 'manual'
    });
    
    var clickFlg = false;
    $(".ant-input-search-icon").on("click", function () {
        var keyword =  $("#search-input").val();
        if (!keyword || keyword === '') {
            clickFlg = true;
            $('#search-input').popover('show');
            return false;
        }
        window.location.href = `/search/${keyword}`;
    });
    $("#search-input").on("keyup", function(e) {
        if (e.keyCode === 13) {
            var keyword =  $("#search-input").val();
            if (!keyword || keyword === '') {
                clickFlg = true;
                $('#search-input').popover('show');
                return false;
            }
            window.location.href = `/search/${keyword}`;
        }
    });

    $('#search-input').on('show.bs.popover', function () {
        if (clickFlg === false ) {
            return false;
        } else {
            clickFlg = false;
        }
    })
});