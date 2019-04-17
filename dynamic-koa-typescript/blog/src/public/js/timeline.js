/*
 * @Description: 归档
 * @Author: shenxf
 * @Date: 2019-03-27 12:36:37
 */
$(function () {

    $("#myDropdown")
        .on("show.bs.dropdown", function () {
            $(this)
                .find(".glyphicon")
                .removeClass("glyphicon-chevron-up")
                .addClass("glyphicon-chevron-down");
        })
        .on("hidden.bs.dropdown", function () {
            $(this)
                .find(".glyphicon")
                .removeClass("glyphicon-chevron-down")
                .addClass("glyphicon-chevron-up");
        });

    $(".dropdown-menu>li").on("click", function (e) {
        // console.log(e);
        // // // alert(1);
        $("#dropdownText").html(
            $(this).find("a").html()
        );
        $("#myDropdown").trigger("hidden.bs.dropdown");

        renderTimeline($(this).find("a").data('id'));
    });

    let currentPage = 1;
    let pageSize = 30;
    let totalPage = $("#totalPage").val();
    totalPage = totalPage || 0;

    // 如果数据存在
    if (totalPage !== 0) {
        // 调用分页函数.参数:当前所在页, 总页数(用总条数 除以 每页显示多少条,在向上取整), ajax函数
        setPage(currentPage, Math.ceil(totalPage / pageSize), render);
    }

    // 翻页函数
    var render = function(page) {
        console.log(page);
        // ajax请求

    }

    /**
     * 设置翻页属性
     * @param pageCurrent 当前所在页
     * @param pageSum 总页数
     * @param callback 调用ajax
     */
    var setPage = function (pageCurrent, pageSum, callback) {
        $(".pagination").bootstrapPaginator({
            // 设置控件显示的页码数
            numberOfPages: 8,

            // 设置版本号
            bootstrapMajorVersion: 3,

            // 显示第几页
            currentPage: pageCurrent,

            // 总页数
            totalPages: pageSum,

            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, page) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                currentPage = page;
                callback && callback(page);
            },
            shouldShowPage: function (type, page, current) {
                var result = true;
                switch (type) {
                    case "first":
                    case "last":
                        result = false;
                        break;
                    case "prev":
                        result = current !== 1;
                        break;
                    case "next":
                        result = current !== this.totalPages;
                        break;
                    case "page":
                        result = true;
                        break;
                }
                return result;
            }
        });
    }
});

var renderTimeline = function (id) {
    $.ajax({
        url: 'get-timeline',
        data: {
            current: 1,
            count: 30,
            category: id
        },
        type: 'get',
        success: function (data) {
            $(".timeline-body").html(data);
        }
    });
}