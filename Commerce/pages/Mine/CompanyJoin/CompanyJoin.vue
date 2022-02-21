<template>
	<view class="body">
		<topBar :nav="setNav"></topBar>
		<view class="">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item prop="userInfo.img" borderBottom ref="item1">
					<view class="avatar" @tap="avatarChoose">
						<view class="imgAvatar">
							<view class="iavatar"
								:style="'background: url(' + model1.userInfo.img + ') no-repeat center/cover #eeeeee;'">
							</view>
						</view>
						<text v-if="model1.userInfo.img">修改公司标志图片</text>
						<text v-if="!model1.userInfo.img">选择公司标志图片</text>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.companyName" borderBottom>
					<view class="text-box">
						<text>公司全称</text>
						<u--input v-model="model1.userInfo.companyName" border="surround" placeholder="请填写公司全称">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.money" borderBottom>
					<view class="text-box">
						<text>注册资金</text>
						<u--input v-model="model1.userInfo.money" border="surround" placeholder="请填写注册资金"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.address" borderBottom>
					<view class="text-box">
						<text>地址</text>
						<u--input v-model="model1.userInfo.address" border="surround" placeholder="请填写地址"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.companyPhone" borderBottom>
					<view class="text-box">
						<text>公司联系电话</text>
						<u--input v-model="model1.userInfo.companyPhone" border="surround" placeholder="请填写公司联系电话">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.content" borderBottom ref="item1">
					<view class="text-box" style="height: 350rpx;">
						<text>公司介绍</text>
						<u--textarea v-model="model1.userInfo.content" border="surround" placeholder="请填写公司介绍">
						</u--textarea>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.creditCode" borderBottom>
					<view class="text-box">
						<text>信用代码</text>
						<u--input v-model="model1.userInfo.creditCode" border="surround" placeholder="请填写信用代码">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.email" borderBottom>
					<view class="text-box">
						<text>电子邮箱</text>
						<u--input v-model="model1.userInfo.email" border="surround" placeholder="请填写电子邮箱"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.industry" borderBottom>
					<view class="text-box">
						<text>行业</text>
						<u--input v-model="model1.userInfo.industry" border="surround" placeholder="请填写行业"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.manageArea" borderBottom>
					<view class="text-box">
						<text>经营范围</text>
						<u--input v-model="model1.userInfo.manageArea" border="surround" placeholder="请填写经营范围">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.num" borderBottom>
					<view class="text-box">
						<text>企业人数</text>
						<u--input v-model="model1.userInfo.num" border="surround" placeholder="请填写企业人数"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.manageStatus" borderBottom>
					<view class="text-box">
						<text>经营状态</text>
						<u--input v-model="model1.userInfo.manageStatus" border="surround" placeholder="请填写经营状态">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.time" borderBottom>
					<picker class="picker" mode="date" v-model="model1.userInfo.time" @change="bindDateChange">
						<view class="text-box">
							<text>创建时间</text>
							<view class="val">
								{{model1.userInfo.time?model1.userInfo.time:'请选择创建时间'}}
							</view>
							<!-- <u-cell :border="false" :title="">
							</u-cell> -->
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.license" borderBottom ref="item1">
					<view class="avatar" @tap="licenseAvatarChoose">
						<view class="imgAvatar">
							<view class="iavatar"
								:style="'background: url(' + model1.userInfo.license + ') no-repeat center/cover #eeeeee;'">
							</view>
						</view>
						<text v-if="model1.userInfo.license">修改营业执照照片</text>
						<text v-if="!model1.userInfo.license">上传营业执照照片</text>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.representative" borderBottom>
					<view class="text-box">
						<text>法人代表姓名</text>
						<u--input v-model="model1.userInfo.representative" border="surround" placeholder="请填写法人代表姓名">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" borderBottom>
					<view class="text-box">
						<text>HR姓名</text>
						<u--input v-model="model1.userInfo.name" border="surround" placeholder="请填写HR姓名"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.sex" borderBottom ref="item3">
					<picker class="picker" mode="selector" range-key="name" v-model="model1.userInfo.sex"
						@change="bindSexChange" :range="sexlist">
						<view class="text-box">
							<text>HR性别</text>
							<view class="val">
								{{getsex(model1.userInfo.sex)}}
							</view>
							<!-- <u-cell :border="false" :title="">
							</u-cell> -->
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.phone" borderBottom>
					<view class="text-box">
						<text>HR手机号</text>
						<u--input v-model="model1.userInfo.phone" border="surround" placeholder="请填写HR手机号"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.work" borderBottom>
					<view class="text-box">
						<text>工作单位</text>
						<u--input v-model="model1.userInfo.work" border="surround" placeholder="请填写工作单位"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.position" borderBottom>
					<view class="text-box">
						<text>工作职位</text>
						<u--input v-model="model1.userInfo.position" border="surround" placeholder="请填写工作职位"></u--input>
					</view>
				</u-form-item>
			</u--form>
			<u-button type="primary" text="提交申请" customStyle="margin: 30px auto;width:90%" @click="save"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		regular
	} from '../../../util/common.js';
	import * as data from '../../../util/data.js'
	export default {
		data() {
			return {
				setNav: {
					titleColor: 'black',
					navTitle: '申请成为单位会员',
					bgColor: 'white',
					isShowBackBtn: true,
					backBtnColor: 'black'
				},
				rules: data.rules,
				temp: '',
				temp1: '',
				model1: {
					userInfo: {
						img: '',
						address: '',
						companyName: '',
						companyPhone: '',
						content: '',
						creditCode: '',
						email: '',
						industry: '',
						license: '',
						manageArea: '',
						manageStatus: '',
						money: '',
						name: '',
						num: '',
						phone: '',
						representative: '',
						sex: 3,
						time: '',
					}
				},
				sexlist: data.sexlist,
			}
		},
		methods: {
			judge() {
				return regular(this.model1.userInfo);
			},
			bindSexChange(e) {
				this.model1.userInfo.sex = this.sexlist[e.detail.value].id;
			},
			bindDateChange(e) {
				this.model1.userInfo.time = e.detail.value;
			},
			getsex(key) {
				return data.getsex(key)
			},
			save() {
				if (this.judge().status == true) {
					uni.showLoading({
						title: '正在提交'
					})
					this.$api.uploadPicture({
							tempFilePaths: this.temp
						})
						.then((img_res) => {
							// console.log(img_res)
							var obj = this.model1.userInfo
							obj.img = img_res.data.url
							this.$api.uploadPicture({
									tempFilePaths: this.temp1
								})
								.then((license_res) => {
									obj.license = license_res.data.url
									obj.openId = uni.getStorageSync('openid');
									this.$api.applyComopany(obj)
										.then((res) => {
											uni.hideLoading()
											if (res.success == true) {
												uni.showToast({
													title: '申请成功',
													duration: 2000
												});
												setTimeout(() => {
													uni.navigateBack({});
												}, 1000)
											} else {
												uni.showToast({
													title: res.message,
													icon: 'none'
												})
											}
										})
										.catch((err) => {
											uni.hideLoading()
											uni.showToast({
												title: '提交失败，请重新提交',
												icon: 'none'
											})
										})
								})
								.catch((err) => {
									uni.hideLoading()
									uni.showToast({
										title: '图片上传失败',
										icon: 'none'
									})
								})
						})
						.catch((err) => {
							uni.hideLoading()
							uni.showToast({
								title: '图片上传失败',
								icon: 'none'
							})
						})
				} else {
					uni.showToast({
						title: this.judge().value,
						icon: 'none'
					});
					return false
				}
			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						const tempFilePaths = res.tempFilePaths
						that.temp = tempFilePaths
						that.model1.userInfo.img = tempFilePaths[0]
						// that.$api.uploadPicture({tempFilePaths: tempFilePaths}).then((res) => {
						// 	console.log(res)
						// })
					}
				});
			},
			licenseAvatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						const tempFilePaths = res.tempFilePaths
						that.temp1 = tempFilePaths
						that.model1.userInfo.license = tempFilePaths[0]
						// that.$api.uploadPicture({tempFilePaths: tempFilePaths}).then((res) => {
						// 	console.log(res)
						// })
					}
				});
			},
		}
	};
</script>

<style lang="scss">
	.body {
		width: 100%;
		user-select: text;
		-webkit-user-select: text;

		.avatar {
			width: 100%;
			height: 180rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			.imgAvatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;
				margin: 0 50rpx;
				background-color: rgb(230, 230, 230);

				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

		}

		.text-box {
			width: 95%;
			margin: auto;
			height: 110rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				padding-bottom: 10rpx;
			}

			.val {
				display: flex;
				align-items: center;
				border: 0.5px solid #dadbde;
				padding: 8px 9px;
				border-radius: 4px;
			}
		}
	}
</style>
