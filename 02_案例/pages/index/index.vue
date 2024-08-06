<template>
	<view class="container">
		<view class="item" v-for="(item,index) in pets" :key="item._id">
			<image lazy-load @click="previewImage(index)" :src="item.url" mode="widthFix"></image>
			<view class="bottom">
				<view class="content"><text>{{item.content}}</text></view>
				<view class="author"><text>--{{item.author}}</text></view>
			</view>
		</view>
			<view class="fixed-box">
				<view class="refresh" @click="refreshHandler">
					刷新
					<uni-icons type="contact" size="30"></uni-icons>
				</view>
				<view class="back" @click="backHandler">
					顶部
				</view>
		</view>
	</view>

</template>

<script setup>
	import {computed, ref} from "vue"
	import {onLoad,onReachBottom,onPullDownRefresh} from "@dcloudio/uni-app"
	
	const pets = ref([])
	
	const getListDataPets = async ()=>{
		uni.showLoading({
			title:"数据加载中..."
		})
		try{
			const res= await uni.request({
				url:"https://tea.qingnian8.com/tools/petShow",
				data:{
					size:10
				}
			})
			uni.hideLoading()
			uni.stopPullDownRefresh()
			return res.data
		}catch(err){
			uni.hideLoading()
			uni.stopPullDownRefresh()
			uni.showToast({
				title:"请求失败",
				icon:"error"
			})
			return []
		}
	}
	
	onLoad(()=>{
		getListDataPets().then(res=>{
			pets.value = res.data
		})
	})
	
	onReachBottom(()=>{
		getListDataPets().then(res=>{
			pets.value.push(...res.data)
		})
	})
	onPullDownRefresh(()=>{
		getListDataPets().then(res=>{
			pets.value = res.data
		})
	})
	
	const imgs_urls = computed(()=>{
		return pets.value.map((item,index)=>{
			return item.url
		})
	})
	
	const previewImage = (index)=>{
			uni.previewImage({
						current:index,
						urls: imgs_urls.value,
						
			});
	}
	
	const refreshHandler = ()=>{
		uni.startPullDownRefresh()
	}
	
		
	const backHandler = ()=>{
		uni.pageScrollTo({
			scrollTop:0,
			
		})
	}
	
</script>

<style lang="less">
		
	body{
	}
.container{
	width: 80vw;
	margin: 0 auto;
	margin-bottom: env(safe-area-inset-bottom);
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	
	.item{
		background-color: #fff;
		box-shadow: 0 10rpx 40rpx rgba(0,0,0,0.08);
		margin: 20rpx 0;
		.bottom{
			padding: 20rpx;
			.author{
				margin: 10rpx 0;
				right:10rpx;
				text-align: right;
			}
		}
	
	}
	.fixed-box{
			position: fixed;
			bottom: 80rpx;
			right: 30rpx;
			padding: 20rpx;
			color: #fff;
			z-index: 10;
			
				
			.back,.refresh{
				background-color: #aaa;
				padding: 20rpx;
				border-radius: 20rpx;
			}
			.back{
				margin-top: 10rpx;
				
			}
		}
}

</style>
