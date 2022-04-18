
import  request from "../utils/request"
import axios from "axios"
// import store from "../store"

// 登录
export const login = data =>{
    return request({
         method:"POST",
         url:"/v1_0/authorizations",
         data,
        
    })
}

// 手机验证码
export const sendSms = mobile =>{
    return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户信息
export const getUserinfo= ()=>{
    return request({
        method:'GET',
        url:`/v1_0/user`,
        // headers:{  // 由于多个 请求需要配置  所以 使用拦截器 统一配置  header-token
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}

// 获取 my 频道列表

export const getData= ()=>{
    return request({
        method:'GET',
        url:`/v1_0/user/channels`,
    })
}

// 获取所有 频道列表

export const getAllChannels= () =>{
    return request({
        method:'GET',
        url:`/v1_0/channels`,
        
    })
}

// 添加用户频道
export const addUserChannels= channel =>{
    return request({
        method:'PATCH',
        url:`/v1_0/user/channels`,
        data:{
            channels:[channel]
        }
    })
}

//  删除用户自己频道
export const deleteUserChannels= id =>{
    return request({
        method:'DELETE',
        url:`/v1_0/user/channels/${id}`,
        // data:{
        //     channels:[id]
        // }
    })
}

//获取联想搜搜数据

export const searchContent = q =>{
    return request({
        method:"GET",
        url:"/v1_0/suggestion",
        params:{
            q
        }
    })
}

export const searchGooGeContent = q =>{
    return axios({
        method:"GET",
        // withCredentials:true,
        // headers:{'X-Requested-With': 'XMLHttpRequest'},
        url:"https://suggest.taobao.com/sug?area=etao&code=utf-8&callback=search_data",
        params:{
            q
        }
    })
}

// 获取搜索之后的数据
export const searchResult = params =>{
    return request({
        method:"GET",
        url:"/v1_0/search",
        params,
    })
}
// 用户收藏
export const addShoucang= target =>{
    return request({
        method:'POST',
        url:`/v1_0/article/collections`,
        data:{
            target
        }
        
        
    })
}

// 用户取消收藏
export const delShoucang= target =>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/collections/${target}`,
        
        
    })
}


// 用户点赞
export const addLike= target =>{
    return request({
        method:'POST',
        url:`/v1_0/article/likings`,
        data:{
            target
        }
        
        
    })
}

// 用户取消点赞
export const delLike= target =>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/likings/${target}`,
        
        
    })
}
 /**
 * 用户个人信息获取
 */
  export const addusermessage = () => {
    return request({
      method: 'GET',
      url: '/v1_0/user/profile',
      
    })
  }

/**
 * 更改用户个人信息
 */
export const changeusermessage = (data) => {
    return request({
      method: 'PATCH',
      url: '/v1_0/user/profile',
      data
      
    })
  }

/**
 * 更改用户个人信息 头像
 */
 export const updateUserPhoto = (data) => {
    return request({
      method: 'PATCH',
      url: "/v1_0/user/photo",
      data
      
    })
  }


