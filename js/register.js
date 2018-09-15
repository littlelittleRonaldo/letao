$(function(){
    $('.register-btn').on('tap',function(){
        var username = $('[name="username"]').val().trim();
        var mobile = $('[name="mobile"]').val().trim();
        var password = $('[name="password"]').val().trim();
        var confirmPwd = $('[name="confirmPwd"]').val().trim();
        var vCode = $('[name="vCode"]').val().trim();
        if (!username) {
            mui.toast('用户名不能为空');
            return;
        }
        var regMb = /^1\d{10}$/;
        if (!regMb.test(mobile)) {
            mui.toast('手机号不合法');
            return;
        }
        if (!password || password !== confirmPwd) {
            mui.toast('密码不能为空或不一致');
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                mobile:mobile,
                password:password,
                vCode:vCode
            },
            success:function(res){
                console.log(res);
                if (res.success) {
                    mui.toast('注册成功');
                    setTimeout(function(){
                        location.href = 'login.html'
                    },2000);
                }else {
                    mui.toast(res.message);
                }
            }
        })
    })
    $('.getCode').on('tap',function(){
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(res){
                console.log(res.vCode);
            }
        })
    })
})