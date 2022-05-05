const APIURL="http://localhost:8000/?controllers=taches&action= ";
    fetch(APIURL + "etat",{
        method:"POST",
        body:JSON.stringify(
            {
                Khadim:"ndiombor",
                Aliou:"ndiomb"
            }
        )
    })
// console.log(APIURL);
       
