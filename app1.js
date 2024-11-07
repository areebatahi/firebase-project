import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut, signInWithPopup, GoogleAuthProvider, provider, getFirestore, db, collection, addDoc, getDocs, doc, setDoc } from "./firebase.js"
//----------------------- Sign up ------------------------------
let signUp = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;
    let cPassword = document.getElementById('confirm_pass').value;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
        console.log("test");
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Account created successfully");
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.code);
            });
    } else {
        alert("Invalid email or Password");
    }
    if (password !== cPassword) {
        alert("Passwords should be identical");
    }

}
if (window.location.pathname == "/index.html") {
    let signUp_btn = document.getElementById("signUp_btn");
    signUp_btn.addEventListener("click", signUp);
}


//----------------------- login ------------------------------
let login = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Login successfully");
            window.location.pathname = "./post app/index.html"
        })
        .catch((error) => {
            console.log(error.code);
        });
}
if (window.location.pathname == "/login.html") {
    let login_btn = document.getElementById("login_btn");
    login_btn.addEventListener("click", login);
}


//------------------------- onAuthStateChanged ---------------------
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log(user);
//         window.location.pathname = "./post app/index.html"
//     } else {
//         console.log("User not found")
//     }
// });

//-------------------------- signout -------------------------
let sign_out = document.getElementById("sign_out")
sign_out.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.pathname == "../index.html"
        console.log("Sign-out successful.")
    }).catch((error) => {
        console.log(error.code);
    });
})



//-------------------------- send Mail -------------------------
// let sendMail = () => {
//     sendEmailVerification(auth.currentUser)
//   .then(() => {
//     consol.log("Email verification sent!")
//   });
// }
// let verification = document.getElementById("verification");
// verification.addEventListener("click", sendMail);


//-------------------------- google Signup -------------------------
let googleSignup = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            window.location.pathname = "./post app/index.html"

            try {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    number: user.phoneNumber
                });
                console.log("Document written with ID: ", user.uid);
            }
            catch (e) {
                console.error("Error adding document: ", e);
            }
        }).catch((error) => {
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(email, credential, error.code);
        });
}
if (window.location.pathname == "/index.html") {
    let googleBtn = document.getElementById('googleBtn');
    googleBtn.addEventListener('click', googleSignup);
}