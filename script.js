// --- БАЗА ДАННЫХ МАШИН ---
const carDatabase = [
    // Обычные (Common)
    { name: "Lada Vesta", rarity: "common", price: 800000, img: "https://pngimg.com/uploads/lada/lada_PNG93.png" },
    { name: "Hyundai i10", rarity: "common", price: 850000, img: "https://pngimg.com/uploads/hyundai/hyundai_PNG48.png" },
    { name: "Kia Rio", rarity: "common", price: 1200000, img: "https://pngimg.com/uploads/kia/kia_PNG48.png" },
    { name: "Toyota Corolla", rarity: "common", price: 1500000, img: "https://pngimg.com/uploads/toyota/toyota_PNG1923.png" },
    { name: "Renault Logan", rarity: "common", price: 700000, img: "https://pngimg.com/uploads/renault/renault_PNG21.png" },
    { name: "Volkswagen Polo", rarity: "common", price: 1100000, img: "https://pngimg.com/uploads/volkswagen/volkswagen_PNG81.png" },
    { name: "Ford Focus", rarity: "common", price: 1400000, img: "https://pngimg.com/uploads/ford/ford_PNG43.png" },
    // Редкие (Rare)
    { name: "BMW 3 Series", rarity: "rare", price: 3500000, img: "https://pngimg.com/uploads/bmw/bmw_PNG995.png" },
    { name: "Audi A4", rarity: "rare", price: 3800000, img: "https://pngimg.com/uploads/audi/audi_PNG1045.png" },
    { name: "Mercedes C-Class", rarity: "rare", price: 4200000, img: "https://pngimg.com/uploads/mercedes/mercedes_PNG802.png" },
    { name: "Toyota Camry", rarity: "rare", price: 3000000, img: "https://pngimg.com/uploads/toyota/toyota_PNG1918.png" },
    { name: "Mazda 6", rarity: "rare", price: 2800000, img: "https://pngimg.com/uploads/mazda/mazda_PNG41.png" },
    { name: "Nissan X-Trail", rarity: "rare", price: 3200000, img: "https://pngimg.com/uploads/nissan/nissan_PNG49.png" },
    // Эпические (Epic)
    { name: "Porsche 911", rarity: "epic", price: 18000000, img: "https://pngimg.com/uploads/porsche/porsche_PNG2.png" },
    { name: "Nissan GT-R R35", rarity: "epic", price: 11000000, img: "https://pngimg.com/uploads/nissan/nissan_PNG40.png" },
    { name: "Chevrolet Camaro SS", rarity: "epic", price: 8000000, img: "https://pngimg.com/uploads/chevrolet/chevrolet_PNG63.png" },
    { name: "BMW M5 F90", rarity: "epic", price: 12000000, img: "https://pngimg.com/uploads/bmw/bmw_PNG989.png" },
    // Легендарные (Legendary)
    { name: "Bugatti Chiron", rarity: "legendary", price: 150000000, img: "https://pngimg.com/uploads/bugatti/bugatti_PNG33.png" },
    { name: "Koenigsegg Jesko", rarity: "legendary", price: 200000000, img: "https://pngimg.com/uploads/koenigsegg/koenigsegg_PNG7.png" },
    { name: "Ferrari F40", rarity: "legendary", price: 45000000, img: "https://pngimg.com/uploads/ferrari/ferrari_PNG10297.png" },
    { name: "Lamborghini Huracan", rarity: "legendary", price: 40000000, img: "https://pngimg.com/uploads/lamborghini/lamborghini_PNG10715.png" }
];

// --- СИСТЕМА СОХРАНЕНИЙ ---
let user = JSON.parse(localStorage.getItem('autoEmpireUser')) || null;
let balance = parseInt(localStorage.getItem('autoEmpireBalance')) || 105000; 
let garage = JSON.parse(localStorage.getItem('autoEmpireGarage')) || [];

function saveGame() {
    localStorage.setItem('autoEmpireUser', JSON.stringify(user));
    localStorage.setItem('autoEmpireBalance', balance);
    localStorage.setItem('autoEmpireGarage', JSON.stringify(garage));
}

// --- ИНИЦИАЛИЗАЦИЯ ---
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    
    // Регистрация
    if (!user) document.getElementById('authModal').classList.add('active');
    else document.getElementById('authModal').classList.remove('active');

    document.getElementById('regBtn').addEventListener('click', () => {
        const nick = document.getElementById('regNickname').value;
        if (nick.length < 3) return alert("Никнейм слишком короткий!");
        user = { nickname: nick, email: document.getElementById('regEmail').value || "Не указан" };
        saveGame(); document.getElementById('authModal').classList.remove('active'); updateUI();
    });

    // Сброс
    document.getElementById('resetProgressBtn').addEventListener('click', () => {
        if(confirm("Сбросить прогресс?")) { localStorage.clear(); location.reload(); }
    });

    // Навигация
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.getAttribute('data-target')).classList.add('active');
        });
    });
});

// --- ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ---
function updateUI() {
    document.getElementById('balanceDisplay').textContent = balance.toLocaleString('ru-RU') + ' ₽';
    if (user) {
        document.getElementById('profileNickname').textContent = user.nickname;
        document.getElementById('profileEmail').textContent = user.email;
    }
    renderGarage();
}

// --- ЛОГИКА РАДАРА ---
let isScanning = false;
const radarBtn = document.getElementById('radarButton');
const radarIcon = document.getElementById('radarIcon');
const radarTxt = document.getElementById('radarText');
const radarDsc = document.getElementById('radarDesc');

radarBtn.addEventListener('click', () => {
    if (isScanning) return;
    isScanning = true;
    
    radarBtn.classList.add('radar-scanning');
    radarIcon.className = 'ph ph-spinner-gap';
    radarTxt.textContent = 'ПОИСК...';
    radarDsc.textContent = 'Сканируем частоты авторынка...';

    setTimeout(() => {
        // Выбираем случайную машину для радара
        const randomCar = carDatabase[Math.floor(Math.random() * carDatabase.length)];
        
        // Считаем цену со скидкой (от 20% до 40%)
        const discount = 0.2 + Math.random() * 0.2;
        const finalPrice = Math.floor(randomCar.price * (1 - discount));

        // Заполняем модалку
        document.getElementById('radarCarImg').src = randomCar.img;
        document.getElementById('radarCarName').textContent = randomCar.name;
        document.getElementById('radarCarPrice').textContent = `${(finalPrice * 0.8).toLocaleString('ru-RU')} ₽ - ${(finalPrice * 1.1).toLocaleString('ru-RU')} ₽`;
        document.getElementById('radarBuyPrice').textContent = finalPrice.toLocaleString('ru-RU') + ' ₽';
        
        let rText = "Находка · Обычное";
        if(randomCar.rarity === 'rare') rText = "Находка · Редкое";
        if(randomCar.rarity === 'epic') rText = "Находка · Эпическое";
        if(randomCar.rarity === 'legendary') rText = "Находка · Легендарное";
        document.getElementById('radarRarityText').textContent = rText;

        // Открываем модалку
        document.getElementById('radarModal').classList.add('active');
        
        // Кнопка купить
        document.getElementById('radarBuyBtn').onclick = () => {
            if (balance >= finalPrice) {
                balance -= finalPrice;
                // Добавляем в гараж
                garage.push({ ...randomCar, registered: false, regTimer: null, plate: null });
                saveGame();
                updateUI();
                document.getElementById('radarModal').classList.remove('active');
                // alert(`Вы купили ${randomCar.name} за ${finalPrice.toLocaleString('ru-RU')} ₽!`);
            } else {
                alert("Недостаточно средств!");
            }
        };

        // Кнопка пропустить
        document.getElementById('radarSkipBtn').onclick = () => {
            document.getElementById('radarModal').classList.remove('active');
        };

        // Сброс кнопки радара
        isScanning = false;
        radarBtn.classList.remove('radar-scanning');
        radarIcon.className = 'ph ph-radar';
        radarTxt.textContent = 'РАДАР';
        radarDsc.textContent = 'Нажмите на радар для поиска горячего предложения. Редкая машина на 20-40% дешевле.';

    }, 3000); // 3 секунды сканирования
});


// --- ГЕНЕРАЦИЯ НОМЕРОВ ---
function generatePlate() {
    const letters = "АВЕКМНОРСТУХ";
    const region = "178";
    let plate = "";
    plate += letters[Math.floor(Math.random() * letters.length)];
    plate += Math.floor(Math.random() * 9) + 1;
    plate += Math.floor(Math.random() * 9);
    plate += Math.floor(Math.random() * 9);
    plate += letters[Math.floor(Math.random() * letters.length)];
    plate += letters[Math.floor(Math.random() * letters.length)];
    return plate;
}

// --- ГАРАЖ (С ГИБДД) ---
function renderGarage() {
    const grid = document.getElementById('garageGrid');
    document.getElementById('garageCount').textContent = `(${garage.length} машин)`;
    grid.innerHTML = '';

    if (garage.length === 0) {
        grid.innerHTML = '<p style="color: #888; text-align: center; width: 100%;">Гараж пуст. Крутите кейсы или ищите на радаре!</p>';
        return;
    }

    garage.forEach((car, index) => {
        let badgeText = "ОБЫЧНАЯ";
        let badgeColor = "#888";
        if(car.rarity === 'rare') { badgeText = "РЕДКАЯ"; badgeColor = "#60a5fa"; }
        if(car.rarity === 'epic') { badgeText = "ЭПИЧЕСКАЯ"; badgeColor = "#c084fc"; }
        if(car.rarity === 'legendary') { badgeText = "ЛЕГЕНДАРНАЯ"; badgeColor = "#eab308"; }

        let regBlock = '';
        let plateHtml = '';

        if (!car.registered && !car.regTimer) {
            regBlock = `
                <div class="car-action-block">
                    <p style="font-size: 12px; color: #888; margin-bottom: 10px;">Без номеров · обычный +2% к цене.</p>
                    <button class="reg-btn" onclick="openGibddModal(${index})">
                        🚦 Оформить в ГИБДД · 15 000 ₽
                    </button>
                </div>
            `;
        } else if (car.regTimer) {
            regBlock = `
                <div class="car-action-block" style="background: #2a2a2a;">
                    <div class="flex-between" style="margin-bottom: 5px;">
                        <span style="color: #60a5fa; font-size: 14px;">🚙 На оформлении</span>
                        <span class="timer-text" data-time="${car.regTimer}" data-index="${index}" style="color: #d4a373; font-size: 14px; font-weight: bold;">Осталось: ...</span>
                    </div>
                    <p style="font-size: 12px; color: #888; margin-bottom: 10px;">Ожидайте завершения процедуры.</p>
                    <button class="secondary-btn" style="width: 100%; opacity: 0.5;">Ускорить · 21 500 ₽</button>
                </div>
            `;
        } else {
            plateHtml = `
                <div style="margin-top: 10px;">
                    <div class="plate">
                        <div class="plate-main">${car.plate}</div>
                        <div class="plate-region">
                            <span>178</span>
                            <span class="plate-flag">🇷🇺 RUS</span>
                        </div>
                    </div>
                </div>
            `;
            regBlock = `<div class="car-action-block" style="background: #2a2a2a;"><div style="color: #4ade80; font-size: 14px; font-weight: bold;">✅ Зарегистрировано</div></div>`;
        }

        const card = document.createElement('div');
        card.className = 'garage-card';
        card.innerHTML = `
            <div class="garage-img-box">
                <span class="rarity-badge" style="color: ${badgeColor}; border-color: ${badgeColor};">${badgeText}</span>
                <img src="${car.img}" alt="${car.name}">
            </div>
            <div class="garage-details">
                <div class="flex-between" style="margin-bottom: 10px;">
                    <h3 style="margin: 0;">${car.name}</h3>
                    <span style="color: #888; font-size: 13px;">351 тыс. км</span>
                </div>
                ${plateHtml}
                ${regBlock}
                <div class="car-stats">
                    <div class="flex-between" style="margin-bottom: 5px;">
                        <span style="font-size: 12px; color: #888;">Состояние</span>
                        <span style="font-size: 12px; color: #f87171; font-weight: bold;">10%</span>
                    </div>
                    <div class="progress-bar"><div class="progress-fill" style="width: 10%;"></div></div>
                    <div class="flex-between" style="margin-top: 15px;">
                        <span style="font-size: 12px; color: #888;">Рыночная оценка</span>
                        <span style="font-size: 13px; font-weight: bold;">~${car.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                </div>
                <div class="garage-buttons">
                    <button class="secondary-btn" style="font-size: 12px; padding: 6px 10px;">В музей</button>
                    <button class="secondary-btn" style="font-size: 12px; padding: 6px 10px;">Продать NPC</button>
                    <button class="primary-btn" style="font-size: 12px; padding: 6px 10px;">👥 Игроку</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    // Запуск таймеров
    setInterval(updateTimers, 1000);
}

// --- ЛОГИКА ТАЙМЕРОВ ---
function updateTimers() {
    document.querySelectorAll('.timer-text').forEach(el => {
        const endTime = parseInt(el.getAttribute('data-time'));
        const index = parseInt(el.getAttribute('data-index'));
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            el.textContent = "Готово!";
            el.style.color = "#4ade80";
            // Выдаем номер
            garage[index].registered = true;
            garage[index].regTimer = null;
            garage[index].plate = generatePlate(); // Генерируем номер
            saveGame();
            renderGarage();
        } else {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            el.textContent = `Осталось: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    });
}

// --- МОДАЛКА ГИБДД ---
let currentCarIndex = null;
let canvas, ctx, drawing = false;

function openGibddModal(index) {
    if (balance < 15000) return alert("Недостаточно средств (нужно 15 000 ₽)");
    currentCarIndex = index;
    const car = garage[index];

    let gibddModal = document.getElementById('gibddModal');
    if (!gibddModal) {
        gibddModal = document.createElement('div');
        gibddModal.id = 'gibddModal';
        gibddModal.className = 'modal-overlay';
        gibddModal.innerHTML = `
            <div class="modal-content" style="max-width: 500px; padding: 20px; background: #222;">
                <h2 style="color: #60a5fa; font-size: 18px; text-align: left; margin-bottom: 15px;">🚙 Постановка на учет</h2>
                
                <div class="document-paper">
                    <div class="doc-header">
                        <span>ГИБДД · РЕГИСТРАЦИОННОЕ ПОДРАЗДЕЛЕНИЕ</span>
                        <span>ФОРМА № 1</span>
                    </div>
                    <h3 class="doc-title">Заявление на постановку на учет</h3>
                    <p class="doc-subtitle">транспортного средства</p>
                    
                    <div class="doc-row"><span>Транспортное средство</span> <span id="docCarName"></span></div>
                    <div class="doc-row"><span>Год выпуска</span> <span>2003</span></div>
                    <div class="doc-row"><span>Пробег</span> <span>351 тыс. км</span></div>
                    <div class="doc-row"><span>VIN</span> <span>XTA00000351702721</span></div>
                    <div class="doc-row"><span>Заявитель</span> <span id="docUserName"></span></div>
                    <div class="doc-row"><span>Дата</span> <span id="docDate"></span></div>
                    <div class="doc-row"><span>Госпошлина</span> <span>15 000 ₽</span></div>

                    <p class="doc-text">Прошу поставить указанное транспортное средство на государственный учет и выдать регистрационные знаки. Достоверность сведений подтверждаю.</p>
                    
                    <div class="doc-row" style="margin-top: 15px;"><span>Подпись заявителя:</span></div>
                    
                    <div class="canvas-wrapper">
                        <canvas id="signatureCanvas" width="400" height="100"></canvas>
                        <span class="canvas-hint">Поставьте подпись здесь</span>
                    </div>
                    <div class="doc-footer">Проведите линию подписи</div>
                </div>

                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button id="clearSigBtn" class="secondary-btn" style="flex: 1;">Очистить</button>
                    <button id="cancelSigBtn" class="secondary-btn" style="flex: 1;">Отмена</button>
                    <button id="submitSigBtn" class="primary-btn" style="flex: 1;">Подписать</button>
                </div>
            </div>
        `;
        document.body.appendChild(gibddModal);
        initSignaturePad();
    }
    
    document.getElementById('docCarName').textContent = car.name;
    document.getElementById('docUserName').textContent = user.nickname;
    document.getElementById('docDate').textContent = new Date().toLocaleDateString('ru-RU');
    clearSignature();
    
    gibddModal.classList.add('active');
    
    document.getElementById('cancelSigBtn').onclick = () => gibddModal.classList.remove('active');
    document.getElementById('clearSigBtn').onclick = () => clearSignature();
    
    document.getElementById('submitSigBtn').onclick = () => {
        balance -= 15000;
        // Таймер на 1 минуту для теста (в реале 4:30 = 270 сек)
        garage[currentCarIndex].regTimer = new Date().getTime() + (1000 * 60 * 1); 
        saveGame();
        updateUI();
        gibddModal.classList.remove('active');
    };
}

// --- РИСОВАНИЕ ПОДПИСИ ---
function initSignaturePad() {
    canvas = document.getElementById('signatureCanvas');
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e3a8a';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e.touches[0]); }, {passive: false});
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e.touches[0]); }, {passive: false});
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() { drawing = false; }
function clearSignature() { if(ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); }

// --- ЛОГИКА КЕЙСОВ ---
const modal = document.getElementById('caseModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const rouletteTrack = document.getElementById('rouletteTrack');
const winCard = document.getElementById('winCard');
const modalTitle = document.getElementById('modalTitle');

document.querySelectorAll('.buy-case-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const price = parseInt(this.getAttribute('data-price'));
        const type = this.getAttribute('data-type');
        if (balance >= price) {
            balance -= price; saveGame(); updateUI(); startRoulette(type);
        } else alert('Недостаточно средств!');
    });
});

function getRandomCar(caseType) {
    const roll = Math.random() * 100;
    let targetRarity = "common";
    if (caseType === 'common') {
        if (roll < 1) targetRarity = "legendary"; else if (roll < 10) targetRarity = "epic"; else if (roll < 30) targetRarity = "rare";
    } else if (caseType === 'premium') {
        if (roll < 5) targetRarity = "legendary"; else if (roll < 25) targetRarity = "epic"; else if (roll < 60) targetRarity = "rare";
    }
    const filteredCars = carDatabase.filter(car => car.rarity === targetRarity);
    return filteredCars[Math.floor(Math.random() * filteredCars.length)];
}

function startRoulette(caseType) {
    modal.classList.add('active'); winCard.classList.add('hidden'); closeModalBtn.classList.add('hidden');
    modalTitle.textContent = 'Сканирую...'; rouletteTrack.innerHTML = '';
    rouletteTrack.style.transition = 'none'; rouletteTrack.style.transform = 'translateX(0)';
    
    const winCar = getRandomCar(caseType);
    const carToAdd = { ...winCar, registered: false, regTimer: null, plate: null };

    for (let i = 0; i < 50; i++) {
        const item = document.createElement('div');
        item.classList.add('roulette-item');
        if (i === 45) {
            item.classList.add('gold'); item.innerHTML = `<img src="${winCar.img}">`;
        } else {
            const randCar = carDatabase[Math.floor(Math.random() * carDatabase.length)];
            item.innerHTML = `<img src="${randCar.img}" style="opacity: 0.6;">`;
        }
        rouletteTrack.appendChild(item);
    }

    setTimeout(() => {
        const offset = -(45 * 110) + (document.querySelector('.roulette-container').offsetWidth / 2) - 50;
        rouletteTrack.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)';
        rouletteTrack.style.transform = `translateX(${offset}px)`;

        setTimeout(() => {
            modalTitle.textContent = 'Вы выиграли!';
            let rText = "ОБЫЧНАЯ", rColor = "#888";
            if (winCar.rarity === "rare") { rText = "РЕДКАЯ"; rColor = "#60a5fa"; }
            if (winCar.rarity === "epic") { rText = "ЭПИЧЕСКАЯ"; rColor = "#c084fc"; }
            if (winCar.rarity === "legendary") { rText = "ЛЕГЕНДАРНАЯ"; rColor = "#eab308"; }

            winCard.innerHTML = `
                <div class="win-card-inner" style="border-color: ${rColor}; box-shadow: 0 0 20px ${rColor}44;">
                    <span class="rarity-tag" style="color: ${rColor};">${rText}</span>
                    <img src="${winCar.img}" style="width: 100%; max-height: 150px; object-fit: contain; margin: 15px 0;">
                    <h3>${winCar.name}</h3>
                </div>`;
            winCard.classList.remove('hidden'); closeModalBtn.classList.remove('hidden');
            
            closeModalBtn.onclick = () => {
                garage.push(carToAdd); saveGame(); updateUI(); modal.classList.remove('active');
            };
        }, 4000);
    }, 50);
}
