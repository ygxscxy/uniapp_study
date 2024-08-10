<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">欢迎进入我使用uni-app开发的小程序-{{detail?.title}}</view>			
		</view>
		
		<view class="info">
			<view class="item">dbb</view>					
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>	
		</view>
		
		
		<view class="content">		
			<view v-if="id=='index'">
				<view>可以和我联系</view>
				<image src="../../static/images/wx.jpg" mode="widthFix"></image>
			</view>
			<rich-text v-else :nodes="detail?.content"></rich-text>
		</view>
		
		<view class="count">
			阅读 5588	
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getNoticeDetail } from '../../service';
import {onLoad} from "@dcloudio/uni-app"

const detail = ref(null)

const id = ref("")

	
onLoad((option)=>{
	id.value = option?.id
})
	
onMounted(async ()=>{
	if(id.value){
		const res = await getNoticeDetail(id.value)
		detail.value = res.data
	}
})
</script>

<style lang="scss" scoped>
.noticeLayout{
	padding:30rpx;
		.title{
			font-size: 40rpx;
			color:#111;
			line-height: 1.6em;
			padding-bottom:30rpx;
			display: flex;
			.tag{
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;	
			}
			.font{
				padding-left:6rpx;
			}
		}
		.info{
			display: flex;
			align-items: center;
			color:#999;
			font-size: 28rpx;
			.item{
				padding-right: 20rpx;
			}
		}
		.content{
			padding:50rpx 0;
		}
		.count{
			color:#999;
			font-size: 28rpx;
		}
}
</style>
