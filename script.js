const PASSWORD = "akai";

const dialogues = [
  "……来たの？",
  "もっと触れて……♡",
  "あなたの反応、好き。",
  "もっと親密になりたい？",
  "……ふふ。",
  "まだまだ足りないね。"
];

const characters = [
  {
    name: "榊 あぐり",
    image: "あぐり仮.png"
  },
  {
    name: "雛菜",
    image: "hinana.png"
  },
  {
    name: "霧子",
    image: "kiriko.png"
  }
];

const cards = [
  {
    name: "SSR 榊 あぐり",
    image: "あぐり仮.png"
  },
  {
    name: "SSR 雛菜",
    image: "hinana.png"
  },
  {
    name: "SSR 霧子",
    image: "kiriko.png"
  }
];

let hearts = Number(localStorage.getItem("hearts")) || 0;
let loveLevel = Number(localStorage.getItem("loveLevel")) || 1;
let collection = JSON.parse(localStorage.getItem("collection")) || [];
let currentCharacter = 0;

const character = document.getElementById("character");
const dialogue = document.getElementById("dialogue");
const heartCount = document.getElementById("heart-count");
const effectContainer = document.getElementById("effect-container");
const cardList = document.getElementById("card-list");

function updateUI(){

  heartCount.textContent = hearts;

  document.getElementById("character-name").textContent =
    characters[currentCharacter].name;

  document.getElementById("love-level").textContent =
    `好感度 Lv${loveLevel}`;

  renderCollection();

  localStorage.setItem("hearts", hearts);
  localStorage.setItem("loveLevel", loveLevel);
  localStorage.setItem("collection", JSON.stringify(collection));
}

function randomDialogue(){
  const line =
    dialogues[Math.floor(Math.random() * dialogues.length)];

  dialogue.textContent = line;
}

function createHeartEffect(x,y){

  const effect = document.createElement("div");

  effect.className = "plus-heart";
  effect.textContent = "+1♡";

  effect.style.left = x + "px";
  effect.style.top = y + "px";

  effectContainer.appendChild(effect);

  setTimeout(()=>{
    effect.remove();
  },1000);
}

character.addEventListener("click",(e)=>{

  hearts += 1;

  randomDialogue();

  updateUI();

  createHeartEffect(e.pageX - 20, e.pageY - 20);
});

function renderCollection(){

  cardList.innerHTML = "";

  if(collection.length === 0){
    cardList.innerHTML = "<p>まだカードがありません。</p>";
    return;
  }

  collection.forEach(card=>{

    const div = document.createElement("div");

    div.className = "card";

    div.innerHTML = `
      <img src="${card.image}">
      <div class="card-name">${card.name}</div>
    `;

    cardList.appendChild(div);
  });
}

document.getElementById("gacha-btn")
.addEventListener("click",()=>{

  if(hearts < 100){
    alert("♡不足");
    return;
  }

  hearts -= 100;

  updateUI();

  const overlay =
    document.getElementById("gacha-overlay");

  overlay.classList.remove("hidden");

  const result =
    document.getElementById("gacha-result");

  result.innerHTML = "";

  setTimeout(()=>{

    const card =
      cards[Math.floor(Math.random() * cards.length)];

    collection.push(card);

    updateUI();

    result.innerHTML = `
      <h2>GET!!</h2>
      <img src="${card.image}">
      <p>${card.name}</p>
    `;

  },1800);

});

document.getElementById("close-gacha")
.addEventListener("click",()=>{

  document.getElementById("gacha-overlay")
  .classList.add("hidden");

});

document.getElementById("gallery-btn")
.addEventListener("click",()=>{

  document.getElementById("gallery-section")
  .classList.toggle("hidden");

});

document.getElementById("change-btn")
.addEventListener("click",()=>{

  currentCharacter++;

  if(currentCharacter >= characters.length){
    currentCharacter = 0;
  }

  character.src =
    characters[currentCharacter].image;

  updateUI();

});

function getLoveCost(){
  return 100 + (loveLevel * 40);
}

document.getElementById("bond-btn")
.addEventListener("click",()=>{

  if(loveLevel >= 30){
    alert("好感度MAX");
    return;
  }

  const cost = getLoveCost();

  const ok = confirm(
    `♡${cost}を消費して好感度を上げますか？`
  );

  if(!ok) return;

  if(hearts < cost){
    alert("♡不足");
    return;
  }

  hearts -= cost;

  loveLevel++;

  updateUI();

});

document.getElementById("login-btn")
.addEventListener("click",()=>{

  const input =
    document.getElementById("password-input").value;

  if(input === PASSWORD){

    document.getElementById("password-screen")
    .classList.add("hidden");

    document.getElementById("game")
    .classList.remove("hidden");

  }else{

    document.getElementById("password-error")
    .textContent = "パスワードが違います";

  }

});

updateUI();
