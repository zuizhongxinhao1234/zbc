<template>
  <div>
    <my-header></my-header>
    <my-footer></my-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'

  export default {
    name: 'Name',
    data () {
      return {
      }
    },
    components: {
      'my-header': Header,
      'my-footer': Footer
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
