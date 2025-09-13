const textInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const creatureName = document.querySelector("#creature-name");
const creatureId = document.querySelector("#creature-id");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const types = document.querySelector("#types");
const hp = document.querySelector("#hp");
const attack = document.querySelector("#attack");
const defense = document.querySelector("#defense");
const specialAttack = document.querySelector("#special-attack");
const specialDefense = document.querySelector("#special-defense");
const speed = document.querySelector("#speed");

function getStatValue(stats, statName) {
  const result = stats.find(stat => stat.name === statName);
  
  return result ? result.base_stat : "N/A";
}

async function showCreature() {
  const cleanedInput = textInput.value.trim().toLowerCase();
  
  try {
    const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${cleanedInput}`);
    
    if (!response.ok || cleanedInput === "red") {
      alert("Creature not found");
      return;
    }

    const data = await response.json();

    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = data.id;
    weight.textContent = data.weight;
    height.textContent = data.height;
    
    hp.textContent = getStatValue(data.stats, "hp");
    attack.textContent = getStatValue(data.stats, "attack");
    defense.textContent = getStatValue(data.stats, "defense");
    specialAttack.textContent = getStatValue(data.stats, "special-attack");
    specialDefense.textContent = getStatValue(data.stats, "special-defense");
    speed.textContent = getStatValue(data.stats, "speed");

    types.innerHTML = "";
    data.types.forEach((type, index) => {
      const span = document.createElement("span");
      
      span.textContent = type.name.toUpperCase();
      types.appendChild(span);

      if (index < data.types.length - 1) {
        types.appendChild(document.createTextNode(", "));
      }
    });
  } catch(error) {
    console.log(error);
  }
}

searchBtn.addEventListener("click", showCreature);
