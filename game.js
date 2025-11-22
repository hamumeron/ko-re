// ====== ゲームデータ ======
const phrases = [
  { cipher: "み_と", answer: "みなと", hint: "最初の名前" },
  { cipher: "おたん_ょうび", answer: "おたんじょうび", hint: "お祝いの時に言うやつ" },
  { cipher: "おめ_とう", answer: "おめでとう", hint: "仕上げのことば" }
];

let enemyHp = 50;
let playerHp = 50;

// ====== 初期化 ======
window.onload = () => {
  loadState();
  renderPuzzles();
  updateHP();

  document.getElementById("reset-btn").onclick = resetGame;
};

// ====== パズル描画 ======
function renderPuzzles() {
  const area = document.getElementById("puzzles");
  area.innerHTML = "";

  phrases.forEach((p, i) => {
    const solved = localStorage.getItem("puzzle_" + i) === "true";

    const div = document.createElement("div");
    div.className = "puzzle";

    div.innerHTML = `
      <h2>暗号 ${i + 1}</h2>
      <p class="cipher">${p.cipher}</p>
      ${solved ? `<p class="solved">✔ ${p.answer}</p>` : `
      <input id="ans${i}" placeholder="答えを入力">
      <button onclick="checkAnswer(${i})">決定</button>
      <button onclick="alert('${p.hint}')">ヒント</button>
      `}
    `;

    area.appendChild(div);
  });
}

// ====== 解答チェック ======
function checkAnswer(i) {
  const input = document.getElementById("ans" + i).value.trim();

  if (input === phrases[i].answer) {
    localStorage.setItem("puzzle_" + i, "true");
    attackEnemy();
    renderPuzzles();
  } else {
    enemyAttack();
  }
}

// ====== ダメージ処理 ======
function attackEnemy() {
  const dmg = Math.floor(Math.random() * 10) + 5;
  enemyHp -= dmg;
  if (enemyHp < 0) enemyHp = 0;
  saveState();
  updateHP();
  alert("正解！\n敵に " + dmg + " ダメージ！");
}

function enemyAttack() {
  const dmg = Math.floor(Math.random() * 8) + 3;
  playerHp -= dmg;
  if (playerHp < 0) playerHp = 0;
  saveState();
  updateHP();
  alert("不正解… 敵の反撃！\nあなたは " + dmg + " ダメージ！");
}

// ====== HP更新 ======
function updateHP() {
  document.getElementById("enemy-hp").textContent = enemyHp;
  document.getElementById("player-hp").textContent = playerHp;

  if (enemyHp === 0) alert("勝利！すべての暗号が解けました！");
  if (playerHp === 0) alert("負けました… 再挑戦してください");
}

// ====== セーブ ======
function saveState() {
  localStorage.setItem("enemyHp", enemyHp);
  localStorage.setItem("playerHp", playerHp);
}

// ====== ロード ======
function loadState() {
  enemyHp = Number(localStorage.getItem("enemyHp")) || 50;
  playerHp = Number(localStorage.getItem("playerHp")) || 50;
}

// ====== リセット ======
function resetGame() {
  localStorage.clear();
  enemyHp = 50;
  playerHp = 50;
  renderPuzzles();
  updateHP();
}
