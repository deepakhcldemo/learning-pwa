import { CommonConfig } from './common.config';

export const environment = {
  authContextId: '148966',
  ...CommonConfig,
  production: true,
  envName: 'Perf',
  AccessControlAllowOrigin: '*',
  eazyBridgeURL: 'https://wayf.rumba.ppe.pearsoncmg.com/wayf/?service=https://realize-870.firebaseapp.com/login',
  faq: 'https://pearsonnacommunity.force.com/support/s/login/',
  appKey: 'NEXT_TEXT_01',
  scope: 'RBS',
  grant_type: 'client_credentials',
  clientId: 'O5n6dEnWdN6RLJBUeBOxXQ2cUxIOCRIo',
  teacherID: '',
  productId: ['336566', '391928', '702845', '702848', '702842', '702846', '702847'],
  apiUrls: {
    login: 'https://nightly-reader.realizedev.com/sapi/account/v2/login',
    rbsToken: 'https://perf-reader.realizedev.com/sapi/oauth/token',
    rosterSection: 'https://roster-perf.realizedev.com/roster-service/v1/sections',
    userProfile: 'https://perf-userprofileservice.realizedev.com/ups/api/v1/users/'
  },
  firebase: {
    apiKey: 'AIzaSyDkkpadYd8wtRAFG8oCHfVfKTGDB0A5ubg',
    authDomain: 'lst-scout-perf.firebaseapp.com',
    databaseURL: 'https://lst-scout-perf.firebaseio.com',
    projectId: 'lst-scout-perf',
    storageBucket: 'lst-scout-perf.appspot.com',
    messagingSenderId: '885729027995'
  },
  telemetryUrl: 'https://api.realizedev-test.com/telemetry-scout-nightly/lst-telemetry',
  telemetryKey: 'bylXnmPwm99tFu0PDhBHN95rOLBV6d6m1pp9GgSF',
  // GraphQL URL
  graphQlUrl: '',
  // Mock data url
  mockProductDataUrl: '../assets/data/phase-2-mock/Product_',
  mockAssessmentDataUrl: '../assets/data/phase-2-mock/',
};
