$(function(){
    $('.modify-btn').on('tap',function(){
        var oldPassword = $('[name="oldPassword"]').val().trim();
        var newPassword = $('[name="newPassword"]').val().trim();
        var confirmPwd = $('[name="confirmPwd"]').val().trim();
        var vCode = $('[name="vCode"]').val().trim();
        if (!oldPassword) {
            mui.toast('请输入原始密码');
            return;
        }
        if (newPassword !== confirmPwd) {
            mui.toast('密码不一致');
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/updatePassword',
            data:{
                oldPassword:oldPassword,
                newPassword:newPassword,
                vCode:vCode
            },
            success:function(res){
                console.log(res);
                if (res.success) {
                    mui.toast('修改密码成功');
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
            url:'/user/vCodeForUpdatePassword',
            success:function(res){
                console.log(res.vCode);
            }
        })
    })
})