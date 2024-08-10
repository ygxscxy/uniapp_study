import dbRequest from "../request/index.js"

export const getBannerList = async ()=>{
	const res = await dbRequest({url:"/homeBanner"})
	return res.data
}

export const getEachDayRecommendList = async ()=>{
	const res = await dbRequest({url:"/randomWall"})
	return res.data
}

export const getNoticeList = async ()=>{
	const res = await dbRequest({
		url:"/wallNewsList"
	})
	res.data.data = res.data.data.filter(item=>{
		return item.select === false
	})
	return res.data
}


export const getSpecialSubjectList = async (pageSize=8)=>{
	const res = await dbRequest({url:"/classify",data:{
		pageSize
	}})
	return res.data
}