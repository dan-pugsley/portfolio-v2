export const wrapIndex = function(value, max) {
    return ((value % max) + max) % max;
}
