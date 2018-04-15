import axios from 'axios'
import qs from 'qs'

const Ajax = {}

Ajax.install = (Vue) => {
    const self = new Vue()
    Vue.prototype.$ajax = (options, successFn) => {
        const api = '/Nivana.beta/' + options.api
        let params = options.params ? options.params : {}
        if(options.type == 1){
            params['userId'] = localStorage.getItem('userId')
        } else if(options.type == 2){
            params['userId'] = localStorage.getItem('userId')
            params['accessToken'] = localStorage.getItem('accessToken')
        } else if(options.type != 0) {
            params['userId'] = localStorage.getItem('userId')
            params['accessToken'] = localStorage.getItem('accessToken')
            params['orgId'] = localStorage.getItem('orgId')
        }
        params = qs.stringify(params)
        axios.post(api,params)
            .then((response) => {
                const data = response.data
                if (!data.retCode || data.retCode == "ACK") {
                    successFn(data)
                } else if (data.retCode == "FAT") {
                    self.$msg(data.retDescription)
                } else if(data.retCode == "UER") {
                    window.location.hash = '#/login?r=' + window.location.hash;
                } else {
                    self.$msg(data.retDescription)
                }
            })
    }
    Vue.prototype.$login = (options,successFn)=>{
        const api = '/Nivana.beta/loginWeb'
        const params = qs.stringify(options)
        axios.post(api,params)
            .then((response) => {
                const data = response.data
                if (!data.retCode || data.retCode == "ACK") {
                    localStorage.setItem("userId", data.userID);
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("userName",data.userName);
                    successFn(data)
                } else {
                    self.$msg(data.retDescription)
                }
            })
    }
}
export default Ajax;
