
let audio = new Audio('iphone_notification.mp3')
audio.volume = 0.2

function addNotify(text, time) {
    if (!time) {
        time = 3000
    }
    let number = Math.floor(Math.random() * 999);
    $('.main').append(`
        <div class="notify-container notification-${number}">
            <div class="notify-title">
                <div class="title-part">
                    <i class="fa-regular fa-at icon"></i>
                    <p class="system text">System</p>
                </div>
                <div class="title-part">
                    <p class="time text">nowa</p>
                </div>
            </div>
            <h1 class="notify-text text">Powiadomienie</h1>
            <h2 class="notify-description text">${text}</h2>
        </div>
    `);
    audio.play();
    setTimeout(() => {
        $(`.notification-${number}`).css({
            'transform': 'translateY(0)'
        });
        setTimeout(() => {
            $(`.notification-${number}`).css({
                'transform': 'translateY(-50vh)'
            });
            setTimeout(()  => {
                $(`.notification-${number}`).remove()
            }, 300)
        }, time)
    }, 100)

}

$(window).on('message', (event) => {
    let data = event.originalEvent.data
    if (data.action == 'addNotify') {
        addNotify(data.text, data.time);
    };
});




