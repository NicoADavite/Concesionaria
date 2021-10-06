const fs = require('fs');
const autos = require("./autos");

let concesionaria = {
   autos: autos,
   buscarAuto: function(patente){
      let autos = this.autos;
      let autoElegido;
      for(let i = 0; i < autos.length; i++){
         if(autos[i].patente.includes(patente)){
            autoElegido = autos[i];
            return autoElegido;
         } else {
            autoElegido = null;
         }
      } return autoElegido;
   },
   venderAuto: function(patente){
      let autos = this.autos;
      let autoVendido = this.buscarAuto(patente);
      if (autoVendido != null){
         autoVendido.vendido = true;
      };
      for(let i = 0; i < autos.length; i++){
         if(autos[i].patente.includes(patente)){
            autos[i] = autoVendido;
            return autos[i];
         }
      };
   },
   autosParaLaVenta: function(){
      let autos = this.autos;
      let autosDisponibles = autos.filter(function(auto){
         return auto.vendido != true;
      });
      return autosDisponibles;
   },
   autosNuevos: function(){
      let autosDisponibles = this.autosParaLaVenta();
      let autosNuevos = autosDisponibles.filter(function(auto){
         return auto.km < 100;
      });
      return autosNuevos;
   },
   listaDeVentas: function(){
      let autos = this.autos;
      let autosVendidos = autos.filter(function(auto){
         return auto.vendido == true;
      });
      let preciosAutosVendidos = autosVendidos.map(function(autosVendidos){
         return autosVendidos.precio;
      });
      return preciosAutosVendidos;
   },
   totalDeVentas: function(){
      let ventasSeparadas = this.listaDeVentas();
      let totalVentas;
      if(ventasSeparadas.length >= 1){
         totalVentas = ventasSeparadas.reduce(function(acumulador, precio){
            return acumulador + precio;
         });
      } else {
         totalVentas = 0;
      }
      return totalVentas;
   },
   puedeComprar: function(auto, persona){
      let autoE = this.buscarAuto(auto);

      let capacidadDePagoEnCuotas = function(){
         let aPartirDe = persona.indexOf("Cuotas:") + 7;
         let hasta = persona.indexOf(", capacidadDePagoTotal:");
         let capPagoCuoStr = persona.slice(aPartirDe, hasta);
         let capPagoCuo = parseInt(capPagoCuoStr);
         return capPagoCuo;
      };

      let capacidadDePago = function(){
         let aPartirDe = persona.indexOf("Total:") + 6;
         let hasta = persona.indexOf("}");
         let capPagoStr = persona.slice(aPartirDe, hasta);
         let capPago = parseInt(capPagoStr);
         return capPago;
      };
      
      let precioCuota = autoE.precio / autoE.cuotas;
      if (autoE.precio <= capacidadDePago() && precioCuota <= capacidadDePagoEnCuotas()){
         return true;
      } else{
         return false;
      };
   },

   autosQuePuedeComprar: function(persona){
      let autos = this.autos;

      let capacidadDePagoEnCuotas = function(){
         let aPartirDe = persona.indexOf("Cuotas:") + 7;
         let hasta = persona.indexOf(", capacidadDePagoTotal:");
         let capPagoCuoStr = persona.slice(aPartirDe, hasta);
         let capPagoCuo = parseInt(capPagoCuoStr);
         return capPagoCuo;
      };

      let capacidadDePago = function(){
         let aPartirDe = persona.indexOf("Total:") + 6;
         let hasta = persona.indexOf("}");
         let capPagoStr = persona.slice(aPartirDe, hasta);
         let capPago = parseInt(capPagoStr);
         return capPago;
      };
      
      let autosAccesibles = autos.filter(function(auto){
         return auto.precio <= capacidadDePago() && (auto.precio / auto.cuotas) <= capacidadDePagoEnCuotas();
      });
      return autosAccesibles;
   }
}

console.log(concesionaria.venderAuto("APL123"));
console.log(concesionaria.autosParaLaVenta());
console.log(concesionaria.autosNuevos());
console.log(concesionaria.listaDeVentas());
console.log(concesionaria.totalDeVentas());
console.log(concesionaria.puedeComprar("JJK116", "{nombre: “Juan”, capacidadDePagoEnCuotas: 20000, capacidadDePagoTotal: 100000}"));
console.log(concesionaria.autosQuePuedeComprar("{nombre: “Juan”, capacidadDePagoEnCuotas: 20000, capacidadDePagoTotal: 100000}"));







/*const concesionaria = {
   autos: listaAutos,
   venderAuto : function(pat){
      let autos = this.autos;
      let listaCambiada = autos.map(function(){
         if(autos.patente == pat){
            return autos.vendido = false;
         }
      });
      fs.writeFileSync(this.archivo, listaCambiada);
   },
};

concesionaria.venderAuto("JJK116");

/*
autos.forEach(function(patentes, index){
   if (autos.patente.includes(patentes)){
      fs.writeFileSync(this.autos, autos[index].patente.replace(false, true));
   }
});
*/

/*
const autos = require("./autos");

const concesionaria = {
     autos: autos,
     buscarAuto: function(patente){
        let autos = this.autos;
        let autoElegido = autos.filter(function(auto){
         if(patente == auto.patente){
            console.log(auto);
         } else {
            console.log(null);
         };
        });
     },      
};

console.log(concesionaria.buscarAuto("APL123"));
*/