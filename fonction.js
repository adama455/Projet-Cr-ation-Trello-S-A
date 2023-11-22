
function reflesh() {
    const ListinputTitreModal=document.querySelectorAll('.input-titre-modal');
    ListinputTitreModal.forEach((titreModal,i)=>{
        titreModal.value='Colonne'+(i+1);
        titreModal.parentElement.parentElement.id="colonne_"+(i+1); 
        console.log(titreModal.parentElement.id);
    })
}
function notification(message){
    const notif=document.querySelector('.notification');
    notif.classList.add('show-notification');
    notif.innerText=message;
    setTimeout(() => {
    notif.classList.remove('show-notification');
    }, 5000);
}
function creerModalConfirm(message,elemClos){
    const containerModalConfirm = document.querySelector('.container-modal-confirm');
    const modalConfirm= document.querySelector('.modal-confrm');
    const p = document.querySelector('.para');
    const btnConfirm=document.getElementsByTagName('button');
    p.innerText=message
    containerModalConfirm.classList.add('show-modal-confirm')
    btnConfirm[1].addEventListener('click',()=>{
        elemClos.classList.replace('show-container-modal-note','container-modal-note');
        // .className="animate__animated animate__hinge  close-modalConfirm";
        containerModalConfirm.classList.remove("show-modal-confirm");
        // elemSup.remove();
        // containerModalConfirm.classList.remove("show-modal-confirm");  
    })
    btnConfirm[0].addEventListener('click',()=>{
        containerModalConfirm.classList.remove("show-modal-confirm");
    })  
}
function chekValue(champs,spanM){
    if (champs==""){
        spanM.className='show-message-error';
        // e.preventDefault();
    }else{
        
    }
}
function creationCarte(textarea,input1,input2,input3) { 
    // Verification des champs vides:  
    // if (textarea=="" || input1=="" || input2 =="" || input3==""){
    //     // containerModalNotes.appendChild(errorMsg('Les champs ne doit pas etre vide!'))
    //     e.preventDefault();
    // }  
    let nbrCarte=1;
        const carte= document.createElement('div');
        carte.id='carte'+nbrCarte;
        carte.setAttribute("data_idCol","1");
        // console.log(carte);
        carte.className='carte animate__animated animate__rollIn';
        const textareaCarte= document.createElement('textarea');
        textareaCarte.className='textarea-carte'
        const iconRowG=document.createElement('i');
        const iconRowD=document.createElement('i');
        iconRowG.className="bx bx-chevron-left icon-deplacement";
        iconRowD.className="bx bx-chevron-right icon-deplacement";
        textareaCarte.rows='3'
        // creation des div de recuperation des dates:
        const divDetail=document.createElement('div');
        const divDate= document.createElement('div');
        const divHDebut= document.createElement('div');
        const divHFin= document.createElement('div');
        // Creation des icones Edit et Supprimer des taches
        const divIconSupp= document.createElement('div');
        const iconSupp= document.createElement('i');
        // const iconEdit= document.createElement('i');
        divIconSupp.className='edit-supp';
        iconSupp.className="supp bx bx-trash"
        // iconEdit.className="edit bx bx-pencil";
        const iconRestor= document.createElement('i');
        divIconSupp.append(iconSupp,iconRestor);
        divDetail.className="div-detail animate__animated animate__flipInX";
        divDate.className='date';
        divDate.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
        divHDebut.className='date';
        divHDebut.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
        divHFin.className='date';
        divHFin.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
        divDetail.append(divDate,divHDebut,divHFin);
        //Appel de la fonction showDetail
        carte.addEventListener('mouseover',(e)=>{
            carte.classList.toggle("etal-carte");
            divDetail.classList.toggle('show-detail');
        })
        // Insertion des valeur de l'input;
        textareaCarte.innerText=textarea;
        divDate.innerHTML='<div>Date:</div>'+input1;
        divHDebut.innerHTML='<div>Début:</div>'+input2;
        divHFin.innerHTML= '<div>Fin:</div> '+input3;
        // Deplacement taches
        DeplacementTaches(iconRowD,iconRowG) 
        carte.append(iconRowG,iconRowD,textareaCarte,divDetail,divIconSupp);
        //*************************** */ DeplacerVersCorbeil(iconSupp,carte);
        iconSupp.addEventListener('click',(e)=>{
            const listeCorbeille=document.querySelector('.liste-corbeille');
            var elemt= e.target.parentElement.parentElement;
            listeCorbeille.appendChild(elemt);
            iconRestor.className="restor bx bxs-share";
            iconSupp.className=""
            notification("Vous venez de déplacer la tâche vers la corbeille!");
        })
        // ***************************Restaurer la tache vers la colonne d'origine.
        iconRestor.addEventListener('click',(e)=>{ 
            // *************************Recuperation de l'attribut de la tache
            var elemt = e.target.parentElement.parentElement.getAttribute("data_idCol");
            var colonneOrigine=document.querySelector(`#colonne_${elemt}`)
            var colonne1=document.getElementById('colonne_1');
            if (colonneOrigine) {
                colonneOrigine.children[1].appendChild(carte);
            }else{
                colonne1.children[1].appendChild(carte);
            }
            iconSupp.className="supp bx bx-trash";
            iconRestor.className=""
            notification('Tâche restaurer avec succées!')
        })  
        nbrCarte++;
        return carte;
}
 //*************************** */ DeplacerVersCorbeil(iconSupp,carte);
 iconSupp.addEventListener('click',(e)=>{
    const listeCorbeille=document.querySelector('.liste-corbeille');
    var elemt= e.target.parentElement.parentElement;
    listeCorbeille.appendChild(elemt);
    iconRestor.className="restor bx bxs-share";
    iconSupp.className=""
    notification("Vous venez de déplacer la tâche vers la corbeille!");
})
// ***************************Restaurer la tache vers la colonne d'origine.
iconRestor.addEventListener('click',(e)=>{ 
    // *************************Recuperation de l'attribut de la tache
    var elemt = e.target.parentElement.parentElement.getAttribute("data_idCol");
    var colonneOrigine=document.querySelector(`#colonne_${elemt}`)
    var colonne1=document.getElementById('colonne_1');
    if (colonneOrigine) {
        colonneOrigine.children[1].appendChild(carte);
    }else{
        colonne1.children[1].appendChild(carte);
    }
    iconSupp.className="supp bx bx-trash";
    iconRestor.className=""
    notification('Tâche restaurer avec succées!')
}) 

/* ************FONCTION MESSAGE D'ERREUR********** */
function corbeill() {
    const partieCorbeille=document.createElement('div');
    partieCorbeille.className='partie-corbeille'
    const listeCorbeille=document.createElement('div');
    listeCorbeille.className='liste-corbeille';
    partieCorbeille.appendChild(listeCorbeille);
    return partieCorbeille;
}

/****************************************************/
        /* Déplacement des carte(Taches*/
/****************************************************/
function DeplacementTaches(icon1,icon2) {
    const modalNote=document.querySelector('modal-note');
    icon1.addEventListener('click',(e)=>{
        const modal=e.target.parentElement.parentElement.parentElement;
        var tab=modal.id.split("_",2);
        // console.log(tab);
        const idEntier=parseInt(tab[1]);
        const colSuivant=document.getElementById("colonne_"+(idEntier+1));
        colSuivant.children[1].appendChild(e.target.parentElement);
        const idSvt=colSuivant.id.split("_",2);
        notification('Tache déplacer vers la clonne suivante!')
        const carte=document.querySelector('.carte');
        carte.setAttribute("data_idCol",idSvt[1]);
        modalNote.className="animate__animated animate__zoomOutRight";  
    })
    icon2.addEventListener('click',(e)=>{
        const modal=e.target.parentElement.parentElement.parentElement;
        var tab=modal.id.split("_",2);
        const idEntier=parseInt(tab[1])
        const colPrecedent=document.getElementById("colonne_"+(idEntier-1));
        colPrecedent.children[1].appendChild(e.target.parentElement);
        notification('Tache déplacer vers la clonne precedante!')
        carte.setAttribute("data_idCol",idSvt[1]);
        modalNote.className="animate__animated animate__zoomOutLeft"
    })        
}

/* *************************************** */
        /* Partie Liste Corbeille */
/* *************************************** */
function AlertConfirm(elemtPrt,elemtFils) {
    var val = confirm("Voulez-vous continuer?");
    if(val) {
        elemtPrt.appendChild(elemtFils)
    } 
}
// ********************************************

function showError(input,message) {
    const formControl= input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message;
}
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';   
}

function checRequired(inputArray) {
    inputArray.forEach(function(input) {
        if (input.value=='') {
            showError(input,"Le champ est obligatoire")
        }else{
            showSuccess(input);
        }
    });
}
function dateD_F(input1,input2) {
    if (input1.value >= input2.value) {
        showError(input2,"L'heure de Fin doit etre supperieur à l'heure debut");
    }
}
// validation Formulaire::::::::::::::::
// function checkFields(field) {
//     if (field.value == "") {
//         return "Champ obligatoire";
//     } else {
//         if (field.classList.contains('heure') && field.value != "") {
//             if (heureDebut >= heureFin) {
//                 return "L'heure de fin doit ête plus grande que l'heure de début";
//             }
//             return "";
//         }
//         return "";
//     }
// }