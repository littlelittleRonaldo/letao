$(function(){
    var keyArr = [];
    $('.search-btn').on('tap',function(){
        var keyword = $(this).siblings('input').val();
        if(keyword.trim()){
            keyArr.unshift(keyword);
            localStorage.setItem('keyArr',JSON.stringify(keyArr));
            location.href = "search-result.html?keyword="+keyword;
        }else {
            alert("不能搜索空！");
        }
    });
    if(localStorage.getItem('keyArr')){
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        var html = template('tp',{keyArr:keyArr});
        $('.mui-table-view').html(html);
    }
    $('.clear').on('tap',function(){
        $('.mui-table-view').html('');
        localStorage.removeItem('keyArr');
        keyArr = [];
    })
    $('.mui-table-view').on('tap','li',function(){
        var keyword = $(this).children().eq(0).text();
        location.href = "search-result.html?keyword="+keyword;
    })
})