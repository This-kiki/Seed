export default {
	data() {
		return {
			share: {
				title: "濠江珠浦种子会",
			}
		}
	},
	created() {},
	onShareAppMessage(res) { //发送给朋友
		let pages = getCurrentPages()
		// console.log(pages)
		let path = pages[pages.length - 1].$page.fullPath
		return {
			title: this.share.title,
			path,
		}
	},
	onShareTimeline(res) { //分享到朋友圈
		let pages = getCurrentPages()
		// console.log(pages)
		let path = pages[pages.length - 1].$page.fullPath
		return {
			title: this.share.title,
			path,
		}
	},
}
