/* function creerModalNote() {
        const containerModalNotes=document.createElement('div');
        notes.addEventListener('click',function () {
            const modal=document.querySelector('.modal');        
            containerModalNotes.className="container-modal-note";
            containerModalNotes.innerHTML=
            `
            <div class="modal-note  animate__animated animate__heartBeat">
                <div class="taches">
                    <h3> NOUVELLE TACHE</h3>
                    <i class="fa-solid fa-rectangle-xmark"></i>
                </div>
                <div class="form modal">
                    <h3>Remplir les informations de la nouvelle taches:</h3>
                    <label for="">Tâches</label>
                    <textarea name="valnote" id="val-note" value="" cols="30" rows="10" value=""></textarea>
                    <label for="">Date</label>
                    <input type="date" name="" value="" id="val-date">
                    <label for="">Heure de Début</label>
                    <input type="time" name="" value="" id="val-hDebut">
                    <label for="">Heure de Fin</label>
                    <input type="time" name="" value="" id="val-hFin">
                    <button class="btn">Ajout</button>
                    </div> 
            </div>
        
            `;
        })
    return containerModalNotes; 
    // return body;
} */
function reflesh() {
    const ListinputTitreModal=document.querySelectorAll('.input-titre-modal');
    ListinputTitreModal.forEach((titreModal,i)=>{
        titreModal.value='Colonne'+(i+1);
        titreModal.parentElement.parentElement.id=i+1; 
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

function creerModalConfirm(message,elemClos,elemSup) {
    const containerModalConfirm = document.querySelector('.container-modal-confirm');
    const modalConfirm= document.querySelector('.modal-confrm');
    const p = document.querySelector('.para');
    const btnConfirm=document.getElementsByTagName('button');
    p.innerText=message
    containerModalConfirm.classList.add('show-modal-confirm')
    btnConfirm[1].addEventListener('click',()=>{
        elemClos.className="animate__animated animate__hinge  close-modalConfirm";
        containerModalConfirm.classList.remove("show-modal-confirm");
        elemSup.remove();
        containerModalConfirm.classList.remove("show-modal-confirm");
        
    })
    btnConfirm[0].addEventListener('click',()=>{
        containerModalConfirm.className="animate__animated animate__hinge  close-modalConfirm";
        
    })
    
    // const divBtnConfirm = document.createElement('div');
    // const btnCancel=document.createElement('button');
    // return body;
    // divBtnConfirm.append(btnCancel,btnConfirm);
    // modalConfirm.append(p,divBtnConfirm)
    // containerModalConfirm.appendChild(modalConfirm)
    // body.appendChild(containerModalConfirm);
    // elemtSup.remove();
    // btnCancel.innerText='Cancel';
    // btnConfirm.innerText='Confirm';
    // containerModalConfirm.className='container-modal-confirm'
    // modalConfirm.className='modal-confrm';
    // divBtnConfirm.className='div-btnconfirm'
}

function creationCarte(textarea,input1,input2,input3) { 
    // Verification des champs vides:  
    if (textarea=="" || input1=="" || input2 =="" || input3==""){
        // containerModalNotes.appendChild(errorMsg('Les champs ne doit pas etre vide!'))
        e.preventDefault();
    }     
    let nbrCarte=1;
        const carte= document.createElement('div');
        carte.id='carte'+nbrCarte;
        carte.className='carte animate__animated animate__rollIn';
        const textareaCarte= document.createElement('textarea');
        textareaCarte.className='textarea-carte'
        const iconRowG=document.createElement('i');
        const iconRowD=document.createElement('i');
        iconRowG.className="bx bxs-left-arrow icon-deplacement";
        iconRowD.className="bx bxs-right-arrow icon-deplacement";
        textareaCarte.rows='3'
        // creation des div de recuperation des dates:
        const divDetail=document.createElement('div');
        const divDate= document.createElement('div');
        const divHDebut= document.createElement('div');
        const divHFin= document.createElement('div');
        // Creation des icones Edit et Supprimer des taches
        const divIconEditSupp= document.createElement('div');
        const iconSupp= document.createElement('i');
        const iconEdit= document.createElement('i');
        divIconEditSupp.className='edit-supp';
        iconEdit.className="edit bx bx-pencil";
        iconSupp.className="supp bx bx-trash"
        divIconEditSupp.append(iconEdit,iconSupp);
        divDetail.className="div-detail animate__animated animate__flipInX";
        divDate.className='date';
        divHDebut.className='date';
        divHFin.className='date';
        divDetail.append(divDate,divHDebut,divHFin);
        //Appel de la fonction showDetail
        carte.addEventListener('mouseover',()=>{
            divDetail.classList.toggle('show-detail');
        })
        // Insertion des valeur de l'input;
        textareaCarte.innerText=textarea;
        divDate.innerText='Date: '+input1;
        divHDebut.innerText='Heure-debut: '+input2;
        divHFin.innerText= 'Heure-Fin: '+input3;
        // Deplacement taches
        DeplacementTaches(iconRowD,iconRowG)
        carte.append(iconRowG,iconRowD,textareaCarte,divDetail,divIconEditSupp);
        DeplacerVersCorbeil(iconSupp,carte);
            
        nbrCarte++;
        return carte;
}

/* ************FONCTION MESSAGE D'ERREUR********** */





function errorMsg(input,small,message){
    if (input.value) {
        small.classList.add('show-message-error');
        small.innerText=message; 
    }   
};

/* *************************************************** */
function DeplacerVersCorbeil(icon,elemt) {
    icon.addEventListener('click',(e)=>{
        const iconRow=document.querySelector('.icon-deplacement');
        elemt= e.target.parentElement.parentElement;
        listeCorbeille.appendChild(elemt);
        elemt.classList.add('carte-liste-corbeille');
        // iconRow.classList.add("cacher-iconRow");
    }) 
    elemt.addEventListener('dblclick',(e)=>{
        const contenuModal=document.querySelector('.contenu-modal');
        AlertConfirm(contenuModal,e.target.parentElement)
        elemt.className='carte';
        // console.log(e.target.parentElement);
    })  
}

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
        const idEntier=parseInt(modal.id)
        const colSuivant=document.getElementById(idEntier+1);
        colSuivant.children[1].appendChild(e.target.parentElement);
        modalNote.className="animate__animated animate__zoomOutRight"
        })
    icon2.addEventListener('click',(e)=>{
        const modal=e.target.parentElement.parentElement.parentElement;
        const idEntier=parseInt(modal.id)
        const colPrecedent=document.getElementById(idEntier-1);
        colPrecedent.children[1].appendChild(e.target.parentElement);
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


// boutonAdd.addEventListener('submit',(e)=>{
/* function Deplacer(bouton){
    bouton.addEventListener('click',(e)=>{
        const modal=e.target.parentElement.parentElement.parentElement;
        const idEntier=parseInt(modal.id)
        const colPrecedent=document.getElementById(idEntier-1);
        colPrecedent.children[1].appendChild(e.target.parentElement);
    })
    // console.log(colSuivant)
} */