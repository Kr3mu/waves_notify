

addNotify = function(text, time)
    SendNUIMessage({
        action = 'addNotify',
        text = text,
        time = time
    })
end

