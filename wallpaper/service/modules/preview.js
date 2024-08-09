import dbRequest from "../request/index.js"

export const setPreviewScore = async (classid,wallId,userScore)=>{
	const res = await dbRequest({
		url:"/setupScore",
		data:{
			classid,
			wallId,
			userScore
		},
	})
	return res.data
}