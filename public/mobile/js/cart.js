$(function(){
    var page = 1;
    var pageSize = 7;
    $.ajax({
        url:'/cart/queryCartPaging',
        type:'get',
        data:{
            page:page,
            pageSize
        },
        success:function(res){
            if(res.error) {
                localStorage.returnUrl = location.href;
                location.href = 'login.html';
            }else {
                var html = template('tpl',res);
                var arr = [];
                $.each(res.data,function(index,value){
                    arr.push(value.price*value.num)
                })
                var total = eval(arr.join('+'));
                $('.cart-box').html(html);
                $('.total').html('订单总额：￥'+total)
                console.log(res);
            }
        }
    });
    $('.cart-box').on('tap','.del',function(){
        var id = $(this).data('id');
        $.ajax({
            url:'/cart/deleteCart',
            data:'get',
            data:{id:[id]},
            success:function(res){
                if (res.success) {
                    location.reload();
                }else {
                    mui.toast('操作失败');
                }
            }
        })
    });
});
