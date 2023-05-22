// const createApp = Vue.createApp;
// igual que lo anterior pero aplicando deconstructin
import { tarjeta } from "./component.js";
import { initData } from "./datainicializadora.js";
import { loader } from "./loader.js";

const LOCAL_API_URL = "./assets/bd/bd.json";

const {createApp}=Vue;
const idApp="app";
/** generar el objeto credor*/
const core = {
    data: function(){
        return initData;
    },
    created:function(){
        setTimeout(()=>{

            this.user = {
                nombre: "omar",
                email: "pepe@gmail.com",
            };
        },4000 )
    },
    watch:{
        user:function(){
           this.cuandoSeCrea= `${this.user.nombre.toUpperCase()} ha sido creado`;
            setTimeout(()=>{
                this.cuandoSeCrea=null
            },1500)
        },
    },
    methods:{
        // codigoHandler: function(){
        //     fetch(LOCAL_API_URL)
        //     .then((res) => res.json())
        //     .then((cod) => (this.codigos=cod));
        // },
        //hasta aca andaba
        codigoHandler: function(){
            fetch(LOCAL_API_URL)
            .then((res) => res.json())
            .then((cod)=>{
                //this.codigos = cod;
                const search = document.getElementById("txtBuscar").value;
                //const search = 'G003296A';
                cod = cod.filter(c=>c.pcbUsb.startsWith(search.toUpperCase()));
                if(cod.pcbUsb === null|| cod==''){
                    console.log('vacio'+cod);
                    this.mensaje=true,
                    this.codigos=null;
                }else{
                    
                    console.log('con datos'+cod);
                    this.codigos= cod;
                }
                
            });
            // .then((cod) => (console.log(typeof(cod))));
        },
    },

};


/** generar el componente para trabajar */
const renderApp=createApp(core);


/**montado => inyeccion de elementos */
renderApp.component("vue-loader",loader);

renderApp.mount(`#${idApp}`);
