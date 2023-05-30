
  const LOCAL_API_URL = "./assets/bd/bd.json";

function leerArchivo(){
    
        fetch(LOCAL_API_URL)
        .then((res) => res.json())
        .then((cod)=>{
            //this.codigos = cod;
             //const search = 'G003296A';
            console.log(cod);
            
            
        });
        
 }
