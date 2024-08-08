<template>
	<view class="theme-item" v-if="!isshowLast">
		<navigator :url="`/pages/classiylist/classiylist?classid=${itemData._id}&title=${itemData.name}`">
			<view class="top">
				{{timeAgo(itemData.updateTime)}}前更新
			</view>
			<view class="content">
					<image class="img" :src="itemData.picurl" mode="aspectFill"></image>
			</view>
			<view class="bottom">
				{{itemData.name}}
			</view>
		</navigator>
	</view>

 <view class="theme-item" v-if="isshowLast">
	 <navigator  open-type="reLaunch" url="/pages/classify/classify">
	 	<view class="content mask-box">
			<view class="mask"></view>
			<view class="text-icon">
				<uni-icons class="icon" type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">
						更多
				</view>
			</view>
			<image src="../../common/images/more.jpg" class="img" mode=""></image>
	 	</view>
	 </navigator>
 </view>
</template>

<script setup>
import timeAgo from '../../utils/formatDate';
	const props = defineProps({
		isshowLast: {
			type:Boolean,
			default: false
		},
		currentIndex:Number,
		itemData: {
			type:Object,
			default(){
				return {
					name:"默认",
					updateTime: 1000*60*60*5,
					picurl:"../../common/images/more.jpg"
				}
			}
		}
	})
	
</script>

<style scoped lang="scss">
.theme-item{
	position: relative;
	.top{
		position: absolute;
		z-index: 1;
		top: 0rpx;
		left: 0;
		background-color: rgba(250,129,90,0.7);
		backdrop-filter: blur(20rpx);
		color: #fff;
		font-size: 22rpx;
		padding: 6rpx 10rpx;
		border-radius: 0 0 20rpx 0;
		transform: scale(0.8);
		transform-origin: left top;
	}
	
	.content{
		position: relative;
		border-radius: 10rpx;
		overflow: hidden;
		height: 340rpx;
		.img{
			width: 100%;
		}
	}
		
	.bottom{
		position: absolute;
		z-index: 1;
		bottom: 0rpx;
		left: 0;
		right: 0;
		height: 60rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: rgba(0,0,0,0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(10rpx);
		font-weight: 600;
	}
	
		
	.mask{
		width: 100%;
		height: 100%;
		z-index: 10;
		background-color: rgba(0,0,0,0.2);
		position: absolute;
		backdrop-filter: blur(10rpx);
	}
	.icon{
		z-index: 11;
	}
	.text{
		z-index: 12;
	}
	.mask-box{
		display: flex;
		justify-content: center;
		align-items: center;
		.text-icon{
			position: absolute;
			flex-direction: column;
			color: #fff;
			
			z-index: 11;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				font-size: 25rpx;
				margin-top: -5rpx;
			}
			
			
		}
		
	}
}
</style>