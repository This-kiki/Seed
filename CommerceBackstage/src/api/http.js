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
    // 添加普通管理员
    addGeneralAdmin(data) {
        return service({
            url: '/admin/manager/add',
            method: 'post',
            params: data
        })
    },
    // 删除普通管理员
    deleteGeneralAdmin(data) {
        return service({
            url: '/admin/manager/del',
            method: 'post',
            params: data
        })
    },
    // 获取所有活动
    getActivity(data) {
        return service({
            url: '/activity/list/' + data.current+'/20',
            method: 'get',
        })
    },
    // 发布活动
    addActivity(data) {
        return service({
            url: '/admin/activity/add',
            method: 'post',
            params: data
        })
    },
    // 编辑活动
    editActivity(data) {
        return service({
            url: '/admin/activity/updateAct',
            method: 'post',
            data: data
        })
    },
    // 删除活动
    deleteActivity(data) {
        return service({
            url: '/admin/activity/delAct',
            method: 'post',
            params: data
        })
    },
    // 获取所有活动申请
    getApplyActivity(data) {
        return service({
            url: '/admin/activity/apply_list/' + data.current+'/20',
            method: 'get',
        })
    },
    // 通过或驳回活动申请
    handleApplyActivity(data) {
        return service({
            url: '/admin/activity/updateApply',
            method: 'post',
            params: data
        })
    },
}