<template>
	<view>
 <!-- #ifndef MP -->

		<view class="card_product">
			<navigator class="card_product_link" :url="'../webview/webview?url='+product.readyContent">
				<view class="picbox">
					<image :src="product.imagePath"></image>

				</view>
				<view class="product_title">{{product.title}}</view>
				<view class="product_price">{{product.price}}元 </view>
				<text class="gobuy">去购买</text>
			</navigator>

		</view>

<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: 'nui-card-product',
		data() {
			return {};
		},
		props: {
			product: {
				type: [Object, Array],

			}
		}
	};
</script>

<style scoped lang="scss">
	.container {}

	.card_product {
		background: #fff;
		box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .08);
		margin: 5px 0 8px;
	
		line-height: normal;
		position: relative;
		border-radius: 12px;
	}

	 

	.card_product_link {
		display: block;
		overflow: hidden;
		position: relative;
		border-radius: 12px;
			padding: 12px;
	overflow: hidden;
		.picbox {
			width: 80px;
			height: 80px;
			float: left;
			text-align: center;
			margin-right: 10px;
			position: relative;
			overflow: hidden;

			border-radius: 12px;

			image {
				max-width: 80px;
				max-height: 80px;
				vertical-align: middle;
				margin-left: 0;
				display: inline;
			}
		}

		.product_title {
			font-weight: 700;
			font-size: 14px;
			line-height: 22px;
			overflow: hidden;
			color: #333;
			margin-bottom: 4px;
			height: 44px;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;

		}

		.product_price {
			position: absolute;
			left: 100px;
			bottom:12px;
			margin: 0;
			color: #e62828;
			float: left;
			height: 24px;
			line-height: 24px;
			width: 40%;
			max-width: 128px;
			font-size: 16px;
		}

		.gobuy {
			position: absolute;
		bottom:12px;
			right: 12px;
			font-size: 12px;
			color: #fff;
			float: right;
			width: 60px;
			height: 24px;
			line-height: 24px;
			text-align: center;
			background-image: -o-linear-gradient(91deg, #e62828 0, #ff5a3c 100%);
			background-image: linear-gradient(-1deg, #e62828, #ff5a3c);
			border-radius: 12px;

		}
	}
</style>
