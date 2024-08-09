<template>
	<view class="preview">
		<swiper circular :current="currentPicIndex" @change="swiperHandler">
			<swiper-item  v-for="(item,index) in storageClassifyList" :key="item._id">
				<image v-if="readImgsIndex.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="mask" v-if="maskState">
			<view class="goBack"  @click="goBack"
			:style="{top:getStatusBarHeight()+'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">{{currentPicIndex+1}} / {{storageClassifyList.length}}</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				
				<view class="box" @click="clickScore">
					<uni-icons type="star" :color="Boolean(curentImgInfo?.userScore)?'red':''" size="28"></uni-icons>
					<view class="text">{{curentImgInfo.score}}分</view>
				</view>
				
				<view class="box" @click="downloadHandler">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text user-select	selectable class="value">{{curentImgInfo._id}}</text>
						</view>
						
						<view class="row">
							<view class="label">分类：</view>
							<text class="value class">{{title}}</text>
						</view>
						
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">{{curentImgInfo.nickname}}</text>
						</view>
						
						<view class="row">
							<text class="label">评分：</text>
							<view class='value roteBox'>
								<uni-rate readonly touchable :value="curentImgInfo.score" size="16"/>
								<text class="score">{{curentImgInfo.score}}分</text>
							</view>
						</view>
						
						<view class="row">
							<text class="label">描述：</text>
							<view class='value'>
								{{curentImgInfo.description}}
							</view>
						</view>
						
						<view class="row">
							<text class="label">标签：</text>
							<view class='value tabs'>
								<view class="tab" key="item" v-for="item in curentImgInfo.tabs">{{item}}</view>
							</view>
						</view>	
											
						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱dbbemail@163.com，管理将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				
				<view class="content">
					<uni-rate v-model="userScore" allowHalf/>
					<text class="text">{{userScore}}分</text>
				</view>
				
				<view class="footer">
					<button @click="submitScore" :disabled="Boolean(curentImgInfo?.userScore)" type="default" size="mini" plain >
						{{Boolean(curentImgInfo?.userScore)?"已评分":"确认评分"}}
					</button>
				</view>
			</view>
		</uni-popup>
	
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {getStatusBarHeight} from "@/utils/system.js"
import {onLoad} from "@dcloudio/uni-app"

import {setPreviewScore} from "@/service/index.js"

const maskState =ref(true);
const infoPopup = ref(null);
const scorePopup = ref(null);
const userScore =ref(0)


const storageClassifyList = ref([])

const currentId = ref(null)

const currentPicIndex = ref(0)

const readImgsIndex = ref([])

const curentImgInfo = ref({})

const title = ref("")



onLoad((option)=>{
	currentId.value = option.id
	title.value = option.title
})

	
onMounted(()=>{
	storageClassifyList.value = uni.getStorageSync("storageClassifyList") || []
	storageClassifyList.value = storageClassifyList.value.map(item=>{
		return {
			...item,
			picurl:item.smallPicurl.replace("_small.webp",".jpg")
		}
	})
	currentPicIndex.value = storageClassifyList.value.findIndex(item=>item._id===currentId.value)
	
	readImgsIndex.value.push(
		currentPicIndex.value===0? storageClassifyList.value.length:currentPicIndex.value-1,
		currentPicIndex.value,
		currentPicIndex.value===storageClassifyList.value.length? 0: currentPicIndex.value+1,
	)
	curentImgInfo.value = storageClassifyList.value[currentPicIndex.value]
})


//点击info弹窗
const clickInfo = ()=>{
	infoPopup.value.open();
}

//点击关闭信息弹窗
const clickInfoClose = ()=>{
	infoPopup.value.close();
	
}

//评分弹窗
const clickScore=()=>{
	scorePopup.value.open();
	userScore.value = Number(curentImgInfo.value.score)
}

//关闭评分框
const clickScoreClose=()=>{
	scorePopup.value.close();
}

//确认评分
const submitScore= async ()=>{
	
	let {_id:wallId,classid,score} = curentImgInfo.value
	const res = await setPreviewScore(classid,wallId,score)
		
	if(res.errCode==0){
		uni.showToast({
			title:"评分成功",
			icon:"none"
		})
		storageClassifyList.value[currentPicIndex.value].userScore = userScore.value
		uni.setStorageSync("storageClassifyList",storageClassifyList.value)
	}else if(res.errCode==400){
		uni.showToast({
			title:res.errMsg,
			icon:"none"
		})
	}
	scorePopup.value.close();
}


//遮罩层状态
const maskChange = ()=>{
	maskState.value = !maskState.value
}


//返回上一页
const goBack= ()=>{
	uni.navigateBack()
}


const  swiperHandler = (e)=>{
	currentPicIndex.value = e.detail.current
	readImgsIndex.value.push(currentPicIndex.value===0? storageClassifyList.value.length:currentPicIndex.value-1,
		currentPicIndex.value,
		currentPicIndex.value===storageClassifyList.value.length? 0: currentPicIndex.value+1,)
	readImgsIndex.value = Array.from(new Set(readImgsIndex.value))
	
	curentImgInfo.value = storageClassifyList.value[currentPicIndex.value]
}

	
const downloadHandler = ()=>{
	// uni.saveImageToPhotosAlbum() H5不支持
	// #ifdef H5
	uni.showModal({
		content:"长按保存",
		showCancel:false
	})
	// #endif
	// #ifndef H5
		uni.showLoading({
			mask:true,
			title:"下载中..."
		})
		uni.getImageInfo({
			src:curentImgInfo.value.picurl,
			success:(res)=>{
				// res.path会生成一个临时的本地图片地址
				uni.saveImageToPhotosAlbum({
					// filePath 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
					filePath:res.path,
					fail:(err)=>{
						console.log(err);
						if(err.errMsg =="saveImageToPhotosAlbum:fail auth deny"){
							uni.showModal({
								title:"提示",
								content:"需要开启授权保存图片",
								success:res=>{
									if(res.confirm){
										// 用户误操作，导致授权失败，重新授权
										uni.openSetting({
											success:(setting)=>{
												console.log(setting);
												if(setting.authSetting["scope.writePhotosAlbum"]){
													uni.showToast({
														title:"获取授权成功",
														icon:"none"
													})
												}else{
													uni.showToast({
														title:"获取授权失败",
														icon:"none"
													})
												}
											}
										})
									}
								}
							})
						}else if(err.errMsg =="saveImageToPhotosAlbum:fail cancel"){
							uni.showToast({
								title:"保存失败，请重新点击下载",
								icon:"none"
							})
						}
					}
				})
			},
			complete:()=>{
				uni.hideLoading()
			},
			fail:(err)=>{
				uni.showToast({
					title:"图片保存失败",
					icon:"error"
				})
			}
		})
	// #endif
}
</script>

<style lang="scss" scoped>
.preview{
	width: 100%;
	height: 100vh;	
	position: relative;
	swiper{
		width: 100%;
		height: 100%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.mask{
		&>view{
			position: absolute;
			left:0;	
			margin:auto;
			color:#fff;			
			right:0;
			width: fit-content;
		}
		
		.goBack{
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 0;
			border-radius: 100px;
			top: 0;
			backdrop-filter: blur(10rpx);
			border:1rpx solid rgba(255,255,255,0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.count{			
			top:10vh;			
			background: rgba(0,0,0,0.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding:8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}
		.time{			
			font-size: 140rpx;
			top:calc(10vh + 80rpx);		
			font-weight: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}
		.date{
			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}
		.footer{
			background: rgba(255,255,255,0.8);
			bottom:10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color:#000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			backdrop-filter: blur(20rpx);
			.box{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding:2rpx 12rpx;				
				.text{
					font-size: 26rpx;
					color:$text-font-color-2;
				}
			}
		}
	}

	.popHeader{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title{
			color:$text-font-color-2;
			font-size: 26rpx;
		}
		.close{				
			padding:6rpx;
		}
	}


	.infoPopup{
		background: #fff;
		padding:30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;		
		scroll-view{
			max-height: 60vh;
			.content{
				.row{
					display: flex;
					padding:16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label{
						color:$text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value{
						flex:1;
						width:0;
					}
					.roteBox{
						display: flex;
						align-items: center;
						.score{
							font-size: 26rpx;
							color:$text-font-color-2;
							padding-left:10rpx;
						}
					}
					.tabs{
						display: flex;
						flex-wrap: wrap;
						.tab{
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}
					.class{
						color:$brand-theme-color;
					}				
					
				
				}
				
				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #F6F6F6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
				
			}
		}
	}

	.scorePopup{
		background: #fff;
		padding:30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.content{
			padding:30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				color: #FFCA3E;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}
		.footer{
			padding:10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

}
</style>
