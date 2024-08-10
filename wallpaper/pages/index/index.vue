<template>
	<view class="home-layout">
		<custom-nav-bar />
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true"
				:interval="3000" :duration="1000" >
				<swiper-item v-for="item in homeBannerList" :key="item._id">
					<view class="swiper-item">
						<image :src="item.picurl" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice" @click="goNotice">
			<view class="left" >
				<up-icon name="volume-fill" color="#28b389" size="20"></up-icon>
				<text>公告</text>
			</view>
			<view class="center">
				<swiper vertical :autoplay="true" :interval="1500" :duration="300">
					<swiper-item v-for="(item,index) in noticeList" :key="item._id">
						<view class="swiper-item">{{item.title}}</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<up-icon name="arrow-right" color="#666" size="16"></up-icon>
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>
					<view>每日推荐</view>
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18" color="#28b389"></uni-icons>
						<uni-dateformat :date="Date.now()" format="dd" ></uni-dateformat>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x >
					<view class="select-item" v-for="item in eachDayRecommendList" :key="item._id" @click="goPreview(item._id)">
						<image mode="aspectFill" :src="item.smallPicurl" ></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>
					<view>专题精选</view>
				</template>
				<template #custom>
					<view class="text">
						More+
					</view>
				</template>
			</common-title>
			<view class="content">
				<theme-item :currentIndex="index" class="theme-item" :itemData="item" v-for="(item,index) in specialSubjectList" :key="item._id"></theme-item>
				<theme-item :isshowLast="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	
	
	import { getBannerList,getEachDayRecommendList,getNoticeList,getSpecialSubjectList } from '../../service';
	import {onMounted, ref} from "vue"
	import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
	
	const homeBannerList = ref([])
	const eachDayRecommendList = ref([])
	const noticeList  = ref([])
	const specialSubjectList = ref([])
	
	
	onMounted( async ()=>{
		// 获取banner数据
		const res = await  getBannerList()
		homeBannerList.value = res.data
		
		// 获取每日精选数据
		const res2 = await getEachDayRecommendList()
		eachDayRecommendList.value = res2.data
		// 获取通知列表
		const res3 = await getNoticeList()
		noticeList.value = res3.data
		// 专题精选数据
		const res4 = await getSpecialSubjectList()
		specialSubjectList.value = res4.data
		
	})
	
  const previewImageHandler = (index)=>{
		console.log(index);
	}
	
	const goPreview = (id)=>{
		uni.setStorageSync("storageClassifyList",eachDayRecommendList.value)
		uni.navigateTo({
			url:"/pages/preview/preview?id="+id+"&title="+"每日精选"
		})
		
		// id=663b17a10d2b315faf724e41&title=可爱萌宠
		
	}
	
	const goNotice = ()=>{
		uni.navigateTo({
			url:"/pages/notice/detail?id=index"
		})
	}
	
	
	// 设置分享给朋友
	onShareAppMessage((e)=>{
		return {
			path:"/pages/index/index",
			title:"dbb壁纸首页",
		}
	})
	
	// 设置分享到朋友圈
	onShareTimeline(()=>{
		return {
			title:"dbb壁纸首页",
			imageUrl:"/static/images/xxmLogo.png",
			path:"/pages/index/index",
		}
	})
</script>

<style scoped lang="less">
	.home-layout{
		padding: 30rpx;
		.banner{
			margin-bottom: 20rpx;
			.swiper-item{
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.notice{
			background-color: red;
			height: 80rpx;
			background-color: #f9f9f9;
			border-radius: 80rpx;
			display: flex;
			line-height: 80rpx;
			
			.left{
				width: 140rpx;
				display: flex;
				padding: 20rpx;
				align-items: center;
				text{
					color: #28b389;
					text-align: center;
					
					font-weight: 600;
					font-size: 28rpx;
				}
			}
			.center{
				flex: 1;
				swiper{
					height: 100%;
						
					swiper-item{
							font-size: 30rpx;
							color: #999;
							height: 100%;
							
						.swiper-item{
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
			.right{
				width: 70rpx;
				display: flex;
				justify-content: end;
				margin-right: 15rpx;
			}
		}
		
			
		.select{
			margin-top: 20rpx;
			margin-bottom: 30rpx;
			.content{
				width: 720rpx;
				margin-top: 30rpx;
					
				scroll-view{
					white-space: nowrap;
					.select-item{
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 10rpx;
						&:last-child{
							margin-right: 30rpx;
						}
						image{
							border-radius: 12rpx;
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			.date{
				display: flex;
				align-items: center;
				
				color: #28b389;
			}
		}
	
		.theme{
			.text{
				font-size: 32rpx;
				color: #888;
			}
			.content{
				margin-top: 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3,1fr);
			}
		}
	}
</style>
