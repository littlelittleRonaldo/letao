$(function(){
    function getParamsByUrl(url,name) {
        var params = url.substr(url.indexOf('?')+1).split('&');
        for(var i=0; i<params.length;i++){
            var param = params[i].split('=');
            if (param[0] == name) {
                return param[1];
            }
        }
        return null;
    }
    var keyword = getParamsByUrl(location.href,'keyword');
    var html = '';
    var page = 1;
    function getData() {
        var This = this;
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:{
                porname:keyword,
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
          container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });
})