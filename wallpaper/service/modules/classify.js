import dbRequest from "../request/index.js"

export async function getClassifyDetailList({classid,pageNum=1,pageSize=12}){
	const res = await dbRequest({url:"/wallList",data:{
		classid,
		pageNum,
		pageSize
	}})
	return res.data
}