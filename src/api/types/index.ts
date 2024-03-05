
export interface UserParams {
  username:string
  password:string
}

export interface ReviewParams {
  attId:number
  userId:number
  rating:number
  content:string
  image_paths:[]
}