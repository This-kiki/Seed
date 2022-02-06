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
						<text v-if="model1.userInfo.img">修改个人免冠证件照</text>
						<text v-if="!model1.userInfo.img">选择个人免冠证件照</text>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" borderBottom>
					<view class="text-box">
						<text>姓名</text>
						<u--input v-model="model1.userInfo.name" border="surround" placeholder="请填写姓名"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.idNum" borderBottom>
					<view class="text-box">
						<text>身份证</text>
						<u--input v-model="model1.userInfo.idNum" border="surround" placeholder="请填写身份证"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.subLevel" borderBottom>
					<picker mode="selector" range-key="label" v-model="model1.userInfo.subLevel"
						@change="bindSubLevelChange" :range="sublevelList">
						<view class="text-box">
							<text>律师身份</text>
							<u-cell :border="false" :title="getlaylevel(model1.userInfo.subLevel)">
							</u-cell>
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.birth" borderBottom>
					<picker class="picker" mode="date" v-model="model1.userInfo.birth" @change="bindDateChange">
						<view class="text-box">
							<text>生日</text>
							<u-cell :border="false" :title="model1.userInfo.birth?model1.userInfo.birth:'请选择生日'">
							</u-cell>
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.sex" borderBottom ref="item3">
					<picker class="picker" mode="selector" range-key="name" v-model="model1.userInfo.sex"
						@change="bindSexChange" :range="sexlist">
						<view class="text-box">
							<text>性别</text>
							<u-cell :border="false" :title="getsex(model1.userInfo.sex)">
							</u-cell>
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.place" borderBottom>
					<picker class="picker" mode="region" v-model="model1.userInfo.place" @change="bindPlaceChange">
						<view class="text-box">
							<text>籍贯</text>
							<u-cell :border="false" :title="model1.userInfo.place?model1.userInfo.place:'请选择籍贯'">
							</u-cell>
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.polity" borderBottom ref="item3">
					<picker class="picker" mode="selector" range-key="label" v-model="model1.userInfo.polity"
						@change="bindPolityChange" :range="polityList">
						<view class="text-box">
							<text>政治面貌</text>
							<u-cell :border="false" :title="model1.userInfo.polity?model1.userInfo.polity:'请选择政治面貌'">
							</u-cell>
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.nation" borderBottom ref="item3">
					<picker class="picker" mode="selector" range-key="label" v-model="model1.userInfo.nation"
						@change="bindNationChange" :range="nationList">
						<view class="text-box">
							<text>民族</text>
							<u-cell :border="false" :title="model1.userInfo.nation?model1.userInfo.nation:'请选择民族'">
							</u-cell>
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="userInfo.phone" borderBottom>
					<view class="text-box">
						<text>手机号</text>
						<u--input v-model="model1.userInfo.phone" border="surround" placeholder="请填写手机号"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.email" borderBottom>
					<view class="text-box">
						<text>电子邮箱</text>
						<u--input v-model="model1.userInfo.email" border="surround" placeholder="请填写电子邮箱"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.school" borderBottom>
					<view class="text-box">
						<text>毕业学校</text>
						<u--input v-model="model1.userInfo.school" border="surround" placeholder="请填写毕业学校"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.major" borderBottom>
					<view class="text-box">
						<text>专业</text>
						<u--input v-model="model1.userInfo.major" border="surround" placeholder="请填写专业"></u--input>
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
				<u-form-item prop="userInfo.introduce" borderBottom ref="item1">
					<view class="text-box" style="height: 350rpx;">
						<text>简介（可填写自己擅长领域...）</text>
						<u--textarea v-model="model1.userInfo.introduce" border="surround" placeholder="请填写简介">
						</u--textarea>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.workNum" borderBottom>
					<view class="text-box">
						<text>执业证号</text>
						<u--input v-model="model1.userInfo.workNum" border="surround" placeholder="请填写执业证号"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.workplace" borderBottom>
					<view class="text-box">
						<text>执业律所</text>
						<u--input v-model="model1.userInfo.workplace" border="surround" placeholder="请填写执业律所">
						</u--input>
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
				rules: data.rules,
				setNav: {
					titleColor: 'black',
					navTitle: '申请成为会员',
					bgColor: 'white',
					isShowBackBtn: true,
					backBtnColor: 'black'
				},
				temp: null,
				model1: {
					userInfo: {
						img: '',
						name: '',
						idNum: '',
						birth: '',
						sex: 3,
						place: '',
						polity: '',
						subLevel: '',
						nation: '',
						phone: '',
						email: '',
						school: '',
						major: '',
						work: '',
						position: '',
						introduce: '',
						workNum: '',
						workplace: '',
					}
				},
				sublevelList: data.sublevelList,
				sexlist: data.sexlist,
				polityList: data.polityList,
				nationList: data.nationList
			};
		},
		methods: {
			judge() {
				return regular(this.model1.userInfo);
			},
			bindSexChange(e) {
				this.model1.userInfo.sex = this.sexlist[e.detail.value].id;
			},
			bindDateChange(e) {
				this.model1.userInfo.birth = e.detail.value;
			},
			bindPolityChange(e) {
				this.model1.userInfo.polity = this.polityList[e.detail.value].label;
				// console.log(this.polityList[e.detail.value].label)
			},
			bindSubLevelChange(e) {
				this.model1.userInfo.subLevel = this.sublevelList[e.detail.value].value;
			},
			bindPlaceChange(e) {
				// console.log(e)
				this.model1.userInfo.place = e.detail.value.join('-');
			},
			bindNationChange(e) {
				this.model1.userInfo.nation = this.nationList[e.detail.value].label;
			},
			getsex(key) {
				return data.getsex(key)
			},
			getlaylevel(key) {
				return data.getlaylevel(key)
			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						const tempFilePaths = res.tempFilePaths;
						// let resSize = res.tempFiles[0].size;
						// if(resSize > 20971520){
						// 	uni.showToast({
						// 		title: "上传的图片大小不超过20m",
						// 		icon: 'none',
						// 		duration: 2000,
						// 		mask: true
						// 	});
						// 	return
						// }
						that.temp = tempFilePaths;
						that.model1.userInfo.img = tempFilePaths[0];
						// that.$api.uploadPicture({tempFilePaths: tempFilePaths}).then((res) => {
						// 	console.log(res)
						// })
					}
				});
			},
			save() {
				if (this.judge().status == true) {
					uni.showLoading({
						title: '正在提交'
					});
					this.$api
						.uploadPicture({
							tempFilePaths: this.temp
						})
						.then(res => {
							// console.log(res)
							var obj = this.model1.userInfo;
							obj.img = res.data.url;
							this.$api
								.applyLayer(obj)
								.then(res => {
									uni.hideLoading();
									if (res.success == true) {
										uni.showToast({
											title: '提交成功',
											duration: 2000
										});
										setTimeout(() => {
											uni.navigateBack({});
										}, 1000)
									} else {
										uni.showToast({
											title: res.message,
											icon: 'none'
										});
									}
								})
								.catch(err => {
									uni.hideLoading();
									uni.showToast({
										title: '提交失败，请重新提交',
										icon: 'none'
									});
								});
						})
						.catch(err => {
							uni.hideLoading();
							uni.showToast({
								title: '图片上传失败',
								icon: 'none'
							});
						});
				} else {
					uni.showToast({
						title: this.judge().value,
						icon: 'none'
					});
					return false;
				}
			}
		},
		onLoad() {}
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
