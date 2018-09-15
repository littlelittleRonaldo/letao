$(function(){
    $('.mui-action-back').on('tap',function(){
        // history.back();
        location.go(-1);
    })
    $('body').on('tap','a',function(){
        mui.openWindow({
            url:$(this).attr('href')
        })
    })
    $('mui-tab-item').on('tap',function(){
        $(this).addClass('.mui-active').siblings().remoeClass('.mui-active');
    })
})