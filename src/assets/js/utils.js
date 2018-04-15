import Ajax from "./ajax";

/**
 * @author : wenhao.huang
 * @date   : 2018/3/19
 * @project: utils.js
 */
// 指定排序的比较函数 - 升序
const UTIL = {
    compare(property,rev){
        return (o1,o2)=>{
            const v1 = o1[property],v2 = o2[property]
            if(rev == undefined || rev){
                return v1 - v2
            } else {
                return v2 - v1
            }
        }
    }
}


export default UTIL;

