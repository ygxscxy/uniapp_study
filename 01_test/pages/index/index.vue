<template>
	<view class="content">
		<!-- 按下，会触发.top-hover-active样式 -->
		<view class="top" >aaa</view>
		<view class="middle"  >
			<!-- 滚动区域，纵向滚动必须设置高度，子元素必须超出父元素的高度 -->
			<scroll-view scroll-y="true" class="list">
				<view v-for="(item,index) in 100" :key="{index}">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<view class="bottom">
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" circular :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">111</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">2222</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">3333</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">4444</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup>
	import {ref} from "vue"
	
	const count = ref(0)
	
</script>

<style lang="less">
	.top{
		height:30px;
		background-color:skyblue;
		
	}
	.top-hover-active{
		background-color: red;
	}
			
	.top-hover-active2{
		background-color: pink;
	}
	.middle{
		height: 500px;
		background-color: orange;
		.box{
			background-color: green;
		}
		.list{
			height: 100%;
		}
			
		
	}
	
	
	swiper{
		border: 1px solid red;
		width: 100vw;
		height: 200px;
		background-color: green;
		color: white;
	}
</style>
