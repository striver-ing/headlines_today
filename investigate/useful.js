function base64decode (e) {
    var t, r, n, o, i, a, u, l = [ - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
    for (a = e.length, i = 0, u = ""; i < a;) {
        do t = l[255 & e.charCodeAt(i++)];
        while (i < a && t == -1);
        if (t == -1) break;
        do r = l[255 & e.charCodeAt(i++)];
        while (i < a && r == -1);
        if (r == -1) break;
        u += String.fromCharCode(t << 2 | (48 & r) >> 4);
        do {
            if (n = 255 & e.charCodeAt(i++), 61 == n) return u;
            n = l[n]
        } while ( i < a && n == - 1 );
        if (n == -1) break;
        u += String.fromCharCode((15 & r) << 4 | (60 & n) >> 2);
        do {
            if (o = 255 & e.charCodeAt(i++), 61 == o) return u;
            o = l[o]
        } while ( i < a && o == - 1 );
        if (o == -1) break;
        u += String.fromCharCode((3 & n) << 6 | o)
    }
    return u
}

var main_url = "aHR0cDovL3Y0LnBzdGF0cC5jb20vMmM4OTJjZTdkYWMxNmE4MTVmMmZmNjgzNDE0N2I1MjgvNTgy\nOTIwMGQvdmlkZW8vYy9kNzc1NjllMmM2Mzc0MDcxODBlNTQxMGQ4OWE4YTFiNi8=\n"
video_url = base64decode(main_url)
console.log(video_url)