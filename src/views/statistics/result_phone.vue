<template>
  <div v-loading.fullscreen.lock="loading">
    <div>
      <el-alert
        v-if="optionCounts.length <= 0"
        class="overload-tip"
        type="warning"
      >
        No Data Found
      </el-alert>
    </div>
    <div class="naire-search-panel">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4" class="select-wrapper">
          <el-select v-model="defaultMarket" placeholder="SELECT MARKET">
            <el-option
              v-for="item in allMarkets"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4" class="select-wrapper">
          <el-select v-model="defaultDealer" placeholder="SELECT DEALER">
            <el-option
              v-for="item in allDealers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4" class="select-wrapper">
          <el-select v-model="defaultForm" placeholder="SELECT SURVEY">
            <el-option
              v-for="item in allForms"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4" class="select-wrapper">
          <el-date-picker
            v-model="defaultMonth"
            type="month"
            placeholder="SELECT MONTH"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="8" :xl="8" style="text-align:center">
          <el-button type="primary" icon="el-icon-search" style="width:200px">SEARCH</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="naire-result-panel">
      <el-row :gutter="10">
        <el-col
          v-for="(answer, index) in chartsOptions"
          :key="index"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          class="chart-wrapper"
        >
          <div class="">
            <h3 class="title">
              Q{{ index + 1 }}: （{{ answer.questionId }}）{{ answer.questionTitle
              }}{{ answer.isRequired ? "Required" : "Optional" }}
            </h3>
            <p class="description">{{ answer.answerDescription }}</p>
          </div>
          <div
            v-if="Number(answer.questionTypeId) === questionType.SINGLE_CHOICE ||
              Number(answer.questionTypeId) === questionType.MULTIPLE_CHOICE ||
              Number(answer.questionTypeId) === questionType.RATING ||
              Number(answer.questionTypeId) ===questionType.NET_PROMOTER_SCORE"
            class="echarts"
          >
            <div
              :id="'chart-' + index"
              style="height:200px"
            />
          </div>
        </el-col>
      </el-row>
      <el-row style="background:#fff; padding:16px 16px 0; margin-bottom:32px;">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="echarts">
            <div id="chart-monthly-report" ref="chart_monthly_report" style="height:200px" />
          </div>
        </el-col>
      </el-row>
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
  private monthlyCounts: Questionnaire.IMonthlyCount[] = []
  private chartsOptions: any = [];
  private chartsOptionsForMonthlyCount: any = [];
  private questionType = questionType1;
  private allMarkets: any =
    [{ value: 1, label: 'Malaysia' }, { value: 2, label: 'Singapore' }, { value: 3, label: 'Thailand' }];
  private allDealers = [];
  private allForms = [{ value: 1, label: 'Parts Survey' }, { value: 2, label: 'Service Survey' }];
  private defaultMarket = '';
  private defaultDealer = '';
  private defaultForm = '';
  private defaultMonth = '';

  getChartsData (optionCounts: any[]) {
    this.optionCounts.forEach((item: Questionnaire.IOptionCount, quesIndex: number) => {
      if (
        item.questionTypeId === questionType1.SINGLE_CHOICE ||
        item.questionTypeId === questionType1.MULTIPLE_CHOICE ||
        item.questionTypeId === questionType1.RATING ||
        item.questionTypeId === questionType1.NET_PROMOTER_SCORE
      ) {}
    })
    this.generateAnswers()

    this.$nextTick(() => {
      this.chartsOptions.forEach((item: any, index: number) => {
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
      if (tempQuestionId !== element.optionQuestionId) {
        // Different question
        tempQuestionId = element.optionQuestionId
        tempQuestionAnswer = new QuestionAnswer()
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

  getChartsDataForMonthlyCount (monthlyCounts: any[]) {
    this.monthlyCounts.forEach((item: Questionnaire.IMonthlyCount, index: number) => {
    })

    this.$nextTick(() => this.drawChartForMonthlyCount())
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
        stack: 'total',
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

  drawChartForMonthlyCount () {
    const element = document.getElementById('chart-monthly-report') as HTMLDivElement
    // var bar_dv = this.$refs.chart_monthly_report
    const chart1 = echarts.init(element)
    var yAxis = {
      type: 'category',
      data: []
    }

    var series = {
      name: 'Total Numbers',
      type: 'bar',
      data: []
    }

    this.monthlyCounts.reverse().slice(0, 3).forEach((item: Questionnaire.IMonthlyCount, index: number) => {
      yAxis.data.push(item.month)
      series.data.push(Number(item.totalNumber))
    })

    var option1 = {
      title: {
        text: this.monthlyCounts[0].formTitle
        // subtext: 'Market'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Total Numbers'],
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
        boundaryGap: [0, 0.001]
      },
      yAxis: yAxis,
      series: series
    }

    chart1.setOption(option1)
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
      from: 1402459763000,
      marketId: '9999',
      month: 2,
      to: 1604082375869
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
      this.$message.error('failed')
      this.$router.back()
    }
  }

  async fetchDataForMonthlyReport () {
    this.loading = true
    const res = await NaireAction.statis2({
      client: {
        id: 1,
        name: 'iForms_GTA',
        token: 'YWVzLTI1Ni1nY206Y0c5UGMwMXFRWGxOUXpCM1RWTXdlVTlUTUhoT1VWZFJZMUA1Mi4zOS45MC4yNjo1MjIxOQNv6RRuGEVvmGjB+jimI/gw==',
        isActive: 1
      },
      dealerId: '', // 703518
      formId: 47,
      from: 1402459763000,
      marketId: '9999',
      month: 2,
      to: 1604082375869
    })
    this.loading = false
    if (res.success) {
      this.monthlyCounts = res.data!
      this.getChartsDataForMonthlyCount(res.data!)
    } else {
      this.$message.error('failed')
      this.$router.back()
    }
  }

  public mounted () {
    this.fetchData()
    this.fetchDataForMonthlyReport()
  }
}
</script>

<style lang="scss" scoped>
  .naire-search-panel {
    background-color: rgb(240, 242, 245);
    padding: 18px 22px 22px 22px;
    margin-bottom: 20px;
    .select-wrapper {
      background: #fff;
      padding: 10px 10px;
      margin-bottom: 5px;
      margin: 5px 0;
    }
  }

  .naire-result-panel {
    padding: 18px 22px 22px 22px;
    background-color: rgb(240, 242, 245);
    border-bottom: 2px dotted #eee;
    margin-bottom: 20px;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 5px;
      margin: 5px 0;
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

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100% !important;
  }

  .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
</style>
