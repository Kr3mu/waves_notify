
let notifications = [];
let audio = new Audio('iphone_notification.mp3')

function previousNotify(id) {
    return notifications[id-1];
};

function findIndex(id) {
    for (i=0;notifications.length; i++) {
        if (notifications[i].id == id) {
            return i
        }
    }
}

function addNotify(text, time) {
    let number = Math.floor(Math.random() * 9999);
    let info = {
      id: number,
      inserted: false,
      top: 0,
    };
    if (!time) {
        time = 5000
    }
    notifications.push(info);
    let index = notifications.indexOf(info);
    let LastNotify = previousNotify(index) || {};
    let interval = setInterval(() => {
        if (index == 0 || LastNotify.inserted) {
            clearInterval(interval)
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
            let LastNotifyHeight = 0;
            let LastNotifyTop = 0;
            let spacing = 2;
            if (LastNotify.id) {
                let viewportHeight = window.innerHeight;
                LastNotifyHeight = $(`.notification-${LastNotify.id}`).height() / viewportHeight * 100;
                LastNotifyTop = $(`.notification-${LastNotify.id}`).position().top / viewportHeight * 100;
            };
            let top = LastNotifyHeight + LastNotifyTop + spacing;
            notifications[findIndex(number)].top = top
            audio.play();
            $(`.notification-${number}`).animate({
                'top': top  + 'vh'
            }, 400, () => {
                setTimeout(() => {
                    notifications[findIndex(number)].inserted = true;
                }, 300)
                setTimeout(() => {
                    $(`.notification-${number}`).animate({
                        'top': '-10vh'
                    }, 400, () => {
                        for (i=findIndex(number) + 1; i <= notifications.length - 1; i++) {
                            let LastNotify = previousNotify(i)
                            if (LastNotify.id) {
                                let num = i
                                $(`.notification-${notifications[i].id}`).animate({
                                    'top': LastNotify.top + 'vh'
                                }, 400, () => {
                                    notifications[num].top = LastNotify.top
                                    console.log(num==notifications.length-1)
                                    if (num==notifications.length-1) {
                                        $(`.notification-${number}`).remove();
                                        notifications.splice(findIndex(number), 1);
                                    }
                                })
                            }
                            
                        }
  
                    });

                }, time)
            });
        };
    }, 1000);
};


$(window).on('message', (event) => {
    let data = event.originalEvent.data
    if (data.action == 'addNotify') {
        addNotify(data.text);
    };
});
