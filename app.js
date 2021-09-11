// Sign Up Function

const signup = () => {

    const signupUserName = document.getElementById("exampleInputUser1");
    const signupEmail = document.getElementById("exampleInputEmail1");
    const signupPassword = document.getElementById("exampleInputPassword1");


    firebase.auth().createUserWithEmailAndPassword(signupEmail.value, signupPassword.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...

            console.log(user);
            console.log(user.uid);

            const uid = user.uid;

            //database main save karwa rahey


            const member = {
                userName: signupUserName.value,
                email: signupEmail.value,
                password: signupPassword.value,
                meriChabi: uid
            }

            console.log(member);

            firebase
                .database()
                .ref(`users/${uid}`)
                .set(member)
                .then(() => {
                    alert("customer register hogaya");
                    location.href = "login.html";
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..

            alert(errorCode);
            alert(errorMessage);
        });



};
// const signup = () => {

//     const signupUserName = document.getElementById("exampleInputUser1");
//     const signupEmail = document.getElementById("exampleInputEmail1");
//     const signupPassword = document.getElementById("exampleInputPassword1");


//     const signupPersonObject = {
//         username: signupUserName.value,
//         email: signupEmail.value,
//         password: signupPassword.value,
//     };


//     let localStorageData = JSON.parse(localStorage.getItem("userData")) || [];
//     localStorageData.push(signupPersonObject);
//     localStorage.setItem("userData", JSON.stringify(localStorageData));

//     window.location.assign = "login.html";

//     // console.log(signupPersonObject);

// };

// Login Function

function login() {

    const loginEmail = document.getElementById("exampleInputEmail");
    const loginPassword = document.getElementById("exampleInputPassword1");


    firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            console.log(user.uid);
            console.log(user.email);
            location.href = "team.html";

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorCode)
            alert(errorMessage)
        });

};
// function login() {

//     const loginUserName = document.getElementById("exampleInputUser1");
//     const loginPassword = document.getElementById("exampleInputPassword1");

//     const loginPersonObject = {
//         username: loginUserName.value,
//         password: loginPassword.value,
//     }

//     var loginUserData = JSON.parse(localStorage.getItem("userData"));

//     // console.log(loginUserName);

//     var flag = false;

//     for (var i = 0; i < loginUserData.length; i++) {
//         if (
//             loginUserData[i].username == loginPersonObject.username &&
//             loginUserData[i].password == loginPersonObject.password
//         ) {
//             flag = true;
//         }

//     }


//     if (flag) {
//         alert("You are signed in")
//         window.location.assign("team.html");

//     } else {
//         alert("Username or password is wrong")
//     }


// };

// Create Team 

const createTeam = () => {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;


            console.log(uid);


            var createUser = document.getElementById("exampleInputUser1");
            var createCategory = document.getElementById("catergoryinput");
            var createEmail = document.getElementById("exampleInputEmail1");

            var key = firebase.database().ref(`users/${uid}/myTeamMember`).push().key;

            const createTeamObject = {
                userName: createUser.value,
                userCategory: createCategory.value,
                createEmail: createEmail.value,
                meriChabi : key
            }



            firebase.database().ref(`users/${uid}/myTeamMember/${key}`).set(createTeamObject).then(() => {
                alert("member register hogaya");
            });
            // ...
        } else {
            // User is signed out
            // ...
            location.href = "login.html";
        }
    });



};
// const createTeam = () => {
//     var createUser = document.getElementById("exampleInputUser1");
//     var createCategory = document.getElementById("catergoryinput");
//     var createEmail = document.getElementById("exampleInputEmail1");



//     const createTeamObject = {
//         userName: createUser.value,
//         userCategory: createCategory.value,
//         createEmail: createEmail.value,
//     }

//     console.log(createTeamObject);
//     let myUl = document.getElementById("demo");
//     let li = document.createElement('li');
//     li.innerText = createTeamObject.userName;
//     myUl.appendChild(li);

// };

const dashboard = () => {
    const dashboardName = document.getElementById('dashboardName');
    console.log(dashboardName.innerText);


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;


            console.log(uid);


            firebase.database().ref(`users/${uid}`).once("value", (data) => {
                console.log(data.val());
                console.log(data.val().meriChabi);
                console.log(data.val().email);
                console.log(data.val().userName);
                console.log(data.val().password);


                dashboardName.innerText = `${data.val().userName.toUpperCase()} Team Form`

            })
            // ...
        } else {
            // User is signed out
            // ...
            location.href = "login.html";
        }
    });
}

const logout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Jaa rhey ho, Allah Hafiz")
    }).catch((error) => {
        // An error happened.
    });
}

