const placeholders = document.querySelectorAll('.settings-flex>.settings-column>.placeholder');
const initialBlocks = document.querySelectorAll('.settings-flex>.settings-column>.initial');

firebase.auth().onAuthStateChanged((user) =>
{

    if (user)
    {

        let editBtn = document.querySelector(".edit-settings-btn");
        let signOutBtn = document.querySelector("#sign-out-btn");
        signOutBtn.onclick = () =>
        {
            firebase.auth().signOut().then(() =>
            {
                window.location = "../index.html";
            }).catch((error) =>
            {
                console.log(error);
            });
        }
        usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
        {
            querySnapshot.forEach((object) =>
            {

                document.getElementById("name-id-change").innerHTML = object.data().name;
                document.getElementById("avatar-photo-change").src = object.data().photoURL;
                document.getElementById("email-space-util").innerHTML = user.email;
                document.getElementById("register-space-util").innerHTML = `Inregistart la ${formatDate(object.data().created)}`;
                document.getElementById("avatar-place-first").src = object.data().photoURL;
                // document.getElementsByTagName("body")[0].style.display = "block";
                let downloadURLFile = object.data().photoURL;
                let realName = object.data().name;
                editBtn.onclick = () =>
                {
                    let file = document.getElementById("file-id-change").files[0];
                    let name = document.getElementById("name-id-change").innerHTML;
                    if (file != null)
                    {
                        firebase.storage().ref().child('/' + object.id + ".png").put(file).then((snapshot) =>
                        {
                            snapshot.ref.getDownloadURL().then((urlfile) =>
                            {
                                downloadURLFile = urlfile;
                                if (name.length > 0)
                                {
                                    realName = name;
                                }
                                usersDB.doc(object.id).update({
                                    name: realName,
                                    photoURL: downloadURLFile,
                                }).then(() =>
                                {
                                    window.location.reload();
                                });
                            })
                        });
                    } else
                    {
                        if (name.length > 0)
                        {
                            realName = name;
                        }

                        usersDB.doc(object.id).update({
                            name: realName,
                            photoURL: downloadURLFile,
                        }).then(() =>
                        {
                            window.location.reload();
                        });
                    }
                }
            });

            // Placeholder

            placeholders.forEach(placeholder =>
            {
                placeholder.style.display = 'none'
            })
            initialBlocks.forEach(placeholder =>
            {
                placeholder.style.display = 'initial';
            })
        })
            .catch((error) =>
            {
                console.log("Error getting documents: ", error);
            });
    } else
    {
        window.location = "../index.html";
    }
});