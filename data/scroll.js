var ScrollImpl={
    init:function(){
        this.direction = "down";
        this.initMover();
        this.addClickHandle();
        this.addKeyShortCut();
        this.addDirection();
        this.addMoveSupport();
    },
    initMover:function(){
        var node = document.getElementById("ndon_widget_to_topo_area");
        if(!node) {
            node = document.createElement("span");
            node.id="ndon_widget_to_topo_area";
            node.className="ndon_widget_to_top_area_class";
            this.prependChild(document.body, node);
        }

        this.node = node;
    },
    addMoveSupport: function(){
        var self = this;

        this.node.addEventListener("mousedown", function (event) {
            document.documentElement.classList.add("ndon_noselect");
            self.isdown = true;

            var rect=self.node.getBoundingClientRect();
            self.downPosition={
                left: event.clientX - rect.left,
                top: event.clientY - rect.top
            }
        });
        document.addEventListener("mousemove", function (event) {
            if(self.isdown){
                self.ismoving=true;
                self.node.style.left = event.clientX - self.downPosition.left + "px";
                self.node.style.top = event.clientY - self.downPosition.top + "px";
            }
        });
        document.addEventListener("mouseup", function () {
            self.isdown=false;
            document.documentElement.classList.remove("ndon_noselect");
            setTimeout(function () {
                self.ismoving = false;
            }, 0);
        });
    },
    addClickHandle:function(){
        var self =this;
        this.node.addEventListener("click",function(){
            ScrollImpl.onclick.apply(self,arguments);
        });
    },
    addDirection:function(){
        var lastTop = window.pageYOffset;
        var self =this;
        window.addEventListener("scroll",function(){
            var newTop = window.pageYOffset;
            if(newTop>lastTop){
                self.turnToDown();
            }
            else if(newTop < lastTop){
                self.turnToUp();
            }
            lastTop = newTop;
            self.needToRotate(this.node)
        });
    },
    needToRotate:function(){
        var windowHeight = document.documentElement.clientHeight;
        var windowTop = window.pageYOffset;
        var documentHeight = document.documentElement.scrollHeight;
        var offset =  (windowHeight+windowTop) - documentHeight;

        if(offset>=-3){
            this.turnToUp();
        }
        if(windowTop<=3){
            this.turnToDown();
        }
    },
    turnToUp: function () {
        this.node.style.transform="";
        this.direction = "up";
    },
    turnToDown: function () {
        this.node.style.transform = "rotate(180deg)";
        this.direction = "down";
    },
    addKeyShortCut:function(){
        var altKeyPressed = false;
        window.addEventListener("keydown",function(e)
        {
            if(e.keyCode == 18){
                altKeyPressed = true;
            }
            //scroll to top
            if(e.keyCode ==38 && altKeyPressed){
                ScrollImpl.toTop();
            }
            //scroll to bottom
            if(e.keyCode == 40 && altKeyPressed){
                ScrollImpl.toBottom();
            }
        });
        window.addEventListener("keyup",function(e)
        {
            if(e.keyCode == 18){
                altKeyPressed = false;
            }
        });
    },
    prependChild:function(parent,child){
        if(parent){
            if(parent.hasChildNodes()){
                parent.insertBefore(child, parent.children[0]);
            }else{
                parent.appendChild(child);
            }
        }
    },
    onclick:function(){
        if(!this.ismoving){
            if(this.direction=="down"){
                this.toBottom();
            }else{
                this.toTop();
            }
            this.ismoving=false;
        }

    },
    toTop:function(){
        window.scrollTo(0, 0);
    },
    toBottom:function(){
        window.scrollTo(0, document.documentElement.scrollHeight);
    }
};
ScrollImpl.init();