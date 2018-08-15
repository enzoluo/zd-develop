var Utils = Utils || {};

/**
 * 服务器基础路径
 */
Utils.baseUrl = "http://192.168.118.95:8080/";

Utils.uploadFileUrl = "https://filetest.qiyesq.com:8080/fileserver/upload?isScaleImge=true";

/**
 * 时间转换成yyy-mm-dd HH:mm:ss
 */
Utils.formDate = function (params) {
	str = params.replace(/ GMT.+$/, '');// Or str = str.substring(0, 24)
	var d = new Date(str);
	var a = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
	for(var i = 0, len = a.length; i < len; i ++) {
		if(a[i] < 10) {
			a[i] = '0' + a[i];
		}
	}
	str = a[0] + '-' + a[1] + '-' + a[2] + ' ' + a[3] + ':' + a[4] + ':' + a[5];
	return str;
};
/**
 * 在URL中查找所需的变量名的值
 */
Utils.getValueInPathByName = function(name){
	var href = window.location.href;
	var hs = href.split("?");
	if(hs.length>1){
		var needStr = hs[1];
		var ns = needStr.split("&");
		for(var i=0;i<ns.length;i++){
			var n = ns[i];
			var t = n.split("=");
			
			if(t.length>1){
				if(name==t[0]){
					return t[1];
				}
			}
		}
	}
};

/**
 * 改变指定URL参数的值
 * @param name 参数名
 * @param value 参数值
 */
Utils.setValueInPathByName = function(name,value) {
	var oUrl = window.location.href.toString();
	var nUrl = "";
	if(oUrl.indexOf(name)>0){
		var re=eval('/('+ name+'=)([^&]*)/gi');
		nUrl = oUrl.replace(re,name+'='+value);
	}else{
		var param = name + "=" + value;
		nUrl = oUrl + (oUrl.indexOf("?")>0? "&"+param:"?"+param);
	}
	window.location = nUrl;
};

/**
 * 按enter触发事件
 */
Utils.enterKey = 13;
Utils.triggerEventByEnterKey = function(){
	$("[enter-trigger]").bind("keyup",function(e){
		var key = e.keyCode;
		var that = this;
		if(key == Utils.enterKey){
			var t = $($(that).attr("trigger-btn"));
			t.removeAttr("hasClicked");
			t.click();
		}
	});
};

/**
 * 异步加载数据
 * @param url:加载数据的地址，
 * @param data:传到服务器端的数据
 * @param callback:访问服务器成功后的回调函数
 * @param errorCallback:访问服务器失败后的回调函数，
 * @param async:false,是否是同步加载，true为异步，FALSE为同步
 */
Utils.ajaxLoadData = function(types,url,data,token,callback,errorCallback,async,dataType){
	async = typeof(async)!="undefined" ? async : true;
	dataType = dataType || "json";
	types = types ? types : "post";
	token = token ? token : "";
	$.ajax({
		url:url,
		data:data,
		dataType:dataType,
		type:types,
		//contentType:contentType,
		beforeSend: function(request) {
			 request.setRequestHeader("Authorization", token);
        },
		success:function(result){
			result = result || "";
			if(callback){
				callback(result);
			}
		},
		async:async,
		error:function(errorMsg){
			var msg = "链接服务器失败";
			if(errorMsg.responseText){
				if(typeof(errorMsg.responseText)=="string"){
					try{
						msg = eval('('+errorMsg.responseText+')');
						msg = msg.errormsg;
					}catch(e){
						
					}
					
				}else{
					msg = errorMsg.responseText.errormsg;
				}
			}
			if(errorCallback){
				errorCallback(msg);
			}
		}
	});
};

/**
 * 判断对象是否存在空值 true为存在，false不存在
 */
Utils.isEmptyObj = function (obj) {
	var boolean = "";
	$.each(obj,function (key,value) {
		if (value == "" || value == undefined || value == null) {
			boolean = true;
		}
	});
	return boolean;
};

Utils.ajaxLoadJsonData = function(types,url,data,callback,errorCallback,async,dataType){
	async = typeof(async)!="undefined" ? async : true;
	types = types ? types : "post";
	dataType = dataType || "json";
	token = token ? token : "";
	$.ajax({
		url:url,
		contentType : 'application/json',  
		data: JSON.stringify(data),
		dataType:dataType,
		type:types,
		// beforeSend: function(request) {
		// 	 request.setRequestHeader("Authorization", token);
        // },
		success:function(result){
			result = result || "";
			if(callback){
				callback(result);
			}
		},
		async:async,
		error:function(errorMsg){
			var msg = "链接服务器失败";
			if(errorMsg.responseText){
				if(typeof(errorMsg.responseText)=="string"){
					try{
						msg = eval('('+errorMsg.responseText+')');
						msg = msg.errormsg;
					}catch(e){
						
					}
					
				}else{
					msg = errorMsg.responseText.errormsg;
				}
			}
			if(errorCallback){
				errorCallback(msg);
			}
		}
	});
};

if(typeof(filectx_for_js)!="undefined"){
	Utils.imageContextUrl = filectx_for_js;
	Utils.uploadFileServer = uploadfilectx_for_js;
	Utils.uploadImageServer = uploadfilectx_for_js+"?isScaleImge=true";
	Utils.cropImageServer = curserverctx_for_js+"&imageType=topic";
	
	Utils.fileViewServer = filectx_for_js;
};

/**
 * 上传图片，并在上传完成后预览
 * @param file 文件上传控件
 */
Utils.previewImage = function(file,successCallback) {
	var _this = $(file);
	var targetContent = {};
	if(_this.prev().length>0){
		targetContent = _this.prev();
		targetContent.attr("relation","prev");
	}else if(_this.next().length>0){
		targetContent = _this.next();
		targetContent.attr("relation","next");
	}else{
		targetContent = _this.parent();
		targetContent.attr("relation","parent");
	}
	
	var preview = _this.siblings("[preview-container]");
	var pathContainer = $(file).siblings("[file-path-container]");
	var f = document.createElement("form");
	f.className="d-n";
	document.body.appendChild(f);
	var fileCopy = file.cloneNode(true);
	f.appendChild(file);
	f.method = "post";
	f.action = Utils.uploadImageServer;
	f.enctype = "multipart/form-data";
	var option = {
		success: function (ret) {
			if(ret.data){
				pathContainer.val(ret.data[0].storagePath);
				
				var MAXWIDTH = 100;
				var MAXHEIGHT = 100;
				var div = preview[0];
				if (file.files && file.files[0]) {
					div.innerHTML = '<img>';
					var img = preview.find("img")[0];
					img.onload = function() {
						var rect = Utils.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
						img.width = rect.width;
						img.height = rect.height;
						img.style.marginLeft = rect.left + 'px';
						img.style.marginTop = rect.top + 'px';
					};
					var reader = new FileReader();
					reader.onload = function(evt) {
						img.src = evt.target.result;
					};
					reader.readAsDataURL(file.files[0]);
					
					if(successCallback){
						successCallback();
					}
					
				} else {
					var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
					file.select();
					var src = document.selection.createRange().text;
					div.innerHTML = '<img>';
					var img = preview.find("img")[0];
					img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
					var rect = Utils.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
					status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
					div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;margin-left:" + rect.left + "px;" + sFilter + src + "\"'></div>";
				}
			}
        }
	};
	$(f).ajaxSubmit(option);
	
	if(targetContent.attr("relation")=="prev"){
		$(fileCopy).insertAfter(targetContent);
	}else if(targetContent.attr("relation")=="next"){
		$(fileCopy).insertBefore(targetContent);
	}else if(targetContent.attr("relation")=="parent"){
		targetContent.append($(fileCopy));
	}
};

Utils.clacImgZoomParam = function(maxWidth, maxHeight, width, height) {
	var param = {
		top: 0,
		left: 0,
		width: width,
		height: height
	};
	if (width > maxWidth || height > maxHeight) {
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;
		if (rateWidth > rateHeight) {
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth);
		} else {
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
};

/**
 * 分页
 */
Utils.page = {};
Utils.page.pageSize = 10; //每一页显示条数
Utils.page.init =  (function(){
	var Page = function(options) {
		var opt = options ? options : {};
		this.url = opt.url || "";
		this.targetContentId = opt.targetContentId || "listContent"; //列表内容容器id
		this.rowTemplateId = opt.rowTemplateId || "rowTmpl"; //每一行的模板id
		this.tmplEvents = opt.tmplEvents;
		this.htmlEvents = opt.htmlEvents;
		this.resultFilter = opt.resultFilter ? opt.resultFilter : null;// 过滤要遍历的数据
		this.pageFilter = opt.pageFilter ? opt.pageFilter : null;// 过滤要分页查询参数对象
		this.scrollerId = opt.scrollerId || "scroller"; //可拖动容器id
		this.wrapperContentId = opt.wrapperContentId || "wrapper"; //可拖动容器id
		this.pullDownContentId = opt.pullDownContentId || "pullDown"; //下拉按钮容器id
		this.pullUpContentId = opt.pullUpContentId || "pullUp"; //上拉按钮容器id
		this.pullDownFunction = opt.pullDownFunction || {}; //下拉刷新数据处理函数
		this.pullUpFunction = opt.pullUpFunction || {}; //上拉刷新数据处理函数
		this.myScroll = {};
		this.pullDownEl = {};
		this.pullDownOffset = {};
		this.pullUpEl = {};
		this.pullUpOffset = {};
		this.generatedCount = 0;
		this.init();
	};
	
	Page.prototype.init = function(){
		//初始化绑定iScroll控件 
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		document.addEventListener('DOMContentLoaded', this.loaded(), false); 
	};

	/**
	* 下拉刷新
	*/
	Page.prototype.pullDownAction = function () {
		var that = this;
		setTimeout(function () {	
			that.pullDownFunction();
			that.myScroll.refresh();//数据加载完成后，调用界面更新方法
		}, 1000);
	};

	/**
	* 滚动翻页
	*/
	Page.prototype.pullUpAction = function () {
		var that = this;
		setTimeout(function () {
			that.pullUpFunction();
			that.myScroll.refresh();// 数据加载完成后，调用界面更新方法
		}, 1000);
	};
	
	/**
	* 初始化iScroll控件
	*/
	Page.prototype.loaded = function () {
		var that = this;
		this.pullDownEl = document.getElementById(that.pullDownContentId);
		this.pullUpEl = document.getElementById(that.pullUpContentId);	
		this.pullDownOffset = this.pullDownEl.offsetHeight;
		this.pullUpOffset = this.pullUpEl.offsetHeight;
		that.myScroll = new iScroll(that.wrapperContentId, {
			scrollbarClass: 'myScrollbar',
			useTransition: false,
			topOffset: that.pullDownOffset,
			onRefresh: function () {
				if (that.pullDownEl.className.match('loading')) {
					that.pullDownEl.className = '';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
				} else if (that.pullUpEl.className.match('loading')) {
					that.pullUpEl.className = '';
					that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
				}
			},
			onScrollMove: function () {
				$("#listContent").siblings().show();
				if (this.y > 5 && !that.pullDownEl.className.match('flip')) {
					that.pullDownEl.className = 'flip';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始刷新...';
					this.minScrollY = 0;
				} else if (this.y < 5 && that.pullDownEl.className.match('flip')) {
					that.pullDownEl.className = '';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
					this.minScrollY = -that.pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5) && !that.pullUpEl.className.match('flip')) {
					that.pullUpEl.className = 'flip';
					that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始加载...';
				} else if (this.y > (this.maxScrollY + 5) && that.pullUpEl.className.match('flip')) {
					that.pullUpEl.className = '';
					that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
					this.maxScrollY = that.pullUpOffset;
				}
			},
			onScrollEnd: function () {
				if (that.pullDownEl.className.match('flip') && that.pullUpEl.className.match('flip')) {
					that.pullUpEl.className = "";
					that.pullDownEl.className = 'loading';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
					that.pullDownAction();	
				}else if (that.pullDownEl.className.match('flip')) {
					that.pullDownEl.className = 'loading';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
					that.pullDownAction();	
				} else if (that.pullUpEl.className.match('flip')) {
					that.pullUpEl.className = 'loading';
					that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
					that.pullUpAction();	
				}
			}
		});
		setTimeout(function () { document.getElementById(that.wrapperContentId).style.left = '0'; }, 800);
	};
	
	/**
	 * 加载数据
	 */
	Page.prototype.loadData = function(sendData,insertType){
		var that = this;
		sendData = sendData || {};
		$.extend(sendData, {"rows":Utils.page.pageSize});
		insertType = insertType || Utils.page.insertType.html;
		var callback = function(ret){
			var list;
			if(that.resultFilter){
				list = ret[that.resultFilter];
			}else{
				list = ret.list;
			}
			
			var pageCondition;
			if(that.pageFilter){
				pageCondition = ret[that.pageFilter];
			}else{
				pageCondition = ret.page;
			}
			var $listContent = $("#" + that.targetContentId);
			if(list && list.length>0){
				//展示数据公共方法
				var insertHtml = function(html){
					if(insertType==Utils.page.insertType.append){
						$listContent.append(html);
					}else if(insertType==Utils.page.insertType.insertBefore){
						html.insertBefore($("#"+that.scrollerId+">ul>li:first"));
					}else{
						$listContent.html(html);
						setTimeout(function(){
							$("#scroller").css("transform","translate(0px, 0px) scale(1) translateZ(0px)");
						},500);
					}
				};
				
				$listContent.removeClass("m_t_80");
				var html = "";
				if (that.tmplEvents) {
					html = $("#"+that.rowTemplateId).tmpl(list,that.tmplEvents);
				}else{
					html = $("#"+that.rowTemplateId).tmpl(list);
				}
				insertHtml(html);
				//根据当前页号和总页数判断是否还有更多信息
				if(pageCondition.page>=pageCondition.totalPages && insertType!=Utils.page.insertType.html){
					var noMoreDatahtml = "<div class='no_more_data'><p>没有更多信息</p></div>";
					insertHtml($(noMoreDatahtml));
				}
				if(that.htmlEvents){
					that.htmlEvents(html,ret,sendData);
				}
			}else{
				if($listContent.find(".no_more_data").length<=0){
					$listContent.addClass("m_t_80");
					if(insertType==Utils.page.insertType.append){
						$listContent.append("<div class='no_more_data'><p>没有相关信息</p></div>");
					}else{
						$("#scroller").css("transform","translate(0px, 0px) scale(1) translateZ(0px)")
						$listContent.append("<div class='no_more_data'><p>没有相关信息</p></div>");
					}
				}
			}
			$("#listContent").siblings().hide();
		};
		Utils.ajaxLoadData(that.url, sendData, callback);
	};
	return Page;
})();

/**
 * 数据插入到页面的方式
 */
Utils.page.insertType = {
	append : "append",
	html : "html",
	insertBefore : "insertBefore"
};

/**
 * 为src添加项目根路径
 */
Utils.addCtxToSrc = function(){
	var fileContent = $("[add-filectx]");
	for(var i=0; i<fileContent.length; i++){
		var file = $(fileContent[i]);
		var filePath = file.attr("add-filectx");
		if(filePath){
			file.attr("src",Utils.imageContextUrl + filePath);
		}
		file.parent("[preview-container]").siblings("[file-path-container]").val(filePath);
	}
};

/**
 * 初始化上传附件相关Url
 */
Utils.initUploadUrl = function(){
	var url = contextUrl + "/getFileServerUrl.json";
	var callback = function(ret){
		if(ret && ret.result){
			Utils.imageContextUrl = ret.filectx;
			Utils.uploadFileServer = ret.uploadfilectx;//uploadimgctx_for_js
//			Utils.uploadFileServer = uploadfilectx_for_js+"?isScaleImge=false";
			Utils.uploadImageServer = ret.uploadfilectx+"?isScaleImge=true";
			Utils.cropImageServer = ret.curserverctx+"&imageType=topic";
			Utils.fileViewServer = ret.filectx;
		}
	};
	Utils.ajaxLoadData(url, {}, callback);
};

/**
 * 获取项目根路径
 */
Utils.getRootPath = function(){
	var rootPath = Utils.rootPath;
	if(!rootPath){
		var strFullPath = window.document.location.href;
		var strPath = window.document.location.pathname;
		var pos = strFullPath.indexOf(strPath);
		var prePath = strFullPath.substring(0,pos);
		var postPath = strPath.substring(0,strPath.substr(1).indexOf('/')+1);
		rootPath = (prePath+postPath);
		Utils.rootPath = rootPath;
	}
	return rootPath;
};

//定义全局变量
var oStorage = window.localStorage;

//判断是否登录
Utils.isLogin = function(){
	var data = JSON.parse(oStorage.getItem('loginJson'));  
	if(data && data.access_token){
		return data.access_token;
	}else{
		return "";
	}
};


//文件上传 不需要预览
Utils.uploadFileFn=function(formId,thisElement,callBackFn){
	var sbForm = document.getElementById(formId);
	sbForm.action = "https://filetest.qiyesq.com:8080/fileserver/upload?isScaleImge=true";// Utils.uploadImageServer;
	var formdata = new FormData(sbForm);
	//直接返回文件的源数据
	var blob= thisElement.files[0];
	formdata.append('filePath1', blob);
	 $.ajax({
        url : sbForm.action,
        type : "POST",
        data : formdata,
        dataType:"text",
        processData : false,         // 告诉jQuery不要去处理发送的数据
        contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
        
        success:function(ret){
        	var data = eval('('+ret+')');
        	callBackFn(data);
        }
	});
}


//弹出提示框
Utils.setTipBox = function(setContent){
	$(".tipbox").show();
	if($(".tipbox").length>0){
		$(".tipContent").text(setContent);
	}else{
		$("body").append('<div class="tipbox"><p class="tipContent">'+setContent+'</p></div>');
	}
	setTimeout(function(){
		$(".tipbox").hide();
	},2000);
}

contextUrl = 'http://192.168.118.85:8087';
$(function(){
	Utils.addCtxToSrc();
});
