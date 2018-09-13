$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function(res){
            var html = template('tp1',res);
            $('.link').html(html);
            // console.log(res);
            if(res.rows.length>0){
                var id = res.rows[0].id;
                getBrandlog(id);
                $('.link li').eq(0).addClass('active');
            }
        }
    });
    function getBrandlog(id) {
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            data:{id:id},
            success:function(res){
                var html = template('tp2',res);
                $('.brand-list').html(html);
            }
        })
    }
    
    $('.link').on('tap','li',function(){
        $(this).addClass('active').siblings().removeClass('active');
        // console.log($(this).data('id'));
        var id = $(this).data('id');
        getBrandlog(id);
    })
});