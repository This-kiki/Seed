<template>
	<view>
		<view style="height: 40px;">
			<u-tabs-swiper
				ref="uTabs"
				:list="list"
				:current="current"
				@change="tabsChange"
				:is-scroll="true"
				swiperWidth="750"
				active-color="#3fbf00"
				font-size="27"
			></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :style="'height:' + contentHeight + 'px;'">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view style="padding: 40rpx;">
						<u-time-line>
							<u-time-line-item nodeTop="2" v-for="(item, i) in followList" :key="i">
								<!-- 此处自定义了左边内容，用一个图标替代 -->
								<template v-slot:node>
									<view class="u-node" style="background: #3fbf00;" v-if="item.flupClass[1] == '周'">
										<!-- 此处为uView的icon组件 -->
										<u-icon name="tags" color="#fff" :size="24"></u-icon>
									</view>
									<view class="u-node" style="background: #d0d000;" v-if="item.flupClass[1] == '月'">
										<!-- 此处为uView的icon组件 -->
										<u-icon name="star" color="#fff" :size="24"></u-icon>
									</view>
								</template>
								<template v-slot:content>
									<view @click="go">
										<view class="u-order-title">{{ item.flupClass }}</view>
										<view class="u-order-desc">{{ item.medRecordId }}</view>
										<view class="u-order-time">{{ item.flupTime }}</view>
									</view>
									<u-line color="#b8b8b8"></u-line>
								</template>
							</u-time-line-item>
						</u-time-line>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item"><view style="padding: 40rpx;"></view></swiper-item>
		</swiper>
	</view>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			followList: [],
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			list: [
				{
					name: '随访'
				},
				{
					name: '随访计划'
				}
			],
			contentHeight: ''
		};
	},
	mounted() {
		this.getCustom();
		this.getFollowList();
	},
	methods: {
		getFollowList() {
			let getAPI = {
				idNum: '120107195001274530',
				currentPage: 1,
				size: 20
			};
			this.$api.getFlupHfPatInfoList(getAPI).then(res => {
				// console.log(res);
				this.followList = res.flupPats;
			});
		},
		go() {
			uni.navigateTo({
				url: 'fllowUpForm/fllowUpForm'
			});
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		// 获取设备信息
		getCustom() {
			uni.getSystemInfo({
				success: e => {
					this.contentHeight = e.safeArea.height - 135;
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.u-node {
	width: 44rpx;
	height: 44rpx;
	border-radius: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #d0d0d0;
}

.u-order-title {
	color: #333333;
	font-weight: bold;
	font-size: 32rpx;
}

.u-order-desc {
	color: rgb(150, 150, 150);
	font-size: 28rpx;
	margin-bottom: 6rpx;
}

.u-order-time {
	color: rgb(200, 200, 200);
	font-size: 26rpx;
}
</style>
