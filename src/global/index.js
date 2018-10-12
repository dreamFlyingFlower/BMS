// jshint esversion:6
// jshint node:true
import Vue from 'vue';
import service from '@/utils/service';
import { Message } from 'element-ui';
/**
 * vue全局定参,全局方法,只能在vue的环境中使用,其他环境无法使用
 * 每个属性或方法前都加上$,不然维护或查找代码的必然要打debugger
 * 在vue中使用方法:this.$global.....
 */
export default {
  install(Vue){
    // 不会改变的全局对象
    Vue.prototype.$global = {
      baseUrl: "http://192.168.1.170:5558/",
      timeout: 6000,
      loadingTime: 3000
    }
    // 往sessionStorage中存值
    Vue.prototype.$setSession = (key,val) =>{
      if(!typeof key === "string"){
        console.log("key only string type");
        return;
      }
      if(typeof val === "string"){
        sessionStorage.setItem(key,val);
      }else{
        sessionStorage.setItem(key,JSON.stringify(val));
      }
    }
    // 获得session中的值,先json.parse下,若是解析成功,表明是对象,直接返回;若是解析失败,则直接返回
    Vue.prototype.$getSession = (key) =>{
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch (error) {
        return sessionStorage.getItem(key);
      }
    }
    // 共用新增,prefix是页面的接口前缀,对应接口的前缀.如user/login,则prefix是user
    // 非共用方法写在api的各自类中
    Vue.prototype.$save = (prefix,params)=>{
      return service({
        url:`${prefix}/save`,
        method:"post",
        data:JSON.stringify(params)
      })
    }
    // 删除表主键为数字类型的数据
    Vue.prototype.$remove = (prefix,id)=>{
      return service({
        url:`${prefix}/remove/${id}`
      });
    }
    // 删除表主键类型为字符串的数据
    Vue.prototype.$removeName = (prefix,name)=>{
      return service({
        url:`${prefix}/removeName/${name}`
      });
    }
    // ids直接传一个数字数组即可,不是对象里面塞个数组
    Vue.prototype.$removes = (prefix,ids)=>{
      return service({
        url:`${prefix}/removes/${ids}`
      });
    }
    // names直接传字符串数组即可,不是对象里面塞个数组
    Vue.prototype.$removeNames = (prefix,names)=>{
      return service({
        url:`${prefix}/removes/${names}`
      });
    }
    // 全字段修改,只用来修改表中所有字段的时候才用,若修改单个字段,写在api对应的js中
    Vue.prototype.$modify = (prefix,params) => {
      return service({
        url:`${prefix}/modify`,
        method:"post",
        data:JSON.stringify(params)
      });
    }
    // 根据id获得详情,id为表的主键,整型
    Vue.prototype.$getById = (prefix,id) => {
      return service({
        url:`${prefix}/getById/${id}`
      });
    }
    // 根据name获得详情,name为表的主键,字符串类型
    Vue.prototype.$getByName = (prefix,name) => {
      return service({
        url:`${prefix}/getByName/${name}`
      });
    }
    // 文件上传,未测试
    Vue.prototype.$upload = (prefix,files,params) =>{
      let formData = new FormData();
      formdata.append("file",files);
      if(!typeof params === "object"){
        console.log("参数错误,只能是对象");
      }
      let entrys = Object.entries(params);
      for(let [key,val] of entrys){
        formdata.append(key,val);
      }
      return service({
        url:`${prefix}/upload`,
        method:"post",
        contentType:false,
        data:formdata
      });
    }
  }
}