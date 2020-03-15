<template>
  <div v-loading.fullscreen.lock="loading">
    <header-info :naire="naire" />
    <div>
      <el-alert
        v-if="optionCounts.length <= 0"
        class="overload-tip"
        type="warning"
      >
        No Data Found
      </el-alert>
    </div>
    <div class="naire-btn">
      <el-select v-model="defaultMarket" placeholder="SELECT MARKET">
        <el-option
          v-for="item in allMarkets"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="defaultDealer" placeholder="SELECT DEALER">
        <el-option
          v-for="item in dealers"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="defaultMonth"
        type="month"
        placeholder="SELECT MONTH"
      />
    </div>
    <div class="header">
      <h1>{{ optionCounts[0].formTitle }}</h1>
    </div>
    <div
      v-for="(answer, index) in chartsOptions"
      :key="index"
      :class="index % 2 === 0 ? 'question-list left': 'question-list right'"
    >
      <div class="question-item">
        <h3 class="title">
          Q{{ index + 1 }}: （{{ answer.questionId }}）{{ answer.questionTitle
          }}{{ answer.isRequired ? "Required" : "Optional" }}
          <!-- <el-button type="primary" @click="downloadXls(index)">导出选项数据</el-button> -->
        </h3>
        <p class="description">{{ answer.answerDescription }}</p>
      </div>
      <!-- 图表，跟随内容变高 -->
      <div
        v-if="Number(answer.questionTypeId) === questionType.SINGLE_CHOICE ||
          Number(answer.questionTypeId) === questionType.MULTIPLE_CHOICE ||
          Number(answer.questionTypeId) === questionType.RATING ||
          Number(answer.questionTypeId) ===questionType.NET_PROMOTER_SCORE"
        class="echarts"
      >
        <div
          :id="'chart-' + index"
          :class="index % 2 === 0 ? 'chart-left': 'chart-right'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'

import HeaderInfo from '@/components/NaireComponent/HeaderInfo.vue'

import * as NaireAction from '@/api/naire'
import { questionType1 } from '@/config/enum/questionType'
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'

//  结果统计题目
interface StatisticQuestionItem extends Questionnaire.IQuestionItem {
  charts: string[];
  q_id: string;
}

class QuestionAnswer extends Vue {
  questionId: number = 0;
  questionTypeId: number = 0;
  questionTitle: string = '';
  isRequired: boolean = true;
  optionDescriptions: string[] = [];
  totalNumbers: number[] = [];

  // constructor (questionId: number, questionTypeId: number,
  //   optionDescriptions: string[], totalNumbers: number[]) {
  //   this.questionId = questionId
  //   this.questionTypeId = questionTypeId
  //   this.optionDescriptions = optionDescriptions
  //   this.totalNumbers = totalNumbers
  // }
}

@Component({
  components: {
    HeaderInfo
  }
})
export default class StatisticsComponent extends Vue {
  private loading: boolean = false;
  // private answers: Questionnaire.IAnswer[] = [];
  // private sections: Questionnaire.ISection[] | null = null;
  private optionCounts: Questionnaire.IOptionCount[] = [];
  private questionAnswers: Questionnaire.IQuestionAnswer[] = []
  private chartsOptions: any = [];
  private questionType = questionType1;
  private allMarkets: any =
    [{
      value: '1',
      label: 'Malaysia'
    }, {
      value: '2',
      label: 'Singapore'
    }, {
      value: '3',
      label: 'Thailand'
    }];
  private defaultMarket = '';
  private defaultDealer = '';
  private defaultMonth = '';

  getChartsData (optionCounts: any[]) {
    // this.drawChart(0)
    // this.drawChart(1)
    optionCounts.forEach((item: Questionnaire.IOptionCount, quesIndex: number) => {
      if (
        item.questionTypeId === questionType1.SINGLE_CHOICE ||
        item.questionTypeId === questionType1.MULTIPLE_CHOICE ||
        item.questionTypeId === questionType1.RATING ||
        item.questionTypeId === questionType1.NET_PROMOTER_SCORE
      ) {
        // const tempObj: any = {
        //   questionTitle: 'Q' + (quesIndex + 1),
        //   Axis: []
        // }
        // item.options!.forEach((option: Questionnaire.IOptionItem) => {
        //   // 字数过长则使用 ... 截掉多余文字
        //   const content =
        //     option.content.length > 16
        //       ? `${option.content.substring(0, 14)}...`
        //       : option.content
        //   tempObj.Axis.push(content)
        // })
        // tempObj.series = item.charts
        // this.chartsOptions[item.q_id] = { ...tempObj }
      }
    })
    this.generateAnswers()

    this.$nextTick(() => {
      optionCounts.forEach((item: Questionnaire.IOptionCount, index: number) => {
        if (
          Number(item.questionTypeId) === questionType1.SINGLE_CHOICE ||
          Number(item.questionTypeId) === questionType1.MULTIPLE_CHOICE ||
          Number(item.questionTypeId) === questionType1.RATING ||
          Number(item.questionTypeId) === questionType1.NET_PROMOTER_SCORE
        ) {
          this.drawChart(Number(index))
        }
      })
    })
  }

  generateAnswers () {
    var tempQuestionId: number = -1
    var that = this
    var tempQuestionAnswer: QuestionAnswer

    that.optionCounts.forEach((element, index) => {
      // var tempQuestionAnswer = {
      //   questionId: 0,
      //   questionTypeId: 0,
      //   optionDescriptions: [],
      //   totalNumbers: []
      // }

      if (tempQuestionId !== element.optionQuestionId) {
        // Different question
        tempQuestionId = element.optionQuestionId
        tempQuestionAnswer = new QuestionAnswer()
        // tempQuestionAnswer = new QuestionAnswer(element.optionQuestionId, element.questionTypeId,
        // element.optionDescription!, element.answerValue!)
        tempQuestionAnswer.questionId = element.optionQuestionId
        tempQuestionAnswer.questionTypeId = element.questionTypeId

        this.chartsOptions.push(tempQuestionAnswer)
      }

      // Same question
      if (Number(element.questionTypeId) === questionType1.SINGLE_CHOICE ||
          Number(element.questionTypeId) === questionType1.MULTIPLE_CHOICE) {
        tempQuestionAnswer.optionDescriptions.push(element.optionDescription!)
        tempQuestionAnswer.totalNumbers.push(Number(element.totalNumber!))
      } else if (Number(element.questionTypeId) === questionType1.RATING) {
        tempQuestionAnswer.optionDescriptions = ['Five Stars', 'Four Stars', 'Three Stars', 'Two Stars', 'One Star']
        // if (tempQuestionAnswer.totalNumbers.length === 0) {
        //   tempQuestionAnswer.totalNumbers = [0, 0, 0, 0, 0]
        // }

        switch (element.answerValue) {
          case 5:
            tempQuestionAnswer.totalNumbers[0] = element.totalNumber!
            break
          case 4:
            tempQuestionAnswer.totalNumbers[1] = Number(element.totalNumber!)
            break
          case 3:
            tempQuestionAnswer.totalNumbers[2] = Number(element.totalNumber!)
            break
          case 2:
            tempQuestionAnswer.totalNumbers[3] = Number(element.totalNumber!)
            break
          case 1:
            tempQuestionAnswer.totalNumbers[4] = Number(element.totalNumber!)
            break
        }
      } else if (Number(element.questionTypeId) === questionType1.NET_PROMOTER_SCORE) {
        tempQuestionAnswer.optionDescriptions = [element.netPromoterFrom!, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', element.netPromoterTo!]
        switch (element.answerValue) {
          case 10:
            tempQuestionAnswer.totalNumbers[10] = Number(element.totalNumber!)
            break
          case 9:
            tempQuestionAnswer.totalNumbers[9] = Number(element.totalNumber!)
            break
          case 8:
            tempQuestionAnswer.totalNumbers[8] = Number(element.totalNumber!)
            break
          case 7:
            tempQuestionAnswer.totalNumbers[7] = Number(element.totalNumber!)
            break
          case 6:
            tempQuestionAnswer.totalNumbers[6] = Number(element.totalNumber!)
            break
          case 5:
            tempQuestionAnswer.totalNumbers[5] = Number(element.totalNumber!)
            break
          case 4:
            tempQuestionAnswer.totalNumbers[4] = Number(element.totalNumber!)
            break
          case 3:
            tempQuestionAnswer.totalNumbers[3] = Number(element.totalNumber!)
            break
          case 2:
            tempQuestionAnswer.totalNumbers[2] = Number(element.totalNumber!)
            break
          case 1:
            tempQuestionAnswer.totalNumbers[1] = Number(element.totalNumber!)
            break
          case 0:
            tempQuestionAnswer.totalNumbers[0] = Number(element.totalNumber!)
            break
        }
      }
    })
  }

  drawChart (index: number) {
    const element = document.getElementById('chart-' + index) as HTMLDivElement
    const chart = echarts.init(element)
    var series: any[] = []
    var temp = this.chartsOptions

    this.chartsOptions[index].optionDescriptions.forEach((e, i) => {
      var eachPercentage =
        temp[index].totalNumbers[i] /
        temp[index].totalNumbers.reduce(function (a, b) { return a + b })

      series.push({
        name: e,
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%'
        },
        data: [eachPercentage * 100]
      })
    })

    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{c}%'
      },
      legend: {
        data: this.chartsOptions[index].optionDescription,
        bottom: 'bottom'
      },
      grid: {
        left: '3%',
        right: '4%',
        // bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      yAxis: {
        type: 'category',
        data: ['']
      },
      series: series,
      color: ['rgb(79,172,91)', 'rgb(223,130,68)', 'rgb(165,164,165)', 'rgb(245,193,67)', 'rgb(78,114,190)']
    }
    chart.setOption(option)
  }

  async fetchData () {
    this.loading = true
    const res = await NaireAction.statis({
      // answerId: this.$route.params.id
      // TODO: for test purpose to use mock data for the time being
      client: {
        id: 1,
        name: 'iForms_GTA',
        token: 'YWVzLTI1Ni1nY206Y0c5UGMwMXFRWGxOUXpCM1RWTXdlVTlUTUhoT1VWZFJZMUA1Mi4zOS45MC4yNjo1MjIxOQNv6RRuGEVvmGjB+jimI/gw==',
        isActive: 1
      },
      dealerId: '', // 703518
      formId: 47,
      from: 1402459763000, // 2019-03-13 14:49:23
      marketId: '9999',
      month: 2,
      to: 1604082375869 // 2020-03-13 14:52:55
    })
    this.loading = false
    if (res.success) {
      //   this.optionCounts = res.data!.map(item => {
      //     return {
      //       ...item
      //       // partOfAnswerList: item.type === questionType.TEXT_QUESTION ? item.answerList.slice(0, 100) : []
      //     }
      //   })
      this.optionCounts = res.data!
      this.getChartsData(res.data!)
    } else {
      this.$message.error('获取结果统计失败。')
      this.$router.back()
    }
  }

  public mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.question-list {
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 2px dotted #eee;
  .question-item {
    .title {
      font-size: 16px;
    }
    .description {
      font-size: 14px;
    }
  }
}

.result-table {
  margin: 20px 0;
}

.overload-tip {
  margin-top: 20px;
}

.chart-left{
  width: 100%;
  height: 200px;
  float: left
}

.left {
  width: 50%;
  float: left
}

.chart-right{
  width: 100%;
  height: 200px;
  float: right
}

.right {
  width: 50%;
  float: right
}

.el-select + .el-select {
  margin-left: 15px;
}

.el-select + .el-date-editor {
  margin-left: 15px;
}

.header {
      padding: 10px 20px;
      height: auto;
      min-height: 33px;
      border-bottom: 2px dotted #eee;

      h1 {
        width: 100%;
        font-size: 32px !important;
        margin: 0 auto;
        text-align: center;
      }
    }
</style>
