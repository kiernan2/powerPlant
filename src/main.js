const storeState = () => {
  let globalState = {};
  return (globalChange) => {
    if (globalChange === true) {
      return (prop,value) => {
        const changeValues = Object.keys(globalState).map((plant) => ({...globalState[plant], [prop]: (globalState[plant][prop] || 0) + value}));
        const changedGlobalState = {...changeValues};
        globalState = changedGlobalState;
        console.log(globalState);
        return globalState;
      };
    } else {
      const plantNum = Object.keys(globalState).length;
      globalState[plantNum] = {plantNumber:plantNum};
      const newGlobalState = {...globalState};
      globalState = newGlobalState;
      return (stateChangeFunction = state => state) => {
        const newState = stateChangeFunction(globalState[plantNum]);
        globalState[plantNum] = {...newState};
        return newState;
      };
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
//   else if (ranNum === 2) {
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

const createPlant = (createPlantOrGlobalChange) => {
  
  const plantDiv = document.createElement("div");
  const h2Element = document.createElement("h2");
  const waterText = document.createElement("p");
  const foodText = document.createElement("p");
  const foodButton = document.createElement("button");
  const waterButton = document.createElement("button");
  const powerButton = document.createElement("button");
  
  const plant = createPlantOrGlobalChange(false);
  
  const updateAllPlants = createPlantOrGlobalChange(true);
  
  powerButton.innerText = "FoodPower";
  
  const thisPlant = plant();
    
  foodText.classList.add("foodText");
  waterText.classList.add("waterText");

  foodText.value = thisPlant.plantNumber;
  waterText.value = thisPlant.plantNumber;
  
  powerButton.addEventListener("click", function() {
    const updatedGlobalState = updateAllPlants("soil",3);
    document.querySelectorAll(".foodText").forEach( (element) => {
      element.innerText = `Food: ${updatedGlobalState[element.value].soil}`;
    });
  });

  foodButton.addEventListener("click", function() {
    const newState = plant(feed(1));
    foodText.innerText = `Food: ${newState.soil}`;
  });
  
  waterButton.addEventListener("click", function() {
    const newState = plant(hydrate(1));
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
  
  const mainState = storeState();
  
  console.log(mainState(true));

  document.getElementById('create-plant').onclick = function() {
    createPlant(mainState); 
  };
};