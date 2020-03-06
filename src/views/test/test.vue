<!-- <template>
  <div>
    <span>评分</span>
    <star size="48" :score="score" />
  </div>
</template>
-->

<template>
  <div class="hello">
    <my-rate :score.sync="score" />
  </div>
</template>

<script>
import myRate from '@/components/NaireComponent/StarRating2.vue'

export default {
  name: 'HelloWorld',
  components: {
    myRate
  },
  data () {
    return {
      score: 2
    }
  },
  watch: {
    score () {
      console.log(this.score)
    }
  }
}
// import star from '@/components/NaireComponent/StarRating1.vue'

// export default {
//   components: {
//     star
//   },
//   data () {
//     return {
//       score: 2.5
//     }
//   }
// }
</script>
