<template>
  <div class="promoter-score">
    <ul>
      <li :style="{'background-color': '#aaa'}">
        <div>0</div>
      </li>
      <li v-for="score in +(question.questionOptions[0].totalValue)" :key="score" :style="{'background-color': '#aaa'}">
        <div>{{ score }}</div>
      </li>
    </ul>
    <div class="footer">
      <div>{{ question.questionOptions[0].netPromoterFrom }}</div>
      <div>{{ question.questionOptions[0].netPromoterTo }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) question!: Questionnaire.IQuestion
  @Prop({ required: false }) answer!: Questionnaire.IAnswer

  get bgColor () {
    const val = +(this.answer.answerValue)
    let max = this.question.questionOptions[0].totalValue || 0
    max = +max
    const shift = Math.floor(val / max * 200)
    return 'rgb(' + (255 - shift) + ',' + shift + ', 50)'
  }
}
</script>

<style lang="scss" scoped>
  .promoter-score {
    padding: 1rem 0 0 1.25rem;
    > ul {
      list-style-type: none;
      display: flex;
      margin: 0;
      padding: 0;
      height: 2rem;
      color: #fff;
      > li {
        list-style-type: none;
        flex: 1;
        margin: 0;
        padding: 0;
        background-color: #aaa;
        text-align: center;
        > div {
          border-right: solid 1px #fff;
          line-height: 2rem;
          font-size: 0.875rem;
        }
        &:first-child {
          border-top-left-radius: .3rem;
          border-bottom-left-radius: .3rem;
        }
        &:last-child {
          border-top-right-radius: .3rem;
          border-bottom-right-radius: .3rem;
        }
      }
    }
    .footer {
      display: flex;
      > div {
        flex: 1;
        font-size: 0.75rem;
        &:last-child {
          text-align: right;
        }
      }
    }
  }
</style>
