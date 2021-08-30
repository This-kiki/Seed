<template>
	<!-- <div class="hm-news-card">
		<div class="container">
			<div class="box">
				<div class="img" v-if="options.imag" :style="'background-image: url(' + options.imag + ');'"></div>
				<span class="title">{{ options.title }}</span>
				<span class="summary">{{ options.simpleContent }}</span>
				<div class="row_2" />
				<div class="ft">
					<span class="comments">{{ formatMsgTime(options.createTime) }}</span>
					<span class="comments">{{ view }} 浏览</span>
				</div>
			</div>
		</div>
	</div> -->
	<view class="infoBox" @click="onClick()">
		<view class="top">
			<view class="title">
				{{item.title}}
			</view>
			<view class="intro">
				{{item.simpleContent}}
			</view>
		</view>
		<view class="bottom">
			<view class="img" :style="{backgroundImage:'url('+imag+')'}" v-if="item.imag&&!isImg">
			</view>
			<view class="imgContainer" v-if="isImg">
				<view class="imgBox" v-for="(i,index) in item.imag.slice(0,3)" :key="index">
					<image :src="i" mode=""></image>
				</view>
			</view>
			<view class="main">
				<view class="top" v-if="item.isTop">
					置顶
				</view>
				<view class="view">
					{{item.view}} 浏览
				</view>
				<!-- <view class="love">
				{{item.love}} 点赞
			</view> -->
				<view class="time">
					{{item.createTime.slice(0,10)}}
				</view>
			</view>
		</view>
	</view>
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
				isImg: false,
				imag: ""
			};
		},
		created() {
			if (this.item.imag != '')
				this.item.imag = JSON.parse(this.item.imag)
			if (this.item.imag.length > 1) {
				this.isImg = true
			}else{
				this.imag = this.item.imag[0]
			}
			console.log(this.item)
			this.view = this.item.view;
		},
		methods: {
			viewsAdd() {
				console.log('add');
				this.view += 1;
			},
			onClick() {
				uni.navigateTo({
					url: 'DetailedInfo/DetailedInfo?infoId=' + this.item.id
				});
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
<style lang="scss">
	// @import './index.response.css';

	.infoBox {
		padding: 20rpx 0;
		box-sizing: border-box;
		border-bottom: 1rpx #eee solid;

		.top {
			.title {
				font-size: 28rpx;
				font-weight: bold;
				letter-spacing: 1rpx;
			}

			.intro {
				font-size: 22rpx;
				color: #666;
				margin-top: 10rpx;
				letter-spacing: 1rpx;
			}
		}

		.bottom {
			margin-top: 20rpx;

			.img {
				width: 100%;
				height: 400rpx;
				border-radius: 10rpx;
				background-color: #4e8df6;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}

			.imgContainer {
				display: flex;

				.imgBox {
					height: 150rpx;
					width: 30%;
					margin-right: 3%;
					border-radius: 10rpx;

					image {
						height: 100%;
						width: 100%;
						border-radius: 10rpx;
					}
				}
			}

			.main {
				display: flex;
				font-size: 22rpx;
				margin-top: 10rpx;
				color: #aaa;

				.top,
				.view,
				.love {
					margin-right: 10rpx;
				}

				.top {
					color: #4e8df6;
					font-weight: bold;
				}
			}
		}
	}
</style>
