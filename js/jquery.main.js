jQuery(document).ready(function(){
	initOpen();
	initAnim();
	$('.nav-overlay').click(function(){
		$('#nav').toggleClass('open');
		return false;
	});
	
	$('.gallery-slide').gallery({
		slideElement:1,
		flexible:true
    });
	$('.gallery-slide.two').gallery({
		slideElement:1,
		flexible:true,
		oneSlide:true
    });
	$('.gallery-comment').gallery({
		autoRotation: 7000,
		duration: 1000,
		slideElement:1,
		flexible:true,
		oneSlide:true
    });
	
	navMob();
	
	$('.tabs').tabs();
});

function initOpen() {
    $('.menu-holder').each(function () {
        var hold = $(this);
        var link = hold.find('.arrow-menu');
        var box = hold.find('.drop');
		var li = hold.find('.menu > li');
		var closeLink =  $('#nav .toogle-menu');
		var nav = $('#nav');
		
		closeLink.click(function(){
			
			if(!nav.hasClass('open')){
				nav.addClass('open');
			}
			else {
				nav.removeClass('open');
				box.removeAttr('style');
			}
			
			li.removeClass('open');
			
			return false;
		});
		
        link.click(function () {
            if (!$(this).parent().hasClass('open')) {
				box.css({display: 'none'});
				li.removeClass('open');
				
                $(this).parent().addClass('open');
                $(this).parent().find('.drop').css({display: 'block'});
            } else {
                $(this).parent().find('.drop').css({display: 'none'})
				$(this).parent().removeClass('open');
            }
            return false;
        });
		
		function all(){
			if(link.is(':visible')){
				box.each(function(){
					if(!$(this).parent().hasClass('open')){
						console.log(10);
						$(this).css({display: 'none'});
					}
				});
			}
			else {
				console.log(3);
				box.removeAttr('style');
				li.removeClass('open');
			}
		}
		
		all();
		
		$(window).resize(function(){
			all();
		})
    });
}

function initAnim () {
	var headTop = $(window).scrollTop();
	var last = $(window).scrollTop();
	var _scroll = function () {
		$('.anim-bottom, .anim-left, .anim-right, .anim-footer').not('.load').each(function(){
			if($(this).hasClass('anim-footer')){
				if($(this).offset().top - $(window).height() + 10 < $(window).scrollTop()){
					$(this).addClass('load');
				}
			}
			else{
				if($(this).offset().top - $(window).height() + 100 < $(window).scrollTop()){
					$(this).addClass('load');
				}
			}
		});
	}
	_scroll();
	$(window).bind('scroll', _scroll);
}
/**
 * jQuery gallery v2.3.6
 * Licensed under the MIT License:
 **/

;(function($){var _installDirections=function(data){data.holdWidth=data.list.parent().outerWidth();data.woh=data.elements.outerWidth(true);if(!data.direction)data.parentSize=data.holdWidth;else{data.woh=data.elements.outerHeight(true);data.parentSize=data.list.parent().height()}data.wrapHolderW=Math.ceil(data.parentSize/data.woh);if((data.wrapHolderW-1)*data.woh+data.woh/2>data.parentSize)data.wrapHolderW--;if(data.wrapHolderW==0)data.wrapHolderW=1},_dirAnimate=function(data){if(!data.direction)return{left:-(data.woh*
    data.active)};else return{top:-(data.woh*data.active)}},_initDisableBtn=function(data){data.prevBtn.removeClass(data.disableBtn);data.nextBtn.removeClass(data.disableBtn);if(data.active==0||data.count+1==data.wrapHolderW-1)data.prevBtn.addClass(data.disableBtn);if(data.active==0&&data.count+1==1||data.count+1<=data.wrapHolderW-1)data.nextBtn.addClass(data.disableBtn);if(data.active==data.rew)data.nextBtn.addClass(data.disableBtn)},_initEvent=function(data,btn,side){btn.bind(data.event+".gallery"+
    data.timeStamp,function(){if(data.flag){if(data.infinite)data.flag=false;if(data._t)clearTimeout(data._t);_toPrepare(data,side);if(data.autoRotation)_runTimer(data);if(typeof data.onChange=="function")data.onChange({data:data})}if(data.event=="click")return false})},_initEventSwitcher=function(data){data.switcher.bind(data.event+".gallery"+data.timeStamp,function(){if(data.flag&&!$(this).hasClass(data.activeClass)){if(data.infinite)data.flag=false;data.active=data.switcher.index(jQuery(this))*data.slideElement;
        if(data.infinite)data.active=data.switcher.index(jQuery(this))+data.count;if(data._t)clearTimeout(data._t);if(data.disableBtn)_initDisableBtn(data);if(!data.effect)_scrollElement(data);else _fadeElement(data);if(data.autoRotation)_runTimer(data);if(typeof data.onChange=="function")data.onChange({data:data})}if(data.event=="click")return false})},_toPrepare=function(data,side){if(!data.infinite){if(data.active==data.rew&&data.circle&&side)data.active=-data.slideElement;if(data.active==0&&data.circle&&
        !side)data.active=data.rew+data.slideElement;for(var i=0;i<data.slideElement;i++)if(side){if(data.active+1<=data.rew)data.active++}else if(data.active-1>=0)data.active--}else{if(data.active>=data.count+data.count&&side)data.active-=data.count;if(data.active<=data.count-1&&!side)data.active+=data.count;data.list.css(_dirAnimate(data));if(side)data.active+=data.slideElement;else data.active-=data.slideElement}if(data.disableBtn)_initDisableBtn(data);if(!data.effect)_scrollElement(data);else _fadeElement(data)},
    _fadeElement=function(data){data.list.removeClass(data.activeClass).css({zIndex:1});data.list.eq(data.last).stop().css({zIndex:2,opacity:1});if(data.effect=="transparent")data.list.eq(data.last).animate({opacity:0},{queue:false,duration:data.duration});data.list.eq(data.active).addClass(data.activeClass).css({opacity:0,zIndex:3}).animate({opacity:1},{queue:false,duration:data.duration,complete:function(){jQuery(this).css("opacity","auto")}});if(data.autoHeight)data.list.parent().animate({height:data.list.eq(data.active).outerHeight()},
        {queue:false,duration:data.duration});if(data.switcher)data.switcher.removeClass(data.activeClass).eq(data.active).addClass(data.activeClass);data.last=data.active},_scrollElement=function(data){data.elements.removeClass("active").eq(data.active).addClass(data.activeClass);if(!data.infinite)data.list.animate(_dirAnimate(data),{queue:false,duration:data.duration});else{data.list.animate(_dirAnimate(data),data.duration,function(){if(data.active>=data.count+data.count)data.active-=data.count;if(data.active<=
        data.count-1)data.active+=data.count;data.list.css(_dirAnimate(data));data.flag=true});data.elements.eq(data.active-data.count).addClass(data.activeClass);data.elements.eq(data.active+data.count).addClass(data.activeClass)}if(data.autoHeight)data.list.parent().animate({height:data.list.children().eq(data.active).outerHeight()},{queue:false,duration:data.duration});if(data.switcher)if(!data.infinite)data.switcher.removeClass(data.activeClass).eq(Math.ceil(data.active/data.slideElement)).addClass(data.activeClass);
    else{data.switcher.removeClass(data.activeClass).eq(data.active-data.count).addClass(data.activeClass);data.switcher.removeClass(data.activeClass).eq(data.active-data.count-data.count).addClass(data.activeClass);data.switcher.eq(data.active).addClass(data.activeClass)}},_runTimer=function(data){if(data._t)clearTimeout(data._t);data._t=setInterval(function(){if(data.infinite)data.flag=false;_toPrepare(data,true);if(typeof data.onChange=="function")data.onChange({data:data})},data.autoRotation)},_rePosition=
        function(data){if(data.flexible&&!data.direction){_installDirections(data);if(data.oneSlide)data.elements.css({width:data.holdWidth});else if(data.elements.length*data.minWidth>data.holdWidth){data.elements.css({width:Math.floor(data.holdWidth/Math.floor(data.holdWidth/data.minWidth))});if(data.elements.outerWidth(true)>Math.floor(data.holdWidth/Math.floor(data.holdWidth/data.minWidth)))data.elements.css({width:Math.floor(data.holdWidth/Math.floor(data.holdWidth/data.minWidth))-(data.elements.outerWidth(true)-
            Math.floor(data.holdWidth/Math.floor(data.holdWidth/data.minWidth)))})}else{data.active=0;data.elements.css({width:Math.floor(data.holdWidth/data.elements.length)})}}_installDirections(data);if(!data.effect){data.rew=data.count-data.wrapHolderW+1;if(data.active>data.rew&&!data.infinite)data.active=data.rew;if(data.active-data.count>data.rew&&data.infinite)data.active=data.rew;data.list.css({position:"relative"}).css(_dirAnimate(data));if(data.autoHeight)data.list.parent().css({height:data.list.children().eq(data.active).outerHeight()})}else{data.rew=
            data.count;data.list.css({opacity:0}).removeClass(data.activeClass).eq(data.active).addClass(data.activeClass).css({opacity:1}).css("opacity","auto");if(data.autoHeight)data.list.parent().css({height:data.list.eq(data.active).outerHeight()})}if(data.switcher)if(!data.infinite)data.switcher.removeClass(data.activeClass).eq(Math.ceil(data.active/data.slideElement)).addClass(data.activeClass);else{data.switcher.removeClass(data.activeClass).eq(data.active-data.count).addClass(data.activeClass);data.switcher.removeClass(data.activeClass).eq(data.active-
            data.count-data.count).addClass(data.activeClass);data.switcher.eq(data.active).addClass(data.activeClass)}if(data.disableBtn)_initDisableBtn(data);if(data.rew<=0&&!data.effect)data.list.css({left:0})},_initTouchEvent=function(data){var touchOnGallery=false;var startTouchPos,listPosNow,side,start;var span=data.list.parent().find("span.gallery-touch-holder");if(span.length==0){span=$("<span></span>");span.css({position:"absolute",left:0,top:0,width:9999,height:9999,cursor:"pointer",zIndex:9999,display:"none"}).addClass("gallery-touch-holder");
        data.list.parent().append(span)}data.list.parent().css({position:"relative"});data.list.bind("mousedown.gallery"+data.timeStamp+" touchstart.gallery"+data.timeStamp,function(e){touchOnGallery=true;startTouchPos=e.originalEvent.touches?e.originalEvent.touches[0].pageX:e.pageX;data.list.stop();start=0;listPosNow=data.list.position().left;if(e.type=="mousedown")e.preventDefault()});$(document).bind("mousemove.gallery"+data.timeStamp+" touchmove.gallery"+data.timeStamp,function(e){if(touchOnGallery&&
        Math.abs(startTouchPos-(e.originalEvent.touches?e.originalEvent.touches[0].pageX:e.pageX))>10){span.css({display:"block"});start=(e.originalEvent.touches?e.originalEvent.touches[0].pageX:e.pageX)-startTouchPos;if(!data.effect)data.list.css({left:listPosNow+start});return false}}).bind("mouseup.gallery"+data.timeStamp+" touchend.gallery"+data.timeStamp,function(e){if(touchOnGallery&&span.is(":visible")){span.css({display:"none"});if(!data.infinite)if(!data.effect)if(data.list.position().left>0){data.active=
        0;_scrollElement(data)}else if(data.list.position().left<-data.woh*data.rew){data.active=data.rew;_scrollElement(data)}else{data.active=Math.floor(data.list.position().left/-data.woh);if(start<0)data.active+=1;_scrollElement(data)}else{if(start<0)_toPrepare(data,true);if(start>0)_toPrepare(data,false)}else{if(data.list.position().left>-data.woh*data.count)data.list.css({left:data.list.position().left-data.woh*data.count});if(data.list.position().left<-data.woh*data.count*2)data.list.css({left:data.list.position().left+
    data.woh*data.count});data.active=Math.floor(data.list.position().left/-data.woh);if(start<0)data.active+=1;_scrollElement(data)}if(data.disableBtn)_initDisableBtn(data);if(typeof data.onChange=="function")data.onChange({data:data});if(data.autoRotation)_runTimer(data);touchOnGallery=false}else touchOnGallery=false})},methods={init:function(options){return this.each(function(i){var $this=$(this);$this.data("gallery",jQuery.extend({},defaults,options));var data=$this.data("gallery");data.aR=data.autoRotation;
        data.context=$this;data.timeStamp=(new Date).getTime()+i;data.list=data.context.find(data.elements);data.elements=data.list;if(data.elements.css("position")=="absolute"&&data.autoDetect&&!data.effect)data.effect=true;data.count=data.list.index(data.list.filter(":last"));if(!data.effect)data.list=data.list.parent();data.switcher=data.context.find(data.switcher);if(data.switcher.length==0)data.switcher=false;if(data.nextBtn)data.nextBtn=data.context.find(data.nextBtn);if(data.prevBtn)data.prevBtn=data.context.find(data.prevBtn);
        if(data.switcher)data.active=data.switcher.index(data.switcher.filter("."+data.activeClass+":eq(0)"));else data.active=data.elements.index(data.elements.filter("."+data.activeClass+":eq(0)"));if(data.active<0)data.active=0;data.last=data.active;if(data.oneSlide)data.flexible=true;if(data.flexible&&!data.direction)data.minWidth=data.elements.outerWidth(true);_rePosition(data);if(data.flexible&&!data.direction)$(window).bind("resize.gallery"+data.timeStamp,function(){_rePosition(data)});data.flag=true;
        if(data.infinite){data.count++;data.active+=data.count;data.list.append(data.elements.clone().addClass("gallery-clone"));data.list.append(data.elements.clone().addClass("gallery-clone"));data.list.css(_dirAnimate(data));data.elements=data.list.children()}if(data.rew<=0&&!data.effect)data.list.css({left:0});else{if(data.list.length<=1&&data.effect)return $this;if(data.nextBtn)_initEvent(data,data.nextBtn,true);if(data.prevBtn)_initEvent(data,data.prevBtn,false);if(data.switcher)_initEventSwitcher(data);
            if(data.autoRotation)_runTimer(data);if(data.touch)_initTouchEvent(data);if(typeof data.onChange=="function")data.onChange({data:data})}})},option:function(name,set){if(set)return this.each(function(){var data=$(this).data("gallery");if(data)data[name]=set});else{var ar=[];this.each(function(){var data=$(this).data("gallery");if(data)ar.push(data[name])});if(ar.length>1)return ar;else return ar[0]}},destroy:function(){return this.each(function(){var $this=$(this),data=$this.data("gallery");if(data){if(data._t)clearTimeout(data._t);
        data.context.find("*").unbind(".gallery"+data.timeStamp);$(window).unbind(".gallery"+data.timeStamp);$(document).unbind(".gallery"+data.timeStamp);data.elements.removeAttr("style");if(data.infinite)data.elements.filter(".gallery-clone").remove();data.list.removeAttr("style");$this.removeData("gallery")}})},rePosition:function(){return this.each(function(){var $this=$(this),data=$this.data("gallery");_rePosition(data)})},stop:function(){return this.each(function(){var $this=$(this),data=$this.data("gallery");
        data.aR=data.autoRotation;data.autoRotation=false;if(data._t)clearTimeout(data._t)})},play:function(time){return this.each(function(){var $this=$(this),data=$this.data("gallery");if(data._t)clearTimeout(data._t);data.autoRotation=time?time:data.aR;if(data.autoRotation)_runTimer(data)})},next:function(element){return this.each(function(){var $this=$(this),data=$this.data("gallery");if(element!="undefined"&&element>-1){data.active=element;if(data.disableBtn)_initDisableBtn(data);if(!data.effect)_scrollElement(data);
    else _fadeElement(data)}else if(data.flag){if(data.infinite)data.flag=false;if(data._t)clearTimeout(data._t);_toPrepare(data,true);if(data.autoRotation)_runTimer(data);if(typeof data.onChange=="function")data.onChange({data:data})}})},prev:function(){return this.each(function(){var $this=$(this),data=$this.data("gallery");if(data.flag){if(data.infinite)data.flag=false;if(data._t)clearTimeout(data._t);_toPrepare(data,false);if(data.autoRotation)_runTimer(data);if(typeof data.onChange=="function")data.onChange({data:data})}})}},
    defaults={infinite:false,activeClass:"active",duration:300,slideElement:1,autoRotation:false,effect:false,elements:"ul:eq(0) > li",switcher:".switcher > li",disableBtn:false,nextBtn:"a.link-next, a.btn-next, .next",prevBtn:"a.link-prev, a.btn-prev, .prev",circle:true,direction:false,event:"click",autoHeight:false,flexible:false,oneSlide:false,autoDetect:true,touch:true,onChange:null};$.fn.gallery=function(method){if(methods[method])return methods[method].apply(this,Array.prototype.slice.call(arguments,
    1));else if(typeof method==="object"||!method)return methods.init.apply(this,arguments);else $.error("Method "+method+" does not exist on jQuery.gallery")}})(jQuery);

 function navMob(){
	$('body').each(function(){
		var hold = $(this);
		var nav = hold.find('.menu');
		var li = hold.find('.menu li');
		var link = hold.find('.menu > li > a');
		var _time;
		var id , k;
		var oldTop = 0;
		var newTop = 0;
		var flag = true;
		var direction = 0;
		var hH = 630;
		
		link.click(function(){
			if ($(this).attr('href').length > 1 && $(this).attr('href') != undefined) {
				if ($(this).attr('href').substr(0, 1) == '#') {
					flag = false;
					if (!$(this).hasClass('mPS2id-highlight')) {
						$(this).addClass('mPS2id-highlight')
					}
					
					tmp = hold.find($(this).attr('href')).offset().top;
					
					if (tmp != '#') {
						$('html, body').animate({
							scrollTop: tmp
						}, {
							queue: false,
							duration: 1300,
							complete: function(){
								flag = true;
							}
						});
						li.removeClass('active').eq(link.index($(this))).addClass('active');
					}
					
					return false;
				}
			}
		});
		function activeBlock(flag){
			var all = $('.section');
			k = 0;
			direction = oldTop;
			oldTop = $(window).scrollTop();
			
			all.each(function(i){
				var _hold = $(this);
				if(_hold.offset().top - Math.round(_hold.outerWidth()/3) < $(window).scrollTop()){
					link.each(function(){
						var _L = $(this);
						if(_L.attr('href') != undefined && _L.attr('href').length > 1){
							if (_L.attr('href').substr(0, 1) == '#') {
								_L.removeClass('mPS2id-highlight');
								if(_L.attr('href').substr(1) == _hold.attr("id")){
									if(!_L.hasClass('mPS2id-highlight')){
										_L.addClass('mPS2id-highlight');
									}
								}
							}
						}
					});
				}
				if(_hold.offset().top + _hold.outerHeight() < $(window).scrollTop()){
					link.removeClass('mPS2id-highlight');
				}
			});
			
		}
		if(flag){
			activeBlock();
		}
		$(window).on('scroll resize', function() {
			if(_time) clearTimeout(_time);
			_time = setTimeout(function(){
				if(flag){
					activeBlock();
				}
			}, 300);
		})
	});
}

/**
 * jQuery tabs v1.1.0
 * Licensed under the MIT License:
 **/

;(function($){var _error=function(text){if(typeof console=="object")console.warn(text)},_setTab=function(data,tab){data.links.removeClass(data.activeTab).filter('[data-tab="'+tab+'"]').addClass(data.activeTab);data.boxes.removeClass(data.visibleClass+" "+data.hiddenClass).addClass(data.hiddenClass).filter(tab).addClass(data.visibleClass);if(data.steps){if(data.maxStep<data.steps.index(data.steps.filter("."+data.activeTab)))data.maxStep=data.steps.index(data.steps.filter("."+data.activeTab));data.steps.removeClass(data.disabledTab);
for(var i=data.maxStep+1;i<=data.steps.length;i++)data.steps.eq(i).addClass(data.disabledTab)}data.onChange();$(window).trigger("resize")},_initEvents=function(data){data.links.bind("click.tabs",function(){if(!$(this).hasClass(data.disabledTab))_setTab(data,$(this).data("tab"));return false})},methods={init:function(options){return this.each(function(){var $this=$(this);$this.data("tabs",jQuery.extend({},defaults,options));var data=$this.data("tabs");data.context=$this;data.links=$this.find("[data-tab]").not(".detected").addClass("detected");
data.boxes=$();if(data.steps){data.steps=$this.find(data.steps).eq(0).find("[data-tab]");data.maxStep=data.steps.index(data.steps.filter("."+data.activeTab))}data.links.each(function(){data.boxes=data.boxes.add($($(this).data("tab")))});_setTab(data,data.links.filter("."+data.activeTab).eq(0).data("tab"));_initEvents(data)})},setTab:function(tab){return this.each(function(){var $this=$(this),data=$this.data("tabs");if(data&&typeof tab=="string")_setTab(data,tab);else _error("Second param need to be String")})},
option:function(name,set){if(set)return this.each(function(){var data=$(this).data("tabs");if(data)data[name]=set});else{var ar=[];this.each(function(){var data=$(this).data("tabs");if(data)ar.push(data[name])});return ar.length>1?ar:ar[0]}},destroy:function(){return this.each(function(){var $this=$(this),data=$this.data("tabs");if(data){data.context.find("*").unbind(".tabs").removeClass(data.hiddenClass+" "+data.visibleClass);$(window).unbind(".tabs");$this.removeData("tabs")}})}},defaults={hiddenClass:"hidden",
visibleClass:"visible",activeTab:"active",disabledTab:"disabled",steps:false,onChange:function(){}};$.fn.tabs=function(method){if(methods[method])return methods[method].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof method==="object"||!method)return methods.init.apply(this,arguments);else _error("Method "+method+" does not exist on jQuery.tabs")}})(jQuery);