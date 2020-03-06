<!--自定义组件-->
<template>
  <!--结构层-->

  <div id="star">
    <span v-for="(classn,optIndex) in starArrs" :key="optIndex" :class="classn" class="staritem" />
    <!--<span  class="staritem onstar"></span>
            <span  class="staritem onstar"></span>
            <span  class="staritem halfstar"></span>
            <span  class="staritem offstar"></span>-->
  </div>

</template>
<script>
//  行为
export default {
  props: ['score'],
  computed: {
    starArrs () {
      var starArr = [] // 3.9
      //              全星星的个数
      const onstar = parseInt(this.score)
      console.log(onstar)
      //              是否有半星
      const halfStar = !!Math.round(this.score - onstar)
      //              有多少课灰色的星星

      for (var i = 0; i < onstar; i++) {
        starArr.push('onstar')
      }
      if (halfStar) {
        starArr.push('halfstar')
      }
      while (starArr.length < 5) {
        starArr.push('offstar')
      }

      return starArr
    }
  },
  created () {
    console.log('子组件')
  },
  mounted () {
    console.log('打印传递的分数')
  }

}
</script>
<style scoped="scoped">
    /*独立作用域的样式*/
    .staritem{
        display: inline-block;
        width: 0.37037rem;
        height: 0.37037rem;

    }
    /*全星星*/
    .onstar{
        background: url('~@/assets/star_on.png');
        background-size: 0.37037rem;
    }
    .halfstar{
        background: url('~@/assets/star_half.png');
    }
    .offstar{
        background: url('~@/assets/star_off.png');
    }
</style>
