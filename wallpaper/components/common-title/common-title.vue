<template>
	<view class="title">
		<view class="left">
			<slot name="name">名称</slot>
		</view>
		<view class="right">
			<slot name="custom">more</slot>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	
.title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	.left{
		font-size: 40rpx;
	}
}
</style>