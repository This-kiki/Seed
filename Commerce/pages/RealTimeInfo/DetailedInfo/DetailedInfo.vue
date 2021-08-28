<template>
	<view>
		<view class="white-bord" v-if="!dataForm">加载中</view>
		<view v-if="dataForm">
			<view class="info-title">{{ dataForm.title }}</view>
			<view class="info-content" v-html="dataForm.content"></view>
			<view class="comment">
				<view class="comment-head">
					<view class="comment-reviewnum">评论 {{ 55 }}</view>
					<view class="comment-fabulousnum">{{ 149 }} 赞</view>
				</view>
				<view class="comment-list">
					<view class="comment-item" @tap="showReply">
						<image class="comment-item-head" src="../../../static/logo.png" mode=""></image>
						<!-- <view class="comment-item-head">
							
						</view> -->
						<view class="comment-text">
							<view class="comment-item-user">我太难了</view>
							<view class="comment-item-content">我读书不多，纯属为了生活，但是“求偶”这个词不是用来形容动物的吗</view>
							<view class="comment-item-tile">
								<view class="comment-item-reply">
									<span class="comment-item-reply-text">{{ 2 }}回复</span>
									<span class="iconfont comment-item-to">&#xe623;</span>
								</view>
								<view class="comment-item-time">18分钟前</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<popup-layer ref="popupRef" :direction="'top'" v-model="boolShow">
			<view class="reply-page">
				<view class="reply-close">X</view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
import popupLayer from '../../../components/popup-layer/popup-layer.vue';
export default {
	props: ['infoId'],
	components: {
		popupLayer
	},
	data() {
		return {
			dataForm: null,
			boolShow: true
		};
	},
	mounted() {
		this.getInfo();
	},
	methods: {
		getInfo() {
			var getAPI = { id: this.infoId };
			this.$api.getOneInfo(getAPI).then(res => {
				this.dataForm = res.data.Info;
				// console.log(res.data.Info)
			});
		},
		showReply() {
			this.$refs.popupRef.show();
		}
	}
};
</script>

<style scoped lang="less">
.info-title {
	margin: 20rpx 10rpx;
	font-size: 35rpx;
	font-weight: 900;
}
.info-content {
	padding: 20rpx;
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
	.comment-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		.comment-reviewnum {
			font-size: 30rpx;
			font-weight: 700;
			margin-left: 30rpx;
		}
		.comment-fabulousnum {
			font-size: 27rpx;
			margin-right: 30rpx;
			color: rgb(153, 153, 153);
		}
	}
	.comment-list {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 20rpx;
		.comment-item {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			width: 100%;
			padding: 10rpx 0;
			.comment-item-head {
				height: 8vw;
				width: 8vw;
				border-radius: 500rpx;
				margin: 0 10rpx;
			}
			.comment-text {
				width: 85vw;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
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
					.comment-item-reply {
						width: 130rpx;
						height: 50rpx;
						border-radius: 30rpx;
						background-color: rgb(246, 246, 246);
						display: flex;
						justify-content: center;
						align-items: center;
						.comment-item-reply-text {
							font-size: 25rpx;
							color: rgb(35, 35, 35);
							margin-bottom: 4rpx;
						}
						.comment-item-to {
							font-size: 25rpx;
							color: rgb(35, 35, 35);
						}
					}
					.comment-item-time {
						font-size: 25rpx;
						color: rgb(152, 152, 152);
						margin-left: 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
		.comment-item:active {
			background-color: rgb(247, 247, 247);
		}
	}
	.reply-page {
	}
}
</style>
