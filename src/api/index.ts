import request from '/@/service'
import type { ReviewParams, UserParams } from './types'

// 注册
export const register = (data: UserParams) => {
  return request<UserParams, any>({
    url: '/user/register', 
    method: 'POST', 
    data, 
  });
}

// 登录
export const login = (data: UserParams) => {
  return request<UserParams, any>({
    url: '/user/login', 
    method: 'POST', 
    data, 
  });
}


export const attractionSearch=(q:string,page:number,pageSize:number)=>{
  return request<number,any>({
    url: '/attraction/search'+'?page='+page+'&pageSize='+pageSize+'&q='+q, 
    method: 'GET', 
  })
}

// detail   
export const attractionDetail=(attId:number)=>{
  return request<number,any>({
    url: '/attraction/detail?attId='+attId, 
    method: 'GET', 
    // params:attId, 
    
  })
}

// 用户评价
export const attractionReviews=(attId:number,page:number,pageSize:number)=>{
  return request<number,any>({
    url: '/review/detail'+'?page='+page+'&pageSize='+pageSize+'&attId='+attId, 
    method: 'GET', 
  })
}

// like    
export const reviewLike=(reviewId:number)=>{
  return request<number,any>({
    url: '/review/like', 
    method: 'POST', 
    data:reviewId,
   
  })
}

// addreview
export const postReview=(data:ReviewParams)=>{
  return request<any,any>({
    url: '/review/add', 
    method: 'POST', 
    data,
    headers:{
      'Content-Type':'multipart/form-data'
    }
  })
}

export const userRecommend=(userId:number)=>{
  return request<number,any>({
    url: '/recommender/user?userId='+userId, 
    method: 'GET', 
    
  })
}


export const popularRecommend=()=>{
  return request<number,any>({
    url: '/recommender/popular', 
    method: 'GET',
    
  })
}


export const getFood=(attId:number)=>{
  return request<number,any>({
    url: '/attraction/detail/food?attId='+attId, 
    method: 'GET', 
    
  })
}

export const getNearAtt=(attId:number)=>{
  return request<number,any>({
    url: '/attraction/detail/att?attId='+attId, 
    method: 'GET', 
    
  })
}

export const groupRemmend=(groupId:number)=>{
  return request<number,any>({
    url: '/group?groupId='+groupId, 
    method: 'GET', 
    
  })
}