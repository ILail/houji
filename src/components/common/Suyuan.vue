<template>
  
  
    <child :url='videoURL' :poster="poster"></child>

</template>

<script type="text/ecmascript-6">
import child from './components/videoChild'
export default {
		name: 'app',
		data() {
			return {
				videoURL:'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
				poster: 'http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg'
			}
		},
		components: {
       child
   	}
    
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>


</style>
