$(function(){
    var page = 1;
    var pageSize = 7;
    var totalPge;
    function getData() {
        $.ajax({
            url:'/category/querySecondCategoryPaging',
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

    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            var html = template('tpl1',res);
            $('#categoryNameBox').html(html);
        }
    });
    var previewImg;
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) { 
            $('#preview').attr("src",data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    });
    $('.save').on('click',function(){
        var categoryId = $('[name="categoryId"]').val();
        var brandName = $('[name="brandName"]').val().trim();
        if(!categoryId || !brandName ||previewImg) {
            alert('不能为空');
            return;
        }
        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data:{
                brandName:brandName,
                categoryId:categoryId,
                brandLogo:previewImg,
                hot:0
            },
            success:function(res){
                if(res.success) {
                    location.reload();
                }
            }
        })
    })
})