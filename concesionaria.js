const fs = require('fs');
const autos = require("./autos");

let persona = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000,
};

let concesionaria = {
   autos: autos,

   buscarAuto: function(patente){
    let autoABuscar = null;
    this.autos.filter(function(auto){
        if(auto.patente == patente){
            autoABuscar = auto;
        }
    })
        return autoABuscar;
    },

    venderAuto: function(patente){
        let autoBuscado = this.buscarAuto(patente);
        if (autoBuscado != null){
           this.buscarAuto(patente).vendido = true;
           return this.buscarAuto(patente);
        } else {
           return "no existe ningun vehiculo con esa patente";
        }
    },

    autosParaLaVenta: function(){
        return this.autos.filter(function(auto){
           return auto.vendido == false;
        });
    },

    autosNuevos: function(){
        let autosDisponibles = this.autosParaLaVenta();
        return autosDisponibles.filter(function(auto){
            return auto.km < 100;
        });
    },

    listaDeVentas: function(){
        let autosVendidos = this.autos.filter(function(auto){
            return auto.vendido == true;
        });
        return autosVendidos.map(function(auto){
            return auto.precio;
        });
    },

    totalDeVentas: function(){
        return this.listaDeVentas().reduce((acumulador, precio) => acumulador + precio, 0);    
    },
    
    puedeComprar(auto,persona){
        let autoElegido = this.buscarAuto(auto);
        let cuota = autoElegido.precio / autoElegido.cuotas;
        return persona.capacidadDePagoTotal >= autoElegido.precio && persona.capacidadDePagoEnCuotas >= cuota;
    },


    autosQuePuedeComprar: function(persona){
        return this.autosParaLaVenta().filter(auto => this.puedeComprar(auto.patente, persona));
    },

};

/*console.log(concesionaria.buscarAuto("APL123"));
console.log(concesionaria.venderAuto("APL123"));
console.log(concesionaria.autosParaLaVenta());
console.log(concesionaria.autosNuevos());
console.log(concesionaria.listaDeVentas());
console.log(concesionaria.totalDeVentas());
console.log(concesionaria.puedeComprar("JJK116", persona));*/
console.log(concesionaria.autosQuePuedeComprar(persona));
