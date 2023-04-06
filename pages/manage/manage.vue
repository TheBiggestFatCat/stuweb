<template>
	<view :class="print ? 'page-print' : 'page'">
		<view class="sidebar" v-show="!print">
			<h3>系统管理端</h3>
			<view>当前登录账户：</view>
			<view style="color: #0b50ab; font-weight: 600;">{{username}}</view>
			<p @click="page='teacher'" :class="page=='teacher' ? 'selected' : 'select'">教师</p>
			<p @click="page='student'" :class="page=='student' ? 'selected' : 'select'">学生</p>
			<p @click="print = true">打印模式</p>
		</view>
		<view class="arrow" v-show="print" @click="print = false">
			<uni-icons type="right" size="24"></uni-icons>
		</view>
		<view class="container" v-show="page=='teacher'">
			<uni-table border stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center">ID</uni-th>
					<uni-th align="center">教师名</uni-th>
					<uni-th align="center">头像路径</uni-th>
					<uni-th align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in filteredUsers" :key="index">
					<uni-td align="center">{{item.userId}}</uni-td>
					<uni-td align="center">{{item.userName}}</uni-td>
					<uni-td align="center">{{item.picture}}</uni-td>
					<uni-td align="center">
						<view style="display: flex;">
							<button size="mini" @click="openTeacher(item.userName)">更改</button>
							<button size="mini" @click="delUser(item.userId)">删除</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<view class="container" v-show="page=='student'">
			<view style="width: 100%; padding: 20rpx; background-color: #fff; box-sizing: border-box;">
				<view style="width: 300px;">
					<uni-easyinput v-model="filterText" placeholder="搜索"></uni-easyinput>
				</view>
			</view>
			<uni-table border stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center">学号</uni-th>
					<uni-th align="center">姓名</uni-th>
					<uni-th align="center">学校</uni-th>
					<uni-th align="center">学院</uni-th>
					<uni-th align="center">班级</uni-th>
					<uni-th align="center">辅导员</uni-th>
					<uni-th align="center">获奖记录</uni-th>
					<uni-th align="center">曾获奖学金</uni-th>
					<uni-th align="center">是否贫困生</uni-th>
					<uni-th v-show="!print" align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in filteredItems" :key="index">
					<uni-td align="center">{{item.studentId}}</uni-td>
					<uni-td align="center">{{item.stuName}}</uni-td>
					<uni-td align="center">{{item.school}}</uni-td>
					<uni-td align="center">{{item.college}}</uni-td>
					<uni-td align="center">{{item.className}}</uni-td>
					<uni-td align="center">{{item.assistant}}</uni-td>
					<uni-td align="center">{{item.award}}</uni-td>
					<uni-td align="center">{{item.scholarship}}</uni-td>
					<uni-td align="center">{{item.poor == 1 ? '是': '否'}}</uni-td>
					<uni-td align="center" v-show="!print">
						<view style="display: flex;">
							<button class="button" size="mini" style="background-color: #2979ff;" type="primary" @click="openStuAlter(item.stuName, item.studentId)"><text class="button-text">更改</text></button>
							<button class="button" size="mini" style="background-color: #e43d33;" type="primary" @click="delStu(item.stuId)"><text class="button-text">删除</text></button>
							</view>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		
		<view class="">
			<uni-popup ref="teacheralter" type="center">
				<view class="" style="border-radius: 10px; padding: 40px; background-color: #fff;">
					<h3>修改教师信息</h3>
					<view style="margin-top: 20px;">
						<span>用户名：</span><span>{{alteringInfo.userName}}</span>
					</view>
					<view style="margin-top: 20px;" class="">
						<span>密码</span><uni-easyinput style="margin-top: 20px;" class="input" v-model="alteringInfo.password" placeholder="" />
					</view>
					<view style="margin-top: 20px;" class="">
						<span>头像路径</span><uni-easyinput style="margin-top: 20px;" class="input" v-model="alteringInfo.picture" placeholder="" />
					</view>
					<button @click="alterTeacher()" style="margin-top: 20px;">修改</button>
				</view>
			</uni-popup>
			
			<view class="">
				<uni-popup ref="stuInfo" type="center">
					<view class="" style="border-radius: 10px; padding: 40px; background-color: #fff;">
						<h3>修改学生信息</h3>
						<view style="margin-top: 10px;">
							<span>学号：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.studentId" placeholder="" />
						</view>
						<view style="margin-top: 10px;">
							<span>姓名：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.stuName" placeholder="" />
						</view>
						<view style="margin-top: 10px;">
							<span>学校：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.school" placeholder="" />
						</view>
						<view style="margin-top: 10px;">
							<span>学院：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.college" placeholder="" />
						</view>
						<view style="margin-top: 10px;">
							<span>班级：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.className" placeholder="" />
						</view>
						<view style="margin-top: 10px;">
							<span>辅导员：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.assistant" placeholder="" />
						</view>
						<view style="margin-top: 10px;">
							<span>获奖记录：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.award" placeholder="" />
						</view>
						<view style="margin-top: 10px;">
							<span>曾获奖学金：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.scholarship" placeholder="" />
						</view>
						<view style="margin-top: 10px;">
							<span>是否贫困生：</span>
							<uni-easyinput style="margin-top: 10px;" class="input" v-model="alteringStuInfo.poor" placeholder="" />
						</view>
						<button @click="stualter" style="margin-top: 10px;">修改</button>
					</view>
				</uni-popup>
			</view>

			
			<uni-popup ref="popup3" type="center">
				<img class="bigpic" style="width: 700rpx; height: 700rpx;" :src="bigpic" alt="">
			</uni-popup>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				users: [
					{
						username: '',
					}
				],
				username: '',
				print: false,
				students: [],
				items: [],
				filterData: [],
				filterText: '',
				grade: [],
				stuId: 0,
				showPicture: [],
				bigpic: '',
				page: 'teacher',
				alteringInfo: {},
				alteringStuInfo: {}
			}
		},
		methods: {
			// 获取数据
			getData() {
				const that = this
				that.username = getApp().globalData.username
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/User/selectAllUser',
					success(res) {
						that.users = res.data
					}
				})
			},
			getData2() {
				const that = this
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/Students/selectAllStudents',
					success(res) {
						for (let i of res.data) {
							if (i.photo == null) {
								i.photo = ''
							}
						}
						that.$data.items = res.data
					}
				})
				
			},
			
			// 打开教师修改弹窗
			openTeacher(username) {
				const that = this
				this.$refs.teacheralter.open()
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/User/selectUserByName/' + username,
					success(res) {
						that.alteringInfo = res.data
					}
				})
			},
			
			// 打开学生图片修改弹窗
			openPicture() {
				this.$refs.stuPicture.open()
			},
			
			// 修改教师
			alterTeacher() {
				const that = this
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/User/alterUser/',
					method:'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						userId: that.alteringInfo.userId,
						password: that.alteringInfo.password,
						picture: that.alteringInfo.picture
					},
					success(res) {
						uni.showToast({
							title: '修改成功'
						})
					}
				})
			},
			
			// 打开修改学生信息弹窗
			openStuAlter(stuName, studentId) {
				const that = this
				this.$refs.stuInfo.open()
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/Students/selectStudentsByName',
					method: 'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						stuName,
						studentId
					},
					success(res) {
						that.alteringStuInfo = res.data[0]
					}
				})

			},
			
			// 删除用户
			delUser(userId) {
				const that = this
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/User/deleteUser/' + userId,
					success(res) {
						
					console.log(res, userId);
						if (res.data == 1) {
							uni.showToast({
								title: '删除成功'
							})
							that.getData()
						} else {
							uni.showToast({
								title: '删除失败',
								icon: 'error'
							})
						}
					}
				})
			},
			
			// 删除学生
			delStu(userId) {
				const that = this
				uni.request({
					url: 'http://127.0.0.1:8091/Admin/Students/deleteStudents/' + userId,
					success(res) {
					console.log(res, userId);
						if (res.data == 1) {
							uni.showToast({
								title: '删除成功'
							})
							that.getData2()
						} else {
							uni.showToast({
								title: '删除失败',
								icon: 'error'
							})
						}
					}
				})
			}
		},
		computed: {
			// 筛选身份为教师的用户
			filteredUsers() {
				let filterData = []
				for (let i of this.users) {
					if (i.role == 2) {
						filterData.push(i)
					}
				}
				return filterData
			},
			filteredItems() {
				let filterData = []
				for (let i of this.items) {
					let arr = Object.values(i)
					for (let j in arr) {
						if (filterData[filterData.length - 1] == i) {
							break
						}
						if (j != 0) {
							if (arr[j] == null) {
								arr[j] = ''
							}
							if (arr[j].toString().indexOf(this.filterText) !== -1) {
								filterData.push(i)
							}
						}
					}
				}
				return filterData
			},
		},
		onShow() {
			this.getData()
			this.getData2()
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 40px 80px 0 320px;
	}
	
	.page-print {
		padding: 40px 80px 0 80px;
	}
	
	button:nth-of-type(1) {
		background-color: $uni-primary;
	}
	
	button:nth-of-type(2) {
		background-color: $uni-error;
	}
	
	button {
		color: #fff; 
		font-size: 14px; 
		padding: 0px 20px; 
		width: 80px;
		display: flex; 
		justify-content: center; 
		align-items: center;
	}
	
	.sidebar {
		position: fixed;
		padding: 30px;
		box-sizing: border-box;
		text-align: center;
		left: 0;
		top: 0;
		background-color: #fff;
		width: 240px;
		height: 100vh;
		box-shadow: 0 0 10px #dddddd;
	}
	
	.sidebar h3 {
		font-size: 28px;
		font-weight: 600;
		padding: 20px;
	}
	
	.sidebar view {
		padding: 20px;
	}
	
	.sidebar p {
		cursor: pointer;
		padding: 20px;
		transition: all .2s;
	}
	
	.sidebar p:hover {
		background-color: #e6e6e6;
	}
	
	.arrow {
		height: 61px;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 350px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	
	.arrow p:hover {
		background-color: #e6e6e6;
	}
	
	.selected {
		background-color: #ececec;
	}
</style>
