$(function(){
    $.ajax({
        url:'/user/queryUser',
        type:'get',
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            console.log(res);
            var html = template('tpl',res)
            $('tbody').html(html);
        }
    });
    $('tbody').on('click','#isDelete',function(){
        var id = $(this).data('id');
        var isDelete = $(this).data('isdelete');
        console.log(isDelete,id);
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:id,
                isDelete:isDelete?0:1
            },
            success:function(res){
                if(res.success){
                    location.reload();
                }
            }
        })
    })
})