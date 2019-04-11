/*
 * @Description: 点滴页js
 * @Author: shenxf
 * @Date: 2019-03-27 12:36:37
 */
$(function () {
    let currentPage = 1;
    let pageSize = 3;
    // 调用分页函数.参数:当前所在页, 总页数(用总条数 除以 每页显示多少条,在向上取整), ajax函数
    setPage(currentPage, Math.ceil(31 / pageSize), render);

    function render() {
        console.log('翻页被点击');
    }

    /**
     *
     * @param pageCurrent 当前所在页
     * @param pageSum 总页数
     * @param callback 调用ajax
     */
    function setPage(pageCurrent, pageSum, callback) {
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
                callback && callback();
            },
            shouldShowPage: function (type, page, current) {
                var result = true;
                switch (type) {
                    case "first":
                    case "last":
                        result = false;
                        break;
                    case "prev":
                        result = (current !== 1);
                        break;
                    case "next":
                        result = (current !== this.totalPages);
                        break;
                    case "page":
                        result = true;
                        break;
                }
                return result;
            }
        })
    }

    $('.wow').on('click', e => {

        var $that = $(this);
        var nodeTile = $that.find('.note-title').html();
        var tag = $that.find('.my-tag').val();
        var created_at = $that.find('.created-at').html();
        var detail = $that.find('.my-note-abstract').val();

        // 模态框内容设定
        $('.modal-title').html(nodeTile);
        $('.note-modal-tag').html(`post@: ${created_at} &nbsp;&nbsp; 标签: ${tag}`);
        $('.note-modal-detail').html(detail);

        // 模态框表示
        $('#myModal').modal('show');
    });

});