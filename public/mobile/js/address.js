$(function(){
    var address;
    $.ajax({
        url:'/address/queryAddress',
        type:'get',
        success:function(res){
            console.log(res);
            address = res;
            var html = template('tpl',{result:res});
            $('#addressDetail').html(html);
        }
    });
    $('#addressDetail').on('tap','#delBtn',function(){
        var id = $(this).data('id');
        var li =$(this).parent().parent()[0];
        console.log(li);
        mui.confirm('确认删除吗？',function(message){
            console.log(message);
            if(message.index == 1) {
                $.ajax({
                    url:'/address/deleteAddress',
                    type:'post',
                    data:{id:id},
                    success:function(res){
                        if(res.success){
                            location.reload();
                        }
                    }
                })
            }else {
                mui.swipeoutClose(li);
            }
        })
    });
    $('#addressDetail').on('tap','#editBtn',function(){
        var id = $(this).data('id');
        $.each(address,function(index,value){
            console.log(value);
            if(value.id == id) {
                localStorage.setItem('editAddress',JSON.stringify(value));
                return false;
            }
        })
    })
})