<template>
  <div v-loading.fullscreen.lock="loading" class="view-layout">
    <div class="main">
      <div class="header">
        <h1>{{ form.title }}</h1>
      </div>
      <div class="content">
        <!-- <div class="intro">
          <div style="white-space: pre-wrap">{{ form.description }}</div>
          <p class="mt-10">{{ $t('viewForm.deadline') }} {{ form.deadline | formatTime }}</p>
        </div> -->
        <question-list :question-list="form.sections[0].questions" />
      </div>
      <div class="footer">
        <p>iForms</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import * as FormAction from '@/api/form'
import * as UserAction from '@/api/user'
import QuestionList from './components/Question/QuestionList.vue'
import { ElForm } from 'element-ui/types/form'
import { questionType1 } from '@/config/enum/questionType'

interface LooseObject {
    [key: string]: any
}

@Component({
  components: {
    QuestionList
  }
})
export default class extends Vue {
  private loading: boolean = false
  private form: Questionnaire.IForm = {
    marketId: '',
    level: '',
    deptId: '',
    language: 'en-us',
    languageDescription: '',
    title: '',
    description: '',
    deadline: 2145888000000,
    includeSection: 1,
    sections: [{
      sequence: 0,
      title: '',
      description: '',
      questions: [],
      isActive: 1
    }],
    isActive: 1,
    publishStatus: 0,
    sendEmail: 0,
    createdBy: '',
    modifiedBy: '',
    answers: []
  }

  async fetchData () {
    this.loading = true
    const res = await FormAction.view({ superFormId: this.$route.params.id, includeInActiveForm: true })
    this.loading = false
    if (res.success && res.data.length > 0) {
      var englishForm = res.data.filter(x => x.language === 'en-us')
      if (englishForm.length === 1) {
        this.form = englishForm[0]
        document.title = this.form.title
      }
    } else {
      this.$message.error(res.msg)
    }
  }

  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
  .view-layout {
    background-color: rgb(237, 240, 248);
    min-height: 100vh;
    max-height: 100%;
    height: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    font-size: 14px;
    overflow-y: auto;
    -webkit-overflow-scrolling: auto;

    .main {
      max-width: 800px;
      width: 100%;
      height: auto;
      margin: 0 auto;
      padding-bottom: 30px;
      background-color: #fff;
      box-shadow: 0 2px 5px 1px rgba(124, 124, 124, .2);
    }

    .header {
      padding: 30px 20px;
      height: auto;
      min-height: 33px;
      border-bottom: 2px dotted #eee;

      h1 {
        width: 100%;
        margin: 0 auto;
        text-align: center;
      }
    }

    .content {
      padding: 20px;
      text-align: left;
      font-size: inherit;

      .intro {
        margin: 10px 0;
      }
    }

    .footer {
      margin-top: 10px;
      padding-top: 10px;
      text-align: center;
      border-top: 1px dotted #eee;
    }
  }
</style>
