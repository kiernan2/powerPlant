const storeState = () => {
  let globalState = {};
  return (globalChange) => {
    const plantNum = Object.keys(globalState).length;
    globalState[plantNum] = {plantNumber:plantNum};
    const newState = (globalState[plantNum]);
    globalState[plantNum] = {...newState};
    if (globalChange === true) {
      return (prop,value) => {
        const changeValues = Object.keys(globalState).map((plant) => ({...globalState[plant], [prop]: (globalState[plant][prop] || 0) + value}));
        const changedGlobalState = {...changeValues};
        globalState = changedGlobalState;
        return globalState;
      };
    }
    else {
      // const plantNum = Object.keys(globalState).length;
      // globalState[plantNum] = {plantNumber:plantNum};
      // const newState = (globalState[plantNum]);
      // globalState[plantNum] = {...newState};
      return globalState;
    }
  };
};

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value,
    });
  };
};

// function createRandomizedPower(plant,powerButton) {
//   const ranNum = Math.floor(Math.random() * 3);
//   if (ranNum === 1) {
//     return(
//     powerButton.innerText = "FoodPower";
//       powerButton.addEventListener("click", function() {
//         allListener("soil")(5);
//       })
//     );
//   }
//   else if (ranNum === 2) { // Code breaks on launch there seems to be an issue with code triggering out of order
//     powerButton.innerText = "WaterPower";
//     return(
//       powerButton.addEventListener("click", function() {
//         allListener("water")(5);
//       })
//     );
//   }
//   else if (ranNum === 3) {
//     powerButton.innerText = "BalancePower";
//     return(
//       powerButton.addEventListener("click", function() {
//         allListener("soil")(1);
//         allListener("water")(1);
//       })
//     );
//   }
// }

const feed = changeState("soil");
const hydrate = changeState("water");
// const giveLight = changeState("light");

const createPlant = () => {

  let state = storeState(true);
  
  const plantDiv = document.createElement("div");
  const h2Element = document.createElement("h2");
  const waterText = document.createElement("p");
  waterText.id = "water";
  const foodText = document.createElement("p");
  foodText.id = "food";
  const foodButton = document.createElement("button");
  const waterButton = document.createElement("button");
  const powerButton = document.createElement("button");
  
  // const plant = createPlantOrGlobalChange(false);
  
  // const updateAllPlants = createPlantOrGlobalChange(true);
  
  powerButton.innerText = "FoodPower";
  
  // const 
  // const

  // plantDiv.id = plant[plantNum];

  powerButton.addEventListener("click", function() {
    // const updatedGlobalState = updateAllPlants("soil",3);
    // console.log(updatedGlobalState);
    // Added ID to every plant div
    // Grab and replace all the div info appropriately  // Further complications I need to figure out how to get globalState plantNum Down here
    // Remember to reset the display
  });

  foodButton.addEventListener("click", function() {
    const newState = changeState("soil")(1)(this);
    foodText.innerText = `Food: ${newState.soil}`;
  });
  
  waterButton.addEventListener("click", function() {
    const newState = changeState("water")(1)(this);
    waterText.innerText = `Water: ${newState.water}`;
  });
  
  // h2Element.innerText = plant.name;
  foodText.innerText = "Food: 0";
  foodButton.innerText = "Feed";
  waterText.innerText = "Water: 0";
  waterButton.innerText = "Water";

  plantDiv.appendChild(h2Element);
  plantDiv.appendChild(waterText);
  plantDiv.appendChild(foodText);
  plantDiv.appendChild(foodButton);
  plantDiv.appendChild(waterButton);
  plantDiv.appendChild(powerButton);

  document.getElementById("plant").appendChild(plantDiv);
};

window.onload = function() {
  
  // The following line has to do with the apps global state
  // const mainState = storeState();
  
  document.getElementById('create-plant').onclick = function() {
    createPlant(); 
  };

  // document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
  // document.getElementById('water-value').innerText = `Water: ${currentState.water}`;
  // document.getElementById('light-value').innerText = `light: ${currentState.light}`;
};