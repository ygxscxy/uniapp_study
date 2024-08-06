<template>
	<UserInfo @get-data="getData" ref="refSonComp" />
	<!-- open-type="reLaunch" 卸载当前页面然后跳转 -->
	<navigator url="/pages/home/home?name=zs&age=12" open-type="reLaunch">home</navigator>
	<view class="text">
		{{count}}
	</view>
</template>

<script setup>
	
	uni.showActionSheet({
		
		itemList: ['A', 'B', 'C'],
		success: function (res) {
			console.log(res);
			console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
		},
		fail: function (res) {
			console.log(res.errMsg);
		}
	});
	uni.showNavigationBarLoading()
	uni.setNavigationBarColor({
	    frontColor: '#ffffff',
	    backgroundColor: '#ff0000',
	    animation: {
	        duration: 400,
	        timingFunc: 'easeIn'
	    }
	})
	
		
</script>

<style lang="less">
	 
 view{
	 // 1 rpx = 0.5 px = 1 物理像素
	 // 举个例子：在iPhone6上，如果要绘制一个宽为100px，高为30px的盒子，换算成rpx单位，宽高分别为200rpx 和 60rpx
	 width: 100rpx; // 50px
	 
 }
</style>
