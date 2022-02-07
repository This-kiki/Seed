<template>
	<view class="infoContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view class="selectLine">
			<view class="select" v-for="item in selectLine" :key="item.id" :class="current==item.id?'selectActive':''"
				@click="goSwiper(item.id)">
				{{item.name}}
			</view>
		</view>
		<view class="swiperContainer">
			<swiper class="swiper" @change="changeSwiper" :current="current"
				:style="{height:height.swiperHeight-40+50+'px'}">
				<swiper-item class="swiperItem">
					<InfoMeRelease :height="height.swiperHeight-40+50" v-if="isRefresh"/>
				</swiper-item>
				<swiper-item class="swiperItem">
					<InfoMeCollect :height="height.swiperHeight-40+50" v-if="isRefresh"/>
				</swiper-item>
				<swiper-item class="swiperItem">
					<infoMeFabulous :height="height.swiperHeight-40+50" v-if="isRefresh"/>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import InfoMeRelease from "../InfoMeRelease/InfoMeRelease"
	import InfoMeCollect from "../InfoMeCollect/InfoMeCollect"
	import infoMeFabulous from "../infoMeFabulous/infoMeFabulous"
	export default {
		components: {
			InfoMeRelease,
			InfoMeCollect,
			infoMeFabulous
		},
		data() {
			return {
				setNav: {
					titleColor: "#fff",
					navTitle: "我的资讯",
					bgColor: "#36c1ba",
					isShowBackBtn: true,
					backBtnColor: "#fff"
				},
				current: 0,
				selectLine: [{
						id: 0,
						name: "我的发布"
					},
					{
						id: 1,
						name: "我的收藏"
					},
					{
						id: 2,
						name: "我的点赞"
					},
				],
				height: {},
				isRefresh:  true
			};
		},
		created() {
			this.height = uni.getStorageSync('height')
		},
		onShow() {
			this.isRefresh = false
			setTimeout(()=>{
				this.isRefresh = true
			},300)
		},
		methods: {
			// 选择
			goSwiper(id) {
				this.current = id
			},
			// 当swiper滑动时
			changeSwiper(e) {
				let detail = e.detail
				this.current = detail.current
			},
		}
	}
</script>

<style lang="scss">
	.infoContainer {
		user-select: text;
		-webkit-user-select: text;

		.selectLine {
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin: 0 auto;
			background-color: #f5f5f5;

			.select {
				width: 25%;
				height: 40px;
				text-align: center;
				line-height: 40px;
				transition: 0.2s ease-in-out;
				position: relative;
				font-size: 26rpx;
				color: #333;
			}

			.select:after {
				content: "";
			}

			.selectActive {
				font-size: 30rpx;
				font-weight: bold;
				transition: 0.2s ease-in-out;
				position: relative;
				color: #151515;
			}

			.selectActive:after {
				content: "";
				width: 26rpx;
				height: 6rpx;
				border-radius: 3rpx;
				background-color: #36c1ba;
				position: absolute;
				bottom: 0;
				right: 42%;
				transition: 0.2s ease-in-out;
			}
		}

		.swiperContainer {
			.swiper {
				.swiperItem {
					background-color: #f5f5f5;
					overflow-y: scroll;
				}
			}
		}
	}
</style>
