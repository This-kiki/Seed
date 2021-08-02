import service from "./request"

export default {
    // setservice() {
    //     service = axios.create(store.state.user.service)
    // },
    // 管理员登陆
    userLogin(data) {
        return service({
            url: '/admin/manager/login',
            method: 'post',
            data: data
        })
    },
    // 超级管理员查询普通管理员表
    getGeneralAdmin() {
        return service({
            url: '/admin/manager/get',
            method: 'get'
        })
    },
}