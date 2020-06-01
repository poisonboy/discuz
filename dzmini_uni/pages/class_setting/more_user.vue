<template>
<view>
<template name="moreUser">
  <view class="l_member">
    <block v-for="(item, index) in userList" :key="index">
      <view class="fl me_item">
        <view class="img_block">
          <view class="me_head">
            <image mode="aspectFill" :src="item.avatar"></image>
          </view>
          <view class="me_lab lab_zhu" v-if="item.level == 1">管</view>
          <view class="me_lab lab_guan" v-if="item.level==2">管</view>
          <view class="me_lab lab_shi" v-if="item.level == 3">师</view>
        </view>
        <view class="me_nick ell">{{item.nickname?item.nickname:item.realname?item.realname:item.username}}</view>
      </view>
    </block>
    <!-- 加号 -->
    <view class="fl me_item">
      <button class="me_head" open-type="share">
        <view class="me_add"></view>
        <view class="me_jian"></view>
      </button>
      <view class="me_nick ell"></view>
    </view>
    <!-- 减号 -->
    <view class="fl me_item" v-if="userList.length > 1 &&(myInfo.level==1 || myInfo.level==2)" @tap="goToRemoveUser">
      <view class="me_head">
        <view class="me_jian"></view>
      </view>
      <view class="me_nick ell"></view>
    </view>

    <view class="fl me_more" v-if="!noMore" @tap="goToMoreUser">
      <text>查看更多群成员</text>
    </view>
  </view>
</template>
</view>
</template>


	<script> 
		
		export default {
			props: []
		}
    </script> 
    
									