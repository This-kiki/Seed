import service from "./request"

export default {
    // setservice() {
    //     service = axios.create(store.state.user.service)
    // },
    // 超级管理员查询普通管理员表
    getGeneralAdmin() {
        return service({
            url: '/admin/manager/get',
            method: 'get'
        })
    },
}