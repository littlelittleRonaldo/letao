$(function(){
    $('.login-btn').on('tap',function(){
        var username = $('[name="username"]').val().trim();
        var password = $('[name="password"]').val().trim();
        if (!username) {
            mui.toast('用户名不能为空');
            return;
        }
        if (!password) {
            mui.toast('密码不能为空');
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password,
            },
            success:function(res){
                console.log(res);
                if (res.success) {
                    mui.toast('登录成功');
                    setTimeout(function(){
                        location.href = 'user.html'
                    },2000);
                }else {
                    mui.toast(res.message);
                }
            }
        })
    })
})