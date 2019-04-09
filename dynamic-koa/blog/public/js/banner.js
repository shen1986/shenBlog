/*
 * @Description: 轮播图(不是重点，随便弄一下)
 * @Author: shenxf
 * @Date: 2019-04-09 14:38:04
 */
$(function () {
    $(".banner-preview-item").on("click", function () {
        clearInterval(intId);

        var selIndex = $(this).index();
        changDis(selIndex);

        index = selIndex;
        intId = setInterval(changeInd, 3000);
    });

    var index = 0;
    var intId = setInterval(changeInd, 3000);

    var changDis = function (index) {
        $(".banner-item")
            .css("opacity", "0")
            .eq(index)
            .css("opacity", "1");

        var per = index * 25;
        $(".banner-preview-arrow").css("top", per + "%");
    };

    var changeInd = function() {
        index++;
        if (index > 3) {
            index = 0;
        }
        changDis(index);
    };
});