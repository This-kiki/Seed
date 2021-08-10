<template>
	<view class="container">
		<view class="ui-all">
			<view class="avatar" @tap="avatarChoose">
				<view  class="imgAvatar">
					<view class="iavatar" :style="'background: url('+ApplyMember.img+') no-repeat center/cover #eeeeee;'"></view>
				</view>
				<text v-if="avater">修改头像</text>
				<text v-if="!avater">选择头像</text>
			</view>
			<view class="text-box">
				<text>姓名</text>
				<input class="input-box" type="text" v-model="ApplyMember.name" placeholder-class="place" />
			</view>
			<view class="picker-box">
				<text>申请职位</text>
				<picker class="picker" mode='selector' range-key="name" v-model="ApplyMember.sex" @change="bindLevelChange" :range="levelList">
					<view class="picker-text">
						{{ApplyMember.level==0?'总经理':ApplyMember.level==1?'产品经理':ApplyMember.level==2?'部门经理':''}}
					</view>
				</picker>
			</view>
			<view class="text-box">
				<text>身份证</text>
				<input class="input-box" type="text" v-model="ApplyMember.idNum" placeholder-class="place" />
			</view>
			<view class="picker-box">
				<text>生日</text>
				<picker class="picker" mode="date" v-model="ApplyMember.birth" @change="bindDateChange">
					<view class="picker-text">
						{{ApplyMember.birth}}
					</view>
				</picker>
			</view>
			<view class="picker-box">
				<text>性别</text>
				<picker class="picker" mode='selector' range-key="name" v-model="ApplyMember.sex" @change="bindSexChange" :range="sexlist">
					<view class="picker-text">
						{{ApplyMember.sex==0?'男':ApplyMember.sex==1?'女':''}}
					</view>
				</picker>
			</view>
			<view class="text-box">
				<text>籍贯</text>
				<input class="input-box" type="text" v-model="ApplyMember.place" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>政治面貌</text>
				<input class="input-box" type="text" v-model="ApplyMember.polity" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>民族</text>
				<input class="input-box" type="text" v-model="ApplyMember.nation" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>手机号</text>
				<input class="input-box" type="text" v-model="ApplyMember.phone" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>电子邮箱</text>
				<input class="input-box" type="text" v-model="ApplyMember.email" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>学校</text>
				<input class="input-box" type="text" v-model="ApplyMember.school" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>专业</text>
				<input class="input-box" type="text" v-model="ApplyMember.major" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>工作单位</text>
				<input class="input-box" type="text" v-model="ApplyMember.work" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>工作职位</text>
				<input class="input-box" type="text" v-model="ApplyMember.position" placeholder-class="place" />
			</view>
			<view class="textarea-box">
				<text>简介</text>
				<textarea class="textarea" placeholder-class="place" v-model="ApplyMember.introduce"></textarea>
			</view>
		</view>
		<button class="save" @tap="save">提 交 审 核</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ApplyMember: {
					  img: "",
					  name: "",
					  idNum: "",
					  birth: "",
					  sex: null,
					  place: "",
					  polity: "",
					  nation: "",
					  phone: "",
					  email: "",
					  school: "",
					  major: "",
					  work: "",
					  position: "",
					  introduce: "",
					  level: null,
				},
				sexlist: [{
					id: 0,
					name: '男'
				}, {
					id: 1,
					name: '女'
				}],
				levelList: [{
					id: 0,
					name: '总经理'
				},{
					id: 1,
					name: '产品经理'
				},{
					id: 2,
					name: '部门经理'
				}],
			}

		},
		methods: {
			bindLevelChange(e) {
				this.ApplyMember.level = this.levelList[e.detail.value].id;
			},
			bindSexChange(e) {
				this.ApplyMember.sex = this.sexlist[e.detail.value].id;
			},
			bindDateChange(e) {
				this.ApplyMember.birth = e.detail.value;
			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						const tempFilePaths = res.tempFilePaths
						that.ApplyMember.img = tempFilePaths[0]
						// that.$api.uploadPicture({tempFilePaths: tempFilePaths}).then((res) => {
						// 	console.log(res)
						// })
					}
				});
			},
			save() {
				console.log(this.ApplyMember)
			},
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
		},
		onLoad() {			
		}

	}
</script>

<style lang="scss">
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	.ui-all {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.avatar {
			width: 100%;
			height: 180rpx;
			border-bottom: solid 1px #f2f2f2;
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
				margin-left: 50rpx;
				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 40rpx;
			}
		}
		.text-box {
			width: 100%;
			height: 80rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom: solid 1px #f2f2f2;
			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
			}
			.input-box {
				color: rgb(121, 121, 121);
				margin-left: 20rpx;
				font-size: 28rpx;
			}
			.place {
				color: rgb(200,200,200);
			}
		}
		.textarea-box {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			border-bottom: solid 1px #f2f2f2;
			text {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
				height: 80rpx;
			}
			.textarea {
				color: rgb(121, 121, 121);
				margin-left: 20rpx;
				font-size: 28rpx;
				height: 150rpx;
				width: 95%;
				border: solid 1px #f2f2f2;
			}
			.place {
				color: rgb(200,200,200);
			}
		}
		.picker-box {
			width: 100%;
			height: 80rpx;
			display: flex;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom: solid 1px #f2f2f2;
			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
			}
			.picker {
				width: 80%;
				height: 80rpx;
			}
			.picker-text {
				color: rgb(121, 121, 121);
				margin-left: 26rpx;
				height: 80rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
		}
	}
	.save {
		width: 80%;
		background: #030303;
		border: none;
		color: #ffffff;
		margin: 100rpx 0rpx;
		font-size: 28rpx;
	}
}
</style>