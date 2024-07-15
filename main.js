let balance = 0.0; // Use a float for ETB balance
const incrementValue = 0.003; // Amount per tap
const maxETBPerDay = 10.0;
let etbToday = 0.0;

document.addEventListener('DOMContentLoaded', () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        const storedBalance = localStorage.getItem(`balance_${user.id}`);
        const storedETBToday = localStorage.getItem(`etbToday_${user.id}`);
        const storedLastTapDate = localStorage.getItem(`lastTapDate_${user.id}`);
        const today = new Date().toDateString();

        console.log(`Stored balance: ${storedBalance}, stored ETB today: ${storedETBToday}, stored last tap date: ${storedLastTapDate}, today: ${today}`);

        if (storedBalance !== null) {
            balance = parseFloat(storedBalance);
        }

        if (storedLastTapDate === today) {
            if (storedETBToday !== null) {
                etbToday = parseFloat(storedETBToday);
            }
        } else {
            localStorage.setItem(`lastTapDate_${user.id}`, today);
            etbToday = 0.0;
        }

        updateDisplay();
    } else {
        alert("Unable to get Telegram user info.");
    }
});

document.getElementById('main-img').addEventListener('click', () => {
    if (etbToday + incrementValue <= maxETBPerDay) {
        const mainImg = document.getElementById('main-img');
        mainImg.classList.add('animated');

        setTimeout(() => {
            mainImg.classList.remove('animated');
        }, 500);

        balance += incrementValue;
        etbToday += incrementValue;

        updateDisplay();
        saveUserData();
    } else {
        showPopup("You have reached the maximum ETB earning for today.");
    }
});

document.getElementById('tap').addEventListener('click', () => {
    window.location.href = 'main.html';
});

document.getElementById('boost').addEventListener('click', () => {
    showPopup("በቅርብ ቀን!\nComing Soon!");
});

document.getElementById('frens').addEventListener('click', () => {
    showPopup("Referall link ለማግኘት ይሄንን step ይከታተሉ!\n1 ቦቱን /start ይበሉት\n2 ቻናላችንን ይቀላቀሉ \n3 የሚመጣዉን ጥያቄ በመመለስ ወደ ቦቱ ዉስጥ ይግቡ\n4 ከዛ ጓደኞችዎን ይጋብዙ ሚለውን Button በመጫን የርሶን መጋበዣ link ማግኘት ትችላላችሁ!");
});

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.innerText = message;
    popup.classList.remove('hidden');
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 5000);
}

function updateDisplay() {
    document.getElementById('balance-value').innerText = balance.toFixed(4);
    document.getElementById('taps-remaining-value').innerText = Math.floor((maxETBPerDay - etbToday) / incrementValue);
}

function saveUserData() {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    if (user) {
        localStorage.setItem(`balance_${user.id}`, balance.toFixed(4));
        localStorage.setItem(`etbToday_${user.id}`, etbToday.toFixed(4));
    }
}