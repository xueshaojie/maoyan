/*封装$ 用来实现对任一个元素的查找*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
//封装一个bind函数实现对元素的事件绑定，绑定的事件函数有三个参数：事件名,函数名,是否在捕获阶段提前触发
HTMLElement.prototype.bind=document.bind=
    function(eName,fn,capture){//this->指HTMLElement
        this.addEventListener(eName,fn,capture);
    }
//封装一个css函数用来替代getComputedStyle取到style属性值 和elemtn.style.属性名对style属性的设置
HTMLElement.prototype.css=function(prop,value){//this指当前元素
    if(value==undefined){var style=getComputedStyle(this);return style[prop];}
    else{this.style[prop]=value;}
}


/*广告图片数组*/
var imgs=[
    {"i":0,"src":"../img/c1a713981cabef02c88ae5f42888de70183835.jpg"},
    {"i":1,"src":"../img/c1a713981cabef02c88ae5f42888de70183835.jpg"},
    {"i":2,"src":"../img/c1a713981cabef02c88ae5f42888de70183835.jpg"},
    {"i":3,"src":"../img/c1a713981cabef02c88ae5f42888de70183835.jpg"}
];
/*实现广告轮播 动态添加li*/
var adv={
    LIWIDTH:0,//保存每个li的宽度
    DISTANCE:0,//总距离
    DURATION:0,//总时间
    STEPS:200,//总步数 总步数越大走的越慢！常设为200
    interval:0,//步频  步频是总时间/总步数=走一步的时间
    step:0,//步长
    timer:null,//保存定时器序号
    moved:0,//保存本次动画已经移动的步数
    WAIT:3000,//自动轮播等待时间
    canAuto:true,//标识能否启动自动轮播，当鼠标进入id为slider的div内就不自动轮播(false)，出来就自动轮播
    init:function(){//init是用来初始化的
        //获得id为slider的宽，转为浮点数保存在LIWIDTH中 slider是装轮播图片的外层大div
        this.LIWIDTH=parseFloat($("#slider").css("width"));
        this.updateView();//根据数组更新页面
        //计算interval：DURATION/STEPS  interval是走一步所需要的时间
        this.interval=this.DURATION/this.STEPS;
        //为id为idxs的ul绑定鼠标进入事件
        $("#idxs").bind("mouseover",
            function(e){
                //获得target
                //如果target是li且target的class不是hover
                //找到id为idxs下的class为hover的li，获取其内容保存在start中
                //获得target的内容，保存在end中
                //调用this.move(end-start);
                var target=e.target;
                if(target.nodeName=="LI"&&target.className!="hover"){
                    // 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
                    var start=$("#idxs>.hover").innerHTML;//start是之前点的是第几个
                    var end=target.innerHTML;//将当前点到的第几个数保存 计算移动li的个数
                    this.move(end-start);//根据end-start值调用move函数进行左右移动
                }
            }.bind(this));//提前绑定this，里面的任务函数要调用adv的move方法，所以要提前绑定this
        //调用自动启动自动轮播
        this.autoMove();

        //为id为slider的div绑定鼠标移入事件  鼠标进入广告图之后就不再自动轮播了，canAuto是表示能否自动轮播
        //将canAuto改为false
        //为id为slider的div绑定鼠标移出事件
        //将canAuto改为true
        $("#slider").bind("mouseover",function(){this.canAuto=false;}.bind(this));
        $("#slider").bind("mouseout",function(){this.canAuto=true;}.bind(this));

    },
    autoMove:function(){
        //启动一次性定时器，将序号保存在timer
        //任务move，提前绑定this，和n为1
        //等待时间WAIT
        this.timer=setTimeout(function(){
            //如果可以自动轮播
            //就借用move方法
            if(this.canAuto==true){this.move(1);}
            //否则
            //再次调用autoMove
            else{this.autoMove();}
        }.bind(this),this.WAIT);//这里bind里不但绑定了this还可以传参数
    },
    move:function(n){//move方法用来启动动画  如果n>0,则n表示左移的li的个数 如果n<0,则是右移
        //防止动画叠加:只要启动了move就将之前的定时器给清掉，timer置null
        clearInterval(this.timer);
        this.timer=null;
        //只要动画停止就设置id为imgs的ul的left归0
        $("#imgs").css("left","");

        //根据左移li的个数计算DISTANCE：LIWIDTH*n
        //计算步长step：DISTANCE/STEPS
        this.DISTANCE=this.LIWIDTH*n;
        this.step=this.DISTANCE/this.STEPS;//step是步长
        if(n<0){//如果是右移(n是负数) 3——》1  1-3=-2
            //删除数组结尾的n个元素，再拼上imgs剩余元素，结果保存回imgs中
            //更新界面
            //修改id为imgs的ul的left为n*LIWIDTH
            //启动周期性定时器，将序号保存在timer中：
            //任务为：this.moveStep-这里要提前用bind绑定this，因为定时器默认this是window
            //时间间隔为：interval
            //imgs=imgs.splice(imgs.length-n,n).concat(imgs); 删除从imgs.length-(-n)到-n的元素，再拼到imgs前面
            imgs=imgs.splice(imgs.length-(-n),-n).concat(imgs);
            this.updateView();
            $("#imgs").css("left",n*this.LIWIDTH+"px");
            this.timer=setInterval(this.moveStep.bind(this),this.interval);//任务为：this.moveStep-这里要提前用bind绑定this，因为定时器默认this是window
        }else{//否则
            //如果是左移
            //启动周期性定时器，将序号保存在timer中：
            //任务为：this.moveStep-这里要提前用bind绑定this，因为定时器默认this是window
            //时间间隔为：interval
            this.timer=setInterval(this.moveStep.bind(this,function(){//bind不但可以绑定this还可以绑定参数/函数
                //删除imgs开头的n个元素，再拼回数组imgs结尾，将结果保存回imgs中
                //更新界面this.updateView(这里this指window所有要绑定this)
                //设置id为imgs的ul的left为“”
                imgs=imgs.concat(imgs.splice(0,n));//删除imgs开头的n个元素，再拼回数组imgs结尾，将结果保存回imgs中
                this.updateView();
                $("#imgs").css("left","");
            }.bind(this)),this.interval);
        }
    },
    moveStep:function(callback){//moveStep方法用来移动一步
        //callback:接收一个函数，等到动画结束之后才执行
        //获取id为imgs的ul的left转为浮点数，再减去step，再修改回id为imgs的ul的left
        //moved+1    moved是保存本次动画已经移动的步数
        //如果moved等于STEPS
        //停止定时器
        //timer置为空
        //moved置为0
        $("#imgs").css("left",parseFloat($("#imgs").css("left"))-this.step+"px");
        this.moved++;
        if(this.moved==this.STEPS){
            clearInterval(this.timer);
            this.timer=null;
            this.moved=0;
            //callback:接收一个函数，等到动画结束之后才执行
            //如果callback不是undefined就执行
            callback&&callback();//callback!=undefined时执行callback()函数

            //只要动画停止就设置id为imgs的ul的left归0
            $("#imgs").css("left","");
            //只要动画结束后启动自动轮播
            this.autoMove();
        }
    },
    updateView:function(){//这个方法是用来根据数组更新页面
        //清除id为imgs的ul的内容
        //清除id为idxs的ul的内容
        $("#imgs").innerHTML="";
        $("#idxs").innerHTML="";
        //创建文档片段fragImgs
        //创建文档片段fragIdxs
        //遍历上面的imgs数组中每个img
        //创建一个li
        //新建img
        //设置img的src为当前元素的src属性
        //将img追加到li下
        //将li追加到fragImgs下
        //创建li
        //如果i等于imgs中第0个元素的i属性
        //设置li的class为hover  (index.css49行)
        //设置其内容为i+1
        //将li追加到fragIdxs下
        //将fragImgs追加到id为imgs的ul下
        //将fragIdxs追加到id为idxs的ul下
        //设置id为imgs的ul宽为imgs的元素个数*LIWIDTH
        var fragImgs=document.createDocumentFragment();
        var fragIdxs=document.createDocumentFragment();
        for(var i=0;i<imgs.length;i++){
            var li=document.createElement("li");
            //var img=document.createElement("img");
            var img=new Image();//创建img
            img.src=imgs[i].src;
            li.appendChild(img);
            fragImgs.appendChild(li);
            li=document.createElement("li");
            if(i==imgs[0].i){
                li.className="hover";
            }
            li.innerHTML=i+1;
            fragIdxs.appendChild(li);
        }
        $("#imgs").appendChild(fragImgs);
        $("#idxs").appendChild(fragIdxs);
        $("#imgs").css("width",imgs.length*this.LIWIDTH+"px");
    }
}
adv.init();//先将该广告轮播效果暂停

//1.如果是左移：先移动，再改数组，更新界面 1-》3 左移
//2.如果是右移：先改数组，更新界面，再移动 3-》1 右移


/*<div class="mask"></div>
*
* */











