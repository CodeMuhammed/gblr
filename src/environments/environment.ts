// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAzemnHqLKC01B1efYA-9sDvqhOgnCJLyI',
    authDomain: 'translatorapp-as.firebaseapp.com',
    databaseURL: 'https://translatorapp-as.firebaseio.com',
    projectId: 'translatorapp-as',
    storageBucket: 'translatorapp-as.appspot.com',
    messagingSenderId: '948265327864'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
