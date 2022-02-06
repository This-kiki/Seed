<template>
	<view class="body">
		<!-- 顶部 -->
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
						<text v-if="model1.userInfo.img">修改头像</text>
						<text v-if="!model1.userInfo.img">选择头像</text>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" borderBottom>
					<view class="text-box">
						<text>姓名</text>
						<u--input v-model="model1.userInfo.name" border="surround" placeholder="请填写姓名"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.sex" borderBottom @click="shows.show1 = true" ref="item3">
					<view class="text-box">
						<text>性别</text>
						<u--input v-model="model1.userInfo.sex" border="surround" disabled disabledColor="#ffffff"
							placeholder="请选择性别">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.birth" borderBottom @click="shows.show2 = true;" ref="item4">
					<view class="text-box">
						<text>出生年月</text>
						<u--input v-model="model1.userInfo.birth" border="surround" disabled disabledColor="#ffffff"
							placeholder="请选择出生年月">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.birth" borderBottom>
					<picker class="picker" mode="region" v-model="model1.userInfo.place" @change="bindPlaceChange">
						<view class="text-box">
							<text>籍贯</text>
							<u--input v-model="model1.userInfo.place" border="surround" disabled disabledColor="#ffffff"
								placeholder="请选择籍贯">
							</u--input>
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.phone" borderBottom ref="item1">
					<view class="text-box">
						<text>手机号</text>
						<u--input v-model="model1.userInfo.phone" border="surround" placeholder="请填写手机号"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.school" borderBottom ref="item1">
					<view class="text-box">
						<text>学校</text>
						<u--input v-model="model1.userInfo.school" border="surround" placeholder="请填写学校"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.major" borderBottom ref="item1">
					<view class="text-box">
						<text>专业</text>
						<u--input v-model="model1.userInfo.major" border="surround" placeholder="请填写专业"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.grade" borderBottom ref="item1">
					<view class="text-box">
						<text>年级</text>
						<u--input v-model="model1.userInfo.grade" border="surround" placeholder="请填写年级"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.work" borderBottom ref="item1">
					<view class="text-box">
						<text>工作单位</text>
						<u--input v-model="model1.userInfo.work" border="surround" placeholder="请填写工作单位"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.position" borderBottom ref="item1">
					<view class="text-box">
						<text>工作职位</text>
						<u--input v-model="model1.userInfo.position" border="surround" placeholder="请填写工作职位"></u--input>
					</view>
				</u-form-item>
			</u--form>
			<u-button type="primary" text="提交" customStyle="margin: 30px auto;width:90%" @click="save"></u-button>
			<!-- 性别选择器 -->
			<u-action-sheet :show="shows.show1" :actions="sex" title="请选择性别" @close="shows.show1 = false"
				@select="sexSelect">
			</u-action-sheet>
			<!-- 生日选择器 -->
			<u-datetime-picker :show="shows.show2" v-model="value2" mode="date" closeOnClickOverlay @confirm="confirm"
				@cancel="cancel(2)" @change="change(2)" @close="close(2)"></u-datetime-picker>
		</view>
	</view>
</template>

<script>
	import {
		regular
	} from '../../../util/common.js';
	export default {
		data() {
			return {
				setNav: {
					titleColor: 'black',
					navTitle: '个人资料',
					bgColor: 'white',
					isShowBackBtn: true,
					backBtnColor: 'black'
				},
				temp: null,
				sex: [{
						id: 0,
						name: '男'
					},
					{
						id: 1,
						name: '女'
					}
				],
				shows: {
					show1: false,
					show2: false
				},

				// ssssssssssss
				model1: {
					userInfo: {
						img: '',
						name: '',
						sex: '',
						birth: '',
						place: '',
						phone: '',
						school: '',
						major: '',
						grade: '',
						work: '',
						position: ''
					},
				},
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.phone': {
						type: 'string',
						required: true,
						message: '请填写手机号',
						trigger: ['blur', 'change']
					},
					'userInfo.school': {
						type: 'string',
						required: true,
						message: '请填写学校',
						trigger: ['blur', 'change']
					},
					'userInfo.major': {
						type: 'string',
						required: true,
						message: '请填写专业',
						trigger: ['blur', 'change']
					},
					'userInfo.grade': {
						type: 'string',
						required: true,
						message: '请填写年级',
						trigger: ['blur', 'change']
					},
					'userInfo.work': {
						type: 'string',
						required: true,
						message: '请填写工作单位',
						trigger: ['blur', 'change']
					},
					'userInfo.position': {
						type: 'string',
						required: true,
						message: '请填写工作职位',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		mounted() {
			this.getUserInfo();
		},
		methods: {
			// ssssss
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				// this.$refs.form1.validateField('userInfo.sex')
			},
			close(index) {
				this.shows[`show${index}`] = false
			},
			cancel(index) {
				this.shows[`show${index}`] = false
			},
			confirm(e) {
				this.shows.show2 = false
				// this.result(e.value, e.mode)
				let date = new Date(e.value)
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;

				// return y + '-' + MM + '-' + d;
				this.model1.userInfo.birth = y + '-' + MM + '-' + d
			},
			// ssssssss



			judge() {
				// console.log(regular(this.model1.userInfo))
				return regular(this.model1.userInfo);
			},
			getUserInfo() {
				this.$api.getUserMsg().then(res => {
					// this.model1.userInfo = res.data.userBaseInfo;
					var obj = res.data.userBaseInfo;
					for (let key in obj) {
						// console.log(key, '-', obj[key])
						if (obj[key])
							this.model1.userInfo[key] = obj[key];
						else
							this.model1.userInfo[key] = ''
						if (key == 'sex') {
							if (obj[key] == 1) {
								this.model1.userInfo[key] = '男'
								console.log(key, '-', obj[key])
							} else if (obj[key] == 2) {
								this.model1.userInfo[key] = '女'
							} else {
								this.model1.userInfo[key] = ''
							}
						}
					}
				});
			},
			bindPlaceChange(e) {
				// console.log(e)
				this.model1.userInfo.place = e.detail.value.join('-');
			},
			save() {
				// if (this.judge().status == true) {
				if (!this.model1.userInfo.name) {
					uni.showToast({
						title: '请填写姓名',
						icon: 'none'
					});
					return false;
				}
				uni.showLoading({
					title: '正在提交'
				});
				if (this.temp) {
					this.$api
						.uploadPicture({
							tempFilePaths: this.temp
						})
						.then(res => {
							// console.log(res)
							var obj = this.model1.userInfo;
							obj.img = res.data.url;
							obj.sex = (obj.sex == '男' ? 1 : obj.sex == '女' ? 2 : 0)
							this.$api
								.changeUserMsg(obj)
								.then(res => {
									uni.hideLoading();
									if (res.code == 20000) {
										uni.showToast({
											title: '修改成功',
											duration: 2000
										});
										setTimeout(() => {
											uni.navigateBack({});
										}, 1000);
									}
								})
								.catch(err => {
									uni.hideLoading();
									uni.showToast({
										title: '提交失败，请重新提交',
										icon: 'none'
									});
								});
						});
				} else {
					var obj = this.model1.userInfo;
					obj.sex = (obj.sex == '男' ? 1 : obj.sex == '女' ? 2 : 0)
					this.$api
						.changeUserMsg(obj)
						.then(res => {
							uni.hideLoading();
							if (res.code == 20000) {
								uni.showToast({
									title: '修改成功',
									duration: 2000
								});
								setTimeout(() => {
									uni.navigateBack({});
								}, 1000);
							}
						})
						.catch(err => {
							uni.hideLoading();
							uni.showToast({
								title: '提交失败，请重新提交',
								icon: 'none'
							});
						});
				}
				// } else {
				// 	uni.showToast({
				// 		title: this.judge().value,
				// 		icon: 'none'
				// 	});
				// 	return false;
				// }
			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						const tempFilePaths = res.tempFilePaths;
						that.temp = tempFilePaths;
						that.model1.userInfo.img = tempFilePaths[0];
					}
				});
			}
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
		}
	}
</style>
