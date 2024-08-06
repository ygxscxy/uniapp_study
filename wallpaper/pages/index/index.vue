<template>
	<view class="home-layout">
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
						<view class="swiper-item">内容2</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<up-icon name="arrow-right" color="#666" size="16"></up-icon>
			</view>
		</view>
	</view>
</template>

<script setup>

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
	}
</style>
