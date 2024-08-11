<template>
	<view class="searchLayout">
		<view class="search">
			<uni-search-bar 
			@confirm="onSearch"
			@cancel="onClear"
			@clear="onClear"
			focus 
			placeholder="搜索"
			v-model="queryParams.keyword">
			</uni-search-bar>
		</view>
		
		
		<view v-if="!searchResultList.length||noSearch">
			<view class="history" v-if="historySearch.length">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{tab}}</view>		
				</view>
			</view>
			
			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>				
				</view>
				<view class="tabs">				
					<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>
		</view>
		
		
		<view class="noSearch" v-if="searchResultList.length==0&&noSearch==true">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>
		
		<!-- id=6535e92ea09a9bd1a4b82bd7&title=每日精选 -->
		<view v-else>
			<view class="list">
				<navigator :url="`/pages/preview/preview?title=${queryParams.keyword}&id=${item._id}`"  class="item" 
				v-for="item in searchResultList" :key="item._id">				
					<image :src="item.smallPicurl" mode="aspectFill"></image>				
				</navigator>
			</view>		
			<view class="loadingLayout" v-if="noData || searchResultList.length"><uni-load-more :status="noData?'noMore':'loading'"/></view>
		</view>
		
		
	</view>
</template>

<script setup>
import {ref} from "vue";
import {onLoad,onUnload,onReachBottom} from "@dcloudio/uni-app";
import { getSearchData } from "../../service";

//查询参数
const queryParams = ref({	
	pageNum:1,
	pageSize:12,
	keyword:""
})

//搜索历史词
const historySearch = ref(['搜索词1','搜索词2','搜索词3','搜索词4']);

//热门搜索词
const recommendList = ref(["美女","帅哥","宠物","卡通"]);

//没有更多
const noData = ref(false);
//没有搜索结果
const noSearch = ref(false);

const searchResultList = ref([])

//搜索结果列表
// const classList = ref([
// 	{_id:123123,smallPicurl:'https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231102/1698905562410_0_small.webp'}
// ]);

onLoad(()=>{
	historySearch.value = uni.getStorageSync("historySearch") || []
})


//点击搜索
const onSearch = ()=>{
	initParams()
	historySearch.value = Array.from(new Set([queryParams.value.keyword,...historySearch.value]))
	uni.setStorageSync("historySearch",historySearch.value)
	getSearchByKeyword()
}

// 发送网络请求
const getSearchByKeyword = async ()=>{
	const res = await  getSearchData({keyword:queryParams.value.keyword,pageNum:queryParams.value.pageNum})
	searchResultList.value = [...searchResultList.value,...res.data]
	uni.setStorageSync("storageClassifyList",searchResultList.value)
	if(queryParams.value.pageSize>res.data.length){
		noData.value = true
	}
	if(res.data.length==0){
		noSearch.value = true
	}
	
	if(historySearch.value.length>10){
		historySearch.value.pop()
	}
}

// 每次不同种类的请求之间都是相互独立的，互不干扰
const initParams = ()=>{
	searchResultList.value = []
	queryParams.value = {	
		pageNum:1,
		pageSize:12,
		keyword:queryParams.value.keyword
	}
	noData.value = false
	noSearch.value = false
}

//点击清除按钮
const onClear = ()=>{
	initParams()
}


//点击标签进行搜索
const clickTab = (value)=>{
	initParams()
	queryParams.value.keyword = value
	historySearch.value = Array.from(new Set([queryParams.value.keyword,...historySearch.value]))
	getSearchByKeyword()
}


//点击清空搜索记录
const removeHistory = ()=>{
	uni.showModal({
		title:"是否清空历史搜索？",
		success:res=>{
			if(res.confirm){
				uni.removeStorageSync("historySearch")
				historySearch.value = []	
			}
		}
	})
}

//触底加载更多
onReachBottom(()=>{
	if(noData.value) return;
	queryParams.value.pageNum++
	getSearchByKeyword()
})

//关闭有页面
onUnload(()=>{
	uni.removeStorageSync("storageClassifyList")
})


</script>

<style lang="scss" scoped>
.searchLayout{
	.search{
		padding:0 10rpx;
	}
	.topTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color:#999;
	}
	.history{
		padding:30rpx;		
	}
	.recommend{
		padding:30rpx;
	}
	.tabs{
		display: flex;		
		align-items: center;
		flex-wrap: wrap;
		padding-top:20rpx;
		.tab{
			background: #F4F4F4;
			font-size: 28rpx;
			color:#333;
			padding:10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
	}	
	.list{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding:20rpx 5rpx;		
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
</style>
