firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        usersDB.where("ID", "==", user.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().photoURL);
                //Ce am facut?
                /*
                In baza de date am salvat o copie al fiecarui user,un fel de profil,si acolo am salvat si
                poza de profil,acum am extras acest element din baza de date si am afisat linkul pozei din storage
                tu iei linkul acesta si il pui in src la img,asta e tot,am afisat si obiectul json la user,dar nu iti va trebui precis.
                */
            });
        })
    } else {
        console.log("user nu este logat");
    }
});