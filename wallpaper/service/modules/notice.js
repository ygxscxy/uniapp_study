// id	

import dbRequest from "../request/index.js"

export async function getNoticeDetail(id){
	const res = await dbRequest({url:"/wallNewsDetail",data:{
		id
	}})
	return res.data
}