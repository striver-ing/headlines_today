!
function(e) {
    function t(n) {
        if (r[n]) return r[n].exports;
        var o = r[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(o.exports, o, o.exports, t),
        o.loaded = !0,
        o.exports
    }
    var r = {};
    return t.m = e,
    t.c = r,
    t.p = "",
    t(0)
} ([function(e, t, r) {
    "use strict";
    var n = r(1);
    r(158),
    r(159),
    r(160),
    window.Player = n.Player
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Player = void 0;
    var i = Object.assign ||
    function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    },
    a = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    u = r(2),
    l = n(u),
    s = r(156),
    c = n(s),
    f = r(157),
    p = n(f),
    d = function() {
        function e(t) {
            o(this, e);
            var r = {
                preload: "auto",
                controls: !0,
                poster: "",
                autoplay: !1,
                loop: !1,
                width: 640,
                height: 320,
                pluginSwitcher: !1,
                pluginThreater: !1,
                id: "",
                remoteURL: "http://i.snssdk.com/video/urls/v/1/toutiao/mp4/",
                videoID: "",
                type: "video_2,video_1,video_3"
            };
            this.config = i(r, t)
        }
        return a(e, [{
            key: "createVideo",
            value: function(e) {
                var t = document.createElement("video"),
                r = document.createElement("source");
                return r.setAttribute("type", "video/mp4"),
                r.setAttribute("src", e),
                t.appendChild(r),
                t.setAttribute("class", "video-js"),
                this.video = t
            }
        },
        {
            key: "insertVideo",
            value: function(e, t) {
                var r = this,
                n = document.getElementById(r.config.id);
                n && (n.innerHTML = "", n.appendChild(e), t && c["default"].isFunction(t) && t.call(r, e))
            }
        },
        {
            key: "getVideos",
            value: function(e) {
                var t = this,
                r = [],
                n = void 0,
                o = void 0,
                i = void 0;
                t.config.videoID && (o = c["default"].crc32(t.config.remoteURL + t.config.videoID), +
                function() {
                    c["default"].jsonp(o,
                    function(o) {
                        var a = o.data.status;
                        if (0 == o.code && 10 == a) {
                            var u = o.data.video_list;
                            for (var l in u) n = u[l],
                            r.push({
                                src: p["default"].base64decode(n.main_url),
                                type: "video/" + n.vtype,
                                label: n.definition.replace("360p", "极速").replace("480p", "高清").replace("720p", "超清"),
                                res: n.vheight
                            });
                            t.videoList = r,
                            e && e instanceof Function && e.call(t)
                        } else {
                            var s = {
                                20 : "转码失败",
                                30 : "转码进行中",
                                40 : "视频id不存在",
                                0 : "unknown",
                                1 : "上传中",
                                2 : "上传失败",
                                3 : "等待上传",
                                101 : "视频被屏蔽",
                                102 : "视频被删除",
                                103 : "视频永久删除"
                            },
                            c = s[a + ""];
                            i = document.getElementById(t.config.id),
                            i && (i.innerHTML = "<p>" + c + "</p>")
                        }
                    })
                } ())
            }
        },
        {
            key: "definition",
            value: function(e) {
                if (!sessionStorage) return "low";
                if (e) sessionStorage.setItem("definition", e);
                else {
                    for (var t = sessionStorage.getItem("definition"), r = this.videoList, n = void 0, o = 0, i = r.length; o < i; o++) if (r[o].label == t) return n = r[o].res;
                    if (!n) return "high"
                }
            }
        },
        {
            key: "play",
            value: function() {
                var e = this,
                t = (e.config, e.definition()),
                r = void 0;
                r = e.createVideo("");
                var n = {};
                e.config.pluginSwitcher && (n.videoJsResolutionSwitcher = {
                    "default": t,
                    dynamicLabel: !0
                }),
                e.config.pluginThreater && (n.videoJsTheaterMode = {
                    click: e.config.pluginThreater.click,
                    isThreater: e.config.pluginThreater.isThreater
                }),
                e.insertVideo(r,
                function(t) {
                    e._video = (0, l["default"])(t, {
                        preload: e.config.preload,
                        controls: e.config.controls,
                        poster: e.config.poster,
                        autoplay: !1,
                        loop: e.config.loop,
                        width: e.config.width,
                        height: e.config.height,
                        plugins: n,
                        reporter: e.config.reporter,
                        defaultVolume: e.config.defaultVolume,
                        swf: "http://s2.pstatp.com/site/video/player.swf"
                    },
                    function() {
                        var t = this;
                        this.on("loadeddata",
                        function() {}),
                        e.config.pluginSwitcher ? this.updateSrc(e.videoList) : this.src(e.videoList[0].src),
                        e.config.autoplay && this.play && this.play(),
                        this.on("resolutionchange",
                        function(t, r) {
                            e.definition(r)
                        }),
                        this.on("ended",
                        function() {
                            e.config.ended && e.config.ended instanceof Function && e.config.ended.call(t)
                        }),
                        this.on("play",
                        function() {
                            e.config.play && e.config.play instanceof Function && e.config.play.call(t)
                        })
                    })
                })
            }
        },
        {
            key: "start",
            value: function() {
                var e = this;
                e.getVideos(e.play)
            }
        }]),
        e
    } ();
    t.Player = d
},
function(e, t, r) {
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r,
        e
    }
    function a(e, t, r) {
        var n = void 0;
        if ("string" == typeof e) {
            if (0 === e.indexOf("#") && (e = e.slice(1)), a.getPlayers()[e]) return t && V["default"].warn('Player "' + e + '" is already initialised. Options will not be applied.'),
            r && a.getPlayers()[e].ready(r),
            a.getPlayers()[e];
            n = U.getEl(e)
        } else n = e;
        if (!n || !n.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return n.player || w["default"].players[n.playerId] || new w["default"](n, t, r)
    }
    var u, l;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = ("function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    r(3)),
    c = o(s),
    f = r(4),
    p = o(f),
    d = r(6),
    h = n(d),
    y = r(13),
    v = n(y),
    _ = r(14),
    b = o(_),
    g = r(54),
    m = o(g),
    O = r(7),
    k = n(O),
    j = r(55),
    w = o(j),
    T = r(152),
    P = o(T),
    E = r(17),
    C = o(E),
    S = r(15),
    x = n(S),
    M = r(76),
    A = o(M),
    I = r(153),
    D = o(I),
    F = r(154),
    R = o(F),
    N = r(56),
    L = r(107),
    B = o(L),
    H = r(10),
    V = o(H),
    $ = r(8),
    U = n($),
    W = r(11),
    z = n(W),
    G = r(80),
    q = n(G),
    X = r(155),
    K = o(X),
    Y = r(18),
    J = o(Y),
    Q = r(81),
    Z = o(Q),
    ee = r(74),
    te = o(ee);
    if ("undefined" == typeof HTMLVideoElement && (p["default"].createElement("video"), p["default"].createElement("audio"), p["default"].createElement("track")), c["default"].VIDEOJS_NO_DYNAMIC_STYLE !== !0) {
        var re = U.$(".vjs-styles-defaults");
        if (!re) {
            re = v.createStyleElement("vjs-styles-defaults");
            var ne = U.$("head");
            ne && ne.insertBefore(re, ne.firstChild),
            v.setTextContent(re, "\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")
        }
    }
    h.autoSetupTimeout(1, a),
    a.VERSION = "5.12.1",
    a.options = w["default"].prototype.options_,
    a.getPlayers = function() {
        return w["default"].players
    },
    a.players = w["default"].players,
    a.getComponent = b["default"].getComponent,
    a.registerComponent = function(e, t) {
        te["default"].isTech(t) && V["default"].warn("The " + e + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"),
        b["default"].registerComponent.call(b["default"], e, t)
    },
    a.getTech = te["default"].getTech,
    a.registerTech = te["default"].registerTech,
    a.browser = z,
    a.TOUCH_ENABLED = z.TOUCH_ENABLED,
    a.extend = K["default"],
    a.mergeOptions = C["default"],
    a.bind = x.bind,
    a.plugin = P["default"],
    a.addLanguage = function(e, t) {
        return e = ("" + e).toLowerCase(),
        (0, J["default"])(a.options.languages, i({},
        e, t))[e]
    },
    a.log = V["default"],
    a.createTimeRange = a.createTimeRanges = N.createTimeRanges,
    a.formatTime = B["default"],
    a.parseUrl = q.parseUrl,
    a.isCrossOrigin = q.isCrossOrigin,
    a.EventTarget = m["default"],
    a.on = k.on,
    a.one = k.one,
    a.off = k.off,
    a.trigger = k.trigger,
    a.xhr = Z["default"],
    a.TextTrack = A["default"],
    a.AudioTrack = D["default"],
    a.VideoTrack = R["default"],
    a.isEl = U.isEl,
    a.isTextNode = U.isTextNode,
    a.createEl = U.createEl,
    a.hasClass = U.hasElClass,
    a.addClass = U.addElClass,
    a.removeClass = U.removeElClass,
    a.toggleClass = U.toggleElClass,
    a.setAttributes = U.setElAttributes,
    a.getAttributes = U.getElAttributes,
    a.emptyEl = U.emptyEl,
    a.appendContent = U.appendContent,
    a.insertContent = U.insertContent,
    u = [],
    l = function() {
        return a
    }.apply(t, u),
    !(void 0 !== l && (e.exports = l)),
    t["default"] = a
},
function(e, t) { (function(t) {
        "use strict";
        "undefined" != typeof window ? e.exports = window: "undefined" != typeof t ? e.exports = t: "undefined" != typeof self ? e.exports = self: e.exports = {}
    }).call(t,
    function() {
        return this
    } ())
},
function(e, t, r) { (function(t) {
        "use strict";
        var n = "undefined" != typeof t ? t: "undefined" != typeof window ? window: {},
        o = r(5);
        if ("undefined" != typeof document) e.exports = document;
        else {
            var i = n["__GLOBAL_DOCUMENT_CACHE@4"];
            i || (i = n["__GLOBAL_DOCUMENT_CACHE@4"] = o),
            e.exports = i
        }
    }).call(t,
    function() {
        return this
    } ())
},
function(e, t) {},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function i(e, t) {
        t && (d = t),
        setTimeout(h, e)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.hasLoaded = t.autoSetupTimeout = t.autoSetup = void 0;
    var a = r(7),
    u = o(a),
    l = r(4),
    s = n(l),
    c = r(3),
    f = n(c),
    p = !1,
    d = void 0,
    h = function() {
        var e = s["default"].getElementsByTagName("video"),
        t = s["default"].getElementsByTagName("audio"),
        r = [];
        if (e && e.length > 0) for (var n = 0,
        o = e.length; n < o; n++) r.push(e[n]);
        if (t && t.length > 0) for (var a = 0,
        u = t.length; a < u; a++) r.push(t[a]);
        if (r && r.length > 0) for (var l = 0,
        c = r.length; l < c; l++) {
            var f = r[l];
            if (!f || !f.getAttribute) {
                i(1);
                break
            }
            if (void 0 === f.player) {
                var h = f.getAttribute("data-setup");
                null !== h && d(f)
            }
        } else p || i(1)
    };
    "complete" === s["default"].readyState ? p = !0 : u.one(f["default"], "load",
    function() {
        p = !0
    });
    var y = function() {
        return p
    };
    t.autoSetup = h,
    t.autoSetupTimeout = i,
    t.hasLoaded = y
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function i(e, t) {
        var r = d.getElData(e);
        0 === r.handlers[t].length && (delete r.handlers[t], e.removeEventListener ? e.removeEventListener(t, r.dispatcher, !1) : e.detachEvent && e.detachEvent("on" + t, r.dispatcher)),
        Object.getOwnPropertyNames(r.handlers).length <= 0 && (delete r.handlers, delete r.dispatcher, delete r.disabled),
        0 === Object.getOwnPropertyNames(r).length && d.removeElData(e)
    }
    function a(e, t, r, n) {
        r.forEach(function(r) {
            e(t, r, n)
        })
    }
    function u(e) {
        function t() {
            return ! 0
        }
        function r() {
            return ! 1
        }
        return e && e.isPropagationStopped || !
        function() {
            var n = e || g["default"].event;
            e = {};
            for (var o in n)"layerX" !== o && "layerY" !== o && "keyLocation" !== o && "webkitMovementX" !== o && "webkitMovementY" !== o && ("returnValue" === o && n.preventDefault || (e[o] = n[o]));
            if (e.target || (e.target = e.srcElement || O["default"]), e.relatedTarget || (e.relatedTarget = e.fromElement === e.target ? e.toElement: e.fromElement), e.preventDefault = function() {
                n.preventDefault && n.preventDefault(),
                e.returnValue = !1,
                n.returnValue = !1,
                e.defaultPrevented = !0
            },
            e.defaultPrevented = !1, e.stopPropagation = function() {
                n.stopPropagation && n.stopPropagation(),
                e.cancelBubble = !0,
                n.cancelBubble = !0,
                e.isPropagationStopped = t
            },
            e.isPropagationStopped = r, e.stopImmediatePropagation = function() {
                n.stopImmediatePropagation && n.stopImmediatePropagation(),
                e.isImmediatePropagationStopped = t,
                e.stopPropagation()
            },
            e.isImmediatePropagationStopped = r, null !== e.clientX && void 0 !== e.clientX) {
                var i = O["default"].documentElement,
                a = O["default"].body;
                e.pageX = e.clientX + (i && i.scrollLeft || a && a.scrollLeft || 0) - (i && i.clientLeft || a && a.clientLeft || 0),
                e.pageY = e.clientY + (i && i.scrollTop || a && a.scrollTop || 0) - (i && i.clientTop || a && a.clientTop || 0)
            }
            e.which = e.charCode || e.keyCode,
            null !== e.button && void 0 !== e.button && (e.button = 1 & e.button ? 0 : 4 & e.button ? 1 : 2 & e.button ? 2 : 0)
        } (),
        e
    }
    function l(e, t, r) {
        if (Array.isArray(t)) return a(l, e, t, r);
        var n = d.getElData(e);
        n.handlers || (n.handlers = {}),
        n.handlers[t] || (n.handlers[t] = []),
        r.guid || (r.guid = y.newGUID()),
        n.handlers[t].push(r),
        n.dispatcher || (n.disabled = !1, n.dispatcher = function(t, r) {
            if (!n.disabled) {
                t = u(t);
                var o = n.handlers[t.type];
                if (o) for (var i = o.slice(0), a = 0, l = i.length; a < l && !t.isImmediatePropagationStopped(); a++) try {
                    i[a].call(e, t, r)
                } catch(s) {
                    _["default"].error(s)
                }
            }
        }),
        1 === n.handlers[t].length && (e.addEventListener ? e.addEventListener(t, n.dispatcher, !1) : e.attachEvent && e.attachEvent("on" + t, n.dispatcher))
    }
    function s(e, t, r) {
        if (d.hasElData(e)) {
            var n = d.getElData(e);
            if (n.handlers) {
                if (Array.isArray(t)) return a(s, e, t, r);
                var o = function(t) {
                    n.handlers[t] = [],
                    i(e, t)
                };
                if (t) {
                    var u = n.handlers[t];
                    if (u) {
                        if (!r) return void o(t);
                        if (r.guid) for (var l = 0; l < u.length; l++) u[l].guid === r.guid && u.splice(l--, 1);
                        i(e, t)
                    }
                } else for (var c in n.handlers) o(c)
            }
        }
    }
    function c(e, t, r) {
        var n = d.hasElData(e) ? d.getElData(e) : {},
        o = e.parentNode || e.ownerDocument;
        if ("string" == typeof t && (t = {
            type: t,
            target: e
        }), t = u(t), n.dispatcher && n.dispatcher.call(e, t, r), o && !t.isPropagationStopped() && t.bubbles === !0) c.call(null, o, t, r);
        else if (!o && !t.defaultPrevented) {
            var i = d.getElData(t.target);
            t.target[t.type] && (i.disabled = !0, "function" == typeof t.target[t.type] && t.target[t.type](), i.disabled = !1)
        }
        return ! t.defaultPrevented
    }
    function f(e, t, r) {
        if (Array.isArray(t)) return a(f, e, t, r);
        var n = function o() {
            s(e, t, o),
            r.apply(this, arguments)
        };
        n.guid = r.guid = r.guid || y.newGUID(),
        l(e, t, n)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.fixEvent = u,
    t.on = l,
    t.off = s,
    t.trigger = c,
    t.one = f;
    var p = r(8),
    d = o(p),
    h = r(9),
    y = o(h),
    v = r(10),
    _ = n(v),
    b = r(3),
    g = n(b),
    m = r(4),
    O = n(m)
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(t)
            }
        }))
    }
    function a(e) {
        return "string" == typeof e && /\S/.test(e)
    }
    function u(e) {
        if (/\s/.test(e)) throw new Error("class has illegal whitespace characters")
    }
    function l(e) {
        return new RegExp("(^|\\s)" + e + "($|\\s)")
    }
    function s(e) {
        return !! e && "object" === ("undefined" == typeof e ? "undefined": I(e)) && 1 === e.nodeType
    }
    function c(e) {
        return function(t, r) {
            if (!a(t)) return R["default"][e](null);
            a(r) && (r = R["default"].querySelector(r));
            var n = s(r) ? r: R["default"];
            return n[e] && n[e](t)
        }
    }
    function f(e) {
        return 0 === e.indexOf("#") && (e = e.slice(1)),
        R["default"].getElementById(e)
    }
    function p() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "div": arguments[0],
        t = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
        r = arguments.length <= 2 || void 0 === arguments[2] ? {}: arguments[2],
        n = R["default"].createElement(e);
        return Object.getOwnPropertyNames(t).forEach(function(e) {
            var r = t[e];
            e.indexOf("aria-") !== -1 || "role" === e || "type" === e ? ($["default"].warn((0, W["default"])(D, e, r)), n.setAttribute(e, r)) : n[e] = r
        }),
        Object.getOwnPropertyNames(r).forEach(function(e) {
            n.setAttribute(e, r[e])
        }),
        n
    }
    function d(e, t) {
        "undefined" == typeof e.textContent ? e.innerText = t: e.textContent = t
    }
    function h(e, t) {
        t.firstChild ? t.insertBefore(e, t.firstChild) : t.appendChild(e)
    }
    function y(e) {
        var t = e[G];
        return t || (t = e[G] = H.newGUID()),
        z[t] || (z[t] = {}),
        z[t]
    }
    function v(e) {
        var t = e[G];
        return !! t && !!Object.getOwnPropertyNames(z[t]).length
    }
    function _(e) {
        var t = e[G];
        if (t) {
            delete z[t];
            try {
                delete e[G]
            } catch(r) {
                e.removeAttribute ? e.removeAttribute(G) : e[G] = null
            }
        }
    }
    function b(e, t) {
        return e.classList ? e.classList.contains(t) : (u(t), l(t).test(e.className))
    }
    function g(e, t) {
        return e.classList ? e.classList.add(t) : b(e, t) || (e.className = (e.className + " " + t).trim()),
        e
    }
    function m(e, t) {
        return e.classList ? e.classList.remove(t) : (u(t), e.className = e.className.split(/\s+/).filter(function(e) {
            return e !== t
        }).join(" ")),
        e
    }
    function O(e, t, r) {
        var n = b(e, t);
        if ("function" == typeof r && (r = r(e, t)), "boolean" != typeof r && (r = !n), r !== n) return r ? g(e, t) : m(e, t),
        e
    }
    function k(e, t) {
        Object.getOwnPropertyNames(t).forEach(function(r) {
            var n = t[r];
            null === n || "undefined" == typeof n || n === !1 ? e.removeAttribute(r) : e.setAttribute(r, n === !0 ? "": n)
        })
    }
    function j(e) {
        var t = {},
        r = ",autoplay,controls,loop,muted,default,";
        if (e && e.attributes && e.attributes.length > 0) for (var n = e.attributes,
        o = n.length - 1; o >= 0; o--) {
            var i = n[o].name,
            a = n[o].value;
            "boolean" != typeof e[i] && r.indexOf("," + i + ",") === -1 || (a = null !== a),
            t[i] = a
        }
        return t
    }
    function w() {
        R["default"].body.focus(),
        R["default"].onselectstart = function() {
            return ! 1
        }
    }
    function T() {
        R["default"].onselectstart = function() {
            return ! 0
        }
    }
    function P(e) {
        var t = void 0;
        if (e.getBoundingClientRect && e.parentNode && (t = e.getBoundingClientRect()), !t) return {
            left: 0,
            top: 0
        };
        var r = R["default"].documentElement,
        n = R["default"].body,
        o = r.clientLeft || n.clientLeft || 0,
        i = L["default"].pageXOffset || n.scrollLeft,
        a = t.left + i - o,
        u = r.clientTop || n.clientTop || 0,
        l = L["default"].pageYOffset || n.scrollTop,
        s = t.top + l - u;
        return {
            left: Math.round(a),
            top: Math.round(s)
        }
    }
    function E(e, t) {
        var r = {},
        n = P(e),
        o = e.offsetWidth,
        i = e.offsetHeight,
        a = n.top,
        u = n.left,
        l = t.pageY,
        s = t.pageX;
        return t.changedTouches && (s = t.changedTouches[0].pageX, l = t.changedTouches[0].pageY),
        r.y = Math.max(0, Math.min(1, (a - l + i) / i)),
        r.x = Math.max(0, Math.min(1, (s - u) / o)),
        r
    }
    function C(e) {
        return !! e && "object" === ("undefined" == typeof e ? "undefined": I(e)) && 3 === e.nodeType
    }
    function S(e) {
        for (; e.firstChild;) e.removeChild(e.firstChild);
        return e
    }
    function x(e) {
        return "function" == typeof e && (e = e()),
        (Array.isArray(e) ? e: [e]).map(function(e) {
            return "function" == typeof e && (e = e()),
            s(e) || C(e) ? e: "string" == typeof e && /\S/.test(e) ? R["default"].createTextNode(e) : void 0
        }).filter(function(e) {
            return e
        })
    }
    function M(e, t) {
        return x(t).forEach(function(t) {
            return e.appendChild(t)
        }),
        e
    }
    function A(e, t) {
        return M(S(e), t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.$$ = t.$ = void 0;
    var I = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    D = i(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."], ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."]);
    t.isEl = s,
    t.getEl = f,
    t.createEl = p,
    t.textContent = d,
    t.insertElFirst = h,
    t.getElData = y,
    t.hasElData = v,
    t.removeElData = _,
    t.hasElClass = b,
    t.addElClass = g,
    t.removeElClass = m,
    t.toggleElClass = O,
    t.setElAttributes = k,
    t.getElAttributes = j,
    t.blockTextSelection = w,
    t.unblockTextSelection = T,
    t.findElPosition = P,
    t.getPointerPosition = E,
    t.isTextNode = C,
    t.emptyEl = S,
    t.normalizeContent = x,
    t.appendContent = M,
    t.insertContent = A;
    var F = r(4),
    R = o(F),
    N = r(3),
    L = o(N),
    B = r(9),
    H = n(B),
    V = r(10),
    $ = o(V),
    U = r(12),
    W = o(U),
    z = {},
    G = "vdata" + (new Date).getTime();
    t.$ = c("querySelector"),
    t.$$ = c("querySelectorAll")
},
function(e, t) {
    "use strict";
    function r() {
        return n++
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.newGUID = r;
    var n = 1
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.logByType = void 0;
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    i = r(3),
    a = n(i),
    u = r(11),
    l = void 0,
    s = t.logByType = function(e, t) {
        var r = arguments.length <= 2 || void 0 === arguments[2] ? !!u.IE_VERSION && u.IE_VERSION < 11 : arguments[2],
        n = a["default"].console && a["default"].console[e] ||
        function() {};
        "log" !== e && t.unshift(e.toUpperCase() + ":"),
        l.history.push(t),
        t.unshift("VIDEOJS:"),
        r && (t = t.map(function(e) {
            if (e && "object" === ("undefined" == typeof e ? "undefined": o(e)) || Array.isArray(e)) try {
                return JSON.stringify(e)
            } catch(t) {
                return String(e)
            }
            return String(e)
        }).join(" ")),
        n.apply ? n[Array.isArray(t) ? "apply": "call"](console, t) : n(t)
    };
    l = function() {
        for (var e = arguments.length,
        t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        s("log", t)
    },
    l.history = [],
    l.error = function() {
        for (var e = arguments.length,
        t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return s("error", t)
    },
    l.warn = function() {
        for (var e = arguments.length,
        t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return s("warn", t)
    },
    t["default"] = l
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.BACKGROUND_SIZE_SUPPORTED = t.TOUCH_ENABLED = t.IE_VERSION = t.IS_IE8 = t.IS_CHROME = t.IS_EDGE = t.IS_FIREFOX = t.IS_NATIVE_ANDROID = t.IS_OLD_ANDROID = t.ANDROID_VERSION = t.IS_ANDROID = t.IOS_VERSION = t.IS_IOS = t.IS_IPOD = t.IS_IPHONE = t.IS_IPAD = void 0;
    var o = r(4),
    i = n(o),
    a = r(3),
    u = n(a),
    l = u["default"].navigator && u["default"].navigator.userAgent || "",
    s = /AppleWebKit\/([\d.]+)/i.exec(l),
    c = s ? parseFloat(s.pop()) : null,
    f = t.IS_IPAD = /iPad/i.test(l),
    p = t.IS_IPHONE = /iPhone/i.test(l) && !f,
    d = t.IS_IPOD = /iPod/i.test(l),
    h = (t.IS_IOS = p || f || d, t.IOS_VERSION = function() {
        var e = l.match(/OS (\d+)_/i);
        return e && e[1] ? e[1] : null
    } (), t.IS_ANDROID = /Android/i.test(l)),
    y = t.ANDROID_VERSION = function() {
        var e = l.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
        if (!e) return null;
        var t = e[1] && parseFloat(e[1]),
        r = e[2] && parseFloat(e[2]);
        return t && r ? parseFloat(e[1] + "." + e[2]) : t ? t: null
    } (),
    v = (t.IS_OLD_ANDROID = h && /webkit/i.test(l) && y < 2.3, t.IS_NATIVE_ANDROID = h && y < 5 && c < 537, t.IS_FIREFOX = /Firefox/i.test(l), t.IS_EDGE = /Edge/i.test(l));
    t.IS_CHROME = !v && /Chrome/i.test(l),
    t.IS_IE8 = /MSIE\s8\.0/.test(l),
    t.IE_VERSION = function(e) {
        return e && parseFloat(e[1])
    } (/MSIE\s(\d+)\.\d/.exec(l)),
    t.TOUCH_ENABLED = !!("ontouchstart" in u["default"] || u["default"].DocumentTouch && i["default"] instanceof u["default"].DocumentTouch),
    t.BACKGROUND_SIZE_SUPPORTED = "backgroundSize" in i["default"].createElement("video").style
},
function(e, t) {
    "use strict";
    function r(e) {
        return e.replace(/\n\r?\s*/g, "")
    }
    e.exports = function(e) {
        for (var t = "",
        n = 0; n < arguments.length; n++) t += r(e[n]) + (arguments[n + 1] || "");
        return t
    }
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.setTextContent = t.createStyleElement = void 0;
    var o = r(4),
    i = n(o);
    t.createStyleElement = function(e) {
        var t = i["default"].createElement("style");
        return t.className = e,
        t
    },
    t.setTextContent = function(e, t) {
        e.styleSheet ? e.styleSheet.cssText = t: e.textContent = t
    }
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    u = r(3),
    l = o(u),
    s = r(8),
    c = n(s),
    f = r(15),
    p = n(f),
    d = r(9),
    h = n(d),
    y = r(7),
    v = n(y),
    _ = r(10),
    b = o(_),
    g = r(16),
    m = o(g),
    O = r(17),
    k = o(O),
    j = function() {
        function e(t, r, n) {
            if (i(this, e), !t && this.play ? this.player_ = t = this: this.player_ = t, this.options_ = (0, k["default"])({},
            this.options_), r = this.options_ = (0, k["default"])(this.options_, r), this.id_ = r.id || r.el && r.el.id, !this.id_) {
                var o = t && t.id && t.id() || "no_player";
                this.id_ = o + "_component_" + h.newGUID()
            }
            this.name_ = r.name || null,
            r.el ? this.el_ = r.el: r.createEl !== !1 && (this.el_ = this.createEl()),
            this.children_ = [],
            this.childIndex_ = {},
            this.childNameIndex_ = {},
            r.initChildren !== !1 && this.initChildren(),
            this.ready(n),
            r.reportTouchActivity !== !1 && this.enableTouchActivity()
        }
        return a(e, [{
            key: "dispose",
            value: function() {
                if (this.trigger({
                    type: "dispose",
                    bubbles: !1
                }), this.children_) for (var e = this.children_.length - 1; e >= 0; e--) this.children_[e].dispose && this.children_[e].dispose();
                this.children_ = null,
                this.childIndex_ = null,
                this.childNameIndex_ = null,
                this.off(),
                this.el_.parentNode && this.el_.parentNode.removeChild(this.el_),
                c.removeElData(this.el_),
                this.el_ = null
            }
        },
        {
            key: "player",
            value: function() {
                return this.player_
            }
        },
        {
            key: "options",
            value: function(e) {
                return b["default"].warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),
                e ? (this.options_ = (0, k["default"])(this.options_, e), this.options_) : this.options_
            }
        },
        {
            key: "el",
            value: function() {
                return this.el_
            }
        },
        {
            key: "createEl",
            value: function(e, t, r) {
                return c.createEl(e, t, r)
            }
        },
        {
            key: "localize",
            value: function(e) {
                var t = this.player_.language && this.player_.language(),
                r = this.player_.languages && this.player_.languages();
                if (!t || !r) return e;
                var n = r[t];
                if (n && n[e]) return n[e];
                var o = t.split("-")[0],
                i = r[o];
                return i && i[e] ? i[e] : e
            }
        },
        {
            key: "contentEl",
            value: function() {
                return this.contentEl_ || this.el_
            }
        },
        {
            key: "id",
            value: function() {
                return this.id_
            }
        },
        {
            key: "name",
            value: function() {
                return this.name_
            }
        },
        {
            key: "children",
            value: function() {
                return this.children_
            }
        },
        {
            key: "getChildById",
            value: function(e) {
                return this.childIndex_[e]
            }
        },
        {
            key: "getChild",
            value: function(e) {
                return this.childNameIndex_[e]
            }
        },
        {
            key: "addChild",
            value: function(t) {
                var r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
                n = arguments.length <= 2 || void 0 === arguments[2] ? this.children_.length: arguments[2],
                o = void 0,
                i = void 0;
                if ("string" == typeof t) {
                    i = t,
                    r || (r = {}),
                    r === !0 && (b["default"].warn("Initializing a child component with `true` is deprecated. Children should be defined in an array when possible, but if necessary use an object instead of `true`."), r = {});
                    var a = r.componentClass || (0, m["default"])(i);
                    r.name = i;
                    var u = e.getComponent(a);
                    if (!u) throw new Error("Component " + a + " does not exist");
                    if ("function" != typeof u) return null;
                    o = new u(this.player_ || this, r)
                } else o = t;
                if (this.children_.splice(n, 0, o), "function" == typeof o.id && (this.childIndex_[o.id()] = o), i = i || o.name && o.name(), i && (this.childNameIndex_[i] = o), "function" == typeof o.el && o.el()) {
                    var l = this.contentEl().children,
                    s = l[n] || null;
                    this.contentEl().insertBefore(o.el(), s)
                }
                return o
            }
        },
        {
            key: "removeChild",
            value: function(e) {
                if ("string" == typeof e && (e = this.getChild(e)), e && this.children_) {
                    for (var t = !1,
                    r = this.children_.length - 1; r >= 0; r--) if (this.children_[r] === e) {
                        t = !0,
                        this.children_.splice(r, 1);
                        break
                    }
                    if (t) {
                        this.childIndex_[e.id()] = null,
                        this.childNameIndex_[e.name()] = null;
                        var n = e.el();
                        n && n.parentNode === this.contentEl() && this.contentEl().removeChild(e.el())
                    }
                }
            }
        },
        {
            key: "initChildren",
            value: function() {
                var t = this,
                r = this.options_.children;
                r && !
                function() {
                    var n = t.options_,
                    o = function(e) {
                        var r = e.name,
                        o = e.opts;
                        if (void 0 !== n[r] && (o = n[r]), o !== !1) {
                            o === !0 && (o = {}),
                            o.playerOptions = t.options_.playerOptions;
                            var i = t.addChild(r, o);
                            i && (t[r] = i)
                        }
                    },
                    i = void 0,
                    a = e.getComponent("Tech");
                    i = Array.isArray(r) ? r: Object.keys(r),
                    i.concat(Object.keys(t.options_).filter(function(e) {
                        return ! i.some(function(t) {
                            return "string" == typeof t ? e === t: e === t.name
                        })
                    })).map(function(e) {
                        var n = void 0,
                        o = void 0;
                        return "string" == typeof e ? (n = e, o = r[n] || t.options_[n] || {}) : (n = e.name, o = e),
                        {
                            name: n,
                            opts: o
                        }
                    }).filter(function(t) {
                        var r = e.getComponent(t.opts.componentClass || (0, m["default"])(t.name));
                        return r && !a.isTech(r)
                    }).forEach(o)
                } ()
            }
        },
        {
            key: "buildCSSClass",
            value: function() {
                return ""
            }
        },
        {
            key: "on",
            value: function(e, t, r) {
                var n = this;
                return "string" == typeof e || Array.isArray(e) ? v.on(this.el_, e, p.bind(this, t)) : !
                function() {
                    var o = e,
                    i = t,
                    a = p.bind(n, r),
                    u = function() {
                        return n.off(o, i, a)
                    };
                    u.guid = a.guid,
                    n.on("dispose", u);
                    var l = function() {
                        return n.off("dispose", u)
                    };
                    l.guid = a.guid,
                    e.nodeName ? (v.on(o, i, a), v.on(o, "dispose", l)) : "function" == typeof e.on && (o.on(i, a), o.on("dispose", l))
                } (),
                this
            }
        },
        {
            key: "off",
            value: function(e, t, r) {
                if (!e || "string" == typeof e || Array.isArray(e)) v.off(this.el_, e, t);
                else {
                    var n = e,
                    o = t,
                    i = p.bind(this, r);
                    this.off("dispose", i),
                    e.nodeName ? (v.off(n, o, i), v.off(n, "dispose", i)) : (n.off(o, i), n.off("dispose", i))
                }
                return this
            }
        },
        {
            key: "one",
            value: function(e, t, r) {
                var n = this,
                o = arguments;
                return "string" == typeof e || Array.isArray(e) ? v.one(this.el_, e, p.bind(this, t)) : !
                function() {
                    var i = e,
                    a = t,
                    u = p.bind(n, r),
                    l = function s() {
                        n.off(i, a, s),
                        u.apply(null, o)
                    };
                    l.guid = u.guid,
                    n.on(i, a, l)
                } (),
                this
            }
        },
        {
            key: "trigger",
            value: function(e, t) {
                return v.trigger(this.el_, e, t),
                this
            }
        },
        {
            key: "ready",
            value: function(e) {
                var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
                return e && (this.isReady_ ? t ? e.call(this) : this.setTimeout(e, 1) : (this.readyQueue_ = this.readyQueue_ || [], this.readyQueue_.push(e))),
                this
            }
        },
        {
            key: "triggerReady",
            value: function() {
                this.isReady_ = !0,
                this.setTimeout(function() {
                    var e = this.readyQueue_;
                    this.readyQueue_ = [],
                    e && e.length > 0 && e.forEach(function(e) {
                        e.call(this)
                    },
                    this),
                    this.trigger("ready")
                },
                1)
            }
        },
        {
            key: "$",
            value: function(e, t) {
                return c.$(e, t || this.contentEl())
            }
        },
        {
            key: "$$",
            value: function(e, t) {
                return c.$$(e, t || this.contentEl())
            }
        },
        {
            key: "hasClass",
            value: function(e) {
                return c.hasElClass(this.el_, e)
            }
        },
        {
            key: "addClass",
            value: function(e) {
                return c.addElClass(this.el_, e),
                this
            }
        },
        {
            key: "removeClass",
            value: function(e) {
                return c.removeElClass(this.el_, e),
                this
            }
        },
        {
            key: "toggleClass",
            value: function(e, t) {
                return c.toggleElClass(this.el_, e, t),
                this
            }
        },
        {
            key: "show",
            value: function() {
                return this.removeClass("vjs-hidden"),
                this
            }
        },
        {
            key: "hide",
            value: function() {
                return this.addClass("vjs-hidden"),
                this
            }
        },
        {
            key: "lockShowing",
            value: function() {
                return this.addClass("vjs-lock-showing"),
                this
            }
        },
        {
            key: "unlockShowing",
            value: function() {
                return this.removeClass("vjs-lock-showing"),
                this
            }
        },
        {
            key: "width",
            value: function(e, t) {
                return this.dimension("width", e, t)
            }
        },
        {
            key: "height",
            value: function(e, t) {
                return this.dimension("height", e, t)
            }
        },
        {
            key: "dimensions",
            value: function(e, t) {
                return this.width(e, !0).height(t)
            }
        },
        {
            key: "dimension",
            value: function(e, t, r) {
                if (void 0 !== t) return null !== t && t === t || (t = 0),
                ("" + t).indexOf("%") !== -1 || ("" + t).indexOf("px") !== -1 ? this.el_.style[e] = t: "auto" === t ? this.el_.style[e] = "": this.el_.style[e] = t + "px",
                r || this.trigger("resize"),
                this;
                if (!this.el_) return 0;
                var n = this.el_.style[e],
                o = n.indexOf("px");
                return o !== -1 ? parseInt(n.slice(0, o), 10) : parseInt(this.el_["offset" + (0, m["default"])(e)], 10)
            }
        },
        {
            key: "currentDimension",
            value: function(e) {
                var t = 0;
                if ("width" !== e && "height" !== e) throw new Error("currentDimension only accepts width or height value");
                if ("function" == typeof l["default"].getComputedStyle) {
                    var r = l["default"].getComputedStyle(this.el_);
                    t = r.getPropertyValue(e) || r[e]
                } else if (this.el_.currentStyle) {
                    var n = "offset" + (0, m["default"])(e);
                    t = this.el_[n]
                }
                return t = parseFloat(t)
            }
        },
        {
            key: "currentDimensions",
            value: function() {
                return {
                    width: this.currentDimension("width"),
                    height: this.currentDimension("height")
                }
            }
        },
        {
            key: "currentWidth",
            value: function() {
                return this.currentDimension("width")
            }
        },
        {
            key: "currentHeight",
            value: function() {
                return this.currentDimension("height")
            }
        },
        {
            key: "emitTapEvents",
            value: function() {
                var e = 0,
                t = null,
                r = 10,
                n = 200,
                o = void 0;
                this.on("touchstart",
                function(r) {
                    1 === r.touches.length && (t = {
                        pageX: r.touches[0].pageX,
                        pageY: r.touches[0].pageY
                    },
                    e = (new Date).getTime(), o = !0)
                }),
                this.on("touchmove",
                function(e) {
                    if (e.touches.length > 1) o = !1;
                    else if (t) {
                        var n = e.touches[0].pageX - t.pageX,
                        i = e.touches[0].pageY - t.pageY,
                        a = Math.sqrt(n * n + i * i);
                        a > r && (o = !1)
                    }
                });
                var i = function() {
                    o = !1
                };
                this.on("touchleave", i),
                this.on("touchcancel", i),
                this.on("touchend",
                function(r) {
                    if (t = null, o === !0) {
                        var i = (new Date).getTime() - e;
                        i < n && (r.preventDefault(), this.trigger("tap"))
                    }
                })
            }
        },
        {
            key: "enableTouchActivity",
            value: function() {
                if (this.player() && this.player().reportUserActivity) {
                    var e = p.bind(this.player(), this.player().reportUserActivity),
                    t = void 0;
                    this.on("touchstart",
                    function() {
                        e(),
                        this.clearInterval(t),
                        t = this.setInterval(e, 250)
                    });
                    var r = function(r) {
                        e(),
                        this.clearInterval(t)
                    };
                    this.on("touchmove", e),
                    this.on("touchend", r),
                    this.on("touchcancel", r)
                }
            }
        },
        {
            key: "setTimeout",
            value: function(e, t) {
                e = p.bind(this, e);
                var r = l["default"].setTimeout(e, t),
                n = function() {
                    this.clearTimeout(r)
                };
                return n.guid = "vjs-timeout-" + r,
                this.on("dispose", n),
                r
            }
        },
        {
            key: "clearTimeout",
            value: function(e) {
                l["default"].clearTimeout(e);
                var t = function() {};
                return t.guid = "vjs-timeout-" + e,
                this.off("dispose", t),
                e
            }
        },
        {
            key: "setInterval",
            value: function(e, t) {
                e = p.bind(this, e);
                var r = l["default"].setInterval(e, t),
                n = function() {
                    this.clearInterval(r)
                };
                return n.guid = "vjs-interval-" + r,
                this.on("dispose", n),
                r
            }
        },
        {
            key: "clearInterval",
            value: function(e) {
                l["default"].clearInterval(e);
                var t = function() {};
                return t.guid = "vjs-interval-" + e,
                this.off("dispose", t),
                e
            }
        }], [{
            key: "registerComponent",
            value: function(t, r) {
                return e.components_ || (e.components_ = {}),
                e.components_[t] = r,
                r
            }
        },
        {
            key: "getComponent",
            value: function(t) {
                return e.components_ && e.components_[t] ? e.components_[t] : l["default"] && l["default"].videojs && l["default"].videojs[t] ? (b["default"].warn("The " + t + " component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"), l["default"].videojs[t]) : void 0
            }
        },
        {
            key: "extend",
            value: function(t) {
                t = t || {},
                b["default"].warn("Component.extend({}) has been deprecated, use videojs.extend(Component, {}) instead");
                var r = t.init || t.init || this.prototype.init || this.prototype.init ||
                function() {},
                n = function() {
                    r.apply(this, arguments)
                };
                n.prototype = Object.create(this.prototype),
                n.prototype.constructor = n,
                n.extend = e.extend;
                for (var o in t) t.hasOwnProperty(o) && (n.prototype[o] = t[o]);
                return n
            }
        }]),
        e
    } ();
    j.registerComponent("Component", j),
    t["default"] = j
},
function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.bind = void 0;
    var n = r(9);
    t.bind = function(e, t, r) {
        t.guid || (t.guid = (0, n.newGUID)());
        var o = function() {
            return t.apply(e, arguments)
        };
        return o.guid = r ? r + "_" + t.guid: t.guid,
        o
    }
},
function(e, t) {
    "use strict";
    function r(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t["default"] = r
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        return !! e && "object" === ("undefined" == typeof e ? "undefined": u(e)) && "[object Object]" === e.toString() && e.constructor === Object
    }
    function i(e, t) {
        return o(t) ? o(e) ? void 0 : a(t) : t
    }
    function a() {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift({}),
        e.push(i),
        s["default"].apply(null, e),
        e[0]
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    };
    t["default"] = a;
    var l = r(18),
    s = n(l)
},
function(e, t, r) {
    "use strict";
    var n = r(19),
    o = r(49),
    i = o(n);
    e.exports = i
},
function(e, t, r) {
    "use strict";
    function n(e, t, r, p, d) {
        if (!l(e)) return e;
        var h = u(t) && (a(t) || c(t)),
        y = h ? void 0 : f(t);
        return o(y || t,
        function(o, a) {
            if (y && (a = o, o = t[a]), s(o)) p || (p = []),
            d || (d = []),
            i(e, t, a, n, r, p, d);
            else {
                var u = e[a],
                l = r ? r(u, o, a, e, t) : void 0,
                c = void 0 === l;
                c && (l = o),
                void 0 === l && (!h || a in e) || !c && (l === l ? l === u: u !== u) || (e[a] = l)
            }
        }),
        e
    }
    var o = r(20),
    i = r(21),
    a = r(33),
    u = r(24),
    l = r(28),
    s = r(30),
    c = r(44),
    f = r(47);
    e.exports = n
},
function(e, t) {
    "use strict";
    function r(e, t) {
        for (var r = -1,
        n = e.length; ++r < n && t(e[r], r, e) !== !1;);
        return e
    }
    e.exports = r
},
function(e, t, r) {
    "use strict";
    function n(e, t, r, n, f, p, d) {
        for (var h = p.length,
        y = t[r]; h--;) if (p[h] == y) return void(e[r] = d[h]);
        var v = e[r],
        _ = f ? f(v, y, r, e, t) : void 0,
        b = void 0 === _;
        b && (_ = y, u(y) && (a(y) || s(y)) ? _ = a(v) ? v: u(v) ? o(v) : [] : l(y) || i(y) ? _ = i(v) ? c(v) : l(v) ? v: {}: b = !1),
        p.push(y),
        d.push(_),
        b ? e[r] = n(_, y, f, p, d) : (_ === _ ? _ !== v: v === v) && (e[r] = _)
    }
    var o = r(22),
    i = r(23),
    a = r(33),
    u = r(24),
    l = r(38),
    s = r(44),
    c = r(45);
    e.exports = n
},
function(e, t) {
    "use strict";
    function r(e, t) {
        var r = -1,
        n = e.length;
        for (t || (t = Array(n)); ++r < n;) t[r] = e[r];
        return t
    }
    e.exports = r
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return i(e) && o(e) && u.call(e, "callee") && !l.call(e, "callee")
    }
    var o = r(24),
    i = r(30),
    a = Object.prototype,
    u = a.hasOwnProperty,
    l = a.propertyIsEnumerable;
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return null != e && i(o(e))
    }
    var o = r(25),
    i = r(32);
    e.exports = n
},
function(e, t, r) {
    "use strict";
    var n = r(26),
    o = n("length");
    e.exports = o
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return function(t) {
            return null == t ? void 0 : o(t)[e]
        }
    }
    var o = r(27);
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (a.unindexedChars && i(e)) {
            for (var t = -1,
            r = e.length,
            n = Object(e); ++t < r;) n[t] = e.charAt(t);
            return n
        }
        return o(e) ? e: Object(e)
    }
    var o = r(28),
    i = r(29),
    a = r(31);
    e.exports = n
},
function(e, t) {
    "use strict";
    function r(e) {
        var t = "undefined" == typeof e ? "undefined": n(e);
        return !! e && ("object" == t || "function" == t)
    }
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    };
    e.exports = r
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return "string" == typeof e || o(e) && u.call(e) == i
    }
    var o = r(30),
    i = "[object String]",
    a = Object.prototype,
    u = a.toString;
    e.exports = n
},
function(e, t) {
    "use strict";
    function r(e) {
        return !! e && "object" == ("undefined" == typeof e ? "undefined": n(e))
    }
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    };
    e.exports = r
},
function(e, t) {
    "use strict";
    var r = Array.prototype,
    n = Error.prototype,
    o = Object.prototype,
    i = o.propertyIsEnumerable,
    a = r.splice,
    u = {}; !
    function(e) {
        var t = function() {
            this.x = e
        },
        r = {
            0 : e,
            length: e
        },
        o = [];
        t.prototype = {
            valueOf: e,
            y: e
        };
        for (var l in new t) o.push(l);
        u.enumErrorProps = i.call(n, "message") || i.call(n, "name"),
        u.enumPrototypes = i.call(t, "prototype"),
        u.nonEnumShadows = !/valueOf/.test(o),
        u.ownLast = "x" != o[0],
        u.spliceObjects = (a.call(r, 0, 1), !r[0]),
        u.unindexedChars = "x" [0] + Object("x")[0] != "xx"
    } (1, 0),
    e.exports = u
},
function(e, t) {
    "use strict";
    function r(e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= n
    }
    var n = 9007199254740991;
    e.exports = r
},
function(e, t, r) {
    "use strict";
    var n = r(34),
    o = r(32),
    i = r(30),
    a = "[object Array]",
    u = Object.prototype,
    l = u.toString,
    s = n(Array, "isArray"),
    c = s ||
    function(e) {
        return i(e) && o(e.length) && l.call(e) == a
    };
    e.exports = c
},
function(e, t, r) {
    "use strict";
    function n(e, t) {
        var r = null == e ? void 0 : e[t];
        return o(r) ? r: void 0
    }
    var o = r(35);
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return null != e && (o(e) ? f.test(s.call(e)) : a(e) && (i(e) ? f: u).test(e))
    }
    var o = r(36),
    i = r(37),
    a = r(30),
    u = /^\[object .+?Constructor\]$/,
    l = Object.prototype,
    s = Function.prototype.toString,
    c = l.hasOwnProperty,
    f = RegExp("^" + s.call(c).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return o(e) && u.call(e) == i
    }
    var o = r(28),
    i = "[object Function]",
    a = Object.prototype,
    u = a.toString;
    e.exports = n
},
function(e, t) {
    "use strict";
    var r = function() {
        try {
            Object({
                toString: 0
            } + "")
        } catch(e) {
            return function() {
                return ! 1
            }
        }
        return function(e) {
            return "function" != typeof e.toString && "string" == typeof(e + "")
        }
    } ();
    e.exports = r
},
function(e, t, r) {
    "use strict";
    function n(e) {
        var t;
        if (!u(e) || p.call(e) != s || a(e) || i(e) || !f.call(e, "constructor") && (t = e.constructor, "function" == typeof t && !(t instanceof t))) return ! 1;
        var r;
        return l.ownLast ? (o(e,
        function(e, t, n) {
            return r = f.call(n, t),
            !1
        }), r !== !1) : (o(e,
        function(e, t) {
            r = t
        }), void 0 === r || f.call(e, r))
    }
    var o = r(39),
    i = r(23),
    a = r(37),
    u = r(30),
    l = r(31),
    s = "[object Object]",
    c = Object.prototype,
    f = c.hasOwnProperty,
    p = c.toString;
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e, t) {
        return o(e, t, i)
    }
    var o = r(40),
    i = r(42);
    e.exports = n
},
function(e, t, r) {
    "use strict";
    var n = r(41),
    o = n();
    e.exports = o
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return function(t, r, n) {
            for (var i = o(t), a = n(t), u = a.length, l = e ? u: -1; e ? l--:++l < u;) {
                var s = a[l];
                if (r(i[s], s, i) === !1) break
            }
            return t
        }
    }
    var o = r(27);
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (null == e) return [];
        c(e) || (e = Object(e));
        var t = e.length;
        t = t && s(t) && (a(e) || i(e) || f(e)) && t || 0;
        for (var r = e.constructor,
        n = -1,
        o = u(r) && r.prototype || w, d = o === e, h = Array(t), y = t > 0, _ = p.enumErrorProps && (e === j || e instanceof Error), b = p.enumPrototypes && u(e); ++n < t;) h[n] = n + "";
        for (var m in e) b && "prototype" == m || _ && ("message" == m || "name" == m) || y && l(m, t) || "constructor" == m && (d || !P.call(e, m)) || h.push(m);
        if (p.nonEnumShadows && e !== w) {
            var S = e === T ? O: e === j ? v: E.call(e),
            x = C[S] || C[g];
            for (S == g && (o = w), t = k.length; t--;) {
                m = k[t];
                var M = x[m];
                d && M || (M ? !P.call(e, m) : e[m] === o[m]) || h.push(m)
            }
        }
        return h
    }
    var o = r(20),
    i = r(23),
    a = r(33),
    u = r(36),
    l = r(43),
    s = r(32),
    c = r(28),
    f = r(29),
    p = r(31),
    d = "[object Array]",
    h = "[object Boolean]",
    y = "[object Date]",
    v = "[object Error]",
    _ = "[object Function]",
    b = "[object Number]",
    g = "[object Object]",
    m = "[object RegExp]",
    O = "[object String]",
    k = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
    j = Error.prototype,
    w = Object.prototype,
    T = String.prototype,
    P = w.hasOwnProperty,
    E = w.toString,
    C = {};
    C[d] = C[y] = C[b] = {
        constructor: !0,
        toLocaleString: !0,
        toString: !0,
        valueOf: !0
    },
    C[h] = C[O] = {
        constructor: !0,
        toString: !0,
        valueOf: !0
    },
    C[v] = C[_] = C[m] = {
        constructor: !0,
        toString: !0
    },
    C[g] = {
        constructor: !0
    },
    o(k,
    function(e) {
        for (var t in C) if (P.call(C, t)) {
            var r = C[t];
            r[e] = P.call(r, e)
        }
    }),
    e.exports = n
},
function(e, t) {
    "use strict";
    function r(e, t) {
        return e = "number" == typeof e || n.test(e) ? +e: -1,
        t = null == t ? o: t,
        e > -1 && e % 1 == 0 && e < t
    }
    var n = /^\d+$/,
    o = 9007199254740991;
    e.exports = r
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return i(e) && o(e.length) && !!S[M.call(e)]
    }
    var o = r(32),
    i = r(30),
    a = "[object Arguments]",
    u = "[object Array]",
    l = "[object Boolean]",
    s = "[object Date]",
    c = "[object Error]",
    f = "[object Function]",
    p = "[object Map]",
    d = "[object Number]",
    h = "[object Object]",
    y = "[object RegExp]",
    v = "[object Set]",
    _ = "[object String]",
    b = "[object WeakMap]",
    g = "[object ArrayBuffer]",
    m = "[object Float32Array]",
    O = "[object Float64Array]",
    k = "[object Int8Array]",
    j = "[object Int16Array]",
    w = "[object Int32Array]",
    T = "[object Uint8Array]",
    P = "[object Uint8ClampedArray]",
    E = "[object Uint16Array]",
    C = "[object Uint32Array]",
    S = {};
    S[m] = S[O] = S[k] = S[j] = S[w] = S[T] = S[P] = S[E] = S[C] = !0,
    S[a] = S[u] = S[g] = S[l] = S[s] = S[c] = S[f] = S[p] = S[d] = S[h] = S[y] = S[v] = S[_] = S[b] = !1;
    var x = Object.prototype,
    M = x.toString;
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return o(e, i(e))
    }
    var o = r(46),
    i = r(42);
    e.exports = n
},
function(e, t) {
    "use strict";
    function r(e, t, r) {
        r || (r = {});
        for (var n = -1,
        o = t.length; ++n < o;) {
            var i = t[n];
            r[i] = e[i]
        }
        return r
    }
    e.exports = r
},
function(e, t, r) {
    "use strict";
    var n = r(34),
    o = r(24),
    i = r(28),
    a = r(48),
    u = r(31),
    l = n(Object, "keys"),
    s = l ?
    function(e) {
        var t = null == e ? void 0 : e.constructor;
        return "function" == typeof t && t.prototype === e || ("function" == typeof e ? u.enumPrototypes: o(e)) ? a(e) : i(e) ? l(e) : []
    }: a;
    e.exports = s
},
function(e, t, r) {
    "use strict";
    function n(e) {
        for (var t = s(e), r = t.length, n = r && e.length, c = !!n && u(n) && (i(e) || o(e) || l(e)), p = -1, d = []; ++p < r;) {
            var h = t[p]; (c && a(h, n) || f.call(e, h)) && d.push(h)
        }
        return d
    }
    var o = r(23),
    i = r(33),
    a = r(43),
    u = r(32),
    l = r(29),
    s = r(42),
    c = Object.prototype,
    f = c.hasOwnProperty;
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return a(function(t, r) {
            var n = -1,
            a = null == t ? 0 : r.length,
            u = a > 2 ? r[a - 2] : void 0,
            l = a > 2 ? r[2] : void 0,
            s = a > 1 ? r[a - 1] : void 0;
            for ("function" == typeof u ? (u = o(u, s, 5), a -= 2) : (u = "function" == typeof s ? s: void 0, a -= u ? 1 : 0), l && i(r[0], r[1], l) && (u = a < 3 ? void 0 : u, a = 1); ++n < a;) {
                var c = r[n];
                c && e(t, c, u)
            }
            return t
        })
    }
    var o = r(50),
    i = r(52),
    a = r(53);
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        if ("function" != typeof e) return o;
        if (void 0 === t) return e;
        switch (r) {
        case 1:
            return function(r) {
                return e.call(t, r)
            };
        case 3:
            return function(r, n, o) {
                return e.call(t, r, n, o)
            };
        case 4:
            return function(r, n, o, i) {
                return e.call(t, r, n, o, i)
            };
        case 5:
            return function(r, n, o, i, a) {
                return e.call(t, r, n, o, i, a)
            }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
    var o = r(51);
    e.exports = n
},
function(e, t) {
    "use strict";
    function r(e) {
        return e
    }
    e.exports = r
},
function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        if (!u(r)) return ! 1;
        var n = "undefined" == typeof t ? "undefined": o(t);
        if ("number" == n ? i(r) && a(t, r.length) : "string" == n && t in r) {
            var l = r[t];
            return e === e ? e === l: l !== l
        }
        return ! 1
    }
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    i = r(24),
    a = r(43),
    u = r(28);
    e.exports = n
},
function(e, t) {
    "use strict";
    function r(e, t) {
        if ("function" != typeof e) throw new TypeError(n);
        return t = o(void 0 === t ? e.length - 1 : +t || 0, 0),
        function() {
            for (var r = arguments,
            n = -1,
            i = o(r.length - t, 0), a = Array(i); ++n < i;) a[n] = r[t + n];
            switch (t) {
            case 0:
                return e.call(this, a);
            case 1:
                return e.call(this, r[0], a);
            case 2:
                return e.call(this, r[0], r[1], a)
            }
            var u = Array(t + 1);
            for (n = -1; ++n < t;) u[n] = r[n];
            return u[t] = a,
            e.apply(this, u)
        }
    }
    var n = "Expected a function",
    o = Math.max;
    e.exports = r
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = r(7),
    i = n(o),
    a = function() {};
    a.prototype.allowedEvents_ = {},
    a.prototype.on = function(e, t) {
        var r = this.addEventListener;
        this.addEventListener = function() {},
        i.on(this, e, t),
        this.addEventListener = r
    },
    a.prototype.addEventListener = a.prototype.on,
    a.prototype.off = function(e, t) {
        i.off(this, e, t)
    },
    a.prototype.removeEventListener = a.prototype.off,
    a.prototype.one = function(e, t) {
        var r = this.addEventListener;
        this.addEventListener = function() {},
        i.one(this, e, t),
        this.addEventListener = r
    },
    a.prototype.trigger = function(e) {
        var t = e.type || e;
        "string" == typeof e && (e = {
            type: t
        }),
        e = i.fixEvent(e),
        this.allowedEvents_[t] && this["on" + t] && this["on" + t](e),
        i.trigger(this, e)
    },
    a.prototype.dispatchEvent = a.prototype.trigger,
    t["default"] = a
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            var r = [],
            n = !0,
            o = !1,
            i = void 0;
            try {
                for (var a, u = e[Symbol.iterator](); ! (n = (a = u.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0);
            } catch(l) {
                o = !0,
                i = l
            } finally {
                try { ! n && u["return"] && u["return"]()
                } finally {
                    if (o) throw i
                }
            }
            return r
        }
        return function(t, r) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, r);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    } (),
    s = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    c = function ne(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : ne(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    f = r(14),
    p = o(f),
    d = r(4),
    h = o(d),
    y = r(3),
    v = o(y),
    _ = r(7),
    b = n(_),
    g = r(8),
    m = n(g),
    O = r(15),
    k = n(O),
    j = r(9),
    w = n(j),
    T = r(11),
    P = n(T),
    E = r(10),
    C = o(E),
    S = r(16),
    x = o(S),
    M = r(56),
    A = r(57),
    I = r(13),
    D = n(I),
    F = r(58),
    R = o(F),
    N = r(59),
    L = o(N),
    B = r(71),
    H = o(B),
    V = r(60),
    $ = o(V),
    U = r(17),
    W = o(U),
    z = r(72),
    G = o(z),
    q = r(73),
    X = o(q),
    K = r(74),
    Y = o(K),
    J = r(92),
    Q = o(J),
    Z = r(91),
    ee = o(Z);
    r(93),
    r(94),
    r(96),
    r(98),
    r(99),
    r(100),
    r(102),
    r(103),
    r(115),
    r(149),
    r(150),
    r(151);
    var te = function(e) {
        function t(e, r, n) {
            if (i(this, t), e.id = e.id || "vjs_video_" + w.newGUID(), r = (0, $["default"])(t.getTagSettings(e), r), r.initChildren = !1, r.createEl = !1, r.reportTouchActivity = !1, !r.language) if ("function" == typeof e.closest) {
                var o = e.closest("[lang]");
                o && (r.language = o.getAttribute("lang"))
            } else for (var u = e; u && 1 === u.nodeType;) {
                if (m.getElAttributes(u).hasOwnProperty("lang")) {
                    r.language = u.getAttribute("lang");
                    break
                }
                u = u.parentNode
            }
            var l = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, null, r, n));
            if (!l.options_ || !l.options_.techOrder || !l.options_.techOrder.length) throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
            l.tag = e,
            l.tagAttributes = e && m.getElAttributes(e),
            l.language(l.options_.language),
            r.languages ? !
            function() {
                var e = {};
                Object.getOwnPropertyNames(r.languages).forEach(function(t) {
                    e[t.toLowerCase()] = r.languages[t]
                }),
                l.languages_ = e
            } () : l.languages_ = t.prototype.options_.languages,
            l.cache_ = {},
            l.poster_ = r.poster || "",
            l.controls_ = !!r.controls,
            e.controls = !1,
            l.scrubbing_ = !1,
            l.el_ = l.createEl();
            var s = (0, W["default"])(l.options_);
            return r.plugins && !
            function() {
                var e = r.plugins;
                Object.getOwnPropertyNames(e).forEach(function(t) {
                    "function" == typeof this[t] ? this[t](e[t]) : C["default"].error("Unable to find plugin:", t)
                },
                l)
            } (),
            l.options_.playerOptions = s,
            l.initChildren(),
            l.isAudio("audio" === e.nodeName.toLowerCase()),
            l.controls() ? l.addClass("vjs-controls-enabled") : l.addClass("vjs-controls-disabled"),
            l.el_.setAttribute("role", "region"),
            l.isAudio() ? l.el_.setAttribute("aria-label", "audio player") : l.el_.setAttribute("aria-label", "video player"),
            l.isAudio() && l.addClass("vjs-audio"),
            l.flexNotSupported_() && l.addClass("vjs-no-flex"),
            P.IS_IOS || l.addClass("vjs-workinghover"),
            t.players[l.id_] = l,
            l.userActive(!0),
            l.reportUserActivity(),
            l.listenForUserActivity_(),
            l.on("fullscreenchange", l.handleFullscreenChange_),
            l.on("stageclick", l.handleStageClick_),
            l
        }
        return u(t, e),
        s(t, [{
            key: "dispose",
            value: function() {
                this.trigger("dispose"),
                this.off("dispose"),
                this.styleEl_ && this.styleEl_.parentNode && this.styleEl_.parentNode.removeChild(this.styleEl_),
                t.players[this.id_] = null,
                this.tag && this.tag.player && (this.tag.player = null),
                this.el_ && this.el_.player && (this.el_.player = null),
                this.tech_ && this.tech_.dispose(),
                c(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "dispose", this).call(this)
            }
        },
        {
            key: "createEl",
            value: function() {
                var e = this.el_ = c(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div"),
                r = this.tag;
                r.removeAttribute("width"),
                r.removeAttribute("height");
                var n = m.getElAttributes(r);
                if (Object.getOwnPropertyNames(n).forEach(function(t) {
                    "class" === t ? e.className = n[t] : e.setAttribute(t, n[t])
                }), r.playerId = r.id, r.id += "_html5_api", r.className = "vjs-tech", r.player = e.player = this, this.addClass("vjs-paused"), v["default"].VIDEOJS_NO_DYNAMIC_STYLE !== !0) {
                    this.styleEl_ = D.createStyleElement("vjs-styles-dimensions");
                    var o = m.$(".vjs-styles-defaults"),
                    i = m.$("head");
                    i.insertBefore(this.styleEl_, o ? o.nextSibling: i.firstChild)
                }
                this.width(this.options_.width),
                this.height(this.options_.height),
                this.fluid(this.options_.fluid),
                this.aspectRatio(this.options_.aspectRatio);
                for (var a = r.getElementsByTagName("a"), u = 0; u < a.length; u++) {
                    var l = a.item(u);
                    m.addElClass(l, "vjs-hidden"),
                    l.setAttribute("hidden", "hidden")
                }
                return r.initNetworkState_ = r.networkState,
                r.parentNode && r.parentNode.insertBefore(e, r),
                m.insertElFirst(r, e),
                this.children_.unshift(r),
                this.el_ = e,
                e
            }
        },
        {
            key: "width",
            value: function(e) {
                return this.dimension("width", e)
            }
        },
        {
            key: "height",
            value: function(e) {
                return this.dimension("height", e)
            }
        },
        {
            key: "dimension",
            value: function(e, t) {
                var r = e + "_";
                if (void 0 === t) return this[r] || 0;
                if ("" === t) this[r] = void 0;
                else {
                    var n = parseFloat(t);
                    if (isNaN(n)) return C["default"].error('Improper value "' + t + '" supplied for for ' + e),
                    this;
                    this[r] = n
                }
                return this.updateStyleEl_(),
                this
            }
        },
        {
            key: "fluid",
            value: function(e) {
                return void 0 === e ? !!this.fluid_: (this.fluid_ = !!e, void(e ? this.addClass("vjs-fluid") : this.removeClass("vjs-fluid")))
            }
        },
        {
            key: "aspectRatio",
            value: function(e) {
                if (void 0 === e) return this.aspectRatio_;
                if (!/^\d+\:\d+$/.test(e)) throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");
                this.aspectRatio_ = e,
                this.fluid(!0),
                this.updateStyleEl_()
            }
        },
        {
            key: "updateStyleEl_",
            value: function() {
                if (v["default"].VIDEOJS_NO_DYNAMIC_STYLE === !0) {
                    var e = "number" == typeof this.width_ ? this.width_: this.options_.width,
                    t = "number" == typeof this.height_ ? this.height_: this.options_.height,
                    r = this.tech_ && this.tech_.el();
                    return void(r && (e >= 0 && (r.width = e), t >= 0 && (r.height = t)))
                }
                var n = void 0,
                o = void 0,
                i = void 0,
                a = void 0;
                i = void 0 !== this.aspectRatio_ && "auto" !== this.aspectRatio_ ? this.aspectRatio_: this.videoWidth() ? this.videoWidth() + ":" + this.videoHeight() : "16:9";
                var u = i.split(":"),
                l = u[1] / u[0];
                n = void 0 !== this.width_ ? this.width_: void 0 !== this.height_ ? this.height_ / l: this.videoWidth() || 300,
                o = void 0 !== this.height_ ? this.height_: n * l,
                a = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions",
                this.addClass(a),
                D.setTextContent(this.styleEl_, "\n      ." + a + " {\n        width: " + n + "px;\n        height: " + o + "px;\n      }\n\n      ." + a + ".vjs-fluid {\n        padding-top: " + 100 * l + "%;\n      }\n    ")
            }
        },
        {
            key: "loadTech_",
            value: function(e, t) {
                this.tech_ && this.unloadTech_(),
                "Html5" !== e && this.tag && (Y["default"].getTech("Html5").disposeMediaElement(this.tag), this.tag.player = null, this.tag = null),
                this.techName_ = e,
                this.isReady_ = !1;
                var r = (0, $["default"])({
                    source: t,
                    nativeControlsForTouch: this.options_.nativeControlsForTouch,
                    playerId: this.id(),
                    techId: this.id() + "_" + e + "_api",
                    videoTracks: this.videoTracks_,
                    textTracks: this.textTracks_,
                    audioTracks: this.audioTracks_,
                    autoplay: this.options_.autoplay,
                    preload: this.options_.preload,
                    loop: this.options_.loop,
                    muted: this.options_.muted,
                    poster: this.poster(),
                    language: this.language(),
                    "vtt.js": this.options_["vtt.js"]
                },
                this.options_[e.toLowerCase()]);
                this.tag && (r.tag = this.tag),
                t && (this.currentType_ = t.type, t.src === this.cache_.src && this.cache_.currentTime > 0 && (r.startTime = this.cache_.currentTime), this.cache_.src = t.src);
                var n = Y["default"].getTech(e);
                n || (n = p["default"].getComponent(e)),
                this.tech_ = new n(r),
                this.tech_.ready(k.bind(this, this.handleTechReady_), !0),
                G["default"].jsonToTextTracks(this.textTracksJson_ || [], this.tech_),
                this.on(this.tech_, "loadstart", this.handleTechLoadStart_),
                this.on(this.tech_, "waiting", this.handleTechWaiting_),
                this.on(this.tech_, "canplay", this.handleTechCanPlay_),
                this.on(this.tech_, "canplaythrough", this.handleTechCanPlayThrough_),
                this.on(this.tech_, "playing", this.handleTechPlaying_),
                this.on(this.tech_, "ended", this.handleTechEnded_),
                this.on(this.tech_, "seeking", this.handleTechSeeking_),
                this.on(this.tech_, "seeked", this.handleTechSeeked_),
                this.on(this.tech_, "play", this.handleTechPlay_),
                this.on(this.tech_, "firstplay", this.handleTechFirstPlay_),
                this.on(this.tech_, "pause", this.handleTechPause_),
                this.on(this.tech_, "progress", this.handleTechProgress_),
                this.on(this.tech_, "durationchange", this.handleTechDurationChange_),
                this.on(this.tech_, "fullscreenchange", this.handleTechFullscreenChange_),
                this.on(this.tech_, "error", this.handleTechError_),
                this.on(this.tech_, "suspend", this.handleTechSuspend_),
                this.on(this.tech_, "abort", this.handleTechAbort_),
                this.on(this.tech_, "emptied", this.handleTechEmptied_),
                this.on(this.tech_, "stalled", this.handleTechStalled_),
                this.on(this.tech_, "loadedmetadata", this.handleTechLoadedMetaData_),
                this.on(this.tech_, "loadeddata", this.handleTechLoadedData_),
                this.on(this.tech_, "timeupdate", this.handleTechTimeUpdate_),
                this.on(this.tech_, "ratechange", this.handleTechRateChange_),
                this.on(this.tech_, "volumechange", this.handleTechVolumeChange_),
                this.on(this.tech_, "texttrackchange", this.handleTechTextTrackChange_),
                this.on(this.tech_, "loadedmetadata", this.updateStyleEl_),
                this.on(this.tech_, "posterchange", this.handleTechPosterChange_),
                this.on(this.tech_, "textdata", this.handleTechTextData_),
                this.usingNativeControls(this.techGet_("controls")),
                this.controls() && !this.usingNativeControls() && this.addTechControlsListeners_(),
                this.tech_.el().parentNode === this.el() || "Html5" === e && this.tag || m.insertElFirst(this.tech_.el(), this.el()),
                this.tag && (this.tag.player = null, this.tag = null)
            }
        },
        {
            key: "unloadTech_",
            value: function() {
                this.videoTracks_ = this.videoTracks(),
                this.textTracks_ = this.textTracks(),
                this.audioTracks_ = this.audioTracks(),
                this.textTracksJson_ = G["default"].textTracksToJson(this.tech_),
                this.isReady_ = !1,
                this.tech_.dispose(),
                this.tech_ = !1
            }
        },
        {
            key: "tech",
            value: function(e) {
                if (e && e.IWillNotUseThisInPlugins) return this.tech_;
                var t = "\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ";
                throw v["default"].alert(t),
                new Error(t)
            }
        },
        {
            key: "addTechControlsListeners_",
            value: function() {
                this.removeTechControlsListeners_(),
                this.on(this.tech_, "mousedown", this.handleTechClick_),
                this.on(this.tech_, "touchstart", this.handleTechTouchStart_),
                this.on(this.tech_, "touchmove", this.handleTechTouchMove_),
                this.on(this.tech_, "touchend", this.handleTechTouchEnd_),
                this.on(this.tech_, "tap", this.handleTechTap_)
            }
        },
        {
            key: "removeTechControlsListeners_",
            value: function() {
                this.off(this.tech_, "tap", this.handleTechTap_),
                this.off(this.tech_, "touchstart", this.handleTechTouchStart_),
                this.off(this.tech_, "touchmove", this.handleTechTouchMove_),
                this.off(this.tech_, "touchend", this.handleTechTouchEnd_),
                this.off(this.tech_, "mousedown", this.handleTechClick_)
            }
        },
        {
            key: "handleTechReady_",
            value: function() {
                if (this.triggerReady(), this.cache_.volume && this.techCall_("setVolume", this.cache_.volume), this.handleTechPosterChange_(), this.handleTechDurationChange_(), (this.src() || this.currentSrc()) && this.tag && this.options_.autoplay && this.paused()) {
                    try {
                        delete this.tag.poster
                    } catch(e) { (0, C["default"])("deleting tag.poster throws in some browsers", e)
                    }
                    this.play()
                }
            }
        },
        {
            key: "handleTechLoadStart_",
            value: function() {
                this.removeClass("vjs-ended"),
                this.error(null),
                this.paused() ? (this.hasStarted(!1), this.trigger("loadstart")) : (this.trigger("loadstart"), this.trigger("firstplay"))
            }
        },
        {
            key: "hasStarted",
            value: function(e) {
                return void 0 !== e ? (this.hasStarted_ !== e && (this.hasStarted_ = e, e ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started")), this) : !!this.hasStarted_
            }
        },
        {
            key: "handleTechPlay_",
            value: function() {
                this.removeClass("vjs-ended"),
                this.removeClass("vjs-paused"),
                this.addClass("vjs-playing"),
                this.hasStarted(!0),
                this.trigger("play")
            }
        },
        {
            key: "handleTechWaiting_",
            value: function() {
                var e = this;
                this.addClass("vjs-waiting"),
                this.trigger("waiting"),
                this.one("timeupdate",
                function() {
                    return e.removeClass("vjs-waiting")
                })
            }
        },
        {
            key: "handleTechCanPlay_",
            value: function() {
                this.removeClass("vjs-waiting"),
                this.trigger("canplay")
            }
        },
        {
            key: "handleTechCanPlayThrough_",
            value: function() {
                this.removeClass("vjs-waiting"),
                this.trigger("canplaythrough")
            }
        },
        {
            key: "handleTechPlaying_",
            value: function() {
                this.removeClass("vjs-waiting"),
                this.trigger("playing")
            }
        },
        {
            key: "handleTechSeeking_",
            value: function() {
                this.addClass("vjs-seeking"),
                this.trigger("seeking")
            }
        },
        {
            key: "handleTechSeeked_",
            value: function() {
                this.removeClass("vjs-seeking"),
                this.trigger("seeked")
            }
        },
        {
            key: "handleTechFirstPlay_",
            value: function() {
                this.options_.starttime && this.currentTime(this.options_.starttime),
                this.addClass("vjs-has-started"),
                this.trigger("firstplay")
            }
        },
        {
            key: "handleTechPause_",
            value: function() {
                this.removeClass("vjs-playing"),
                this.addClass("vjs-paused"),
                this.trigger("pause")
            }
        },
        {
            key: "handleTechProgress_",
            value: function() {
                this.trigger("progress")
            }
        },
        {
            key: "handleTechEnded_",
            value: function() {
                this.addClass("vjs-ended"),
                this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause(),
                this.trigger("ended")
            }
        },
        {
            key: "handleTechDurationChange_",
            value: function() {
                this.duration(this.techGet_("duration"))
            }
        },
        {
            key: "handleTechClick_",
            value: function(e) {
                0 === e.button && this.controls() && (this.paused() ? this.play() : this.pause())
            }
        },
        {
            key: "handleTechTap_",
            value: function() {
                this.userActive(!this.userActive())
            }
        },
        {
            key: "handleTechTouchStart_",
            value: function() {
                this.userWasActive = this.userActive()
            }
        },
        {
            key: "handleTechTouchMove_",
            value: function() {
                this.userWasActive && this.reportUserActivity()
            }
        },
        {
            key: "handleTechTouchEnd_",
            value: function(e) {
                e.preventDefault()
            }
        },
        {
            key: "handleFullscreenChange_",
            value: function() {
                this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen")
            }
        },
        {
            key: "handleStageClick_",
            value: function(e) {
                this.reportUserActivity(e)
            }
        },
        {
            key: "handleTechFullscreenChange_",
            value: function(e, t) {
                t && this.isFullscreen(t.isFullscreen),
                this.trigger("fullscreenchange")
            }
        },
        {
            key: "handleTechError_",
            value: function() {
                var e = this.tech_.error();
                this.error(e)
            }
        },
        {
            key: "handleTechSuspend_",
            value: function() {
                this.trigger("suspend")
            }
        },
        {
            key: "handleTechAbort_",
            value: function() {
                this.trigger("abort")
            }
        },
        {
            key: "handleTechEmptied_",
            value: function() {
                this.trigger("emptied")
            }
        },
        {
            key: "handleTechStalled_",
            value: function() {
                this.trigger("stalled")
            }
        },
        {
            key: "handleTechLoadedMetaData_",
            value: function() {
                this.trigger("loadedmetadata")
            }
        },
        {
            key: "handleTechTextData_",
            value: function() {
                var e = null;
                arguments.length > 1 && (e = arguments[1]),
                this.trigger("textdata", e)
            }
        },
        {
            key: "handleTechLoadedData_",
            value: function() {
                this.trigger("loadeddata")
            }
        },
        {
            key: "handleTechTimeUpdate_",
            value: function() {
                this.trigger("timeupdate")
            }
        },
        {
            key: "handleTechRateChange_",
            value: function() {
                this.trigger("ratechange")
            }
        },
        {
            key: "handleTechVolumeChange_",
            value: function() {
                this.trigger("volumechange")
            }
        },
        {
            key: "handleTechTextTrackChange_",
            value: function() {
                this.trigger("texttrackchange")
            }
        },
        {
            key: "getCache",
            value: function() {
                return this.cache_
            }
        },
        {
            key: "techCall_",
            value: function(e, t) {
                if (this.tech_ && !this.tech_.isReady_) this.tech_.ready(function() {
                    this[e](t)
                },
                !0);
                else try {
                    this.tech_ && this.tech_[e](t)
                } catch(r) {
                    throw (0, C["default"])(r),
                    r
                }
            }
        },
        {
            key: "techGet_",
            value: function(e) {
                if (this.tech_ && this.tech_.isReady_) try {
                    return this.tech_[e]()
                } catch(t) {
                    throw void 0 === this.tech_[e] ? (0, C["default"])("Video.js: " + e + " method not defined for " + this.techName_ + " playback technology.", t) : "TypeError" === t.name ? ((0, C["default"])("Video.js: " + e + " unavailable on " + this.techName_ + " playback technology element.", t), this.tech_.isReady_ = !1) : (0, C["default"])(t),
                    t
                }
            }
        },
        {
            key: "play",
            value: function() {
                return this.src() || this.currentSrc() ? this.techCall_("play") : this.tech_.one("loadstart",
                function() {
                    this.play()
                }),
                this
            }
        },
        {
            key: "pause",
            value: function() {
                return this.techCall_("pause"),
                this
            }
        },
        {
            key: "paused",
            value: function() {
                return this.techGet_("paused") !== !1
            }
        },
        {
            key: "scrubbing",
            value: function(e) {
                return void 0 !== e ? (this.scrubbing_ = !!e, e ? this.addClass("vjs-scrubbing") : this.removeClass("vjs-scrubbing"), this) : this.scrubbing_
            }
        },
        {
            key: "currentTime",
            value: function(e) {
                return void 0 !== e ? (this.techCall_("setCurrentTime", e), this) : (this.cache_.currentTime = this.techGet_("currentTime") || 0, this.cache_.currentTime)
            }
        },
        {
            key: "duration",
            value: function(e) {
                return void 0 === e ? this.cache_.duration || 0 : (e = parseFloat(e) || 0, e < 0 && (e = 1 / 0), e !== this.cache_.duration && (this.cache_.duration = e, e === 1 / 0 ? this.addClass("vjs-live") : this.removeClass("vjs-live"), this.trigger("durationchange")), this)
            }
        },
        {
            key: "remainingTime",
            value: function() {
                return this.duration() - this.currentTime()
            }
        },
        {
            key: "buffered",
            value: function r() {
                var r = this.techGet_("buffered");
                return r && r.length || (r = (0, M.createTimeRange)(0, 0)),
                r
            }
        },
        {
            key: "bufferedPercent",
            value: function() {
                return (0, A.bufferedPercent)(this.buffered(), this.duration())
            }
        },
        {
            key: "bufferedEnd",
            value: function() {
                var e = this.buffered(),
                t = this.duration(),
                r = e.end(e.length - 1);
                return r > t && (r = t),
                r
            }
        },
        {
            key: "volume",
            value: function(e) {
                var t = void 0;
                return void 0 !== e ? (t = Math.max(0, Math.min(1, parseFloat(e))), this.cache_.volume = t, this.techCall_("setVolume", t), this) : (t = parseFloat(this.techGet_("volume")), isNaN(t) ? 1 : t)
            }
        },
        {
            key: "muted",
            value: function(e) {
                return void 0 !== e ? (this.techCall_("setMuted", e), this) : this.techGet_("muted") || !1
            }
        },
        {
            key: "supportsFullScreen",
            value: function() {
                return this.techGet_("supportsFullScreen") || !1
            }
        },
        {
            key: "isFullscreen",
            value: function(e) {
                return void 0 !== e ? (this.isFullscreen_ = !!e, this) : !!this.isFullscreen_
            }
        },
        {
            key: "requestFullscreen",
            value: function() {
                var e = R["default"];
                return this.isFullscreen(!0),
                e.requestFullscreen ? (b.on(h["default"], e.fullscreenchange, k.bind(this,
                function t(r) {
                    this.isFullscreen(h["default"][e.fullscreenElement]),
                    this.isFullscreen() === !1 && b.off(h["default"], e.fullscreenchange, t),
                    this.trigger("fullscreenchange")
                })), this.el_[e.requestFullscreen]()) : this.tech_.supportsFullScreen() ? this.techCall_("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange")),
                this
            }
        },
        {
            key: "exitFullscreen",
            value: function() {
                var e = R["default"];
                return this.isFullscreen(!1),
                e.requestFullscreen ? h["default"][e.exitFullscreen]() : this.tech_.supportsFullScreen() ? this.techCall_("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange")),
                this
            }
        },
        {
            key: "enterFullWindow",
            value: function() {
                this.isFullWindow = !0,
                this.docOrigOverflow = h["default"].documentElement.style.overflow,
                b.on(h["default"], "keydown", k.bind(this, this.fullWindowOnEscKey)),
                h["default"].documentElement.style.overflow = "hidden",
                m.addElClass(h["default"].body, "vjs-full-window"),
                this.trigger("enterFullWindow")
            }
        },
        {
            key: "fullWindowOnEscKey",
            value: function(e) {
                27 === e.keyCode && (this.isFullscreen() === !0 ? this.exitFullscreen() : this.exitFullWindow())
            }
        },
        {
            key: "exitFullWindow",
            value: function() {
                this.isFullWindow = !1,
                b.off(h["default"], "keydown", this.fullWindowOnEscKey),
                h["default"].documentElement.style.overflow = this.docOrigOverflow,
                m.removeElClass(h["default"].body, "vjs-full-window"),
                this.trigger("exitFullWindow")
            }
        },
        {
            key: "canPlayType",
            value: function(e) {
                for (var t = void 0,
                r = 0,
                n = this.options_.techOrder; r < n.length; r++) {
                    var o = (0, x["default"])(n[r]),
                    i = Y["default"].getTech(o);
                    if (i || (i = p["default"].getComponent(o)), i) {
                        if (i.isSupported() && (t = i.canPlayType(e))) return t
                    } else C["default"].error('The "' + o + '" tech is undefined. Skipped browser support check for that tech.')
                }
                return ""
            }
        },
        {
            key: "selectSource",
            value: function(e) {
                var t = this,
                r = this.options_.techOrder.map(x["default"]).map(function(e) {
                    return [e, Y["default"].getTech(e) || p["default"].getComponent(e)]
                }).filter(function(e) {
                    var t = l(e, 2),
                    r = t[0],
                    n = t[1];
                    return n ? n.isSupported() : (C["default"].error('The "' + r + '" tech is undefined. Skipped browser support check for that tech.'), !1)
                }),
                n = function(e, t, r) {
                    var n = void 0;
                    return e.some(function(e) {
                        return t.some(function(t) {
                            if (n = r(e, t)) return ! 0
                        })
                    }),
                    n
                },
                o = void 0,
                i = function(e) {
                    return function(t, r) {
                        return e(r, t)
                    }
                },
                a = function(e, r) {
                    var n = l(e, 2),
                    o = n[0],
                    i = n[1];
                    if (i.canPlaySource(r, t.options_[o.toLowerCase()])) return {
                        source: r,
                        tech: o
                    }
                };
                return o = this.options_.sourceOrder ? n(e, r, i(a)) : n(r, e, a),
                o || !1
            }
        },
        {
            key: "src",
            value: function(e) {
                if (void 0 === e) return this.techGet_("src");
                var t = Y["default"].getTech(this.techName_);
                return t || (t = p["default"].getComponent(this.techName_)),
                Array.isArray(e) ? this.sourceList_(e) : "string" == typeof e ? this.src({
                    src: e
                }) : e instanceof Object && (e.type && !t.canPlaySource(e, this.options_[this.techName_.toLowerCase()]) ? this.sourceList_([e]) : (this.cache_.src = e.src, this.currentType_ = e.type || "", this.ready(function() {
                    t.prototype.hasOwnProperty("setSource") ? this.techCall_("setSource", e) : this.techCall_("src", e.src),
                    "auto" === this.options_.preload && this.load(),
                    this.options_.autoplay && this.play()
                },
                !0))),
                this
            }
        },
        {
            key: "sourceList_",
            value: function(e) {
                var t = this.selectSource(e);
                t ? t.tech === this.techName_ ? this.src(t.source) : this.loadTech_(t.tech, t.source) : (this.setTimeout(function() {
                    this.error({
                        code: 4,
                        message: this.localize(this.options_.notSupportedMessage)
                    })
                },
                0), this.triggerReady())
            }
        },
        {
            key: "load",
            value: function() {
                return this.techCall_("load"),
                this
            }
        },
        {
            key: "reset",
            value: function() {
                return this.loadTech_((0, x["default"])(this.options_.techOrder[0]), null),
                this.techCall_("reset"),
                this
            }
        },
        {
            key: "currentSrc",
            value: function() {
                return this.techGet_("currentSrc") || this.cache_.src || ""
            }
        },
        {
            key: "currentType",
            value: function() {
                return this.currentType_ || ""
            }
        },
        {
            key: "preload",
            value: function(e) {
                return void 0 !== e ? (this.techCall_("setPreload", e), this.options_.preload = e, this) : this.techGet_("preload")
            }
        },
        {
            key: "autoplay",
            value: function(e) {
                return void 0 !== e ? (this.techCall_("setAutoplay", e), this.options_.autoplay = e, this) : this.techGet_("autoplay", e)
            }
        },
        {
            key: "loop",
            value: function(e) {
                return void 0 !== e ? (this.techCall_("setLoop", e), this.options_.loop = e, this) : this.techGet_("loop")
            }
        },
        {
            key: "poster",
            value: function(e) {
                return void 0 === e ? this.poster_: (e || (e = ""), this.poster_ = e, this.techCall_("setPoster", e), this.trigger("posterchange"), this)
            }
        },
        {
            key: "handleTechPosterChange_",
            value: function() { ! this.poster_ && this.tech_ && this.tech_.poster && (this.poster_ = this.tech_.poster() || "", this.trigger("posterchange"))
            }
        },
        {
            key: "controls",
            value: function(e) {
                return void 0 !== e ? (e = !!e, this.controls_ !== e && (this.controls_ = e, this.usingNativeControls() && this.techCall_("setControls", e), e ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled"), this.usingNativeControls() || this.addTechControlsListeners_()) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"), this.usingNativeControls() || this.removeTechControlsListeners_())), this) : !!this.controls_
            }
        },
        {
            key: "usingNativeControls",
            value: function(e) {
                return void 0 !== e ? (e = !!e, this.usingNativeControls_ !== e && (this.usingNativeControls_ = e, e ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols"))), this) : !!this.usingNativeControls_
            }
        },
        {
            key: "error",
            value: function(e) {
                return void 0 === e ? this.error_ || null: null === e ? (this.error_ = e, this.removeClass("vjs-error"), this.errorDisplay && this.errorDisplay.close(), this) : (this.error_ = new L["default"](e), this.addClass("vjs-error"), C["default"].error("(CODE:" + this.error_.code + " " + L["default"].errorTypes[this.error_.code] + ")", this.error_.message, this.error_), this.trigger("error"), this)
            }
        },
        {
            key: "ended",
            value: function() {
                return this.techGet_("ended")
            }
        },
        {
            key: "seeking",
            value: function() {
                return this.techGet_("seeking")
            }
        },
        {
            key: "seekable",
            value: function() {
                return this.techGet_("seekable")
            }
        },
        {
            key: "reportUserActivity",
            value: function(e) {
                var t = this.options_.reporter;
                this.userActivity_ = !0,
                e && t && t instanceof Function && t.call(this, e)
            }
        },
        {
            key: "userActive",
            value: function(e) {
                return void 0 !== e ? (e = !!e, e !== this.userActive_ && (this.userActive_ = e, e ? (this.userActivity_ = !0, this.removeClass("vjs-user-inactive"), this.addClass("vjs-user-active"), this.trigger("useractive")) : (this.userActivity_ = !1, this.tech_ && this.tech_.one("mousemove",
                function(e) {
                    e.stopPropagation(),
                    e.preventDefault()
                }), this.removeClass("vjs-user-active"), this.addClass("vjs-user-inactive"), this.trigger("userinactive"))), this) : this.userActive_
            }
        },
        {
            key: "listenForUserActivity_",
            value: function() {
                var e = void 0,
                t = void 0,
                r = void 0,
                n = k.bind(this, this.reportUserActivity),
                o = function(e) {
                    e.screenX === t && e.screenY === r || (t = e.screenX, r = e.screenY, n())
                },
                i = function() {
                    n(),
                    this.clearInterval(e),
                    e = this.setInterval(n, 250)
                },
                a = function(t) {
                    n(t),
                    this.clearInterval(e)
                };
                this.on("mousedown", i),
                this.on("mousemove", o),
                this.on("mouseup", a),
                this.on("keydown", n),
                this.on("keyup", n);
                var u = void 0;
                this.setInterval(function() {
                    if (this.userActivity_) {
                        this.userActivity_ = !1,
                        this.userActive(!0),
                        this.clearTimeout(u);
                        var e = this.options_.inactivityTimeout;
                        e > 0 && (u = this.setTimeout(function() {
                            this.userActivity_ || this.userActive(!1)
                        },
                        e))
                    }
                },
                250)
            }
        },
        {
            key: "playbackRate",
            value: function(e) {
                return void 0 !== e ? (this.techCall_("setPlaybackRate", e), this) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("playbackRate") : 1
            }
        },
        {
            key: "isAudio",
            value: function(e) {
                return void 0 !== e ? (this.isAudio_ = !!e, this) : !!this.isAudio_
            }
        },
        {
            key: "networkState",
            value: function() {
                return this.techGet_("networkState")
            }
        },
        {
            key: "readyState",
            value: function() {
                return this.techGet_("readyState")
            }
        },
        {
            key: "videoTracks",
            value: function() {
                return this.tech_ ? this.tech_.videoTracks() : (this.videoTracks_ = this.videoTracks_ || new ee["default"], this.videoTracks_)
            }
        },
        {
            key: "audioTracks",
            value: function() {
                return this.tech_ ? this.tech_.audioTracks() : (this.audioTracks_ = this.audioTracks_ || new Q["default"], this.audioTracks_)
            }
        },
        {
            key: "textTracks",
            value: function() {
                if (this.tech_) return this.tech_.textTracks()
            }
        },
        {
            key: "remoteTextTracks",
            value: function() {
                if (this.tech_) return this.tech_.remoteTextTracks()
            }
        },
        {
            key: "remoteTextTrackEls",
            value: function() {
                if (this.tech_) return this.tech_.remoteTextTrackEls()
            }
        },
        {
            key: "addTextTrack",
            value: function(e, t, r) {
                if (this.tech_) return this.tech_.addTextTrack(e, t, r)
            }
        },
        {
            key: "addRemoteTextTrack",
            value: function(e) {
                if (this.tech_) return this.tech_.addRemoteTextTrack(e)
            }
        },
        {
            key: "removeRemoteTextTrack",
            value: function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? {}: arguments[0],
                t = e.track,
                r = void 0 === t ? arguments[0] : t;
                if (this.tech_) return this.tech_.removeRemoteTextTrack(r)
            }
        },
        {
            key: "videoWidth",
            value: function() {
                return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0
            }
        },
        {
            key: "videoHeight",
            value: function() {
                return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0
            }
        },
        {
            key: "language",
            value: function(e) {
                return void 0 === e ? this.language_: (this.language_ = String(e).toLowerCase(), this)
            }
        },
        {
            key: "languages",
            value: function() {
                return (0, W["default"])(t.prototype.options_.languages, this.languages_)
            }
        },
        {
            key: "toJSON",
            value: function() {
                var e = (0, W["default"])(this.options_),
                t = e.tracks;
                e.tracks = [];
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n = (0, W["default"])(n),
                    n.player = void 0,
                    e.tracks[r] = n
                }
                return e
            }
        },
        {
            key: "createModal",
            value: function(e, t) {
                var r = this;
                t = t || {},
                t.content = e || "";
                var n = new X["default"](this, t);
                return this.addChild(n),
                n.on("dispose",
                function() {
                    r.removeChild(n)
                }),
                n.open()
            }
        }], [{
            key: "getTagSettings",
            value: function(e) {
                var t = {
                    sources: [],
                    tracks: []
                },
                r = m.getElAttributes(e),
                n = r["data-setup"];
                if (null !== n) {
                    var o = (0, H["default"])(n || "{}"),
                    i = l(o, 2),
                    a = i[0],
                    u = i[1];
                    a && C["default"].error(a),
                    (0, $["default"])(r, u)
                }
                if ((0, $["default"])(t, r), e.hasChildNodes()) for (var s = e.childNodes,
                c = 0,
                f = s.length; c < f; c++) {
                    var p = s[c],
                    d = p.nodeName.toLowerCase();
                    "source" === d ? t.sources.push(m.getElAttributes(p)) : "track" === d && t.tracks.push(m.getElAttributes(p))
                }
                return t
            }
        }]),
        t
    } (p["default"]);
    te.players = {};
    var re = v["default"].navigator;
    te.prototype.options_ = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {},
        defaultVolume: .85,
        inactivityTimeout: 2e3,
        playbackRates: [],
        children: ["mediaLoader", "posterImage", "textTrackDisplay", "loadingSpinner", "bigPlayButton", "progressBar", "controlBar", "errorDisplay", "textTrackSettings"],
        language: re && (re.languages && re.languages[0] || re.userLanguage || re.language) || "en",
        languages: {},
        notSupportedMessage: "No compatible source was found for this media."
    },
    te.prototype.handleTechLoadStart_,
    te.prototype.handleLoadedMetaData_,
    te.prototype.handleTextData_,
    te.prototype.handleLoadedData_,
    te.prototype.handleUserActive_,
    te.prototype.handleUserInactive_,
    te.prototype.handleTimeUpdate_,
    te.prototype.handleTechEnded_,
    te.prototype.handleVolumeChange_,
    te.prototype.handleError_,
    te.prototype.flexNotSupported_ = function() {
        var e = h["default"].createElement("i");
        return ! ("flexBasis" in e.style || "webkitFlexBasis" in e.style || "mozFlexBasis" in e.style || "msFlexBasis" in e.style || "msFlexOrder" in e.style)
    },
    p["default"].registerComponent("Player", te),
    t["default"] = te
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t, r) {
        if (t < 0 || t > r) throw new Error("Failed to execute '" + e + "' on 'TimeRanges': The index provided (" + t + ") is greater than or equal to the maximum bound (" + r + ").")
    }
    function i(e, t, r, n) {
        return void 0 === n && (s["default"].warn("DEPRECATED: Function '" + e + "' on 'TimeRanges' called without an index argument."), n = 0),
        o(e, n, r.length - 1),
        r[n][t]
    }
    function a(e) {
        return void 0 === e || 0 === e.length ? {
            length: 0,
            start: function() {
                throw new Error("This TimeRanges object is empty")
            },
            end: function() {
                throw new Error("This TimeRanges object is empty")
            }
        }: {
            length: e.length,
            start: i.bind(null, "start", 0, e),
            end: i.bind(null, "end", 1, e)
        }
    }
    function u(e, t) {
        return Array.isArray(e) ? a(e) : void 0 === e || void 0 === t ? a() : a([[e, t]])
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.createTimeRange = void 0,
    t.createTimeRanges = u;
    var l = r(10),
    s = n(l);
    t.createTimeRange = u
},
function(e, t, r) {
    "use strict";
    function n(e, t) {
        var r = 0,
        n = void 0,
        i = void 0;
        if (!t) return 0;
        e && e.length || (e = (0, o.createTimeRange)(0, 0));
        for (var a = 0; a < e.length; a++) n = e.start(a),
        i = e.end(a),
        i > t && (i = t),
        r += i - n;
        return r / t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.bufferedPercent = n;
    var o = r(56)
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    for (var o = r(4), i = n(o), a = {},
    u = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], l = u[0], s = void 0, c = 0; c < u.length; c++) if (u[c][1] in i["default"]) {
        s = u[c];
        break
    }
    if (s) for (var f = 0; f < s.length; f++) a[l[f]] = s[f];
    t["default"] = a
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        return e instanceof o ? e: ("number" == typeof e ? this.code = e: "string" == typeof e ? this.message = e: "object" === ("undefined" == typeof e ? "undefined": i(e)) && ("number" == typeof e.code && (this.code = e.code), (0, u["default"])(this, e)), void(this.message || (this.message = o.defaultMessages[this.code] || "")))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    a = r(60),
    u = n(a);
    o.prototype.code = 0,
    o.prototype.message = "",
    o.prototype.status = null,
    o.errorTypes = ["MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_ERR_ENCRYPTED"],
    o.defaultMessages = {
        1 : "You aborted the media playback",
        2 : "A network error caused the media download to fail part-way.",
        3 : "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",
        4 : "The media could not be loaded, either because the server or network failed or because the format is not supported.",
        5 : "The media is encrypted and we do not have the keys to decrypt it."
    };
    for (var l = 0; l < o.errorTypes.length; l++) o[o.errorTypes[l]] = l,
    o.prototype[o.errorTypes[l]] = l;
    t["default"] = o
},
function(e, t, r) {
    "use strict";
    var n = r(61),
    o = r(65),
    i = r(69),
    a = r(70);
    n(o, {
        implementation: o,
        getPolyfill: i,
        shim: a
    }),
    e.exports = o
},
function(e, t, r) {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    o = r(62),
    i = r(64),
    a = "function" == typeof Symbol && "symbol" === n(Symbol()),
    u = Object.prototype.toString,
    l = function(e) {
        return "function" == typeof e && "[object Function]" === u.call(e)
    },
    s = function() {
        var e = {};
        try {
            Object.defineProperty(e, "x", {
                enumerable: !1,
                value: e
            });
            for (var t in e) return ! 1;
            return e.x === e
        } catch(r) {
            return ! 1
        }
    },
    c = Object.defineProperty && s(),
    f = function(e, t, r, n) { (!(t in e) || l(n) && n()) && (c ? Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: r,
            writable: !0
        }) : e[t] = r)
    },
    p = function(e, t) {
        var r = arguments.length > 2 ? arguments[2] : {},
        n = o(t);
        a && (n = n.concat(Object.getOwnPropertySymbols(t))),
        i(n,
        function(n) {
            f(e, n, t[n], r[n])
        })
    };
    p.supportsDescriptors = !!c,
    e.exports = p
},
function(e, t, r) {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    o = Object.prototype.hasOwnProperty,
    i = Object.prototype.toString,
    a = Array.prototype.slice,
    u = r(63),
    l = Object.prototype.propertyIsEnumerable,
    s = !l.call({
        toString: null
    },
    "toString"),
    c = l.call(function() {},
    "prototype"),
    f = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
    p = function(e) {
        var t = e.constructor;
        return t && t.prototype === e
    },
    d = {
        $console: !0,
        $external: !0,
        $frame: !0,
        $frameElement: !0,
        $frames: !0,
        $innerHeight: !0,
        $innerWidth: !0,
        $outerHeight: !0,
        $outerWidth: !0,
        $pageXOffset: !0,
        $pageYOffset: !0,
        $parent: !0,
        $scrollLeft: !0,
        $scrollTop: !0,
        $scrollX: !0,
        $scrollY: !0,
        $self: !0,
        $webkitIndexedDB: !0,
        $webkitStorageInfo: !0,
        $window: !0
    },
    h = function() {
        if ("undefined" == typeof window) return ! 1;
        for (var e in window) try {
            if (!d["$" + e] && o.call(window, e) && null !== window[e] && "object" === n(window[e])) try {
                p(window[e])
            } catch(t) {
                return ! 0
            }
        } catch(t) {
            return ! 0
        }
        return ! 1
    } (),
    y = function(e) {
        if ("undefined" == typeof window || !h) return p(e);
        try {
            return p(e)
        } catch(t) {
            return ! 1
        }
    },
    v = function(e) {
        var t = null !== e && "object" === ("undefined" == typeof e ? "undefined": n(e)),
        r = "[object Function]" === i.call(e),
        a = u(e),
        l = t && "[object String]" === i.call(e),
        p = [];
        if (!t && !r && !a) throw new TypeError("Object.keys called on a non-object");
        var d = c && r;
        if (l && e.length > 0 && !o.call(e, 0)) for (var h = 0; h < e.length; ++h) p.push(String(h));
        if (a && e.length > 0) for (var v = 0; v < e.length; ++v) p.push(String(v));
        else for (var _ in e) d && "prototype" === _ || !o.call(e, _) || p.push(String(_));
        if (s) for (var b = y(e), g = 0; g < f.length; ++g) b && "constructor" === f[g] || !o.call(e, f[g]) || p.push(f[g]);
        return p
    };
    v.shim = function() {
        if (Object.keys) {
            var e = function() {
                return 2 === (Object.keys(arguments) || "").length
            } (1, 2);
            if (!e) {
                var t = Object.keys;
                Object.keys = function(e) {
                    return t(u(e) ? a.call(e) : e)
                }
            }
        } else Object.keys = v;
        return Object.keys || v
    },
    e.exports = v
},
function(e, t) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    n = Object.prototype.toString;
    e.exports = function(e) {
        var t = n.call(e),
        o = "[object Arguments]" === t;
        return o || (o = "[object Array]" !== t && null !== e && "object" === ("undefined" == typeof e ? "undefined": r(e)) && "number" == typeof e.length && e.length >= 0 && "[object Function]" === n.call(e.callee)),
        o
    }
},
function(e, t) {
    "use strict";
    var r = Object.prototype.hasOwnProperty,
    n = Object.prototype.toString;
    e.exports = function(e, t, o) {
        if ("[object Function]" !== n.call(t)) throw new TypeError("iterator must be a function");
        var i = e.length;
        if (i === +i) for (var a = 0; a < i; a++) t.call(o, e[a], a, e);
        else for (var u in e) r.call(e, u) && t.call(o, e[u], u, e)
    }
},
function(e, t, r) {
    "use strict";
    var n = r(62),
    o = r(66),
    i = function(e) {
        return "undefined" != typeof e && null !== e
    },
    a = r(68)(),
    u = Object,
    l = o.call(Function.call, Array.prototype.push),
    s = o.call(Function.call, Object.prototype.propertyIsEnumerable);
    e.exports = function(e, t) {
        if (!i(e)) throw new TypeError("target must be an object");
        var r, o, c, f, p, d, h, y = u(e);
        for (r = 1; r < arguments.length; ++r) {
            if (o = u(arguments[r]), f = n(o), a && Object.getOwnPropertySymbols) for (p = Object.getOwnPropertySymbols(o), c = 0; c < p.length; ++c) h = p[c],
            s(o, h) && l(f, h);
            for (c = 0; c < f.length; ++c) h = f[c],
            d = o[h],
            s(o, h) && (y[h] = d)
        }
        return y
    }
},
function(e, t, r) {
    "use strict";
    var n = r(67);
    e.exports = Function.prototype.bind || n
},
function(e, t) {
    "use strict";
    var r = "Function.prototype.bind called on incompatible ",
    n = Array.prototype.slice,
    o = Object.prototype.toString,
    i = "[object Function]";
    e.exports = function(e) {
        var t = this;
        if ("function" != typeof t || o.call(t) !== i) throw new TypeError(r + t);
        for (var a, u = n.call(arguments, 1), l = function() {
            if (this instanceof a) {
                var r = t.apply(this, u.concat(n.call(arguments)));
                return Object(r) === r ? r: this
            }
            return t.apply(e, u.concat(n.call(arguments)))
        },
        s = Math.max(0, t.length - u.length), c = [], f = 0; f < s; f++) c.push("$" + f);
        if (a = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this,arguments); }")(l), t.prototype) {
            var p = function() {};
            p.prototype = t.prototype,
            a.prototype = new p,
            p.prototype = null
        }
        return a
    }
},
function(e, t, r) {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    o = r(62);
    e.exports = function() {
        if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return ! 1;
        if ("symbol" === n(Symbol.iterator)) return ! 0;
        var e = {},
        t = Symbol("test");
        if ("string" == typeof t) return ! 1;
        var r = 42;
        e[t] = r;
        for (t in e) return ! 1;
        if (0 !== o(e).length) return ! 1;
        if ("function" == typeof Object.keys && 0 !== Object.keys(e).length) return ! 1;
        if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length) return ! 1;
        var i = Object.getOwnPropertySymbols(e);
        if (1 !== i.length || i[0] !== t) return ! 1;
        if (!Object.prototype.propertyIsEnumerable.call(e, t)) return ! 1;
        if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var a = Object.getOwnPropertyDescriptor(e, t);
            if (a.value !== r || a.enumerable !== !0) return ! 1
        }
        return ! 0
    }
},
function(e, t, r) {
    "use strict";
    var n = Object.assign ||
    function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    },
    o = r(65),
    i = function() {
        if (!Object.assign) return ! 1;
        for (var e = "abcdefghijklmnopqrst",
        t = e.split(""), r = {},
        o = 0; o < t.length; ++o) r[t[o]] = t[o];
        var i = n({},
        r),
        a = "";
        for (var u in i) a += u;
        return e !== a
    },
    a = function() {
        if (!Object.assign || !Object.preventExtensions) return ! 1;
        var e = Object.preventExtensions({
            1 : 2
        });
        try {
            n(e, "xy")
        } catch(t) {
            return "y" === e[1]
        }
    };
    e.exports = function() {
        return Object.assign ? i() ? o: a() ? o: Object.assign: o
    }
},
function(e, t, r) {
    "use strict";
    var n = r(61),
    o = r(69);
    e.exports = function() {
        var e = o();
        return n(Object, {
            assign: e
        },
        {
            assign: function() {
                return Object.assign !== e
            }
        }),
        e
    }
},
function(e, t) {
    "use strict";
    function r(e, t) {
        var r, n = null;
        try {
            r = JSON.parse(e, t)
        } catch(o) {
            n = o
        }
        return [n, r]
    }
    e.exports = r
},
function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(e) {
        var t = ["kind", "label", "language", "id", "inBandMetadataTrackDispatchType", "mode", "src"].reduce(function(t, r, n) {
            return e[r] && (t[r] = e[r]),
            t
        },
        {
            cues: e.cues && Array.prototype.map.call(e.cues,
            function(e) {
                return {
                    startTime: e.startTime,
                    endTime: e.endTime,
                    text: e.text,
                    id: e.id
                }
            })
        });
        return t
    },
    n = function(e) {
        var t = e.$$("track"),
        n = Array.prototype.map.call(t,
        function(e) {
            return e.track
        }),
        o = Array.prototype.map.call(t,
        function(e) {
            var t = r(e.track);
            return e.src && (t.src = e.src),
            t
        });
        return o.concat(Array.prototype.filter.call(e.textTracks(),
        function(e) {
            return n.indexOf(e) === -1
        }).map(r))
    },
    o = function(e, t) {
        return e.forEach(function(e) {
            var r = t.addRemoteTextTrack(e).track; ! e.src && e.cues && e.cues.forEach(function(e) {
                return r.addCue(e)
            })
        }),
        t.textTracks()
    };
    t["default"] = {
        textTracksToJson: n,
        jsonToTextTracks: o,
        trackToJson_: r
    }
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function g(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : g(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(8),
    f = o(c),
    p = r(15),
    d = o(p),
    h = r(14),
    y = n(h),
    v = "vjs-modal-dialog",
    _ = 27,
    b = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.opened_ = n.hasBeenOpened_ = n.hasBeenFilled_ = !1,
            n.closeable(!n.options_.uncloseable),
            n.content(n.options_.content),
            n.contentEl_ = f.createEl("div", {
                className: v + "-content"
            },
            {
                role: "document"
            }),
            n.descEl_ = f.createEl("p", {
                className: v + "-description vjs-offscreen",
                id: n.el().getAttribute("aria-describedby")
            }),
            f.textContent(n.descEl_, n.description()),
            n.el_.appendChild(n.descEl_),
            n.el_.appendChild(n.contentEl_),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: this.buildCSSClass(),
                    tabIndex: -1
                },
                {
                    "aria-describedby": this.id() + "_description",
                    "aria-hidden": "true",
                    "aria-label": this.label(),
                    role: "dialog"
                })
            }
        },
        {
            key: "buildCSSClass",
            value: function() {
                return v + " vjs-hidden " + s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "handleKeyPress",
            value: function(e) {
                e.which === _ && this.closeable() && this.close()
            }
        },
        {
            key: "label",
            value: function() {
                return this.options_.label || this.localize("Modal Window")
            }
        },
        {
            key: "description",
            value: function() {
                var e = this.options_.description || this.localize("This is a modal window.");
                return this.closeable() && (e += " " + this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),
                e
            }
        },
        {
            key: "open",
            value: function() {
                if (!this.opened_) {
                    var e = this.player();
                    this.trigger("beforemodalopen"),
                    this.opened_ = !0,
                    (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) && this.fill(),
                    this.wasPlaying_ = !e.paused(),
                    this.wasPlaying_ && e.pause(),
                    this.closeable() && this.on(this.el_.ownerDocument, "keydown", d.bind(this, this.handleKeyPress)),
                    e.controls(!1),
                    this.show(),
                    this.el().setAttribute("aria-hidden", "false"),
                    this.trigger("modalopen"),
                    this.hasBeenOpened_ = !0
                }
                return this
            }
        },
        {
            key: "opened",
            value: function(e) {
                return "boolean" == typeof e && this[e ? "open": "close"](),
                this.opened_
            }
        },
        {
            key: "close",
            value: function() {
                if (this.opened_) {
                    var e = this.player();
                    this.trigger("beforemodalclose"),
                    this.opened_ = !1,
                    this.wasPlaying_ && e.play(),
                    this.closeable() && this.off(this.el_.ownerDocument, "keydown", d.bind(this, this.handleKeyPress)),
                    e.controls(!0),
                    this.hide(),
                    this.el().setAttribute("aria-hidden", "true"),
                    this.trigger("modalclose"),
                    this.options_.temporary && this.dispose()
                }
                return this
            }
        },
        {
            key: "closeable",
            value: function r(e) {
                if ("boolean" == typeof e) {
                    var r = this.closeable_ = !!e,
                    t = this.getChild("closeButton");
                    if (r && !t) {
                        var n = this.contentEl_;
                        this.contentEl_ = this.el_,
                        t = this.addChild("closeButton", {
                            controlText: "Close Modal Dialog"
                        }),
                        this.contentEl_ = n,
                        this.on(t, "close", this.close)
                    } ! r && t && (this.off(t, "close", this.close), this.removeChild(t), t.dispose())
                }
                return this.closeable_
            }
        },
        {
            key: "fill",
            value: function() {
                return this.fillWith(this.content())
            }
        },
        {
            key: "fillWith",
            value: function(e) {
                var t = this.contentEl(),
                r = t.parentNode,
                n = t.nextSibling;
                return this.trigger("beforemodalfill"),
                this.hasBeenFilled_ = !0,
                r.removeChild(t),
                this.empty(),
                f.insertContent(t, e),
                this.trigger("modalfill"),
                n ? r.insertBefore(t, n) : r.appendChild(t),
                this
            }
        },
        {
            key: "empty",
            value: function() {
                return this.trigger("beforemodalempty"),
                f.emptyEl(this.contentEl()),
                this.trigger("modalempty"),
                this
            }
        },
        {
            key: "content",
            value: function(e) {
                return "undefined" != typeof e && (this.content_ = e),
                this.content_
            }
        }]),
        t
    } (y["default"]);
    b.prototype.options_ = {
        temporary: !0
    },
    y["default"].registerComponent("ModalDialog", b),
    t["default"] = b
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    function l(e, t, r, n) {
        var o = arguments.length <= 4 || void 0 === arguments[4] ? {}: arguments[4],
        i = e.textTracks();
        o.kind = t,
        r && (o.label = r),
        n && (o.language = n),
        o.tech = e;
        var a = new m["default"](o);
        return i.addTrack_(a),
        a
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    c = function H(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : H(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    f = r(14),
    p = o(f),
    d = r(75),
    h = o(d),
    y = r(88),
    v = o(y),
    _ = r(17),
    b = o(_),
    g = r(76),
    m = o(g),
    O = r(89),
    k = o(O),
    j = r(91),
    w = o(j),
    T = r(92),
    P = o(T),
    E = r(15),
    C = n(E),
    S = r(10),
    x = o(S),
    M = r(56),
    A = r(57),
    I = r(59),
    D = o(I),
    F = r(3),
    R = o(F),
    N = r(4),
    L = o(N),
    B = function(e) {
        function t() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {}: arguments[0],
            r = arguments.length <= 1 || void 0 === arguments[1] ?
            function() {}: arguments[1];
            i(this, t),
            e.reportTouchActivity = !1;
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, null, e, r));
            return n.hasStarted_ = !1,
            n.on("playing",
            function() {
                this.hasStarted_ = !0
            }),
            n.on("loadstart",
            function() {
                this.hasStarted_ = !1
            }),
            n.textTracks_ = e.textTracks,
            n.videoTracks_ = e.videoTracks,
            n.audioTracks_ = e.audioTracks,
            n.featuresProgressEvents || n.manualProgressOn(),
            n.featuresTimeupdateEvents || n.manualTimeUpdatesOn(),
            e.nativeCaptions !== !1 && e.nativeTextTracks !== !1 || (n.featuresNativeTextTracks = !1),
            n.featuresNativeTextTracks || n.on("ready", n.emulateTextTracks),
            n.initTextTrackListeners(),
            n.initTrackListeners(),
            n.emitTapEvents(),
            n
        }
        return u(t, e),
        s(t, [{
            key: "manualProgressOn",
            value: function() {
                this.on("durationchange", this.onDurationChange),
                this.manualProgress = !0,
                this.one("ready", this.trackProgress)
            }
        },
        {
            key: "manualProgressOff",
            value: function() {
                this.manualProgress = !1,
                this.stopTrackingProgress(),
                this.off("durationchange", this.onDurationChange)
            }
        },
        {
            key: "trackProgress",
            value: function() {
                this.stopTrackingProgress(),
                this.progressInterval = this.setInterval(C.bind(this,
                function() {
                    var e = this.bufferedPercent();
                    this.bufferedPercent_ !== e && this.trigger("progress"),
                    this.bufferedPercent_ = e,
                    1 === e && this.stopTrackingProgress()
                }), 500)
            }
        },
        {
            key: "onDurationChange",
            value: function() {
                this.duration_ = this.duration()
            }
        },
        {
            key: "buffered",
            value: function() {
                return (0, M.createTimeRange)(0, 0)
            }
        },
        {
            key: "bufferedPercent",
            value: function() {
                return (0, A.bufferedPercent)(this.buffered(), this.duration_)
            }
        },
        {
            key: "stopTrackingProgress",
            value: function() {
                this.clearInterval(this.progressInterval)
            }
        },
        {
            key: "manualTimeUpdatesOn",
            value: function() {
                this.manualTimeUpdates = !0,
                this.on("play", this.trackCurrentTime),
                this.on("pause", this.stopTrackingCurrentTime)
            }
        },
        {
            key: "manualTimeUpdatesOff",
            value: function() {
                this.manualTimeUpdates = !1,
                this.stopTrackingCurrentTime(),
                this.off("play", this.trackCurrentTime),
                this.off("pause", this.stopTrackingCurrentTime)
            }
        },
        {
            key: "trackCurrentTime",
            value: function() {
                this.currentTimeInterval && this.stopTrackingCurrentTime(),
                this.currentTimeInterval = this.setInterval(function() {
                    this.trigger({
                        type: "timeupdate",
                        target: this,
                        manuallyTriggered: !0
                    })
                },
                250)
            }
        },
        {
            key: "stopTrackingCurrentTime",
            value: function() {
                this.clearInterval(this.currentTimeInterval),
                this.trigger({
                    type: "timeupdate",
                    target: this,
                    manuallyTriggered: !0
                })
            }
        },
        {
            key: "dispose",
            value: function() {
                this.clearTracks(["audio", "video", "text"]),
                this.manualProgress && this.manualProgressOff(),
                this.manualTimeUpdates && this.manualTimeUpdatesOff(),
                c(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "dispose", this).call(this)
            }
        },
        {
            key: "clearTracks",
            value: function(e) {
                var t = this;
                e = [].concat(e),
                e.forEach(function(e) {
                    for (var r = t[e + "Tracks"]() || [], n = r.length; n--;) {
                        var o = r[n];
                        "text" === e && t.removeRemoteTextTrack(o),
                        r.removeTrack_(o)
                    }
                })
            }
        },
        {
            key: "reset",
            value: function() {}
        },
        {
            key: "error",
            value: function(e) {
                return void 0 !== e && (this.error_ = new D["default"](e), this.trigger("error")),
                this.error_
            }
        },
        {
            key: "played",
            value: function() {
                return this.hasStarted_ ? (0, M.createTimeRange)(0, 0) : (0, M.createTimeRange)()
            }
        },
        {
            key: "setCurrentTime",
            value: function() {
                this.manualTimeUpdates && this.trigger({
                    type: "timeupdate",
                    target: this,
                    manuallyTriggered: !0
                })
            }
        },
        {
            key: "initTextTrackListeners",
            value: function() {
                var e = C.bind(this,
                function() {
                    this.trigger("texttrackchange")
                }),
                t = this.textTracks();
                t && (t.addEventListener("removetrack", e), t.addEventListener("addtrack", e), this.on("dispose", C.bind(this,
                function() {
                    t.removeEventListener("removetrack", e),
                    t.removeEventListener("addtrack", e)
                })))
            }
        },
        {
            key: "initTrackListeners",
            value: function() {
                var e = this,
                t = ["video", "audio"];
                t.forEach(function(t) {
                    var r = function() {
                        e.trigger(t + "trackchange")
                    },
                    n = e[t + "Tracks"]();
                    n.addEventListener("removetrack", r),
                    n.addEventListener("addtrack", r),
                    e.on("dispose",
                    function() {
                        n.removeEventListener("removetrack", r),
                        n.removeEventListener("addtrack", r)
                    })
                })
            }
        },
        {
            key: "emulateTextTracks",
            value: function() {
                var e = this,
                t = this.textTracks();
                if (t) {
                    R["default"].WebVTT || null === this.el().parentNode || void 0 === this.el().parentNode || !
                    function() {
                        var t = L["default"].createElement("script");
                        t.src = e.options_["vtt.js"] || "../node_modules/videojs-vtt.js/dist/vtt.js",
                        t.onload = function() {
                            e.trigger("vttjsloaded")
                        },
                        t.onerror = function() {
                            e.trigger("vttjserror")
                        },
                        e.on("dispose",
                        function() {
                            t.onload = null,
                            t.onerror = null
                        }),
                        R["default"].WebVTT = !0,
                        e.el().parentNode.appendChild(t)
                    } ();
                    var r = function() {
                        return e.trigger("texttrackchange")
                    },
                    n = function() {
                        r();
                        for (var e = 0; e < t.length; e++) {
                            var n = t[e];
                            n.removeEventListener("cuechange", r),
                            "showing" === n.mode && n.addEventListener("cuechange", r)
                        }
                    };
                    n(),
                    t.addEventListener("change", n),
                    this.on("dispose",
                    function() {
                        t.removeEventListener("change", n)
                    })
                }
            }
        },
        {
            key: "videoTracks",
            value: function() {
                return this.videoTracks_ = this.videoTracks_ || new w["default"],
                this.videoTracks_
            }
        },
        {
            key: "audioTracks",
            value: function() {
                return this.audioTracks_ = this.audioTracks_ || new P["default"],
                this.audioTracks_
            }
        },
        {
            key: "textTracks",
            value: function() {
                return this.textTracks_ = this.textTracks_ || new k["default"],
                this.textTracks_
            }
        },
        {
            key: "remoteTextTracks",
            value: function() {
                return this.remoteTextTracks_ = this.remoteTextTracks_ || new k["default"],
                this.remoteTextTracks_
            }
        },
        {
            key: "remoteTextTrackEls",
            value: function() {
                return this.remoteTextTrackEls_ = this.remoteTextTrackEls_ || new v["default"],
                this.remoteTextTrackEls_
            }
        },
        {
            key: "addTextTrack",
            value: function(e, t, r) {
                if (!e) throw new Error("TextTrack kind is required but was not provided");
                return l(this, e, t, r)
            }
        },
        {
            key: "addRemoteTextTrack",
            value: function(e) {
                var t = (0, b["default"])(e, {
                    tech: this
                }),
                r = new h["default"](t);
                return this.remoteTextTrackEls().addTrackElement_(r),
                this.remoteTextTracks().addTrack_(r.track),
                this.textTracks().addTrack_(r.track),
                r
            }
        },
        {
            key: "removeRemoteTextTrack",
            value: function(e) {
                this.textTracks().removeTrack_(e);
                var t = this.remoteTextTrackEls().getTrackElementByTrack_(e);
                this.remoteTextTrackEls().removeTrackElement_(t),
                this.remoteTextTracks().removeTrack_(e)
            }
        },
        {
            key: "setPoster",
            value: function() {}
        },
        {
            key: "canPlayType",
            value: function() {
                return ""
            }
        }], [{
            key: "isTech",
            value: function(e) {
                return e.prototype instanceof t || e instanceof t || e === t
            }
        },
        {
            key: "registerTech",
            value: function(e, r) {
                if (t.techs_ || (t.techs_ = {}), !t.isTech(r)) throw new Error("Tech " + e + " must be a Tech");
                return t.techs_[e] = r,
                r
            }
        },
        {
            key: "getTech",
            value: function(e) {
                return t.techs_ && t.techs_[e] ? t.techs_[e] : R["default"] && R["default"].videojs && R["default"].videojs[e] ? (x["default"].warn("The " + e + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), R["default"].videojs[e]) : void 0
            }
        }]),
        t
    } (p["default"]);
    B.prototype.textTracks_,
    B.prototype.audioTracks_,
    B.prototype.videoTracks_,
    B.prototype.featuresVolumeControl = !0,
    B.prototype.featuresFullscreenResize = !1,
    B.prototype.featuresPlaybackRate = !1,
    B.prototype.featuresProgressEvents = !1,
    B.prototype.featuresTimeupdateEvents = !1,
    B.prototype.featuresNativeTextTracks = !1,
    B.withSourceHandlers = function(e) {
        e.registerSourceHandler = function(t, r) {
            var n = e.sourceHandlers;
            n || (n = e.sourceHandlers = []),
            void 0 === r && (r = n.length),
            n.splice(r, 0, t)
        },
        e.canPlayType = function(t) {
            for (var r = e.sourceHandlers || [], n = void 0, o = 0; o < r.length; o++) if (n = r[o].canPlayType(t)) return n;
            return ""
        },
        e.selectSourceHandler = function(t, r) {
            for (var n = e.sourceHandlers || [], o = void 0, i = 0; i < n.length; i++) if (o = n[i].canHandleSource(t, r)) return n[i];
            return null
        },
        e.canPlaySource = function(t, r) {
            var n = e.selectSourceHandler(t, r);
            return n ? n.canHandleSource(t, r) : ""
        };
        var t = ["seekable", "duration"];
        t.forEach(function(e) {
            var t = this[e];
            "function" == typeof t && (this[e] = function() {
                return this.sourceHandler_ && this.sourceHandler_[e] ? this.sourceHandler_[e].apply(this.sourceHandler_, arguments) : t.apply(this, arguments)
            })
        },
        e.prototype),
        e.prototype.setSource = function(t) {
            var r = e.selectSourceHandler(t, this.options_);
            return r || (e.nativeSourceHandler ? r = e.nativeSourceHandler: x["default"].error("No source hander found for the current source.")),
            this.disposeSourceHandler(),
            this.off("dispose", this.disposeSourceHandler),
            this.currentSource_ && (this.clearTracks(["audio", "video"]), this.currentSource_ = null),
            r !== e.nativeSourceHandler && (this.currentSource_ = t, this.off(this.el_, "loadstart", e.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", e.prototype.successiveLoadStartListener_), this.one(this.el_, "loadstart", e.prototype.firstLoadStartListener_)),
            this.sourceHandler_ = r.handleSource(t, this, this.options_),
            this.on("dispose", this.disposeSourceHandler),
            this
        },
        e.prototype.firstLoadStartListener_ = function() {
            this.one(this.el_, "loadstart", e.prototype.successiveLoadStartListener_)
        },
        e.prototype.successiveLoadStartListener_ = function() {
            this.currentSource_ = null,
            this.disposeSourceHandler(),
            this.one(this.el_, "loadstart", e.prototype.successiveLoadStartListener_)
        },
        e.prototype.disposeSourceHandler = function() {
            this.sourceHandler_ && this.sourceHandler_.dispose && (this.off(this.el_, "loadstart", e.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", e.prototype.successiveLoadStartListener_), this.sourceHandler_.dispose(), this.sourceHandler_ = null)
        }
    },
    p["default"].registerComponent("Tech", B),
    p["default"].registerComponent("MediaTechController", B),
    B.registerTech("Tech", B),
    t["default"] = B
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = r(11),
    s = o(l),
    c = r(4),
    f = n(c),
    p = r(54),
    d = n(p),
    h = r(76),
    y = n(h),
    v = 0,
    _ = 1,
    b = 2,
    g = 3,
    m = function(e) {
        function t() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {}: arguments[0];
            i(this, t);
            var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
            n = void 0,
            o = r;
            if (s.IS_IE8) {
                o = f["default"].createElement("custom");
                for (var u in t.prototype)"constructor" !== u && (o[u] = t.prototype[u])
            }
            var l = new y["default"](e);
            if (o.kind = l.kind, o.src = l.src, o.srclang = l.language, o.label = l.label, o["default"] = l["default"], Object.defineProperty(o, "readyState", {
                get: function() {
                    return n
                }
            }), Object.defineProperty(o, "track", {
                get: function() {
                    return l
                }
            }), n = v, l.addEventListener("loadeddata",
            function() {
                n = b,
                o.trigger({
                    type: "load",
                    target: o
                })
            }), s.IS_IE8) {
                var c;
                return c = o,
                a(r, c)
            }
            return r
        }
        return u(t, e),
        t
    } (d["default"]);
    m.prototype.allowedEvents_ = {
        load: "load"
    },
    m.NONE = v,
    m.LOADING = _,
    m.LOADED = b,
    m.ERROR = g,
    t["default"] = m
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = r(77),
    c = o(s),
    f = r(15),
    p = n(f),
    d = r(78),
    h = r(10),
    y = o(h),
    v = r(3),
    _ = o(v),
    b = r(79),
    g = o(b),
    m = r(80),
    O = r(81),
    k = o(O),
    j = r(17),
    w = o(j),
    T = r(11),
    P = n(T),
    E = function(e, t) {
        var r = new _["default"].WebVTT.Parser(_["default"], _["default"].vttjs, _["default"].WebVTT.StringDecoder()),
        n = [];
        r.oncue = function(e) {
            t.addCue(e)
        },
        r.onparsingerror = function(e) {
            n.push(e)
        },
        r.onflush = function() {
            t.trigger({
                type: "loadeddata",
                target: t
            })
        },
        r.parse(e),
        n.length > 0 && (_["default"].console && _["default"].console.groupCollapsed && _["default"].console.groupCollapsed("Text Track parsing errors for " + t.src), n.forEach(function(e) {
            return y["default"].error(e)
        }), _["default"].console && _["default"].console.groupEnd && _["default"].console.groupEnd()),
        r.flush()
    },
    C = function(e, t) {
        var r = {
            uri: e
        },
        n = (0, m.isCrossOrigin)(e);
        n && (r.cors = n),
        (0, k["default"])(r, p.bind(this,
        function(e, r, n) {
            return e ? y["default"].error(e, r) : (t.loaded_ = !0, void("function" != typeof _["default"].WebVTT ? t.tech_ && !
            function() {
                var e = function() {
                    return E(n, t)
                };
                t.tech_.on("vttjsloaded", e),
                t.tech_.on("vttjserror",
                function() {
                    y["default"].error("vttjs failed to load, stopping trying to process " + t.src),
                    t.tech_.off("vttjsloaded", e)
                })
            } () : E(n, t)))
        }))
    },
    S = function(e) {
        function t() {
            var e, r, n = arguments.length <= 0 || void 0 === arguments[0] ? {}: arguments[0];
            if (i(this, t), !n.tech) throw new Error("A tech was not provided.");
            var o = (0, w["default"])(n, {
                kind: d.TextTrackKind[n.kind] || "subtitles",
                language: n.language || n.srclang || ""
            }),
            u = d.TextTrackMode[o.mode] || "disabled",
            l = o["default"];
            "metadata" !== o.kind && "chapters" !== o.kind || (u = "hidden");
            var s = e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, o));
            if (s.tech_ = o.tech, P.IS_IE8) for (var f in t.prototype)"constructor" !== f && (s[f] = t.prototype[f]);
            s.cues_ = [],
            s.activeCues_ = [];
            var h = new c["default"](s.cues_),
            y = new c["default"](s.activeCues_),
            v = !1,
            _ = p.bind(s,
            function() {
                this.activeCues,
                v && (this.trigger("cuechange"), v = !1)
            });
            return "disabled" !== u && s.tech_.on("timeupdate", _),
            Object.defineProperty(s, "default", {
                get: function() {
                    return l
                },
                set: function() {}
            }),
            Object.defineProperty(s, "mode", {
                get: function() {
                    return u
                },
                set: function(e) {
                    d.TextTrackMode[e] && (u = e, "showing" === u && this.tech_.on("timeupdate", _), this.trigger("modechange"))
                }
            }),
            Object.defineProperty(s, "cues", {
                get: function() {
                    return this.loaded_ ? h: null
                },
                set: function() {}
            }),
            Object.defineProperty(s, "activeCues", {
                get: function() {
                    if (!this.loaded_) return null;
                    if (0 === this.cues.length) return y;
                    for (var e = this.tech_.currentTime(), t = [], r = 0, n = this.cues.length; r < n; r++) {
                        var o = this.cues[r];
                        o.startTime <= e && o.endTime >= e ? t.push(o) : o.startTime === o.endTime && o.startTime <= e && o.startTime + .5 >= e && t.push(o)
                    }
                    if (v = !1, t.length !== this.activeCues_.length) v = !0;
                    else for (var i = 0; i < t.length; i++) this.activeCues_.indexOf(t[i]) === -1 && (v = !0);
                    return this.activeCues_ = t,
                    y.setCues_(this.activeCues_),
                    y
                },
                set: function() {}
            }),
            o.src ? (s.src = o.src, C(o.src, s)) : s.loaded_ = !0,
            r = s,
            a(e, r)
        }
        return u(t, e),
        l(t, [{
            key: "addCue",
            value: function(e) {
                var t = this.tech_.textTracks();
                if (t) for (var r = 0; r < t.length; r++) t[r] !== this && t[r].removeCue(e);
                this.cues_.push(e),
                this.cues.setCues_(this.cues_)
            }
        },
        {
            key: "removeCue",
            value: function(e) {
                for (var t = !1,
                r = 0,
                n = this.cues_.length; r < n; r++) {
                    var o = this.cues_[r];
                    o === e && (this.cues_.splice(r, 1), t = !0)
                }
                t && this.cues.setCues_(this.cues_)
            }
        }]),
        t
    } (g["default"]);
    S.prototype.allowedEvents_ = {
        cuechange: "cuechange"
    },
    t["default"] = S
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    u = r(11),
    l = o(u),
    s = r(4),
    c = n(s),
    f = function() {
        function e(t) {
            i(this, e);
            var r = this;
            if (l.IS_IE8) {
                r = c["default"].createElement("custom");
                for (var n in e.prototype)"constructor" !== n && (r[n] = e.prototype[n])
            }
            if (e.prototype.setCues_.call(r, t), Object.defineProperty(r, "length", {
                get: function() {
                    return this.length_
                }
            }), l.IS_IE8) return r
        }
        return a(e, [{
            key: "setCues_",
            value: function(e) {
                var t = this.length || 0,
                r = 0,
                n = e.length;
                this.cues_ = e,
                this.length_ = e.length;
                var o = function(e) {
                    "" + e in this || Object.defineProperty(this, "" + e, {
                        get: function() {
                            return this.cues_[e]
                        }
                    })
                };
                if (t < n) for (r = t; r < n; r++) o.call(this, r)
            }
        },
        {
            key: "getCueById",
            value: function(e) {
                for (var t = null,
                r = 0,
                n = this.length; r < n; r++) {
                    var o = this[r];
                    if (o.id === e) {
                        t = o;
                        break
                    }
                }
                return t
            }
        }]),
        e
    } ();
    t["default"] = f
},
function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.VideoTrackKind = {
        alternative: "alternative",
        captions: "captions",
        main: "main",
        sign: "sign",
        subtitles: "subtitles",
        commentary: "commentary"
    },
    t.AudioTrackKind = {
        alternative: "alternative",
        descriptions: "descriptions",
        main: "main",
        "main-desc": "main-desc",
        translation: "translation",
        commentary: "commentary"
    },
    t.TextTrackKind = {
        subtitles: "subtitles",
        captions: "captions",
        descriptions: "descriptions",
        chapters: "chapters",
        metadata: "metadata"
    },
    t.TextTrackMode = {
        disabled: "disabled",
        hidden: "hidden",
        showing: "showing"
    }
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = r(11),
    s = o(l),
    c = r(4),
    f = n(c),
    p = r(9),
    d = o(p),
    h = r(54),
    y = n(h),
    v = function(e) {
        function t() {
            var e, r = arguments.length <= 0 || void 0 === arguments[0] ? {}: arguments[0];
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
            o = n;
            if (s.IS_IE8) {
                o = f["default"].createElement("custom");
                for (var u in t.prototype)"constructor" !== u && (o[u] = t.prototype[u])
            }
            var l = {
                id: r.id || "vjs_track_" + d.newGUID(),
                kind: r.kind || "",
                label: r.label || "",
                language: r.language || ""
            },
            c = function(e) {
                Object.defineProperty(o, e, {
                    get: function() {
                        return l[e]
                    },
                    set: function() {}
                })
            };
            for (var p in l) c(p);
            return e = o,
            a(n, e)
        }
        return u(t, e),
        t
    } (y["default"]);
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.isCrossOrigin = t.getFileExtension = t.getAbsoluteURL = t.parseUrl = void 0;
    var o = r(4),
    i = n(o),
    a = r(3),
    u = n(a),
    l = t.parseUrl = function(e) {
        var t = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"],
        r = i["default"].createElement("a");
        r.href = e;
        var n = "" === r.host && "file:" !== r.protocol,
        o = void 0;
        n && (o = i["default"].createElement("div"), o.innerHTML = '<a href="' + e + '"></a>', r = o.firstChild, o.setAttribute("style", "display:none; position:absolute;"), i["default"].body.appendChild(o));
        for (var a = {},
        u = 0; u < t.length; u++) a[t[u]] = r[t[u]];
        return "http:" === a.protocol && (a.host = a.host.replace(/:80$/, "")),
        "https:" === a.protocol && (a.host = a.host.replace(/:443$/, "")),
        n && i["default"].body.removeChild(o),
        a
    };
    t.getAbsoluteURL = function(e) {
        if (!e.match(/^https?:\/\//)) {
            var t = i["default"].createElement("div");
            t.innerHTML = '<a href="' + e + '">x</a>',
            e = t.firstChild.href
        }
        return e
    },
    t.getFileExtension = function(e) {
        if ("string" == typeof e) {
            var t = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,
            r = t.exec(e);
            if (r) return r.pop().toLowerCase()
        }
        return ""
    },
    t.isCrossOrigin = function(e) {
        var t = u["default"].location,
        r = l(e),
        n = ":" === r.protocol ? t.protocol: r.protocol,
        o = n + r.host !== t.protocol + t.host;
        return o
    }
},
function(e, t, r) {
    "use strict";
    function n(e, t) {
        for (var r = 0; r < e.length; r++) t(e[r])
    }
    function o(e) {
        for (var t in e) if (e.hasOwnProperty(t)) return ! 1;
        return ! 0
    }
    function i(e, t, r) {
        var n = e;
        return f(t) ? (r = t, "string" == typeof e && (n = {
            uri: e
        })) : n = d(t, {
            uri: e
        }),
        n.callback = r,
        n
    }
    function a(e, t, r) {
        return t = i(e, t, r),
        u(t)
    }
    function u(e) {
        function t() {
            4 === s.readyState && i()
        }
        function r() {
            var e = void 0;
            if (s.response ? e = s.response: "text" !== s.responseType && s.responseType || (e = s.responseText || s.responseXML), m) try {
                e = JSON.parse(e)
            } catch(t) {}
            return e
        }
        function n(e) {
            clearTimeout(h),
            e instanceof Error || (e = new Error("" + (e || "Unknown XMLHttpRequest Error"))),
            e.statusCode = 0,
            u(e, l)
        }
        function i() {
            if (!d) {
                var t;
                clearTimeout(h),
                t = e.useXDR && void 0 === s.status ? 200 : 1223 === s.status ? 204 : s.status;
                var n = l,
                o = null;
                0 !== t ? (n = {
                    body: r(),
                    statusCode: t,
                    method: v,
                    headers: {},
                    url: y,
                    rawRequest: s
                },
                s.getAllResponseHeaders && (n.headers = p(s.getAllResponseHeaders()))) : o = new Error("Internal XMLHttpRequest Error"),
                u(o, n, n.body)
            }
        }
        var u = e.callback;
        if ("undefined" == typeof u) throw new Error("callback argument missing");
        u = c(u);
        var l = {
            body: void 0,
            headers: {},
            statusCode: 0,
            method: v,
            url: y,
            rawRequest: s
        },
        s = e.xhr || null;
        s || (s = e.cors || e.useXDR ? new a.XDomainRequest: new a.XMLHttpRequest);
        var f, d, h, y = s.url = e.uri || e.url,
        v = s.method = e.method || "GET",
        _ = e.body || e.data || null,
        b = s.headers = e.headers || {},
        g = !!e.sync,
        m = !1;
        if ("json" in e && (m = !0, b.accept || b.Accept || (b.Accept = "application/json"), "GET" !== v && "HEAD" !== v && (b["content-type"] || b["Content-Type"] || (b["Content-Type"] = "application/json"), _ = JSON.stringify(e.json))), s.onreadystatechange = t, s.onload = i, s.onerror = n, s.onprogress = function() {},
        s.ontimeout = n, s.open(v, y, !g, e.username, e.password), g || (s.withCredentials = !!e.withCredentials), !g && e.timeout > 0 && (h = setTimeout(function() {
            d = !0,
            s.abort("timeout");
            var e = new Error("XMLHttpRequest timeout");
            e.code = "ETIMEDOUT",
            n(e)
        },
        e.timeout)), s.setRequestHeader) for (f in b) b.hasOwnProperty(f) && s.setRequestHeader(f, b[f]);
        else if (e.headers && !o(e.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
        return "responseType" in e && (s.responseType = e.responseType),
        "beforeSend" in e && "function" == typeof e.beforeSend && e.beforeSend(s),
        s.send(_),
        s
    }
    function l() {}
    var s = r(3),
    c = r(82),
    f = r(83),
    p = r(84),
    d = r(87);
    e.exports = a,
    a.XMLHttpRequest = s.XMLHttpRequest || l,
    a.XDomainRequest = "withCredentials" in new a.XMLHttpRequest ? a.XMLHttpRequest: s.XDomainRequest,
    n(["get", "put", "post", "patch", "head", "delete"],
    function(e) {
        a["delete" === e ? "del": e] = function(t, r, n) {
            return r = i(t, r, n),
            r.method = e.toUpperCase(),
            u(r)
        }
    })
},
function(e, t) {
    "use strict";
    function r(e) {
        var t = !1;
        return function() {
            if (!t) return t = !0,
            e.apply(this, arguments)
        }
    }
    e.exports = r,
    r.proto = r(function() {
        Object.defineProperty(Function.prototype, "once", {
            value: function() {
                return r(this)
            },
            configurable: !0
        })
    })
},
function(e, t) {
    "use strict";
    function r(e) {
        var t = n.call(e);
        return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt)
    }
    e.exports = r;
    var n = Object.prototype.toString
},
function(e, t, r) {
    "use strict";
    var n = r(85),
    o = r(86),
    i = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    };
    e.exports = function(e) {
        if (!e) return {};
        var t = {};
        return o(n(e).split("\n"),
        function(e) {
            var r = e.indexOf(":"),
            o = n(e.slice(0, r)).toLowerCase(),
            a = n(e.slice(r + 1));
            "undefined" == typeof t[o] ? t[o] = a: i(t[o]) ? t[o].push(a) : t[o] = [t[o], a]
        }),
        t
    }
},
function(e, t) {
    "use strict";
    function r(e) {
        return e.replace(/^\s*|\s*$/g, "")
    }
    t = e.exports = r,
    t.left = function(e) {
        return e.replace(/^\s*/, "")
    },
    t.right = function(e) {
        return e.replace(/\s*$/, "")
    }
},
function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        if (!u(t)) throw new TypeError("iterator must be a function");
        arguments.length < 3 && (r = this),
        "[object Array]" === l.call(e) ? o(e, t, r) : "string" == typeof e ? i(e, t, r) : a(e, t, r)
    }
    function o(e, t, r) {
        for (var n = 0,
        o = e.length; n < o; n++) s.call(e, n) && t.call(r, e[n], n, e)
    }
    function i(e, t, r) {
        for (var n = 0,
        o = e.length; n < o; n++) t.call(r, e.charAt(n), n, e)
    }
    function a(e, t, r) {
        for (var n in e) s.call(e, n) && t.call(r, e[n], n, e)
    }
    var u = r(83);
    e.exports = n;
    var l = Object.prototype.toString,
    s = Object.prototype.hasOwnProperty
},
function(e, t) {
    "use strict";
    function r() {
        for (var e = {},
        t = 0; t < arguments.length; t++) {
            var r = arguments[t];
            for (var o in r) n.call(r, o) && (e[o] = r[o])
        }
        return e
    }
    e.exports = r;
    var n = Object.prototype.hasOwnProperty
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    u = r(11),
    l = o(u),
    s = r(4),
    c = n(s),
    f = function() {
        function e() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
            i(this, e);
            var r = this;
            if (l.IS_IE8) {
                r = c["default"].createElement("custom");
                for (var n in e.prototype)"constructor" !== n && (r[n] = e.prototype[n])
            }
            r.trackElements_ = [],
            Object.defineProperty(r, "length", {
                get: function() {
                    return this.trackElements_.length
                }
            });
            for (var o = 0,
            a = t.length; o < a; o++) r.addTrackElement_(t[o]);
            if (l.IS_IE8) return r
        }
        return a(e, [{
            key: "addTrackElement_",
            value: function(e) {
                this.trackElements_.push(e)
            }
        },
        {
            key: "getTrackElementByTrack_",
            value: function(e) {
                for (var t = void 0,
                r = 0,
                n = this.trackElements_.length; r < n; r++) if (e === this.trackElements_[r].track) {
                    t = this.trackElements_[r];
                    break
                }
                return t
            }
        },
        {
            key: "removeTrackElement_",
            value: function(e) {
                for (var t = 0,
                r = this.trackElements_.length; t < r; t++) if (e === this.trackElements_[t]) {
                    this.trackElements_.splice(t, 1);
                    break
                }
            }
        }]),
        e
    } ();
    t["default"] = f
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function g(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : g(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(90),
    f = o(c),
    p = r(15),
    d = n(p),
    h = r(11),
    y = n(h),
    v = r(4),
    _ = o(v),
    b = function(e) {
        function t() {
            var e, r, n = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
            i(this, t);
            var o = void 0;
            if (y.IS_IE8) {
                o = _["default"].createElement("custom");
                for (var u in f["default"].prototype)"constructor" !== u && (o[u] = f["default"].prototype[u]);
                for (var l in t.prototype)"constructor" !== l && (o[l] = t.prototype[l])
            }
            return o = e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, o)),
            r = o,
            a(e, r)
        }
        return u(t, e),
        l(t, [{
            key: "addTrack_",
            value: function(e) {
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addTrack_", this).call(this, e),
                e.addEventListener("modechange", d.bind(this,
                function() {
                    this.trigger("change")
                }))
            }
        },
        {
            key: "removeTrack_",
            value: function(e) {
                for (var t = void 0,
                r = 0,
                n = this.length; r < n; r++) if (this[r] === e) {
                    t = this[r],
                    t.off && t.off(),
                    this.tracks_.splice(r, 1);
                    break
                }
                t && this.trigger({
                    track: t,
                    type: "removetrack"
                })
            }
        },
        {
            key: "getTrackById",
            value: function(e) {
                for (var t = null,
                r = 0,
                n = this.length; r < n; r++) {
                    var o = this[r];
                    if (o.id === e) {
                        t = o;
                        break
                    }
                }
                return t
            }
        }]),
        t
    } (f["default"]);
    t["default"] = b
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = r(54),
    c = o(s),
    f = r(11),
    p = n(f),
    d = r(4),
    h = o(d),
    y = function(e) {
        function t() {
            var e, r = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
            n = arguments.length <= 1 || void 0 === arguments[1] ? null: arguments[1];
            i(this, t);
            var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            if (!n && (n = o, p.IS_IE8)) {
                n = h["default"].createElement("custom");
                for (var u in t.prototype)"constructor" !== u && (n[u] = t.prototype[u])
            }
            n.tracks_ = [],
            Object.defineProperty(n, "length", {
                get: function() {
                    return this.tracks_.length
                }
            });
            for (var l = 0; l < r.length; l++) n.addTrack_(r[l]);
            return e = n,
            a(o, e)
        }
        return u(t, e),
        l(t, [{
            key: "addTrack_",
            value: function(e) {
                var t = this.tracks_.length;
                "" + t in this || Object.defineProperty(this, t, {
                    get: function() {
                        return this.tracks_[t]
                    }
                }),
                this.tracks_.indexOf(e) === -1 && (this.tracks_.push(e), this.trigger({
                    track: e,
                    type: "addtrack"
                }))
            }
        },
        {
            key: "removeTrack_",
            value: function(e) {
                for (var t = void 0,
                r = 0,
                n = this.length; r < n; r++) if (this[r] === e) {
                    t = this[r],
                    t.off && t.off(),
                    this.tracks_.splice(r, 1);
                    break
                }
                t && this.trigger({
                    track: t,
                    type: "removetrack"
                })
            }
        },
        {
            key: "getTrackById",
            value: function(e) {
                for (var t = null,
                r = 0,
                n = this.length; r < n; r++) {
                    var o = this[r];
                    if (o.id === e) {
                        t = o;
                        break
                    }
                }
                return t
            }
        }]),
        t
    } (c["default"]);
    y.prototype.allowedEvents_ = {
        change: "change",
        addtrack: "addtrack",
        removetrack: "removetrack"
    };
    for (var v in y.prototype.allowedEvents_) y.prototype["on" + v] = null;
    t["default"] = y
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function b(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : b(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(90),
    f = o(c),
    p = r(11),
    d = n(p),
    h = r(4),
    y = o(h),
    v = function(e, t) {
        for (var r = 0; r < e.length; r++) t.id !== e[r].id && (e[r].selected = !1)
    },
    _ = function(e) {
        function t() {
            var e, r, n = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
            i(this, t);
            for (var o = void 0,
            u = n.length - 1; u >= 0; u--) if (n[u].selected) {
                v(n, n[u]);
                break
            }
            if (d.IS_IE8) {
                o = y["default"].createElement("custom");
                for (var l in f["default"].prototype)"constructor" !== l && (o[l] = f["default"].prototype[l]);
                for (var s in t.prototype)"constructor" !== s && (o[s] = t.prototype[s])
            }
            return o = e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, o)),
            o.changing_ = !1,
            Object.defineProperty(o, "selectedIndex", {
                get: function() {
                    for (var e = 0; e < this.length; e++) if (this[e].selected) return e;
                    return - 1
                },
                set: function() {}
            }),
            r = o,
            a(e, r)
        }
        return u(t, e),
        l(t, [{
            key: "addTrack_",
            value: function(e) {
                var r = this;
                e.selected && v(this, e),
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addTrack_", this).call(this, e),
                e.addEventListener && e.addEventListener("selectedchange",
                function() {
                    r.changing_ || (r.changing_ = !0, v(r, e), r.changing_ = !1, r.trigger("change"))
                })
            }
        },
        {
            key: "addTrack",
            value: function(e) {
                this.addTrack_(e)
            }
        },
        {
            key: "removeTrack",
            value: function(e) {
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "removeTrack_", this).call(this, e)
            }
        }]),
        t
    } (f["default"]);
    t["default"] = _
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function b(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : b(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(90),
    f = o(c),
    p = r(11),
    d = n(p),
    h = r(4),
    y = o(h),
    v = function(e, t) {
        for (var r = 0; r < e.length; r++) t.id !== e[r].id && (e[r].enabled = !1)
    },
    _ = function(e) {
        function t() {
            var e, r, n = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
            i(this, t);
            for (var o = void 0,
            u = n.length - 1; u >= 0; u--) if (n[u].enabled) {
                v(n, n[u]);
                break
            }
            if (d.IS_IE8) {
                o = y["default"].createElement("custom");
                for (var l in f["default"].prototype)"constructor" !== l && (o[l] = f["default"].prototype[l]);
                for (var s in t.prototype)"constructor" !== s && (o[s] = t.prototype[s])
            }
            return o = e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, o)),
            o.changing_ = !1,
            r = o,
            a(e, r)
        }
        return u(t, e),
        l(t, [{
            key: "addTrack_",
            value: function(e) {
                var r = this;
                e.enabled && v(this, e),
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addTrack_", this).call(this, e),
                e.addEventListener && e.addEventListener("enabledchange",
                function() {
                    r.changing_ || (r.changing_ = !0, v(r, e), r.changing_ = !1, r.trigger("change"))
                })
            }
        },
        {
            key: "addTrack",
            value: function(e) {
                this.addTrack_(e)
            }
        },
        {
            key: "removeTrack",
            value: function(e) {
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "removeTrack_", this).call(this, e)
            }
        }]),
        t
    } (f["default"]);
    t["default"] = _
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = r(14),
    l = n(u),
    s = r(74),
    c = n(s),
    f = r(16),
    p = n(f),
    d = function(e) {
        function t(e, r, n) {
            o(this, t);
            var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r, n));
            if (r.playerOptions.sources && 0 !== r.playerOptions.sources.length) e.src(r.playerOptions.sources);
            else for (var u = 0,
            s = r.playerOptions.techOrder; u < s.length; u++) {
                var f = (0, p["default"])(s[u]),
                d = c["default"].getTech(f);
                if (f || (d = l["default"].getComponent(f)), d && d.isSupported()) {
                    e.loadTech_(f);
                    break
                }
            }
            return a
        }
        return a(t, e),
        t
    } (l["default"]);
    l["default"].registerComponent("MediaLoader", d),
    t["default"] = d
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    function l(e) {
        var t = e.charAt(0).toUpperCase() + e.slice(1);
        S["set" + t] = function(t) {
            return this.el_.vjs_setProperty(e, t)
        }
    }
    function s(e) {
        S[e] = function() {
            return this.el_.vjs_getProperty(e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    for (var c = (function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } ()), f = (function D(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : D(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    }), p = r(74), d = o(p), h = r(8), y = n(h), v = r(80), _ = n(v), b = r(56), g = r(95), m = o(g), O = r(14), k = o(O), j = r(3), w = o(j), T = r(60), P = o(T), E = w["default"].navigator, C = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return e.source && n.ready(function() {
                this.setSource(e.source)
            },
            !0),
            e.startTime && n.ready(function() {
                this.load(),
                this.play(),
                this.currentTime(e.startTime)
            },
            !0),
            w["default"].videojs = w["default"].videojs || {},
            w["default"].videojs.Flash = w["default"].videojs.Flash || {},
            w["default"].videojs.Flash.onReady = t.onReady,
            w["default"].videojs.Flash.onEvent = t.onEvent,
            w["default"].videojs.Flash.onError = t.onError,
            n.on("seeked",
            function() {
                this.lastSeekTarget_ = void 0
            }),
            n
        }
        return u(t, e),
        c(t, [{
            key: "createEl",
            value: function() {
                var e = this.options_;
                e.swf || (e.swf = "http://s2.pstatp.com/site/video/player.swf");
                var r = e.techId,
                n = (0, P["default"])({
                    readyFunction: "videojs.Flash.onReady",
                    eventProxyFunction: "videojs.Flash.onEvent",
                    errorEventProxyFunction: "videojs.Flash.onError",
                    autoplay: e.autoplay,
                    preload: e.preload,
                    loop: e.loop,
                    muted: e.muted
                },
                e.flashVars),
                o = (0, P["default"])({
                    wmode: "opaque",
                    bgcolor: "#000000"
                },
                e.params),
                i = (0, P["default"])({
                    id: r,
                    name: r,
                    "class": "vjs-tech"
                },
                e.attributes);
                return this.el_ = t.embed(e.swf, n, o, i),
                this.el_.tech = this,
                this.el_
            }
        },
        {
            key: "play",
            value: function() {
                this.ended() && this.setCurrentTime(0),
                this.el_.vjs_play()
            }
        },
        {
            key: "pause",
            value: function() {
                this.el_.vjs_pause()
            }
        },
        {
            key: "src",
            value: function(e) {
                return void 0 === e ? this.currentSrc() : this.setSrc(e)
            }
        },
        {
            key: "setSrc",
            value: function(e) {
                var t = this;
                e = _.getAbsoluteURL(e),
                this.el_.vjs_src(e),
                this.autoplay() && this.setTimeout(function() {
                    return t.play()
                },
                0)
            }
        },
        {
            key: "seeking",
            value: function() {
                return void 0 !== this.lastSeekTarget_
            }
        },
        {
            key: "setCurrentTime",
            value: function(e) {
                var r = this.seekable();
                r.length && (e = e > r.start(0) ? e: r.start(0), e = e < r.end(r.length - 1) ? e: r.end(r.length - 1), this.lastSeekTarget_ = e, this.trigger("seeking"), this.el_.vjs_setProperty("currentTime", e), f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setCurrentTime", this).call(this))
            }
        },
        {
            key: "currentTime",
            value: function(e) {
                return this.seeking() ? this.lastSeekTarget_ || 0 : this.el_.vjs_getProperty("currentTime")
            }
        },
        {
            key: "currentSrc",
            value: function() {
                return this.currentSource_ ? this.currentSource_.src: this.el_.vjs_getProperty("currentSrc")
            }
        },
        {
            key: "duration",
            value: function r() {
                if (0 === this.readyState()) return NaN;
                var r = this.el_.vjs_getProperty("duration");
                return r >= 0 ? r: 1 / 0
            }
        },
        {
            key: "load",
            value: function() {
                this.el_.vjs_load()
            }
        },
        {
            key: "poster",
            value: function() {
                this.el_.vjs_getProperty("poster")
            }
        },
        {
            key: "setPoster",
            value: function() {}
        },
        {
            key: "seekable",
            value: function() {
                var e = this.duration();
                return 0 === e ? (0, b.createTimeRange)() : (0, b.createTimeRange)(0, e)
            }
        },
        {
            key: "buffered",
            value: function() {
                var e = this.el_.vjs_getProperty("buffered");
                return 0 === e.length ? (0, b.createTimeRange)() : (0, b.createTimeRange)(e[0][0], e[0][1])
            }
        },
        {
            key: "supportsFullScreen",
            value: function() {
                return ! 1
            }
        },
        {
            key: "enterFullScreen",
            value: function() {
                return ! 1
            }
        }]),
        t
    } (d["default"]), S = C.prototype, x = "rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","), M = "networkState,readyState,initialTime,startOffsetTime,paused,ended,videoWidth,videoHeight".split(","), A = 0; A < x.length; A++) s(x[A]),
    l(x[A]);
    for (var I = 0; I < M.length; I++) s(M[I]);
    C.isSupported = function() {
        return C.version()[0] >= 10
    },
    d["default"].withSourceHandlers(C),
    C.nativeSourceHandler = {},
    C.nativeSourceHandler.canPlayType = function(e) {
        return e in C.formats ? "maybe": ""
    },
    C.nativeSourceHandler.canHandleSource = function(e, t) {
        function r(e) {
            var t = _.getFileExtension(e);
            return t ? "video/" + t: ""
        }
        var n = void 0;
        return n = e.type ? e.type.replace(/;.*/, "").toLowerCase() : r(e.src),
        C.nativeSourceHandler.canPlayType(n)
    },
    C.nativeSourceHandler.handleSource = function(e, t, r) {
        t.setSrc(e.src)
    },
    C.nativeSourceHandler.dispose = function() {},
    C.registerSourceHandler(C.nativeSourceHandler),
    C.formats = {
        "video/flv": "FLV",
        "video/x-flv": "FLV",
        "video/mp4": "MP4",
        "video/m4v": "MP4"
    },
    C.onReady = function(e) {
        var t = y.getEl(e),
        r = t && t.tech;
        r && r.el() && C.checkReady(r)
    },
    C.checkReady = function(e) {
        e.el() && (e.el().vjs_getProperty ? e.triggerReady() : this.setTimeout(function() {
            C.checkReady(e)
        },
        50))
    },
    C.onEvent = function(e, t) {
        var r = y.getEl(e).tech;
        r.trigger(t, Array.prototype.slice.call(arguments, 2))
    },
    C.onError = function(e, t) {
        var r = y.getEl(e).tech;
        return "srcnotfound" === t ? r.error(4) : void r.error("FLASH: " + t)
    },
    C.version = function() {
        var e = "0,0,0";
        try {
            e = new w["default"].ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
        } catch(t) {
            try {
                E.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (e = (E.plugins["Shockwave Flash 2.0"] || E.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
            } catch(r) {}
        }
        return e.split(",")
    },
    C.embed = function(e, t, r, n) {
        var o = C.getEmbedCode(e, t, r, n),
        i = y.createEl("div", {
            innerHTML: o
        }).childNodes[0];
        return i
    },
    C.getEmbedCode = function(e, t, r, n) {
        var o = '<object type="application/x-shockwave-flash" ',
        i = "",
        a = "",
        u = "";
        return t && Object.getOwnPropertyNames(t).forEach(function(e) {
            i += e + "=" + t[e] + "&amp;"
        }),
        r = (0, P["default"])({
            movie: e,
            flashvars: i,
            allowScriptAccess: "always",
            allowNetworking: "all"
        },
        r),
        Object.getOwnPropertyNames(r).forEach(function(e) {
            a += '<param name="' + e + '" value="' + r[e] + '" />'
        }),
        n = (0, P["default"])({
            data: e,
            width: "100%",
            height: "100%"
        },
        n),
        Object.getOwnPropertyNames(n).forEach(function(e) {
            u += e + '="' + n[e] + '" '
        }),
        "" + o + u + ">" + a + "</object>"
    },
    (0, m["default"])(C),
    k["default"].registerComponent("Flash", C),
    d["default"].registerTech("Flash", C),
    t["default"] = C
},
function(e, t) {
    "use strict";
    function r(e) {
        return e.streamingFormats = {
            "rtmp/mp4": "MP4",
            "rtmp/flv": "FLV"
        },
        e.streamFromParts = function(e, t) {
            return e + "&" + t
        },
        e.streamToParts = function(e) {
            var t = {
                connection: "",
                stream: ""
            };
            if (!e) return t;
            var r = e.search(/&(?!\w+=)/),
            n = void 0;
            return r !== -1 ? n = r + 1 : (r = n = e.lastIndexOf("/") + 1, 0 === r && (r = n = e.length)),
            t.connection = e.substring(0, r),
            t.stream = e.substring(n, e.length),
            t
        },
        e.isStreamingType = function(t) {
            return t in e.streamingFormats
        },
        e.RTMP_RE = /^rtmp[set]?:\/\//i,
        e.isStreamingSrc = function(t) {
            return e.RTMP_RE.test(t)
        },
        e.rtmpSourceHandler = {},
        e.rtmpSourceHandler.canPlayType = function(t) {
            return e.isStreamingType(t) ? "maybe": ""
        },
        e.rtmpSourceHandler.canHandleSource = function(t, r) {
            var n = e.rtmpSourceHandler.canPlayType(t.type);
            return n ? n: e.isStreamingSrc(t.src) ? "maybe": ""
        },
        e.rtmpSourceHandler.handleSource = function(t, r, n) {
            var o = e.streamToParts(t.src);
            r.setRtmpConnection(o.connection),
            r.setRtmpStream(o.stream)
        },
        e.registerSourceHandler(e.rtmpSourceHandler),
        e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t["default"] = r
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function O(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : O(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(97),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(15),
    y = n(h),
    v = r(8),
    _ = n(v),
    b = r(11),
    g = n(b),
    m = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.update(),
            e.on("posterchange", y.bind(n, n.update)),
            n
        }
        return u(t, e),
        l(t, [{
            key: "dispose",
            value: function() {
                this.player().off("posterchange", this.update),
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "dispose", this).call(this)
            }
        },
        {
            key: "createEl",
            value: function() {
                var e = _.createEl("div", {
                    className: "vjs-poster",
                    tabIndex: -1
                });
                return g.BACKGROUND_SIZE_SUPPORTED || (this.fallbackImg_ = _.createEl("img"), e.appendChild(this.fallbackImg_)),
                e
            }
        },
        {
            key: "update",
            value: function() {
                var e = this.player().poster();
                this.setSrc(e),
                e ? this.show() : this.hide()
            }
        },
        {
            key: "setSrc",
            value: function(e) {
                if (this.fallbackImg_) this.fallbackImg_.src = e;
                else {
                    var t = "";
                    e && (t = 'url("' + e + '")'),
                    this.el_.style.backgroundImage = t
                }
            }
        },
        {
            key: "handleClick",
            value: function() {
                this.player_.paused() ? this.player_.play() : this.player_.pause()
            }
        }]),
        t
    } (f["default"]);
    d["default"].registerComponent("PosterImage", m),
    t["default"] = m
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function T(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : T(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = r(7),
    y = n(h),
    v = r(15),
    _ = n(v),
    b = r(10),
    g = o(b),
    m = r(4),
    O = o(m),
    k = r(60),
    j = o(k),
    w = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.emitTapEvents(),
            n.on("tap", n.handleClick),
            n.on("click", n.handleClick),
            n.on("focus", n.handleFocus),
            n.on("blur", n.handleBlur),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? "div": arguments[0],
                r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
                n = arguments.length <= 2 || void 0 === arguments[2] ? {}: arguments[2];
                r = (0, j["default"])({
                    className: this.buildCSSClass(),
                    tabIndex: 0
                },
                r),
                "button" === e && g["default"].error("Creating a ClickableComponent with an HTML element of " + e + " is not supported; use a Button instead."),
                n = (0, j["default"])({
                    role: "button",
                    "aria-live": "polite"
                },
                n);
                var o = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, e, r, n);
                return this.createControlTextEl(o),
                o
            }
        },
        {
            key: "createControlTextEl",
            value: function(e) {
                return this.controlTextEl_ = d.createEl("span", {
                    className: "vjs-control-text"
                }),
                e && e.appendChild(this.controlTextEl_),
                this.controlText(this.controlText_, e),
                this.controlTextEl_
            }
        },
        {
            key: "controlText",
            value: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? this.el() : arguments[1];
                if (!e) return this.controlText_ || "Need Text";
                var r = this.localize(e);
                return this.controlText_ = e,
                this.controlTextEl_.innerHTML = r,
                t.setAttribute("title", r),
                this
            }
        },
        {
            key: "buildCSSClass",
            value: function() {
                return "vjs-control vjs-button " + s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "addChild",
            value: function(e) {
                var r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addChild", this).call(this, e, r)
            }
        },
        {
            key: "enable",
            value: function() {
                return this.removeClass("vjs-disabled"),
                this.el_.setAttribute("aria-disabled", "false"),
                this
            }
        },
        {
            key: "disable",
            value: function() {
                return this.addClass("vjs-disabled"),
                this.el_.setAttribute("aria-disabled", "true"),
                this
            }
        },
        {
            key: "handleClick",
            value: function() {}
        },
        {
            key: "handleFocus",
            value: function() {
                y.on(O["default"], "keydown", _.bind(this, this.handleKeyPress))
            }
        },
        {
            key: "handleKeyPress",
            value: function(e) {
                32 === e.which || 13 === e.which ? (e.preventDefault(), this.handleClick(e)) : s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleKeyPress", this) && s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleKeyPress", this).call(this, e)
            }
        },
        {
            key: "handleBlur",
            value: function() {
                y.off(O["default"], "keydown", _.bind(this, this.handleKeyPress))
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("ClickableComponent", w),
    t["default"] = w
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    function l(e, t) {
        return "rgba(" + parseInt(e[1] + e[1], 16) + "," + parseInt(e[2] + e[2], 16) + "," + parseInt(e[3] + e[3], 16) + "," + t + ")"
    }
    function s(e, t, r) {
        try {
            e.style[t] = r
        } catch(n) {
            return
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    f = function k(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : k(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    p = r(14),
    d = o(p),
    h = r(15),
    y = n(h),
    v = r(3),
    _ = o(v),
    b = "#222",
    g = "#ccc",
    m = {
        monospace: "monospace",
        sansSerif: "sans-serif",
        serif: "serif",
        monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
        monospaceSerif: '"Courier New", monospace',
        proportionalSansSerif: "sans-serif",
        proportionalSerif: "serif",
        casual: '"Comic Sans MS", Impact, fantasy',
        script: '"Monotype Corsiva", cursive',
        smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
    },
    O = function(e) {
        function t(e, r, n) {
            i(this, t);
            var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r, n));
            return e.on("loadstart", y.bind(o, o.toggleDisplay)),
            e.on("texttrackchange", y.bind(o, o.updateDisplay)),
            e.ready(y.bind(o,
            function() {
                if (e.tech_ && e.tech_.featuresNativeTextTracks) return void this.hide();
                e.on("fullscreenchange", y.bind(this, this.updateDisplay));
                for (var t = this.options_.playerOptions.tracks || [], r = 0; r < t.length; r++) this.player_.addRemoteTextTrack(t[r]);
                var n = {
                    captions: 1,
                    subtitles: 1
                },
                o = this.player_.textTracks(),
                i = void 0,
                a = void 0;
                if (o) {
                    for (var u = 0; u < o.length; u++) {
                        var l = o[u];
                        l["default"] && ("descriptions" !== l.kind || i ? l.kind in n && !a && (a = l) : i = l)
                    }
                    a ? a.mode = "showing": i && (i.mode = "showing")
                }
            })),
            o
        }
        return u(t, e),
        c(t, [{
            key: "toggleDisplay",
            value: function() {
                this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks ? this.hide() : this.show()
            }
        },
        {
            key: "createEl",
            value: function() {
                return f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-text-track-display"
                },
                {
                    "aria-live": "assertive",
                    "aria-atomic": "true"
                })
            }
        },
        {
            key: "clearDisplay",
            value: function() {
                "function" == typeof _["default"].WebVTT && _["default"].WebVTT.processCues(_["default"], [], this.el_)
            }
        },
        {
            key: "updateDisplay",
            value: function() {
                var e = this.player_.textTracks();
                if (this.clearDisplay(), e) {
                    for (var t = null,
                    r = null,
                    n = e.length; n--;) {
                        var o = e[n];
                        "showing" === o.mode && ("descriptions" === o.kind ? t = o: r = o)
                    }
                    r ? this.updateForTrack(r) : t && this.updateForTrack(t)
                }
            }
        },
        {
            key: "updateForTrack",
            value: function(e) {
                if ("function" == typeof _["default"].WebVTT && e.activeCues) {
                    for (var t = this.player_.textTrackSettings.getValues(), r = [], n = 0; n < e.activeCues.length; n++) r.push(e.activeCues[n]);
                    _["default"].WebVTT.processCues(_["default"], r, this.el_);
                    for (var o = r.length; o--;) {
                        var i = r[o];
                        if (i) {
                            var a = i.displayState;
                            if (t.color && (a.firstChild.style.color = t.color), t.textOpacity && s(a.firstChild, "color", l(t.color || "#fff", t.textOpacity)), t.backgroundColor && (a.firstChild.style.backgroundColor = t.backgroundColor), t.backgroundOpacity && s(a.firstChild, "backgroundColor", l(t.backgroundColor || "#000", t.backgroundOpacity)), t.windowColor && (t.windowOpacity ? s(a, "backgroundColor", l(t.windowColor, t.windowOpacity)) : a.style.backgroundColor = t.windowColor), t.edgeStyle && ("dropshadow" === t.edgeStyle ? a.firstChild.style.textShadow = "2px 2px 3px " + b + ", 2px 2px 4px " + b + ", 2px 2px 5px " + b: "raised" === t.edgeStyle ? a.firstChild.style.textShadow = "1px 1px " + b + ", 2px 2px " + b + ", 3px 3px " + b: "depressed" === t.edgeStyle ? a.firstChild.style.textShadow = "1px 1px " + g + ", 0 1px " + g + ", -1px -1px " + b + ", 0 -1px " + b: "uniform" === t.edgeStyle && (a.firstChild.style.textShadow = "0 0 4px " + b + ", 0 0 4px " + b + ", 0 0 4px " + b + ", 0 0 4px " + b)), t.fontPercent && 1 !== t.fontPercent) {
                                var u = _["default"].parseFloat(a.style.fontSize);
                                a.style.fontSize = u * t.fontPercent + "px",
                                a.style.height = "auto",
                                a.style.top = "auto",
                                a.style.bottom = "2px"
                            }
                            t.fontFamily && "default" !== t.fontFamily && ("small-caps" === t.fontFamily ? a.firstChild.style.fontVariant = "small-caps": a.firstChild.style.fontFamily = m[t.fontFamily])
                        }
                    }
                }
            }
        }]),
        t
    } (d["default"]);
    d["default"].registerComponent("TextTrackDisplay", O),
    t["default"] = O
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function p(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : p(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(14),
    c = n(s),
    f = function(e) {
        function t() {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e),
        u(t, [{
            key: "createEl",
            value: function() {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-loading-spinner",
                    dir: "ltr"
                })
            }
        }]),
        t
    } (c["default"]);
    c["default"].registerComponent("LoadingSpinner", f),
    t["default"] = f
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = r(101),
    s = n(l),
    c = r(14),
    f = n(c),
    p = function(e) {
        function t(e, r) {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r))
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-big-play-button"
            }
        },
        {
            key: "handleClick",
            value: function() {
                this.player_.play()
            }
        }]),
        t
    } (s["default"]);
    p.prototype.controlText_ = "Play Video",
    f["default"].registerComponent("BigPlayButton", p),
    t["default"] = p
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function b(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : b(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(97),
    c = n(s),
    f = r(14),
    p = n(f),
    d = r(10),
    h = n(d),
    y = r(60),
    v = n(y),
    _ = function(e) {
        function t(e, r) {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r))
        }
        return a(t, e),
        u(t, [{
            key: "createEl",
            value: function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? "button": arguments[0],
                t = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
                r = arguments.length <= 2 || void 0 === arguments[2] ? {}: arguments[2];
                t = (0, v["default"])({
                    className: this.buildCSSClass()
                },
                t),
                "button" !== e && (h["default"].warn("Creating a Button with an HTML element of " + e + " is deprecated; use ClickableComponent instead."), t = (0, v["default"])({
                    tabIndex: 0
                },
                t), r = (0, v["default"])({
                    role: "button"
                },
                r)),
                r = (0, v["default"])({
                    type: "button",
                    "aria-live": "polite"
                },
                r);
                var n = p["default"].prototype.createEl.call(this, e, t, r);
                return this.createControlTextEl(n),
                n
            }
        },
        {
            key: "addChild",
            value: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
                r = this.constructor.name;
                return h["default"].warn("Adding an actionable (user controllable) child to a Button (" + r + ") is not supported; use a ClickableComponent instead."),
                p["default"].prototype.addChild.call(this, e, t)
            }
        },
        {
            key: "handleKeyPress",
            value: function(e) {
                32 !== e.which && 13 !== e.which && l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleKeyPress", this).call(this, e)
            }
        }]),
        t
    } (c["default"]);
    p["default"].registerComponent("Button", _),
    t["default"] = _
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function h(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : h(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(101),
    c = n(s),
    f = r(14),
    p = n(f),
    d = function(e) {
        function t(e, r) {
            o(this, t);
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.controlText(r && r.controlText || n.localize("Close")),
            n
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-close-button " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "handleClick",
            value: function() {
                this.trigger({
                    type: "close",
                    bubbles: !1
                })
            }
        }]),
        t
    } (c["default"]);
    p["default"].registerComponent("CloseButton", d),
    t["default"] = d
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function p(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : p(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(14),
    c = n(s);
    r(104);
    var f = function(e) {
        function t() {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e),
        u(t, [{
            key: "createEl",
            value: function() {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-progress-bar",
                    dir: "ltr"
                },
                {
                    role: "group"
                })
            }
        }]),
        t
    } (c["default"]);
    f.prototype.options_ = {
        children: ["progressControl"]
    },
    c["default"].registerComponent("ProgressBar", f),
    t["default"] = f
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function y(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : y(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p);
    r(105),
    r(111);
    var h = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(n.el(), "mouseup",
            function(e) {
                var t = d.$(".vjs-mouse-display", this.el()),
                r = d.getElAttributes(t)["data-current-time"];
                r && (r = r.split(":"), 2 === r.length && (r = 60 * r[0] * 1 + 1 * r[1], this.player_.currentTime(r)))
            }),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-progress-control vjs-control"
                })
            }
        }]),
        t
    } (f["default"]);
    h.prototype.options_ = {
        children: ["seekBar"]
    },
    f["default"].registerComponent("ProgressControl", h),
    t["default"] = h
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function O(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : O(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(3),
    f = o(c),
    p = r(106),
    d = o(p),
    h = r(14),
    y = o(h),
    v = r(15),
    _ = n(v),
    b = r(107),
    g = o(b);
    r(108),
    r(109),
    r(110);
    var m = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "timeupdate", n.updateProgress),
            n.on(e, "ended", n.updateProgress),
            e.ready(_.bind(n, n.updateProgress)),
            r.playerOptions && r.playerOptions.controlBar && r.playerOptions.controlBar.progressControl && r.playerOptions.controlBar.progressControl.keepTooltipsInside && (n.keepTooltipsInside = r.playerOptions.controlBar.progressControl.keepTooltipsInside),
            n.keepTooltipsInside && (n.tooltipProgressBar = n.addChild("TooltipProgressBar")),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-progress-holder"
                },
                {
                    "aria-label": "progress bar"
                })
            }
        },
        {
            key: "updateProgress",
            value: function() {
                if (this.updateAriaAttributes(this.el_), this.keepTooltipsInside) {
                    this.updateAriaAttributes(this.tooltipProgressBar.el_),
                    this.tooltipProgressBar.el_.style.width = this.bar.el_.style.width;
                    var e = parseFloat(f["default"].getComputedStyle(this.player().el()).width),
                    t = parseFloat(f["default"].getComputedStyle(this.tooltipProgressBar.tooltip).width),
                    r = this.tooltipProgressBar.el().style;
                    r.maxWidth = Math.floor(e - t / 2) + "px",
                    r.minWidth = Math.ceil(t / 2) + "px",
                    r.right = "-" + t / 2 + "px"
                }
            }
        },
        {
            key: "updateAriaAttributes",
            value: function(e) {
                var t = this.player_.scrubbing() ? this.player_.getCache().currentTime: this.player_.currentTime();
                e.setAttribute("aria-valuenow", (100 * this.getPercent()).toFixed(2)),
                e.setAttribute("aria-valuetext", (0, g["default"])(t, this.player_.duration()))
            }
        },
        {
            key: "getPercent",
            value: function() {
                var e = this.player_.currentTime() / this.player_.duration();
                return e >= 1 ? 1 : e
            }
        },
        {
            key: "handleMouseDown",
            value: function(e) {
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleMouseDown", this).call(this, e),
                this.player_.scrubbing(!0),
                this.videoWasPlaying = !this.player_.paused(),
                this.player_.pause()
            }
        },
        {
            key: "handleMouseMove",
            value: function(e) {
                var t = this.calculateDistance(e) * this.player_.duration();
                t === this.player_.duration() && (t -= .1),
                this.player_.currentTime(t)
            }
        },
        {
            key: "handleMouseUp",
            value: function(e) {
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleMouseUp", this).call(this, e),
                this.player_.scrubbing(!1),
                this.videoWasPlaying && this.player_.play()
            }
        },
        {
            key: "stepForward",
            value: function() {
                this.player_.currentTime(this.player_.currentTime() + 5)
            }
        },
        {
            key: "stepBack",
            value: function() {
                this.player_.currentTime(this.player_.currentTime() - 5)
            }
        }]),
        t
    } (d["default"]);
    m.prototype.options_ = {
        children: ["loadProgressBar", "mouseTimeDisplay", "playProgressBar"],
        barName: "playProgressBar"
    },
    m.prototype.playerEvent = "timeupdate",
    y["default"].registerComponent("SeekBar", m),
    t["default"] = m
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = r(60),
    y = o(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.bar = n.getChild(n.options_.barName),
            n.vertical( !! n.options_.vertical),
            n.on("mousedown", n.handleMouseDown),
            n.on("touchstart", n.handleMouseDown),
            n.on("focus", n.handleFocus),
            n.on("blur", n.handleBlur),
            n.on("click", n.handleClick),
            n.on(e, "controlsvisible", n.update),
            n.on(e, n.playerEvent, n.update),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function(e) {
                var r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
                n = arguments.length <= 2 || void 0 === arguments[2] ? {}: arguments[2];
                return r.className = r.className + " vjs-slider",
                r = (0, y["default"])({
                    tabIndex: 0
                },
                r),
                n = (0, y["default"])({
                    role: "slider",
                    "aria-valuenow": 0,
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    tabIndex: 0
                },
                n),
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, e, r, n)
            }
        },
        {
            key: "handleMouseDown",
            value: function(e) {
                var t = this.bar.el_.ownerDocument;
                e.preventDefault(),
                d.blockTextSelection(),
                this.addClass("vjs-sliding"),
                this.trigger("slideractive"),
                this.on(t, "mousemove", this.handleMouseMove),
                this.on(t, "mouseup", this.handleMouseUp),
                this.on(t, "touchmove", this.handleMouseMove),
                this.on(t, "touchend", this.handleMouseUp),
                this.handleMouseMove(e)
            }
        },
        {
            key: "handleMouseMove",
            value: function() {}
        },
        {
            key: "handleMouseUp",
            value: function() {
                var e = this.bar.el_.ownerDocument;
                d.unblockTextSelection(),
                this.removeClass("vjs-sliding"),
                this.trigger("sliderinactive"),
                this.off(e, "mousemove", this.handleMouseMove),
                this.off(e, "mouseup", this.handleMouseUp),
                this.off(e, "touchmove", this.handleMouseMove),
                this.off(e, "touchend", this.handleMouseUp),
                this.update()
            }
        },
        {
            key: "update",
            value: function() {
                if (this.el_) {
                    var e = this.getPercent(),
                    t = this.bar;
                    if (t) { ("number" != typeof e || e !== e || e < 0 || e === 1 / 0) && (e = 0);
                        var r = (100 * e).toFixed(2) + "%";
                        this.vertical() ? t.el().style.height = r: t.el().style.width = r
                    }
                }
            }
        },
        {
            key: "calculateDistance",
            value: function(e) {
                var t = d.getPointerPosition(this.el_, e);
                return this.vertical() ? t.y: t.x
            }
        },
        {
            key: "handleFocus",
            value: function() {
                this.on(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress)
            }
        },
        {
            key: "handleKeyPress",
            value: function(e) {
                37 === e.which || 40 === e.which ? (e.preventDefault(), this.stepBack()) : 38 !== e.which && 39 !== e.which || (e.preventDefault(), this.stepForward())
            }
        },
        {
            key: "handleBlur",
            value: function() {
                this.off(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress)
            }
        },
        {
            key: "handleClick",
            value: function(e) {
                e.stopImmediatePropagation(),
                e.preventDefault()
            }
        },
        {
            key: "vertical",
            value: function(e) {
                return void 0 === e ? this.vertical_ || !1 : (this.vertical_ = !!e, this.vertical_ ? this.addClass("vjs-slider-vertical") : this.addClass("vjs-slider-horizontal"), this)
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("Slider", v),
    t["default"] = v
},
function(e, t) {
    "use strict";
    function r(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? e: arguments[1];
        e = e < 0 ? 0 : e;
        var r = Math.floor(e % 60),
        n = Math.floor(e / 60 % 60),
        o = Math.floor(e / 3600),
        i = Math.floor(t / 60 % 60),
        a = Math.floor(t / 3600);
        return (isNaN(e) || e === 1 / 0) && (o = n = r = "-"),
        o = o > 0 || a > 0 ? o + ":": "",
        n = ((o || i >= 10) && n < 10 ? "0" + n: n) + ":",
        r = r < 10 ? "0" + r: r,
        o + n + r
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t["default"] = r
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function y(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : y(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "progress", n.update),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-load-progress",
                    innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"
                })
            }
        },
        {
            key: "update",
            value: function() {
                var e = this.player_.buffered(),
                t = this.player_.duration(),
                r = this.player_.bufferedEnd(),
                n = this.el_.children,
                o = function(e, t) {
                    var r = e / t || 0;
                    return 100 * (r >= 1 ? 1 : r) + "%"
                };
                this.el_.style.width = o(r, t);
                for (var i = 0; i < e.length; i++) {
                    var a = e.start(i),
                    u = e.end(i),
                    l = n[i];
                    l || (l = this.el_.appendChild(d.createEl())),
                    l.style.left = o(a, r),
                    l.style.width = o(u - a, r)
                }
                for (var s = n.length; s > e.length; s--) this.el_.removeChild(n[s - 1])
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("LoadProgressBar", h),
    t["default"] = h
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(15),
    d = n(p),
    h = r(107),
    y = o(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.updateDataAttr(),
            n.on(e, "timeupdate", n.updateDataAttr),
            e.ready(d.bind(n, n.updateDataAttr)),
            r.playerOptions && r.playerOptions.controlBar && r.playerOptions.controlBar.progressControl && r.playerOptions.controlBar.progressControl.keepTooltipsInside && (n.keepTooltipsInside = r.playerOptions.controlBar.progressControl.keepTooltipsInside),
            n.keepTooltipsInside && n.addClass("vjs-keep-tooltips-inside"),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-play-progress vjs-slider-bar",
                    innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"
                })
            }
        },
        {
            key: "updateDataAttr",
            value: function() {
                var e = this.player_.scrubbing() ? this.player_.getCache().currentTime: this.player_.currentTime();
                this.el_.setAttribute("data-current-time", (0, y["default"])(e, this.player_.duration()))
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("PlayProgressBar", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(15),
    d = n(p),
    h = r(107),
    y = o(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.updateDataAttr(),
            n.on(e, "timeupdate", n.updateDataAttr),
            e.ready(d.bind(n, n.updateDataAttr)),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                var e = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-tooltip-progress-bar vjs-slider-bar",
                    innerHTML: '<div class="vjs-time-tooltip"></div>\n        <span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"
                });
                return this.tooltip = e.querySelector(".vjs-time-tooltip"),
                e
            }
        },
        {
            key: "updateDataAttr",
            value: function() {
                var e = this.player_.scrubbing() ? this.player_.getCache().currentTime: this.player_.currentTime(),
                t = (0, y["default"])(e, this.player_.duration());
                this.el_.setAttribute("data-current-time", t),
                this.tooltip.innerHTML = t
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("TooltipProgressBar", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function j(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : j(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(3),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(8),
    y = n(h),
    v = r(15),
    _ = n(v),
    b = r(107),
    g = o(b),
    m = r(112),
    O = o(m),
    k = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return r.playerOptions && r.playerOptions.controlBar && r.playerOptions.controlBar.progressControl && r.playerOptions.controlBar.progressControl.keepTooltipsInside && (n.keepTooltipsInside = r.playerOptions.controlBar.progressControl.keepTooltipsInside),
            n.keepTooltipsInside && (n.tooltip = y.createEl("div", {
                className: "vjs-time-tooltip"
            }), n.el().appendChild(n.tooltip), n.addClass("vjs-keep-tooltips-inside")),
            n.update(0, 0),
            e.on("ready",
            function() {
                n.on(e.progressBar.progressControl.el(), "mousemove", (0, O["default"])(_.bind(n, n.handleMouseMove), 25))
            }),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-mouse-display"
                })
            }
        },
        {
            key: "handleMouseMove",
            value: function(e) {
                var t = this.player_.duration(),
                r = this.calculateDistance(e) * t,
                n = e.pageX - y.findElPosition(this.el().parentNode).left;
                this.update(r, n)
            }
        },
        {
            key: "update",
            value: function(e, t) {
                var r = (0, g["default"])(e, this.player_.duration());
                if (this.el().style.left = t + "px", this.el().setAttribute("data-current-time", r), this.keepTooltipsInside) {
                    var n = this.clampPosition_(t),
                    o = t - n + 1,
                    i = parseFloat(f["default"].getComputedStyle(this.tooltip).width),
                    a = i / 2;
                    this.tooltip.innerHTML = r,
                    this.tooltip.style.right = "-" + (a - o) + "px"
                }
            }
        },
        {
            key: "calculateDistance",
            value: function(e) {
                return y.getPointerPosition(this.el().parentNode, e).x
            }
        },
        {
            key: "clampPosition_",
            value: function(e) {
                if (!this.keepTooltipsInside) return e;
                var t = parseFloat(f["default"].getComputedStyle(this.player().el()).width),
                r = parseFloat(f["default"].getComputedStyle(this.tooltip).width),
                n = r / 2,
                o = e;
                return e < n ? o = Math.ceil(n) : e > t - n && (o = Math.floor(t - n)),
                o
            }
        }]),
        t
    } (d["default"]);
    d["default"].registerComponent("MouseTimeDisplay", k),
    t["default"] = k
},
function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        var n = !0,
        u = !0;
        if ("function" != typeof e) throw new TypeError(a);
        return r === !1 ? n = !1 : i(r) && (n = "leading" in r ? !!r.leading: n, u = "trailing" in r ? !!r.trailing: u),
        o(e, t, {
            leading: n,
            maxWait: +t,
            trailing: u
        })
    }
    var o = r(113),
    i = r(28),
    a = "Expected a function";
    e.exports = n
},
function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        function n() {
            _ && clearTimeout(_),
            d && clearTimeout(d),
            g = 0,
            d = _ = b = void 0
        }
        function l(t, r) {
            r && clearTimeout(r),
            d = _ = b = void 0,
            t && (g = i(), h = e.apply(v, p), _ || d || (p = v = void 0))
        }
        function s() {
            var e = t - (i() - y);
            e <= 0 || e > t ? l(b, d) : _ = setTimeout(s, e)
        }
        function c() {
            l(O, _)
        }
        function f() {
            if (p = arguments, y = i(), v = this, b = O && (_ || !k), m === !1) var r = k && !_;
            else {
                d || k || (g = y);
                var n = m - (y - g),
                o = n <= 0 || n > m;
                o ? (d && (d = clearTimeout(d)), g = y, h = e.apply(v, p)) : d || (d = setTimeout(c, n))
            }
            return o && _ ? _ = clearTimeout(_) : _ || t === m || (_ = setTimeout(s, t)),
            r && (o = !0, h = e.apply(v, p)),
            !o || _ || d || (p = v = void 0),
            h
        }
        var p, d, h, y, v, _, b, g = 0,
        m = !1,
        O = !0;
        if ("function" != typeof e) throw new TypeError(a);
        if (t = t < 0 ? 0 : +t || 0, r === !0) {
            var k = !0;
            O = !1
        } else o(r) && (k = !!r.leading, m = "maxWait" in r && u( + r.maxWait || 0, t), O = "trailing" in r ? !!r.trailing: O);
        return f.cancel = n,
        f
    }
    var o = r(28),
    i = r(114),
    a = "Expected a function",
    u = Math.max;
    e.exports = n
},
function(e, t, r) {
    "use strict";
    var n = r(34),
    o = n(Date, "now"),
    i = o ||
    function() {
        return (new Date).getTime()
    };
    e.exports = i
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function p(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : p(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(14),
    c = n(s);
    r(116),
    r(117),
    r(118),
    r(119),
    r(120),
    r(121),
    r(122),
    r(123),
    r(126),
    r(129),
    r(130),
    r(139),
    r(140),
    r(141),
    r(143),
    r(145),
    r(147);
    var f = function(e) {
        function t() {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e),
        u(t, [{
            key: "createEl",
            value: function() {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-control-bar",
                    dir: "ltr"
                },
                {
                    role: "group"
                })
            }
        }]),
        t
    } (c["default"]);
    f.prototype.options_ = {
        children: ["playToggle", "currentTimeDisplay", "timeDivider", "durationDisplay", "customControlSpacer", "playbackRateMenuButton", "volumeMenuButton", "fullscreenToggle"]
    },
    c["default"].registerComponent("ControlBar", f),
    t["default"] = f
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function h(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : h(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(101),
    c = n(s),
    f = r(14),
    p = n(f),
    d = function(e) {
        function t(e, r) {
            o(this, t);
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "play", n.handlePlay),
            n.on(e, "pause", n.handlePause),
            n
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-play-control " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "handleClick",
            value: function() {
                this.player_.paused() ? this.player_.play() : this.player_.pause()
            }
        },
        {
            key: "handlePlay",
            value: function() {
                this.removeClass("vjs-paused"),
                this.addClass("vjs-playing"),
                this.controlText("Pause")
            }
        },
        {
            key: "handlePause",
            value: function() {
                this.removeClass("vjs-playing"),
                this.addClass("vjs-paused"),
                this.controlText("Play")
            }
        }]),
        t
    } (c["default"]);
    d.prototype.controlText_ = "Play",
    p["default"].registerComponent("PlayToggle", d),
    t["default"] = d
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = r(107),
    y = o(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "timeupdate", n.updateContent),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                var e = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-current-time vjs-time-control vjs-control"
                });
                return this.contentEl_ = d.createEl("div", {
                    className: "vjs-current-time-display",
                    innerHTML: '<span class="vjs-control-text">Current Time </span>0:00'
                },
                {
                    "aria-live": "off"
                }),
                e.appendChild(this.contentEl_),
                e
            }
        },
        {
            key: "updateContent",
            value: function() {
                var e = this.player_.scrubbing() ? this.player_.getCache().currentTime: this.player_.currentTime(),
                t = this.localize("Current Time"),
                r = (0, y["default"])(e, this.player_.duration());
                r !== this.formattedTime_ && (this.formattedTime_ = r, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + t + "</span> " + r)
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("CurrentTimeDisplay", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = r(107),
    y = o(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "durationchange", n.updateContent),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                var e = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-duration vjs-time-control vjs-control"
                });
                return this.contentEl_ = d.createEl("div", {
                    className: "vjs-duration-display",
                    innerHTML: '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> 0:00"
                },
                {
                    "aria-live": "off"
                }),
                e.appendChild(this.contentEl_),
                e
            }
        },
        {
            key: "updateContent",
            value: function() {
                var e = this.player_.duration();
                if (e && this.duration_ !== e) {
                    this.duration_ = e;
                    var t = this.localize("Duration Time"),
                    r = (0, y["default"])(e);
                    this.contentEl_.innerHTML = '<span class="vjs-control-text">' + t + "</span> " + r
                }
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("DurationDisplay", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function p(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : p(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(14),
    c = n(s),
    f = function(e) {
        function t() {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e),
        u(t, [{
            key: "createEl",
            value: function() {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-time-control vjs-time-divider",
                    innerHTML: "<div><span>/</span></div>"
                })
            }
        }]),
        t
    } (c["default"]);
    c["default"].registerComponent("TimeDivider", f),
    t["default"] = f
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = r(107),
    y = o(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "timeupdate", n.updateContent),
            n.on(e, "durationchange", n.updateContent),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                var e = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-remaining-time vjs-time-control vjs-control"
                });
                return this.contentEl_ = d.createEl("div", {
                    className: "vjs-remaining-time-display",
                    innerHTML: '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -0:00"
                },
                {
                    "aria-live": "off"
                }),
                e.appendChild(this.contentEl_),
                e
            }
        },
        {
            key: "updateContent",
            value: function() {
                if (this.player_.duration()) {
                    var e = this.localize("Remaining Time"),
                    t = (0, y["default"])(this.player_.remainingTime());
                    t !== this.formattedTime_ && (this.formattedTime_ = t, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + e + "</span> -" + t)
                }
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("RemainingTimeDisplay", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function y(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : y(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.updateShowing(),
            n.on(n.player(), "durationchange", n.updateShowing),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                var e = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-live-control vjs-control"
                });
                return this.contentEl_ = d.createEl("div", {
                    className: "vjs-live-display",
                    innerHTML: '<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE")
                },
                {
                    "aria-live": "off"
                }),
                e.appendChild(this.contentEl_),
                e
            }
        },
        {
            key: "updateShowing",
            value: function() {
                this.player().duration() === 1 / 0 ? this.show() : this.hide()
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("LiveDisplay", h),
    t["default"] = h
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function h(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : h(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(101),
    c = n(s),
    f = r(14),
    p = n(f),
    d = function(e) {
        function t(e, r) {
            o(this, t);
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "fullscreenchange", n.handleFullscreenChange),
            n
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-fullscreen-control " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "handleFullscreenChange",
            value: function() {
                this.player_.isFullscreen() ? this.controlText("Non-Fullscreen") : this.controlText("Fullscreen")
            }
        },
        {
            key: "handleClick",
            value: function() {
                this.player_.isFullscreen() ? this.player_.exitFullscreen() : this.player_.requestFullscreen()
            }
        }]),
        t
    } (c["default"]);
    d.prototype.controlText_ = "Fullscreen",
    p["default"].registerComponent("FullscreenToggle", d),
    t["default"] = d
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function p(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : p(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(14),
    c = n(s);
    r(124);
    var f = function(e) {
        function t(e, r) {
            o(this, t);
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return e.tech_ && e.tech_.featuresVolumeControl === !1 && n.addClass("vjs-hidden"),
            n.on(e, "loadstart",
            function() {
                e.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
            }),
            n
        }
        return a(t, e),
        u(t, [{
            key: "createEl",
            value: function() {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-volume-control vjs-control"
                })
            }
        }]),
        t
    } (c["default"]);
    f.prototype.options_ = {
        children: ["volumeBar"]
    },
    c["default"].registerComponent("VolumeControl", f),
    t["default"] = f
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(106),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(15),
    y = n(h);
    r(125);
    var v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "volumechange", n.updateARIAAttributes),
            e.ready(y.bind(n,
            function() {
                var t = e.options_.playerOptions.defaultVolume.toFixed(2);
                this.player_.volume(t)
            })),
            e.ready(y.bind(n, n.updateARIAAttributes)),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-volume-bar vjs-slider-bar"
                },
                {
                    "aria-label": "volume level"
                })
            }
        },
        {
            key: "handleMouseMove",
            value: function(e) {
                this.checkMuted(),
                this.player_.volume(this.calculateDistance(e))
            }
        },
        {
            key: "checkMuted",
            value: function() {
                this.player_.muted() && this.player_.muted(!1)
            }
        },
        {
            key: "getPercent",
            value: function() {
                return this.player_.muted() ? 0 : this.player_.volume()
            }
        },
        {
            key: "stepForward",
            value: function() {
                this.checkMuted(),
                this.player_.volume(this.player_.volume() + .1)
            }
        },
        {
            key: "stepBack",
            value: function() {
                this.checkMuted(),
                this.player_.volume(this.player_.volume() - .1)
            }
        },
        {
            key: "updateARIAAttributes",
            value: function() {
                var e = (100 * this.player_.volume()).toFixed(2);
                this.el_.setAttribute("aria-valuenow", e),
                this.el_.setAttribute("aria-valuetext", e + "%")
            }
        }]),
        t
    } (f["default"]);
    v.prototype.options_ = {
        children: ["volumeLevel"],
        barName: "volumeLevel"
    },
    v.prototype.playerEvent = "volumechange",
    d["default"].registerComponent("VolumeBar", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function p(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : p(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(14),
    c = n(s),
    f = function(e) {
        function t() {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e),
        u(t, [{
            key: "createEl",
            value: function() {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-volume-level",
                    innerHTML: '<span class="vjs-control-text"></span>'
                })
            }
        }]),
        t
    } (c["default"]);
    c["default"].registerComponent("VolumeLevel", f),
    t["default"] = f
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function j(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : j(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(15),
    f = o(c),
    p = r(14),
    d = n(p),
    h = r(127),
    y = n(h),
    v = r(128),
    _ = n(v),
    b = r(129),
    g = n(b),
    m = r(124),
    O = n(m),
    k = function(e) {
        function t(e) {
            function r() {
                e.tech_ && e.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
            }
            var n = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
            i(this, t),
            void 0 === n.inline && (n.inline = !0),
            void 0 === n.vertical && (n.inline ? n.vertical = !1 : n.vertical = !0),
            n.volumeBar = n.volumeBar || {},
            n.volumeBar.vertical = !!n.vertical;
            var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
            return o.on(e, "volumechange", o.volumeUpdate),
            o.on(e, "loadstart", o.volumeUpdate),
            r.call(o),
            o.on(e, "loadstart", r),
            o.on(o.volumeBar, ["slideractive", "focus"],
            function() {
                this.addClass("vjs-slider-active")
            }),
            o.on(o.volumeBar, ["sliderinactive", "blur"],
            function() {
                this.removeClass("vjs-slider-active")
            }),
            o.on(o.volumeBar, ["focus"],
            function() {
                this.addClass("vjs-lock-showing")
            }),
            o.on(o.volumeBar, ["blur"],
            function() {
                this.removeClass("vjs-lock-showing")
            }),
            o
        }
        return u(t, e),
        l(t, [{
            key: "buildCSSClass",
            value: function() {
                var e = "";
                return e = this.options_.vertical ? "vjs-volume-menu-button-vertical": "vjs-volume-menu-button-horizontal",
                "vjs-volume-menu-button " + s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this) + " " + e
            }
        },
        {
            key: "createPopup",
            value: function() {
                var e = new y["default"](this.player_, {
                    contentElType: "div"
                }),
                t = new O["default"](this.player_, this.options_.volumeBar);
                return e.addChild(t),
                this.menuContent = e,
                this.volumeBar = t,
                this.attachVolumeBarEvents(),
                e
            }
        },
        {
            key: "handleClick",
            value: function() {
                g["default"].prototype.handleClick.call(this),
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleClick", this).call(this)
            }
        },
        {
            key: "attachVolumeBarEvents",
            value: function() {
                this.menuContent.on(["mousedown", "touchdown"], f.bind(this, this.handleMouseDown))
            }
        },
        {
            key: "handleMouseDown",
            value: function(e) {
                this.on(["mousemove", "touchmove"], f.bind(this.volumeBar, this.volumeBar.handleMouseMove)),
                this.on(this.el_.ownerDocument, ["mouseup", "touchend"], this.handleMouseUp)
            }
        },
        {
            key: "handleMouseUp",
            value: function(e) {
                this.off(["mousemove", "touchmove"], f.bind(this.volumeBar, this.volumeBar.handleMouseMove))
            }
        }]),
        t
    } (_["default"]);
    k.prototype.volumeUpdate = g["default"].prototype.update,
    k.prototype.controlText_ = "Mute",
    d["default"].registerComponent("VolumeMenuButton", k),
    t["default"] = k
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function g(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : g(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = r(15),
    y = n(h),
    v = r(7),
    _ = n(v),
    b = function(e) {
        function t() {
            return i(this, t),
            a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return u(t, e),
        l(t, [{
            key: "addItem",
            value: function(e) {
                this.addChild(e),
                e.on("click", y.bind(this,
                function() {
                    this.unlockShowing()
                }))
            }
        },
        {
            key: "createEl",
            value: function() {
                var e = this.options_.contentElType || "ul";
                this.contentEl_ = d.createEl(e, {
                    className: "vjs-menu-content"
                });
                var r = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    append: this.contentEl_,
                    className: "vjs-menu"
                });
                return r.appendChild(this.contentEl_),
                _.on(r, "click",
                function(e) {
                    e.preventDefault(),
                    e.stopImmediatePropagation()
                }),
                r
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("Popup", b),
    t["default"] = b
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function h(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : h(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(97),
    c = n(s),
    f = r(14),
    p = n(f),
    d = function(e) {
        function t(e) {
            var r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
            o(this, t);
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.update(),
            n
        }
        return a(t, e),
        u(t, [{
            key: "update",
            value: function() {
                var e = this.createPopup();
                this.popup && this.removeChild(this.popup),
                this.popup = e,
                this.addChild(e),
                this.items && 0 === this.items.length ? this.hide() : this.items && this.items.length > 1 && this.show()
            }
        },
        {
            key: "createPopup",
            value: function() {}
        },
        {
            key: "createEl",
            value: function() {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: this.buildCSSClass()
                })
            }
        },
        {
            key: "buildCSSClass",
            value: function() {
                var e = "vjs-menu-button";
                return e += this.options_.inline === !0 ? "-inline": "-popup",
                "vjs-menu-button " + e + " " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        }]),
        t
    } (c["default"]);
    p["default"].registerComponent("PopupButton", d),
    t["default"] = d
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(101),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(8),
    y = n(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "volumechange", n.update),
            e.tech_ && e.tech_.featuresVolumeControl === !1 && n.addClass("vjs-hidden"),
            n.on(e, "loadstart",
            function() {
                this.update(),
                e.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
            }),
            n
        }
        return u(t, e),
        l(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-mute-control " + s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "handleClick",
            value: function() {
                this.player_.muted(!this.player_.muted())
            }
        },
        {
            key: "update",
            value: function() {
                var e = this.player_.volume(),
                t = 3;
                0 === e || this.player_.muted() ? t = 0 : e < .33 ? t = 1 : e < .67 && (t = 2);
                var r = this.player_.muted() ? "Unmute": "Mute";
                this.controlText() !== r && this.controlText(r);
                for (var n = 0; n < 4; n++) y.removeElClass(this.el_, "vjs-vol-" + n);
                y.addElClass(this.el_, "vjs-vol-" + t)
            }
        }]),
        t
    } (f["default"]);
    v.prototype.controlText_ = "Mute",
    d["default"].registerComponent("MuteToggle", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function T(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : T(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(131),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(135),
    y = o(h),
    v = r(138),
    _ = o(v),
    b = r(134),
    g = o(b),
    m = r(8),
    O = n(m),
    k = r(16),
    j = o(k),
    w = function(e) {
        function t(e, r, n) {
            i(this, t);
            var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r, n));
            return o.el_.setAttribute("aria-label", "Chapters Menu"),
            o
        }
        return u(t, e),
        l(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-chapters-button " + s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "createItems",
            value: function() {
                var e = [],
                t = this.player_.textTracks();
                if (!t) return e;
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.kind === this.kind_ && e.push(new y["default"](this.player_, {
                        track: n
                    }))
                }
                return e
            }
        },
        {
            key: "createMenu",
            value: function() {
                for (var e = this,
                t = this.player_.textTracks() || [], r = void 0, n = this.items || [], o = t.length - 1; o >= 0; o--) {
                    var i = t[o];
                    if (i.kind === this.kind_) {
                        r = i;
                        break
                    }
                }
                var a = this.menu;
                if (void 0 === a) {
                    a = new g["default"](this.player_);
                    var u = O.createEl("li", {
                        className: "vjs-menu-title",
                        innerHTML: (0, j["default"])(this.kind_),
                        tabIndex: -1
                    });
                    a.children_.unshift(u),
                    O.insertElFirst(u, a.contentEl())
                } else n.forEach(function(e) {
                    return a.removeChild(e)
                }),
                n = [];
                if (r && (null === r.cues || void 0 === r.cues)) {
                    r.mode = "hidden";
                    var l = this.player_.remoteTextTrackEls().getTrackElementByTrack_(r);
                    l && l.addEventListener("load",
                    function(t) {
                        return e.update()
                    })
                }
                if (r && r.cues && r.cues.length > 0) for (var s = r.cues,
                c = 0,
                f = s.length; c < f; c++) {
                    var p = s[c],
                    d = new _["default"](this.player_, {
                        cue: p,
                        track: r
                    });
                    n.push(d),
                    a.addChild(d)
                }
                return n.length > 0 && this.show(),
                this.items = n,
                a
            }
        }]),
        t
    } (f["default"]);
    w.prototype.kind_ = "chapters",
    w.prototype.controlText_ = "Chapters",
    d["default"].registerComponent("ChaptersButton", w),
    t["default"] = w
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = r(132),
    s = n(l),
    c = r(14),
    f = n(c),
    p = r(135),
    d = n(p),
    h = r(137),
    y = n(h),
    v = function(e) {
        function t(e) {
            var r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
            return o(this, t),
            r.tracks = e.textTracks(),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r))
        }
        return a(t, e),
        u(t, [{
            key: "createItems",
            value: function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                e.push(new y["default"](this.player_, {
                    kind: this.kind_
                }));
                var t = this.player_.textTracks();
                if (!t) return e;
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.kind === this.kind_ && e.push(new d["default"](this.player_, {
                        track: n,
                        selectable: !0
                    }))
                }
                return e
            }
        }]),
        t
    } (s["default"]);
    f["default"].registerComponent("TextTrackButton", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = r(133),
    s = o(l),
    c = r(14),
    f = o(c),
    p = r(15),
    d = n(p),
    h = function(e) {
        function t(e, r) {
            i(this, t);
            var n = r.tracks,
            o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            if (o.items.length <= 1 && o.hide(), !n) return a(o);
            var u = d.bind(o, o.update);
            return n.addEventListener("removetrack", u),
            n.addEventListener("addtrack", u),
            o.player_.on("dispose",
            function() {
                n.removeEventListener("removetrack", u),
                n.removeEventListener("addtrack", u)
            }),
            o
        }
        return u(t, e),
        t
    } (s["default"]);
    f["default"].registerComponent("TrackButton", h),
    t["default"] = h
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function j(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : j(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(97),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(134),
    y = o(h),
    v = r(8),
    _ = n(v),
    b = r(15),
    g = n(b),
    m = r(16),
    O = o(m),
    k = function(e) {
        function t(e) {
            var r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.update(),
            n.enabled_ = !0,
            n.el_.setAttribute("aria-haspopup", "true"),
            n.el_.setAttribute("role", "menuitem"),
            n.on("keydown", n.handleSubmenuKeyPress),
            n
        }
        return u(t, e),
        l(t, [{
            key: "update",
            value: function() {
                var e = this.createMenu();
                this.menu && this.removeChild(this.menu),
                this.menu = e,
                this.addChild(e),
                this.buttonPressed_ = !1,
                this.el_.setAttribute("aria-expanded", "false"),
                this.items && 0 === this.items.length ? this.hide() : this.items && this.items.length > 1 && this.show()
            }
        },
        {
            key: "createMenu",
            value: function() {
                var e = new y["default"](this.player_);
                if (this.options_.title) {
                    var t = _.createEl("li", {
                        className: "vjs-menu-title",
                        innerHTML: (0, O["default"])(this.options_.title),
                        tabIndex: -1
                    });
                    e.children_.unshift(t),
                    _.insertElFirst(t, e.contentEl())
                }
                if (this.items = this.createItems(), this.items) for (var r = 0; r < this.items.length; r++) e.addItem(this.items[r]);
                return e
            }
        },
        {
            key: "createItems",
            value: function() {}
        },
        {
            key: "createEl",
            value: function() {
                return s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: this.buildCSSClass()
                })
            }
        },
        {
            key: "buildCSSClass",
            value: function() {
                var e = "vjs-menu-button";
                return e += this.options_.inline === !0 ? "-inline": "-popup",
                "vjs-menu-button " + e + " " + s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "handleClick",
            value: function() {
                this.one(this.menu.contentEl(), "mouseleave", g.bind(this,
                function(e) {
                    this.unpressButton(),
                    this.el_.blur()
                })),
                this.buttonPressed_ ? this.unpressButton() : this.pressButton()
            }
        },
        {
            key: "handleKeyPress",
            value: function(e) {
                27 === e.which || 9 === e.which ? (this.buttonPressed_ && this.unpressButton(), 9 !== e.which && e.preventDefault()) : 38 === e.which || 40 === e.which ? this.buttonPressed_ || (this.pressButton(), e.preventDefault()) : s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleKeyPress", this).call(this, e)
            }
        },
        {
            key: "handleSubmenuKeyPress",
            value: function(e) {
                27 !== e.which && 9 !== e.which || (this.buttonPressed_ && this.unpressButton(), 9 !== e.which && e.preventDefault())
            }
        },
        {
            key: "pressButton",
            value: function() {
                this.enabled_ && (this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-expanded", "true"), this.menu.focus())
            }
        },
        {
            key: "unpressButton",
            value: function() {
                this.enabled_ && (this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-expanded", "false"), this.el_.focus())
            }
        },
        {
            key: "disable",
            value: function() {
                return this.buttonPressed_ = !1,
                this.menu.unlockShowing(),
                this.el_.setAttribute("aria-expanded", "false"),
                this.enabled_ = !1,
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "disable", this).call(this)
            }
        },
        {
            key: "enable",
            value: function() {
                return this.enabled_ = !0,
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "enable", this).call(this)
            }
        }]),
        t
    } (f["default"]);
    d["default"].registerComponent("MenuButton", k),
    t["default"] = k
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function g(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : g(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(14),
    f = o(c),
    p = r(8),
    d = n(p),
    h = r(15),
    y = n(h),
    v = r(7),
    _ = n(v),
    b = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.focusedChild_ = -1,
            n.on("keydown", n.handleKeyPress),
            n
        }
        return u(t, e),
        l(t, [{
            key: "addItem",
            value: function(e) {
                this.addChild(e),
                e.on("click", y.bind(this,
                function() {
                    this.unlockShowing()
                }))
            }
        },
        {
            key: "createEl",
            value: function() {
                var e = this.options_.contentElType || "ul";
                this.contentEl_ = d.createEl(e, {
                    className: "vjs-menu-content"
                }),
                this.contentEl_.setAttribute("role", "menu");
                var r = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    append: this.contentEl_,
                    className: "vjs-menu"
                });
                return r.setAttribute("role", "presentation"),
                r.appendChild(this.contentEl_),
                _.on(r, "click",
                function(e) {
                    e.preventDefault(),
                    e.stopImmediatePropagation()
                }),
                r
            }
        },
        {
            key: "handleKeyPress",
            value: function(e) {
                37 === e.which || 40 === e.which ? (e.preventDefault(), this.stepForward()) : 38 !== e.which && 39 !== e.which || (e.preventDefault(), this.stepBack())
            }
        },
        {
            key: "stepForward",
            value: function() {
                var e = 0;
                void 0 !== this.focusedChild_ && (e = this.focusedChild_ + 1),
                this.focus(e)
            }
        },
        {
            key: "stepBack",
            value: function() {
                var e = 0;
                void 0 !== this.focusedChild_ && (e = this.focusedChild_ - 1),
                this.focus(e)
            }
        },
        {
            key: "focus",
            value: function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
                t = this.children().slice(),
                r = t.length && t[0].className && /vjs-menu-title/.test(t[0].className);
                r && t.shift(),
                t.length > 0 && (e < 0 ? e = 0 : e >= t.length && (e = t.length - 1), this.focusedChild_ = e, t[e].el_.focus())
            }
        }]),
        t
    } (f["default"]);
    f["default"].registerComponent("Menu", b),
    t["default"] = b
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    s = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    c = function k(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : k(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    f = r(136),
    p = o(f),
    d = r(14),
    h = o(d),
    y = r(15),
    v = n(y),
    _ = r(3),
    b = o(_),
    g = r(4),
    m = o(g),
    O = function(e) {
        function t(e, r) {
            i(this, t);
            var n = r.track,
            o = e.textTracks();
            r.label = n.label || n.language || "Unknown",
            r.selected = n["default"] || "showing" === n.mode;
            var u = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return u.track = n,
            o && !
            function() {
                var e = v.bind(u, u.handleTracksChange);
                o.addEventListener("change", e),
                u.on("dispose",
                function() {
                    o.removeEventListener("change", e)
                })
            } (),
            o && void 0 === o.onchange && !
            function() {
                var e = void 0;
                u.on(["tap", "click"],
                function() {
                    if ("object" !== l(b["default"].Event)) try {
                        e = new b["default"].Event("change")
                    } catch(t) {}
                    e || (e = m["default"].createEvent("Event"), e.initEvent("change", !0, !0)),
                    o.dispatchEvent(e)
                })
            } (),
            u
        }
        return u(t, e),
        s(t, [{
            key: "handleClick",
            value: function(e) {
                var r = this.track.kind,
                n = this.player_.textTracks();
                if (c(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleClick", this).call(this, e), n) for (var o = 0; o < n.length; o++) {
                    var i = n[o];
                    i.kind === r && (i === this.track ? i.mode = "showing": i.mode = "disabled")
                }
            }
        },
        {
            key: "handleTracksChange",
            value: function(e) {
                this.selected("showing" === this.track.mode)
            }
        }]),
        t
    } (p["default"]);
    h["default"].registerComponent("TextTrackMenuItem", O),
    t["default"] = O
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function v(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : v(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(97),
    c = n(s),
    f = r(14),
    p = n(f),
    d = r(60),
    h = n(d),
    y = function(e) {
        function t(e, r) {
            o(this, t);
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.selectable = r.selectable,
            n.selected(r.selected),
            n.selectable ? n.el_.setAttribute("role", "menuitemcheckbox") : n.el_.setAttribute("role", "menuitem"),
            n
        }
        return a(t, e),
        u(t, [{
            key: "createEl",
            value: function(e, r, n) {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "li", (0, h["default"])({
                    className: "vjs-menu-item",
                    innerHTML: this.localize(this.options_.label),
                    tabIndex: -1
                },
                r), n)
            }
        },
        {
            key: "handleClick",
            value: function() {
                this.selected(!0)
            }
        },
        {
            key: "selected",
            value: function(e) {
                this.selectable && (e ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(", selected")) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText(" ")))
            }
        }]),
        t
    } (c["default"]);
    p["default"].registerComponent("MenuItem", y),
    t["default"] = y
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = r(135),
    s = n(l),
    c = r(14),
    f = n(c),
    p = function(e) {
        function t(e, r) {
            o(this, t),
            r.track = {
                player: e,
                kind: r.kind,
                label: r.kind + " off",
                "default": !1,
                mode: "disabled"
            },
            r.selectable = !0;
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.selected(!0),
            n
        }
        return a(t, e),
        u(t, [{
            key: "handleTracksChange",
            value: function(e) {
                for (var t = this.player().textTracks(), r = !0, n = 0, o = t.length; n < o; n++) {
                    var i = t[n];
                    if (i.kind === this.track.kind && "showing" === i.mode) {
                        r = !1;
                        break
                    }
                }
                this.selected(r)
            }
        }]),
        t
    } (s["default"]);
    f["default"].registerComponent("OffTextTrackMenuItem", p),
    t["default"] = p
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(136),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(15),
    y = n(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = r.track,
            o = r.cue,
            u = e.currentTime();
            r.label = o.text,
            r.selected = o.startTime <= u && u < o.endTime;
            var l = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return l.track = n,
            l.cue = o,
            n.addEventListener("cuechange", y.bind(l, l.update)),
            l
        }
        return u(t, e),
        l(t, [{
            key: "handleClick",
            value: function() {
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleClick", this).call(this),
                this.player_.currentTime(this.cue.startTime),
                this.update(this.cue.startTime)
            }
        },
        {
            key: "update",
            value: function() {
                var e = this.cue,
                t = this.player_.currentTime();
                this.selected(e.startTime <= t && t < e.endTime)
            }
        }]),
        t
    } (f["default"]);
    d["default"].registerComponent("ChaptersTrackMenuItem", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(131),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(15),
    y = n(h),
    v = function(e) {
        function t(e, r, n) {
            i(this, t);
            var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r, n));
            o.el_.setAttribute("aria-label", "Descriptions Menu");
            var u = e.textTracks();
            return u && !
            function() {
                var e = y.bind(o, o.handleTracksChange);
                u.addEventListener("change", e),
                o.on("dispose",
                function() {
                    u.removeEventListener("change", e)
                })
            } (),
            o
        }
        return u(t, e),
        l(t, [{
            key: "handleTracksChange",
            value: function(e) {
                for (var t = this.player().textTracks(), r = !1, n = 0, o = t.length; n < o; n++) {
                    var i = t[n];
                    if (i.kind !== this.kind_ && "showing" === i.mode) {
                        r = !0;
                        break
                    }
                }
                r ? this.disable() : this.enable()
            }
        },
        {
            key: "buildCSSClass",
            value: function() {
                return "vjs-descriptions-button " + s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        }]),
        t
    } (f["default"]);
    v.prototype.kind_ = "descriptions",
    v.prototype.controlText_ = "Descriptions",
    d["default"].registerComponent("DescriptionsButton", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function h(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : h(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(131),
    c = n(s),
    f = r(14),
    p = n(f),
    d = function(e) {
        function t(e, r, n) {
            o(this, t);
            var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r, n));
            return a.el_.setAttribute("aria-label", "Subtitles Menu"),
            a
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-subtitles-button " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        }]),
        t
    } (c["default"]);
    d.prototype.kind_ = "subtitles",
    d.prototype.controlText_ = "Subtitles",
    p["default"].registerComponent("SubtitlesButton", d),
    t["default"] = d
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function v(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : v(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(131),
    c = n(s),
    f = r(14),
    p = n(f),
    d = r(142),
    h = n(d),
    y = function(e) {
        function t(e, r, n) {
            o(this, t);
            var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r, n));
            return a.el_.setAttribute("aria-label", "Captions Menu"),
            a
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-captions-button " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "update",
            value: function() {
                var e = 2;
                l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "update", this).call(this),
                this.player().tech_ && this.player().tech_.featuresNativeTextTracks && (e = 1),
                this.items && this.items.length > e ? this.show() : this.hide()
            }
        },
        {
            key: "createItems",
            value: function() {
                var e = [];
                return this.player().tech_ && this.player().tech_.featuresNativeTextTracks || e.push(new h["default"](this.player_, {
                    kind: this.kind_
                })),
                l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createItems", this).call(this, e)
            }
        }]),
        t
    } (c["default"]);
    y.prototype.kind_ = "captions",
    y.prototype.controlText_ = "Captions",
    p["default"].registerComponent("CaptionsButton", y),
    t["default"] = y
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = r(135),
    s = n(l),
    c = r(14),
    f = n(c),
    p = function(e) {
        function t(e, r) {
            o(this, t),
            r.track = {
                player: e,
                kind: r.kind,
                label: r.kind + " settings",
                selectable: !1,
                "default": !1,
                mode: "disabled"
            },
            r.selectable = !1;
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.addClass("vjs-texttrack-settings"),
            n.controlText(", opens " + r.kind + " settings dialog"),
            n
        }
        return a(t, e),
        u(t, [{
            key: "handleClick",
            value: function() {
                this.player().getChild("textTrackSettings").show(),
                this.player().getChild("textTrackSettings").el_.focus()
            }
        }]),
        t
    } (s["default"]);
    f["default"].registerComponent("CaptionSettingsMenuItem", p),
    t["default"] = p
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function v(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : v(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(132),
    c = n(s),
    f = r(14),
    p = n(f),
    d = r(144),
    h = n(d),
    y = function(e) {
        function t(e) {
            var r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
            o(this, t),
            r.tracks = e.audioTracks && e.audioTracks();
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.el_.setAttribute("aria-label", "Audio Menu"),
            n
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-audio-button " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "createItems",
            value: function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
                t = this.player_.audioTracks && this.player_.audioTracks();
                if (!t) return e;
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    e.push(new h["default"](this.player_, {
                        track: n,
                        selectable: !0
                    }))
                }
                return e
            }
        }]),
        t
    } (c["default"]);
    y.prototype.controlText_ = "Audio Track",
    p["default"].registerComponent("AudioTrackButton", y),
    t["default"] = y
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function _(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : _(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(136),
    f = o(c),
    p = r(14),
    d = o(p),
    h = r(15),
    y = n(h),
    v = function(e) {
        function t(e, r) {
            i(this, t);
            var n = r.track,
            o = e.audioTracks();
            r.label = n.label || n.language || "Unknown",
            r.selected = n.enabled;
            var u = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return u.track = n,
            o && !
            function() {
                var e = y.bind(u, u.handleTracksChange);
                o.addEventListener("change", e),
                u.on("dispose",
                function() {
                    o.removeEventListener("change", e)
                })
            } (),
            u
        }
        return u(t, e),
        l(t, [{
            key: "handleClick",
            value: function(e) {
                var r = this.player_.audioTracks();
                if (s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleClick", this).call(this, e), r) for (var n = 0; n < r.length; n++) {
                    var o = r[n];
                    o.enabled = o === this.track
                }
            }
        },
        {
            key: "handleTracksChange",
            value: function(e) {
                this.selected(this.track.enabled)
            }
        }]),
        t
    } (f["default"]);
    d["default"].registerComponent("AudioTrackMenuItem", v),
    t["default"] = v
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    s = function O(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : O(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    c = r(133),
    f = o(c),
    p = r(134),
    d = o(p),
    h = r(146),
    y = o(h),
    v = r(14),
    _ = o(v),
    b = r(8),
    g = n(b),
    m = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.updateVisibility(),
            n.updateLabel(),
            n.on(e, "loadstart", n.updateVisibility),
            n.on(e, "ratechange", n.updateLabel),
            n
        }
        return u(t, e),
        l(t, [{
            key: "createEl",
            value: function() {
                var e = s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this);
                return this.labelEl_ = g.createEl("div", {
                    className: "vjs-playback-rate-value",
                    innerHTML: 1
                }),
                e.appendChild(this.labelEl_),
                e
            }
        },
        {
            key: "buildCSSClass",
            value: function() {
                return "vjs-playback-rate " + s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "createMenu",
            value: function() {
                var e = new d["default"](this.player()),
                t = this.playbackRates();
                if (t) for (var r = t.length - 1; r >= 0; r--) e.addChild(new y["default"](this.player(), {
                    rate: t[r] + "x"
                }));
                return e
            }
        },
        {
            key: "updateARIAAttributes",
            value: function() {
                this.el().setAttribute("aria-valuenow", this.player().playbackRate())
            }
        },
        {
            key: "handleClick",
            value: function() {
                for (var e = this.player().playbackRate(), t = this.playbackRates(), r = t[0], n = 0; n < t.length; n++) if (t[n] > e) {
                    r = t[n];
                    break
                }
                this.player().playbackRate(r)
            }
        },
        {
            key: "playbackRates",
            value: function() {
                return this.options_.playbackRates || this.options_.playerOptions && this.options_.playerOptions.playbackRates
            }
        },
        {
            key: "playbackRateSupported",
            value: function() {
                return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && this.playbackRates().length > 0
            }
        },
        {
            key: "updateVisibility",
            value: function() {
                this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden")
            }
        },
        {
            key: "updateLabel",
            value: function() {
                this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x")
            }
        }]),
        t
    } (f["default"]);
    m.prototype.controlText_ = "Playback Rate",
    _["default"].registerComponent("PlaybackRateMenuButton", m),
    t["default"] = m
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function h(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : h(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(136),
    c = n(s),
    f = r(14),
    p = n(f),
    d = function(e) {
        function t(e, r) {
            o(this, t);
            var n = r.rate,
            a = parseFloat(n, 10);
            r.label = n,
            r.selected = 1 === a;
            var u = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return u.label = n,
            u.rate = a,
            u.on(e, "ratechange", u.update),
            u
        }
        return a(t, e),
        u(t, [{
            key: "handleClick",
            value: function() {
                l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "handleClick", this).call(this),
                this.player().playbackRate(this.rate)
            }
        },
        {
            key: "update",
            value: function() {
                this.selected(this.player().playbackRate() === this.rate)
            }
        }]),
        t
    } (c["default"]);
    d.prototype.contentElType = "button",
    p["default"].registerComponent("PlaybackRateMenuItem", d),
    t["default"] = d
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function h(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : h(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(148),
    c = n(s),
    f = r(14),
    p = n(f),
    d = function(e) {
        function t() {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-custom-control-spacer " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "createEl",
            value: function() {
                var e = l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, {
                    className: this.buildCSSClass()
                });
                return e.innerHTML = "&nbsp;",
                e
            }
        }]),
        t
    } (c["default"]);
    p["default"].registerComponent("CustomControlSpacer", d),
    t["default"] = d
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function p(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : p(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(14),
    c = n(s),
    f = function(e) {
        function t() {
            return o(this, t),
            i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-spacer " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this);
            }
        },
        {
            key: "createEl",
            value: function() {
                return l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: this.buildCSSClass()
                })
            }
        }]),
        t
    } (c["default"]);
    c["default"].registerComponent("Spacer", f),
    t["default"] = f
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    l = function v(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : v(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    s = r(14),
    c = n(s),
    f = r(73),
    p = n(f),
    d = r(17),
    h = n(d),
    y = function(e) {
        function t(e, r) {
            o(this, t);
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.on(e, "error", n.open),
            n
        }
        return a(t, e),
        u(t, [{
            key: "buildCSSClass",
            value: function() {
                return "vjs-error-display " + l(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildCSSClass", this).call(this)
            }
        },
        {
            key: "content",
            value: function() {
                var e = this.player().error();
                return e ? this.localize(e.message) : ""
            }
        }]),
        t
    } (p["default"]);
    y.prototype.options_ = (0, h["default"])(p["default"].prototype.options_, {
        fillAlways: !0,
        temporary: !1,
        uncloseable: !0
    }),
    c["default"].registerComponent("ErrorDisplay", y),
    t["default"] = y
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    function l(e, t, r) {
        var n = '\n    <div role="document">\n      <div role="heading" aria-level="1" id="' + t + '" class="vjs-control-text">Captions Settings Dialog</div>\n      <div id="' + r + '" class="vjs-control-text">Beginning of dialog window. Escape will cancel and close the window.</div>\n      <div class="vjs-tracksettings">\n        <div class="vjs-tracksettings-colors">\n          <fieldset class="vjs-fg-color vjs-tracksetting">\n            <legend>Text</legend>\n            <label class="vjs-label" for="captions-foreground-color-' + e + '">Color</label>\n            <select id="captions-foreground-color-' + e + '">\n              <option value="#FFF" selected>White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-text-opacity vjs-opacity">\n              <label class="vjs-label" for="captions-foreground-opacity-' + e + '">Transparency</label>\n              <select id="captions-foreground-opacity-' + e + '">\n                <option value="1" selected>Opaque</option>\n                <option value="0.5">Semi-Opaque</option>\n              </select>\n            </span>\n          </fieldset>\n          <fieldset class="vjs-bg-color vjs-tracksetting">\n            <legend>Background</legend>\n            <label class="vjs-label" for="captions-background-color-' + e + '">Color</label>\n            <select id="captions-background-color-' + e + '">\n              <option value="#000" selected>Black</option>\n              <option value="#FFF">White</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-bg-opacity vjs-opacity">\n              <label class="vjs-label" for="captions-background-opacity-' + e + '">Transparency</label>\n              <select id="captions-background-opacity-' + e + '">\n                <option value="1" selected>Opaque</option>\n                <option value="0.5">Semi-Transparent</option>\n                <option value="0">Transparent</option>\n              </select>\n            </span>\n          </fieldset>\n          <fieldset class="window-color vjs-tracksetting">\n            <legend>Window</legend>\n            <label class="vjs-label" for="captions-window-color-' + e + '">Color</label>\n            <select id="captions-window-color-' + e + '">\n              <option value="#000" selected>Black</option>\n              <option value="#FFF">White</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-window-opacity vjs-opacity">\n              <label class="vjs-label" for="captions-window-opacity-' + e + '">Transparency</label>\n              <select id="captions-window-opacity-' + e + '">\n                <option value="0" selected>Transparent</option>\n                <option value="0.5">Semi-Transparent</option>\n                <option value="1">Opaque</option>\n              </select>\n            </span>\n          </fieldset>\n        </div> <!-- vjs-tracksettings-colors -->\n        <div class="vjs-tracksettings-font">\n          <div class="vjs-font-percent vjs-tracksetting">\n            <label class="vjs-label" for="captions-font-size-' + e + '">Font Size</label>\n            <select id="captions-font-size-' + e + '">\n              <option value="0.50">50%</option>\n              <option value="0.75">75%</option>\n              <option value="1.00" selected>100%</option>\n              <option value="1.25">125%</option>\n              <option value="1.50">150%</option>\n              <option value="1.75">175%</option>\n              <option value="2.00">200%</option>\n              <option value="3.00">300%</option>\n              <option value="4.00">400%</option>\n            </select>\n          </div>\n          <div class="vjs-edge-style vjs-tracksetting">\n            <label class="vjs-label" for="captions-edge-style-' + e + '">Text Edge Style</label>\n            <select id="captions-edge-style-' + e + '">\n              <option value="none" selected>None</option>\n              <option value="raised">Raised</option>\n              <option value="depressed">Depressed</option>\n              <option value="uniform">Uniform</option>\n              <option value="dropshadow">Dropshadow</option>\n            </select>\n          </div>\n          <div class="vjs-font-family vjs-tracksetting">\n            <label class="vjs-label" for="captions-font-family-' + e + '">Font Family</label>\n            <select id="captions-font-family-' + e + '">\n              <option value="proportionalSansSerif" selected>Proportional Sans-Serif</option>\n              <option value="monospaceSansSerif">Monospace Sans-Serif</option>\n              <option value="proportionalSerif">Proportional Serif</option>\n              <option value="monospaceSerif">Monospace Serif</option>\n              <option value="casual">Casual</option>\n              <option value="script">Script</option>\n              <option value="small-caps">Small Caps</option>\n            </select>\n          </div>\n        </div> <!-- vjs-tracksettings-font -->\n        <div class="vjs-tracksettings-controls">\n          <button class="vjs-default-button">Defaults</button>\n          <button class="vjs-done-button">Done</button>\n        </div>\n      </div> <!-- vjs-tracksettings -->\n    </div> <!--  role="document" -->\n  ';
        return n
    }
    function s(e) {
        var t = void 0;
        return e.selectedOptions ? t = e.selectedOptions[0] : e.options && (t = e.options[e.options.selectedIndex]),
        t.value
    }
    function c(e, t) {
        if (t) {
            var r = void 0;
            for (r = 0; r < e.options.length; r++) {
                var n = e.options[r];
                if (n.value === t) break
            }
            e.selectedIndex = r
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var f = function() {
        function e(e, t) {
            var r = [],
            n = !0,
            o = !1,
            i = void 0;
            try {
                for (var a, u = e[Symbol.iterator](); ! (n = (a = u.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0);
            } catch(l) {
                o = !0,
                i = l
            } finally {
                try { ! n && u["return"] && u["return"]()
                } finally {
                    if (o) throw i
                }
            }
            return r
        }
        return function(t, r) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, r);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    } (),
    p = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    d = function E(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : E(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    h = r(14),
    y = o(h),
    v = r(7),
    _ = n(v),
    b = r(15),
    g = n(b),
    m = r(10),
    O = o(m),
    k = r(71),
    j = o(k),
    w = r(3),
    T = o(w),
    P = function(e) {
        function t(e, r) {
            i(this, t);
            var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
            return n.hide(),
            void 0 === r.persistTextTrackSettings && (n.options_.persistTextTrackSettings = n.options_.playerOptions.persistTextTrackSettings),
            _.on(n.$(".vjs-done-button"), "click", g.bind(n,
            function() {
                this.saveSettings(),
                this.hide()
            })),
            _.on(n.$(".vjs-default-button"), "click", g.bind(n,
            function() {
                this.$(".vjs-fg-color > select").selectedIndex = 0,
                this.$(".vjs-bg-color > select").selectedIndex = 0,
                this.$(".window-color > select").selectedIndex = 0,
                this.$(".vjs-text-opacity > select").selectedIndex = 0,
                this.$(".vjs-bg-opacity > select").selectedIndex = 0,
                this.$(".vjs-window-opacity > select").selectedIndex = 0,
                this.$(".vjs-edge-style select").selectedIndex = 0,
                this.$(".vjs-font-family select").selectedIndex = 0,
                this.$(".vjs-font-percent select").selectedIndex = 2,
                this.updateDisplay()
            })),
            _.on(n.$(".vjs-fg-color > select"), "change", g.bind(n, n.updateDisplay)),
            _.on(n.$(".vjs-bg-color > select"), "change", g.bind(n, n.updateDisplay)),
            _.on(n.$(".window-color > select"), "change", g.bind(n, n.updateDisplay)),
            _.on(n.$(".vjs-text-opacity > select"), "change", g.bind(n, n.updateDisplay)),
            _.on(n.$(".vjs-bg-opacity > select"), "change", g.bind(n, n.updateDisplay)),
            _.on(n.$(".vjs-window-opacity > select"), "change", g.bind(n, n.updateDisplay)),
            _.on(n.$(".vjs-font-percent select"), "change", g.bind(n, n.updateDisplay)),
            _.on(n.$(".vjs-edge-style select"), "change", g.bind(n, n.updateDisplay)),
            _.on(n.$(".vjs-font-family select"), "change", g.bind(n, n.updateDisplay)),
            n.options_.persistTextTrackSettings && n.restoreSettings(),
            n
        }
        return u(t, e),
        p(t, [{
            key: "createEl",
            value: function() {
                var e = this.id_,
                r = "TTsettingsDialogLabel-" + e,
                n = "TTsettingsDialogDescription-" + e;
                return d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createEl", this).call(this, "div", {
                    className: "vjs-caption-settings vjs-modal-overlay",
                    innerHTML: l(e, r, n),
                    tabIndex: -1
                },
                {
                    role: "dialog",
                    "aria-labelledby": r,
                    "aria-describedby": n
                })
            }
        },
        {
            key: "getValues",
            value: function() {
                var e = s(this.$(".vjs-edge-style select")),
                t = s(this.$(".vjs-font-family select")),
                r = s(this.$(".vjs-fg-color > select")),
                n = s(this.$(".vjs-text-opacity > select")),
                o = s(this.$(".vjs-bg-color > select")),
                i = s(this.$(".vjs-bg-opacity > select")),
                a = s(this.$(".window-color > select")),
                u = s(this.$(".vjs-window-opacity > select")),
                l = T["default"].parseFloat(s(this.$(".vjs-font-percent > select"))),
                c = {
                    fontPercent: l,
                    fontFamily: t,
                    textOpacity: n,
                    windowColor: a,
                    windowOpacity: u,
                    backgroundOpacity: i,
                    edgeStyle: e,
                    color: r,
                    backgroundColor: o
                };
                for (var f in c)("" === c[f] || "none" === c[f] || "fontPercent" === f && 1 === c[f]) && delete c[f];
                return c
            }
        },
        {
            key: "setValues",
            value: function(e) {
                c(this.$(".vjs-edge-style select"), e.edgeStyle),
                c(this.$(".vjs-font-family select"), e.fontFamily),
                c(this.$(".vjs-fg-color > select"), e.color),
                c(this.$(".vjs-text-opacity > select"), e.textOpacity),
                c(this.$(".vjs-bg-color > select"), e.backgroundColor),
                c(this.$(".vjs-bg-opacity > select"), e.backgroundOpacity),
                c(this.$(".window-color > select"), e.windowColor),
                c(this.$(".vjs-window-opacity > select"), e.windowOpacity);
                var t = e.fontPercent;
                t && (t = t.toFixed(2)),
                c(this.$(".vjs-font-percent > select"), t)
            }
        },
        {
            key: "restoreSettings",
            value: function() {
                var e = void 0,
                t = void 0;
                try {
                    var r = (0, j["default"])(T["default"].localStorage.getItem("vjs-text-track-settings")),
                    n = f(r, 2);
                    e = n[0],
                    t = n[1],
                    e && O["default"].error(e)
                } catch(o) {
                    O["default"].warn(o)
                }
                t && this.setValues(t)
            }
        },
        {
            key: "saveSettings",
            value: function() {
                if (this.options_.persistTextTrackSettings) {
                    var e = this.getValues();
                    try {
                        Object.getOwnPropertyNames(e).length > 0 ? T["default"].localStorage.setItem("vjs-text-track-settings", JSON.stringify(e)) : T["default"].localStorage.removeItem("vjs-text-track-settings")
                    } catch(t) {
                        O["default"].warn(t)
                    }
                }
            }
        },
        {
            key: "updateDisplay",
            value: function() {
                var e = this.player_.getChild("textTrackDisplay");
                e && e.updateDisplay()
            }
        }]),
        t
    } (y["default"]);
    y["default"].registerComponent("TextTrackSettings", P),
    t["default"] = P
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(t)
            }
        }))
    }
    function a(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function u(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function l(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    c = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r),
            n && e(t, n),
            t
        }
    } (),
    f = function W(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(e);
            return null === o ? void 0 : W(o, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        if (void 0 !== i) return i.call(r)
    },
    p = i(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]),
    d = r(74),
    h = o(d),
    y = r(14),
    v = o(y),
    _ = r(8),
    b = n(_),
    g = r(80),
    m = n(g),
    O = r(15),
    k = n(O),
    j = r(10),
    w = o(j),
    T = r(12),
    P = o(T),
    E = r(11),
    C = n(E),
    S = r(4),
    x = o(S),
    M = r(3),
    A = o(M),
    I = r(60),
    D = o(I),
    F = r(17),
    R = o(F),
    N = r(16),
    L = o(N),
    B = function(e) {
        function t(e, r) {
            a(this, t);
            var n = u(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r)),
            o = e.source,
            i = !1;
            if (o && (n.el_.currentSrc !== o.src || e.tag && 3 === e.tag.initNetworkState_) ? n.setSource(o) : n.handleLateInit_(n.el_), n.el_.hasChildNodes()) {
                for (var l = n.el_.childNodes,
                s = l.length,
                c = []; s--;) {
                    var f = l[s],
                    d = f.nodeName.toLowerCase();
                    "track" === d && (n.featuresNativeTextTracks ? (n.remoteTextTrackEls().addTrackElement_(f), n.remoteTextTracks().addTrack_(f.track), i || n.el_.hasAttribute("crossorigin") || !m.isCrossOrigin(f.src) || (i = !0)) : c.push(f))
                }
                for (var h = 0; h < c.length; h++) n.el_.removeChild(c[h])
            }
            var y = ["audio", "video"];
            return y.forEach(function(e) {
                var t = (0, L["default"])(e);
                if (n["featuresNative" + t + "Tracks"]) {
                    var r = n.el()[e + "Tracks"];
                    r && r.addEventListener && (r.addEventListener("change", k.bind(n, n["handle" + t + "TrackChange_"])), r.addEventListener("addtrack", k.bind(n, n["handle" + t + "TrackAdd_"])), r.addEventListener("removetrack", k.bind(n, n["handle" + t + "TrackRemove_"])), n.on("loadstart", n["removeOld" + t + "Tracks_"]))
                }
            }),
            n.featuresNativeTextTracks && (i && w["default"].warn((0, P["default"])(p)), n.handleTextTrackChange_ = k.bind(n, n.handleTextTrackChange), n.handleTextTrackAdd_ = k.bind(n, n.handleTextTrackAdd), n.handleTextTrackRemove_ = k.bind(n, n.handleTextTrackRemove), n.proxyNativeTextTracks_()),
            (C.TOUCH_ENABLED || C.IS_IPHONE || C.IS_NATIVE_ANDROID) && e.nativeControlsForTouch === !0 && n.setControls(!0),
            n.triggerReady(),
            n
        }
        return l(t, e),
        c(t, [{
            key: "dispose",
            value: function() {
                var e = this; ["audio", "video", "text"].forEach(function(t) {
                    var r = (0, L["default"])(t),
                    n = e.el_[t + "Tracks"];
                    n && n.removeEventListener && (n.removeEventListener("change", e["handle" + r + "TrackChange_"]), n.removeEventListener("addtrack", e["handle" + r + "TrackAdd_"]), n.removeEventListener("removetrack", e["handle" + r + "TrackRemove_"])),
                    n && e.off("loadstart", e["removeOld" + r + "Tracks_"])
                }),
                t.disposeMediaElement(this.el_),
                f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "dispose", this).call(this)
            }
        },
        {
            key: "createEl",
            value: function() {
                var e = this.options_.tag;
                if (!e || this.movingMediaElementInDOM === !1) if (e) {
                    var r = e.cloneNode(!0);
                    e.parentNode.insertBefore(r, e),
                    t.disposeMediaElement(e),
                    e = r
                } else {
                    e = x["default"].createElement("video");
                    var n = this.options_.tag && b.getElAttributes(this.options_.tag),
                    o = (0, R["default"])({},
                    n);
                    C.TOUCH_ENABLED && this.options_.nativeControlsForTouch === !0 || delete o.controls,
                    b.setElAttributes(e, (0, D["default"])(o, {
                        id: this.options_.techId,
                        "class": "vjs-tech"
                    }))
                }
                for (var i = ["autoplay", "preload", "loop", "muted"], a = i.length - 1; a >= 0; a--) {
                    var u = i[a],
                    l = {};
                    "undefined" != typeof this.options_[u] && (l[u] = this.options_[u]),
                    b.setElAttributes(e, l)
                }
                return e
            }
        },
        {
            key: "handleLateInit_",
            value: function(e) {
                var t = this;
                if (0 !== e.networkState && 3 !== e.networkState) {
                    if (0 === e.readyState) {
                        var r = function() {
                            var e = !1,
                            r = function() {
                                e = !0
                            };
                            t.on("loadstart", r);
                            var n = function() {
                                e || this.trigger("loadstart")
                            };
                            return t.on("loadedmetadata", n),
                            t.ready(function() {
                                this.off("loadstart", r),
                                this.off("loadedmetadata", n),
                                e || this.trigger("loadstart")
                            }),
                            {
                                v: void 0
                            }
                        } ();
                        if ("object" === ("undefined" == typeof r ? "undefined": s(r))) return r.v
                    }
                    var n = ["loadstart"];
                    n.push("loadedmetadata"),
                    e.readyState >= 2 && n.push("loadeddata"),
                    e.readyState >= 3 && n.push("canplay"),
                    e.readyState >= 4 && n.push("canplaythrough"),
                    this.ready(function() {
                        n.forEach(function(e) {
                            this.trigger(e)
                        },
                        this)
                    })
                }
            }
        },
        {
            key: "proxyNativeTextTracks_",
            value: function() {
                var e = this.el().textTracks;
                if (e) {
                    for (var t = 0; t < e.length; t++) this.textTracks().addTrack_(e[t]);
                    e.addEventListener && (e.addEventListener("change", this.handleTextTrackChange_), e.addEventListener("addtrack", this.handleTextTrackAdd_), e.addEventListener("removetrack", this.handleTextTrackRemove_)),
                    this.on("loadstart", this.removeOldTextTracks_)
                }
            }
        },
        {
            key: "handleTextTrackChange",
            value: function(e) {
                var t = this.textTracks();
                this.textTracks().trigger({
                    type: "change",
                    target: t,
                    currentTarget: t,
                    srcElement: t
                })
            }
        },
        {
            key: "handleTextTrackAdd",
            value: function(e) {
                this.textTracks().addTrack_(e.track)
            }
        },
        {
            key: "handleTextTrackRemove",
            value: function(e) {
                this.textTracks().removeTrack_(e.track)
            }
        },
        {
            key: "handleVideoTrackChange_",
            value: function(e) {
                var t = this.videoTracks();
                this.videoTracks().trigger({
                    type: "change",
                    target: t,
                    currentTarget: t,
                    srcElement: t
                })
            }
        },
        {
            key: "handleVideoTrackAdd_",
            value: function(e) {
                this.videoTracks().addTrack_(e.track)
            }
        },
        {
            key: "handleVideoTrackRemove_",
            value: function(e) {
                this.videoTracks().removeTrack_(e.track)
            }
        },
        {
            key: "handleAudioTrackChange_",
            value: function(e) {
                var t = this.audioTracks();
                this.audioTracks().trigger({
                    type: "change",
                    target: t,
                    currentTarget: t,
                    srcElement: t
                })
            }
        },
        {
            key: "handleAudioTrackAdd_",
            value: function(e) {
                this.audioTracks().addTrack_(e.track)
            }
        },
        {
            key: "handleAudioTrackRemove_",
            value: function(e) {
                this.audioTracks().removeTrack_(e.track)
            }
        },
        {
            key: "removeOldTracks_",
            value: function(e, t) {
                var r = [];
                if (t) {
                    for (var n = 0; n < e.length; n++) {
                        for (var o = e[n], i = !1, a = 0; a < t.length; a++) if (t[a] === o) {
                            i = !0;
                            break
                        }
                        i || r.push(o)
                    }
                    for (var u = 0; u < r.length; u++) {
                        var l = r[u];
                        e.removeTrack_(l)
                    }
                }
            }
        },
        {
            key: "removeOldTextTracks_",
            value: function() {
                var e = this.textTracks(),
                t = this.el().textTracks;
                this.removeOldTracks_(e, t)
            }
        },
        {
            key: "removeOldAudioTracks_",
            value: function() {
                var e = this.audioTracks(),
                t = this.el().audioTracks;
                this.removeOldTracks_(e, t)
            }
        },
        {
            key: "removeOldVideoTracks_",
            value: function() {
                var e = this.videoTracks(),
                t = this.el().videoTracks;
                this.removeOldTracks_(e, t)
            }
        },
        {
            key: "play",
            value: function() {
                var e = this.el_.play();
                void 0 !== e && "function" == typeof e.then && e.then(null,
                function(e) {})
            }
        },
        {
            key: "pause",
            value: function() {
                this.el_.pause()
            }
        },
        {
            key: "paused",
            value: function() {
                return this.el_.paused
            }
        },
        {
            key: "currentTime",
            value: function() {
                return this.el_.currentTime
            }
        },
        {
            key: "setCurrentTime",
            value: function(e) {
                try {
                    this.el_.currentTime = e
                } catch(t) { (0, w["default"])(t, "Video is not ready. (Video.js)")
                }
            }
        },
        {
            key: "duration",
            value: function() {
                return this.el_.duration || 0
            }
        },
        {
            key: "buffered",
            value: function() {
                return this.el_.buffered
            }
        },
        {
            key: "volume",
            value: function() {
                return this.el_.volume
            }
        },
        {
            key: "setVolume",
            value: function(e) {
                this.el_.volume = e
            }
        },
        {
            key: "muted",
            value: function() {
                return this.el_.muted
            }
        },
        {
            key: "setMuted",
            value: function(e) {
                this.el_.muted = e
            }
        },
        {
            key: "width",
            value: function() {
                return this.el_.offsetWidth
            }
        },
        {
            key: "height",
            value: function() {
                return this.el_.offsetHeight
            }
        },
        {
            key: "supportsFullScreen",
            value: function() {
                if ("function" == typeof this.el_.webkitEnterFullScreen) {
                    var e = A["default"].navigator && A["default"].navigator.userAgent || "";
                    if (/Android/.test(e) || !/Chrome|Mac OS X 10.5/.test(e)) return ! 0
                }
                return ! 1
            }
        },
        {
            key: "enterFullScreen",
            value: function() {
                var e = this.el_;
                "webkitDisplayingFullscreen" in e && this.one("webkitbeginfullscreen",
                function() {
                    this.one("webkitendfullscreen",
                    function() {
                        this.trigger("fullscreenchange", {
                            isFullscreen: !1
                        })
                    }),
                    this.trigger("fullscreenchange", {
                        isFullscreen: !0
                    })
                }),
                e.paused && e.networkState <= e.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function() {
                    e.pause(),
                    e.webkitEnterFullScreen()
                },
                0)) : e.webkitEnterFullScreen()
            }
        },
        {
            key: "exitFullScreen",
            value: function() {
                this.el_.webkitExitFullScreen()
            }
        },
        {
            key: "src",
            value: function(e) {
                return void 0 === e ? this.el_.src: void this.setSrc(e)
            }
        },
        {
            key: "setSrc",
            value: function(e) {
                this.el_.src = e
            }
        },
        {
            key: "load",
            value: function() {
                this.el_.load()
            }
        },
        {
            key: "reset",
            value: function() {
                t.resetMediaElement(this.el_)
            }
        },
        {
            key: "currentSrc",
            value: function() {
                return this.currentSource_ ? this.currentSource_.src: this.el_.currentSrc
            }
        },
        {
            key: "poster",
            value: function() {
                return this.el_.poster
            }
        },
        {
            key: "setPoster",
            value: function(e) {
                this.el_.poster = e
            }
        },
        {
            key: "preload",
            value: function() {
                return this.el_.preload
            }
        },
        {
            key: "setPreload",
            value: function(e) {
                this.el_.preload = e
            }
        },
        {
            key: "autoplay",
            value: function() {
                return this.el_.autoplay
            }
        },
        {
            key: "setAutoplay",
            value: function(e) {
                this.el_.autoplay = e
            }
        },
        {
            key: "controls",
            value: function() {
                return this.el_.controls
            }
        },
        {
            key: "setControls",
            value: function(e) {
                this.el_.controls = !!e
            }
        },
        {
            key: "loop",
            value: function() {
                return this.el_.loop
            }
        },
        {
            key: "setLoop",
            value: function(e) {
                this.el_.loop = e
            }
        },
        {
            key: "error",
            value: function() {
                return this.el_.error
            }
        },
        {
            key: "seeking",
            value: function() {
                return this.el_.seeking
            }
        },
        {
            key: "seekable",
            value: function() {
                return this.el_.seekable
            }
        },
        {
            key: "ended",
            value: function() {
                return this.el_.ended
            }
        },
        {
            key: "defaultMuted",
            value: function() {
                return this.el_.defaultMuted
            }
        },
        {
            key: "playbackRate",
            value: function() {
                return this.el_.playbackRate
            }
        },
        {
            key: "played",
            value: function() {
                return this.el_.played
            }
        },
        {
            key: "setPlaybackRate",
            value: function(e) {
                this.el_.playbackRate = e
            }
        },
        {
            key: "networkState",
            value: function() {
                return this.el_.networkState
            }
        },
        {
            key: "readyState",
            value: function() {
                return this.el_.readyState
            }
        },
        {
            key: "videoWidth",
            value: function() {
                return this.el_.videoWidth
            }
        },
        {
            key: "videoHeight",
            value: function() {
                return this.el_.videoHeight
            }
        },
        {
            key: "textTracks",
            value: function() {
                return f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "textTracks", this).call(this)
            }
        },
        {
            key: "addTextTrack",
            value: function(e, r, n) {
                return this.featuresNativeTextTracks ? this.el_.addTextTrack(e, r, n) : f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addTextTrack", this).call(this, e, r, n)
            }
        },
        {
            key: "addRemoteTextTrack",
            value: function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? {}: arguments[0];
                if (!this.featuresNativeTextTracks) return f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addRemoteTextTrack", this).call(this, e);
                var r = x["default"].createElement("track");
                return e.kind && (r.kind = e.kind),
                e.label && (r.label = e.label),
                (e.language || e.srclang) && (r.srclang = e.language || e.srclang),
                e["default"] && (r["default"] = e["default"]),
                e.id && (r.id = e.id),
                e.src && (r.src = e.src),
                this.el().appendChild(r),
                this.remoteTextTrackEls().addTrackElement_(r),
                this.remoteTextTracks().addTrack_(r.track),
                r
            }
        },
        {
            key: "removeRemoteTextTrack",
            value: function(e) {
                if (!this.featuresNativeTextTracks) return f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "removeRemoteTextTrack", this).call(this, e);
                var r = this.remoteTextTrackEls().getTrackElementByTrack_(e);
                this.remoteTextTrackEls().removeTrackElement_(r),
                this.remoteTextTracks().removeTrack_(e);
                for (var n = this.$$("track"), o = n.length; o--;) e !== n[o] && e !== n[o].track || this.el().removeChild(n[o])
            }
        }]),
        t
    } (h["default"]);
    B.TEST_VID = x["default"].createElement("video");
    var H = x["default"].createElement("track");
    H.kind = "captions",
    H.srclang = "en",
    H.label = "English",
    B.TEST_VID.appendChild(H),
    B.isSupported = function() {
        try {
            B.TEST_VID.volume = .5
        } catch(e) {
            return ! 1
        }
        return !! B.TEST_VID.canPlayType
    },
    h["default"].withSourceHandlers(B),
    B.nativeSourceHandler = {},
    B.nativeSourceHandler.canPlayType = function(e) {
        try {
            return B.TEST_VID.canPlayType(e)
        } catch(t) {
            return ""
        }
    },
    B.nativeSourceHandler.canHandleSource = function(e, t) {
        if (e.type) return B.nativeSourceHandler.canPlayType(e.type);
        if (e.src) {
            var r = m.getFileExtension(e.src);
            return B.nativeSourceHandler.canPlayType("video/" + r)
        }
        return ""
    },
    B.nativeSourceHandler.handleSource = function(e, t, r) {
        t.setSrc(e.src)
    },
    B.nativeSourceHandler.dispose = function() {},
    B.registerSourceHandler(B.nativeSourceHandler),
    B.canControlVolume = function() {
        try {
            var e = B.TEST_VID.volume;
            return B.TEST_VID.volume = e / 2 + .1,
            e !== B.TEST_VID.volume
        } catch(t) {
            return ! 1
        }
    },
    B.canControlPlaybackRate = function() {
        if (C.IS_ANDROID && C.IS_CHROME) return ! 1;
        try {
            var e = B.TEST_VID.playbackRate;
            return B.TEST_VID.playbackRate = e / 2 + .1,
            e !== B.TEST_VID.playbackRate
        } catch(t) {
            return ! 1
        }
    },
    B.supportsNativeTextTracks = function() {
        var e = void 0;
        return e = !!B.TEST_VID.textTracks,
        e && B.TEST_VID.textTracks.length > 0 && (e = "number" != typeof B.TEST_VID.textTracks[0].mode),
        e && C.IS_FIREFOX && (e = !1),
        !e || "onremovetrack" in B.TEST_VID.textTracks || (e = !1),
        e
    },
    B.supportsNativeVideoTracks = function() {
        var e = !!B.TEST_VID.videoTracks;
        return e
    },
    B.supportsNativeAudioTracks = function() {
        var e = !!B.TEST_VID.audioTracks;
        return e
    },
    B.Events = ["loadstart", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "durationchange", "timeupdate", "progress", "play", "pause", "ratechange", "volumechange"],
    B.prototype.featuresVolumeControl = B.canControlVolume(),
    B.prototype.featuresPlaybackRate = B.canControlPlaybackRate(),
    B.prototype.movingMediaElementInDOM = !C.IS_IOS,
    B.prototype.featuresFullscreenResize = !0,
    B.prototype.featuresProgressEvents = !0,
    B.prototype.featuresNativeTextTracks = B.supportsNativeTextTracks(),
    B.prototype.featuresNativeVideoTracks = B.supportsNativeVideoTracks(),
    B.prototype.featuresNativeAudioTracks = B.supportsNativeAudioTracks();
    var V = void 0,
    $ = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
    U = /^video\/mp4/i;
    B.patchCanPlayType = function() {
        C.ANDROID_VERSION >= 4 && (V || (V = B.TEST_VID.constructor.prototype.canPlayType), B.TEST_VID.constructor.prototype.canPlayType = function(e) {
            return e && $.test(e) ? "maybe": V.call(this, e)
        }),
        C.IS_OLD_ANDROID && (V || (V = B.TEST_VID.constructor.prototype.canPlayType), B.TEST_VID.constructor.prototype.canPlayType = function(e) {
            return e && U.test(e) ? "maybe": V.call(this, e)
        })
    },
    B.unpatchCanPlayType = function() {
        var e = B.TEST_VID.constructor.prototype.canPlayType;
        return B.TEST_VID.constructor.prototype.canPlayType = V,
        V = null,
        e
    },
    B.patchCanPlayType(),
    B.disposeMediaElement = function(e) {
        if (e) {
            for (e.parentNode && e.parentNode.removeChild(e); e.hasChildNodes();) e.removeChild(e.firstChild);
            e.removeAttribute("src"),
            "function" == typeof e.load && !
            function() {
                try {
                    e.load()
                } catch(t) {}
            } ()
        }
    },
    B.resetMediaElement = function(e) {
        if (e) {
            for (var t = e.querySelectorAll("source"), r = t.length; r--;) e.removeChild(t[r]);
            e.removeAttribute("src"),
            "function" == typeof e.load && !
            function() {
                try {
                    e.load()
                } catch(t) {}
            } ()
        }
    },
    v["default"].registerComponent("Html5", B),
    h["default"].registerTech("Html5", B),
    t["default"] = B
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = r(55),
    i = n(o),
    a = function(e, t) {
        i["default"].prototype[e] = t
    };
    t["default"] = a
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = r(78),
    s = r(79),
    c = o(s),
    f = r(17),
    p = o(f),
    d = r(11),
    h = n(d),
    y = function(e) {
        function t() {
            var e, r, n = arguments.length <= 0 || void 0 === arguments[0] ? {}: arguments[0];
            i(this, t);
            var o = (0, p["default"])(n, {
                kind: l.AudioTrackKind[n.kind] || ""
            }),
            u = e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, o)),
            s = !1;
            if (h.IS_IE8) for (var c in t.prototype)"constructor" !== c && (u[c] = t.prototype[c]);
            return Object.defineProperty(u, "enabled", {
                get: function() {
                    return s
                },
                set: function(e) {
                    "boolean" == typeof e && e !== s && (s = e, this.trigger("enabledchange"))
                }
            }),
            o.enabled && (u.enabled = o.enabled),
            u.loaded_ = !0,
            r = u,
            a(e, r)
        }
        return u(t, e),
        t
    } (c["default"]);
    t["default"] = y
},
function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e,
        t
    }
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return ! t || "object" != typeof t && "function" != typeof t ? e: t;
    }
    function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = r(78),
    s = r(79),
    c = o(s),
    f = r(17),
    p = o(f),
    d = r(11),
    h = n(d),
    y = function(e) {
        function t() {
            var e, r, n = arguments.length <= 0 || void 0 === arguments[0] ? {}: arguments[0];
            i(this, t);
            var o = (0, p["default"])(n, {
                kind: l.VideoTrackKind[n.kind] || ""
            }),
            u = e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, o)),
            s = !1;
            if (h.IS_IE8) for (var c in t.prototype)"constructor" !== c && (u[c] = t.prototype[c]);
            return Object.defineProperty(u, "selected", {
                get: function() {
                    return s
                },
                set: function(e) {
                    "boolean" == typeof e && e !== s && (s = e, this.trigger("selectedchange"))
                }
            }),
            o.selected && (u.selected = o.selected),
            r = u,
            a(e, r)
        }
        return u(t, e),
        t
    } (c["default"]);
    t["default"] = y
},
function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    i = r(10),
    a = n(i),
    u = function(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" == typeof t ? "undefined": o(t)));
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        t && (e.super_ = t)
    },
    l = function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
        r = function() {
            e.apply(this, arguments)
        },
        n = {};
        "object" === ("undefined" == typeof t ? "undefined": o(t)) ? ("function" == typeof t.init && (a["default"].warn("Constructor logic via init() is deprecated; please use constructor() instead."), t.constructor = t.init), t.constructor !== Object.prototype.constructor && (r = t.constructor), n = t) : "function" == typeof t && (r = t),
        u(r, e);
        for (var i in n) n.hasOwnProperty(i) && (r.prototype[i] = n[i]);
        return r
    };
    t["default"] = l
},
function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = {};
    r.indexOf = function(e, t) {
        for (var r = 0; r < e.length; r++) if (e[r] == t) return r;
        return - 1
    },
    r.isFunction = function(e) {
        return "[object Function]" == Object.prototype.toString.call(e)
    },
    r.isIE = function() {
        var e = navigator.userAgent.toLowerCase();
        return e.indexOf("msie") != -1 && parseInt(e.split("msie")[1])
    },
    r.extend = function(e, t) {
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
    },
    r.getName = function(e) {
        return e + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5)
    },
    r.createScript = function(e, t) {
        var r = document.createElement("script");
        return r.setAttribute("type", "text/javascript"),
        t && r.setAttribute("charset", t),
        r.setAttribute("src", e),
        r.async = !0,
        r
    },
    r.jsonp = function(e, t, n, o) {
        var i = r.getName("tt_player");
        window[i] = function() {
            t && r.isFunction(t) && t(arguments[0])
        };
        var a = r.createScript(e + "&callback=" + i, o);
        a.onload = a.onreadystatechange = function() {
            a.readyState && !/loaded|complete/.test(a.readyState) || (a.onload = a.onreadystatechange = null, a.parentNode && a.parentNode.removeChild(a), window[i] = null)
        },
        a.onerror = function() {
            n && r.isFunction(n) && n()
        },
        document.getElementsByTagName("head")[0].appendChild(a)
    },
    r.crc32 = function(e) {
        var t = document.createElement("a");
        t.href = e;
        var r = function() {
            for (var e = 0,
            t = new Array(256), r = 0; 256 != r; ++r) e = r,
            e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
            e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
            e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
            e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
            e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
            e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
            e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
            e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
            t[r] = e;
            return "undefined" != typeof Int32Array ? new Int32Array(t) : t
        } (),
        n = function(e) {
            for (var t, n, o = -1,
            i = 0,
            a = e.length; i < a;) t = e.charCodeAt(i++),
            t < 128 ? o = o >>> 8 ^ r[255 & (o ^ t)] : t < 2048 ? (o = o >>> 8 ^ r[255 & (o ^ (192 | t >> 6 & 31))], o = o >>> 8 ^ r[255 & (o ^ (128 | 63 & t))]) : t >= 55296 && t < 57344 ? (t = (1023 & t) + 64, n = 1023 & e.charCodeAt(i++), o = o >>> 8 ^ r[255 & (o ^ (240 | t >> 8 & 7))], o = o >>> 8 ^ r[255 & (o ^ (128 | t >> 2 & 63))], o = o >>> 8 ^ r[255 & (o ^ (128 | n >> 6 & 15 | (3 & t) << 4))], o = o >>> 8 ^ r[255 & (o ^ (128 | 63 & n))]) : (o = o >>> 8 ^ r[255 & (o ^ (224 | t >> 12 & 15))], o = o >>> 8 ^ r[255 & (o ^ (128 | t >> 6 & 63))], o = o >>> 8 ^ r[255 & (o ^ (128 | 63 & t))]);
            return o ^ -1
        },
        o = t.pathname + "?r=" + Math.random().toString(10).substring(2);
        "/" != o[0] && (o = "/" + o);
        var i = n(o) >>> 0;
        return [t.protocol, t.hostname].join("//") + o + "&s=" + i
    },
    t["default"] = r
},
function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = {};
    r.base64encode = function(e) {
        var t, r, n, o, i, a, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (n = e.length, r = 0, t = ""; r < n;) {
            if (o = 255 & e.charCodeAt(r++), r == n) {
                t += u.charAt(o >> 2),
                t += u.charAt((3 & o) << 4),
                t += "==";
                break
            }
            if (i = e.charCodeAt(r++), r == n) {
                t += u.charAt(o >> 2),
                t += u.charAt((3 & o) << 4 | (240 & i) >> 4),
                t += u.charAt((15 & i) << 2),
                t += "=";
                break
            }
            a = e.charCodeAt(r++),
            t += u.charAt(o >> 2),
            t += u.charAt((3 & o) << 4 | (240 & i) >> 4),
            t += u.charAt((15 & i) << 2 | (192 & a) >> 6),
            t += u.charAt(63 & a)
        }
        return t
    },
    r.base64decode = function(e) {
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
    },
    r.utf16to8 = function(e) {
        var t, r, n, o;
        for (t = "", n = e.length, r = 0; r < n; r++) o = e.charCodeAt(r),
        o >= 1 && o <= 127 ? t += e.charAt(r) : o > 2047 ? (t += String.fromCharCode(224 | o >> 12 & 15), t += String.fromCharCode(128 | o >> 6 & 63), t += String.fromCharCode(128 | o >> 0 & 63)) : (t += String.fromCharCode(192 | o >> 6 & 31), t += String.fromCharCode(128 | o >> 0 & 63));
        return t
    },
    r.utf8to16 = function(e) {
        var t, r, n, o, i, a;
        for (t = "", n = e.length, r = 0; r < n;) switch (o = e.charCodeAt(r++), o >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            t += e.charAt(r - 1);
            break;
        case 12:
        case 13:
            i = e.charCodeAt(r++),
            t += String.fromCharCode((31 & o) << 6 | 63 & i);
            break;
        case 14:
            i = e.charCodeAt(r++),
            a = e.charCodeAt(r++),
            t += String.fromCharCode((15 & o) << 12 | (63 & i) << 6 | (63 & a) << 0)
        }
        return t
    },
    t["default"] = r
},
function(e, t) {},
function(e, t, r) {
    "use strict";
    /*! videojs-resolution-switcher - 2015-7-26
     * Copyright (c) 2016 Kasper Moskwiak
     * Modified by Pierre Kraft
     * Licensed under the Apache-2.0 license. */
    !
    function() {
        var e = null;
        e = "undefined" == typeof window.videojs ? r(2) : window.videojs,
        function(e, t) {
            function r(e, t, r, n) {
                return i = {
                    label: r,
                    sources: t
                },
                "function" == typeof n ? n(e, t, r) : e.src(t.map(function(e) {
                    return {
                        src: e.src,
                        type: e.type,
                        res: e.res
                    }
                }))
            }
            var n, o = {},
            i = {},
            a = {},
            u = navigator.userAgent.toLowerCase().indexOf("msie 8.0") > -1,
            l = t.getComponent("MenuItem"),
            s = t.extend(l, {
                constructor: function(e, t, r, n) {
                    this.onClickListener = r,
                    this.label = n,
                    l.call(this, e, t),
                    this.src = t.src,
                    this.on("click", this.onClick),
                    this.on("touchstart", this.onClick),
                    t.initialySelected && (this.showAsLabel(), this.selected(!0), this.addClass("vjs-selected"))
                },
                showAsLabel: function() {
                    this.label && (this.label.innerHTML = this.options_.label)
                },
                onClick: function(e) {
                    this.onClickListener(this);
                    var t = this.player_.currentTime(),
                    n = this.player_.paused(),
                    o = this.src[0].label;
                    this.showAsLabel(),
                    this.addClass("vjs-selected"),
                    n || this.player_.bigPlayButton.hide(),
                    "function" != typeof e && "function" == typeof this.options_.customSourcePicker && (e = this.options_.customSourcePicker);
                    var i = "loadeddata";
                    "Youtube" !== this.player_.techName_ && "none" === this.player_.preload() && "Flash" !== this.player_.techName_ && (i = "timeupdate"),
                    r(this.player_, this.src, this.options_.label, e).one(i,
                    function() {
                        this.player_.currentTime(t),
                        this.player_.handleTechSeeked_(),
                        n || this.player_.play().handleTechSeeked_(),
                        this.player_.trigger("resolutionchange", o)
                    }),
                    "Flash" == this.player_.techName_ && this.player_.paused() && u && this.player_.play()
                }
            }),
            c = t.getComponent("MenuButton"),
            f = t.extend(c, {
                constructor: function(e, r, n, o) {
                    if (this.sources = r.sources, this.label = o, this.label.innerHTML = r.initialySelectedLabel, c.call(this, e, r, n), this.controlText("Quality"), n.dynamicLabel) this.el().appendChild(o);
                    else {
                        var i = document.createElement("span");
                        t.addClass(i, "vjs-resolution-button-staticlabel"),
                        this.el().appendChild(i)
                    }
                },
                createItems: function() {
                    var e = [],
                    t = this.sources && this.sources.label || {},
                    r = function(t) {
                        e.map(function(e) {
                            e.selected(e === t),
                            e.removeClass("vjs-selected")
                        })
                    };
                    for (var n in t) t.hasOwnProperty(n) && (e.push(new s(this.player_, {
                        label: n,
                        src: t[n],
                        initialySelected: n === this.options_.initialySelectedLabel,
                        customSourcePicker: this.options_.customSourcePicker
                    },
                    r, this.label)), a[n] = e[e.length - 1]);
                    return e.length > 1 ? e: void this.label.setAttribute("class", "vjs-resolution-button-label vjs-resolution-button-label-disable")
                }
            });
            n = function(e) {
                function n(e, t) {
                    return e.res && t.res ? +t.res - +e.res: 0
                }
                function u(e) {
                    var t = {
                        label: {},
                        res: {},
                        type: {}
                    };
                    return e.map(function(e) {
                        l(t, "label", e),
                        l(t, "res", e),
                        l(t, "type", e),
                        s(t, "label", e),
                        s(t, "res", e),
                        s(t, "type", e)
                    }),
                    t
                }
                function l(e, t, r) {
                    null == e[t][r[t]] && (e[t][r[t]] = [])
                }
                function s(e, t, r) {
                    e[t][r[t]].push(r)
                }
                function c(e, t) {
                    var r = d["default"],
                    n = "";
                    return "high" === r ? (r = t[0].res, n = t[0].label) : "low" === r || null == r ? (r = t[t.length - 1].res, n = t[t.length - 1].label) : e.res[r] && (n = e.res[r][0].label),
                    void 0 === r ? {
                        res: r,
                        label: n,
                        sources: e.label[n]
                    }: {
                        res: r,
                        label: n,
                        sources: e.res[r]
                    }
                }
                function p(e) {
                    e.tech_.ytPlayer.setPlaybackQuality("default"),
                    e.tech_.ytPlayer.addEventListener("onPlaybackQualityChange",
                    function() {
                        e.trigger("resolutionchange")
                    }),
                    e.one("play",
                    function() {
                        var t = e.tech_.ytPlayer.getAvailableQualityLevels(),
                        r = {
                            highres: {
                                res: 1080,
                                label: "1080",
                                yt: "highres"
                            },
                            hd1080: {
                                res: 1080,
                                label: "1080",
                                yt: "hd1080"
                            },
                            hd720: {
                                res: 720,
                                label: "720",
                                yt: "hd720"
                            },
                            large: {
                                res: 480,
                                label: "480",
                                yt: "large"
                            },
                            medium: {
                                res: 360,
                                label: "360",
                                yt: "medium"
                            },
                            small: {
                                res: 240,
                                label: "240",
                                yt: "small"
                            },
                            tiny: {
                                res: 144,
                                label: "144",
                                yt: "tiny"
                            },
                            auto: {
                                res: 0,
                                label: "auto",
                                yt: "default"
                            }
                        },
                        n = [];
                        t.map(function(t) {
                            n.push({
                                src: e.src().src,
                                type: e.src().type,
                                label: r[t].label,
                                res: r[t].res,
                                _yt: r[t].yt
                            })
                        }),
                        v = u(n);
                        var o = function(t, r, n) {
                            return e.tech_.ytPlayer.setPlaybackQuality(r[0]._yt),
                            e
                        },
                        i = {
                            label: "auto",
                            res: 0,
                            sources: v.label.auto
                        },
                        a = new f(e, {
                            sources: v,
                            initialySelectedLabel: i.label,
                            initialySelectedRes: i.res,
                            customSourcePicker: o
                        },
                        d, y);
                        a.el().classList.add("vjs-resolution-button"),
                        e.controlBar.resolutionSwitcher = e.controlBar.addChild(a)
                    })
                }
                var d = t.mergeOptions(o, e),
                h = this,
                y = document.createElement("span"),
                v = {};
                t.addClass(y, "vjs-resolution-button-label"),
                h.updateSrc = function(e) {
                    if (!e) return h.src();
                    h.controlBar.resolutionSwitcher && (h.controlBar.resolutionSwitcher.dispose(), delete h.controlBar.resolutionSwitcher),
                    e = e.sort(n),
                    v = u(e);
                    var o = c(v, e),
                    i = new f(h, {
                        sources: v,
                        initialySelectedLabel: o.label,
                        initialySelectedRes: o.res,
                        customSourcePicker: d.customSourcePicker
                    },
                    d, y);
                    return t.addClass(i.el(), "vjs-resolution-button"),
                    h.controlBar.resolutionSwitcher = h.controlBar.el_.insertBefore(i.el_, h.controlBar.getChild("fullscreenToggle").el_),
                    h.controlBar.resolutionSwitcher.dispose = function() {
                        this.parentNode.removeChild(this)
                    },
                    r(h, o.sources, o.label)
                },
                h.currentResolution = function(e, t) {
                    return null == e ? i: (null != a[e] && a[e].onClick(t), h)
                },
                h.getGroupedSrc = function() {
                    return v
                },
                h.ready(function() {
                    h.options_.sources.length > 1 && h.updateSrc(h.options_.sources),
                    "Youtube" === h.techName_ && p(h)
                })
            },
            t.plugin("videoJsResolutionSwitcher", n)
        } (window, e)
    } ()
},
function(e, t, r) {
    "use strict"; !
    function() {
        var e = null;
        e = "undefined" == typeof window.videojs ? r(2) : window.videojs,
        function(e, t) {
            var r, n = t.getComponent("Button"),
            o = !1,
            i = t.extend(n, {
                constructor: function(e, t) {
                    this.onClickListener = t,
                    n.call(this, e),
                    this.on("click", this.onClick)
                },
                onClick: function() {
                    o = !o,
                    o ? t.addClass(r.el(), "vjs-theaterMode-button-open") : t.removeClass(r.el(), "vjs-theaterMode-button-open"),
                    this.onClickListener(this)
                }
            }),
            a = function(e) {
                var n = this;
                o = e.isThreater;
                var a = function() {
                    var t = this.player_.el_;
                    e.click && e.click instanceof Function && e.click.call(t, o)
                };
                n.expandToTheater = function() {
                    r = new i(n, a),
                    t.addClass(r.el(), "vjs-theaterMode-button"),
                    e.isThreater && t.addClass(r.el(), "vjs-theaterMode-button-open"),
                    n.controlBar.theaterModeSwitcher = n.controlBar.el_.insertBefore(r.el_, n.controlBar.getChild("fullscreenToggle").el_)
                },
                n.ready(function() {
                    n.expandToTheater()
                })
            };
            t.plugin("videoJsTheaterMode", a)
        } (window, e)
    } ()
}]);