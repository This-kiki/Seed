import store from '../store/index.js'

function request(options) {
    return new Promise((res,rej) =>{
		uni.uploadFile({
			url: 'http://47.116.130.99:21587/seed/oss/uploadImag', //仅为示例，非真实的接口地址
			header: {
				"openid": store.state.openid
			},
			filePath: options.data.tempFilePaths[0],
			name: 'file',
			success: (uploadFileRes) => {
				var obj = JSON.parse(uploadFileRes.data);
				res(obj)
			},
			fail() {
			    rej()
			}
		});
    })
}
 
// export default request
export const uploadPic = request
