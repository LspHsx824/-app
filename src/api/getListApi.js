

import request from "../utils/request"


// export const getArticleList = (id,time) =>{
//     return request.get('/v1_0/articles',{
//         params:{
//             channel_id: id, // 频道的 Id
//             timestamp: time // 时间戳
//         }
//     })
// }

export const getArticleList = params =>{
    return request.get('/v1_0/articles',{
        params,
    })
}


// 获取文章详情

export const getArticleById = articleId =>{
    return request({
        method:"GET",
        url:`/v1_0/articles/${articleId}`
    })
}

// 用户关注
export const addFollow= target =>{
    return request({
        method:'POST',
        url:`/v1_0/user/followings`,
        data:{
            target
        }
        
    })
}

// 用户取消关注
export const cancelFollow= target =>{
    return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${target}`,
        
        
    })
}


// export const addFollow = target =>{
//     return request({
//         method:"POST",
//         url:"/v1_0/user/followings",
//         data:{
//             target
//         }
//     })
// }
// export const cancelFollow = target =>{
//     return request({
//         method:"DELETE",
//         url:`/v1_0/user/followings/${target}`,
//     })
// }