export const startUpdate = function(callback) {
    let id;
    const loop = prevTime => {
        id = window.requestAnimationFrame(time => {
            const deltaTime = time - prevTime;
            if (deltaTime > 0)
                callback(deltaTime);
            loop(time);
        });
    };
    loop(performance.now());
    return () => {
        window.cancelAnimationFrame(id);
    };
};

export const wrapIndex = function(value, max) {
    return ((value % max) + max) % max;
};

export const clamp = function(value, min, max) {
    return Math.min(Math.max(value, min), max);
};

export const clamp01 = function(value) {
    return clamp(value, 0, 1);
};

export const lerp = function(from, to, progress) {
    return from + (to - from) * progress;
};

export const rad2deg = function(value) {
    return value * 180 / Math.PI;
};
