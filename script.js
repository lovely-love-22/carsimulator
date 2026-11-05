document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ---
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Добавляем нажатой кнопке
            this.classList.add('active');
            
            // Показываем нужную страницу
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 2. ЛОГИКА ЗАДАНИЙ (НАЧИСЛЕНИЕ ДЕНЕГ) ---
    let currentBalance = 105000;
    const balanceDisplay = document.getElementById('balanceDisplay');

    document.querySelectorAll('.claim-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                const reward = parseInt(this.getAttribute('data-reward'));
                currentBalance += reward;
                
                // Форматируем число с пробелами (105 000)
                balanceDisplay.textContent = currentBalance.toLocaleString('ru-RU') + ' ₽';
                
                this.textContent = 'Получено';
                this.style.color = '#4ade80';
                this.style.borderColor = '#4ade80';
                this.disabled = true;
            }
        });
    });

    // --- 3. ЛОГИКА КЕЙСОВ (РУЛЕТКА) ---
    const modal = document.getElementById('caseModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const rouletteTrack = document.getElementById('rouletteTrack');
    const winCard = document.getElementById('winCard');
    const modalTitle = document.getElementById('modalTitle');

    // Данные для рулетки (эмуляция)
    const carIcons = ['ph-car', 'ph-jeep', 'ph-taxi', 'ph-truck'];
    
    document.querySelectorAll('.buy-case-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const price = parseInt(this.getAttribute('data-price'));
            
            if (currentBalance >= price) {
                // Списываем деньги
                currentBalance -= price;
                balanceDisplay.textContent = currentBalance.toLocaleString('ru-RU') + ' ₽';
                
                openCaseAnimation();
            } else {
                alert('Недостаточно средств!');
            }
        });
    });

    function openCaseAnimation() {
        modal.classList.add('active');
        winCard.classList.add('hidden');
        closeModalBtn.classList.add('hidden');
        modalTitle.textContent = 'Сканирую...';
        
        // Очищаем рулетку
        rouletteTrack.innerHTML = '';
        rouletteTrack.style.transition = 'none';
        rouletteTrack.style.transform = 'translateX(0)';

        // Генерируем 50 случайных элементов
        for (let i = 0; i < 50; i++) {
            const item = document.createElement('div');
            item.classList.add('roulette-item');
            
            // Делаем 45-й элемент выигрышным (золотым)
            if (i === 45) {
                item.classList.add('gold');
                item.innerHTML = '<i class="ph-fill ph-car" style="color: #eab308;"></i>';
            } else {
                // Остальные случайные
                const randomIcon = carIcons[Math.floor(Math.random() * carIcons.length)];
                item.innerHTML = `<i class="ph ${randomIcon}" style="color: #666;"></i>`;
            }
            rouletteTrack.appendChild(item);
        }

        // Запускаем анимацию через небольшую задержку (чтобы DOM обновился)
        setTimeout(() => {
            // Смещение: 45-й элемент по центру. 
            // Каждый элемент 100px + 10px gap = 110px.
            // 45 * 110 = 4950px. Отнимаем половину экрана чтобы центрировать.
            const offset = -(45 * 110) + (document.querySelector('.roulette-container').offsetWidth / 2) - 50;
            
            rouletteTrack.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)';
            rouletteTrack.style.transform = `translateX(${offset}px)`;

            // Через 4 секунды (после остановки) показываем карточку
            setTimeout(() => {
                modalTitle.textContent = 'Вы выиграли!';
                winCard.classList.remove('hidden');
                closeModalBtn.classList.remove('hidden');
            }, 4000);

        }, 50);
    }

    // Закрытие модалки
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

});
