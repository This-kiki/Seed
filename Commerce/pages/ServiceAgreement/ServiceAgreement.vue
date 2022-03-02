<template>
	<view class="container">
		<topBar :nav="setNav"></topBar>
		<view class="title">
			用户服务协议
		</view>
		<view class="content">
			<view class="line">
				在注册前务必认真阅读本协议的内容、充分理解各条款内容，如有异议，您可选择不进入濠江珠浦种子会小程序(以下简称种子会)。
			</view>
			<view class="line">
				用户使用：
			</view>
			<view class="line">
				用户按照页面给与的提示完成全部注册步骤后，即成为种子会的用户。种子会可通过用户自行设定，向用户提供个性化信息服务。
			</view>
			<view class="line">
				用户充分了解并同意，种子会为用户提供个性化信息服务，用户须为自己注册账号下的行为负责，包括用户所导入、上载、传送的任何内容以及由此产生的任何后果，用户应对种子会中的内容自行加以判断，并承担因使用内容而引起的所有风险。种子会不对因用户行为而导致的损失承担责任。
			</view>
			<view class="line">
				用户须对在种子会上所传送信息的真实性、合法性、有效性等负责，与用户所传播的信息相关的任何法律责任由用户自行承担，与种子会无关。用户在种子会中记录的或通过种子会服务所传送的任何内容并不反映种子会的观点或政策，种子会对此不承担责任。
			</view>
			<view class="line">
				用户提供的个人信息或发布的信息不真实、不准确、不合法；发表内容不符合本协议或发表内容不符合法律法规的，种子会有权暂停或终止用户使用本平台的服务。用户如果对种子会的暂停或者终止或收回其账号行为有异议，客户可向平台提出意见，要求其继续提供服务。种子会收到客户此类信息的投诉与意见，会审核相关信息，并及时对用户给予反馈。若信息确实不真实或不准确或不合法有效，种子会平台要求用户提供符合要求的信息。
			</view>
			<view class="line">
				为避免用户终端数据丢失、更好服务用户之目的，种子会将向注册用户提供数据备份服务，经注册用户授权，种子会将存储于注册用户终端的种子会数据库中的数据资料上载至种子会服务器，并且提供恢复到终端设备服务。
			</view>
			<view class="line">
				用户不得利用种子会服务制作、上载、复制、发布、传播或者转载如下内容：
			</view>
			<view class="line">
				反对宪法所确定的基本原则的；
			</view>
			<view class="line">
				危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
			</view>
			<view class="line">
				损害国家荣誉和利益的；
			</view>
			<view class="line">
				煽动民族仇恨、民族歧视，破坏民族团结的；
			</view>
			<view class="line">
				破坏国家宗教政策，宣扬邪教和封建迷信的；
			</view>
			<view class="line">
				散布谣言，扰乱社会秩序，破坏社会稳定的；
			</view>
			<view class="line">
				散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
			</view>
			<view class="line">
				侮辱或者诽谤他人，侵害他人合法权益的；
			</view>
			<view class="line">
				法律、行政法规禁止的其他内容。
			</view>
			<view class="line">
				种子会有权针对用户发表的内容进行审核，若用户实施违反本条所述使用规则及法律法规的行为，种子会平台有权视行为严重程度，根据《侵权责任法》《信息网络传播权保护条例》等法律法规要求用户立即采取纠正、改正、恢复原状、消除影响等行为，且种子会有权自行采取合法有效且必要的措施（包括但不限于更改或删除相关侵权信息、暂停或终止用户使用本网络服务等），同时种子会保留进一步追究用户法律责任的权利。
			</view>
			<view class="line">
				种子会提供的服务中可能包含广告，用户同意在使用过程中显示种子会和第三方供应商、合作伙伴提供的广告。用户因就第三方提供的服务、产品与第三方产生争议的，由用户与第三方自行解决，种子会不承担责任。
			</view>
			<view class="line">
				种子会保留因业务发展需要，单方面对其服务器所提供的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销服务的权利。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				setNav: {
					titleColor: "#fff",
					navTitle: "用户服务协议",
					bgColor: "#36c1ba",
					isShowBackBtn: true,
					backBtnColor: "#fff"
				},
			};
		}
	}
</script>

<style lang="scss">
	.container {

		.title {
			font-size: 40rpx;
			font-weight: bold;
			padding: 0 40rpx;
			margin-top: 20rpx;
		}

		.content {
			margin-top: 30rpx;
			padding: 0 40rpx;

			.line {
				text-indent: 2em;
				margin-bottom: 15rpx;
			}
		}
	}
</style>
