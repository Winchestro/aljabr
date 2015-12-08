define ( function module ( ) {
    return function lerp ( alpha, a, b ) {
        return a + ( b - a ) * alpha;
    }
});