<template>
	<view class="seedInfo" :style="{height:height+'px'}">
		<view class="selectLine">
			<view class="select" v-for="item in selectLine" :key="item.id" :class="current==item.id?'selectActive':''"
				@click="goSwiper(item.id)">
				{{item.name}}
			</view>
		</view>
		<view class="swiperContainer">
			<swiper class="swiper" @change="changeSwiper" :current="current" :style="{height:height+'px'}">
				<swiper-item class="swiperItem">
					<CompanyInfo />
				</swiper-item>
				<swiper-item class="swiperItem">
					<ManagerList :flag="1" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<UserList :flag="2" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<CompanyList />
				</swiper-item>
				<swiper-item class="swiperItem">
					<LawyerList />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import CompanyInfo from "../CompanyInfo/CompanyInfo"
	import ManagerList from "../UserList/UserList"
	import UserList from "../UserList/UserList"
	import CompanyList from "../CompanyList/CompanyList"
	import LawyerList from "../LawyerList/LawyerList"
	export default {
		props: ["height"],
		components: {
			CompanyInfo,
			ManagerList,
			UserList,
			CompanyList,
			LawyerList
		},
		data() {
			return {
				current: 0,
				selectLine: [{
						id: 0,
						name: "介绍"
					},
					{
						id: 1,
						name: "管理层"
					},
					{
						id: 2,
						name: "个人会员"
					},
					{
						id: 3,
						name: "会员单位"
					},
					{
						id: 4,
						name: "律师"
					},
				]
			};
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
	.seedInfo {
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
					overflow-y: scroll;
				}
			}
		}
	}
</style>
