import router from './router/router.js';
import store from './store';
import {
    Notification
} from 'element-ui';



import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import {
    getToken
} from './utils/auth'; // get token from cookie
// import getPageTitle from './utils/get-page-title';

NProgress.configure({
    showSpinner: false
}); // 进度条

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // 开始进度条
    NProgress.start();
    // 设置标题
    // document.title = getPageTitle(to.meta.title);

    if (getToken()) {
        if (to.path == '/login') {
            // if is logged in, redirect to the home page
            next();
            NProgress.done();
        } 
        // else if(to.path == '/index/superadmin'){
        //     next()
        // } 
        else {
            next();
        }
    } else {
        /* has no token*/
        console.log('no token')
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
