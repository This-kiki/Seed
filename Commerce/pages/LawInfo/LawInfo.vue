<template>
	<view class="lawContainer" :style="{height:height+'px'}">
		<!-- 选择栏 -->
		<view class="selectLine">
			<view class="select" v-for="item in selectLine" :key="item.id"
				:class="selectCurrent==item.id?'selectActive':''" @click="goSwiper(item.id)">
				{{item.name}}
			</view>
		</view>
		<view class="swiperContainer">
			<swiper class="swiper" @change="changeSwiper" :current="selectCurrent" :style="{height:height+'px'}">
				<swiper-item class="swiperItem">
					<LawCommon :height="height" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<LawyerList />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import LawCommon from "../LawCommon/LawCommon"
	import LawyerList from "../LawyerList/LawyerList"
	export default {
		components: {
			LawCommon,
			LawyerList
		},
		props: ['height'],
		data() {
			return {
				selectCurrent: 0,
				selectLine: [{
						id: 0,
						name: "法律常识"
					},
					{
						id: 1,
						name: "法律从业者"
					},
				]
			};
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			// 选择
			goSwiper(id) {
				this.selectCurrent = id
			},
			// 当swiper滑动时
			changeSwiper(e) {
				let detail = e.detail
				this.selectCurrent = detail.current
			},
			goPage(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.lawContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;
		overflow-y: scroll;

		.selectLine {
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin: 0 auto;
			position: fixed;
			top: 40px;
			z-index: 99;
			background-color: #f5f5f5;

			.select {
				margin-left: 40rpx;
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
					// overflow-y: scroll;
				}
			}
		}
	}
</style>
