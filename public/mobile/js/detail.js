$(function(){
    var id = getParamsByUrl(location.href,'id');
    var count = 1;
    var num,size;
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{id:id},
        success:function(res){
            var html = template('tpl',res);
            $('.mui-scroll').html(html);
            num = res.num
        }   
    });

    $('.mui-scroll').on('tap','.size span',function(){
        $(this).addClass('active').siblings().removeClass('active');
        size = parseInt($(this).text());
        console.log(size);
    });

    $('.mui-scroll').on('tap','.add',function(){
        count<num && $('.count').text(++count);
    });

    $('.mui-scroll').on('tap','.reduce',function(){
        count>1 && $('.count').text(--count);
    });

    $('.mui-scroll').on('tap','.addCart',function(){
        if(!$('.size span').hasClass('active')){
            mui.toast('请选择尺码');
            return;
        }
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                productId:id,
                num:count,
                size:size
            },
            success:function(res){
                if(res.success){
                    mui.confirm('添加购物车成功，要去购物车看看吗',function(message){
                        if(message.index){
                            location.href = 'cart.html';
                        }
                    })
                }else if(res.error == 400){
                    localStorage.returnUrl = location.href;
                    location.href = 'login.html'
                }
            }
        })
    })
})