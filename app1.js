import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    provider,
    getFirestore,
    db,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    arrayUnion,
    arrayRemove,
    deleteDoc
} from "./firebase.js";

//----------------------- Sign up ------------------------------
let signUp = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;
    let cPassword = document.getElementById('confirm_pass').value;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    let name = document.getElementById('name').value;
    let number = document.getElementById('number').value;
    let userData = { email, password, name , number };
    console.log(userData);

    if (emailRegex.test(email) && passwordRegex.test(password)) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Account created successfully");
                window.location.pathname = "/dashboard/index.html"

                // ________________________________Add Doc
                // try {
                //     const docRef = await addDoc(collection(db, "user"), {
                //         ...userData,
                //         uId: user.uid,
                //     });
                //     console.log("Document written with ID: ", docRef.uId);
                // } catch (e) {
                //     console.error("Error adding document: ", e);
                // }

                // ____________________________________Set Doc
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        ...userData,
                        uId: user.uid,
                    });
                    console.log("Document written with ID: ", user.uid);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

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
if (window.location.pathname == "/") {
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
            window.location.pathname = "/dashboard/index.html"
        })
        .catch((error) => {
            console.log(error.code);
        });
}
if (window.location.pathname == "/login.html") {
    let login_btn = document.getElementById("login_btn");
    login_btn.addEventListener("click", login);
}


// //------------------------- onAuthStateChanged ---------------------
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log(user);
//         // window.location.pathname = "./post app/index.html"
//     } else {
//         console.log("User not found")
//     }
// });


// //-------------------------- send Mail -------------------------
// let sendMail = () => {
//     sendEmailVerification(auth.currentUser)
//   .then(() => {
//     consol.log("Email verification sent!")
//   });
// }
// if(window.location.pathname == '/sedMail.html'){
// let verification = document.getElementById("verification");
// verification.addEventListener("click", sendMail);
// }

//-------------------------- google Signup -------------------------
let googleSignup = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            // window.location.pathname = "/sedMail.html"
            window.location.pathname = "/dashboard/index.html"

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
if (window.location.pathname == "/") {
    let googleBtn = document.getElementById('googleBtn');
    googleBtn.addEventListener('click', googleSignup);
}

//-------------------------- signout -------------------------
let sign_out = document.getElementById("sign_out");
if (window.location.pathname == "/dashboard/index.html")
    sign_out.addEventListener("click", () => {
        signOut(auth).then(() => {
            console.log("Sign-out successful.");
            window.location.href = "http://127.0.0.1:5500/";
        }).catch((error) => {
            console.log(error.code);
        });
    });


//______________ Getting user data from firestore _________________
let getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}
getAllUsers();

let updateProfile = async () => {
    // console.log("test");
    let lname = document.getElementById("lname").value;
    let fname = document.getElementById("fname").value;
    let number = document.getElementById("number").value;
    console.log(auth.currentUser.uid);
    let id = auth.currentUser.uid;
    try {
        const washingtonRef = doc(db, "users", id);
        await updateDoc(washingtonRef,
            {
                fname, lname,
                number
                // timestamp: serverTimestamp()
            }
        );
        console.log("Updated");

    } catch (e) {
        console.log(e);
    }
};
let update_btn = document.querySelector("#update_btn");
update_btn.addEventListener("click", updateProfile);

let name = document.getElementById('name').value;
export{name}