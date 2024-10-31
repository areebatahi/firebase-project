import { auth, createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged , sendEmailVerification, signOut } from './firebase.js'

//________________________signUp______________________
let sign_Up = () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let name = document.getElementById('name').value;
  if(name == ""){
    alert("Please enter your name");
  }else if(confirmPassword == password){
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = './dasboard.html'
      })
      .catch((error) => {
        console.log(error.code);
      });
  }else{
    alert("Passwords do not match");
  }

}

let signUp = document.getElementById('signUp');
signUp.addEventListener('click', sign_Up);


//__________________SignIn__________________

let sign_in = document.getElementById('sign_in');
sign_in.addEventListener('click', signIn)
let signIn = () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = './dasboard.html'
    })
    .catch((error) => {
      console.log(error.code);
    });
}

//________________change auth______________________
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log(user);
//     window.location.href = "./index.html"
//   } else {
//    console.log("User not found")
//   }
// }); 

//__________________signOut_____________________
// let signout = ()=>{
//   signOut(auth).then(() => {
//     console.log("Sign-out successful.");
//     window.location.href = "./index.html"
//   }).catch((error) => {
//     console.log(error)
//   });
// }
// let sign_Out = document.getElementById("sign_Out");
// sign_Out.addEventListener("click",signout);