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

function creerModalConfirm(message,elemClos) {
    const containerModalConfirm= document.createElement('div');
    const modalConfirm= document.createElement('div');
    const p = document.createElement('p');
    const divBtnConfirm = document.createElement('div');
    const btnConfirm=document.createElement('button');
    const btnCancel=document.createElement('button');
    containerModalConfirm.className='container-modal-confirm'
    modalConfirm.className='modal-confirm';
    modalConfirm.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
    divBtnConfirm.className='div-btnconfirm'
    p.innerText=message
    btnCancel.innerText='Cancel';
    btnConfirm.innerText='Confirm';
    divBtnConfirm.append(btnCancel,btnConfirm);
    modalConfirm.append(p,divBtnConfirm)
    containerModalConfirm.appendChild(modalConfirm)
    
    btnConfirm.addEventListener('click',()=>{
        // elemtSup.remove();
        elemClos.className="animate__animated animate__hinge  close-modalConfirm";
        containerModalConfirm.className="animate__animated animate__hinge  close-modalConfirm";
        
    })
    btnCancel.addEventListener('click',()=>{
        containerModalConfirm.className="animate__animated animate__hinge  close-modalConfirm";
        
    })
    body.appendChild(containerModalConfirm);
    return body;
}


function creationCarte() {
    let nbrCarte=1;
    const carte= document.createElement('div');
    carte.id='carte'+nbrCarte;
    carte.className='carte';
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
    divDetail.className='div-detail';
    divDate.className='date';
    divHDebut.className='date';
    divHFin.className='date';
    divDetail.append(divDate,divHDebut,divHFin);
    //Appel de la fonction showDetail
    carte.addEventListener('mousemove',()=>{
        divDetail.classList.toggle('show-detail');
    })
    // Deplacement taches
    DeplacementTaches(iconRowD,iconRowG)
    carte.append(iconRowG,iconRowD,textareaCarte,divDetail,divIconEditSupp);
    /* ************************************************ 
        ******Recuperation des input du Modal******
    *****************************************************/
        const valtextarea=document.getElementById('val-note');
        const date=document.getElementById('val-date');
        const hDebut=document.getElementById('val-hDebut');
        const hFin=document.getElementById('val-hFin');
        textareaCarte.innerText=valtextarea.value;
        divDate.innerText='Date: '+date.value;
        divHDebut.innerText='Heure-debut: '+hDebut.value;
        divHFin.innerText= 'Heure-Fin: '+hFin.value;
        DeplacerVersCorbeil(iconSupp,carte);
    nbrCarte++;
    return carte;
}
/* function showDivDetail(div) {
    // const carte=document.querySelector('.carte')
    div.addEventListener('mousemove',()=>{
        div.classList.toggle('show-detail');
    })
} */

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
        console.log(e.target.parentElement);
        elemt.className='carte';
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
    icon1.addEventListener('click',(e)=>{
        const modal=e.target.parentElement.parentElement.parentElement;
        const idEntier=parseInt(modal.id)
        const colSuivant=document.getElementById(idEntier+1);
        colSuivant.children[1].appendChild(e.target.parentElement);
        })
    icon2.addEventListener('click',(e)=>{
        const modal=e.target.parentElement.parentElement.parentElement;
        const idEntier=parseInt(modal.id)
        const colPrecedent=document.getElementById(idEntier-1);
        colPrecedent.children[1].appendChild(e.target.parentElement);
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

function checkValue(errorMsg) {
const input=document.querySelectorAll('.input')
    input.forEach(element => {
        if (element.value == " ") {
            var message=document.createElement('span').innerText=errorMsg;
        }   
        return message;
    });   
}

   








/* function Deplacer(bouton){
    bouton.addEventListener('click',(e)=>{
        const modal=e.target.parentElement.parentElement.parentElement;
        const idEntier=parseInt(modal.id)
        const colPrecedent=document.getElementById(idEntier-1);
        colPrecedent.children[1].appendChild(e.target.parentElement);
    })
    // console.log(colSuivant)
} */