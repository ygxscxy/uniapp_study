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

export const getDownloadWall = async (classid,wallId,userScore)=>{
	const res = await dbRequest({
		url:"/downloadWall",
		data:{
			classid,
			wallId,
			userScore
		},
	})
	return res.data
}
export const getSimpleWallDetail = async (wallId)=>{
	const res = await dbRequest({
		url:"/detailWall",
		data:{
			id:wallId
		},
	})
	return res.data
}
