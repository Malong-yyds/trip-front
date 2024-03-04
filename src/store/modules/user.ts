import { defineStore } from 'pinia';

export const useStore = defineStore('user', {
    state: () => ({
        token: null, // 存储 token 的状态
        username: null,
        isLoggedIn: false, // 存储用户是否登录的状态 
        userId:null
    }),
    actions: {
        // 登录成功时设置 token 和登录状态  
        loginSuccess(token: any, username: any,userId:any) {
            this.token = token;
            this.username = username
            this.isLoggedIn = true
            this.userId=userId 
            
        },
        // 登出时清除 token 和登录状态  
        logout() {
            this.token = null;
            this.username = null;
            this.isLoggedIn = false;
            this.userId=null
            
        },
    },

    // 持久化
    // persist 支持多种类型的值，默认将状态缓存在 localStorage 中，该 localStorage 的 key 为模块名
    persist:true
}

);