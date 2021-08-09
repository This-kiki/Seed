<template>
	<view>
		<!-- {{activityId}} -->
		<view class="" v-html="content">
			
		</view>
	</view>
</template>

<script>
	export default {
		props:["activityId"],
		data() {
			return {
				content: '<p><b>111111111</b></p><p><font size="6">222222222</font></p><p><i>333333333</i></p><p><font face="Times New Roman">444444444</font></p><p>😃<font face="Times New Roman"><br/></font></p><table border="0" width="100%" cellpadding="0" cellspacing="0" style="text-align:center;"><tbody><tr><th>1</th><th>2</th><th>3</th></tr><tr><td>4</td><td>5</td><td>6</td></tr><tr><td>7</td><td>8</td><td>9</td></tr></tbody></table><p data-we-empty-p="" style="text-align:left;"><img src="https://i01picsos.sogoucdn.com/caf58fc2e02d522d" style="max-width:100%;" contenteditable="false"/></p>'
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
