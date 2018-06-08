<template>
  <div class="test" style="width: 200px;height: 200px;">
    <h1>test</h1>
    <p>{{msg}}</p>
    <p>{{data.getName}}</p>
    <p>{{postName}}</p>
    <button @click="changeLanguage">{{language}}</button>
    <h2>{{$t('test.name')}}</h2>
    <!--  loading -->
    <Loading v-show="loadingshow"></Loading>

    <!-- 弹出层 -->
    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header</h3>
      <!--<h3 slot="body">custom body</h3>-->
      <h3 slot="footer">custom footer</h3>
    </Modal>
    <button id="show-modal" @click="showModal = true">Show Modal</button>

    <!-- 表单 -->
    <input type="text" v-model="form.inputValue" class="input">
    <span v-show="changeValue.show">{{changeValue.text}}</span>


    <!-- 分页 -->
    <Pagination :pageNow="pageNow" :list="list" :pageSize="pageSize" :total="total" @getData="_testPost"></Pagination>

  </div>
</template>

<script type="text/ecmascript-6">
  import {testPost} from 'api/test'
import Modal from 'base/modal/modal'
  import Loading from 'base/loading/loading'
  import {isEmpty} from 'common/validate'
  import Pagination from 'base/pagination/pagination'

  let index = 0
export default {
    data () {
      return {
        msg: 'testData',
        data: {
          getName: '',
          postName: ''
        },
        postName: '',
        language: 'english',
        lang: 'zh',
        showModal: false,
        form: {
          inputValue: ''
        },
        inputValued: '',
        list: [],
        pageSize: 9,
        total: 0,
        pageNow: 0,
        loadingshow: true
      }
    },
    created () {
      setTimeout(() => {
        // this._testPost()
      }, 1000)
    },
    mounted () {
      this._testGet()
    // this._testPost();
    },
    watch: {
      'form.inputValue': function () {
        console.log(111)
      }

    },
    computed: {
      changeValue: function () {
        index++
      // console.log(index);
        this.inputValued = index + ''
        return isEmpty(this.form.inputValue, this.$t('validate.require'))
      }
    },
    methods: {
      _testGet: function () {
        this.msg = 'testChange'
      },
      _testPost: function (page, pageSize) {
        // console.log('page:'+page,'pageSize:'+pageSize);

        this.loadingshow = true
        testPost({
          page: page,
          pageSize: pageSize
        }).then((res) => {
          this.list = res.list
          this.total = res.total
          this.loadingshow = false
          this.pageNow = page
        })
      },
      changeLanguage: function () {
        if (this.lang === 'zh') {
          this.lang = 'en'
          this.$i18n.locale = this.lang// 关键语句
          this.language = '中文'
        } else {
          this.lang = 'zh'
          this.$i18n.locale = this.lang// 关键语句
          this.language = 'english'
        }
        sessionStorage.setItem('language', this.lang)
      }
    },
    components: {
      Modal,
      Loading,
      Pagination
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .test
    h1
      color : red
    button
      width :100px;
      height :50px;
      background blue;
      color white;
      cursor pointer
    p{
      color antiquewhite;
    }
  .input{
    border 1px solid #faebd7
  }
</style>
