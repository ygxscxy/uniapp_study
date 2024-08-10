<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item :itemData="item" v-for="item in classifyList" :key="item._id"></theme-item>
		</view>
	</view>
</template>

<script setup>
	import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import { onMounted, ref } from 'vue';
import { getSpecialSubjectList } from '../../service';
 
  const classifyList = ref([])

	onMounted(async ()=>{
	 const res = await	getSpecialSubjectList(20)
	 classifyList.value = res.data
	})
	// 设置分享给朋友
	onShareAppMessage((e)=>{
		return {
			path:"/pages/classify/classify",
			title:"dbb壁纸首页",
		}
	})
	
	// 设置分享到朋友圈
	onShareTimeline(()=>{
		return {
			title:"dbb壁纸首页",
			imageUrl:"/static/images/xxmLogo.png",
			path:"/pages/classify/classify"
		}
	})
	
</script>

<style lang="scss" scoped>
.classify{
	padding:30rpx;
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap:15rpx;
}
</style>
