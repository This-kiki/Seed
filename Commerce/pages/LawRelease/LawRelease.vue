<template>
	<view class="lawContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContainer">
			<view class="title">
				<text>标题</text>
				<input type="text" v-model="title" />
			</view>
			<view class="brief">
				<text>简介</text>
				<textarea type="text" v-model="brief" />
			</view>
			<view class="content">
				<text>内容</text>
				<rich-text :nodes="content"></rich-text>
				<view class="richText" @click="richText()">
					点击编辑内容
				</view>
			</view>
			<view class="release" @click="release()">
				<text class="iconfont icon-submit"></text>
				发布
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
					navTitle: "发布法律常识",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 修改的id
				id: '',
				title: "",
				brief: "",
				content: ""
			};
		},
		onShow() {
			this.getLocalData()
		},
		onLoad(options) {
			if (options.id) {
				console.log(options)
				this.id = options.id
				this.title = options.title
				this.brief = options.brief
				this.setNav.navTitle = "修改法律常识"
			}
		},
		methods: {
			//获取本地内容
			getLocalData(){
				if(uni.getStorageSync("lawEdit")){
					let data = uni.getStorageSync("lawEdit")
					this.id = data.id
					this.title = data.title
					this.brief = data.brief
					this.content = decodeURIComponent(this.$store.state.richText)
				}
			},
			// 编辑富文本内容
			richText() {
				let data = {
					id:this.id,
					title:this.title,
					brief:this.brief,
				}
				uni.setStorageSync("lawEdit",data)
				uni.navigateTo({
					url: "/pages/Editor/index"
				})
			},
			// 发布
			async release() {
				let data = {
					id: this.id,
					title: this.title,
					brief: this.brief,
					content: this.content
				}
				let res = await this.$api.releaseLaw(data)
				if (res.code == 20000) {
					uni.showToast({
						title: '发布成功'
					})
					uni.removeStorageSync("lawEdit")
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 200)
				}
			}
		}
	}
</script>

<style lang="scss">
	.lawContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.mainContainer {
			width: 94%;
			margin: 20rpx auto 0;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			border-radius: 14rpx;

			.title {
				input {
					background-color: #f1f1f1;
					margin-top: 20rpx;
					border-radius: 10rpx;
					padding: 20rpx;
					letter-spacing: 1rpx;
				}
			}

			.brief {
				margin-top: 30rpx;

				textarea {
					background-color: #f1f1f1;
					margin-top: 20rpx;
					border-radius: 10rpx;
					padding: 20rpx;
					letter-spacing: 1rpx;
				}
			}

			.content {
				margin-top: 30rpx;

				.richText {
					margin-top: 20rpx;
					width: 180rpx;
					text-align: center;
					font-size: 28rpx;
					padding: 6rpx 10rpx;
					border-radius: 10rpx;
					color: #4e8df6;
					border: 1rpx #4e8df6 solid;
				}
			}

			.release {
				width: 120rpx;
				margin: 30rpx 40rpx 0 0;
				padding: 10rpx;
				background-color: #eee;
				border-radius: 10rpx;

				.iconfont {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
