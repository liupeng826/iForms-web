<template>
  <div v-loading.fullscreen.lock="loading">
    <!-- <div>
      <el-alert
        v-if="optionCounts.length <= 0"
        class="overload-tip"
        type="warning"
      >
        No Data Found
      </el-alert>
    </div> -->
    <!-- <div class="header">
      <h1>统计分析</h1>
    </div> -->
    <div class="form-search-panel">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="12" :lg="5" :xl="5" class="select-wrapper">
          <el-select v-model="selectedMarket" :disabled="userRole === roleEnum.SUPER_ADMIN ? false:true" :placeholder="$t('statistics.placeholderForSelectMarket')" :loading="loadingMarkets" @change="selectMarket">
            <el-option
              v-for="item in allMarkets"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="5" :xl="5" class="select-wrapper">
          <el-select v-model="selectedDealer" :placeholder="$t('statistics.placeholderForSelectDealer')" :loading="loadingDealers" @change="selectDealer">
            <el-option
              v-for="item in allDealers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="5" :xl="5" class="select-wrapper">
          <el-select v-model="selectedForm" :placeholder="$t('statistics.placeholderForSelectForm')">
            <el-option
              v-for="item in allForms"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="5" :xl="5" class="select-wrapper">
          <el-date-picker
            v-model="defaultMonth"
            type="month"
            :placeholder="$t('statistics.placeholderForSelectMonth')"
            @change="selectMonth"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4" class="search-button">
          <el-button type="primary" icon="el-icon-search" style="width:200px" @click="btnSearchClick">{{ $t('statistics.search') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="form-result-panel">
      <el-row id="row1" :gutter="10">
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
              Q{{ index + 1 }}:{{ answer.questionTitle }}
              <!-- ({{ answer.isRequired ? "Required" : "Optional" }}) -->
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
      <el-row :gutter="10" style="background:#fff; padding:8px;">
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

import HeaderInfo from '@/components/FormComponent/HeaderInfo.vue'

import * as FormAction from '@/api/form'
import * as Constants from '@/constants/default'
import { questionType1 } from '@/config/enum/questionType'
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'
import { UserModule } from '@/store/modules/user'
import { roleEnum } from '@/config/enum/roleEnum'
import { getMarketInfo } from '@/utils/cookies'

//  结果统计题目
interface StatisticQuestionItem extends Form.IQuestion {
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
  private userRole: number = 0;
  private marketIdOfCurrentUser = '';
  // private answers: Form.IAnswer[] = [];
  // private sections: Form.ISection[] | null = null;
  private optionCounts: Form.IOptionCount[] = [];
  private monthlyCounts: Form.IMonthlyCount[] = []
  private chartsOptions: any = [];
  private chartsOptionsForMonthlyCount: any = [];
  private questionType = questionType1;
  private roleEnum = roleEnum;

  private allMarkets: any = [];
  private allDealers: any = [];
  private allForms: any = [];

  private selectedMarket = ''
  private selectedMarketId = ''
  private selectedDealer = ''
  private selectedDealerId = ''
  private selectedForm = ''
  private selectedSuperFormId = ''
  private selectedFormId = ''
  private selectedMonth: string = ''
  private defaultMonth = ''
  private from: number = 0
  private to: number = 0

  private loadingMarkets = false;
  private loadingDealers = false;
  private loadingForms = false;

  getChartsData (optionCounts: any[]) {
    this.optionCounts.forEach((item: Form.IOptionCount, quesIndex: number) => {
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
    if (this.chartsOptions.length > 0) {
      this.chartsOptions = []
    }

    that.optionCounts.forEach((element, index) => {
      if (tempQuestionId !== element.optionQuestionId) {
        // Different question
        tempQuestionId = element.optionQuestionId
        tempQuestionAnswer = new QuestionAnswer()
        tempQuestionAnswer.questionId = element.optionQuestionId
        tempQuestionAnswer.questionTypeId = element.questionTypeId
        tempQuestionAnswer.questionTitle = element.questionTitle

        this.chartsOptions.push(tempQuestionAnswer)
      }

      // Same question
      if (Number(element.questionTypeId) === questionType1.SINGLE_CHOICE ||
          Number(element.questionTypeId) === questionType1.MULTIPLE_CHOICE) {
        tempQuestionAnswer.optionDescriptions.push(element.optionDescription!)
        tempQuestionAnswer.totalNumbers.push(Number(element.totalNumber!))
      } else if (Number(element.questionTypeId) === questionType1.RATING) {
        tempQuestionAnswer.optionDescriptions = ['Five Stars', 'Four Stars', 'Three Stars', 'Two Stars', 'One Star']
        if (tempQuestionAnswer.totalNumbers.length === 0) {
          tempQuestionAnswer.totalNumbers = [0, 0, 0, 0, 0]
        }

        switch (element.answerValue) {
          case 5:
            tempQuestionAnswer.totalNumbers[0] = Number(element.totalNumber!)
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
        if (tempQuestionAnswer.totalNumbers.length === 0) {
          tempQuestionAnswer.totalNumbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
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
    this.monthlyCounts.forEach((item: Form.IMonthlyCount, index: number) => {
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

      if (isNaN(eachPercentage)) {
        eachPercentage = 0
      }

      series.push({
        name: e,
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%'
        },
        data: [(eachPercentage * 100).toFixed(0)],
        valueType: 'percent'
      })
    })

    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params: string|any[]) {
          // var html = params[0].name + '<br>'
          var html = ''
          for (var i = 0; i < params.length; i++) {
            html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>'
            if (option.series[params[i].seriesIndex].valueType === 'percent') {
              html += params[i].seriesName + ':' + params[i].value + '%<br>'
            } else {
              html += params[i].seriesName + ':' + params[i].value + '<br>'
            }
          }
          return html
        }
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
        },
        max: 100
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

    this.monthlyCounts.reverse().slice(0, 3).forEach((item: Form.IMonthlyCount, index: number) => {
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

  async fetchAnswerStatistics () {
    // this.loading = true
    const res = await FormAction.statis({
      // answerId: this.$route.params.id
      client: Constants.client,
      dealerId: this.selectedDealerId,
      superFormId: this.selectedSuperFormId,
      from: undefined,
      to: undefined,
      marketId: this.selectedMarketId,
      month: this.selectedMonth
    })
    // this.loading = false
    if (res.success) {
      this.optionCounts = res.data!
      this.getChartsData(res.data!)
    } else {
      this.$message.error('failed')
      this.$router.back()
    }
  }

  async fetchAnswerStatisticsForMonthlyReport () {
    // this.loading = true
    const res = await FormAction.statis2({
      client: Constants.client,
      dealerId: this.selectedDealerId,
      formId: this.selectedFormId,
      from: undefined,
      to: undefined,
      marketId: this.selectedMarketId,
      month: ''
    })
    // this.loading = false
    if (res.success) {
      this.monthlyCounts = res.data!
      this.getChartsDataForMonthlyCount(res.data!)
    } else {
      this.$message.error('failed')
      this.$router.back()
    }
  }

  async fetchMarkets () {
    this.loadingMarkets = true
    const res = await FormAction.markets()
    this.loadingMarkets = false
    if (res.success) {
      this.allMarkets = res.data!
      // if (this.allMarkets.length > 0) this.selectedMarket = this.allMarkets[0].id
      if (this.userRole === roleEnum.ADMIN) {
        this.selectedMarketId = this.marketIdOfCurrentUser
        this.selectedMarket = ''
        var marketResult = this.selectedMarket = this.allMarkets.filter(x => {
          return x.id === this.selectedMarketId
        })
        if (marketResult.length === 1) {
          this.selectedMarket = marketResult[0].name
        }
        if (this.selectedMarketId !== '') this.fetchDealersByMarketId(this.selectedMarketId)
      }
    } else {
      this.$message.error('failed')
      this.$router.back()
    }
  }

  async fetchDealersByMarketId (marketId: string, isActive: number = 1) {
    this.loadingDealers = true
    const res = await FormAction.dealers({ marketId: marketId, isActive: isActive })
    this.loadingDealers = false
    if (res.success) {
      this.allDealers = res.data!
      // if (this.allDealers.length > 0) this.selectedDealer = this.allDealers[0].id
    } else {
      this.$message.error('failed')
      this.$router.back()
    }
  }

  async fetchForms (marketId: string, dealerId: string) {
    this.loadingForms = true
    const res = await FormAction.forms(marketId, dealerId)
    this.loadingForms = false
    if (res.success) {
      this.allForms = res.data!.filter(x => x.language === 'en-us')
      if (this.allForms.length > 0) {
        this.selectedSuperFormId = this.allForms[0].superFormId
        this.selectedFormId = this.allForms[0].id
        this.selectedForm = this.allForms[0].title.toString()
      }
    } else {
      this.$message.error('failed')
      this.$router.back()
    }
  }

  selectMarket (marketId: string) {
    if (marketId !== '') {
      this.selectedMarketId = marketId
      this.selectedDealer = ''
      this.selectedForm = ''
      this.fetchDealersByMarketId(marketId)
    } else {
      this.allDealers = []
      this.selectedDealer = ''
      this.selectedForm = ''
    }
    this.$emit('selectChange', this.selectedMarket)
  }

  selectDealer (dealerId: string) {
    if (dealerId !== '') {
      this.selectedDealerId = dealerId
      this.loadingForms = true
      this.selectedForm = ''
      this.fetchForms(this.selectedMarketId, dealerId)
      this.loadingForms = false
    } else {
      this.allDealers = []
      this.selectedDealer = ''
      this.selectedForm = ''
    }
    this.$emit('selectChange', this.selectedMarket, this.selectedDealer)
  }

  selectForm (formId: string) {
    if (formId !== '') {
      this.selectedFormId = formId
      this.allForms = this.allForms.filter(x => x.id === formId)[0].superFormId
    }
    this.$emit('selectChange', this.selectedForm)
  }

  selectMonth (time: Date) {
    // Sat Feb 01 2020 00:00:00 GMT+0800 (China Standard Time)
    // this.from = time.getTime()
    var monthStr = time.getMonth() < Number(9) ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1).toString()
    this.selectedMonth = time.getFullYear() + '-' + monthStr
    var temp: Date = new Date(time.getFullYear(), time.getMonth())
    // this.to = new Date(temp.setMonth(time.getMonth() + 1)).getTime()
  }

  btnSearchClick () {
    if (this.selectedMarketId !== '' && this.selectedDealerId !== '' &&
        this.selectedFormId !== '' && this.selectedMonth !== '') {
      this.loading = true
      const element = document.getElementById('chart-monthly-report') as HTMLDivElement
      echarts.dispose(element)
      this.chartsOptions.forEach((item: any, index: NumberConstructor) => {
        const chartElement = document.getElementById('chart-' + index) as HTMLDivElement
        echarts.dispose(chartElement)
      })

      this.fetchAnswerStatistics()
      this.fetchAnswerStatisticsForMonthlyReport()
      this.loading = false
    } else {
      this.$message.warning({ message: this.$t('statistics.allConditionRequired').toString(), duration: 2000 })
    }
  }

  public mounted () {
    const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if (flag) {
      this.userRole = roleEnum.ADMIN
      var currentMarketInfo = getMarketInfo()
      this.marketIdOfCurrentUser = currentMarketInfo === undefined ? '' : currentMarketInfo.split('|')[0]
    } else {
      if (UserModule.userRole === 0) {
        this.$message.warning(this.$t('common.tokenExpired').toString())
        UserModule.logout()
        this.$router.push('/login')
      }
      this.userRole = UserModule.userRole
      this.marketIdOfCurrentUser = UserModule.userData.user === undefined ? '' : UserModule.userData.user.dept.market.id
    }
    this.fetchMarkets()
  }
}
</script>

<style lang="scss" scoped>
  .form-search-panel {
    background-color: #fff;
    padding: 5px 18px 18px 18px;
    .select-wrapper {
      background: #fff;
      padding: 8px;
    }
    .search-button {
      background: #fff;
      padding: 8px;
      text-align: center;
    }
  }

  .form-result-panel {
    padding: 10px 15px 15px 15px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 8px 0px 0px 0px;
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

  .el-select {
    display: block;
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

  .el-select-dropdown {
    max-width: 200px;
  }
  .el-select-dropdown__item {
    display: inline-block;
  }
  .el-select-dropdown__item span {
    min-width: 50px;
    max-width: 150px;
    display: inline-block;
  }

  .el-scrollbar {
    > .el-scrollbar__bar {
    opacity: 1 !important;
    }
  }
</style>
