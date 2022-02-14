<template>
	<view class="MoneyRuleContainer">
		<view class="mainContaienr">
			<view class="title">
				奖学金评选规则
			</view>
			<view class="content">
				<view class="line" v-for="(item,index) in rule" :key="index">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rule: []
			};
		},
		created() {
			this.getMoneyRule()
		},
		methods: {
			async getMoneyRule() {
				let res = await this.$api.getMoneyRule()
				// console.log(res)
				this.rule = res.data.rule.split('\n')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.MoneyRuleContainer {
		padding-bottom: 100rpx;
		user-select: text;
		-webkit-user-select: text;

		.mainContaienr {
			width: 96%;
			margin: 20rpx auto 0;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				position: relative;
				margin-left: 20rpx;
			}

			.title:before {
				content: "";
				position: absolute;
				width: 8rpx;
				height: 36rpx;
				background-color: #36c1ba;
				top: 5rpx;
				left: -20rpx;
				border-radius: 5rpx;
			}

			.content {
				padding: 30rpx 4% 0;
				letter-spacing: 1rpx;

				.line {
					text-indent: 2em;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
