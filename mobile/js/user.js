var userInfo;
$.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    async:false,
    success:function(res){
        if (res.error) {
            location.href = 'login.html';
        }
        console.log(res);
        userInfo = res;
    }
})
$(function(){
    var html = template('tpl',userInfo);
    $('.userInfo').html(html);
    $('.logout').on('tap',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(res){
                if (res.success){
                    mui.toast('退出登录成功')
                    setTimeout(function(){
                        location.href = 'index.html';
                    },2000);
                }
            }
        })
    })
})