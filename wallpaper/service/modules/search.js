// https://tea.qingnian8.com/api/bizhi/

import dbRequest from "../request/index.js"

export async function getSearchData({keyword,pageNum=1,pageSize=12}){
	const res = await dbRequest({url:"/searchWall",data:{
		keyword,
		pageNum,
		pageSize
	}})
	return res.data
}