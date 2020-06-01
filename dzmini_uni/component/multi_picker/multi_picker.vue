<template>
<view>
<!--component/multi_picker/multi_picker.wxml-->
<view @tap.stop="showSelectList">
  <slot></slot>
</view>
<view :class="'sele_box ' + (showSelectList?'active':'')" v-if="showSelectList">
  <view class="ceng" @tap.stop="hideSelectList"></view>
  <view :class="'content ' + (hideSearch?'muti_low':'')">
    <view class="top">
      <view class="fl">{{title}}</view>
      <view class="fr" @tap.stop="hideSelectList">完成</view>
    </view>
    <view class="sea_box" v-if="!isWeek">
      <input class="sea_bar" placeholder="输入搜索关键词" @input="search" :value="keyword"></input>
    </view>
    <view :class="'sch_list ' + (hideSearch?'hideSearch':'')">

      <checkbox-group @change="everyDayChange" v-if="isAll">
        <view class="poll-cell">
          <label class="checkbox box_space">
            <text>全选</text>
            <checkbox value="all" id="all" :checked="allChecked"></checkbox>
          </label>
        </view>
      </checkbox-group>

      <checkbox-group @change="checkboxChange" v-if="showTeachers.length>0">
        <block v-for="(item, index) in showTeachers" :key="index">
          <view class="poll-cell">

            <label class="checkbox">
              <text>{{item.realname}}</text>
              <checkbox :value="item.uid" name="teacherid" :checked="item.checked"></checkbox>
            </label>
          </view>
        </block>
      </checkbox-group>
      
      <checkbox-group @change="checkDayChange" v-if="isWeek">
        <block v-for="(item, index) in weekarray" :key="index">
          <view class="poll-cell">
            <label class="checkbox box_space">
              <text>{{item.name}}</text>
              <checkbox :value="index" name="day" :checked="item.checked"></checkbox>
            </label>
          </view>
        </block>
      </checkbox-group>

    </view>
  </view>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      teachlist: [],
      showTeachers: [],
      selectTeacher: [],
      selectWeekDayList: [],
      keyword: '',
      isWeek: false,
      weekarray: [{
        name: '周一',
        checked: false
      }, {
        name: '周二',
        checked: false
      }, {
        name: '周三',
        checked: false
      }, {
        name: '周四',
        checked: false
      }, {
        name: '周五',
        checked: false
      }, {
        name: '周六',
        checked: false
      }, {
        name: '周日',
        checked: false
      }],
      allChecked: false,
      showSelectList: false
    };
  },

  components: {},
  props: {
    title: {
      type: String
    },
    hideSearch: {
      type: Boolean
    },
    teachlist: {
      type: Array
    },
    selectTeacherList: {
      type: Array
    },
    isWeek: {
      type: Boolean
    },
    selectWeekDayList: {
      type: Array
    },
    isAll: {
      type: Boolean
    }
  },
  watch: {
    title: '_titleChange',
    hideSearch: '_hideSearchChange',
    teachlist: {
      handler: '_teachlistChange',
      deep: true
    },
    selectTeacherList: {
      handler: '_selectTeacherListChange',
      deep: true
    },
    isWeek: '_isWeekChange',
    selectWeekDayList: {
      handler: '_selectWeekDayListChange',
      deep: true
    },
    isAll: '_isAllChange'
  },
  methods: {
    titleChangeFun(newVal, oldVal) {
      this.setData({
        title: newVal
      });
    },

    hideSearchChangeFun(newVal, oldVal) {
      this.setData({
        hideSearch: newVal
      });
    },

    teachlistChangeFun(newVal, oldVal) {
      this.setData({
        teachlist: newVal,
        showTeachers: newVal
      });
    },

    selectTeacherListChangeFun(newVal, oldVal) {
      this.setData({
        selectTeacher: newVal
      });
    },

    selectWeekDayListChangeFun(newVal, oldVal) {
      this.setData({
        selectWeekDayList: newVal
      });
    },

    isWeekChangeFun(newVal, oldVal) {
      this.setData({
        isWeek: newVal
      });
    },

    isAllChangeFun(newVal, oldVal) {
      this.setData({
        isAll: newVal
      });
    },

    search(e) {
      var keywords = e.detail.value;
    },

    checkboxChange(e) {
      var newChecked = e.detail.value;

      if (this.selectTeacher.length > 0) {
        // 之前选过的，是否在showTeachers里面，如果是，判断下是否选择
        for (let i = 0; i < this.showTeachers.length; i++) {
          let teacher = this.showTeachers[i];
          var index = this.selectTeacher.indexOf(teacher.uid);

          if (index != -1) {
            // 之前选过的有显示
            var newIndex = newChecked.indexOf(teacher.uid);

            if (newIndex != -1) {
              // 之前选过的依然被选中
              newChecked.splice(newIndex, 1);
            } else {
              // 之前选过的没有被选中,移除
              this.selectTeacher.splice(index, 1);
            }
          }
        }
      }

      newChecked = this.selectTeacher.concat(newChecked);
      console.log(newChecked);
      this.setData({
        selectTeacher: newChecked
      });
      this.$emit('teacherSelect', {
        detail: newChecked
      });
    },

    everyDayChange(e) {
      var weekarray = this.weekarray;
      var newChecked = [];

      if (e.detail.value.length > 0) {
        for (let i = 0; i < weekarray.length; i++) {
          var day = weekarray[i];
          day.checked = true;
        }

        newChecked = [0, 1, 2, 3, 4, 5, 6];
      } else {
        for (let i = 0; i < weekarray.length; i++) {
          var day = weekarray[i];
          day.checked = false;
        }
      }

      this.setData({
        weekarray: weekarray,
        selectWeekDayList: newChecked
      });
      this.$emit('weekDaySelect', {
        detail: newChecked
      });
    },

    checkDayChange(e) {
      var newChecked = e.detail.value;
      newChecked.sort(function (a, b) {
        return a - b;
      });
      var allChecked = false;

      if (newChecked.length == 7) {
        allChecked = true;
      }

      this.setData({
        selectWeekDayList: newChecked,
        allChecked: allChecked
      });
      this.$emit('weekDaySelect', {
        detail: newChecked
      });
    },

    search(e) {
      var keyword = e.detail.value;
      var teachShow = [];

      for (let i = 0; i < this.teachlist.length; i++) {
        var teacher = this.teachlist[i];

        if (teacher.realname.indexOf(keyword) != -1) {
          teachShow.push(teacher);
        }
      }

      this.setData({
        showTeachers: teachShow,
        keyword: keyword
      });
      this.setDefaultSelect();
    },

    showSelectListFun() {
      if (!this.disabled) {
        this.setData({
          showSelectList: true
        });
        this.setDefaultSelect();
      }
    },

    hideSelectList() {
      this.setData({
        showSelectList: false
      });
    },

    setDefaultSelect() {
      if (this.teachlist.length > 0) {
        for (let i = 0; i < this.showTeachers.length; i++) {
          let teacher = this.showTeachers[i];

          if (this.selectTeacher.indexOf(teacher.uid) != -1) {
            teacher.checked = true;
          } else {
            teacher.checked = false;
          }
        }

        this.setData({
          showTeachers: this.showTeachers
        });
      }

      if (this.selectWeekDayList.length > 0) {
        for (let i = 0; i < this.weekarray.length; i++) {
          let weekDay = this.weekarray[i];

          if (this.selectWeekDayList.indexOf(i) != -1 || this.selectWeekDayList.indexOf(i.toString()) != -1) {
            weekDay.checked = true;
          } else {
            weekDay.checked = false;
          }
        }

        this.setData({
          weekarray: this.weekarray
        });
      }
    }

  }
};
</script>
<style>
@import "./multi_picker.css";
</style>