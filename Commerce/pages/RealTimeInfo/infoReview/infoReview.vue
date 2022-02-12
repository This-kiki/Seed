<template>
	<view>
		<view class="reply-page" v-if="actComment">
			<view class="reply-close-box">
				<view class="reply-num">
					{{ actCommentReply.length }}条评论回复
				</view>
			</view>
			<view class="comment-item" style="border-bottom: 1rpx solid #e8e8e8;">
				<div v-if="actComment.img" class="comment-item-head"
					:style="'background-image: url(' + actComment.img + ');'"></div>
				<div v-if="!actComment.img" class="comment-item-head"
					style="background-image: url('../../../static/img/head.webp');"></div>
				<view class="comment-text" style="border: none">
					<view class="comment-item-user">{{ actComment.name?actComment.name:'游客' }}</view>
					<view class="comment-item-content">{{ actComment.content }}</view>
					<view class="comment-item-tile">
						<view class="comment-item-time">{{ formatMsgTime(actComment.createTime) }}</view>
					</view>
				</view>
			</view>
			<view class="comment-list">
				<view class="comment-all">
					{{ actCommentReply.length==0?'暂无评论回复':'全部回复' }}
				</view>
				<view class="comment-item" v-for="(item,index) in actCommentReply" :key="index">
					<div v-if="item.img" class="comment-item-head" :style="'background-image: url(' + item.img + ');'">
					</div>
					<div v-if="!item.img" class="comment-item-head"
						style="background-image: url('../../../static/img/head.webp');"></div>
					<view class="comment-text">
						<view class="comment-item-user">{{ item.name?item.name:'游客' }}</view>
						<view class="comment-item-content">{{ item.content }}</view>
						<view class="comment-item-tile">
							<view class="comment-item-time">{{ formatMsgTime(item.createTime) }}</view>
							<span class="iconfont comment-item-delete" v-if="judgeDelete(item.openId)"
								v-on:click.stop="deletemodel(item.id)">&#xe608;</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 回复评论框 -->
		<view class="reply-box">
			<view class="reply-box-input" @tap="showReview2">
				<span class="iconfont reply-box-text">&#xe615;</span>
				<span class="reply-box-text">写回复...</span>
			</view>
		</view>
		<u-modal :showCancelButton="true" :show="show" title="是否删除" @cancel="show=false" @confirm="deleteComment2"></u-modal>
		<ygc-comment ref="ygcComment2" :placeholder="'回复评论'" @pubComment="pubComment2"></ygc-comment>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actComment: null,
				actCommentReply: null,
				show: false,
				infoId: null,
				deleteAPI: null
			}
		},
		methods: {
			formatMsgTime(timespan) {
				var time = timespan.replace(new RegExp(/-/gm), "/");
				var dateTime = new Date(time); // 将传进来的字符串或者毫秒转为标准时间
				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				// var hour = dateTime.getHours()
				// var minute = dateTime.getMinutes()
				// var second = dateTime.getSeconds()
				var millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
				var now = new Date(); // 获取本机当前的时间
				var nowNew = now.getTime(); // 将本机的时间转换为毫秒
				var milliseconds = 0;
				var timeSpanStr;
				milliseconds = nowNew - millisecond;
				if (milliseconds <= 1000 * 60 * 1) {
					// 小于一分钟展示为刚刚
					timeSpanStr = '刚刚';
				} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
					// 大于一分钟小于一小时展示为分钟
					timeSpanStr = Math.round(milliseconds / (1000 * 60)) + ' 分钟前';
				} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
					// 大于一小时小于一天展示为小时
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + ' 小时前';
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
					// 大于一天小于十五天展示位天
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + ' 天前';
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
					timeSpanStr = month + '-' + day;
				} else {
					timeSpanStr = year + '-' + month + '-' + day;
				}
				return timeSpanStr;
			},
			judgeDelete(openid) {
				var myOpenid = uni.getStorageSync("openid")
				// console.log(myOpenid + '==' + openid)
				if (openid === myOpenid) {
					return true
				} else {
					return false
				}
			},
			deletemodel(id) {
				this.deleteAPI = {
					id: id,
				}
				this.show = true
			},
			deleteComment2(id) {
				this.show = false
				this.$api.deleteReply(this.deleteAPI).then((res) => {
					if (res.success) {
						let getAPI2 = {
							commentId: this.actComment.id
						}
						this.$api.getReply(getAPI2).then((res) => {
							this.actCommentReply = res.data.comments
							// console.log(res)
						})
					}
				})
			},
			showReview2() {
				this.$refs.ygcComment2.toggleMask('show');
			},
			pubComment2(content) {
				let getAPI = {
					infoId: this.infoId,
					content: content,
					commentId: this.actComment.id
				}
				// console.log(getAPI)
				this.$api.postReply(getAPI).then((res) => {
					// console.log(res)
					if (res.success) {
						this.$refs.ygcComment2.toggleMask();
						let getAPI2 = {
							commentId: this.actComment.id
						}
						this.$api.getReply(getAPI2).then((res) => {
							this.actCommentReply = res.data.comments
							// console.log(res)
						})
					} else {
						uni.showToast({
							title: res.message,
							duration: 1000,
							icon: 'none'
						});
					}
				})
			},
		},
		onLoad: function(options) {
			var obj = JSON.parse(decodeURIComponent(options.obj))
			//  testObj:本js文件中的对象
			this.actComment = obj
			this.infoId = options.infoId
			let getAPI = {
				commentId: obj.id
			}
			this.$api.getReply(getAPI).then((res) => {
				this.actCommentReply = res.data.comments
				// console.log(res)
			})
		}
	}
</script>

<style>
	.white-bord {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		font-size: 40rpx;
	}

	.comment {
		width: 100%;
		margin-bottom: 100rpx;
	}

	.comment-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.comment-reviewnum {
		font-size: 28rpx;
		font-weight: 700;
		margin-left: 50rpx;
	}

	.comment-fabulousnum {
		font-size: 24rpx;
		margin-right: 50rpx;
		color: rgb(153, 153, 153);
	}

	.comment-list {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 40rpx;
	}

	.comment-all {
		letter-spacing: 3rpx;
		font-size: 26rpx;
		color: #717171;
		margin: 0 0rpx 20rpx 20rpx;
	}

	.comment-item {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		padding: 8rpx 0;
	}

	.comment-item-head {
		height: 8vw;
		width: 8vw;
		border-radius: 500rpx;
		margin: 0 10rpx;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		ovrflow: hidden;
	}

	.comment-text {
		width: 85vw;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-bottom: 15rpx;
	}

	.comment-item-user {
		font-size: 28rpx;
		font-weight: 700;
		margin-bottom: 10rpx;
		letter-spacing: 5rpx;
	}

	.comment-item-content {
		font-size: 27rpx;
	}

	.comment-item-tile {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20rpx;
	}

	.comment-item-reply {
		width: 130rpx;
		height: 45rpx;
		border-radius: 30rpx;
		background-color: rgb(246, 246, 246);
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 30rpx;
	}

	.comment-item-reply-text {
		font-size: 22rpx;
		color: rgb(35, 35, 35);
		margin-bottom: 4rpx;
		letter-spacing: 2rpx;
	}

	.comment-item-to {
		font-size: 25rpx;
		color: rgb(35, 35, 35);
	}

	.comment-item-time {
		font-size: 25rpx;
		color: rgb(152, 152, 152);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.comment-item-delete {
		font-size: 28rpx;
		position: absolute;
		right: 40rpx;
	}

	.comment-item:active {
		background-color: rgb(247, 247, 247);
	}

	.reply-close-box {
		height: 80rpx;
		background-color: #ffffff;
		border-bottom: 1rpx solid #e8e8e8;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.reply-close {
		font-size: 35rpx;
		margin-left: 15rpx;
	}

	.reply-num {
		width: 100%;
		font-size: 25rpx;
		letter-spacing: 5rpx;
		text-align: center;
	}

	.reply-box {
		position: fixed;
		bottom: 0rpx;
		z-index: 10;
		background-color: rgb(255, 255, 255);
		width: 100%;
		height: 90rpx;
		border-bottom: 1rpx solid #e8e8e8;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.reply-box-input {
		width: 90%;
		height: 60rpx;
		border-radius: 10rpx;
		background-color: rgb(241, 241, 241);
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.reply-box-text {
		font-size: 26rpx;
		color: rgb(172, 172, 172);
		margin-left: 20rpx;
	}
</style>
