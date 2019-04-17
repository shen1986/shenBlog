/*
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-17 10:50:47
 */
$(function () {
    $(".ant-input-search-icon").on("click", function () {
        var keyword =  $("#search-input").val();
        window.location.href = `/search/${keyword}`;
    });
});