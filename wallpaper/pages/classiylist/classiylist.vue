<template>
	<view class="classlist">
		<view class="loading-layout" v-if="!classifyDetailList.length && isMoreData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id='+item._id+'&title='+title" class="item" :key="item._id" v-for="item in classifyDetailList">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="tip" v-if="!isMoreData">
			没有更多数据了~
		</view>
		<view class="safe-area-inset-bottom">
		</view>
	</view>
</template>

<script setup>

import {onLoad,onReachBottom} from "@dcloudio/uni-app"
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getClassifyDetailList } from "../../service";
const classifyId = ref("")
const classifyDetailList = ref([])

const currentPageNum = ref(1)
const isMoreData = ref(true)

const title = ref("")


onLoad((option)=>{
	classifyId.value = option.classid,
	uni.setNavigationBarTitle({
		title: option.title
	})
	
	title.value = option.title
})


onMounted(async ()=>{
	const res = await getClassifyDetailList({classid:classifyId.value,pageNum:currentPageNum.value,pageSize:12})
	classifyDetailList.value = res.data
	uni.setStorageSync("storageClassifyList",classifyDetailList.value)
	// 表示没有更多数据了
	if(res.data.length<12){
		isMoreData.value = false
	}
})


// 监听触底
onReachBottom(async ()=>{
	currentPageNum.value++
	const res = await getClassifyDetailList({classid:classifyId.value,pageNum:currentPageNum.value,pageSize:12})
	// 表示没有数据了
	if(res.data.length<12){
		isMoreData.value = false
		return
	}else{
		classifyDetailList.value.push(...res.data)
		uni.setStorageSync("storageClassifyList",classifyDetailList.value)
	}
})


onBeforeUnmount(()=>{
	uni.removeStorageSync("storageClassifyList")
})


</script>

<style lang="scss" scoped>
.classlist{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap:5rpx;
		padding:5rpx;
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}

}
.tip{
	text-align: center;
	width: 100vw;
	margin: 20rpx 0;
	color: #aaa;
}
.loading-layout{
	padding: 30rpx 0;
}
</style>
