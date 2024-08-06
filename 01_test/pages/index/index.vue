<template>
	<UserInfo @get-data="getData" ref="refSonComp" />
	<!-- open-type="reLaunch" 卸载当前页面然后跳转 -->
	<navigator url="/pages/home/home?name=zs&age=12" open-type="reLaunch">home</navigator>
	<view class="content">
		<view class="item" v-for="item in 100" :key="item">
			<text>{{item}}</text>
		</view>
		
	</view>
</template>

<script setup>
	import {onMounted, ref} from "vue"
	import {onLoad,onShow,onUnload,onPageScroll} from "@dcloudio/uni-app"
	
	
	onLoad(()=>{
		console.log("onLoad");
	})
	
	onShow(()=>{
		console.log("onShow");
	})
	
	// 只有通过navigator open-type=reLaunch 进行跳转才会触发
	onUnload(()=>{
		console.log("onUnload");
	})
	
	
	const refSonComp = ref()
	
	onMounted(()=>{
		console.log(refSonComp.value);
	})
	
	
	// onPageScroll((e)=>{
	// 	console.log("onPageScroll",e);
	// })
		
	
	const getData = (value)=>{
		console.log(value.value);
	}
	
	
</script>

<style lang="less">
	 
 view{
	 // 1 rpx = 0.5 px = 1 物理像素
	 // 举个例子：在iPhone6上，如果要绘制一个宽为100px，高为30px的盒子，换算成rpx单位，宽高分别为200rpx 和 60rpx
	 width: 100rpx; // 50px
	 
 }
</style>
