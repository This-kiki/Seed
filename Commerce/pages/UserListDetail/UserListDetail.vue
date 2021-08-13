<template>
	<view class="detailContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 详情 -->
		<view class="mainContaienr">
			<view class="img">
				<image :src="userInfo.img" mode=""></image>
			</view>
			<view class="name">
				{{userInfo.name}}
			</view>
			<view class="work">
				{{userInfo.work}}
			</view>
			<view class="mainInfo">
				<view class="place iconfont icon-weizhi" @click="copy(userInfo.place)">
					{{userInfo.place}}
				</view>
				<view class="phone iconfont icon-dianhua" @click="callPhone()">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "会员详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 会员id
				id: "",
				// 会员详情
				userInfo: {
					birth: "2020-02-02",
					identity: 0,
					img: "https://bkimg.cdn.bcebos.com/pic/b219ebc4b74543a9a8a81e741d178a82b80114d2?x-bce-process=image/format,f_auto",
					name: "刘淇",
					openId: "test",
					phone: "11011001100",
					place: "武汉科技大学",
					position: "string",
					sex: 0,
					work: "网络工程师"
				}

			};
		},
		onLoad(options) {
			this.id = options.id
		},
		methods:{
			// 打电话
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.userInfo.phone
				})
			},
			// 信息复制到剪切板
			copy(value) {
				uni.showModal({
					content: value,
					confirmText: '复制内容',
					success: res => {
						if (res.confirm) {
							uni.setClipboardData({
								data: value,
								success: () => {
									uni.showToast({
										title: '复制成功'
									})
								}
							});
						} else if (res.cancel) {
							return
						}
					}
				});
			},
			
		}

	}
</script>

<style lang="scss" scoped>
	.detailContainer {
		margin-bottom: 50rpx;

		.mainContaienr {
			width: 94%;
			margin: 20rpx auto 0;

			.img {
				margin: 20rpx auto 0;
				width: 200rpx;
				height: 250rpx;
				background-color: lightblue;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				image {
					width: 100%;
					height: 100%;
					border-radius: 14rpx;
				}
			}
			
			.name{
				text-align: center;
				font-size: 32rpx;
				font-weight: bold;
				margin-top: 10rpx;
			}
			.work{
				text-align: center;
				margin-top: 10rpx;
				color: #333;
				font-size: 26rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx #ccc solid;
			}
			.mainInfo{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				.phone{
					margin-right: 20rpx;
					width: 60rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 30rpx;
					background-color: #eee;
					font-size: 50rpx;
					padding: 10rpx;
				}
			}
		}
	}
</style>
