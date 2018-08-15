(function() {
	 'use strict';
	 
	 app.controller('DepRunAppsGrid',Grid);
	 
	 var editCtrl = "TDepAppsEdit";
	 app.controller(editCtrl,DCtrl);

	 var base = '/deploy/runapps/';
	 var editUrl = '../admin/pages/deploy/dep/app_edit.html';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base +"list";
		 

	     //配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });
	     
	     //请求后台数据
	     function getGridData(){
	 		var sendData = {
	 			searchKeys:currKeys,
	 			pageNo: $scope.paginationConf.currentPage,
	 			pageSize: $scope.paginationConf.pageSize
	 		}

	 		HttpUtils.get($scope.url, sendData ,function (response) {
	 			$scope.serviceList=response.data;
	 		});
	 	 }  
	     
	 	 //详情
	 	 $scope.detail = function(row){
		    	var sendData = {serviceId:row.appCode};
		 		HttpUtils.get("/api/initView",sendData,function (response) {
		 			var host = response.data.host;
	 				if($.trim(host)!=''){
	 					window.open("http://"+host+"/swagger-ui.html");
	 				}else{
	 					ModalCtrl.show('提示','连接不可用！',modalCode.info);
	 				}
		 		});
	 	 }
	 	
	     //修改
	     $scope.update = function (row) {
	 		var sendData = {serviceId:row.appCode};
	 		HttpUtils.post(base + "update",sendData,function (data) {
	 			getGridData();
				ModalCtrl.show('提示','更新成功',modalCode.success);
	 		});
	 	 }
	    
	     //搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	 }
     //打开页面
     function open(site,$modal) {
    	$modal.open({
 			templateUrl:site.url+'?v='+new Date().getTime(),
 			controller: site.ctrl,
 			controllerAs:'mm',
 			resolve:{
 				site:function () {
 					return site;
 				}
 			}
 		});
 	 }
    
	function DCtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		if(mm.site.code == 1){
			
			
		}
		if(mm.site.code == 2){
			mm.form = site.data.data;
		}
		if(mm.site.code == 3){//查询详情
			mm.form = site.data.data;
		}

		mm.addSave = function () {
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
				var imgPath=$("input[name='appLogo1']").val();
				var appPkgUrl=$("input[name='appPkgUrl']").val();
				sendData.appLogo1=imgPath;
				sendData.appPkgUrl=Utils.fileServerViewUrl+appPkgUrl;
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				var imgPath=$("input[name='appLogo1']").val();
				var appPkgUrl=$("input[name='appPkgUrl']").val();
				var fieldName=$("input[name='appPkgUrl']").attr("fieldName");
				var viewStoragePath=$("input[name='appPkgUrl']").attr("pdfStoragePath");
				sendData.appLogo1=imgPath;
				sendData.appPkgUrl=Utils.fileServerViewUrl+appPkgUrl;
				HttpUtils.post( base + 'updateSave',sendData,function () {
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
				});
			}
			$modalInstance.close();
		}
		mm.close = function () {
			$modalInstance.close();
		}
	}
	app.filter("imgUrl",function(){
		return function(url){
			if(url.indexOf("http") != -1){
				return url;
			}else{
				return Utils.fileServerViewUrl+url;
			}
		}
	})
	
	
})();



