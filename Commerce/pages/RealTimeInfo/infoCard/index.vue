<template>
	<view class="infoBox" @click="onClick()">
		<view class="top">
			<view class="top-head">
				<view class="top-head-headimg" :style="'background-image: url('+item.img+');'"></view>
				<view class="top-head-author">
					<view class="top-head-author-name oneline">
						{{ item.name }}
					</view>
					<view class="top-head-author-identity oneline">
						{{ getLevel(item.identity,item.subLevel) }}
					</view>
				</view>
			</view>
			<view class="iconfont top-more" @tap.stop="dialogT(item.id)">&#xe73a;</view>
		</view>
		<view class="middle">
			<view class="middle-title">
				<view class="middle-title-type">
					<u-tag :text="getCategory(item.category)" mode="plain" size="mini" />
				</view>
				<view class="middle-title-text">
					{{item.title}}
				</view>
			</view>
			<view class="middle-content0" v-if="imagArr.length == 0">
				<view class="middle-content0-text">
					{{item.simpleContent}}
				</view>
			</view>
			<view class="middle-content1" v-if="imagArr.length == 1">
				<view class="middle-content1-text">
					{{item.simpleContent}}
				</view>
				<view class="middle-content1-img" :style="'background-image: url('+ imagArr[0] +');'"></view>
			</view>
			<view class="middle-content3" v-if="imagArr.length == 3">
				<view class="middle-content3-text">
					{{item.simpleContent}}
				</view>
				<view class="middle-content3-imgs">
					<view class="middle-content3-img" v-for="(img,index) in imagArr"
						:style="'background-image: url('+ img +');'" :key="index"></view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="bottom-data">
				<view class="bottom-data-view" v-if="item.isTop" style="color: #36c1ba;">
					置顶
				</view>
				<view class="bottom-data-view">
					<view class="iconfont bottom-data-view-icon">
						&#xe624;
					</view>
					{{item.view}}
				</view>
				<view class="bottom-data-view">
					<view class="iconfont bottom-data-view-icon">
						&#xe601;
					</view>
					{{item.comments}}
				</view>
			</view>
			<view class="bottom-tag">
				<!-- <u-tag text="GET" type="success" mode="plain" /> -->
				{{ formatMsgTime(item.createTime) }}
			</view>
		</view>
		<u-popup v-model="dialog" mode="bottom" :mask="false" :closeable="true" height="100">
			<view style="height: 100rpx;">出淤泥而不染，濯清涟而不妖</view>
		</u-popup>
	</view>
</template>
<script>
	export default {
		name: 'HmNewsCard',
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {
				view: 0,
				imag: "",
				imagArr: []
			};
		},
		created() {
			if (this.item.imag != '') {
				this.imagArr = JSON.parse(this.item.imag)
			} else {
				this.imagArr = []
			}
			this.view = this.item.view;
		},
		methods: {
			dialogT(id) {
				// console.log('000')
				this.$parent.dialogFather(id);
			},
			viewsAdd() {
				console.log('add');
				this.view += 1;
			},
			onClick() {
				uni.navigateTo({
					url: 'DetailedInfo/DetailedInfo?infoId=' + this.item.id
				});
			},
			// 4荣誉会长，5会长，6副会长，7执行委员会成员，8秘书长，9会计，10出纳，11会员
			getLevel(identity, sublevel) {
				if (identity == 0) {
					return '管理员'
				} else if (identity == 1) {
					switch (sublevel) {
						case 4:
							return '荣誉会长';
							break;
						case 5:
							return '会长';
							break;
						case 6:
							return '副会长';
							break;
						case 7:
							return '执行委员会成员';
							break;
						case 8:
							return '秘书长';
							break;
						case 9:
							return '会计';
							break;
						case 10:
							return '出纳';
							break;
						case 11:
							return '会员';
							break;
					}
				} else if (identity == 2) {
					return '律师'
				} else if (identity == 3) {
					return '会员单位'
				} else {
					return ''
				}
			},
			getCategory(id) {
				switch (id) {
					case 1:
						return '种子会动态';
						break
					case 2:
						return '会员风采';
						break;
					case 3:
						return '会员单位';
						break;
					case 4:
						return '家乡新闻';
						break;
					case 5:
						return '普通资讯';
						break;
					case 6:
						return '知识';
						break;
					case 7:
						return '法律常识';
						break;
				}
			},
			formatMsgTime(timespan) {
				var dateTime = new Date(timespan); // 将传进来的字符串或者毫秒转为标准时间
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
			}
		}
	};
</script>
<style lang="scss" scoped>
	.infoBox {
		width: 100vw;
		margin: 10rpx auto;
		padding: 10rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgb(254, 254, 254);

		.top {
			width: 100%;
			height: 70rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

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

			.top-more {
				text-align: center;
				color: rgb(170, 170, 170);
				font-size: 40rpx;
				height: 50rpx;
				width: 50rpx;
			}

			.top-more:active {
				border-radius: 30rpx;
				background-color: rgb(230, 230, 230);
			}
		}

		.middle {
			width: 100%;
			margin: 10rpx 0;

			.middle-title {
				display: flex;
				flex-direction: row;
				align-items: center;

				.middle-title-text {
					font-weight: 700;
					font-size: 32rpx;
					margin-left: 10rpx;
					letter-spacing: 3rpx;
				}
			}

			.middle-content0 {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-top: 15rpx;

				.middle-content0-text {
					width: 100%;
					max-height: 135rpx;
					font-size: 30rpx;
					letter-spacing: 2rpx;
					line-height: 45rpx;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
			}

			.middle-content1 {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-top: 15rpx;

				.middle-content1-text {
					width: 65%;
					height: 135rpx;
					font-size: 30rpx;
					letter-spacing: 2rpx;
					line-height: 45rpx;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}

				.middle-content1-img {
					height: 150rpx;
					width: 33%;
					border-radius: 10rpx;
					overflow: hidden;
					background-repeat: no-repeat;
					background-position: center center;
					background-size: cover;
				}
			}

			.middle-content3 {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 15rpx;

				.middle-content3-text {
					width: 100%;
					max-height: 90rpx;
					font-size: 30rpx;
					letter-spacing: 2rpx;
					line-height: 45rpx;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.middle-content3-imgs {
					width: 100%;
					height: 150rpx;
					margin-top: 15rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.middle-content3-img {
						height: 150rpx;
						width: 33%;
						border-radius: 10rpx;
						overflow: hidden;
						background-repeat: no-repeat;
						background-position: center center;
						background-size: cover;
					}
				}
			}
		}

		.bottom {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.bottom-data {
				display: flex;
				flex-direction: row;
				align-items: center;

				.bottom-data-view {
					font-size: 24rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-right: 40rpx;
					color: rgb(116, 116, 116);

					.bottom-data-view-icon {
						font-weight: 900;
						font-size: 30rpx;
						margin-right: 6rpx;
					}
				}
			}

			.bottom-tag {
				font-size: 24rpx;
				color: rgb(116, 116, 116);
				margin-right: 20rpx;
			}
		}
	}
</style>
