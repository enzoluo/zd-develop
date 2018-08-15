package com.zshop.common.orderdetail.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;


/**
 * @Description: 订单操作流水表
 * @author: Administrator
 * @date: 2018-04-15 15:36:12
 */
public class CommOrderDetailData implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 
	 */
	private String id;	
	/**
	 * 
	 */
	private String parkId;	
	/**
	 * 
	 */
	private String type1;	
	/**
	 * 
	 */
	private String type2;	
	/**
	 * 
	 */
	private String orderNo;	
	/**
	 * 
	 */
	private String orderId;	
	/**
	 * 
	 */
	private String orderStatus;	
	/**
	 * 
	 */
	private String remark;	
	/**
	 * 
	 */
	private String createBy;	
	/**
	 * 
	 */
	private String createName;	
	/**
	 * 
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 
	 */
	private String updateBy;	
	/**
	 * 
	 */
	private String status1;	
	/**
	 * 
	 */
	private String status2;	
	/**
	 * 
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 
	 */
	private String ext1;	
	/**
	 * 
	 */
	private String ext2;	
	/**
	 * 
	 */
	private String ext3;	
	/**
	 * 
	 */
	private String ext4;	
	/**
	 * 
	 */
	private String ext5;	
	/**
	 * 
	 */
	private String ext6;	


 	public void setId(String id){	
 		this.id=id;	
 	}	
 
 	public String getId(){	
 		return this.id;	
 	}	
 
 	public void setParkId(String parkId){	
 		this.parkId=parkId;	
 	}	
 
 	public String getParkId(){	
 		return this.parkId;	
 	}	
 
 	public void setType1(String type1){	
 		this.type1=type1;	
 	}	
 
 	public String getType1(){	
 		return this.type1;	
 	}	
 
 	public void setType2(String type2){	
 		this.type2=type2;	
 	}	
 
 	public String getType2(){	
 		return this.type2;	
 	}	
 
 	public void setOrderNo(String orderNo){	
 		this.orderNo=orderNo;	
 	}	
 
 	public String getOrderNo(){	
 		return this.orderNo;	
 	}	
 
 	public void setOrderId(String orderId){	
 		this.orderId=orderId;	
 	}	
 
 	public String getOrderId(){	
 		return this.orderId;	
 	}	
 
 	public void setOrderStatus(String orderStatus){	
 		this.orderStatus=orderStatus;	
 	}	
 
 	public String getOrderStatus(){	
 		return this.orderStatus;	
 	}	
 
 	public void setRemark(String remark){	
 		this.remark=remark;	
 	}	
 
 	public String getRemark(){	
 		return this.remark;	
 	}	
 
 	public void setCreateBy(String createBy){	
 		this.createBy=createBy;	
 	}	
 
 	public String getCreateBy(){	
 		return this.createBy;	
 	}	
 
 	public void setCreateName(String createName){	
 		this.createName=createName;	
 	}	
 
 	public String getCreateName(){	
 		return this.createName;	
 	}	
 
 	public void setCreateTime(Date createTime){	
 		this.createTime=createTime;	
 	}	
 
 	public Date getCreateTime(){	
 		return this.createTime;	
 	}	
 
 	public void setUpdateBy(String updateBy){	
 		this.updateBy=updateBy;	
 	}	
 
 	public String getUpdateBy(){	
 		return this.updateBy;	
 	}	
 
 	public void setStatus1(String status1){	
 		this.status1=status1;	
 	}	
 
 	public String getStatus1(){	
 		return this.status1;	
 	}	
 
 	public void setStatus2(String status2){	
 		this.status2=status2;	
 	}	
 
 	public String getStatus2(){	
 		return this.status2;	
 	}	
 
 	public void setUpdateTime(Date updateTime){	
 		this.updateTime=updateTime;	
 	}	
 
 	public Date getUpdateTime(){	
 		return this.updateTime;	
 	}	
 
 	public void setExt1(String ext1){	
 		this.ext1=ext1;	
 	}	
 
 	public String getExt1(){	
 		return this.ext1;	
 	}	
 
 	public void setExt2(String ext2){	
 		this.ext2=ext2;	
 	}	
 
 	public String getExt2(){	
 		return this.ext2;	
 	}	
 
 	public void setExt3(String ext3){	
 		this.ext3=ext3;	
 	}	
 
 	public String getExt3(){	
 		return this.ext3;	
 	}	
 
 	public void setExt4(String ext4){	
 		this.ext4=ext4;	
 	}	
 
 	public String getExt4(){	
 		return this.ext4;	
 	}	
 
 	public void setExt5(String ext5){	
 		this.ext5=ext5;	
 	}	
 
 	public String getExt5(){	
 		return this.ext5;	
 	}	
 
 	public void setExt6(String ext6){	
 		this.ext6=ext6;	
 	}	
 
 	public String getExt6(){	
 		return this.ext6;	
 	}	
 

}

