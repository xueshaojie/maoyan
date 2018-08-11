// //在当前的function中，区分jQuery中的$和自己封装的$函数
// jQuery(function($){
//     /*页面刷新之后查看sesstionStorage是否有内容，不考虑登录之后退出再重新注册的情况！有就是新注册的用户的id值同时查找用户*/
//     $(document).ready(function(){
//         if(window.sessionStorage.length!=0){//长度不等于0说明有是新用户注册跳转回主页
//             //console.log(window.sessionStorage);
//             var index=window.sessionStorage.length;
//             var max=0;
//             if(window.sessionStorage.length>1){
//                 for(var i=0;i<index;i++){
//                     console.log(i);
//                     var k=parseInt(window.sessionStorage.key(i));
//                     if(max<=k){
//                         max=k;
//                     }
//                 }
//             }else{
//                 max=0;
//             }
//             console.log(max);
//             //var key = window.sessionStorage.key(max);//sessionStorage中的存储是按照value的首字母排列的所以要取key值最大值
//             var k;
//             if(max!=0){
//                 key=max;
//             }else if(max==0){
//                 key=window.sessionStorage.key(max);
//             }
//             var value =window.sessionStorage.getItem(key);
//             var requestData={"user_name":value};
//             console.log(requestData);
//             $.post('data/select_user.php',requestData,function(response){
//                 console.log('开始处理响应数据......');
//                 //判断是注册成功
//                 if(response.code==0){
//                     alert('注册失败！请重新注册');
//                 }else{//success
//                     $('#username_span').html(response.user_name);//显示欢迎信息
//                 }
//             },'json');
//
//
//         }
//     });
//     /*注册成功跳转回主页和登录成功之后实现鼠标移到用户名位置处显示下拉框*/
//     $('#u_name').on('mouseover',function(){
//         if(window.sessionStorage.length!=0){
//             $('#my_ul').removeClass('hide');
//             $('#u_name').on('mouseover',function(){
//                 $(this).addClass('hover');
//             });
//         }
//     });
//     $('#u_name').on('mouseout',function(){
//         $('#my_ul').addClass('hide');
//         $(this).removeClass('hover');
//     });
//     $('#my_ul').on('mouseover',function(){
//         $('#u_name').addClass('hover');
//     });
//     /***用户登录之后点击退出选项实现页面的更新***/
//     $('#quit_btn').click(function(event){
//         event.preventDefault();
//         //console.log(this);
//         $('#username_span').html("<a href='#'' id='myLoginBtn123'>登录</a>|<a href='regist.html' target='_self' id='btn_register'>注册</a>");
//         sessionStorage.clear();
//         $('#u_name').unbind('mouseover');
//         $('#my_ul').addClass('hide');
//     });
//
//
//     /*实现城市选择框*/
// //先实现tabs的样式切换
//     $(".tabs").on('click','a',function(e){
//         e.preventDefault();
//         $(this).parent().addClass('current').siblings().removeClass('current');
//         //实现点击tabs上的某个选项显示对应的装城市的div
//         //console.log($(this).attr('href'));
//         $($(this).attr('href')).addClass('show').siblings().removeClass('show');
//     });
//
//     /**顶部的选择城市，弹出div.cities**/
//     $("#chooseCity").on("click","b",function(){
//         if($("#chooseCity>div.cities").hasClass("hide")){
//             $("#chooseCity>div.cities").removeClass("hide");
//             $("#chooseCity>b>i").addClass("up");
//         }else{
//             $("#chooseCity>div.cities").addClass("hide");
//             $("#chooseCity>b>i").removeClass("up");
//         }
//     });
//     /*关闭的span*/
//     $("div.cities>span").on("click",function(){
//         $("#chooseCity>div.cities").addClass("hide");
//     });
//     /*鼠标移到城市上，对应首字母添加.hover的class*/
//     $('.cities dd a').mouseover(function(){
//         $(this).parents('dd').siblings('dt').children('span').addClass('hover');
//     });
//     $('.cities dd a').mouseout(function(){
//         $(this).parents('dd').siblings('dt').children('span').removeClass('hover');
//     });
//     /*实现头部的城市名在弹出框中对应的城市名li添加被选中的class属性*/
//     (function(){
//         var chooseCity=$('#chooseCity>b').text();
//         var hotCL=$('#hotCity li>a');
//         for(var i=0;i<hotCL.length;i++){
//             if(hotCL[i].innerText==chooseCity){
//                 //console.log(chooseCity);
//                 $(hotCL[i]).addClass('hover');
//                 break;
//             }
//         }
//         var otherCL=$('#chooseCity dd li>a');
//         for(var j=0;j<otherCL.length;j++){
//             if(otherCL[j].innerText==chooseCity){
//                 $(otherCL[j]).addClass('hover');
//                 break;
//             }
//         }
//     })();
//
//     /*实现当点击某一城市之后头部的城市名被换掉*/
//     $('#hotCity').on('click','a',function(e){
//         e.preventDefault();
//         //console.log(this);
//         $('#chooseCity>b').html($(this).html()+"<i class='up'></i>");
//         var hotCL=$('#hotCity li>a');
//         for(var i=0;i<hotCL.length;i++){
//             if($(hotCL[i]).hasClass('hover')){
//                 $(hotCL[i]).removeClass('hover');
//                 break;
//             }
//         }
//         $(this).addClass('hover');
//         var otherCL=$('#chooseCity dd li>a');
//         for(var j=0;j<otherCL.length;j++){
//             if($(otherCL[j]).hasClass('hover')){
//                 $(otherCL[j]).removeClass('hover');
//             }else if(otherCL[j].innerText==$(this).html()){
//                 $(otherCL[j]).addClass('hover');
//             }
//         }
//     });
//     $('#chooseCity').on('click','dd a',function(e){
//         e.preventDefault();
//         $('#chooseCity>b').html($(this).html()+"<i class='up'></i>");
//         var otherCL=$('#chooseCity dd li>a');
//         for(var j=0;j<otherCL.length;j++){
//             if($(otherCL[j]).hasClass('hover')){
//                 $(otherCL[j]).removeClass('hover');
//                 break;
//             }
//         }
//         $(this).addClass('hover');
//         var hotCL=$('#hotCity li>a');
//         for(var i=0;i<hotCL.length;i++){
//             if($(hotCL[i]).hasClass('hover')){
//                 $(hotCL[i]).removeClass('hover');
//             }else if(hotCL[i].innerText==$(this).html()){
//                 $(hotCL[i]).addClass('hover');
//             }
//         }
//     });
//
//
//
//     /*社区选项*/
//     $('#community>li').mouseover(function(){$(this).addClass('hover');$(this).children().addClass('hover');});
//     $('#community>li').mouseout(function(){$(this).removeClass('hover');$(this).children().removeClass('hover');});
//     $('.community').mouseover(function(){
//         $(this).children('#community')[0].style.display="block";
//         //console.log($(this).children('#community'))
//     });
//     $('.community').mouseout(function(){$(this).children('#community').css("display","none")});
//
//
//
//     /************************中间主要内容******************************/
//     /****左侧的窄条部分的逻辑代码****/
//     $('.left_nav_ul').on('click','a',function(){
//         if($(this).parent().hasClass('select')==false){
//             $(this).parent().addClass('select').siblings().removeClass('select');
//         }
//     });
//     /**正在热映的右侧tabs的js逻辑**/
//     $('.ui_right ul').on('mouseover','li',function(){
//         console.log(this);
//         if(!$(this).hasClass('active')){
//             $(this).addClass('active').siblings().removeClass('active');
//             $($(this).children('a').attr('href')).addClass('d-active').siblings().removeClass('d-active');
//         }
//     });
//     /****正在热映的左右移动条的逻辑****/
//     var movieList={
//         LIWIDTH:0,//每个li的宽度
//         COUNT:0,//总的li个数
//         moved:0,//左移li个数
//         OFFSET:0,//ul的起始left，起始是0，list显示最左边的信息
//         init:function(){
//             this.LIWIDTH=parseInt($('#menu_box_movie_inner>li:first-child').css('width'))+16;
//             this.COUNT=$('#menu_box_movie_inner>li').length;
//             this.OFFSET=parseFloat($('#menu_box_movie_inner').css('left'));
//             $('div.event_left').on('click',this.move.bind(this));
//             $('div.event_right').on('click',this.move.bind(this));
//
//         },
//         move:function(event){
//             var target=event.target;//左右移动的图标div
//             console.log(target);
//             if(!$(target).hasClass('disable')){
//                 if($(target).parent().hasClass('event_left')){
//                     this.moved-=1;
//                     console.log(this.moved);
//                 }else if($(target).parent().hasClass('event_right')){
//                     this.moved+=1;
//                     console.log(this.moved);
//                 }
//                 $("#menu_box_movie_inner").css("left",-this.moved*this.LIWIDTH+this.OFFSET+"px");
//                 //检查div元素状态，到没到头，到头了就不能动了
//                 this.checkDIV();
//             }
//         },
//         checkDIV:function(){//检查div元素状态，到没到头，到头了就不能动了
//             if(this.moved==0){
//                 $('.event_left').children('b').addClass('disable');
//             }else if(this.COUNT-this.moved==4){
//                 $('.event_right').children('b').addClass('disable');
//             }else{
//                 $('.event_left').children('b').removeClass('disable');
//                 $('.event_right').children('b').removeClass('disable');
//             }
//         }
//     }
//     movieList.init();
//
//     /****特效部分右侧的周热映和周新片****/
//     $('.weekList .nav_tabs').on('mouseover','a',function(){
//         if(!$(this).hasClass('select')){
//             $(this).addClass('select').parent('li').siblings('li').children('a').removeClass('select');
//             if(this.id=="week_hotShow"){
//                 $('#hotShow_content').removeClass('none').siblings().addClass('none');
//             }else if(this.id=="week_newShow"){
//                 $('#newShow_content').removeClass('none').siblings().addClass('none');
//             }
//         }
//     })
//     $('#hotShow_content').on('mouseover','li',function(){
//         if(!$(this).hasClass('select')){
//             $(this).addClass('select').siblings('li').removeClass('select');
//         }
//     });
//     $('#newShow_content').on('mouseover','li',function(){
//         if(!$(this).hasClass('select')){
//             $(this).addClass('select').siblings('li').removeClass('select');
//         }
//     });
//     /**特效硬挺部分左右移动**/
//     /*var movieList={
//         LIWIDTH:0,//每个li的宽度
//         COUNT:0,//总的li个数
//         moved:0,//左移li个数
//         OFFSET:0,//ul的起始left，起始是0，list显示最左边的信息
//         init:function(){
//             this.LIWIDTH=parseInt($('#menu_box_movie_inner>li:first-child').css('width'))+16;
//             this.COUNT=$('#menu_box_movie_inner>li').length;
//             this.OFFSET=parseFloat($('#menu_box_movie_inner').css('left'));
//             $('div.event_left').on('click',this.move.bind(this));
//             $('div.event_right').on('click',this.move.bind(this));
//
//         },
//         move:function(event){
//             var target=event.target;//左右移动的图标div
//             console.log(target);
//             if(!$(target).hasClass('disable')){
//                 if($(target).parent().hasClass('event_left')){
//                     this.moved-=1;
//                     console.log(this.moved);
//                 }else if($(target).parent().hasClass('event_right')){
//                     this.moved+=1;
//                     console.log(this.moved);
//                 }
//                 $("#menu_box_movie_inner").css("left",-this.moved*this.LIWIDTH+this.OFFSET+"px");
//                 //检查div元素状态，到没到头，到头了就不能动了
//                 this.checkDIV();
//             }
//         },
//         checkDIV:function(){//检查div元素状态，到没到头，到头了就不能动了
//             if(this.moved==0){
//                 $('.event_left').children('b').addClass('disable');
//             }else if(this.COUNT-this.moved==4){
//                 $('.event_right').children('b').addClass('disable');
//             }else{
//                 $('.event_left').children('b').removeClass('disable');
//                 $('.event_right').children('b').removeClass('disable');
//             }
//         }
//     }
//     movieList.init();*/
//
//     /**评论部分逻辑**/
//     $('.comWala .nav_tabs').on('click','a',function(event){
//         event.preventDefault();
//         $(this).parent('li').addClass('select').siblings('li').removeClass('select');
//         var pId=this.parentElement.id;
//         $('#'+pId+'_content').removeClass('hide').siblings().addClass('hide');
//
//     });
//     /*左侧窄条鼠标滑动逻辑*/
//     $(document).scroll(function(){
//         var elemTop=getElemTop(main_index);
//         var elemBottom=getElemTop(bottomElem);
//         var left_boxH=parseFloat($('#left_box').css('height'));
//         var heightVal=elemBottom-left_boxH;
//         var scrollTop=document.body.scrollTop;
//         if(scrollTop>0&&scrollTop<heightVal){
//             left_box.className='atScroll';
//         }else if(scrollTop>=heightVal){
//             left_box.className='atBottom';
//         }else if(scrollTop<=0){
//             left_box.className='atTop';
//         }
//         console.log(scrollTop);
//     });
//
//
//
//
//
//     /*测试用*/
//     function getElemTop(elem){
//         var sum=0;
//         //循环：只要elem的offsetParent不是null
//         //获得elem的offsetTop累加到sum中
//         //将elem改为其offsetParent 将elem改为它的相对定位的父元素
//         while(elem.offsetParent!=null){
//             sum+=elem.offsetTop;
//             elem=elem.offsetParent;
//         }
//         return sum;//执行完sum就是相对于最顶部body的绝对距离
//     }
//
// });
//
//
//
//
//
