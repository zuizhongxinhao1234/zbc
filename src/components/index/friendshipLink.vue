<template>
  <div class="page">
    <div class="siteLink">
      <p class="title">
        {{$t('friendshipLink.friendshipLink')}}
      </p>
      <ul>
        <li :key="data.id" v-for="data in friendshipLink">
          <a :href="(data.link)" target="_blank">
            <img :src="(data.picture)" class="friendship-link-img" :alt="$t('friendshipLink.imgLoadingError')">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {_apiGetFriendShows} from 'api'
export default {
  data () {
    return {
      friendshipLink: []
    }
  },
  async created () {
    let res = await _apiGetFriendShows({type: 1})
    if (res.statusCode === 200) {
      this.friendshipLink = res.data
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"
  .siteLink
    width 100%
    height 413px
    padding: 60px 0;
    background-image('../../assets/images/multiplatform/wrap_download.ff64cd4.png')
    .title
      text-align: center;
      font-size: 30px;
      color: $color-main-font
    span
      color: $color-table-font-tips
      font-size: 26px
    .friendship-link-img
      margin-right: 20px;
      background: rgba(184, 194, 224,.1);
      border-radius: 5px
    ul
      width 1400px
      margin: 0 auto;
      margin-top: 10px;
      padding: 20px;
      overflow: hidden;
      li
        float: left;
        width: 14.2%;
        min-height: 50px;
        text-align: center;
        margin-top: 36px;
</style>
