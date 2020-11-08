// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   console.log('window - load');
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
       response.json().then(function(json) {
           let index = getRandomInt(0, json.length);
           
           let missionTarget = document.getElementById('missionTarget');
           missionTarget.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                   <li>Name: ${json[index].name}</li>
                   <li>Diameter: ${json[index].diameter}</li>
                   <li>Star: ${json[index].star}</li>
                   <li>Distance from Earth: ${json[index].distance}</li>
                   <li>Number of Moons: ${json[index].moons}</li>
               </ol>
               <img src="${json[index].image}">                        
               `;
           
       } );
   });

   let faultyItems = document.getElementById('faultyItems');
   let launchStatus = document.getElementById('launchStatus');

   formSubmit.addEventListener("click", function(event) {
       if (checkForCompleteInput() === true) {
           if (validate() === true) {
               console.log("validate - true");
               faultyItems.style.visibility = 'visible';
               launchStatus.innerHTML = 'Shuttle is ready for launch';
               launchStatus.style.color = 'green';
               faultyItems.style.visibility = 'visable';
           }
           else {
               launchStatus.innerHTML = 'Shuttle not ready for launch';
               launchStatus.style.color = 'red';
               faultyItems.style.visibility = 'visible';                  
           }
       }

       event.preventDefault(); 
   } );
} );

function checkForCompleteInput() {
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");

   if (pilotName.value === '') {
       alert("Enter Pilot Name");
       return false;
   }

   if (!isNaN(pilotName.value)) {
       alert("Enter text for Pilot Name");
       return false;
   }

   if (copilotName.value === '') {
       alert("Enter Co-pilot Name");
       return false;                  
   }

   if (!isNaN(copilotName.value)) {
       alert("Enter text for Co-Pilot Name");
       return false;
   }

   if (fuelLevel.value === '') {
       alert("Enter Fuel Level (L)");
       return false;
   }

   if (isNaN(fuelLevel.value)) {
       alert('Fuel Level value must be numeric');
       return false;
   }

   if (cargoMass.value === '') {
       alert("Enter Cargo Mass (kg)");
       return false;
   }

   if (isNaN(cargoMass.value)) {
       alert("Cargo Mass value must be numeric");
       return false;
   }

   return true;
}

function validate(){
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");

   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');

   pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
   copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;

   if (Number(fuelLevel.value) < 10000) {
       fuelStatus.innerHTML = 'Fuel level is too low for launch';
       return false;
   }
   else {
       fuelStatus.innerHTML = 'Fuel level high enough for launch';               
   }

   if (Number(cargoMass.value) > 10000){
       cargoStatus.innerHTML = 'Cargo mass cannot be more than 10,000 kilograms';
       return false;
   }
   else {
       cargoStatus.innerHTML = 'Cargo mass low enough for launch';              
   }

   return true;
}

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}