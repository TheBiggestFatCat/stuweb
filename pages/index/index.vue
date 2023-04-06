<template>
	<view class="container">
		<view class="card">
			<view class="top">
				学生管理
			</view>
			<view class="title">用户名</view>
			<uni-easyinput class="input" v-model="username" placeholder="" />
			<view class="title">密码</view>
			<uni-easyinput class="input" v-model="password" type="password" placeholder="" />
			<view style="margin-top: 10px; padding: 20px;">
				<view class="uni-px-5 uni-pb-5">
					<uni-data-checkbox v-model="radio1" :localdata="sex"></uni-data-checkbox>
				</view>
			</view>
			<button size="mini" @click="login">登录</button>
			<button size="mini" @click="register">注册</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				radio1: 1,
				sex: [
				// 	{
				// 	text: '教师',
				// 	value: 2
				// }, 
				{
					text: '管理员',
					value: 1
				},
				]
			}
		},
		
		methods: {
			// 跳转至注册
			register() {
				uni.navigateTo({
					url: '/pages/register/register',
				})
			},
			// 登录
			login() {
				const that = this
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/User/selectUserByName/' + this.$data.username,
					success(res) {
						getApp().globalData.userid = res.data.userId
					}
				})
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/User/userLogin',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method:'POST',
					data:{
						userName: this.$data.username,
						password: this.$data.password,
						role: this.$data.radio1
					},
					success(res) {
						if (res.data == 1) {
							if (that.radio1 == 2) {
								getApp().globalData.username = that.$data.username
								uni.switchTab({
									url: '/pages/info/info'
								})
							} else {
								getApp().globalData.username = that.$data.username
								uni.redirectTo({
									url: '/pages/manage/manage'
								})
							}
						}
						else {
							uni.showToast({
								title: '登录失败',
								icon: 'error'
							})
						}
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-image: url('@/static/preview.jpg');
		background-size: cover;
		padding-top: 200px;
		background-repeat: no-repeat;
	}
	
	.title {
		font-size: 16px;
		padding: 20px;
	}
	
	.input {
		font-size: 16px;
		margin-left: 20px;
		width: calc(100% - 40px);
	}
	
	.top {
		font-size: 32px;
		font-weight: 600;
		padding: 20px;
	}
	
	.card {
		width: 400px;
		height: 460px;
		background-color: #fff;
		box-shadow: 0 0 30px #7a7a7a;
		border-radius: 10px;
		padding: 40px;
		margin: 0 auto;
	}
	
	button {
		padding: 4px 24px;
		background-color: $uni-primary;
		color: #fff;
		margin-left: 20px;
	}
</style>
