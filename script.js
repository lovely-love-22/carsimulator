// --- БАЗА ДАННЫХ МАШИН ---
// Rarity: common, rare, epic, legendary
const carDatabase = [
    // Обычные (Common)
    { name: "Lada Vesta", rarity: "common", price: 800000, img: "https://pngimg.com/uploads/lada/lada_PNG93.png" },
    { name: "Lada Granta", rarity: "common", price: 600000, img: "https://pngimg.com/uploads/lada/lada_PNG45.png" },
    { name: "Renault Logan", rarity: "common", price: 700000, img: "https://pngimg.com/uploads/renault/renault_PNG21.png" },
    { name: "Kia Rio", rarity: "common", price: 1200000, img: "https://pngimg.com/uploads/kia/kia_PNG48.png" },
    { name: "Hyundai Solaris", rarity: "common", price: 1300000, img: "https://pngimg.com/uploads/hyundai/hyundai_PNG48.png" },
    { name: "Volkswagen Polo", rarity: "common", price: 1100000, img: "https://pngimg.com/uploads/volkswagen/volkswagen_PNG81.png" },
    { name: "Toyota Corolla", rarity: "common", price: 1500000, img: "https://pngimg.com/uploads/toyota/toyota_PNG1923.png" },
    { name: "Ford Focus", rarity: "common", price: 1400000, img: "https://pngimg.com/uploads/ford/ford_PNG43.png" },
    
    // Редкие (Rare)
    { name: "BMW 3 Series", rarity: "rare", price: 3500000, img: "https://pngimg.com/uploads/bmw/bmw_PNG995.png" },
    { name: "Audi A4", rarity: "rare", price: 3800000, img: "https://pngimg.com/uploads/audi/audi_PNG1045.png" },
    { name: "Mercedes C-Class", rarity: "rare", price: 4200000, img: "https://pngimg.com/uploads/mercedes/mercedes_PNG802.png" },
    { name: "Toyota Camry", rarity: "rare", price: 3000000, img: "https://pngimg.com/uploads/toyota/toyota_PNG1918.png" },
    { name: "Mazda 6", rarity: "rare", price: 2800000, img: "https://pngimg.com/uploads/mazda/mazda_PNG41.png" },
    { name: "Nissan X-Trail", rarity: "rare", price: 3200000, img: "https://pngimg.com/uploads/nissan/nissan_PNG49.png" },
    { name: "Volvo XC60", rarity: "rare", price: 4000000, img: "https://pngimg.com/uploads/volvo/volvo_PNG42.png" },
    { name: "Lexus RX350", rarity: "rare", price: 5500000, img: "https://pngimg.com/uploads/lexus/lexus_PNG39.png" },
    
    // Эпические (Epic)
    { name: "BMW M5 F90", rarity: "epic", price: 12000000, img: "https://pngimg.com/uploads/bmw/bmw_PNG989.png" },
    { name: "Audi RS6", rarity: "epic", price: 14000000, img: "https://pngimg.com/uploads/audi/audi_PNG1015.png" },
    { name: "Mercedes E63 AMG", rarity: "epic", price: 15000000, img: "https://pngimg.com/uploads/mercedes/mercedes_PNG796.png" },
    { name: "Porsche 911 Carrera", rarity: "epic", price: 18000000, img: "https://pngimg.com/uploads/porsche/porsche_PNG2.png" },
    { name: "Nissan GT-R R35", rarity: "epic", price: 11000000, img: "https://pngimg.com/uploads/nissan/nissan_PNG40.png" },
    { name: "Chevrolet Camaro SS", rarity: "epic", price: 8000000, img: "https://pngimg.com/uploads/chevrolet/chevrolet_PNG63.png" },
    { name: "Ford Mustang GT", rarity: "epic", price: 7500000, img: "https://pngimg.com/uploads/ford/ford_PNG42.png" },
    
    // Легендарные (Legendary)
    { name: "Ferrari F40", rarity: "legendary", price: 45000000, img: "https://pngimg.com/uploads/ferrari/ferrari_PNG10297.png" },
    { name: "Ferrari 488", rarity: "legendary", price: 35000000, img: "https://pngimg.com/uploads/ferrari/ferrari_PNG10281.png" },
    { name: "Lamborghini Huracan", rarity: "legendary", price: 40000000, img: "https://pngimg.com/uploads/lamborghini/lamborghini_PNG10715.png" },
    { name: "Lamborghini Aventador", rarity: "legendary", price: 55000000, img: "https://pngimg.com/uploads/lamborghini/lamborghini_PNG10704.png" },
    { name: "Bugatti Chiron", rarity: "legendary", price: 150000000, img: "https://pngimg.com/uploads/bugatti/bugatti_PNG33.png" },
    { name: "Bugatti Veyron", rarity: "legendary", price: 120000000, img: "https://pngimg.com/uploads/bugatti/bugatti_PNG32.png" },
    { name: "McLaren 720S", rarity: "legendary", price: 42000000, img: "https://pngimg.com/uploads/mclaren/mclaren_PNG25.png" },
    { name: "Aston Martin DB11", rarity: "legendary", price: 38000000, img: "https://pngimg.com/uploads/aston_martin/aston_martin_PNG23.png" },
    { name: "Koenigsegg Jesko", rarity: "legendary", price: 200000000, img: "https://pngimg.com/uploads/koenigsegg/koenigsegg_PNG7.png" },
    { name: "Rolls-Royce Phantom", rarity: "legendary", price: 80000000, img: "https://pngimg.com/uploads/rolls_royce/rolls_royce_PNG22.png" },
    { name: "Bentley Continental GT", rarity: "legendary", price: 45000000, img: "https://pngimg.com/uploads/bentley/bentley_PNG20.png" }
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
    
    if (!user) {
        document.getElementById('authModal').classList.add('active');
    } else {
        document.getElementById('authModal').classList.remove('active');
    }

    document.getElementById('regBtn').addEventListener('click', () => {
        const nick = document.getElementById('regNickname').value;
        const email = document.getElementById('regEmail').value;
        if (nick.length < 3) return alert("Никнейм должен быть больше 3 символов!");
        
        user = { nickname: nick, email: email || "Не указан" };
        saveGame();
        document.getElementById('authModal').classList.remove('active');
        updateUI();
    });

    document.getElementById('resetProgressBtn').addEventListener('click', () => {
        if(confirm("Вы уверены, что хотите удалить весь прогресс?")) {
            localStorage.clear();
            location.reload();
        }
    });

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

// --- ГАРАЖ ---
function renderGarage() {
    const grid = document.getElementById('garageGrid');
    const count = document.getElementById('garageCount');
    grid.innerHTML = '';
    
    count.textContent = `(${garage.length} машин)`;

    if (garage.length === 0) {
        grid.innerHTML = '<p style="color: #888; grid-column: 1/-1; text-align: center;">Гараж пуст. Откройте кейсы, чтобы получить авто!</p>';
        return;
    }

    garage.forEach(car => {
        const div = document.createElement('div');
        div.className = 'garage-item';
        div.innerHTML = `
            <img src="${car.img}" alt="${car.name}">
            <h4>${car.name}</h4>
            <p>${car.price.toLocaleString('ru-RU')} ₽</p>
        `;
        grid.appendChild(div);
    });
}

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
            balance -= price;
            saveGame();
            updateUI();
            startRoulette(type);
        } else {
            alert('Недостаточно средств!');
        }
    });
});

function getRandomCar(caseType) {
    const roll = Math.random() * 100;
    let targetRarity = "common";

    if (caseType === 'common') {
        if (roll < 1) targetRarity = "legendary";
        else if (roll < 10) targetRarity = "epic";
        else if (roll < 30) targetRarity = "rare";
        else targetRarity = "common";
    } else if (caseType === 'premium') {
        if (roll < 5) targetRarity = "legendary";
        else if (roll < 25) targetRarity = "epic";
        else if (roll < 60) targetRarity = "rare";
        else targetRarity = "common";
    }

    const filteredCars = carDatabase.filter(car => car.rarity === targetRarity);
    return filteredCars[Math.floor(Math.random() * filteredCars.length)];
}

function startRoulette(caseType) {
    modal.classList.add('active');
    winCard.classList.add('hidden');
    closeModalBtn.classList.add('hidden');
    modalTitle.textContent = 'Сканирую...';
    rouletteTrack.innerHTML = '';
    rouletteTrack.style.transition = 'none';
    rouletteTrack.style.transform = 'translateX(0)';

    const winCar = getRandomCar(caseType);

    for (let i = 0; i < 50; i++) {
        const item = document.createElement('div');
        item.classList.add('roulette-item');
        
        if (i === 45) {
            item.classList.add('gold');
            item.innerHTML = `<img src="${winCar.img}" alt="win">`;
        } else {
            const randCar = carDatabase[Math.floor(Math.random() * carDatabase.length)];
            item.innerHTML = `<img src="${randCar.img}" style="opacity: 0.6;">`;
        }
        rouletteTrack.appendChild(item);
    }

    setTimeout(() => {
        const itemWidth = 110;
        const offset = -(45 * itemWidth) + (document.querySelector('.roulette-container').offsetWidth / 2) - 50;
        
        rouletteTrack.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)';
        rouletteTrack.style.transform = `translateX(${offset}px)`;

        setTimeout(() => {
            modalTitle.textContent = 'Вы выиграли!';
            
            let rarityText = "ОБЫЧНАЯ";
            let rarityColor = "#888";
            if (winCar.rarity === "rare") { rarityText = "РЕДКАЯ"; rarityColor = "#60a5fa"; }
            if (winCar.rarity === "epic") { rarityText = "ЭПИЧЕСКАЯ"; rarityColor = "#c084fc"; }
            if (winCar.rarity === "legendary") { rarityText = "ЛЕГЕНДАРНАЯ"; rarityColor = "#eab308"; }

            winCard.innerHTML = `
                <div class="win-card-inner" style="border-color: ${rarityColor}; box-shadow: 0 0 20px ${rarityColor}44;">
                    <span class="rarity-tag" style="color: ${rarityColor};">${rarityText}</span>
                    <img src="${winCar.img}" style="width: 100%; max-height: 150px; object-fit: contain; margin: 15px 0;">
                    <h3>${winCar.name}</h3>
                    <p style="color: #4ade80; font-weight: bold;">Стоимость: ${winCar.price.toLocaleString('ru-RU')} ₽</p>
                </div>
            `;
            winCard.classList.remove('hidden');
            closeModalBtn.classList.remove('hidden');
            
            // Добавляем в гараж при закрытии модалки
            closeModalBtn.onclick = () => {
                garage.push(winCar);
                saveGame();
                updateUI();
                modal.classList.remove('active');
            };

        }, 4000);

    }, 50);
}
