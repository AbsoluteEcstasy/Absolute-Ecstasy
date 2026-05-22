const PASSWORD = "a";

const dialogues = [
  "榊あぐり。研究者よ",
  "見ない顔ね",
  "その調子で親密度を上げて",
  "タップ、好きなの？",
  "あなたも暇なのね",
  "データが足りないわ",
  "あら、まだいたの？",
  "実験開始よ"
];

const characters = [
  {
    name: "榊 あぐり",
    image: "あぐり仮.png"
  },

  {
    name: "巫 ねがい",
    image: "kiriko.png"
  },

  {
    name: "柊 めざめ",
    image: "hinana.png"
  }
];
let currentCharacter = 0;
document.getElementById("change-btn")
.addEventListener("click", () => {

  currentCharacter++;

  if(currentCharacter >= characters.length){
    currentCharacter = 0;
  }

  character.src =
    characters[currentCharacter].image;

  document.getElementById("character-name")
    .textContent =
    characters[currentCharacter].name;
});

const cards = [
  {
    name: "Crimson Idol",
    image: "https://picsum.photos/400/600?random=11"
  },
  {
    name: "Night Princess",
    image: "https://picsum.photos/400/600?random=12"
  },
  {
    name: "Scarlet Nurse",
    image: "https://picsum.photos/400/600?random=13"
  },
  {
    name: "Dark Bunny",
    image: "https://picsum.photos/400/600?random=14"
  },
  {
    name: "Bloody Queen",
    image: "https://picsum.photos/400/600?random=15"
  }
];

let hearts = Number(localStorage.getItem("hearts")) || 0;
let collection = JSON.parse(localStorage.getItem("collection")) || [];

const heartCount = document.getElementById("heart-count");
const character = document.getElementById("character");
const dialogue = document.getElementById("dialogue");
const effectContainer = document.getElementById("effect-container");
const cardList = document.getElementById("card-list");

function updateUI() {
  heartCount.textContent = hearts;
  renderCollection();

  localStorage.setItem("hearts", hearts);
  localStorage.setItem("collection", JSON.stringify(collection));
}

function randomDialogue() {
  const line = dialogues[Math.floor(Math.random() * dialogues.length)];
  dialogue.textContent = line;
}

function createHeartEffect(x, y) {
  const effect = document.createElement("div");
  effect.className = "plus-heart";
  effect.textContent = "+1♡";
  effect.style.left = x + "px";
  effect.style.top = y + "px";

  effectContainer.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 1000);
}

character.addEventListener("click", (e) => {
  hearts += 1;
  randomDialogue();
  updateUI();

  createHeartEffect(e.pageX - 20, e.pageY - 20);
});

function renderCollection() {
  cardList.innerHTML = "";

  if (collection.length === 0) {
    cardList.innerHTML = "<p>まだカードがありません。</p>";
    return;
  }

  collection.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${card.image}">
      <div class="card-name">${card.name}</div>
    `;

    cardList.appendChild(div);
  });
}

const gachaBtn = document.getElementById("gacha-btn");
const gachaOverlay = document.getElementById("gacha-overlay");
const gachaResult = document.getElementById("gacha-result");

gachaBtn.addEventListener("click", () => {
  if (hearts < 100) {
    alert("♡が足りません！");
    return;
  }

  hearts -= 100;
  updateUI();

  gachaOverlay.classList.remove("hidden");
  gachaResult.innerHTML = "";

  setTimeout(() => {
    const card = cards[Math.floor(Math.random() * cards.length)];

    collection.push(card);
    updateUI();

    gachaResult.innerHTML = `
      <h2>GET!!</h2>
      <img src="${card.image}">
      <p>${card.name}</p>
    `;
  }, 1800);
});

document.getElementById("close-gacha").addEventListener("click", () => {
  gachaOverlay.classList.add("hidden");
});

document.getElementById("login-btn").addEventListener("click", () => {
  const input = document.getElementById("password-input").value;
  const error = document.getElementById("password-error");

  if (input === PASSWORD) {
    document.getElementById("password-screen").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
  } else {
    error.textContent = "パスワードが違います";
  }
});

updateUI();

let loveLevel =
  Number(localStorage.getItem("loveLevel"))
  || 1;
  function getLoveCost(){

  return 100 + (loveLevel * 40);

}
document.getElementById("bond-btn")
.addEventListener("click", () => {

  if(loveLevel >= 30){
    alert("好感度MAX");
    return;
  }

  const cost = getLoveCost();

  const ok = confirm(
    `♡${cost}を消費して
好感度を上げますか？`
  );

  if(!ok) return;

  if(hearts < cost){
    alert("♡不足");
    return;
  }

  hearts -= cost;

  loveLevel++;

  localStorage.setItem(
    "loveLevel",
    loveLevel
  );

  updateUI();
});
document.getElementById("love-level")
.textContent =
`好感度 Lv${loveLevel}`;