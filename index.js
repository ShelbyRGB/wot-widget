// Тестовый запуск без участия мода игры
const APP_ID = 'd565e587cfabd2567bce65b682753ea5'; 
const API_URL = 'https://worldoftanks.eu';  

// ВРУЧНУЮ ПОДСТАВЛЯЕМ ДАННЫЕ ДЛЯ ПРОВЕРКИ
// Мы имитируем, будто нашли клан FAME на EU-сервере
const TEST_CLAN_ID = '500000030'; 
const TEST_CLAN_TAG = 'FIST';

// Функция запускается автоматически через 1 секунду после открытия виджета
setTimeout(() => {
    document.getElementById('clanTag').innerText = `[${TEST_CLAN_TAG}] (ТЕСТ)`;
    fetchClanStrongholdData(TEST_CLAN_ID);
}, 1000);


// НАША ФУНКЦИЯ ЗАПРОСА К API (БЕЗ ИЗМЕНЕНИЙ)
async function fetchClanStrongholdData(clanId) {
    try {
        const response = await fetch(`${API_URL}/wot/stronghold/claninfo/?application_id=${APP_ID}&clan_id=${clanId}`);
        const json = await response.json();

        // Отладочный вывод ответа сервера в консоль
        console.log("Ответ от API Wargaming:", json);

        if (json.status === 'ok' && json.data[clanId]) {
            const clanData = json.data[clanId];

            const elo6 = clanData.skirmish_6_elo_rating || 'Нет';
            const elo8 = clanData.skirmish_8_elo_rating || 'Нет';
            const elo10 = clanData.skirmish_10_elo_rating || 'Нет';

            const battles6 = clanData.skirmish_6_battles_28 || 0;
            const battles8 = clanData.skirmish_8_battles_28 || 0;
            const battles10 = clanData.skirmish_10_battles_28 || 0;
            const total28DaysBattles = battles6 + battles8 + battles10;

            document.getElementById('elo6').innerText = elo6;
            document.getElementById('elo8').innerText = elo8;
            document.getElementById('elo10').innerText = elo10;
            document.getElementById('battles28').innerText = total28DaysBattles;
        } else {
            clearWidgetFields('Клан не играет в укрепах или ошибка');
        }
    } catch (error) {
        clearWidgetFields('Ошибка сети API');
    }
}

function clearWidgetFields(message) {
    document.getElementById('elo6').innerText = '-';
    document.getElementById('elo8').innerText = '-';
    document.getElementById('elo10').innerText = '-';
    document.getElementById('battles28').innerText = message;
}
