const body = document.getElementsByTagName('body')[0];

const barreHaute=document.createElement('div');
barreHaute.className='barre-haute';
    const colonne=document.createElement('div');
        colonne.className='colonne animate__animated animate__rotateInDownLeft  animate__delay-1s 1s';
        colonne.innerText='+ Colonne';
        // colonne.classList.add('animate__animated', 'animate__bounceOutLeft');
    const notes=document.createElement('div');
    const colonneNotes=document.createElement('div');
    colonneNotes.className="colonne-note"
        notes.className='note animate__animated animate__rotateInDownRight   animate__delay-1s 1s';
        notes.innerText='+ Notes'
        colonneNotes.append(colonne,notes)
    /* *************************************** */
                /* Partie Corbeille */
    /* *************************************** */
        const corbeille=document.createElement('i');
        corbeille.className="fa-solid fa-trash-can corbeille";
        const presCorbeille=document.createElement('i');
        presCorbeille.className="bx bx-left-arrow-alt pres-corbeille"
        // const partieCorbeille= document.querySelector('.partie-corbeille')
        corbeille.addEventListener('click',()=>{
            partieCorbeille.classList.toggle('cacher-partie-corbeille');
        })
    /* ******************************************************
    ################## Partie Auto-SAve ##########################
    *********************************************************** */
        const AutoSave=document.createElement('div');
        AutoSave.className="autosave"
        const iconeSave=document.createElement('i');
        const spanSave=document.createElement('span');
        spanSave.innerText='AutoSave';
        AutoSave.append(iconeSave,spanSave);
        iconeSave.className='bx bx-download icon-autosave';
    barreHaute.append(AutoSave,colonneNotes,presCorbeille,corbeille,);
    
    const icon = document.createElement('i');
    icon.className="fa-solid fa-gears";
    icon.addEventListener('click',function(){
        colonne.classList.add('apparence-barr-haut');
    });

    const containerModal=document.querySelector('.modal-container');
  let nbreCols=1;
  colonne.addEventListener('click',function(){
    if (nbreCols<=5) { 
         // containerModal.className='modal-container';
         colonne.classList.add('click-colonne')
         const modal=document.createElement('div');
         const titreModal=document.createElement('div');
         titreModal.className='titre-modal';
         modal.id=+nbreCols;
         modal.className='modal animate__animated animate__flip';
         const inputTitreModal=document.createElement('input');
         inputTitreModal.type="text";
         inputTitreModal.className='input-titre-modal';
         titreModal.appendChild(inputTitreModal);
         inputTitreModal.value='Colonne'+nbreCols
         //  Editer
         inputTitreModal.addEventListener('keyup',()=>{
             inputTitreModal.value=inputTitreModal.value.toUpperCase()
            })
            const contenuModal= document.createElement('div');
            contenuModal.className='contenu-modal';
            
            modal.append(titreModal,contenuModal);
            containerModal.appendChild(modal);
            // ################## Suppression d'une colonne ###############
            // ***********************************************************
            const deleteModal=document.createElement('i');
            deleteModal.className="fa-solid fa-circle-minus delete";
            modal.appendChild(deleteModal);
            modal.addEventListener('dblclick',()=>{
                deleteModal.classList.toggle('delett-colonne');
                deleteModal.addEventListener('click',function(e){
                    // console.log(e.target.parentElement!==containerModal.children[0]);
                    // console.log(containerModal.children.length===1);
                    // on ne peut supprimer la premiere que si elle est seule:
                    if (e.target.parentElement !=containerModal.children[0] ||containerModal.children.length===1){
                        confirm('Etes vous sûr de supprimer la colonne!');
                        e.target.parentElement.remove();
                        //Décrementation lorsqu'on supprime une colonne
                        nbreCols--;
                    }
                reflesh();    
                })
                reflesh();    
            })
            // *************************************************************
            // *************************************************************
            
            // getRandomColor()
            modal.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
                //Incrementation lorsqu'on supprime une colonne
            nbreCols++;
            
        } else{
            alert('Vous avez atteint la limite de Colonne!')
        }

        })
        // ***********************************************************

/******************************************************
    Fonction reflesh apres suppression de colonnes
****************************************************** */
    function reflesh() {
        const ListinputTitreModal=document.querySelectorAll('.input-titre-modal');
        ListinputTitreModal.forEach((titreModal,i)=>{
            titreModal.value='Colonne'+(i+1);
            titreModal.parentElement.parentElement.id=i+1; 
            // console.log(titreModal.parentElement.id);
          })
    }

/**********************************************************************************
#################### CREATION DU MODAL NOTE L'ORSQU'ON CLICK SUR NOTE################
********************************************************************************* */
const containerModalNotes=document.createElement('div');
notes.addEventListener('click',function () {
       const modal=document.querySelector('.modal');
        /* 
        *******************************************
            ON ouvre le Modal l'orsqu'on
            a aumoins une Colonne 
        *******************************************
        */
        if (modal) {
                    
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
        }else{
            alert("Il faut aumoins une Colonne avant ouvrire le Modal");
        }

    // Quitter le modal Notes lorsqu'on click sur Icon Close
    const iconClose=document.querySelector('.fa-rectangle-xmark');
    const modalNotes=document.querySelector('.modal-note')
    
    iconClose.addEventListener('click',function(){
        var res = confirm("Êtes-vous sûr de vouloir supprimer?");
            if(res){
                containerModalNotes.classList.add('clos-modal-notes');
            }
         })

         
         /* ########Ajouter du text lorsqu'on click sur 
         le boutton ajouter du formulaire ####### */
         let nbrCarte=1;
         const boutonAdd=document.querySelector('.btn');
         // checkValue(valNote);
         boutonAdd.addEventListener('click',function(e){
            // e.preventDefault();
        const contenuModal=document.querySelector('.contenu-modal');
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
        iconSupp.addEventListener('click',(e)=>{
            carte=e.target.parentElement.parentElement;
            listeCorbeille.appendChild(carte);
        })
    
        carte.append(iconRowG,iconRowD,textareaCarte,divDetail,divIconEditSupp);

        //  Enregistrer la note puis fermer le modal.
        confirm('Voulez vous Enregistrer la note');
        containerModalNotes.className='clos-modal-notes';
        nbrCarte++
        /*  */
        // Recuperation des input du Modal
        /*  */
        const valtextarea=document.getElementById('val-note');
        const valDate=document.getElementById('val-date');
        const valHD=document.getElementById('val-hDebut');
        const valHF=document.getElementById('val-hFin');
        contenuModal.appendChild(carte);
        textareaCarte.innerText=valtextarea.value;
        divDate.innerText=valDate.value;
        divHDebut.innerText=valHD.value;
        divHFin.innerText=valHF.value;


             /**************************************** */
                    /* Déplacement des carte(Taches*/
        /****************************************************/
        iconRowD.addEventListener('click',(e)=>{
            // const contenuModal=document.getElementsByClassName('.contenu-modal')
            const carte=document.querySelector('.carte')
            const modal=e.target.parentElement.parentElement.parentElement;
            const idEntier=parseInt(modal.id)
            const colSuivant=document.getElementById(idEntier+1);
            colSuivant.children[1].appendChild(e.target.parentElement);
            // console.log(colSuivant.children[1]);
         })
        iconRowG.addEventListener('click',(e)=>{
            const modal=e.target.parentElement.parentElement.parentElement;
            const idEntier=parseInt(modal.id)
            const colPrecedent=document.getElementById(idEntier-1);
            colPrecedent.children[1].appendChild(carte);
        })

    })
})

/* *************************************** */
            /* Partie Liste Corbeille */
/* *************************************** */
        const partieCorbeille=document.createElement('div');
        partieCorbeille.className='partie-corbeille'
        const listeCorbeille=document.createElement('div');
        listeCorbeille.className='liste-corbeille'
        partieCorbeille.appendChild(listeCorbeille);

        body.append(barreHaute,containerModal,icon,containerModalNotes,partieCorbeille);


       
    
    /* 
    ********************************************************************
    ###################### LES Foctions ############################# 
    *******************************************************************
    */
    function checkValue(input) {
    //    var valInput=input.value
        if (input.value == "") {
            var message='Le champs ne doit pas etre vide !'
        }   
        return message;
    }
   
    
  
    