<template>
	<view >
		<view>
			<shopcar></shopcar>
		</view>
		<view class="bottom_bar">
			<view class="cash">
				<view class="mid">
					<button type="warn" size="default" v-on:click="deleteall">删除全部</button>
				</view>
				<view class="right">
					<view style="width: 50%;height: 100%;font-size: 35rpx; text-align: center; line-height: 50px;">
						合计{{this.$store.getters.money}}
					</view>
					<view style="width: 50%;height: 100%;" >
					<button @click="delivery" type="primary" size="default" >结算</button>	
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import shopcar from '../../components/shopcar.vue'
	export default {
		components: {
			shopcar
		},
		computed: {
			sentshopinfo() {
				return this.$store.state.selected;
			}	
		},
		methods: {
			deleteall(){
				this.$store.commit('deleteall');
				uni.removeTabBarBadge({
					index:1
				})
			},
			delivery() {
				uni.showModal({
					title: '将要结算',
					content: `总计¥:${this.$store.getters.money}`,
					showCancel: true
				});

			}
		}

	}
</script>

<style scoped>
	.bottom_bar {
		position: fixed;
		bottom: 7%;
		width: 100%;
		height: 100rpx;
		border-radius: 7rpx;
		background-color: rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
	}

	.cash {
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.mid {
		width: 30%;
		height: 100%;
		position: relative;
	}

	.right {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;

	}
</style>
