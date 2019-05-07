/*
 * @Description: home画面js
 * @Author: shenxf
 * @Date: 2019-04-10 20:56:51
 */
$(function(){
    var $links =  $('.list-head-carousel').find('p');
    var $linksLength = $links.length;
    var index = 0;

    $links.eq(0).css('opacity','1');

    setInterval(function(){

        if (index >= $linksLength) {
            index = 0;
        }

        $links.css('opacity','0').eq(index).css('opacity','1');

        index++;
        
    },3000);
});