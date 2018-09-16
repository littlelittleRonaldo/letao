$(function(){
    if(localStorage.getItem('editAddress')){
        var address = JSON.parse(localStorage.getItem('editAddress'));
        var html = template('tpl',address);
        $('.mui-input-group').html(html);
    }else {
        return;
    }
    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData); 
    $('#city').on('tap',function(){
        picker.show(function (selectItems) {
            $('#city').val(selectItems[0].text+selectItems[1].text+(selectItems[2].text || ''));
        })
    })
    var id = address.id;
    $('.mui-input-group').on('tap','#editBtn',function(){
        var recipients = $('[name="recipients"]').val().trim();
        var postCode = $('[name="postCode"]').val().trim();
        var address = $('[name="address"]').val().trim();
        var addressDetail = $('[name="addressDetail"]').val().trim();
        if(!recipients){
            mui.toast('请输入姓名');
            return;
        }
        if(!postCode){
            mui.toast('请输入邮编');
            return;
        }
        if(!address){
            mui.toast('请输入地址');
            return;
        }
        if(!addressDetail){
            mui.toast('请输入详细地址');
            return;
        }
        $.ajax({
            url:'/address/updateAddress',
            type:'post',
            data:{
                id:id,
                recipients:recipients,
                postcode:postCode,
                address:address,
                addressDetail:addressDetail
            },
            success:function(res){
                console.log(id);
                if(res.success){
                    mui.toast('修改地址成功');
                    setTimeout(function(){
                        location.href = 'address.html';
                    },2000)
                }
            }
        }) 
    })
})