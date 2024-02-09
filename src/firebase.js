import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC_l2Ebo6N1YtPRCEM2FIBjM_vWTTBQ_Kc",
    authDomain:"dashboard-413413.firebaseapp.com",
    projectId: "dashboard-413413",
    storageBucket: "dashboard-413413.appspot.com",
    messagingSenderId: "203154733415",
    appId: "1:203154733415:web:bad57fc009d99061ac97c2",
    measurementId: "G-Q9JW7Z9EG2"
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// console.log(firebaseApp)
export default db;