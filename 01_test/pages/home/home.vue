<template>
	<view class="">
		home name:{{name}}
	</view>
</template>

<script setup>
	import {onLoad,onReady} from "@dcloudio/uni-app"
	import { ref,reactive } from "vue";
	
	let name = ref()
	let age = ref()
	// onLoad页面加载完成，但是还没挂载到页面上
	// 接收上个页面传递过来的查询字符串
	onLoad((option)=>{
		console.log(option);
		name.value = option.name
		age.value = option.age
	})
	
	// 监听页面初次渲染完成，此时组件已挂载完成
	onReady(()=>{
		console.log("onReady");
	})
</script>

<style lang="less" scoped>
	       
</style>
