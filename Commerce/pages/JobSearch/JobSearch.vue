<template>
	<view class="searchContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<!-- 搜索框 -->
		<view class="inputLine">
			<input class="input" type="text" v-model="inputValue" placeholder="请输入关键字" @focus="showBtn=true"
				@blur="showBtn=false" />
			<view class="searchBtn" v-if="showBtn" @click="searchJob()">
				搜索
			</view>
			<view class="clearBtn" v-if="showBtn" @click="clearBtn()">
				清除搜索
			</view>
		</view>
		<view class="list" v-if="isShow">
			<JobPart :isSearch="true" :inputValue='inputValue' :cate='cate'></JobPart>
		</view>
	</view>
</template>

<script>
	import JobPart from "../JobPart/JobPart"
	export default {
		components: {
			JobPart
		},
		data() {
			return {
				setNav: {
					titleColor: "#fff",
					bgColor: "#36c1ba",
					isShowBackBtn: true,
					backBtnColor: "#fff"
				},
				height: {},
				showBtn: false,
				inputValue: '',
				isShow: true,
				cate: 0
			};
		},
		created() {
			this.height = uni.getStorageSync('height')
		},
		onLoad(options) {
			if (options.input) {
				this.inputValue = options.input
				this.cate = options.cate
				this.isShow = false
				setTimeout(() => {
					this.isShow = true
				}, 400)
			}
		},
		methods: {
			// 搜索工作
			searchJob() {
				this.isShow = false
				setTimeout(() => {
					this.isShow = true
				}, 400)
			},
			// 清除搜索
			clearBtn() {
				this.inputValue = ""
				this.isShow = false
			},
			// 返回
			backTo() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.searchContainer {
		background-color: #f5f5f5;
		min-height: 100vh;

		.inputLine {
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			height: 40px;
			padding: 0 3%;
			background-color: #36c1ba;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			z-index: 99;

			.input {
				width: 100%;
				height: 60rpx;
				margin: 0 auto;
				padding: 0 20rpx;
				background-color: #fff;
				text-align: center;
				border-radius: 14rpx;
				letter-spacing: 1rpx;
				transition: 0.2s ease-in-out;
			}

			.searchBtn {
				font-size: 24rpx;
				width: 100rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #fff;
			}

			.clearBtn {
				font-size: 24rpx;
				width: 180rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #fff;
			}
		}

		.list {
			padding-top: 40px;
		}
	}
</style>
