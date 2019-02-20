import { CommonConfig } from './common.config';

export const environment = {
  authContextId: '148966',
  ...CommonConfig,
  production: true,
  envName: 'Cert',
  AccessControlAllowOrigin: '*',
  eazyBridgeURL: 'https://wayf.rumba.int.pearsoncmg.com/wayf/?service=https://realize-870.firebaseapp.com/login',
  faq: 'https://pearsonnacommunity.force.com/support/s/login/',
  appKey: 'NEXT_TEXT_01',
  scope: 'RBS',
  grant_type: 'client_credentials',
  clientId: 'O5n6dEnWdN6RLJBUeBOxXQ2cUxIOCRIo',
  teacherID: '',
  productId: ['1730939', '1730923', '1730940', '1730941', '1730942', '1730908', '336566'],
  apiUrls: {
    login: 'https://nightly-reader.realizedev.com/sapi/account/v2/login',
    rbsToken: 'https://nightly-reader.realizedev.com/sapi/oauth/token',
    rosterSection: 'https://roster.nightly.realizedev-test.com/roster-service/v1/sections',
    userProfile: 'https://userprofileservice.nightly.realizedev-test.com/ups/api/v1/users/'
  },
  firebase: {
    apiKey: 'AIzaSyAAU5Bw4OaOqvv_BNI1nlQoMPaKct0_4Jg',
    authDomain: 'lst-scout-uat.firebaseapp.com',
    databaseURL: 'https://lst-scout-uat.firebaseio.com',
    projectId: 'lst-scout-uat',
    storageBucket: 'lst-scout-uat.appspot.com',
    messagingSenderId: '518171650289'
  },
  telemetryUrl: 'https://api.realizedev-test.com/telemetry-scout-nightly/lst-telemetry',
  telemetryKey: 'bylXnmPwm99tFu0PDhBHN95rOLBV6d6m1pp9GgSF',
  // GraphQL URL
  graphQlUrl: '',
  // Mock data url
  mockProductDataUrl: '../assets/data/phase-2-mock/Product_',
  mockAssessmentDataUrl: '../assets/data/phase-2-mock/',
};
