
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FaThemeco } from "react-icons/fa";
import { toast } from "react-toastify";
const firebaseConfig = {
    apiKey: "AIzaSyCjpTEuMuqMI4r6dySokldaHD0TrEBZKp4",
    authDomain: "epic-games-6f015.firebaseapp.com",
    projectId: "epic-games-6f015",
    storageBucket: "epic-games-6f015.firebasestorage.app",
    messagingSenderId: "329286788362",
    appId: "1:329286788362:web:a95d4392580da9ab7d46f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage()

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password); // Create user with email and password
        const user = res.user;

        // Add user data to Firestore database
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            username: username.toLowerCase(),
            email: user.email,
            profileimage: '',
            createdAt: new Date()
        });

        toast.success('Account Created Successfully', { theme: 'dark', position: 'top-center' });
    } catch (error) {
        console.log("Signup Error:", error.message); // Log detailed error
        toast.error(error.code.split('/')[1].split('-').join(' '), { theme: 'dark', position: 'top-center' });
    }
};

const signin = async (email,password)=>{
    try {
        const res = await signInWithEmailAndPassword(auth ,email ,password)
        toast.success('Logged in Successfully', {theme:'dark', position:'top-center'})
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '), { theme: 'dark' , position: 'top-center' })
    }
}
const logout =async ()=>{
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '), { theme: 'dark' , position: 'top-center'})
    }
}

export {signup, signin ,logout ,auth ,db ,storage}