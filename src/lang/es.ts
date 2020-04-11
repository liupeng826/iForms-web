export default {
  route: {
    myForms: 'My Forms',
    createForm: 'Create Form',
    statistics: 'Statistics',
    changePassword: 'Change Password',
    deptManagement: 'Dept Management',
    userManagement: 'User Management',
    international: 'International'
  },
  layoutHeader: {
    logOut: 'Log Out',
    profile: 'Profile',
    logOutMsg: 'Logged Out'
  },
  login: {
    title: 'Login Form',
    login: 'Login',
    username: 'Username',
    placeholderForUserName: 'Input your username',
    password: 'Password',
    placeholderForPassword: 'Input your password',
    loginSuccessfully: 'Login successfully',
    loginFailed: 'Login failed. Please make sure your username & password is correct',
    wrongFormInput: 'Wrong form input'
  },
  list: {
    title: 'My Forms',
    createForm: 'Create Form',
    formName: 'Name',
    expired: 'Expired',
    createdDate: 'Created Date',
    modifiedDate: 'Modified Date',
    deadline: 'Deadline',
    publishStatus: 'Status',
    actionTitle: 'Action',
    statistics: 'Statistics',
    action: 'Action',
    previewForm: 'Preview',
    deleteForm: 'Delete Form',
    copyAddress: 'Copy Address',
    editForm: 'Edit Form',
    translateForm: 'Translate Form',
    editDeadline: 'Edit Deadline',
    publishForm: 'Publish Form',
    publishmentStop: 'Stop Publish',
    Expired: 'expired'
  },
  changeTime: {
    title: 'Modify Deadline',
    placeholderForDeadline: 'Deadline',
    cancel: 'Cancel',
    submit: 'Submit',
    deadlineIsRequired: 'Please input deadline',
    successMsg: 'Update deadline successfully',
    failureMsg: 'Update deadline failed'
  },
  copyUrl: {
    title: 'Copy Url',
    copy: 'Copy',
    reminder: 'If you can\'t use the copy button above, you could try Ctrl + C after you select it or scan the QR code',
    close: 'Close',
    successMsg: 'Copy successfully',
    failureMsg: 'Copy failed'
  },
  translateForm: {
    saveTranslation: 'Save Translation',
    deleteTranslation: 'Remove Translation',
    saveTranslationSuccessfully: 'Save translation successfully!',
    deleteTranslationSuccessfully: 'Remove translation successfully!'
  },
  createForm: {
    title: 'Create Form',
    formTitle: 'Title',
    formTitleRequired: 'The title is required',
    formIntroduction: 'Introduction',
    formDeadline: 'Deadline',
    placeholderForDeadline: 'Choose Deadline',
    otherConfig: 'Others',
    marketLevel: 'Market Level',
    emailResponse: 'Email Response',
    qtSingleChoice: 'Single Choice',
    qtMultiChoice: 'Multi-Choice',
    qtTextQuestion: 'Text Question',
    qtRating: 'Rating',
    qtDateQuestion: 'Date',
    qtNetPromoterScore: 'Net Promoter Score',
    saveForm: 'Save Form',
    publishForm: 'Publish Form',
    saveFormSuccessfully: 'Save form successfully',
    publishFormSuccessfully: 'publish form successfully'
  },
  editForm: {
    alertMsg: 'If you edit the form, the statistics of the form will be removed. So you need to edit it please make sure the form is under unpublished status.'
  },
  viewForm: {
    formIsUnpublishedTitle: 'The form is unpublished',
    formIsUnpublishedDescription: 'The form is unpublished, so can not be edit for now',
    formIsExpiredTitle: 'The form is expired',
    formIsExpiredDescription: 'The form is expired, so can not be edit any more',
    deadline: 'Deadline:',
    placeholderForName: 'Name',
    placeholderForPhoneNo: 'Phone No',
    placeholderForEmail: 'Email',
    backToSystem: 'Back',
    submitForm: 'Submit Form',
    description: 'Description',
    reminder: 'Reminder',
    mandatoryFieldsRequired: 'Please make sure all required fields are filled out correctly',
    additionInfoRequired: 'Addition info is required',
    userInfoRequired: 'UserInfo is required',
    failedMsgTitle: 'Submit failed, the error message is:'
  },
  statistics: {
    title: 'Statistics',
    placeholderForSelectMarket: 'Select Market',
    placeholderForSelectDealer: 'Select Dealer',
    placeholderForSelectForm: 'Select Form',
    placeholderForSelectMonth: 'Select Month',
    search: 'Search',
    allConditionRequired: 'All the conditions are required'
  },
  changePassword: {
  },
  errorMessages: {
  },
  setting: {
    title: 'Setting',
    oldPassword: 'Old Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    submit: 'Submit',
    reset: 'Reset',
    oldPasswordRequired: 'Please enter old password',
    newPasswordRequired: 'Please enter new password',
    reEnterNewPassword: 'Please re-enter new password',
    differentPassword: 'New password does not match the confirm password',
    successMsg: 'Successfully',
    failureMsg: 'Failed, please re-try'
  },
  common: {
    tokenExpired: 'Token is expired, re-login...'
  },
  questionList: {
    noQuestion: 'There was no question for now. Please add question by clicking the button below.',
    description: 'Description: '
  },
  question: {
    caption: ['', 'Single Choice', 'Multiple Choice', 'Text Input', 'Symbol Score', 'Date Selection', 'Net Promoter Score'],
    title: 'Question',
    titleIsRequired: 'Title is required',
    placeholderForQuestionTitle: 'Please input question title',
    introduction: 'introduction',
    placeholderForQuestionIntroduction: 'Please input question introduction',
    mandatory: 'mandatory',
    options: 'options',
    optionDescriptionIsRequired: 'Option Description is required',
    placeholderForOptions: 'Please input option description',
    yes: 'Yes',
    no: 'No',
    delete: 'Delete',
    leftText: 'Left Part',
    placeholderForLeftText: 'Please input text for left part',
    rightText: 'Right Part',
    placeholderForRightText: 'Please input text for right part'
  }
}
