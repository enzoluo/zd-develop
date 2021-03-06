(function () {
    'use strict';

    app.controller('TCompanyGrid', Grid);
    
    var editCtrl = "TCompanyEdit";
	 app.controller(editCtrl,DCtrl);
	 
	 var base = '/baseinfo/organization/';
	 var editUrl = '../admin/pages/baseinfo/company/organization_edit.html';
	 var modelCode = 'organizationEntity';
    

    function Grid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal,parkChoose,companyChoose) {
    	var currKeys = undefined;
        $scope.url = base + 'list';

        //配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1};
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        //请求后台数据
        function getGridData() {
            var sendData = {
            	searchKeys:currKeys,
            	orgType:'1',
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData, function (data) {
                $scope.paginationConf.totalItems = data.data.page.total;
                $scope.rows = data.data.page.rows;
                $scope.categoryList = data.categoryList;
            });
        }
        //搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13)
                return;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
        
      //新增
	     $scope.addNew = function () {
	    	var sendData = {};
		    HttpUtils.get(base + "init",sendData,function (data) {
		    	var site = {};
	 			site.title = '新增';
	 			site.code = 1;
	 			site.url =  editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
		    });
	 	 };
	 	 
	 	//修改
	     $scope.update = function (id) {
	 		var sendData = {id:id};
	 		HttpUtils.get(base + "init",sendData,function (data) {
	 			var site = {};
	 			site.entity = data.data;
	 			site.title = '修改';
	 			site.code = 2;
	 			site.url =   editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
	 		});
	 	 }
	     
	     //搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     //删除
	     $scope.deleteById = function(id) {
	 		ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.post(base +  'deleteById',sendData,function (data) {
	 					getGridData();
	 					ModalCtrl.show('提示','删除成功！',modalCode.success);
	 				}
	 			);
	 		});
	 	 }
	     //加入园区
	     $scope.joinPark = function(id){
	    	 
	    	 var checkIds=[];
	    	 var form = {};
	    	 HttpUtils.get(base +'getOrgPPark', {"fromId" : id,"orgType":"1"} ,function (data) {
	    		 var dataList=data.data;
	    		 for (var i = 0; i < dataList.length; i++) {
	    			 checkIds.push(dataList[i].toId);
				}
	    	 });
	    	 parkChoose.choose(function (data) {
		    		if(data && data.length>0){
		    			var parkId = data[0];
			         	if(!parkId){
			            	ModalCtrl.show('提示','请选择园区！',modalCode.warning);
			   	    	}
			         	//删除园区-园区关系
			         	HttpUtils.post('/baseinfo/relation/deleteOrgPark',{"orgId":id,"orgType":"1"},function (data) {
			         		saveOrgPark(id,parkId,"1");	
			         	});
			 		}
		            },checkIds);
		    	 console.log(form);
	     }
	     //保存公司-园区关系
	     function saveOrgPark(orgId,parkId,orgType){
	    	var sendData = {orgId:orgId,parkId:parkId,"orgType":orgType};
			HttpUtils.post('/baseinfo/relation/saveOrgPark',sendData,function (data) {
				getGridData();
				ModalCtrl.show('提示','加入园区成功',modalCode.success);
			});
	     }
	     //加入公司
	     $scope.joinOrg = function(id){
	    	 
	    	 var checkOrgIds=[];
	    	 var form = {};
	    	 HttpUtils.get(base +'getOrgPOrg', {"fromId" : id,"orgType":"1"} ,function (data) {
	    		 var dataList=data.data;
	    		 for (var i = 0; i < dataList.length; i++) {
	    			 checkOrgIds.push(dataList[i].toId);
	    		 }
	    	 });
	    	 companyChoose.choose(function (data) {
	    		 if(data && data.length>0){
	    			 var orgPId = data[0];
	    			 if(!orgPId){
	    				 ModalCtrl.show('提示','请选择企业！',modalCode.warning);
	    			 }
	    			 //删除园区-园区关系
	    			 HttpUtils.post('/baseinfo/relation/deleteOrgOrg',{"orgId":id,"orgType":"1"},function (data) {
	    				 saveOrgOrg(id,orgPId,"1");	
	    			 });
	    		 }
	    	 },checkOrgIds,{orgType:"1"});
	    	 console.log(form);
	     }
	     //保存公司-园区关系
	     function saveOrgOrg(orgId,orgPId,orgType){
	    	 var sendData = {fatherId:orgPId,childId:orgId,"orgType":orgType};
	    	 HttpUtils.post('/baseinfo/relation/saveOrgOrg',sendData,function (data) {
	    		 getGridData();
	    		 ModalCtrl.show('提示','加入企业成功',modalCode.success);
	    	 });
	     }
	     
	     //公司用户列表
	     $scope.userlist = function(id){
	    	 $state.go("app.listPlatformOrgUsers",{id:id});
	     }
	     
	     
	     //下载模板
	     $scope.toDataDownload = function(){
	    	 location.href= "/baseinfo/open/excelhead/excelTempExport?modelCode="+modelCode;
	     };
	     
	     
	   //导入数据
	     $scope.toDataImport = function(){
	         $('#dataImport').modal(); 
	         var fileInput = document.getElementById("fileInput");
	     	// for IE, Opera, Safari, Chrome
	          if (fileInput.outerHTML) {
	              fileInput.outerHTML = fileInput.outerHTML;
	          } else { // FF(包括3.5)
	              fileInput.value = "";
	          }
	     };
	     
	 	$scope.dataImport=function(){
			var fd = new FormData();
	        var file = document.querySelector('input[type=file]').files[0];
	        
	        if(!file){
	        	Utils.showTip(false,"请上传文件！");	
	        	return;
	        }
	        console.log(file);
	        fd.append('file', file); 
	        fd.append('modelCode', modelCode);
	        $http({
		        method:'POST',
		        url:base + "dataImport",
		        data: fd,
		        headers:{Authorization:localStorage.token,'Content-Type':undefined},
		        transformRequest: angular.identity 
	        }).success( function ( data ){
	        	 //上传成功的操作
			    if(data.result){
			    	$('#dataImport').modal("hide"); 
		    		 getGridData();
		    		 ModalCtrl.show('提示','导入数据成功',modalCode.success);
			    }else{
			    	ModalCtrl.show('提示','导入数据失败',modalCode.error);
			    }
	        })
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
			mm.form = site.entity;
		}

		mm.addSave = function () {
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
				/*sendData.remark = UE.getEditor('remarkContentEditor').getContent();*/
				sendData.orgType='1';
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
					$modalInstance.close();
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				/*sendData.remark = UE.getEditor('remarkContentEditor').getContent();*/
				sendData.orgType='1';
				HttpUtils.post( base + 'updateSave',sendData,function () {
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
					$modalInstance.close();
				});
			}
			
		}
		mm.close = function () {
			
			$modalInstance.close();
		}
	}
    
})();



