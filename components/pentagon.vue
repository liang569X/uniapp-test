<template>
	<view>
		<view class="pentagon">
			<i v-for="(item,index) in Math.floor(Math.random()*5+1)" class='back-pic'>

			</i>
			<!-- <i class='back-pic-blank' v-for='(itemf,indexf) in 5'>

			</i> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pent: Number
		},
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.back-pic {
		width: 15px;
		height: 15px;
		/* border: 1px solid black; */
		display: inline-block;
		background-image: url('.././static/wuxing.png');
		background-repeat: no-repeat;
		background-size: cover;


	}

	/* .back-pic-blank {
		width: 15px;
		height: 15px; */
		/* border: 1px solid black; */
		/* display: inline-block;
		background-image: url('.././static/graypenta.png');
		background-repeat: no-repeat;
		background-size: cover; */
	/* } */

	.pentagon {
		/* border: 1px solid black; */
		width: 50%;
		float: left;
		margin-top: 3%;
		margin-right: 10px;
		
	}

	.pentagon-bottom {
		width: 60%;
		height: 30rpx;
		/* border: 1px solid black; */
		position: absolute;
		right: 15%;
		bottom: 18%;
		text-align: center;
	}

	.pentagon-bottom text {
		font-size: 12px;
		display: inline-block;
		margin: 0 auto;
		position: absolute;
		right: 0;
	}
</style>
