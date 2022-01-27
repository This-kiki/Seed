<template>
	<view class="mainContaienr">
		<view class="white-bord" v-if="!dataForm">加载中</view>
		<view v-if="dataForm">
			<view class="top-head">
				<view class="top-head-headimg">
					
				</view>
				<!-- <view class="top-head-headimg" :style="'background-image: url('+item.img+');'"></view> -->
				<view class="top-head-author">
					<view class="top-head-author-name oneline">
						<!-- {{ item.name }} -->
						aaaa
					</view>
					<view class="top-head-author-identity oneline">
						<!-- {{ getLevel(item.identity,item.subLevel) }} -->
						bbbbbb
					</view>
				</view>
			</view>
			<view class="info-title">{{ dataForm.title }}</view>
			<!-- <view class="collect-box">
				<view :style="'color:' + praiseColor + ';'" class="iconfont collect-icon" @click="praise">&#xe64e;
				</view>
				<view :style="'color:' + collectColor + ';'" class="iconfont collect-icon" @click="collect">&#xe616;
				</view>
				<button open-type="share" class="iconfont share-icon" @click="shareInfo"> &#xe747;</button>
			</view> -->
			<view class="info-content" v-html="dataForm.content"></view>
			<!-- 评论 -->
			<view class="comment">
				<view class="comment-head">
					<view class="comment-reviewnum">评论 {{ commentForm.length }}</view>
					<view class="comment-fabulousnum">{{ dataForm.view }} 浏览</view>
				</view>
				<!-- 所有评论列表 -->
				<view class="comment-list">
					<!-- 某个评论 -->
					<view class="comment-item" @click="showReply(item)" v-for="(item,index) in commentForm"
						:key="index">
						<div v-if="item.img" class="comment-item-head"
							:style="'background-image: url(' + item.img + ');'"></div>
						<div v-if="!item.img" class="comment-item-head"
							style="background-image: url('../../../static/img/head.webp');"></div>
						<view class="comment-text">
							<view class="comment-item-user">{{ item.name?item.name:'游客' }}</view>
							<view class="comment-item-content">{{ item.content }}</view>
							<view class="comment-item-tile">
								<view class="comment-item-reply">
									<span
										class="comment-item-reply-text">{{ item.replyNum==0?'':item.replyNum }}回复</span>
									<span class="iconfont comment-item-to">&#xe623;</span>
								</view>
								<view class="comment-item-time">{{ formatMsgTime(item.createTime) }}</view>
								<span class="iconfont comment-item-delete" v-if="judgeDelete(item.openId)"
									v-on:click.stop="deleteComment(item.id)">&#xe608;</span>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 100rpx;">

				</view>
			</view>
		</view>
		<!-- 评论框 -->
		<view class="reply-box">
			<view class="reply-box-input" @tap="showReview" style="width: 60%;">
				<span class="iconfont reply-box-text">&#xe615;</span>
				<span class="reply-box-text">写回复...</span>
			</view>
			<view class="collect-box">
				<view :style="'color:' + praiseColor + ';'" class="iconfont collect-icon" @click="praise">&#xe64e;
				</view>
				<view :style="'color:' + collectColor + ';'" class="iconfont collect-icon" @click="collect">&#xe616;
				</view>
				<button open-type="share" class="iconfont share-icon" @click="shareInfo"> &#xe747;</button>
			</view>
		</view>
		<!-- 评论的具体信息 -->
		<popup-layer ref="popupRef" :direction="'top'" v-model="boolShow">
			<view class="reply-page" v-if="actComment">
				<view class="reply-close-box">
					<span class="iconfont reply-close" @tap="closeReply">&#xe614;</span>
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
						<div v-if="item.img" class="comment-item-head"
							:style="'background-image: url(' + item.img + ');'"></div>
						<div v-if="!item.img" class="comment-item-head"
							style="background-image: url('../../../static/img/head.webp');"></div>
						<view class="comment-text">
							<view class="comment-item-user">{{ item.name?item.name:'游客' }}</view>
							<view class="comment-item-content">{{ item.content }}</view>
							<view class="comment-item-tile">
								<view class="comment-item-time">{{ formatMsgTime(item.createTime) }}</view>
								<span class="iconfont comment-item-delete" v-if="judgeDelete(item.openId)"
									v-on:click.stop="deleteComment2(item.id)">&#xe608;</span>
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
			<ygc-comment ref="ygcComment2" :placeholder="'回复评论'" @pubComment="pubComment2"></ygc-comment>
		</popup-layer>
		<ygc-comment ref="ygcComment" :placeholder="'发布评论'" @pubComment="pubComment"></ygc-comment>
	</view>
</template>

<script>
	import popupLayer from '../../../components/popup-layer/popup-layer.vue';
	import ygcComment from '../../../components/ygc-comment/ygc-comment.vue';
	export default {
		props: ['infoId'],
		components: {
			popupLayer,
			ygcComment
		},
		data() {
			return {
				dataForm: null,
				commentForm: null,
				actComment: null,
				actCommentReply: null,
				boolShow: true,
				praiseColor: '#000000',
				collectColor: '#000000'
			};
		},
		mounted() {
			this.getInfo();
		},
		methods: {
			getInfo() {
				var getAPI = {
					id: this.infoId
				};
				this.$api.getOneInfo(getAPI).then(res => {
					this.dataForm = res.data.info;
					this.commentForm = res.data.comment
					this.collectColor = (res.data.info.col === 1 ? '#00aaff' : '#000000')
					this.praiseColor = (res.data.info.thumb === 1 ? '#ff0000' : '#000000')
					// console.log(res.data.Info)
				});
			},
			showReply(item) {
				this.actComment = item
				let getAPI = {
					commentId: item.id
				}
				this.$api.getReply(getAPI).then((res) => {
					this.actCommentReply = res.data.comments
					// console.log(res)
				})
				this.$refs.popupRef.show();
			},
			closeReply() {
				this.$refs.popupRef.close();
			},
			showReview() {
				this.$refs.ygcComment.toggleMask('show');
			},
			showReview2() {
				this.$refs.ygcComment2.toggleMask('show');
			},
			pubComment(content) {
				let getAPI = {
					infoId: this.infoId,
					content: content,
					// commentId: '111'
				}
				// console.log(getAPI)
				this.$api.postReply(getAPI).then((res) => {
					// console.log(res)
					if (res.success) {
						this.$refs.ygcComment.toggleMask();
						this.getInfo()
					} else {
						uni.showToast({
							title: res.message,
							duration: 1000,
							icon: 'none'
						});
					}
				})
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
			deleteComment(id) {
				let deleteAPI = {
					id: id
				}
				this.$api.deleteReply(deleteAPI).then((res) => {
					if (res.success) {
						this.getInfo()
					}
				})
			},
			deleteComment2(id) {
				let deleteAPI = {
					id: id
				}
				this.$api.deleteReply(deleteAPI).then((res) => {
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
			judgeDelete(openid) {
				var myOpenid = uni.getStorageSync("openid")
				console.log(myOpenid + '==' + openid)
				if (openid === myOpenid) {
					return true
				} else {
					return false
				}
			},
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
			async praise() {
				let getAPI = {
					id: this.infoId
				}
				this.$api.praiseInfo(getAPI).then((res) => {
					if (res.code == 20000) {
						// if (this.praiseColor == '#ff0000') {
						// 	uni.showToast({
						// 		icon: "none",
						// 		title: "取消点赞"
						// 	})
						// } else {
						// 	uni.showToast({
						// 		title: "点赞成功"
						// 	})
						// }
						this.getInfo()
					}
				})
			},
			async collect() {
				let getAPI = {
					id: this.infoId
				}
				let res = await this.$api.collectInfo(getAPI)
				// console.log(res)
				if (res.code == 20000) {
					if (this.collectColor == "#00aaff") {
						uni.showToast({
							icon: "none",
							title: "取消收藏"
						})
					} else {
						uni.showToast({
							title: "收藏成功"
						})
					}
					this.getInfo()
				}
			},
			shareInfo() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					title: this.dataForm.title,
					summary: this.dataForm.simpleContent,
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.mainContaienr {
		user-select: text;
		-webkit-user-select: text;
	}

	.collect-box {
		height: 90rpx;
		width: 30%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.collect-icon {
		font-size: 40rpx;
		margin: 0 20rpx;
	}

	.share-icon {
		font-size: 40rpx;
		margin: 0 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50rpx;
		height: 50rpx;
	}

	.top-head {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;

		.top-head-headimg {
			height: 70rpx;
			width: 70rpx;
			border-radius: 40rpx;
			overflow: hidden;
			background-repeat: no-repeat;
			background-position: center center;
			background-size: cover;
			box-shadow: 0px 0px 2px rgb(216, 216, 216);
		}

		.top-head-author {
			width: 30vw;
			height: 60rpx;
			display: flex;
			flex-direction: column;
			margin-left: 15rpx;

			.oneline {
				display: flex;
				align-items: center;
				width: 30vw;
				height: 30rpx;
				overflow: hidden; //多出部分隐藏
				white-space: nowrap; //一行显示
				text-overflow: ellipsis; //是否显示省略号
			}

			.top-head-author-name {
				font-size: 27rpx;
				font-weight: 800;
				letter-spacing: 3rpx;
			}

			.top-head-author-identity {
				font-size: 22rpx;
				color: rgb(170, 170, 170);
				letter-spacing: 3rpx;
			}
		}
	}

	.info-title {
		margin: 20rpx 10rpx;
		font-size: 35rpx;
		font-weight: 900;
	}

	.info-content {
		padding: 20rpx;
		-webkit-user-select: text;
	}

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
