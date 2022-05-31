export const startUpdate = function(callback) {
    const prevTime = arguments[1] ?? 0;
    return window.requestAnimationFrame(time => {
        const deltaTime = time - prevTime;
        if (deltaTime > 0)
            callback(deltaTime);
        startUpdate(callback, time);
    });
}

export const stopUpdate = function(id) {
    window.cancelAnimationFrame(id);
}

export const wrapIndex = function(value, max) {
    return ((value % max) + max) % max;
}

export const clamp = function(value, min, max) {
    return Math.min(Math.max(value, min), max);
};

export const rad2deg = function(value) {
    return value * 180 / Math.PI;
}
