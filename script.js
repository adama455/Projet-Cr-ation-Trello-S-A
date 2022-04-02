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
        // Creation Icon para et Quand on clid sur
        //  On ouvre les bouton Colonne et Note
        const icon = document.createElement('i');
        icon.className="fa-solid fa-gears";
        icon.addEventListener('click',function(){
            colonneNotes.classList.add('show-colonne-note');
        });
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
            deleteModal.addEventListener('dblclick',()=>{
                deleteModal.classList.toggle('delett-colonne');
                deleteModal.addEventListener('click',function(e){
                    if (e.target.parentElement !=containerModal.children[0] ||containerModal.children.length===1){
                        // creerModalConfirm("Voulez vous vraiment quitter le modalNote!","",e.target.parentElement);    
                        confirm('Etes vous sûr de supprimer la colonne!');
                        e.target.parentElement.remove();
                        notification("Vous venez de supprimer une colonne et ses tâches!!");
                        nbreCols--
                    }
                    reflesh();    
                })
                reflesh();    
            })
            // getRandomColor()
            modal.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
                //Incrementation lorsqu'on supprime une colonne
            nbreCols++;
            
    } else{
        notification('Vous avez atteint la limite de Colonne!');
    }
})
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
            <div class="modal-note">
                <div class="taches">
                    <h3> NOUVELLE TACHE</h3>
                    <i class="fa-solid fa-rectangle-xmark"></i>
                </div>
                <div class="form modal">
                    <h3>Remplir les informations de la nouvelle taches:</h3>
                    <label for="">Tâches</label>
                    <textarea name="valnote" id="val-note" class="input" value="" cols="30" rows="10" value=""></textarea>
                    <small class="chp-textarea" >error</small>  
                    <label for="">Date</label>
                    <input type="date" name="" class="input" value="" id="val-date">
                    <small class="chp-date" >error</small> 
                    <label for="">Heure de Début</label>
                    <input type="time" name="" class="input" value="" id="val-hDebut">
                    <small class="chp-hDebut" >error</small>  
                    <label for="">Heure de Fin</label>
                    <input type="time" name="" class="input" value="" id="val-hFin">
                    <small class="chp-hFin" >error</small>
                    <button class="btn" type="submit">Ajout</button>
                    </div> 
            </div>
        
            `;
        }else{
            notification("Il faut aumoins une Colonne avant ouvrire le Modal");
        }

    // Quitter le modal Notes lorsqu'on click sur Icon Close
    const iconClose=document.querySelector('.fa-rectangle-xmark');
    iconClose.addEventListener('click',function(){
        /* Apelle de la fonction Confirmation */
     creerModalConfirm("Voulez vous vraiment quitter le modalNote!",containerModalNotes,"");    
    })
    /* ########Ajouter du text lorsqu'on click sur 
        le boutton ajouter du formulaire ####### */

    const boutonAdd=document.querySelector('.btn');
    boutonAdd.addEventListener('click',function(e){
    /******Recuperation des input du Modal******/
        var valtextarea=document.getElementById('val-note').value;
        var date=document.getElementById('val-date').value;
        var hDebut=document.getElementById('val-hDebut').value;
        var hFin=document.getElementById('val-hFin').value;
        console.log(valtextarea,date,hDebut,hFin);
        var hD=Date.parse(`${date} ${hDebut}`)
        var hF=Date.parse(`${date} ${hFin}`)
        var now=Date.parse(new Date())
        if (hF<hD || hD < now){
            e.preventDefault
        }else{
            const contenuModal=document.querySelector('.contenu-modal');
            contenuModal.appendChild(creationCarte(valtextarea,date,hDebut,hFin));
            // On quitte le modal quand on click sur Ajouter
            containerModalNotes.className="close-modalConfirm";
        }
        // console.log(hD,hF,now);
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
