<template name="answer_cell">
  <view class="cell">
    <!-- cell标题 start-->
    <view :class="'cell-title ' + (wenItem.imageA.length == 1?'single-image':'')">
      <text class="wen">问</text> {{wenItem.subject}}
    </view>
    <!-- cell标题 end-->

    <!-- 附件 start-->
    <view class="cell-att" v-if="wenItem.imageA.length > 1">
      <block v-for="(item, index) in wenItem.imageA" :key="index" v-if="index < 3">
        <image class="cell-image" :src="item.attachment" mode="aspectFill"></image>
      </block>
    </view>

    <!-- 附件 end-->

    <!-- cell信息start -->
    <view class="cell-info">
      <view class="cell-info-left">
        <view class="icon-item cell-tag">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_tag.png"></image>
          <view class="cell-icon-text">{{wenItem.typename?wenItem.typename:'分类'}}</view>
        </view>
        <view class="icon-item cell-recount">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_dis.png"></image>
          <view class="cell-icon-text">{{wenItem.replies}}个回答</view>
        </view>
      </view>

      <view cell-info-right>
        <view class="icon-item cell-recount" @tap.stop="clickReply" :id="wenItem.tid">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_re.png"></image>
          <view class="cell-reply">回答</view>
        </view>
      </view>
    </view>

  </view>
  <!-- cell信息end -->

</template>