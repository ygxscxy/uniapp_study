<template>
  <view class="classify-layout pageBg"> 
		<view class="content">
			<theme-item v-for="item in 15" :key="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="less" scoped>
	
	.content{
		margin-top: 30rpx;
		display: grid;
		gap: 15rpx;
		grid-template-columns: repeat(3,1fr);
	}
</style>
