import { CommonConfig } from './common.config';

export const environment = {
  authContextId: '148966',
  ...CommonConfig,
  production: true,
  envName: 'Prod',
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
    // apiKey: 'AIzaSyDpzEADHZSAEzTy-ROjvBIcR0sV-HCr71w',
    // authDomain: 'scout-test-79515.firebaseapp.com',
    // databaseURL: 'https://scout-test-79515.firebaseio.com',
    // projectId: 'scout-test-79515',
    // storageBucket: 'scout-test-79515.appspot.com',
    // messagingSenderId: '874506703124'
    // Madan's account
    /*  apiKey: 'AIzaSyD-f0T3t_60qiARc83ilIXFHaOVGLDaChI',
    authDomain: 'scout-pwa-a73db.firebaseapp.com',
    databaseURL: 'https://scout-pwa-a73db.firebaseio.com',
    projectId: 'scout-pwa-a73db',
    storageBucket: 'scout-pwa-a73db.appspot.com',
    messagingSenderId: '75066325138' */
    // Deepak's demo account
    apiKey: 'AIzaSyBEOG9N6tfhVv1vRBx9zdNFeAjMbDEdZl0',
    authDomain: 'scout-pwa-ca6fa.firebaseapp.com',
    databaseURL: 'https://scout-pwa-ca6fa.firebaseio.com',
    projectId: 'scout-pwa-ca6fa',
    storageBucket: 'scout-pwa-ca6fa.appspot.com',
    messagingSenderId: '374701109428'
},

  },
  telemetryUrl: 'https://api.realizedev-test.com/telemetry-scout-nightly/lst-telemetry',
  telemetryKey: 'bylXnmPwm99tFu0PDhBHN95rOLBV6d6m1pp9GgSF',
  // GraphQL URL
  graphQlUrl: '',
  // Mock data url
  mockProductDataUrl: '../assets/data/phase-2-mock/Product_',
  mockAssessmentDataUrl: '../assets/data/phase-2-mock/'
};
