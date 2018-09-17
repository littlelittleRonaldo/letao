$(function(){
    $('.mui-action-back').on('tap',function(){
        // history.back();
        location.go(-1);
    });
    $('body').on('tap','a',function(){
        mui.openWindow({
            url:$(this).attr('href')
        })
    });
    $('mui-tab-item').on('tap',function(){
        $(this).addClass('.mui-active').siblings().remoeClass('.mui-active');
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
})