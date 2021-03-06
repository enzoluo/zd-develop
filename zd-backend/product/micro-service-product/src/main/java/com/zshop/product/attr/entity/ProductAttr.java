package com.zshop.product.attr.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;


/**
 * @Description: 商品规格
 * @author: Enzo
 * @date: 2018-08-24 10:16:59
 */
@Setter
@Getter
public class ProductAttr implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 属性项ID
	 */
	private Integer id;	
	/**
	 * 属性名称
	 */
	private String attrName;	
	/**
	 * 属性值
	 */
	private String attrValue;	
	/**
	 * 属性别名
	 */
	private String aliases;	
	/**
	 * 是否显示别名（1、是  0、否）
	 */
	private Integer isAli;	
	/**
	 * 属性类型（0：SKU属性   1：扩展属性）
	 */
	private Integer attrType;	
	/**
	 * 状态,0:未启用，1：启用
	 */
	private Integer status;	
	/**
	 * 是否删除0:不删除，1：删除
	 */
	private Integer isDel;	
	/**
	 * 创建人
	 */
	private String createBy;	
	/**
	 * 创建时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 更新人
	 */
	private String updateBy;	
	/**
	 * 更新时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 所对应的kz_business主键
	 */
	private Integer bid;	



}

