import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../app/app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDRoUSS7kWSk-dQ0NQOdSl5Ge_9ekHWxDA',
  authDomain: 'app-pibg-guarulhos.firebaseapp.com',
  projectId: 'app-pibg-guarulhos',
  storageBucket: 'app-pibg-guarulhos.appspot.com',
  messagingSenderId: '840132328082',
  appId: '1:840132328082:web:a31e4cab92ba53705e044b'
};

console.log('passou aqui')
// Initialize Firebase
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};