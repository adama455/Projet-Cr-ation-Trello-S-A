const body = document.getElementsByTagName('body')[0];
const barreHaute=document.createElement('div');
barreHaute.className='barre-haute';
    const colonne=document.createElement('div');
        colonne.className='colonne animate__animated animate__rotateInDownLeft animate__delay-1s 1s';
        colonne.innerText='+ Colonne';
        // colonne.classList.add('animate__animated', 'animate__bounceOutLeft');
    const notes=document.createElement('div');
    const colonneNotes=document.createElement('div');
    colonneNotes.className="colonne-note"
        notes.className='note animate__animated animate__rotateInDownRight animate__delay-1s 1s';
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
        corbeille.className="fa-solid fa-trash-can";
        corbeille.classList.add("corbeille");
        const presCorbeille=document.createElement('i');
        presCorbeille.className="bx bx-left-arrow-alt pres-corbeille"
        corbeille.addEventListener('click',()=>{
            const partieCorbeille = document.querySelector('.partie-corbeille');
            partieCorbeille.classList.toggle('showCorbeille');
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
        /* *************************************************
        ######Mise en place de la Liste des taches:######
        ************************************************ */
        const liste=document.createElement('div');
        liste.className="liste"
        const span=document.createElement('span')
        span.innerText='Liste'
        const iconeListe=document.createElement('i');
        iconeListe.className="bx bxs-file-import icon-liste";
        liste.append(iconeListe,span);
        liste.addEventListener('click',()=>{
            const ListeTache=document.querySelector('.listes-taches');
            ListeTache.classList.toggle("show-listes-taches");
        })
    barreHaute.append(AutoSave,liste,colonneNotes,presCorbeille,corbeille); 
    const containerModal=document.querySelector('.modal-container');
    let nbreCols=1;
    colonne.addEventListener('click',function(){
    if (nbreCols<=5){ 
         // containerModal.className='modal-container';
         colonne.classList.add('click-colonne')
         const modal=document.createElement('div');
         const titreModal=document.createElement('div');
         titreModal.className='titre-modal';
         modal.id="colonne_"+nbreCols;
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
            // ################## Suppression d'une colonne ##############
            // ***********************************************************
            const deleteModal=document.createElement('i');
            deleteModal.className="fa-solid fa-circle-minus delete";
            modal.appendChild(deleteModal);
            deleteModal.addEventListener('dblclick',()=>{
                deleteModal.classList.toggle('delett-colonne');
                deleteModal.addEventListener('click',function(e){
                    if (e.target.parentElement !=containerModal.children[1] || containerModal.children.length===2){
                        // creerModalConfirm("Voulez vous vraiment supprimer cette colonne!",modal);   
                        e.target.parentElement.remove();
                        nbreCols--
                        notification("Vous venez de supprimer la colonne et ses tâches!!");
                    }
                    reflesh();    
                })
                reflesh();    
            })
            // getRandomColor()
            modal.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
                //Incrementation lorsqu'on supprime une colonne::::::::::::::::::::::::::::
            nbreCols++;   
    } else{
        notification('Vous avez atteint la limite de Colonne!');
    }
})
/*****************************************************************************************
    *******########## CREATION DU MODAL NOTE L'ORSQU'ON CLICK SUR NOTE ##########*****
******************************************************************************************/
// const containerModalNotes=document.createElement('div');
const containerModalNotes=document.querySelector('.container-modal-note');
const contenuModal=document.querySelector('.contenu-modal');
const form= document.getElementById("form");
const boutonAdd=document.querySelector('.btn');
const iconClose=document.querySelector('.fa-rectangle-xmark');
/// Add Modal************************************************
notes.onclick=()=>{
    if (document.querySelectorAll('.modal').length!==1) {
        containerModalNotes.classList.replace('container-modal-note','show-container-modal-note');
    }else{
        notification("Il faut aumoins une Colonne avant ouvrire le Modal");
    }
};
iconClose.onclick=()=>{
    /* Apelle de la fonction Confirmation */
     creerModalConfirm("Voulez vous vraiment quitter le modalNote!",containerModalNotes);    
}
/// Add Taches -> Colonne
boutonAdd.addEventListener('click',function(e){
    /******Recuperation des input du Modal******/
    const valtextarea=document.getElementById('note').value;
    const date = document.getElementById('date').value;
    const heureDebut = document.getElementById('heure-debut').value;
    const heureFin = document.getElementById('heure-fin').value;
        const span1=document.querySelector('.chp-textarea');
        const span2=document.getElementById('.chp-date');
        const span3=document.getElementById('.chp-hDebut');
        const span4=document.getElementById('.chp-hFin');
        var hD=Date.parse(`${date} ${heureDebut}`)
        var hF=Date.parse(`${date} ${heureFin}`)
        var dateAct=Date.parse(`${date}`)
        var now=Date.parse(new Date())
        // console.log(hF);
        var vtextarea=document.getElementById('note')
        var vdate=document.getElementById('date')
        var vhDebut=document.getElementById('heure-debut')
        var vhFin=document.getElementById('heure-fin')
        // console.log(valtextarea,date,hDebut,hFin);
        checRequired([vtextarea,vdate,vhDebut,vhFin])
        chekValue(valtextarea,span1);
        chekValue(date,span2);
        chekValue(heureDebut,span3);
        chekValue(heureFin,span4);
        dateD_F(hD,hF)
            e.preventDefault();
        if (hF<=hD || dateAct < now){
            e.preventDefault
        }else{
            const contenuModal=document.querySelector('.contenu-modal');
            contenuModal.appendChild(creationCarte(valtextarea,date,heureDebut,heureFin));
            // On quitte le modal quand on click sur Ajouter:::::::::::::::::::::
            containerModalNotes.classList.replace('show-container-modal-note','container-modal-note');
        }   
    })
/* boutonAdd.addEventListener('click',function(e){
        const span1=document.getElementById('chp-textarea');
        const span2=document.getElementById('chp-date');
        const span3=document.getElementById('chp-hDebut');
        const span4=document.getElementById('chp-hFin');
        var hD=Date.parse(`${date} ${heureDebut}`)
        var hF=Date.parse(`${date} ${heureFin}`)
        var now=Date.parse(new Date())
        console.log(hF);
        const vtextarea=document.querySelector('.champ1')
        const vdate=document.querySelector('.champ2')
        const vhDebut=document.querySelector('.champ3')
        const vhFin=document.querySelector('.champ4')
        checRequired([vtextarea,vdate,vhDebut,vhFin])

        chekValue(valtextarea,span1);
        chekValue(date,span2);
        chekValue(heureDebut,span3);
        chekValue(heureFin,span4);
        dateD_F(hD,hF)
        e.preventDefault();
        if (hF<hD || hD < now){
            e.preventDefault
        }else{
            const contenuModal=document.querySelector('.contenu-modal');
            console.log(valtextarea,date,heureDebut,heureFin);
            contenuModal.appendChild(creationCarte(valtextarea,date,heureDebut,heureFin));
            // On quitte le modal quand on click sur Ajouter:::::::::::::::::::::
            containerModalNotes.className="close-modalConfirm";
        }
        
    }) */
const demarrer=document.getElementById('demarrer');
const iconDemarrer=document.querySelector('.icon-demarrer');
demarrer.addEventListener('click',()=>{
    barreHaute.classList.toggle('open-menu');
    iconDemarrer.classList.toggle("open-icon-demarrer");
})
body.append(barreHaute,containerModal,icon);
