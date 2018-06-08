<template>
  <div>
    <el-table
      :data="setHistory"
      size="small"
      width="100%">
      <el-table-column prop="time" :label="$t('setHistory.time')"></el-table-column>
      <el-table-column prop="set" :label="$t('setHistory.safeSet')"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Name',
    data () {
      return {
        setHistory: [
          {
            time: '2018-04-19 12:12:52',
            set: this.$t('setHistory.openGoogle'),
            ip: '192.168.0.1'
          },
          {
            time: '2018-04-19 12:12:18',
            set: this.$t('setHistory.bindGoogle'),
            ip: '192.168.0.1'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
