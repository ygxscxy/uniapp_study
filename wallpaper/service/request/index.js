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
			uni.hideLoading()
			resolve(res)
		}).catch(err=>{
			uni.showModal({
				title:"数据加载失败...",
			})
			reject(err)
		})
	})
}