document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
"Нажимай где угодно",  
"Эй, солнце моё ❤️",  
"Я хочу тебе кое-что сказать",  
"Но в начале нажми разок",  
"Нажми еще раз",  
"Давай, не сдавайся, я в тебя верю)",  
"Может это последний раз?",  
"Серьезно",  
"Это",  
"Последний",  
"А может нет",  
"Вещь",
"Которую я хочу сказать",
"Очень важна",  
"Уже волнительно?",  
"Но это еще не всё",  
"Ты даже не представляешь сколько я тут могу написать)",
"Кстати",
"Как тебе песня на фоне?",
"Я тоже думаю, что песня красивая",
"Но не красивее тебя)",
"А ещё я бы хотел сказать тебе пару слов)",
"Ты очень красивая",
"У тебя милое личико",
"И мне безумно нравятся твои глазки",
"Я просто в восторге от твоего голоса",
"А твои нежные руки",
"Это просто сказка",
"А характер...",
"Я схожу с ума",
"Мне нравится твоя смелость",
"Капризность",
"И все эти милые моменты",
"Я обожаю тебя)",
"Ты лучший человек которого я повстречал",
"Но я немного отошёл от темы",
"Поэтому",
"Перейдём к главному",
"Я просто хотел сказать",  
"Я ОЧЕНЬ СИЛЬНО ЛЮБЛЮ ТЕБЯ ❤️❤️❤️",  
"Я надеюсь тебе понраавилось",
"Но это ещё не всё",
"Просто нажми кнопку внизу 💝"
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
    $('.message').text(messages[currentPage]);
    
    isLastPage = currentPage === messages.length - 1;
    
    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', function() {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;
    
    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);animation:love " + r_time + "s ease'></div>");
    
    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);animation:love " + (r_time + 5) + "s ease'></div>");
    
    $('.heart').each(function() {
        var top = parseFloat($(this).css("top"));
        var width = parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function() {
    clearMusicState(); 
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    
    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);