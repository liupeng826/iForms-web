<template>
  <div>
    <i v-for="(v,i) in 5" :key="i" class="iconfont " :class="getClass(i)" @mouseover="disabled ?'': curScore=i+1" @mouseout="disabled ?'':curScore=''" @click="getScore(i+1)" />
  </div>
</template>
<script>
export default {
  name: 'MyRate',
  props: ['score'],
  data () {
    return {
      curScore: '',
      disabled: false
    }
  },
  methods: {
    getScore (v) {
      this.$emit('update:score', v)
    },
    getClass (i) {
      if (this.curScore === '') {
        return i <= this.score - 1 ? 'icon-star' : 'icon-xingxing'
      } else {
        return i <= this.curScore - 1 ? 'icon-star' : 'icon-xingxing'
      }
    }
  }
}
</script>
<style scoped>

</style>
