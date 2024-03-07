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

export const attractionSearch=(q:string)=>{
  return request<number,any>({
    url: '/attraction/search', 
    method: 'GET', 
    params:q, 
  })
}

// detail   
export const attractionDetail=(attId:number)=>{
  return request<number,any>({
    url: '/attraction/detail', 
    method: 'GET', 
    params:attId, 
    
  })
}

// 用户评价
export const attractionReviews=(attId:number)=>{
  return request<number,any>({
    url: '/review/detail', 
    method: 'GET', 
    params:attId, 
    
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
    url: '/recommender/user', 
    method: 'GET', 
    params:userId, 
    
  })
}


export const popularRecommend=()=>{
  return request<number,any>({
    url: '/recommender/popular', 
    method: 'GET',
    
  })
}