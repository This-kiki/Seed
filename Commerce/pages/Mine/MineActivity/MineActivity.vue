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
				:style="{height:height.swiperHeight+40+'px'}">
				<swiper-item class="swiperItem">
					<activityPage :height="height.swiperHeight+40" :status="0" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<activityPage :height="height.swiperHeight+40" :status="1" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<activityPage :height="height.swiperHeight+40" :status="2" />
				</swiper-item>
			</swiper>
		</view>
		
		<!-- <scroll-view v-if="dataList[0]" class="act-list" :style="{'height':height.swiperHeight+50+'px'}" scroll-y="true"
			refresher-enabled="true" :refresher-triggered="loading" @refresherrefresh="refresh"
			@scrolltolower="loadMore">
			<slot slot="content" class="act-list">
				<view v-for="(item, index) in dataList" @click="go(item.actId)" style="width: 100%;">
					<activity-card :options="item"></activity-card>
				</view>
				<view v-if="loadmore" class="loadMore" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-show="springback" class="loadMore">已经到底啦~~</view>
			</slot>
		</scroll-view> -->
	</view>
</template>

<script>
	import activityPage from '../ActivityPage/ActivityPage'
	export default {
		components: {
			activityPage
		},
		data() {
			return {
				setNav: {
					titleColor: 'black',
					navTitle: '我的活动',
					bgColor: 'white',
					isShowBackBtn: true,
					backBtnColor: 'black'
				},
				current: 0,
				selectLine: [{
						id: 0,
						name: "未审核"
					},
					{
						id: 1,
						name: "已通过"
					},
					{
						id: 2,
						name: "被驳回"
					},
				],
				height: {}
			};
		},
		mounted() {
			this.height = uni.getStorageSync('height')
			// console.log('sssss',this.height)
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
	};
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
					height: 100%;
					background-color: #f5f5f5;
					overflow-y: scroll;
				}
			}
		}
	}
</style>
