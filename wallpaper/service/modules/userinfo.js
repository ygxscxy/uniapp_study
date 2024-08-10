// https://tea.qingnian8.com/api/bizhi/userInfo

import dbRequest from "../request/index.js"

export async function getUserInfo(){
	const res = await dbRequest({url:"/userInfo"})
	return res.data
}

// https://tea.qingnian8.com/api/bizhi/userWallList

// type	score	是	String	score我的评分，download我的下载
// pageNum	1	否	Number	第几页
// pageSize	9	否	Number	一页多少条
export async function getUserDownloadORScore({type,pageNum=1,pageSize=9}){
	const res = await dbRequest({url:"/userWallList",data:{
		type,
		pageNum,
		pageSize
	}})
	return res.data
}
