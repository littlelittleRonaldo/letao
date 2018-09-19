$(function(){
    var page = 1;
    var pageSize = 7;
    var totalPge;
    function getData() {
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res){
                console.log(res);
                var html = template('tpl',res);
                $('tbody').html(html);
                totalPge = Math.ceil(res.total / pageSize);
            }
        });
    }
    getData();
    $('.last').on('click',function(){
        if(page>1){
            page--;
            getData();
        }
    });
    $('.next').on('click',function(){
        if(page<totalPge){
            page++;
            getData();
        }
    });
    $('.save').on('click',function(){
        var categoryName = $('[name="categoryName"]').val().trim();
        if(!categoryName){
            alert('请输入分类名称');
        }
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:{categoryName:categoryName},
            success:function(res){
                if(res.success){
                    location.reload();
                }
            }
        })
    });
})