$(function(){
    var html = '';
    var page = 1;
    var priceSort = 1;
    var numSort = 1;
    var This;
    var p = 1;
    var n = 1;
    var keyword = getParamsByUrl(location.href,'keyword');
    function getData() {
        if(!This){
            This = this;
        }
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:{
                porname:keyword,
                price:priceSort,
                num:numSort,
                page:page++,
                pageSize:3
            },
            success:function(res){
                if(res.data.length>0){
                    html += template('tpl',res);
                    $('.product ul').html(html);
                    This.endPullupToRefresh(false);
                }else {
                    This.endPullupToRefresh(true);
                }
                
            }
        });
    }   
    mui.init({
        pullRefresh : {
          container:refreshContainer,//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
    });
    $('#price').on('click',function(){
        priceSort = priceSort == 1 ?2 :1; 
        html = '';
        page = 1;
        getData();
        mui('#refreshContainer').pullRefresh().refresh(true);
        // $(this).children('i').toggleClass('mui-icon mui-icon-arrowup').toggleClass('mui-icon mui-icon-arrowdown');
        $(this).children('i').css('transform','rotate('+p*180+'deg)');
        p = p == 1 ?0 :1;
        // p++;
        mui('#refreshContainer').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
    });
    $('#num').on('tap',function(){
        numSort = numSort == 1 ?2 :1;
        html = '';
        page = 1;
        getData();
        mui('#refreshContainer').pullRefresh().refresh(true);
        // $(this).children('i').toggleClass('mui-icon mui-icon-arrowup').toggleClass('mui-icon mui-icon-arrowdown');
        $(this).children('i').css('transform','rotate('+n*180+'deg)');
        n++;
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
    });
})