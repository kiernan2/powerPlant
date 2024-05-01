const storeState = () => {
  let globalState = {};
  return () => {
    const plantNum = Object.keys(globalState).length + 1;
    globalState[plantNum] = {plantNumber:plantNum};
    const allListener = (prop,value) => {
      changeState(prop,value,globalState[plantNum]);
    };
    return (stateChangeFunction = state => state) => {
      const newState = stateChangeFunction(globalState[plantNum]);
      globalState[plantNum] = {...newState};
      return newState;
    };
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

function createRandomizedPower(plant) {
  const ranNum = Math.floor(Math.random() * 3);
  if (ranNum === 1) {
    plant.powerButton.innerText = "FoodPower";
    return(
      plant.powerButton.addEventListener("click", function() {
        plant.allListener("soil")(5);
      })
    );
  }
  if (ranNum === 2) { // Code breaks on launch there seems to be an issue with code triggering out of order
    plant.powerButton.innerText = "WaterPower";
    return(
      plant.powerButton.addEventListener("click", function() {
        plant.allListener("water")(5);
      })
    );
  }
  if (ranNum === 3) {
    plant.powerButton.innerText = "BalancePower";
    return(
      plant.powerButton.addEventListener("click", function() {
        plant.allListener("soil")(1);
        plant.allListener("water")(1);
      })
    );
  }
}

const feed = changeState("soil");
const hydrate = changeState("water");
// const giveLight = changeState("light");

const createPlant = (createPlantFun) => {
  
  const plantDiv = document.createElement("div");
  const h2Element = document.createElement("h2");
  const waterText = document.createElement("p");
  const foodText = document.createElement("p");
  const foodButton = document.createElement("button");
  const waterButton = document.createElement("button");
  const powerButton = document.createElement("button");
  
  const plant = createPlantFun();
  
  foodButton.addEventListener("click", function() {
    const newState = plant(feed(1));
    foodText.innerText = `Food: ${newState.soil}`;
  });
  
  waterButton.addEventListener("click", function() {
    const newState = plant(hydrate(1));
    waterText.innerText = `Water: ${newState.water}`;
  });
  
  h2Element.innerText = plant.name;
  foodText.innerText = "Food: 0";
  foodButton.innerText = "Feed";
  waterText.innerText = "Water: 0";
  waterButton.innerText = "Water";

  createRandomizedPower(plant);
  
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
  const mainState = storeState();
  
  document.getElementById('create-plant').onclick = function() {
    createPlant(mainState); 
  };

  // document.getElementById('show-state').onclick = function() {
  //   const currentState = stateControl();
  //   document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
  //   document.getElementById('water-value').innerText = `Water: ${currentState.water}`;
  //   document.getElementById('light-value').innerText = `light: ${currentState.light}`;
  // };
};