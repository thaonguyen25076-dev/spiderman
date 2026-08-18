/* =====================================================
   SPIDER LOVE WORLD
   JS chia theo chức năng để dễ sửa
   ===================================================== */

// =====================================================
// 01. CẤU HÌNH - CHỈNH Ở ĐÂY
// =====================================================

const CONFIG = {
  heartInterval: 550,
  maxHearts: 35,
  clickHeartAmount: 3,
  musicVolume: 0.35
};

// =====================================================
// 02. ELEMENTS
// =====================================================

const hearts = document.getElementById("hearts");
const heartCountEl = document.getElementById("heartCount");
const enterBtn = document.getElementById("enterBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let heartCount = 0;
let musicPlaying = false;

// =====================================================
// 03. FLOATING HEARTS
// =====================================================

function createHeart(x = Math.random() * window.innerWidth) {
  if (document.querySelectorAll(".float-heart").length >= CONFIG.maxHearts) return;

  const heart = document.createElement("div");
  heart.className = "float-heart";
  heart.textContent = Math.random() > 0.25 ? "♥" : "❤";

  heart.style.left = `${x}px`;
  heart.style.bottom = `${-30 - Math.random() * 80}px`;
  heart.style.fontSize = `${12 + Math.random() * 22}px`;
  heart.style.color = Math.random() > 0.5 ? "#ff4d88" : "#ff79bc";
  heart.style.animationDuration = `${4 + Math.random() * 5}s`;

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(() => createHeart(), CONFIG.heartInterval);

// =====================================================
// 04. CLICK = HEART EFFECT
// =====================================================

document.addEventListener("click", (event) => {
  if (
    event.target.closest("button") ||
    event.target.closest(".modal")
  ) {
    return;
  }

  for (let i = 0; i < CONFIG.clickHeartAmount; i++) {
    const heart = document.createElement("div");
    heart.className = "float-heart";
    heart.textContent = "♥";
    heart.style.left = `${event.clientX + (Math.random() * 50 - 25)}px`;
    heart.style.top = `${event.clientY}px`;
    heart.style.bottom = "auto";
    heart.style.fontSize = `${12 + Math.random() * 14}px`;
    heart.style.animationDuration = "2s";

    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 2200);
  }

  heartCount++;
  heartCountEl.textContent = heartCount;
});

// =====================================================
// 05. ENTER WORLD
// =====================================================

enterBtn.addEventListener("click", () => {
  document.getElementById("world").scrollIntoView({
    behavior: "smooth"
  });

  createBurst(window.innerWidth / 2, window.innerHeight / 2);
});

// =====================================================
// 06. SCROLL BUTTONS
// =====================================================

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// =====================================================
// 07. MODAL
// =====================================================

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const modalContents = {
  letter: document.getElementById("modalLetter"),
  gift: document.getElementById("modalGift"),
  photos: document.getElementById("modalPhotos")
};

function openModal(type) {
  modal.classList.remove("hidden");

  Object.values(modalContents).forEach((content) => {
    content.style.display = "none";
  });

  modalContents[type].style.display = "block";
}

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.modal);
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.add("hidden");
  }
});

// =====================================================
// 08. GIFT
// =====================================================

document.getElementById("giftBtn").addEventListener("click", () => {
  createMassiveHeartBurst();

  setTimeout(() => {
    alert("🎁 chưa có đâu tuất❤️");
  }, 400);
});

function createMassiveHeartBurst() {
  for (let i = 0; i < 35; i++) {
    setTimeout(() => {
      createHeart(Math.random() * window.innerWidth);
    }, i * 45);
  }
}

// =====================================================
// 09. MUSIC
// =====================================================

bgMusic.volume = CONFIG.musicVolume;

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await bgMusic.play();
      musicPlaying = true;
      musicBtn.textContent = "♫ MUSIC ON";
    } else {
      bgMusic.pause();
      musicPlaying = false;
      musicBtn.textContent = "♫ PLAY MUSIC";
    }
  } catch (error) {
    musicBtn.textContent = "♫ ADD music.mp3";
    console.log("Đặt file nhạc tại assets/music.mp3");
  }
});

// =====================================================
// 10. BURST EFFECT
// =====================================================

function createBurst(x, y) {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");

    heart.className = "float-heart";
    heart.textContent = "♥";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.bottom = "auto";
    heart.style.animationDuration = "2s";
    heart.style.fontSize = `${15 + Math.random() * 20}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 250;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 1
        },
        {
          transform:
            `translate(
              ${Math.cos(angle) * distance - 50}%,
              ${Math.sin(angle) * distance - 50}%
            ) scale(1.4)`,
          opacity: 0
        }
      ],
      {
        duration: 1300 + Math.random() * 700,
        easing: "ease-out"
      }
    );

    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 2200);
  }
}

// =====================================================
// 11. SECRET EASTER EGG
// Gõ "love" để mở hiệu ứng đặc biệt
// =====================================================

let typed = "";

document.addEventListener("keydown", (event) => {
  if (event.key.length !== 1) return;

  typed += event.key.toLowerCase();
  typed = typed.slice(-4);

  if (typed === "love") {
    createMassiveHeartBurst();

    document.querySelector(".hero-title small").textContent =
      "♥ I LOVE YOU MORE THAN EVERY UNIVERSE ♥";
  }
});

// =====================================================
// 12. LOVE WORLD ARCADE
// =====================================================
const gameState = { points: 0, wins: new Set(), selectedBlock: "🧱", built: 0 };
const lovePointsEl = document.getElementById("lovePoints");
const gameWinsEl = document.getElementById("gameWins");
const gameUnlockEl = document.getElementById("gameUnlock");

function addGameReward(game, points, message) {
  if (gameState.wins.has(game)) return false;
  gameState.wins.add(game);
  gameState.points += points;
  lovePointsEl.textContent = gameState.points;
  gameWinsEl.textContent = gameState.wins.size;
  createBurst(window.innerWidth / 2, window.innerHeight / 2);
  if (message) alert(message);
  if (gameState.wins.size >= 4) {
    gameUnlockEl.classList.remove("locked");
    gameUnlockEl.classList.add("unlocked");
    gameUnlockEl.innerHTML = "🔓 <strong>SECRET READY!</strong> Bạn đã hoàn thành 4 thử thách — hai khung bí ẩn phía dưới vẫn giữ nguyên 👀❤️";
  }
  return true;
}

// --- Spider Hunt ---
const hiddenSpider = document.getElementById("hiddenSpider");
const spiderArena = document.getElementById("spiderArena");
const spiderStatus = document.getElementById("spiderStatus");
const newSpider = document.getElementById("newSpider");
function placeSpider() {
  hiddenSpider.style.left = `${8 + Math.random() * 78}%`;
  hiddenSpider.style.top = `${25 + Math.random() * 55}%`;
  hiddenSpider.style.display = "block";
  spiderStatus.textContent = "Spider-Man đang trốn... tìm kỹ nhé 👀";
}
placeSpider();
hiddenSpider.addEventListener("click", (e) => {
  e.stopPropagation();
  hiddenSpider.style.display = "none";
  spiderStatus.textContent = "🕷 Bắt được rồi! +50 LOVE POINTS";
  addGameReward("spider", 50, "🕷 Spider-Man: Bắt được anh rồi ❤️");
});
newSpider.addEventListener("click", () => { placeSpider(); });

// --- Cat Hunt ---
const catTypes = ["orange-small", "orange-big", "white-big", "orange-small-2"];
const catLabels = {"orange-small":"🐈 MÈO CAM NHỎ","orange-big":"🐈 MÈO CAM LỚN","white-big":"🐈🤍 MÈO CAM-TRẮNG LỚN","orange-small-2":"🐈 MÈO CAM NHỎ"};
let catTarget = "orange-small";
const catTargetEl = document.getElementById("catTarget");
const catStatus = document.getElementById("catStatus");
function randomCatTarget() {
  catTarget = catTypes[Math.floor(Math.random() * catTypes.length)];
  catTargetEl.textContent = `TÌM: ${catLabels[catTarget]}`;
  catStatus.textContent = "Bắt đúng con được yêu cầu!";
}
randomCatTarget();
document.querySelectorAll(".hunt-cat").forEach(cat => {
  cat.addEventListener("click", (e) => {
    e.stopPropagation();
    if (cat.dataset.cat === catTarget) {
      catStatus.textContent = "🐾 Chính xác! +50 LOVE POINTS";
      addGameReward("cat", 50, "🐈 Meow! Bạn tìm đúng rồi ❤️");
      randomCatTarget();
    } else {
      catStatus.textContent = "❌ Sai mèo rồi =))) tìm lại đi!";
      cat.animate([{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"translateX(0)"}],{duration:180});
    }
  });
});
document.getElementById("newCat").addEventListener("click", randomCatTarget);

// --- Couple Quiz ---
const quizQuestions = [
  {q:"Buổi hẹn lý tưởng là?", opts:["🏫 Đi dạo Bách Khoa","🎬 Xem phim cùng nhau","🌙 Đi lang thang ban đêm"]},
  {q:"Nếu có một ngày nghỉ, chọn gì?", opts:["🍜 Đi ăn","🎮 Chơi game","📸 Đi chụp ảnh"]},
  {q:"Món quà dễ làm người ấy vui nhất?", opts:["💌 Một lá thư","🎁 Quà bất ngờ","🐈 Một bé mèo"]}
];
let quizIndex = 0;
function renderQuiz() {
  const q = quizQuestions[quizIndex % quizQuestions.length];
  document.getElementById("quizQuestion").textContent = q.q;
  document.querySelectorAll(".quiz-option").forEach((btn,i) => { btn.textContent = q.opts[i]; btn.classList.remove("correct","wrong"); });
}
document.querySelectorAll(".quiz-option").forEach((btn,i) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".quiz-option").forEach(b => b.classList.remove("correct","wrong"));
    btn.classList.add("correct");
    const status = document.getElementById("quizStatus");
    status.textContent = "💗 Câu trả lời được ghi nhớ! +50 LOVE POINTS";
    addGameReward("quiz", 50, "💗 Câu trả lời này sẽ được lưu trong vũ trụ Love World =)))");
    quizIndex++;
    setTimeout(renderQuiz, 600);
  });
});

// --- Build Love House ---
const buildGrid = document.getElementById("buildGrid");
for (let i=0;i<21;i++) {
  const cell=document.createElement("button");
  cell.className="build-cell";
  cell.type="button";
  cell.dataset.index=i;
  cell.addEventListener("click", (e)=>{
    e.stopPropagation();
    if (cell.textContent) return;
    cell.textContent=gameState.selectedBlock;
    gameState.built++;
    document.getElementById("buildStatus").textContent = `🏠 Đã xây ${gameState.built}/8 block`;
    if (gameState.built >= 8) {
      document.getElementById("buildStatus").textContent = "🏠 LOVE HOUSE hoàn thành! +50 LOVE POINTS ❤️";
      addGameReward("build", 50, "🏠 Xây xong nhà rồi! Hai người có chỗ ở chung trong Love World ❤️");
    }
  });
  buildGrid.appendChild(cell);
}
document.querySelectorAll(".block-btn").forEach(btn=>{
  btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    document.querySelectorAll(".block-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    gameState.selectedBlock=btn.dataset.block;
  });
});
document.querySelector('.block-btn[data-block="🧱"]').classList.add("active");


// =====================================================
// 12. LOVE LETTER - FIREBASE REALTIME SHARED ROOM
// =====================================================
// DÁN Firebase Web App config của bạn vào đây.
// Nếu chưa cấu hình, trang vẫn chạy bình thường nhưng thư sẽ chưa đồng bộ giữa 2 máy.
const firebaseConfig = {
  apiKey: "AIzaSyCCvizKn0Wve1ZTji8UBR9FpMT6Kec1P84",
  authDomain: "spiderman-love-world.firebaseapp.com",
  databaseURL: "https://spiderman-love-world-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spiderman-love-world",
  storageBucket: "spiderman-love-world.firebasestorage.app",
  messagingSenderId: "378400993962",
  appId: "1:378400993962:web:d3f75d09e697f1495dd6d3",
  measurementId: "G-MW4V7FZL6Y"
};
const roomIdInput = document.getElementById("roomIdInput");
const loadRoomBtn = document.getElementById("loadRoomBtn");
const letterName = document.getElementById("letterName");
const letterText = document.getElementById("letterText");
const saveLetterBtn = document.getElementById("saveLetterBtn");
const letterList = document.getElementById("letterList");
const letterCount = document.getElementById("letterCount");
const letterSaveStatus = document.getElementById("letterSaveStatus");

let currentRoomId = "";
let letterRef = null;
let firebaseReady = false;

function safeRoomId(value) {
  return (value || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").slice(0, 24);
}

function setLetterStatus(message, error = false) {
  if (!letterSaveStatus) return;
  letterSaveStatus.textContent = message;
  letterSaveStatus.classList.toggle("error", error);
}

function firebaseConfigured() {
  return firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("spiderman-love-world") &&
    firebaseConfig.databaseURL && !firebaseConfig.databaseURL.includes("spiderman-love-world");
}

function initLetterFirebase() {
  if (!firebaseConfigured()) {
    setLetterStatus("Chưa cấu hình Firebase — thư chỉ lưu tạm trên máy này.", true);
    return;
  }

  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const params = new URLSearchParams(window.location.search);
    const urlRoom = safeRoomId(params.get("room"));
    const savedRoom = safeRoomId(localStorage.getItem("loveRoomId"));
    currentRoomId = urlRoom || savedRoom || "our-love-room";
    roomIdInput.value = currentRoomId;
    localStorage.setItem("loveRoomId", currentRoomId);
    setLetterStatus("🔐 Đang kết nối phòng riêng...");

    firebase.auth().signInAnonymously().then(() => {
      firebaseReady = true;
      listenToRoom(currentRoomId);
    }).catch(error => {
      console.error(error);
      setLetterStatus("Không đăng nhập ẩn danh được. Bật Anonymous Authentication trong Firebase.", true);
    });
  } catch (error) {
    console.error(error);
    setLetterStatus("Firebase chưa kết nối. Kiểm tra cấu hình.", true);
  }
}

function listenToRoom(roomId) {
  if (!firebaseReady) return;
  currentRoomId = safeRoomId(roomId) || "our-love-room";
  roomIdInput.value = currentRoomId;
  localStorage.setItem("loveRoomId", currentRoomId);

  if (letterRef) letterRef.off();
  letterRef = firebase.database().ref(`loveRooms/${currentRoomId}/letters`);

  letterRef.on("value", snapshot => {
    const data = snapshot.val() || {};
    const letters = Object.entries(data)
      .map(([id, item]) => ({ id, ...item }))
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

    renderLetters(letters);
    setLetterStatus(`🟢 Đang đồng bộ phòng: ${currentRoomId}`);
  }, error => {
    console.error(error);
    setLetterStatus("Không đọc được phòng. Kiểm tra Firebase Rules.", true);
  });
}

function renderLetters(letters) {
  letterCount.textContent = letters.length;
  if (!letters.length) {
    letterList.innerHTML = '<div class="empty-letter">Chưa có lá thư nào. Viết lá đầu tiên đi ❤️</div>';
    return;
  }

  letterList.innerHTML = letters.map(letter => {
    const date = letter.createdAt ? new Date(letter.createdAt).toLocaleString("vi-VN") : "vừa xong";
    const name = escapeHtml(letter.name || "Một người rất yêu bạn");
    const body = escapeHtml(letter.text || "");
    return `
      <article class="letter-entry">
        <div class="letter-entry-head">
          <span>💌 ${name}</span>
          <span class="letter-entry-date">${date}</span>
        </div>
        <div class="letter-entry-body">${body}</div>
      </article>`;
  }).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[char]));
}

function saveLocalLetter() {
  const text = letterText.value.trim();
  if (!text) {
    setLetterStatus("Hãy viết gì đó trước nhé ❤️", true);
    return;
  }
  const name = letterName.value.trim() || "Người thương";
  const key = `localLetters_${currentRoomId || "our-love-room"}`;
  const letters = JSON.parse(localStorage.getItem(key) || "[]");
  letters.push({ name, text, createdAt: Date.now() });
  localStorage.setItem(key, JSON.stringify(letters));
  renderLetters(letters);
  letterText.value = "";
  setLetterStatus("💾 Đã lưu trên máy này. Cấu hình Firebase để cả hai máy cùng thấy.");
}

saveLetterBtn?.addEventListener("click", async (event) => {
  event.stopPropagation();
  const text = letterText.value.trim();
  if (!text) {
    setLetterStatus("Hãy viết lá thư trước nhé ❤️", true);
    letterText.focus();
    return;
  }

  const name = letterName.value.trim() || "Người thương";

  if (!firebaseReady) {
    saveLocalLetter();
    return;
  }

  try {
    saveLetterBtn.disabled = true;
    setLetterStatus("💌 Đang gửi thư...");
    await letterRef.push({
      name: name.slice(0, 30),
      text: text.slice(0, 2000),
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
    letterText.value = "";
    setLetterStatus("❤️ Đã gửi. Người ấy sẽ thấy ngay khi mở cùng phòng.");
  } catch (error) {
    console.error(error);
    setLetterStatus("Gửi thất bại. Kiểm tra Firebase Rules.", true);
  } finally {
    saveLetterBtn.disabled = false;
  }
});

loadRoomBtn?.addEventListener("click", event => {
  event.stopPropagation();
  const room = safeRoomId(roomIdInput.value);
  if (!room) return setLetterStatus("Nhập Room ID trước nhé.", true);

  const url = new URL(window.location.href);
  url.searchParams.set("room", room);
  history.replaceState({}, "", url);

  if (firebaseReady) {
    listenToRoom(room);
  } else {
    currentRoomId = room;
    localStorage.setItem("loveRoomId", room);
    const letters = JSON.parse(localStorage.getItem(`localLetters_${room}`) || "[]");
    renderLetters(letters);
    setLetterStatus(`Phòng tạm: ${room}`);
  }
});

copyRoomLinkBtn?.addEventListener("click", async event => {
  event.stopPropagation();

  const room = safeRoomId(roomIdInput.value) || currentRoomId || "our-love-room";

  const url = new URL(window.location.href);
  url.searchParams.set("room", room);

  const link = url.toString();

  // Nếu đang mở file trực tiếp bằng file://
  if (window.location.protocol === "file:") {
    window.prompt(
      "⚠️ Bạn đang mở file trực tiếp. Link này chỉ dùng trên máy bạn. Hãy chạy website bằng Live Server hoặc đưa website lên hosting trước.",
      link
    );
    return;
  }

  try {
    // Chrome/Edge cho phép Clipboard
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(link);
    } else {
      // Cách dự phòng
      const textarea = document.createElement("textarea");
      textarea.value = link;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const success = document.execCommand("copy");
      textarea.remove();

      if (!success) throw new Error("Không thể copy");
    }

    setLetterStatus("🔗 Đã copy link. Gửi link này cho người ấy!");
  } catch (error) {
    console.error(error);

    // Cho người dùng tự Ctrl+C nếu trình duyệt chặn copy
    window.prompt("Không tự copy được. Hãy Ctrl+C link này:", link);
  }
});

initLetterFirebase();
