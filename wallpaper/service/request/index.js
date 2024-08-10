import { BASE_URL } from "../config"

export default function(config){
	return new Promise((resolve,reject)=>{
		const {url} = config
		uni.showLoading({
			title:"loading..."
		})
		uni.request({
			...config,
			url:BASE_URL+url
		}).then(res=>{
			if(res.data.errCode==400){
				uni.showModal({
					title:"数据加载失败...",
					content:res.data.errMsg,
					showCancel:false
				})
				uni.hideLoading()
			  return;
			}
			uni.hideLoading()
			resolve(res)
		}).catch(err=>{
			uni.showModal({
				title:"数据加载失败...",
			})
			uni.hideLoading()
			reject(err)
		})
	})
}