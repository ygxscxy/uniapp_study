<template>
	<view class="home-layout">
		<custom-nav-bar />
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true"
				:interval="3000" :duration="1000" >
				<swiper-item>
					<view class="swiper-item">
						<image src="../../common/images/banner1.jpg" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<up-icon name="volume-fill" color="#28b389" size="20"></up-icon>
				<text>公告</text>
			</view>
			<view class="center">
				<swiper vertical :autoplay="true" :interval="1500" :duration="300">
					<swiper-item>
						<view class="swiper-item">内容内容内容内容内容内容内容内容内容内容内容内容内容内容1</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">内容内容内容内容内容内容内容内容内容内容内容内容内容内容2</view>
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
					<view class="select-item" v-for="item in 5" :key="item">
						<image mode="aspectFill" src="../../common/images/preview1.jpg" ></image>
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
				<theme-item :currentIndex="index" class="theme-item" v-for="(item,index) in 8" :key="item"></theme-item>
				<theme-item :isshowLast="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>

  const previewImageHandler = (index)=>{
		console.log(index);
	}
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
