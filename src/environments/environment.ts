import { CommonConfig } from './common.config';

export const environment = {
  authContextId: '148966',
  ...CommonConfig,
  production: false,
  envName: 'Dev',
  AccessControlAllowOrigin: 'http://localhost:4200',
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
    // Initialize Firebase
    // apiKey: 'AIzaSyC4zJzhOBqHh2FPFvwVZxMtPZKbgEmZvvg',
    // authDomain: 'realize-870.firebaseapp.com',
    // databaseURL: 'https://realize-870.firebaseio.com',
    // projectId: 'realize-870',
    // storageBucket: 'realize-870.appspot.com',
    // messagingSenderId: '575296685831'
    // apiKey: 'AIzaSyAmeHLBfHlllFG-lYM_zccmNj0gK6_PjhU',
    // authDomain: 'scout-demo2.firebaseapp.com',
    // databaseURL: 'https://scout-demo2.firebaseio.com',
    // projectId: 'scout-demo2',
    // storageBucket: 'scout-demo2.appspot.com',
    // messagingSenderId: '1083292594346'
    // apiKey: 'AIzaSyBzxn1evVUtOBckT_Fxu2kSsOuLtsg2_xs',
    // authDomain: 'lst-scout.firebaseapp.com',
    // databaseURL: 'https://lst-scout.firebaseio.com',
    // projectId: 'lst-scout',
    // storageBucket: 'lst-scout.appspot.com',
    // messagingSenderId: '777865687003'
    // apiKey: 'AIzaSyAFDHWHW2ABV3Dw8Zj_EGQWve4C0Ub2UB4',
    // authDomain: 'scout-demo-e52b4.firebaseapp.com',
    // databaseURL: 'https://scout-demo-e52b4.firebaseio.com',
    // projectId: 'scout-demo-e52b4',
    // storageBucket: 'scout-demo-e52b4.appspot.com',
    // messagingSenderId: '569619469248'
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
  firebasedb: CommonConfig.firebasedb,
  carouselSetting: CommonConfig.carouselSetting,
  // errorMessages: {
  //   invalidCredential: 'Incorrect Username/Password',
  //   incorrectUserName: ' Incorrect Username or Password. Please try again. User name required.',
  //   incorrectPassword: 'Incorrect Username or Password',
  //   incorrectUsernamePassword: 'Incorrect Username or Password. Please try again.',
  //   serviceResponseIssue: 'Service response issue',
  //   accessTokenFalied: 'Access token failed.',
  //   useIndexedDb: 'Why didn\'t you allow my web app to use IndexedDB?!',
  //   uploadMediaFiles: 'Please upload only media files.',
  //   deleteNotes: 'Are you sure you want to delete the selected notes?',
  //   selectCheckbox: 'First select the checkbox which you want to delete',
  //   calendarWarning: 'From date must be less than or equal to To date.',
  //   indexedDbError: 'IndexedDB error: ',
  //   dbDeleteOperationBlock: 'Couldn not delete database due to the operation being blocked.',
  //   couldNotDeleteDb: 'Could not delete indexed db.',
  //   idbClean: 'IDB clean done.',
  //   serverError: 'Service is temporarily unavailable, please try again later'
  // }
  telemetryUrl: 'https://api.realizedev-test.com/telemetry-scout-nightly/lst-telemetry',
  telemetryKey: 'bylXnmPwm99tFu0PDhBHN95rOLBV6d6m1pp9GgSF',
  // GraphQL URL
  graphQlUrl: '',
  // Mock data url
  mockProductDataUrl: '../assets/data/phase-2-mock/Product_',
  mockAssessmentDataUrl: '../assets/data/phase-2-mock/'
  /*
   * In development mode, for easier debugging, you can ignore zone related error
   * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
   * below file. Don't forget to comment it out in production mode
   * because it will have a performance impact when errors are thrown
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
};

