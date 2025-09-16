/*const motApplication = "Bonjour"
let motUtilisateur = prompt("Entrez un mot:" + motApplication)

switch (motUtilisateur){
    case motApplication:
        console.log("Bravo!")
        break
    case "Gredin":
        console.log("Restez Correcte!")
        break
    case "Mécréant":
        console.log("Restez correcte!")
        break
    case "Vilain":
        console.log("Soyez gentil!")
        break
    default:
        console.log("Vous avez fait une erreur de frappe.")
    
}

const listeMot =["Cachalot","Pétunia","Serviette"]
let score=0
let motUtilisateur = prompt("Entrez le mot contenu dans la première case du tableau:" + listeMot[0])

if(motUtilisateur===listeMot[0]){
    score+=1;
    
}

 motUtilisateur = prompt("Entrez le mot contenu dans la première case du tableau:" + listeMot[1])

if(motUtilisateur===listeMot[1]){
    score+=1;
    
}

 motUtilisateur = prompt("Entrez le mot contenu dans la première case du tableau:" + listeMot[2])

if(motUtilisateur===listeMot[2]){
    score+=1;
    
}

console.log(score);

for(let i=0;i<3;i++){
    console.log(i)
}

let i = 0
while (i < 3) {
    console.log(i)
   i++
}


let mot=prompt("Ecrivez Ok")

while(mot!=="Ok"){
    mot=prompt("Ecrivez Ok")
}
console.log("Vous avez ecrit Ok")*/






function afficherResultat(score, nbMotsProposés) {
    let spanScore = document.querySelector(".zoneScore span")

    let affichageScore = `${score}/ ${nbMotsProposés}`

    spanScore.innerText = affichageScore
    console.log("Votre score est de" + score + " sur" + nbMotsProposés)
}


function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}+?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}
/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */

function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court.")
    }

}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }



}

function afficherMessageErreur(message){
  

   let spanErreurMessage = document.getElementById("erreurMessage")
   
   if(!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.querySelector("span")
        spanErreurMessage.id="erreurMessage"

       popup.append(spanErreurMessage)
   }
   spanErreurMessage.innerText = message
   
}

function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom,email,scoreEmail)

    } catch(erreur) {
        afficherMessageErreur(erreur.message)
    }
}
function lancerJeu() {
    //Initialisation

    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMot


    afficherProposition(listeProposition[i])
    let btnValiderMot = document.getElementById("btnValiderMot")
    btnValiderMot.addEventListener("click", () => {
        let inputEcriture = document.getElementById("inputEcriture")
        console.log(inputEcriture.value)

        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }

    })

    let listebtnradio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listebtnradio.length; index++) {
        listebtnradio[index].addEventListener("change", (event) => {
            console.log(event.target.value)

            if (event.value === "1") {
                listeProposition = listeMot
            } else {
                listeProposition = listePhrases
            }
            afficherProposition(listeProposition[i])
        })
    }

    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} /${i}`
        gererFormulaire(scoreEmail)


    })
    afficherResultat(score, i)
}

