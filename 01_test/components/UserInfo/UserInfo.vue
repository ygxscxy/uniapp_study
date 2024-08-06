<template>
	<view>
		user-info
		<button type="primary" @click="sendData">传递数据</button>
	</view>
</template>

<script setup lang="ts">
		import {ref} from "vue"
		const info = ref({name:"zs",age:12})
		
		const emit = defineEmits(["get-data"])
		const sendData = ()=>{
			emit("get-data",info)
		}
		
		defineExpose({
			sendData,
			info
		})
</script>

<style lang="less" scoped>

</style>