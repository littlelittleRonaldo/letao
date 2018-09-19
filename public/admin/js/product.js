$(function(){
    $.ajax({
        url:'/product/queryProductDetailList',
        type:'get',
        data:{
            page:1,
            pageSize:20
        },
        success:function(res){
            var html = template('tpl',res);
            $('tbody').html(html);
        }
    })
})