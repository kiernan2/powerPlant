const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

const stateControl = storeState(); // The example program adds this but I'm not sure there's an actual purpose

// const createState = (name) => {  // The entire function is weird and I'm not sure it was necessary in the first place
//   let plant = {name: "", health:{soil: 0, light: 0, water: 0} }; // I need to create a new separate Plant I think I need to re-examine how I do this
//   let newPlantDiv = document.getElementById("plants").innerHTML.createElement("div");
//   newPlantDiv.id = name;
//   newPlantDiv.append(); //Read 1227 and 1309 to better understand adding things to the HTML or Dom
//   return plant; 
// };

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);
const greenFood = changeState("soil")(10);
const yuckyFood = changeState("soil")(-5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

const giveLight = changeState("light")(1);

// Something might be wrong with the following two lines I'm not sure I have a starter plant so much set of undefined values
const starterPlant = storeState;
const plantStart = changeState(starterPlant)({Name: "starterPlant", health:{soil: 0, light: 0, water: 0}} );

// const startFood = stateControl("feed")(1);
// const startWater = stateControl("hydrate")(1);  // I don't know why but these three lines break everything for some reason
// const startLight = stateControl("giveLight")(1);

window.onload = function() {

  document.getElementById('feedBlue').onclick = function() {
    const newState = stateControl(blueFood);
    document.getElementById('soil-value').innerText = `Soil: ${newState.soil}`;
  };

  document.getElementById('feedGreen').onclick = function() {
    const newState = stateControl(greenFood);
    document.getElementById('soil-value').innerText = `Soil: ${newState.soil}`;
  };

  document.getElementById('hydrate').onclick = function() {
    const newState = stateControl(hydrate);
    document.getElementById('water-value').innerText = `Water: ${newState.water}`;
  };

  document.getElementById('superWater').onclick = function() {
    const newState = stateControl(superWater);
    document.getElementById('water-value').innerText = `Water: ${newState.water}`;
  };

  document.getElementById('giveLight').onclick = function() {
    const newState = stateControl(giveLight);
    document.getElementById('light-value').innerText = `Light: ${newState.light}`;
  };

  // document.getElementById('createState').onclick = function() {
  //   const newState = createState('testName');
  //   document.getElementById('testName').innerText = `Name: ${newState.name}`; //The associated on click function for a function that's currently not working
  // };

  document.getElementById('show-state').onclick = function() {
    const currentState = stateControl();
    document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
    document.getElementById('water-value').innerText = `Water: ${currentState.water}`;
    document.getElementById('light-value').innerText = `light: ${currentState.light}`;
  };
};


