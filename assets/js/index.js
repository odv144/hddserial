// const createApp = Vue.createApp;
// igual que lo anterior pero aplicando deconstructin
import { tarjeta } from "./component.js";
import { initData } from "./datainicializadora.js";
import { loader } from "./loader.js";

// const LOCAL_API_URL = "/assets/bd/bd.json";

const {createApp}=Vue;
const idApp="app";
/** generar el objeto credor*/
const core = {
    data: function(){
        return initData;
    },
    methods:{
        codigoHandler: function(){
            fetch('https://sheetdb.io/api/v1/0qlufyvfet6b3')
            .then((res) => res.json())
            .then((cod)=>{  
                const search = document.getElementById("txtBuscar").value;
                cod = cod.filter(c=>c.pcbUsb.startsWith(search.toUpperCase()));
                if(cod.pcbUsb === null|| cod==''){
                 this.mensajes='No tenemos una respuesta para este código, envianos un emial a soluciones@labs4recovery.com para solicitar mayor información';
                 this.codigos=null;
                }else{
                    this.mensajes=false;
                    this.codigos= cod;
                }
                
            });
           
        },
       


        familiaHandler: function(){
            fetch('https://sheetdb.io/api/v1/7lsrl0ziy52lf')
            .then((response)=> response.json())
            .then((data)=> {
                const search = document.getElementById("txtBuscarF").value;
                let codigo;
                let codLimpio;
                if (search.length>6){
                    codigo=search.split("-");
                    codLimpio = codigo[1].substring(2,5);
                }else{
                    codLimpio = search.substring(2,5);
                } 
                
                this.familia=data.filter(c=>c.codigo.toUpperCase() == codLimpio.toUpperCase());
               
                if(this.familia.length===0){
                    this.mensajes='No tenemos una respuesta para este código, envianos un emial a soluciones@labs4recovery.com para solicitar mayor información';
                    this.familia=null;
                }
                
            });
        },
    },

};


/** generar el componente para trabajar */
const renderApp=createApp(core);


/**montado => inyeccion de elementos */
renderApp.component("vue-loader",loader);

renderApp.mount(`#${idApp}`);
