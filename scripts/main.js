import OVADie from "./ova-die.js"

Hooks.once("init", function () { 
   console.log("OVA | Initializing OVA System");
   console.log('-------------------------------------------------------------------------------');
   CONFIG.Dice.types = [OVADie]
   CONFIG.Dice.terms['d'] = OVADie;

})
