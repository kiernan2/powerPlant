const storeState = () => {
  let globalState = {};
  return () => {
    const plantNum = Object.keys(globalState).length + 1;
    globalState[plantNum] = {plantNumber:plantNum};
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
  
  plantDiv.appendChild(h2Element);
  plantDiv.appendChild(waterText);
  plantDiv.appendChild(foodText);
  plantDiv.appendChild(foodButton);
  plantDiv.appendChild(waterButton);
  
  document.getElementById("plant").appendChild(plantDiv);
};

window.onload = function() {
  
  // The following line has to do with the apps global state
  const mainState = storeState();
  
  document.getElementById('create-plant').onclick = function() {
    createPlant(mainState); //Read 1227 and 1309 to better understand adding things to the HTML or Dom
  };

  // document.getElementById('show-state').onclick = function() {
  //   const currentState = stateControl();
  //   document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
  //   document.getElementById('water-value').innerText = `Water: ${currentState.water}`;
  //   document.getElementById('light-value').innerText = `light: ${currentState.light}`;
  // };
};