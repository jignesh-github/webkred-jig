if (!window.Sigma) window.Sigma = {};
Sigma.Const = Sigma.Const || {};
SigmaConst = Sigma.Const;
Sigma.Const.Grid = {
    COL_CLASS_PREFIX: "td.",
    DEFAULT_ECG_ID: "gt",
    SHADOW_ROW: "_shadowRow",
    HIDE_HEADER_ROW: "_hideListRow",
    COL_T_CLASSNAME: "gt-col-",
    SKIN_CLASSNAME_PREFIX: "gt-skin-",
    SCROLLBAR_WIDTH: 18,
    MIN_COLWIDTH: 40,
    AJAX_HEADER: ["isAjaxRequest", "true"]
};
Sigma.Const.Key = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    PAUSE: 19,
    CAPSLOCK: 20,
    ESC: 27,
    SPACE: 33,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    WIN: 91,
    WIN_R: 92,
    MENU: 93,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLLLOCK: 145
};
if (!window.Sigma) window.Sigma = {};
Sigma.loaded = false;
Sigma.init = function(_) {
    _ = _ || window;
    Sigma.doc = document;
    _.undefined = _.undefined;
    var $ = _.navigator.userAgent.toLowerCase();
    Sigma.isIE = $.indexOf("msie") > -1;
    Sigma.isIE7 = $.indexOf("msie 7") > -1;
    Sigma.isIE8 = $.indexOf("msie 8") > -1;
    Sigma.isIE9 = $.indexOf("msie 9") > -1;
    Sigma.isFF = $.indexOf("firefox") > -1;
    Sigma.isFF1 = $.indexOf("firefox/1") > -1;
    Sigma.isFF2 = $.indexOf("firefox/2") > -1;
    Sigma.isFF3 = $.indexOf("firefox/3") > -1;
    Sigma.isOpera = $.indexOf("opera") > -1;
    Sigma.isWebkit = (/webkit|khtml/).test($);
    Sigma.isSafari = $.indexOf("safari") > -1 || Sigma.isWebkit;
    Sigma.isChrome = $.indexOf("chrome") > -1 || Sigma.isWebkit;
    Sigma.isGecko = Sigma.isMoz = !Sigma.isSafari && $.indexOf("gecko") > -1;
    Sigma.isStrict = Sigma.doc.compatMode == "CSS1Compat" || Sigma.isSafari;
    Sigma.isBoxModel = Sigma.isIE && !Sigma.isIE8 && !Sigma.isIE9 && !Sigma.isStrict;
    Sigma.isNotStrictIE = Sigma.isBoxModel;
    Sigma.isSecure = _.location.href.toLowerCase().indexOf("https") === 0;
    Sigma.isWindows = ($.indexOf("windows") != -1 || $.indexOf("win32") != -1);
    Sigma.isMac = ($.indexOf("macintosh") != -1 || $.indexOf("mac os x") != -1);
    Sigma.isLinux = ($.indexOf("linux") != -1)
};
Sigma.init();
Sigma.$extend = function(C, $, B) {
    if (arguments.length < 2) {
        $ = C;
        C = this
    }
    for (var A in $) {
        var _ = $[A];
        if (B && _ && Sigma.$type(_, "object", "array")) _ = Sigma.$clone(_, B);
        if (_ !== undefined) C[A] = _
    }
    return C
};
Sigma.$extend(Sigma, {
    $empty: function() { },
    $chk: function($) {
        return !!($ || $ === 0 || $ === "")
    },
    $type: function(A) {
        var $ = arguments.length;
        if ($ > 1) {
            for (var _ = 1; _ < $; _++) if (Sigma.$type(A) == arguments[_]) return true;
            return false
        }
        var B = typeof A;
        if (A === null) return "object";
        if (B == "undefined") return "undefined";
        if (A.htmlElement) return "element";
        if (B == "object" && A.nodeType && A.nodeName) switch (A.nodeType) {
            case 1:
                return "element";
            case 3:
                return (/\S/).test(A.nodeValue) ? "textnode" : "whitespace"
        }
        if (B == "object" || B == "function") switch (A.constructor) {
            case Array:
                return "array";
            case RegExp:
                return "regexp";
            case Sigma.Class:
                return "class"
        }
        if (B == "object" && typeof A.length == "number") return (A.callee) ? "arguments" : "collection";
        else if (B == "function" && typeof A.length == "number" && A[0] !== undefined) return "collection";
        return B
    },
    $merge: function() {
        var A = {};
        for (var B = 0; B < arguments.length; B++) for (var $ in arguments[B]) {
            var C = arguments[B][$],
                _ = A[$];
            if (_ && Sigma.$type(C, "object") && Sigma.$type(_, "object")) A[$] = Sigma.$merge(_, C);
            else A[$] = C
        }
        return A
    },
    $indexOf: function(C, $, A) {
        if (C) {
            A = A || 0;
            for (var B = A, _ = C.length; B < _; B++) if (C[B] === $) return B
        }
        return -1
    },
    $array: function(C, E, $, A) {
        var B = [];
        if (C) {
            if (!Sigma.$chk(E)) E = 0;
            if (!Sigma.$chk($)) $ = C.length;
            if (Sigma.$type(C, "arguments", "collection") || Sigma.$type(C, "array") && (E > 0 || $ < C.length)) {
                for (var _ = E; _ < $; _++) B.push(C[_])
            } else if (Sigma.$type(C, "array")) B = B.concat(C);
            else for (var D in C) if (C.hasOwnProperty(D)) B.push(C[D])
        }
        return B
    },
    $clone: function(A, $) {
        var _;
        if (!A) _ = A;
        else if (Sigma.$type(A, "array", "arguments", "collection")) _ = Sigma.$array(A, 0, A.length, $);
        else _ = Sigma.$extend({}, A, $);
        return _
    },
    $msg: function(_, A) {
        for (var $ = 1; $ < arguments.length; $++) _ = Sigma.U.replaceAll(_, "#{" + $ + "}", arguments[$]);
        return _
    },
    $clear: function($) {
        window.clearTimeout($);
        window.clearInterval($);
        if (CollectGarbage) CollectGarbage();
        return null
    },
    $thread: function(A, $) {
        var _ = A;
        window.setTimeout(_, $ || 20)
    },
    $each: function(E, _, $, D) {
        var B = [];
        if (Sigma.$type(E, "array", "arguments", "collection") || E && !Sigma.$type(E, "string") && Sigma.$type(E.length, "number")) {
            for (var A = 0, C = E.length; A < C; A++) B.push(_.call($ || E, E[A], A, E, D))
        } else for (var F in E) B.push(_.call($ || E, E[F], F, E, D));
        return B
    },
    $getText: function($) {
        return $.innerText === undefined ? $.textContent : $.innerText
    },
    $element: function(A, _) {
        if (Sigma.$type(A, "string")) {
            if (Sigma.isIE && _ && (_.name || _.type)) {
                var B = (_.name) ? " name=\"" + _.name + "\"" : "",
                    $ = (_.type) ? " type=\"" + _.type + "\"" : "";
                delete _.name;
                delete _.type;
                A = "<" + A + B + $ + ">"
            }
            A = Sigma.doc.createElement(A)
        }
        if (_) {
            if (_.style) {
                Sigma.$extend(A.style, _.style);
                delete _.style
            }
            Sigma.$extend(A, _)
        }
        return A
    }
});
Sigma.Class = function(_) {
    _ = _ || {};
    var $ = function() {
        var _ = this.nT9;
        if (Sigma.$type(_, "function")) _ = _.apply(this, arguments);
        if (Sigma.$type(_, "object")) Sigma.$extend(this, _);
        var $ = this.abstractMethods;
        Sigma.$each(this.abstractMethods, function($) {
            this[$] = Sigma.$empty
        }, this);
        return (arguments[0] !== Sigma.$empty && Sigma.$type(this.Or8, "function")) ? this.Or8.apply(this, arguments) : this
    };
    Sigma.$extend($, this);
    $.constructor = Sigma.Class;
    $.prototype = _;
    return $
};
Sigma.Class.prototype = {
    extend: function() {
        var C = new this(Sigma.$empty);
        for (var $ = 0, D = arguments.length; $ < D; $++) {
            var _ = arguments[$];
            for (var B in _) {
                var A = C[B];
                C[B] = Sigma.Class.merge(A, _[B])
            }
        }
        return new Sigma.Class(C)
    }
};
Sigma.Class.merge = function(A, B) {
    if (A && A != B) {
        var $ = Sigma.$type(B);
        if (!Sigma.$type(A, $)) return B;
        switch ($) {
            case "function":
                var _ = function() {
                    this.gu9 = arguments.callee.gu9;
                    return B.apply(this, arguments)
                };
                _.gu9 = A;
                return _;
            case "object":
                return Sigma.$merge(A, B)
        }
    }
    return B
};
Sigma.$class = function($) {
    return new Sigma.Class($)
};
Sigma.$e = Sigma.$element;
Sigma.$A = Sigma.$array;
Sigma.$byId = function(_, $) {
    if (!Sigma.$chk(_)) return null;
    var A = Sigma.$type(_);
    if (A == "element") return Sigma.$e(_, $);
    if (A == "string" || A == "number") _ = Sigma.doc.getElementById("" + _);
    if (!_) return null;
    if (Sigma.U.contains(["object", "embed"], !_.tagName ? _.tagName.toLowerCase() : "")) return _;
    return Sigma.$e(_)
};
Sigma.bo7 = function($) {
    if (!$ || !document) return null;
    return $.dom ? $.dom : (typeof $ == "string" ? document.getElementById($) : $)
};
Sigma.$byName = function(B) {
    var $ = [];
    if (!Sigma.$chk(B)) return $;
    var A = Sigma.doc.getElementsByName("" + B);
    if (!A || A.length < 1) return $;
    for (var _ = 0; _ < A.length; _++) {
        B = A[_];
        $.push(Sigma.U.contains(["object", "embed"], B.tagName.toLowerCase()) ? B : Sigma.$e(B))
    }
    return $
};
Sigma.$ = function($) {
    var _ = Sigma.$byName($);
    if (_ && _.length > 0) return _[0];
    return (!_ || _.length < 1) ? Sigma.$byId($) : _
};
Sigma.Utils = {
    P_START: "@{",
    P_END: "}",
    P_VAR_NAME: "obj_in",
    parseExpression: function(ex, pName, argNames, pStart, pEnd) {
        pStart = pStart || Sigma.U.P_START;
        pEnd = pEnd || Sigma.U.P_END;
        pName = pName || Sigma.U.P_VAR_NAME;
        argNames = argNames || pName;
        var startLength = pStart.length,
            endLength = pEnd.length,
            templateC = [],
            current = 0;
        while (true) {
            var start = ex.indexOf(pStart, current),
                sBegin = start + startLength,
                sEnd = ex.indexOf(pEnd, sBegin),
                str = null,
                val = null;
            if (sBegin >= startLength && sEnd > sBegin) {
                str = ex.substring(current, start);
                val = ex.substring(sBegin, sEnd)
            } else str = ex.substring(current);
            str = Sigma.U.escapeString(str);
            templateC.push(str);
            if (val === null) break;
            if (!Sigma.U.isNumber(val)) val = (pName ? (pName + ".") : "") + val;
            else val = (pName ? (pName + "[") : "") + val + (pName ? "]" : "");
            templateC.push(val);
            current = sEnd + endLength
        }
        var t = "function(" + argNames + "){ return " + templateC.join("+") + " }";
        eval("t=" + t);
        return t
    },
    isNumber: function($) {
        return $ === 0 || ($ && !isNaN($))
    },
    parseInt: function(_, $) {
        var A = parseInt(_);
        return isNaN(parseInt(_)) ? $ || 0 : A
    },
    add2Map: function($, A, _) {
        _ = _ || {};
        if (_[$] === undefined) _[$] = A;
        else {
            _[$] = [].concat(_[$]);
            _[$].push(A)
        }
        return _
    },
    moveItem: function(C, A, _) {
        A = A < 0 ? 0 : (A > C.length - 1 ? C.length - 1 : A);
        _ = _ < 0 ? 0 : (_ > C.length - 1 ? C.length - 1 : _);
        if (A == _) return C;
        var $ = C[A],
            B = C[_];
        C.splice(_, 1, $, B);
        if (A < _) C.splice(A, 1);
        else C.splice(A + 1, 1);
        return C
    },
    convert: function(_, $) {
        switch ($) {
            case "int":
                return parseInt(_);
            case "float":
                return parseFloat(_);
            case "date":
                return _;
            default:
                return _
        }
        return _
    },
    getTagName: function($) {
        return $ && $.tagName ? String($.tagName).toUpperCase() : null
    },
    hN2: function($, A, B, _) {
        if (!A) {
            B = Sigma.$event(B);
            A = Sigma.U.getEventTarget(B)
        }
        _ = _ || 6;
        if (!A) return null;
        $ = $.toLowerCase();
        while (A && (_--) > 0) {
            if (A.tagName && A.tagName.toLowerCase() == $) return A;
            if (Sigma.U.hasClass(A.className, "gt-grid") && $ != "div") break;
            A = A.parentNode
        }
        return null
    },
    focus: function(_) {
        if (_) {
            try {
                _.focus();
                _.select && _.select()
            } catch ($) { }
        }
    },
    hasClass: function($, _) {
        return $ ? Sigma.U.hasSubString($.className, _, " ") : false
    },
    addClass: function($, _) {
        if ($ && !Sigma.U.hasClass($, _)) $.className = Sigma.U.uu9($.className + " " + _);
        return $
    },
    removeClass: function($, _) {
        if ($) $.className = Sigma.U.uu9($.className.replace(new RegExp("(^|\\s)" + _ + "(?:\\s|$)"), "$1"));
        return $
    },
    toggleClass: function($, _) {
        return Sigma.U.hasClass($, _) ? Sigma.U.removeClass($, _) : Sigma.U.addClass($, _)
    },
    hasSubString: function(A, $, _) {
        return (_) ? (_ + A + _).indexOf(_ + $ + _) > -1 : A.indexOf($) > -1
    },
    childElement: function(B, A) {
        var _ = 0,
            $ = B ? B.firstChild : null;
        while ($) {
            if ($.nodeType == 1) if (++_ == A) return $;
            $ = $.nextSibling
        }
        return null
    },
    firstChildElement: function($) {
        return Sigma.U.childElement($, 1)
    },
    np8: function($) {
        var _ = $.childNodes[$.childNodes.length - 1];
        return _.nodeType == 1 ? _ : Sigma.U.prevElement(_)
    },
    nextElement: function($) {
        while (($ = $.nextSibling) && $.nodeType != 1);
        return $
    },
    prevElement: function($) {
        while (($ = $.previousSibling) && $.nodeType != 1);
        return $
    },
    getCellIndex: function(B) {
        if (Sigma.isIE) {
            var A = B.parentNode.cells;
            for (var _ = 0, $ = A.length; _ < $; _++) if (A[_] === B) return _
        }
        return B.cellIndex
    },
    insertNodeBefore: function($, _) {
        if (!$ || !_ || !_.parentNode) return null;
        _.parentNode.insertBefore($, _);
        return $
    },
    insertNodeAfter: function($, _) {
        _.parentNode.insertBefore($, _.nextSibling);
        return $
    },
    listToMap: function(A) {
        var _ = {};
        for (var $ = 0; $ < A.length; $++) _[A[$]] = A[$];
        return _
    },
    createSelect: function($, A, B, C) {
        C = C || Sigma.$e("select", B || {});
        var _ = Sigma.doc.createDocumentFragment();
        Sigma.$each($, function(C, B) {
            var $ = Sigma.$e("option", {
                "value": B,
                "text": "" + C,
                innerHTML: C
            });
            if (Sigma.$chk(A) && B == A) $.selected = true;
            _.appendChild($)
        });
        C.appendChild(_);
        return C
    },
    createSelectHTML: function(E, $, B) {
        B = B || {};
        var D = B.id ? (" id=\"" + B.id + "\" ") : " ",
            G = B.className || "",
            F = B.style ? (" style=\"" + B.style + "\" ") : " ",
            A = ["<select" + D + F + "class=\"gt-input-select " + G + "\">"];
        for (var _ in E) {
            var C = "";
            if (($ || $ === 0) && _ == $) C = " selected=\"selected\" ";
            A.push("<option value=\"" + _ + "\" " + C + ">" + E[_] + "</option>")
        }
        A.push("</select>");
        return A.join("")
    },
    getEventTarget: function($) {
        var A = null;
        try {
            A = $.target || $.srcElement
        } catch (_) {
            return null
        }
        return !A ? null : (A.nodeType == 3 ? A.parentNode : A)
    },
    stopEvent: function($) {
        $ = $ || window.event;
        if ($) if ($.stopPropagation) {
            $.stopPropagation();
            $.preventDefault()
        } else {
            $.cancelBubble = true;
            $.returnValue = false
        }
    },
    addEvent: function(D, B, $, C, _) {
        if (!$ || !D || !B) return false;
        if (arguments.length > 3) $ = Sigma.U.bindAsEventListener($, C, _);
        if (D.addEventListener) D.addEventListener(B, $, false);
        else {
            var A = B == "selectstart" ? B : "on" + B;
            D.attachEvent(A, $)
        }
        Sigma.EventCache.add(D, B, $, false);
        return D
    },
    removeEvent: function(D, B, $, C, _) {
        if (!$ || !D || !B) return false;
        if (arguments.length > 3) $ = Sigma.U.bindAsEventListener($, C, _);
        if (D.addEventListener) D.removeEventListener(B, $, false);
        else {
            var A = B == "selectstart" ? B : "on" + B;
            D.detachEvent(A, $)
        }
        Sigma.EventCache.remove(D, B, $, false);
        return D
    },
    Qf6: [],
    EL1: function() {
        for (var _ = 0; _ < Sigma.U.Qf6.length; _++) {
            var $ = Sigma.U.Qf6[_];
            $.apply(this, arguments)
        }
        Sigma.loaded = true
    },
    onLoad: function(_, $) {
        $ = $ || window;
        Sigma.U.Qf6.push(_);
        if (!Sigma.U.EL1.hasAdd) {
            Sigma.U.addEvent($, "load", Sigma.U.EL1);
            Sigma.U.EL1.hasAdd = true
        }
    },
    Qf1: function() {
        return Sigma.doc.createElement("div")
    } (),
    createElementFromHTML: function(A, $) {
        Sigma.U.Qf1.innerHTML = A;
        var _ = Sigma.U.firstChildElement(Sigma.U.Qf1);
        $.appendChild(_);
        Sigma.U.Qf1.innerHTML = "";
        return _
    },
    createTrFromHTML: function(A, $) {
        Sigma.U.Qf1.innerHTML = "<table><tbody>" + A + "</tbody></table>";
        var _ = Sigma.U.Qf1.getElementsByTagName("tr")[0];
        $.appendChild(_);
        Sigma.U.Qf1.innerHTML = "";
        return _
    },
    removeNode: function(A) {
        for (var $ = 0; $ < arguments.length; $++) {
            var _ = arguments[$];
            if (!_ || !_.parentNode || _.tagName == "BODY") return null;
            Sigma.EventCache.remove(_);
            if (Sigma.isIE) {
                Sigma.U.Qf1.appendChild(_);
                Sigma.U.Qf1.innerHTML = ""
            } else _.parentNode.removeChild(_)
        }
    },
    getLastChild: function($) {
        return $.childNodes[$.childNodes.length - 1]
    },
    getPosLeftTop: function(A, B) {
        B = B || window;
        var _ = A.offsetTop,
            $ = A.offsetLeft;
        A = A.offsetParent;
        while (A && A != B) {
            _ += (A.offsetTop - A.scrollTop);
            $ += (A.offsetLeft - A.scrollLeft);
            A = A.offsetParent
        }
        return [$, _]
    },
    getPosRight: function($) {
        return Sigma.U.getPosLeftTop($)[0] + $.offsetWidth
    },
    getPosBottom: function($) {
        return Sigma.U.getPosLeftTop($)[1] + $.offsetHeight
    },
    getHeight: function($, A) {
        var B = $.offsetHeight || 0;
        if (A !== true) return B;
        var _ = Sigma.U.getBorderWidths($),
            C = Sigma.U.getPaddings($);
        return B - _[0] - _[2] - C[0] - C[2]
    },
    getWidth: function(A, C) {
        var _ = A.offsetWidth || 0;
        if (C !== true) return _;
        var B = Sigma.U.getBorderWidths(A),
            $ = Sigma.U.getPaddings(A);
        return _ - B[1] - B[3] - $[1] - $[3]
    },
    getBorderWidths: function($) {
        return [Sigma.U.parseInt($.style.borderTopWidth), Sigma.U.parseInt($.style.borderRightWidth), Sigma.U.parseInt($.style.borderBottomWidth), Sigma.U.parseInt($.style.borderLeftWidth)]
    },
    getPaddings: function($) {
        return [Sigma.U.parseInt($.style.paddingTop), Sigma.U.parseInt($.style.paddingRight), Sigma.U.parseInt($.style.paddingBottom), Sigma.U.parseInt($.style.paddingLeft)]
    },
    getPageX: function($) {
        $ = $ || window.event;
        var _ = $.pageX;
        if (!_ && 0 !== _) {
            _ = $.clientX || 0;
            if (Sigma.isIE) _ += Sigma.U.getPageScroll()[0]
        }
        return _
    },
    getPageY: function($) {
        $ = $ || window.event;
        var _ = $.pageY;
        if (!_ && 0 !== _) {
            _ = $.clientY || 0;
            if (Sigma.isIE) _ += Sigma.U.getPageScroll()[1]
        }
        return _
    },
    getPageScroll: function() {
        var _ = Sigma.doc.documentElement,
            $ = Sigma.doc.body;
        if (_ && (_.scrollLeft || _.scrollTop)) return [_.scrollLeft, _.scrollTop];
        else if ($) return [$.scrollLeft, _.scrollTop];
        else return [0, 0]
    },
    getScroll: function($) {
        var A = $,
            _ = Sigma.doc;
        if (A == _ || A == _.body) {
            var B = window.pageXOffset || _.documentElement.scrollLeft || _.body.scrollLeft || 0,
                C = window.pageYOffset || _.documentElement.scrollTop || _.body.scrollTop || 0;
            return [B, C]
        } else return [A.scrollLeft, A.scrollTop]
    },
    getXY: function(A, C) {
        var G, _, K, E, H = Sigma.doc.body;
        if (A.getBoundingClientRect) {
            K = A.getBoundingClientRect();
            E = Sigma.U.getScroll(Sigma.doc);
            return [K.left + E[0], K.top + E[1]]
        }
        var J = 0,
            I = 0;
        G = A;
        C = C || H;
        var $ = A.style.position == "absolute";
        while (G) {
            J += G.offsetLeft;
            I += G.offsetTop;
            if (!$ && G.style.position == "absolute") $ = true;
            if (Sigma.isGecko) {
                _ = G;
                var F = parseInt(_.style.borderTopWidth, 10) || 0,
                    B = parseInt(_.style.borderLeftWidth, 10) || 0;
                J += B;
                I += F;
                if (G != A && _.style.overflow != "visible") {
                    J += B;
                    I += F
                }
            }
            G = G.offsetParent
        }
        if (Sigma.isSafari && $) {
            J -= H.offsetLeft;
            I -= H.offsetTop
        }
        if (Sigma.isGecko && !$) {
            var D = H;
            J += parseInt(D.style.borderTopWidth, 10) || 0;
            I += parseInt(D.style.borderTopWidth, 10) || 0
        }
        G = A.parentNode;
        while (G && G != H) {
            if (!Sigma.isOpera || (G.tagName.toUpperCase() != "TR" && G.style.display != "inline")) {
                J -= G.scrollLeft;
                I -= G.scrollTop
            }
            G = G.parentNode
        }
        return [J, I]
    },
    setXY: function(_, $) {
        if (_.style.position == "static") _.style.position = "relative";
        var A = Sigma.U.iQ0(_, $);
        if ($[0] !== false) _.style.left = A.left + "px";
        if ($[1] !== false) _.style.top = A.top + "px"
    },
    iQ0: function(E, _, $) {
        if (typeof _ == "object" || _ instanceof Array) {
            $ = _[1];
            _ = _[0]
        }
        var A = E.style.position,
            C = Sigma.U.getXY(E),
            D = parseInt(E.style.left, 10),
            B = parseInt(E.style.top, 10);
        if (isNaN(D)) D = (A == "relative") ? 0 : E.offsetLeft;
        if (isNaN(B)) B = (A == "relative") ? 0 : E.offsetTop;
        return {
            left: (_ - C[0] + D),
            top: ($ - C[1] + B)
        }
    },
    getContentWidthHeight: function(A) {
        var E = Sigma.U.parseInt(A.style.marginLeft),
            C = Sigma.U.parseInt(A.style.marginRight),
            $ = Sigma.U.parseInt(A.style.paddingLeft),
            D = Sigma.U.parseInt(A.style.paddingRight),
            B = A.clientWidth - $ - D,
            _ = A.clientHeight;
        return [B, _]
    },
    getPixelValue: function($, A) {
        if (Sigma.$type($, "number")) return $;
        $ = "" + $;
        var _ = Sigma.U.parseInt($);
        if ($.indexOf("%") > 1) return A * _ / 100;
        return _
    },
    setValue: function(C, B) {
        C = Sigma.$(C);
        if (!C) return;
        var $ = C.tagName;
        $ = ("" + $).toUpperCase();
        switch ($) {
            case "SELECT":
                var A = [].concat(B),
                _ = null;
                Sigma.$each(C.options, function(B, $) {
                    if ($ === 0) _ = B;
                    B.selected = false;
                    if (C.multiple) Sigma.$each(A, function($) {
                        B.selected = B.value == $
                    });
                    else if (B.value == A[0]) {
                        B.selected = true;
                        _ = false
                    }
                });
                if (!C.multiple && _) _.selected = true;
                return (C.multiple) ? A : A[0];
            case "INPUT":
                if (C.type == "checkbox" || C.type == "radio") {
                    C.checked = C.value == B;
                    break
                }
            case "TEXTAREA":
                C.value = B
        }
        return null
    },
    getValue: function(A) {
        A = Sigma.$(A);
        if (!A) return;
        var $ = A.tagName;
        switch ($) {
            case "SELECT":
                var _ = [];
                Sigma.$each(A.options, function($) {
                    if ($.selected) _.push($.value)
                });
                _ = (A.multiple) ? _ : _[0];
                if ((_ === null || _ === undefined) && A.options[0]) _ = A.options[0].value;
                return _;
            case "INPUT":
                if ((A.type == "checkbox" || A.type == "radio") && !A.checked) break;
            case "TEXTAREA":
                return A.value
        }
        return null
    },
    setOpacity: function($, _) {
        _ = _ > 1 ? 1 : (_ < 0 ? 0 : _);
        if (!$.currentStyle || !$.currentStyle.hasLayout) $.style.zoom = 1;
        if (Sigma.isIE) $.style.filter = (_ == 1) ? "" : "alpha(opacity=" + _ * 100 + ")";
        $.style.opacity = _;
        if (_ === 0) {
            if ($.style.visibility != "hidden") $.style.visibility = "hidden"
        } else if ($.style.visibility != "visible") $.style.visibility = "visible";
        return $
    },
    replaceAll: function(exstr, ov, value) {
        var gc = Sigma.U.escapeRegExp(ov);
        if (!Sigma.$chk(gc) || gc === "") return exstr;
        var rep = "/" + gc + "/gm",
            r = null,
            cmd = "r=exstr.replace(" + rep + "," + Sigma.U.escapeString(value) + ")";
        eval(cmd);
        return r
    },
    trim: function(A, _) {
        if (!A || !A.replace || !A.length) return A;
        var $ = (_ > 0) ? (/^\s+/) : (_ < 0) ? (/\s+$/) : (/^\s+|\s+$/g);
        return A.replace($, "")
    },
    escapeRegExp: function($) {
        return !$ ? "" + $ : ("" + $).replace(/\\/gm, "\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm, "\\$1")
    },
    escapeString: function($) {
        return $ === "" ? "\"\"" : (!$ ? "" + $ : ("\"" + ("" + $).replace(/(["\\])/g, "\\$1") + "\"").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r"))
    },
    bind: function($, A, _) {
        _ = [].concat(_);
        return function() {
            return $.apply(A || $, Sigma.U.merge(Sigma.$A(arguments), _))
        }
    },
    bindAsEventListener: function($, A, _) {
        return function(B) {
            B = B || window.event;
            return $.apply(A || $, [Sigma.$event(B)].concat(_))
        }
    },
    trim: function(A, _) {
        var $ = (_ > 0) ? (/^\s+/) : (_ < 0) ? (/\s+$/) : (/^\s+|\s+$/g);
        return A.replace($, "")
    },
    uu9: function($) {
        return Sigma.U.trim($.replace(/\s{2,}/g, " "))
    },
    contains: function(_, A, $) {
        return Sigma.U.indexOf(_, A, $) != -1
    },
    merge: function(_, C, B) {
        var D = _.length < C.length ? _.length : C.length;
        if (B) for (var $ = 0, A = D; $ < A; $++) _[$] = C[$];
        for ($ = D, A = C.length; $ < A; $++) _[$] = C[$];
        return _
    },
    each: function(_, $, A) {
        return Sigma.$each(_, $, A)
    },
    indexOf: function(A, C, _) {
        var $ = A.length;
        for (var B = (_ < 0) ? Math.max(0, $ + _) : _ || 0; B < $; B++) if (A[B] === C) return B;
        return -1
    },
    remove: function(A, C, _) {
        var B = 0,
            $ = A.length;
        while (B < $) if (A[B] === C) {
            A.splice(B, 1);
            if (!_) return A;
            $--
        } else B++;
        return A
    },
    next: function(A, $) {
        var _ = Sigma.U.indexOf(A, $);
        if (_ < 0) return null;
        return A[_ + 1]
    },
    previous: function(A, $) {
        var _ = Sigma.U.indexOf(A, $);
        if (_ < 1) return null;
        return A[_ - 1]
    },
    En5: function(A, B) {
        B = B || Sigma.doc;
        var $ = B.createElement("style");
        $.id = A;
        var _ = B.getElementsByTagName("head")[0];
        _ && _.appendChild($);
        return $
    },
    getCheckboxState: function(A, B) {
        var $ = {};
        for (var _ = 0; _ < A.length; _++) if (A[_].name == B && A[_].checked) $[A[_].value] = A[_].checked;
        return $
    }
};
Sigma.Util = Sigma.Utils;
Sigma.U = Sigma.Utils;
Sigma.Utils.CSS = function() {
    var $ = null;
    return {
        En5: function(E, D, B) {
            var $;
            B = B || Sigma.doc;
            var C = B.getElementsByTagName("head");
            if (!C || C.length < 1) {
                C = B.createElement("head");
                if (B.documentElement) B.documentElement.insertBefore(C, B.body);
                else B.appendChild(C);
                C = B.getElementsByTagName("head")
            }
            var _ = C[0],
                A = B.createElement("style");
            A.setAttribute("type", "text/css");
            if (D) A.setAttribute("id", D);
            if (Sigma.isIE) {
                _.appendChild(A);
                $ = A.styleSheet;
                $.cssText = E
            } else {
                try {
                    A.appendChild(B.createTextNode(E))
                } catch (F) {
                    A.cssText = E
                }
                _.appendChild(A);
                $ = A.styleSheet ? A.styleSheet : (A.sheet || B.styleSheets[B.styleSheets.length - 1])
            }
            this.cacheStyleSheet($);
            return $
        },
        getRules: function(D, A) {
            A = A || Sigma.doc;
            if (!$ || D) {
                $ = {};
                var C = A.styleSheets;
                for (var _ = 0, B = C.length; _ < B; _++) this.cacheStyleSheet(C[_])
            }
            return $
        },
        getRule: function(A, _) {
            var $ = this.getRules(_);
            return $[A.toLowerCase()]
        },
        updateRule: function(A, _, $) {
            var B = this.getRule(A);
            if (B) B.style[_] = $
        },
        cacheStyleSheet: function(_) {
            $ = $ || {};
            try {
                var A = _.cssRules || _.rules;
                for (var B = A.length - 1; B >= 0; --B) $[A[B].selectorText.toLowerCase()] = A[B]
            } catch (C) { }
        }
    }
} ();
Sigma.$event = function($) {
    $ = $ || window.event;
    return $
};
Sigma.EventCache = (function() {
    var $ = [],
        B = [],
        A = {};

    function _($) {
        return "" + $ + "_" + $.id
    }
    return {
        add: function(E, _, C) {
            if (!E) return;
            if (!Sigma.U.contains($, arguments)) $.push(arguments);
            var F = Sigma.U.indexOf(B, E),
                D = F + "_" + E + "_" + E.id;
            if (F < 0) {
                D = B.length + "_" + E + "_" + E.id;
                B.push(E);
                A[D] = {}
            }
            A[D][_] = A[D][_] || [];
            if (!Sigma.U.contains(A[D][_], C)) A[D][_].push(C)
        },
        remove: function(D, E, $) {
            if (!D) return;
            var C = Sigma.U.indexOf(B, D),
                _ = C + "_" + D + "_" + D.id;
            if (C < 0 || !A[_]) return;
            if (!E) {
                A[_] = null;
                B[C] = null;
                return
            }
            if (!$ && A[_][E]) {
                A[_][E] = null;
                delete A[_][E]
            }
            if (A[_][E]) A[_][E].remove($)
        },
        pr0: function() {
            var A, _;
            for (A = $.length - 1; A >= 0; A = A - 1) {
                _ = $[A];
                Sigma.EventCache.remove(_[0]);
                if (_[0].removeEventListener) _[0].removeEventListener(_[1], _[2], _[3]);
                if (_[1].substring(0, 2) != "on") _[1] = "on" + _[1];
                if (_[0].detachEvent) _[0].detachEvent(_[1], _[2]);
                _[0][_[1]] = null;
                delete $[A]
            }
            window.CollectGarbage && CollectGarbage()
        }
    }
})();
Sigma.initGlobalEvent = function() {
    if (Sigma.initGlobalEvent.inited) return;
    var $ = Sigma.isIE ? Sigma.doc.body : Sigma.doc;
    Sigma.U.addEvent($, "mousemove", function($) {
        Sigma.activeGrid && Sigma.Grid.YK3($, Sigma.activeGrid)
    });
    Sigma.U.addEvent($, "mouseup", function($) {
        Sigma.activeGrid && Sigma.Grid.ga9($, Sigma.activeGrid)
    });
    Sigma.U.addEvent($, "click", function($) {
        Sigma.activeGrid && (Sigma.activeGrid.so6() || Sigma.activeGrid.closeGridMenu())
    });
    Sigma.U.addEvent($, "keydown", function($) {
        Sigma.activeGrid && Sigma.activeGrid.ve6($)
    });
    Sigma.initGlobalEvent.inited = true
};
Sigma.toQueryString = function(_) {
    if (!_ || Sigma.$type(_, "string", "number")) return _;
    var D = [];
    for (var C in _) {
        var B = _[C];
        if (B !== undefined) B = [].concat(B);
        for (var $ = 0; $ < B.length; $++) {
            var A = B[$];
            if (Sigma.$type(A, "object")) A = Sigma.$json(A);
            D.push(encodeURIComponent(C) + "=" + encodeURIComponent(A))
        }
    }
    return D.join("&")
};
Sigma.toJSONString = function($, _) {
    return Sigma.JSON.encode($, "__gt_", _)
};
Sigma.$json = Sigma.toJSONString;
Sigma.FunctionCache = {};
Sigma.$invoke = function(A, B, _) {
    A = A || window;
    var $ = A[B] || Sigma.$getFunction(B);
    if (typeof ($) == "function") return $.apply(A, _ || [])
};
Sigma.$getFunction = function($) {
    return Sigma.FunctionCache[$]
};
Sigma.$callFunction = function($, _) {
    Sigma.$invoke(null, $, _)
};
Sigma.$putFunction = function($, _) {
    Sigma.FunctionCache[$] = _
};
Sigma.$removeFunction = function($) {
    Sigma.FunctionCache[$] = null;
    delete Sigma.FunctionCache[$]
};
Sigma.U.onLoad(function() {
    Sigma.U.addEvent(window, "unload", Sigma.EventCache.pr0)
});
Sigma.AjaxDefault = {
    paramName: "_gt_json"
};
Sigma.Ajax = Sigma.$class({
    nT9: function() {
        return {
            method: "post",
            jsonParamName: Sigma.AjaxDefault.paramName,
            async: true,
            urlEncoded: true,
            encoding: null,
            mimeType: null,
            beforeSend: Sigma.$empty,
            onComplete: Sigma.$empty,
            onSuccess: Sigma.$empty,
            onFailure: Sigma.$empty,
            onCancel: Sigma.$empty,
            xhr: "",
            url: "",
            data: "",
            paramType: "jsonString",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Accept": "text/javascript, text/html, application/xml,application/json, text/xml, */*"
            },
            autoCancel: false,
            evalScripts: false,
            evalResponse: false,
            responseContentType: "",
            dataUrl: false,
            queryParameters: null
        }
    },
    setQueryParameters: function($) {
        this.queryParameters = $
    },
    Or8: function(_) {
        _ = _ || {};
        if (Sigma.$type(_) == "string") _ = {
            url: _
        };
        if (!(this.xhr = this.getXHR())) return;
        var $ = Sigma.$extend(this.headers, _.headers);
        Sigma.$extend(this, _);
        if (this.mimeType) $["X-Response-MimeType"] = this.mimeType;
        this.headers = $
    },
    send: function(I) {
        this.running = true;
        if (Sigma.$type(I) == "string") I = {
            data: I
        };
        I = Sigma.$extend({
            data: this.data,
            url: this.url,
            method: this.method
        }, I);
        var F = I.data,
            H = I.url,
            _ = String(I.method).toLowerCase();
        if (Sigma.$invoke(this, "beforeSend", [this.xhr, F]) === false) return this;
        if (this.urlEncoded && _ == "post") {
            var E = (this.encoding) ? "; charset=" + this.encoding : "";
            this.setHeader("Content-type", "application/x-www-form-urlencoded" + E)
        }
        switch (Sigma.$type(F)) {
            case "object":
                if (this.paramType == "jsonString") {
                    var A = Sigma.$json(F);
                    F = {};
                    F[this.jsonParamName] = A
                }
                F = Sigma.toQueryString(F);
                break
        }
        var $;
        if (this.queryParameters && Sigma.$type(this.queryParameters, "object")) $ = Sigma.toQueryString(this.queryParameters);
        else if (Sigma.$type(this.queryParameters, "string")) $ = this.queryParameters;
        if ($ && Sigma.$type(F, "string")) F = F + "&" + $;
        if (_ == "post") {
            var G = H.indexOf("?");
            if (G >= 0) {
                F = H.substring(G + 1) + "&" + F;
                H = H.substring(0, G)
            }
        } else if (F && (_ == "get" || this.dataUrl)) {
            H = H + (H.indexOf("?") >= 0 ? "&" : "?") + F;
            F = null
        }
        var C = this;
        this.xhr.open(_.toUpperCase(), H, this.async);
        this.xhr.onreadystatechange = function() {
            return C.onStateChange.apply(C, arguments)
        };
        for (var B in this.headers) {
            try {
                this.xhr.setRequestHeader(B, this.headers[B])
            } catch (D) { }
        }
        this.xhr.send(F);
        if (!this.async) this.onStateChange();
        return this
    },
    onStateChange: function() {
        if (this.xhr.readyState != 4 || !this.running) return;
        this.running = false;
        this.status = 0;
        try {
            this.status = this.xhr.status
        } catch ($) { }
        this.onComplete();
        if (this.isSuccess()) this._onSuccess();
        else this._onFailure();
        this.xhr.onreadystatechange = Sigma.$empty
    },
    isScript: function() {
        return (/(ecma|java)script/).test(this.getHeader("Content-type"))
    },
    isSuccess: function() {
        var $ = this.xhr.status;
        return (($ >= 200) && ($ < 300))
    },
    _onSuccess: function() {
        this.response = {
            "text": this.xhr.responseText,
            "xml": this.xhr.responseXML
        };
        this.onSuccess(this.response)
    },
    _onFailure: function($) {
        this.onFailure(this.xhr, $)
    },
    setHeader: function($, _) {
        this.headers[$] = _;
        return this
    },
    getHeader: function(_) {
        try {
            return this.xhr.getResponseHeader(_)
        } catch ($) {
            return null
        }
    },
    getXHR: function() {
        return (window.XMLHttpRequest) ? new XMLHttpRequest() : ((window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : false)
    },
    cancel: function() {
        if (!this.running) return this;
        this.running = false;
        this.xhr.abort();
        this.xhr.onreadystatechange = Sigma.$empty;
        this.xhr = this.getXHR();
        this.onCancel();
        return this
    }
});
Sigma.JSON = {
    encode: function($, A, _) {
        var C, B = _ ? "\n" : "";
        switch (Sigma.$type($)) {
            case "string":
                return "\"" + $.replace(/[\x00-\x1f\\"]/g, Sigma.JSON.rK8) + "\"";
            case "array":
                C = [];
                Sigma.$each($, function($, B) {
                    var D = Sigma.JSON.encode($, A, _);
                    if (D || D === 0) C.push(D)
                });
                return "[" + B + (_ ? C.join("," + B) : C) + "]" + B;
            case "object":
                if ($ === null) return "null";
                C = [];
                Sigma.$each($, function(D, $) {
                    if (!A || $.indexOf(A) != 0) {
                        var B = Sigma.JSON.encode(D, A, _);
                        if (B) C.push(Sigma.JSON.encode($, A, _) + ":" + B)
                    }
                }, null, A);
                return "{" + B + (_ ? C.join("," + B) : C) + B + "}" + B;
            case "number":
            case "boolean":
                return String($)
        }
        return null
    },
    decode: function(string, secure) {
        if (!Sigma.$type(string, "string") || !string.length) return null;
        if (secure && !(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, ""))) return null;
        return eval("(" + string + ")")
    },
    xt5: {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\"": "\\\"",
        "\\": "\\\\"
    },
    rK8: function($) {
        return Sigma.JSON.xt5[$] || "\\u00" + Math.floor($.charCodeAt() / 16).toString(16) + ($.charCodeAt() % 16).toString(16)
    }
};
Sigma.Const.DataSet = {
    KEY: "__gt_ds_key__",
    INDEX: "__gt_ds_index__",
    ROW_KEY: "__gt_row_key__",
    NOT_VAILD: "__gt_no_valid__",
    SN_FIELD: "__gt_sn__",
    SORT_VALUE: "__gt_sort_value__",
    SORT_S: "__gt_"
};
Sigma.DataSetDefault = {
    SEQUENCE: 0,
    uniqueField: Sigma.Const.DataSet.SN_FIELD,
    recordType: "object",
    recordXpath: null,
    dataXML: null,
    currentBegin: 0,
    cursor: 0,
    startRecordNo: 0,
    cacheData: false,
    cacheModifiedData: true,
    modified: false,
    nT9: function() {
        return {
            fields: [],
            fieldsName: [],
            fieldsMap: {},
            fieldsInfo: {},
            data: null,
            Ht1: [],
            oP4: null,
            additional: [],
            sortInfo: [],
            queryInfo: [],
            reocrdIndex: {},
            updatedRecords: {},
            qo1: {},
            updatedFields: {},
            insertedRecords: {},
            deletedRecords: {},
            selectedRecords: {},
            Lr4: Sigma.$empty,
            Vm6: Sigma.$empty
        }
    },
    Or8: function($) {
        Sigma.$extend(this, $);
        this.recordType = this.recordType || "object";
        this.fields && this.rh9(this.fields);
        this.data && this.vk2(this.data)
    },
    initValues: Sigma.$empty,
    isEqualRecord: function(A, $) {
        for (var _ in this.fieldsInfo) if (A[_] !== $[_]) return false;
        return true
    },
    uu9: function($) {
        if (!this.cacheData || $ === true) {
            this.data = null;
            this.currentBegin = 0;
            this.Ht1 = []
        }
        this.cleanModifiedData()
    },
    cleanModifiedData: function($) {
        if (!this.cacheModifiedData || $) {
            this.updatedRecords = {};
            this.qo1 = {};
            this.updatedFields = {};
            this.insertedRecords = {};
            this.deletedRecords = {};
            this.selectedRecords = {};
        }
    },
    vk2: function($) {
        if (!$) return false;
        this.uu9();
        return this.Ax1($)
    },
    rh9: function(B) {
        this.fields = B;
        this.fieldsName = [];
        var $ = null;
        for (var A = 0, C = this.fields.length; A < C; A++) {
            var _ = this.fields[A] || {};
            if (Sigma.$type(_, "string")) _ = {
                name: _
            };
            _.name = _.name || String(A);
            _.type = _.type || "string";
            _.index = _.index || (this.getRecordType() == "array" ? A : _.name);
            if (_.initValue) {
                $ = $ || {};
                $[_.index] = _.initValue
            }
            this.fieldsMap[_.name] = _;
            this.fieldsInfo[_.index] = _;
            this.fieldsName[A] = _.name
        }
        if ($) this.initValues = (function($) {
            return function(B, _, A) {
                for (var C in $) B[C] = $[C](B, _, A)
            }
        })($);
        else this.initValues = Sigma.$empty
    },
    Ax1: function($) {
        if (!$) return false;
        this.data = this.data || [];
        var A = this;
        for (var B = 0, _ = $.length; B < _; B++) {
            var C = $[B];
            C[Sigma.Const.DataSet.SN_FIELD] = this.SEQUENCE++;
            this.data.push(C);
            this.Ht1.push(this.currentBegin++);
            this.initValues(C, B, this)
        }
        return true
    },
    getDataProxySize: function() {
        return this.Ht1.length
    },
    resetDataProxy: function(_) {
        this.Ht1 = [];
        _ = _ || this.getSize();
        for (var $ = 0; $ < _; $++) this.Ht1[$] = $
    },
    loadData: function($) {
        if ($) return vk2($.load())
    },
    TB1: function($) {
        if ($ && this.recordType != $) {
            this.recordType = $;
            this.rh9(this.fields)
        }
    },
    getRecord: function($) {
        return this.data ? this.data[this.Ht1[$]] : null
    },
    getDataRecord: function($) {
        return this.dataset.data[$]
    },
    setValueByName: function(A, _, $) {
        var B = this.fieldsMap[_].index;
        if (Sigma.$type(A, "number")) A = this.getRecord(A);
        A[B] = $
    },
    getValueByName: function(_, $) {
        var A = this.fieldsMap[$].index;
        if (Sigma.$type(_, "number")) _ = this.getRecord(_);
        return _[A]
    },
    getFields: function() { },
    getRecordType: function(_, $) {
        this.recordType = _ || this.recordType;
        if (!Sigma.$type(this.recordType, "string") && (this.data && this.getSize() > 0)) {
            $ = this.data[0];
            if (Sigma.$type($, "array")) this.recordType = "array";
            else this.recordType = "object"
        }
        return this.recordType
    },
    filterCheck: {
        equal: function($, _) {
            return $ == _
        },
        notEqual: function($, _) {
            return $ != _
        },
        less: function($, _) {
            return $ < _
        },
        great: function($, _) {
            return $ > _
        },
        lessEqual: function($, _) {
            return $ <= _
        },
        greatEqual: function($, _) {
            return $ >= _
        },
        like: function($, _) {
            return ("" + $).indexOf(_ + "") >= 0
        },
        startWith: function($, _) {
            return ("" + $).indexOf(_ + "") === 0
        },
        endWith: function($, _) {
            $ = $ + "";
            _ = _ + "";
            return $.indexOf(_) == $.length - _.length
        }
    },
    filterData: function(A) {
        var _ = this,
            $ = [];
        A = [].concat(A);
        Sigma.$each(this.data, function(G, C) {
            var D = true;
            for (var J = 0, H = A.length; J < H; J++) {
                var B = _.fieldsMap[A[J].fieldName].index,
                    E = A[J].value,
                    I = A[J].logic,
                    F = G[B];
                D = _.filterCheck[I](F, E);
                if (!D) break
            }
            if (D) $.push(C)
        });
        return $
    },
    BC8: function($) {
        var _ = $[Sigma.Const.DataSet.SN_FIELD] = this.SEQUENCE++;
        this.insertedRecords[_] = $;
        Sigma.$invoke(this, "Lr4", [$]);
        this.modified = true
    },
    updateRecord: function(D, A, E) {
        if (Sigma.$type(D, "number")) D = this.data[D];
        var C = D[Sigma.Const.DataSet.SN_FIELD],

            B = D[this.uniqueField],
            _ = this.fieldsMap[A].type,
            F = this.fieldsMap[A].index,
            $;
        if (!this.insertedRecords[C]) {
            this.qo1[B] = this.qo1[B] || {};
            this.qo1[B][F] = D[F];
            this.qo1[B][this.uniqueField] = B;
            this.updatedRecords[B] = D
        }
        if (this.insertedRecords[C] || Sigma.$invoke(this, "Vm6", [D, A, E]) !== false) {
            if (_ == "int") {
                E = parseInt(E);
                E = isNaN(E) ? "" : E
            } else if (_ == "float") {
                E = parseFloat(E);
                E = isNaN(E) ? "" : E
            } else E = Sigma.$chk(E) ? String(E) : "";
            this.updatedFields[B] = this.updatedFields[B] || {};
            this.updatedFields[B][F] = E;
            this.updatedFields[B][this.uniqueField] = B;
            D[F] = E;
            this.modified = true
        }
    },
    undeleteRecord: function($) {
        var B = -1,
            A, C;
        if (Sigma.$type($, "number")) {
            B = $;
            if (B >= 0) {
                C = this.Ht1[B];
                A = this.data[C]
            }
        } else if ($ && (Sigma.$type($, "object") || Sigma.$type($, "array"))) A = $;
        if (A) {
            var _ = A[Sigma.Const.DataSet.SN_FIELD],
                D = A[this.uniqueField];
            this.deletedRecords[D] = null;
            delete this.deletedRecords[D]
        }
    },
    Ne8: function($) {
        var B = -1,
            A, C;
        if (Sigma.$type($, "number")) {
            B = $;
            if (B >= 0) {
                C = this.Ht1[B];
                A = this.data[C]
            }
        } else if ($ && (Sigma.$type($, "object") || Sigma.$type($, "array"))) A = $;
        if (A) {
            var _ = A[Sigma.Const.DataSet.SN_FIELD],
                D = A[this.uniqueField];
            if (this.insertedRecords[_]) delete this.insertedRecords[_];
            else {
                if (this.updatedRecords[D]) {
                    delete this.updatedRecords[D];
                    delete this.qo1[D]
                }
                this.deletedRecords[D] = A;
                this.modified = true
            }
        }
    },
    addUniqueKey: function($) { },
    isInsertedRecord: function($) {
        return $ && this.insertedRecords[$[Sigma.Const.DataSet.SN_FIELD]] == $
    },
    ko8: function($) {
        return $ && this.deletedRecords[$[this.uniqueField]] == $
    },
    isUpdatedRecord: function($) {
        return $ && this.updatedRecords[$[this.uniqueField]] == $
    },
    sortFunction: null,
    negative: function($) {
        return function(_, A) {
            return 0 - $(_, A)
        }
    },
    sort: function(I) {
        var $ = [].concat(I),
            H = [];
        for (var F = 0; F < $.length; F++) {
            var B = $[F];
            if (B) {
                var _, D, E, G = B.sortOrder.indexOf("def") === 0;
                if (!B.sortOrder || G) {
                    E = Sigma.Const.DataSet.SN_FIELD;
                    D = "int"
                } else {
                    _ = this.fieldsMap[B.fieldName];
                    if (_) {
                        E = _.index;
                        D = _.type
                    }
                }
                H.push(!G && B.sortFn ? B.sortFn : this.getSortFuns(E, B.sortOrder, D, B.getSortValue))
            }
        }
        var A = this,
            J = H.length,
            C = function(E, C) {
                var F = A.data[E],
                    _ = A.data[C];
                for (var B = 0; B < J; B++) {
                    var D = H[B](F, _, $[B].sortOrder);
                    if (D != 0) return D
                }
                return 0
            };
        this.Ht1.sort(C)
    },
    getSortFuns: function($, D, _, A) {
        var C = this,
            B = Sigma.Const.DataSet.SORT_VALUE,
            E = {};
        compSort = this.sortFunction;
        if (!compSort) {
            var F = A && D.indexOf("def") != 0 ?
            function(C) {
                var _ = C[$],
                    B = A(_, C);
                E[C[Sigma.Const.DataSet.SN_FIELD]] = B;
                return B
            } : function(C) {
                var A = C[$],
                    B = Sigma.U.convert(A, _);
                E[C[Sigma.Const.DataSet.SN_FIELD]] = B;
                return B
            };
            compSort = D == "desc" ?
            function(B, $) {
                var A = E[B] || F(B),
                    _ = E[$] || F($);
                return A < _ ? 1 : (A > _ ? -1 : 0)
            } : function(B, $) {
                var A = E[B] || F(B),
                    _ = E[$] || F($);
                return A < _ ? -1 : (A > _ ? 1 : 0)
            }
        }
        return compSort
    },
    query: function(A, B, _, $) { },
    getSize: function() {
        return !this.data ? -1 : this.data.length
    },
    getFieldsNum: function() {
        return this.fields.length
    },
    sum: function($) { },
    avg: function($) { }
};
Sigma.DataSet = Sigma.$class(Sigma.DataSetDefault);
if (!Sigma.Template) Sigma.Template = {};
Sigma.$extend(Sigma.Template, {
    Grid: {
        main: function(A) {
            var _ = A.id,
                $ = [A.toolbarPosition == "top" || A.toolbarPosition == "t" ? "<div id=\"" + _ + "_toolBarBox\" class=\"gt-toolbar-box gt-toolbar-box-top\" ></div>" : "", "<div id=\"" + _ + "_viewport\" class=\"gt-viewport" + (A.simpleScrollbar ? " gt-simple-scrollbar" : "") + "\" >", "<div id=\"" + _ + "_headDiv\" class=\"gt-head-div\"><div class=\"gt-head-wrap\" ></div>", "<div id=\"" + _ + "_columnMoveS\" class=\"gt-column-moveflag\"></div>", "<div id=\"" + _ + "_headerGhost\" class=\"gt-head-ghost\"></div>", "</div>", "<div id=\"" + _ + "_bodyDiv\" class=\"gt-body-div\"></div>", "<div id=\"" + _ + "_freeze_headDiv\" class=\"gt-freeze-div\" ></div>", "<div id=\"" + _ + "_freeze_bodyDiv\" class=\"gt-freeze-div\" ></div>", "</div>", A.toolbarPosition == "bottom" || A.toolbarPosition == "b" ? "<div id=\"" + _ + "_toolBarBox\" class=\"gt-toolbar-box\" ></div>" : "", "<div id=\"" + _ + "_separateLine\" class=\"gt-split-line\"></div>", "<div id=\"" + _ + "_mask\" class=\"gt-grid-mask\" >", "<div  id=\"" + _ + "_waiting\" class=\"gt-grid-waiting\">", "<div class=\"gt-grid-waiting-icon\"></div><div class=\"gt-grid-waiting-text\">" + A.getMsg("WAITING_MSG") + "</div>", "</div>", "<div class=\"gt-grid-mask-bg\">", "</div>", "</div>"];
            return $.join("\n")
        },
        formIFrame: function(A) {
            var _ = A.id,
                $ = ["<div class=\"gt-hidden\" >", "<form id=\"" + _ + "_export_form\" target=\"" + _ + "_export_iframe\" style=\"width:0px;height:0px;margin:0px;padding:0xp\" method=\"post\" width=\"0\" height=\"0\" >", "<textarea id=\"" + _ + "_export_form_textarea\" name=\"\" style=\"width:0px;height:0px;display:none;\" ></textarea>", "</form>", "<iframe id=\"" + _ + "_export_iframe\"  name=\"" + _ + "_export_iframe\" scrolling=\"no\" style=\"width:0px;height:0px;\" width=\"0\" height=\"0\" border=\"0\" frameborder=\"0\" >", "</iframe>", "</div>"];
            return $.join("\n")
        },
        ki7: function(A, _, C) {
            var $ = Sigma.$e("td", {
                className: _.styleClass,
                columnId: _.id
            }),
                B = _.hdRenderer(_.header, _, A);
            _.title = _.title || _.header || "";
            B = (!B || Sigma.U.trim(B) == "") ? "&#160;" : B;
            if (C) $.style.height = "0px";
            $.innerHTML = ["<div class=\"gt-inner" + (_.headAlign ? " gt-inner-" + _.headAlign : "") + "\" ", C ? "style=\"padding-top:0px;padding-bottom:0px;height:1px;\" " : "", "unselectable=\"on\" title=\"" + _.title + "\" >", "<span>", B, "</span>", C ? "" : Sigma.T_G.hdToolHTML, "</div>"].join("");
            return $
        },
        hdToolHTML: "<div class=\"gt-hd-tool\" ><span class=\"gt-hd-icon\"></span><span class=\"gt-hd-button\"></span><span class=\"gt-hd-split\"></span></div>",
        bodyTableStart: function($, _) {
            return ["<table ", $ ? "id=\"" + $ + "\" " : "", "class=\"gt-table\" cellspacing=\"0\"  cellpadding=\"0\" border=\"0\" >", _ === false ? "" : "<tbody>"].join("")
        },
        tableStartHTML: "<table class=\"gt-table\" style=\"margin-left:0px\" cellspacing=\"0\"  cellpadding=\"0\" border=\"0\" ><tbody>",
        tableEndHTML: "</tbody></table>",
        rowStart: function(_, $, A) {
            return Sigma.T_G.rowStartS(_, $) + ">\n"
        },
        rowStartS: function($, _) {
            return ["<tr class=\"gt-row", (_ % 2 == 0 ? $.evenRowCss : ""), "\" ", Sigma.Const.DataSet.INDEX, "=\"", _, "\" "].join("")
        },
        rowEndHTML: "</tr>\n",
        innerStart: function($) {
            return ["<div class=\"gt-inner " + ($.align ? " gt-inner-" + $.align + " " : "") + "", "\" >"].join("")
        },
        cellStartHTML: "<td ><div class=\"gt-inner\" >",
        cellEndHTML: "</div></td>",
        cell: function(_, $, A) {
            return ["<td ", A || _.cellAttributes, " class=\"" + _.styleClass + "\" >", _.innerStartHTML, $, "</div></td>", ].join("")
        },
        Fo8: function($, _) {
            return (Sigma.Const.Grid.COL_T_CLASSNAME + $.id + "-" + _).toLowerCase()
        },
        freezeBodyCell: function($, E, F, B) {
            var A = E + $.Im0,
                D = E + $.uq9,
                _ = "style=\"width:" + D + "px;\"";
            F = F || "&#160;";
            var C = Sigma.$e("td", {
                style: {
                    width: A + "px"
                },
                innerHTML: "<div class=\"" + (B ? "gt-hd-inner" : "gt-inner") + "\" " + _ + ">" + F + "</div>"
            });
            return C
        },
        Pn3: function($, A, _) {
            return this.freezeBodyCell($, A, _, true)
        }
    },
    Dialog: {
        create: function(B) {
            var A = B.domId,
                $ = B.gridId,
                _ = Sigma.$chk(B.Ok4) ? B.Ok4 : true,
                C = B.title || "Dialog";
            return ["<div class=\"gt-dialog-head\" >", "<div class=\"gt-dialog-head-icon\">&#160;</div>", "<div id=\"" + A + "_dialog_title\"  class=\"gt-dialog-head-text\" >" + C + "</div>", "<div class=\"gt-dialog-head-button\"  >", _ ? "<a href=\"#\" onclick=\"Sigma.$grid('" + $ + "').closeDialog();return false;\">&#160;</a>" : "", "</div>", "</div><div id=\"" + A + "_dialog_body\" class=\"gt-dialog-body\"></div>"].join("")
        },
        Nr5: ["<select class=\"gt-input-select\">", "<option value=\"equal\">=</option>", "<option value=\"notEqual\">!=</option>", "<option value=\"less\">&lt;</option>", "<option value=\"great\">></option>", "<option value=\"lessEqual\">&lt;=</option>", "<option value=\"greatEqual\" >>=</option>", "<option value=\"like\" >like</option>", "<option value=\"startWith\">startWith</option>", "<option value=\"endWith\">endWith</option>", "</select>"].join("")
    }
});
Sigma.T_G = Sigma.Template.Grid;
Sigma.T_C = Sigma.Template.Column;
Sigma.T_D = Sigma.Template.Dialog;
if (!window.Sigma) window.Sigma = {};
Sigma_GRID_VER = "Sigma-Grid 2.1";
Sigma.WidgetCache = {};
Sigma.GridCache = {};
Sigma.GridNum = 0;
Sigma.activeGrid = null;
Sigma.$widget = function($) {
    return Sigma.$type($, "string") ? Sigma.WidgetCache[$] : $
};
Sigma.$grid = function($) {
    $ = $ || Sigma.Const.Grid.DEFAULT_ECG_ID;
    return Sigma.$type($, "string") ? Sigma.GridCache[$] : $
};
Sigma.GridDefault = {
    id: Sigma.Const.Grid.DEFAULT_ECG_ID,
    defaultColumnWidth: 70,
    defaultConst: ["action", "recordType", "exportType", "exportFileName", "exception", "parameters", "queryParameters", "data", "pageInfo", "filterInfo", "sortInfo", "columnInfo", "fieldsName", "insertedRecords", "updatedRecords", "updatedFields", "deletedRecords", "selectedRecords", "success", "succeedData", "failedData"],
    language: "default",
    skin: "default",
    dataRoot: null,
    dataPageInfo: null,
    dataException: null,
    formid: null,
    isNative: false,
    loadURL: null,
    saveURL: null,
    exportURL: null,
    exportType: null,
    exportFileName: null,
    sortInfo: null,
    editable: true,
    resizable: false,
    showGridMenu: false,
    showIndexColumn: false,
    allowCustomSkin: false,
    allowFreeze: false,
    allowHide: false,
    allowGroup: false,
    allowResizeColumn: true,
    simpleScrollbar: true,
    scrollbarClass: null,
    monitorResize: false,
    stripeRows: true,
    lightOverRow: true,
    evenRowCss: "gt-row-even",
    clickStartEdit: true,
    remotePaging: true,
    remoteSort: false,
    remoteFilter: false,
    remoteGroup: false,
    autoLoad: true,
    submitColumnInfo: true,
    autoUpdateSortState: true,
    autoUpdateEditState: true,
    autoUpdateGroupState: true,
    autoUpdateFreezeState: true,
    autoSelectFirstRow: true,
    autoEditNext: false,
    submitUpdatedFields: false,
    autoSaveOnNav: false,
    reloadAfterSave: true,
    recountAfterSave: true,
    recount: false,
    showEditTool: true,
    showAddTool: true,
    showDelTool: true,
    showSaveTool: true,
    showReloadTool: true,
    showPrintTool: true,
    showFilterTool: true,
    showChartTool: true,
    showPageState: true,
    transparentMask: false,
    justShowFiltered: true,
    toolbarPosition: "bottom",
    toolbarContent: "nav | goto | pagesize | reload | add del save | print | filter chart | state",
    width: "100%",
    height: "100%",
    minWidth: 50,
    minHeight: 50,
    dataRoot: "data",
    custom2Cookie: true,
    multiSort: false,
    multiGroup: false,
    multiSelect: true,
    selectRowByCheck: false,
    html2pdf: true,
    SigmaGridPath: "../../gt-grid",
    nT9: function() {
        return {
            skinList: [{
                text: this.getMsg("STYLE_NAME_DEFAULT"),
                value: "default"
            }, {
                text: this.getMsg("STYLE_NAME_CHINA"),
                value: "china"
            }, {
                text: this.getMsg("STYLE_NAME_VISTA"),
                value: "vista"
            }, {
                text: this.getMsg("STYLE_NAME_MAC"),
                value: "mac"
}],
                encoding: null,
                mimeType: null,
                jsonParamName: null,
                title: null,
                lastAction: null,
                ajax: null,
                autoExpandColumn: null,
                autoColumnWidth: false,
                cellWidthPadding: Sigma.isBoxModel ? 0 : 4,
                cellHeightPadding: Sigma.isBoxModel ? 0 : 2,
                Im0: Sigma.isBoxModel ? 0 : 0,
                uq9: Sigma.isBoxModel ? 0 : (Sigma.isIE8 ? -1 : -4),
                freezeFixH: Sigma.isBoxModel ? 0 : 0,
                freezeFixW: Sigma.isIE ? -1 : -2,
                toolbarHeight: 24,
                De9: 0,
                Ps7: 0,
                freezeColumns: 0,
                od3: 0,
                defaultRecord: null,
                isWaiting: false,
                Di1: false,
                requesting: false,
                hasGridDivTemp: false,
                Cu8: -1,
                moveColumnDelay: 800,
                mouseDown: false,
                gridDiv: null,
                gridForm: null,
                viewport: null,
                headDiv: null,
                headTable: null,
                headFirstRow: null,
                bodyDiv: null,
                bodyFirstRow: null,
                footDiv: null,
                footTable: null,
                footFirstRow: null,
                headerGhost: null,
                columnMoveS: null,
                freezeHeadDiv: null,
                freezeHeadTable: null,
                freezeBodyDiv: null,
                freezeBodyTable: null,
                titleBar: null,
                waitingBar: null,
                nearPageBar: null,
                toolBar: null,
                separateLine: null,
                gridGhost: null,
                resizeButton: null,
                activeCell: null,
                activeRow: null,
                activeRecord: null,
                activeEditor: null,
                activeDialog: null,
                lastOverHdCell: null,
                scrollLeft: 0,
                scrollTop: 0,
                uP8: 0,
                onComplete: Sigma.$empty,
                onResize: Sigma.$empty,
                beforeSelectRow: Sigma.$empty,
                afterSelectRow: Sigma.$empty,
                onClickHead: Sigma.$empty,
                onClickCell: Sigma.$empty,
                onDblClickCell: Sigma.$empty,
                beforeEdit: Sigma.$empty,
                afterEdit: Sigma.$empty,
                beforeRefresh: Sigma.$empty,
                beforeExport: Sigma.$empty,
                beforeSave: Sigma.$empty,
                beforeLoad: Sigma.$empty,
                cb3: Sigma.$empty,
                Un9: Sigma.$empty,
                Vm6: Sigma.$empty,
                beforeInsert: Sigma.$empty,
                afterInsert: Sigma.$empty,
                beforeUpdate: Sigma.$empty,
                afterUpdate: Sigma.$empty,
                beforeDelete: Sigma.$empty,
                afterDelete: Sigma.$empty,
                renderRow: Sigma.$empty,
                editing: false,
                rendered: false,
                isFirstLoad: true,
                printCssText: null,
                gridTable: null,
                gridTbodyList: [],
                gridRowList: [],
                gridFreezeRowList: [],
                checkedRows: {},
                rowBegin: 0,
                rowNum: 0,
                rowEnd: 0,
                currentRowNum: 0,
                filterDataProxy: null,
                oP4: null,
                cacheData: [],
                dataset: null,
                selectedRows: [],
                overRow: null,
                cacheBodyList: [],
                frozenColumnList: [],
                sortedColumnList: [],
                countTotal: true,
                pageSizeList: [],
                columns: [],
                columnList: [],
                columnMap: {},
                CONST: null,
                container: null,
                ghost: null,
                queryParameters: {},
                parameters: {}
            }
        },
        ac8: function() {
            Sigma.activeGrid = this
        },
        clearCheckedRows: function($) {
            this.checkedRows = {};
            if ($) this.refresh()
        },
        Or8: function(G, B) {
            Sigma.GridNum++;
            var _ = {};
            Sigma.$each(this.defaultConst, function($, A) {
                _[$] = $
            });
            this.id = "" + G;
            B = B || {};
            if (Sigma.$type(G, "object")) {
                B = G;
                this.id = "gtgrid_" + Sigma.GridNum
            }
            Sigma.$extend(_, B.CONST);
            this.CONST = _;
            Sigma.$extend(this, B);
            this.gridId = this.id;
            this.rowKey = "__gt_" + this.id + "_r_";
            Sigma.GridCache[this.id] = this;
            if (!this.dataset && this.columns) {
                var $ = {
                    fields: []
                };
                for (var F = 0; F < this.columns.length; F++) {
                    var C = this.columns[F],
                    E = {
                        name: C.name || C.fieldName || C.id,
                        type: C.type,
                        index: (C.fieldIndex || C.fieldIndex === 0) ? C.fieldIndex : null
                    };
                    $.fields.push(E)
                }
                this.dataset = $
            }
            if (this.dataset && !(this.dataset instanceof Sigma.DataSet)) {
                this.dataset.recordType = this.dataset.recordType || this.recordType;
                this.dataset = new Sigma.DataSet(this.dataset)
            }
            this.loadURL = this.loadURL || this.dataset.loadURL;
            this.saveURL = this.saveURL || this.dataset.saveURL;
            this.evenRowCss = " " + this.evenRowCss;
            this.toolbarContent = this.toolbarContent === false ? false : this.toolbarContent;
            if (this.tools) for (var A in this.tools) Sigma.ToolFactroy.register(A, this.tools[A]);
            var D = B.pageInfo || (this.dataset ? this.dataset.pageInfo : null) || {};
            D.pageSize = D.pageSize || B.pageSize || 0;
            if (D.pageSize === 0) delete D.pageSize;
            delete B.pageInfo, B.pageSize, this.pageInfo, this.pageSize;
            this.navigator = new Sigma.Navigator({
                gridId: this.id,
                pageInfo: D
            });
            this.ac8()
        },
        It9: function($) {
            this.columns = $ || this.columns;
            if (!this.columns) return;
            this.gridEditorCache = this.gridEditorCache || Sigma.$e("div", {
                className: "gt-editor-cache"
            });
            var B = this.columns.length,
            _ = 0,
            F = true,
            E = {};
            for (var A = 0; A < B; A++) {
                var C = this.columns[A];
                C.grid = this;
                C.gridId = this.id;
                if (C.isCheckColumn) C = Sigma.Grid.pN2(this, C);
                var G = new Sigma.Column(C);
                this.columnMap[G.id] = G;
                this.columnList.push(G);
                G.colIndex = A;
                this.checkColumn = G.isCheckColumn ? G : this.checkColumn;
                if (G.frozen) this.frozenColumnList.push(G.id);
                var D = this.dataset.fieldsMap[G.fieldName];
                if (D) G.fieldIndex = D.index;
                if (G.editable !== true && G.editable !== false) G.editable = this.editable;
                G.editor = Sigma.Editor ? Sigma.Editor.Le1(G.editor, this) : null;
                if (G.editor && G.editor.bo7()) this.gridEditorCache.appendChild(G.editor.bo7());
                if (G.renderer == "by editor" && G.editor) G.renderer = function(_, D, B, A, $, C) {
                    return this.editor.getDisplayValue(_)
                };
                else if (Sigma.$type(G.renderer, "string")) G.renderer = Sigma.U.parseExpression(G.renderer, "record", "value,record,col,grid,colNo,rowNo");
                E[G.fieldIndex] = G.newValue || "";
                G.styleClass = Sigma.T_G.Fo8(this, G.id);
                G.innerStyleClass = G.styleClass + " .gt-inner";
                G.minWidth = G.minWidth + this.Im0;
                G.innerStartHTML = Sigma.T_G.innerStart(G);
                if (G.sortOrder) this.addSortInfo(this.hf3(G));
                if (G.separator) G.separator.gridId = G.gridId;
                if (G.hidden);
            }
            this.defaultRecord = this.defaultRecord || E;
            return this
        },
        getMsg: function($) {
            var _ = Sigma.Msg.Grid[this.language][$];
            return _
        },
        Tf2: function() {
            if (this.autoSelectFirstRow && !this.selectRowByCheck) this.selectFirstRow();
            this.toggleEmptyRow();
            Sigma.$invoke(this, "onComplete", [this]);
            this.hideWaiting();
            this.uP8++
        },
        render: function($) {
            if (!this.rendered) {
                $ = Sigma.bo7($);
                this.container = $ || this.container;
                this.It9();
                this.fn8();
                this.Hr3();
                this.ix9();
                this.Yt9();
                this.Sq1();
                this.rE4();
                this.Vu3();
                this.rendered = true
            }
            return this
        },
        getEl: function() {
            return this.gridDiv
        },
        aj7: function() {
            var $ = this;
            this.headDivHeight = this.headDiv.clientHeight;
            if (this.customHead) {
                this.headDiv.style.height = this.headDivHeight - 2 + "px";
                Sigma.$thread(function() {
                    $.headDiv.scrollTop = 2
                });
                this.headDivHeight -= 2
            }
            this.freezeHeadDiv.style.height = this.headDivHeight + "px";
            this.freezeHeadDiv.style.top = 0 + this.freezeFixH + "px";
            this.freezeBodyDiv.style.top = this.headDivHeight + this.freezeFixH + 0 + "px"
        },
        fn8: function() {
            var _ = "display:none;";
            Sigma.Const.Grid.SCROLLBAR_WIDTH = 20;
            var $ = this;
            $.evenRowCss = $.stripeRows ? $.evenRowCss : "";
            var A = [];
            Sigma.$each(this.columnList, function(C, B) {
                C.width = C.width || $.defaultColumnWidth;
                var D = "" + C.width;
                if (D.indexOf("px") < 1 && D.indexOf("%") < 1) D = parseInt(D);
                else if (D.indexOf("%") > 0);
                A[B] = [C.CLASS_PREFIX + C.styleClass + " { width:" + (D + $.Im0) + "px;" + (C.hidden ? _ : "") + " } ", C.CLASS_PREFIX + C.innerStyleClass + " { width:" + (D + $.uq9) + "px; } "].join("\n")
            });
            Sigma.U.CSS.En5(A.join("\n"))
        },
        Hr3: function() {
            var $ = this;
            this.pageStateBar = Sigma.$(this.pageStateBar);
            if (this.isNative) this.gridDiv = Sigma.$(this.id + "_div");
            else {
                var A = [(Sigma.isBoxModel ? "gt-b-ie " : (Sigma.isSafari ? "gt-b-safari " : (Sigma.isOpera ? "gt-b-opera " : (Sigma.isStrict ? "gt-b-strict" : "")))), "gt-grid", "gt-skin-" + this.skin];
                this.gridDiv = Sigma.$e("div", {
                    id: this.id + "_div",
                    className: A.join(" ")
                });
                this.container = Sigma.$(this.container);
                if (!this.container || !this.container.appendChild || !this.container.tagName || Sigma.U.getTagName(this.container) == "BODY") Sigma.doc.body.appendChild(this.gridDiv);
                else if (this.replaceContainer === true) {
                    this.container.parentNode.insertBefore(this.gridDiv, this.container);
                    Sigma.U.removeNode(this.container);
                    this.container = null
                } else this.container.appendChild(this.gridDiv);
                this.gridDiv.innerHTML = Sigma.T_G.main(this)
            }
            this.gridDiv.hideFocus = true;
            this.gridMask = Sigma.$byId(this.id + "_mask");
            this.gridWaiting = Sigma.$(this.id + "_waiting");
            this.gridDialog = Sigma.$(this.id + "_dialog");
            this.gridDialogTitle = Sigma.$(this.id + "_dialog_title");
            this.gridDialogBody = Sigma.$(this.id + "_dialog_body");
            this.gridDiv.appendChild(this.gridEditorCache);
            this.gridFilterRSCache = this.gridFilterRSCache || Sigma.$e("table", {
                className: "gt-filter-rs-cache"
            });
            this.gridDiv.appendChild(this.gridFilterRSCache);
            this.showMask();
            this.viewport = Sigma.$(this.id + "_viewport");
            this.an8 = Sigma.$(this.id + "_toolBarBox");
            this.headDiv = Sigma.$(this.id + "_headDiv");
            this.bodyDiv = Sigma.$(this.id + "_bodyDiv");
            this.freezeView = Sigma.$(this.id + "_freezeView");
            this.freezeHeadDiv = Sigma.$(this.id + "_freeze_headDiv");
            this.freezeBodyDiv = Sigma.$(this.id + "_freeze_bodyDiv");
            this.ol3();
            this.separateLine = Sigma.$(this.id + "_separateLine");
            this.De9 = this.toolbarPosition == "top" || this.toolbarPosition == "t" ? this.toolbarHeight + (Sigma.isBoxModel ? 0 : 1) : 0;
            if (this.separateLine) this.separateLine.style.top = this.De9 + "px";
            this.columnMoveS = Sigma.$(this.id + "_columnMoveS");
            this.headerGhost = Sigma.$(this.id + "_headerGhost");
            if (this.an8) {
                this.toolBar = Sigma.$e("div", {
                    id: this.id + "_toolBar",
                    className: "gt-toolbar"
                });
                this.an8.appendChild(this.toolBar)
            }
            var B = "" + this.width,
            _ = "" + this.height;
            this.setSize(B, _, true);
            this.showWaiting();
            this.NB3()
        },
        NB3: function() {
            this.left = Sigma.U.getPosLeftTop(this.gridDiv);
            this.top = this.left[1];
            this.left = this.left[0];
            this.Ue3 = Sigma.U.getXY(this.viewport)
        },
        setSize: function(_, B, $) {
            var C = this,
            A = [this.gridDiv.offsetWidth, this.gridDiv.offsetHeight];
            _ = "" + _;
            B = "" + B;
            this.width = _;
            this.height = B;
            if (_.toLowerCase() == "auto") this.width = A[0] + "px";
            else if (_.indexOf("%") < 1 && _.indexOf("px") < 1) this.width = Sigma.U.parseInt(_) + "px";
            if (B.toLowerCase() == "auto") this.height = A[1] + "px";
            else if (B.indexOf("%") < 1 && B.indexOf("px") < 1) this.height = Sigma.U.parseInt(B) + "px";
            var D = false;
            if ((B.indexOf("%") > 1 || _.indexOf("%") > 1) && this.monitorResize) D = true;
            if (D) if (Sigma.isIE) this.gridDiv.style.overflowY = "hidden";
            else if (Sigma.isOpera) this.gridDiv.style.overflow = "hidden";
            C.Kh4($)
        },
        Kh4: function($) {
            this.gridMask.style.width = this.width;
            this.gridMask.style.height = this.height;
            this.gridDiv.style.width = this.width;
            this.gridDiv.style.height = this.height;
            var A = ("" + this.height).indexOf("%") > 0 ? this.gridDiv.clientHeight : parseInt(this.height),
            B = 0 - (Sigma.isBoxModel ? 2 : 3);
            this.bodyDiv.style.height = A - (this.headDivHeight + this.toolbarHeight) + B + "px";
            if (Sigma.isOpera) {
                var _ = this.gridDiv.clientWidth + B + "px";
                this.viewport.style.width = _;
                if (this.an8) this.an8.style.width = _
            }
            if (this.freezeBodyDiv) this.freezeBodyDiv.style.height = this.bodyDiv.clientHeight + "px";
            if ($ !== true) this.onResize()
        },
        ix9: function() {
            Sigma.U.createElementFromHTML(Sigma.T_G.formIFrame(this), Sigma.doc.body);
            this.gridForm = Sigma.$(this.id + "_export_form");
            this.gridFormTextarea = Sigma.$(this.id + "_export_form_textarea");
            this.gridIFrame = Sigma.$(this.id + "_export_iframe")
        },
        Yt9: function() {
            this.gridGhost = Sigma.$e("div", {
                id: this.id + "_gridGhost",
                className: "gt-grid-ghost-rect"
            });
            this.gridGhost.style.top = this.top + "px";
            this.gridGhost.style.left = this.left + "px";
            this.gridGhost.style.width = this.gridMask.style.width;
            this.gridGhost.style.height = this.gridMask.style.height;
            Sigma.doc.body.appendChild(this.gridGhost)
        },
        ol3: function() {
            var E = this,
            _;
            if (this.customHead) {
                if (Sigma.$type(this.customHead, "string")) if (this.customHead.indexOf("<table") === 0) {
                    Sigma.U.Qf1.innerHTML = this.customHead;
                    this.customHead = Sigma.U.Qf1.firstChild
                } else this.customHead = Sigma.$(this.customHead);
                this.customHead.style.display = "";
                this.headTable = Sigma.$e(this.customHead, {
                    id: this.id + "_headTable",
                    className: "gt-head-table",
                    cellSpacing: "0",
                    cellPadding: "0",
                    border: "0"
                });
                this.headTbody = this.headTable.tBodies[0];
                for (var H = 0; H < this.headTbody.rows.length; H++) {
                    var B = this.headTbody.rows[H];
                    B.className = "gt-hd-row";
                    for (var $ = 0; $ < B.cells.length; $++) {
                        var C = B.cells[$],
                        A = C.innerHTML,
                        F = C.getAttribute("columnId");
                        if (F) {
                            C.columnId = F;
                            var D = this.columnMap[F];
                            if (String(C.getAttribute("resizable")).toLowerCase() == "false") D.resizable = false;
                            if (String(C.getAttribute("sortable")).toLowerCase() == "false") D.sortable = false;
                            if (C.colSpan < 2) C.className = D.styleClass;
                            D.headCell = C
                        }
                        C.innerHTML = ["<div class=\"gt-inner", C.rowSpan < 2 ? "" : " gt-inner-tall2", "\" unselectable=\"on\" >", "<span>", A, "</span>", F ? Sigma.T_G.hdToolHTML : "", "</div>"].join("")
                    }
                }
                _ = Sigma.$e("tr", {
                    className: "gt-hd-row" + (this.customHead ? " gt-hd-hidden" : "")
                });
                Sigma.$each(this.columnList, function(A, B) {
                    var $ = Sigma.T_G.ki7(E, A, true);
                    _.appendChild($);
                    Sigma.Grid.ys4(E, A)
                });

                this.headTbody.insertBefore(_, this.headTbody.rows[0])
            } else {
                this.headTable = Sigma.$e("table", {
                    id: this.id + "_headTable",
                    className: "gt-head-table",
                    cellSpacing: "0",
                    cellPadding: "0",
                    border: "0"
                });
                this.headTbody = Sigma.$e("tbody");
                this.headTable.appendChild(this.headTbody);
                _ = Sigma.$e("tr", {
                    className: "gt-hd-row"
                });
                this.headTbody.appendChild(_);
                Sigma.$each(this.columnList, function(A, B) {
                    var $ = Sigma.T_G.ki7(E, A);
                    _.appendChild($);
                    A.headCell = $;
                    Sigma.Grid.ys4(E, A)
                }, this)
            }
            this.headTable.style.marginRight = 100 + "px";
            var G = this.headDiv.firstChild ? String(Sigma.U.getTagName(this.headDiv.firstChild)) : null;
            if (G == "DIV" || G == "SPAN") this.headDiv.firstChild.appendChild(this.headTable);
            else this.headDiv.appendChild(this.headTable);
            this.headFirstRow = this.headTbody.rows[0];
            this.freezeHeadTable = Sigma.$e("table", {
                id: this.headTable.id + "_freeze",
                className: "gt-head-table",
                cellSpacing: "0",
                cellPadding: "0",
                border: "0"
            });
            this.freezeHeadTable.style.height = "100%";
            this.freezeHeadDiv.appendChild(this.freezeHeadTable);
            this.aj7()
        },
        Vu3: function() {
            var $ = Sigma.$(this.id + "_bodyTable");
            if ($) {
                this.gridTable = $;
                this.gridTbodyList.push($.tBodies[0]);
                this.bodyFirstRow = this.lu3()
            } else this.Ip9()
        },
        getColumn: function($) {
            if (Sigma.$type($) == "number" && $ >= 0) return this.columnList[$];
            else if (Sigma.U.getTagName($) == "TD") return this.columnList[Sigma.U.getCellIndex($)];
            else return this.columnMap[$]
        },
        getDisplayColumns: function($) {
            var A = [];
            for (var B = 0; B < this.columnList.length; B++) {
                var _ = this.columnList[B];
                if (_.hidden !== ($ !== false)) A.push(_)
            }
            return A
        },
        fs2: function(D, E) {
            D = Sigma.$type(D, "number") ? this.Qa9(D) : D;
            E = E || this.getRecordByRow(D);
            var C = D.getAttribute(Sigma.Const.DataSet.INDEX) / 1;
            this.dataset.initValues(E, C, this.dataset);
            for (var _ = 0; _ < D.cells.length; _++) {
                var B = this.getColumn(_);
                if (B != this.activeColumn && B.syncRefresh === false) continue;
                var A = D.cells[_],
                $ = false;
                A.firstChild.innerHTML = B.renderer(E[B.fieldIndex], E, B, this, _, C)
            }
        },
        scrollGrid: function(H, G) {
            var F = this.Ps7,
            J = this.freezeBodyDiv.clientWidth,
            D = this.activeCell.offsetLeft + ((Sigma.isFF2 || Sigma.isFF1) ? 0 : F),
            E = D + this.activeCell.offsetWidth,
            A = this.activeCell.offsetTop,
            $ = A + this.activeCell.offsetHeight,
            C = this.bodyDiv.scrollLeft,
            _ = this.bodyDiv.scrollTop,
            I = C + this.bodyDiv.clientWidth + F,
            B = _ + this.bodyDiv.clientHeight;
            if (Sigma.$chk(H)) this.bodyDiv.scrollLeft = H;
            else if (D <= C + J) this.bodyDiv.scrollLeft = D - J - (J > 0 ? 1 : 0);
            else if (E >= I) this.bodyDiv.scrollLeft = C + E - I + F;
            if (Sigma.$chk(G)) this.bodyDiv.scrollTop = G;
            else if (A <= _) this.bodyDiv.scrollTop = A;
            else if ($ >= B) this.bodyDiv.scrollTop = _ + $ - B
        },
        Yh5: function($) {
            this.activeCell = $ = $ || this.activeCell;
            this.activeRow = $.parentNode;
            this.activeColumn = this.getColumn($);
            this.activeEditor = this.activeColumn ? this.activeColumn.editor : null;
            this.activeRecord = this.getRecordByRow(this.activeRow)
        },
        is0: function(A, $) {
            $ = $ || Sigma.U.hN2("td", null, A);
            if ($ && !this.isGroupRow($)) {
                this.closeGridMenu();
                var _ = $ != this.activeCell;
                if (_) {
                    Sigma.U.removeClass(this.activeCell, "gt-cell-actived" + (this.activeEditor ? "-editable" : ""));
                    this.eU8(null, this.activeCell)
                }
                this.Yh5($);
                _ && Sigma.U.addClass(this.activeCell, "gt-cell-actived" + (this.activeEditor ? "-editable" : ""));
                if (this.activeColumn && this.activeRecord) this.activeValue = this.activeRecord[this.activeColumn.fieldIndex];
                this.scrollGrid();
                this.eU8(null, this.activeCell)
            } else this.kr9();
            return $
        },
        Kd0: function(_) {
            var $ = Sigma.U.prevElement(_);
            while ($ && $.offsetWidth < 1) $ = Sigma.U.prevElement($);
            if (!$) {
                $ = Sigma.U.prevElement(_.parentNode);
                if ($) $ = $.cells[$.cells.length - 1]
            }
            while ($ && $.offsetWidth < 1) $ = Sigma.U.prevElement($);
            return $
        },
        cc7: function(_) {
            var $ = Sigma.U.nextElement(_);
            while ($ && $.offsetWidth < 1) $ = Sigma.U.nextElement($);
            if (!$) {
                $ = Sigma.U.nextElement(_.parentNode);
                if ($) $ = $.cells[0]
            }
            while ($ && $.offsetWidth < 1) $ = Sigma.U.nextElement($);
            return $
        },
        ve6: function(D) {
            var A = this.activeCell,
            E = null,
            $ = D.keyCode,
            C = this;

            function B($) {
                if ($) {
                    Sigma.U.stopEvent(D);
                    Sigma.Grid.vn9(D, C, $.parentNode);
                    C.NV8(D, $)
                }
            }
            if ($ == Sigma.Const.Key.ESC) {
                if (this.so6() === false) return;
                else Sigma.U.stopEvent(D)
            } else if ($ == Sigma.Const.Key.ENTER) {
                var _ = Sigma.U.getEventTarget(D);
                if (this.editing && Sigma.U.getTagName(_) == "TEXTAREA") return;
                Sigma.U.stopEvent(D);
                if (this.editing) {
                    if (this.so6() === false || !this.autoEditNext) return;
                    E = this.cc7(A);
                    B(E)
                } else {
                    this.Yh5(E);
                    this.KD0()
                }
            } else if (this.editing && $ == Sigma.Const.Key.TAB && D.shiftKey) {
                Sigma.U.stopEvent(D);
                E = this.Kd0(A);
                B(E)
            } else if (this.editing && $ == Sigma.Const.Key.TAB) {
                Sigma.U.stopEvent(D);
                E = this.cc7(A);
                B(E)
            } else if (A && !this.editing) {
                switch ($) {
                    case Sigma.Const.Key.LEFT:
                    case Sigma.Const.Key.TAB:
                        if ($ == Sigma.Const.Key.LEFT || D.shiftKey) {
                            E = this.Kd0(A);
                            while (this.isGroupRow(E)) E = this.Kd0(E);
                            break
                        }
                    case Sigma.Const.Key.RIGHT:
                        E = this.cc7(A);
                        while (this.isGroupRow(E)) E = this.cc7(E);
                        break;
                    case Sigma.Const.Key.DOWN:
                        E = Sigma.U.nextElement(A.parentNode);
                        while (this.isGroupRow(null, E)) E = Sigma.U.nextElement(E);
                        if (E) E = E.cells[Sigma.U.getCellIndex(A)];
                        break;
                    case Sigma.Const.Key.UP:
                        E = Sigma.U.prevElement(A.parentNode);
                        while (this.isGroupRow(null, E)) E = Sigma.U.prevElement(E);
                        if (E) E = E.cells[Sigma.U.getCellIndex(A)];
                        break
                }
                if (E) {
                    Sigma.U.stopEvent(D);
                    Sigma.Grid.vn9(D, this, E.parentNode);
                    this.is0(D, E)
                }
            }
        },
        getEventTargets: function(B, D) {
            var D = null,
            C = null,
            $ = -1,
            A = -1,
            _ = null;
            D = D || Sigma.U.hN2("td", null, B);
            if (D) {
                C = D.parentNode;
                $ = Sigma.U.getCellIndex(D);
                A = C.rowIndex;
                _ = this.columnList[$]
            }
            return {
                cell: D,
                row: C,
                colNo: $,
                rowNo: A,
                column: _
            }
        },
        fp0: function(C, $, A) {
            var B = A === false ? "onClickCell" : (A === true ? "onDblClickCell" : null),
            _ = this.getEventTargets(C, $);
            if (_.cell) {
                B && (Sigma.$invoke(this, B, [this.activeValue, this.activeRecord, _.cell, _.row, _.colNo, _.rowNo, _.column, this, C]));
                Sigma.$invoke(this, "onSelectCell", [this.activeValue, this.activeRecord, _.cell, _.row, _.colNo, _.rowNo, _.column, this, C])
            }
        },
        KD0: function() {
            if (this.activeCell && this.activeEditor && (this.activeColumn.editable || this.isInsertRow(this.activeRow)) && Sigma.$invoke(this.activeColumn, "beforeEdit", [this.activeValue, this.activeRecord, this.activeColumn, this]) !== false && Sigma.$invoke(this, "beforeEdit", [this.activeValue, this.activeRecord, this.activeColumn, this]) !== false && !this.isDelRow(this.activeRow)) {
                this.editing = true;
                this.hP0(this.activeValue, this.activeRecord)
            }
        },
        so6: function() {
            if (this.activeEditor && this.activeEditor.locked === true || (this.activeDialog != this.activeEditor) && this.activeDialog && !this.activeDialog.hidden) return false;
            if (this.activeCell && this.activeEditor && (this.activeColumn.editable || this.isInsertRow(this.activeRow))) {
                this.Fl7();
                this.editing = false;
                this.eU8(null, this.activeCell)
            }
        },
        hP0: function(A, _) {
            var $ = this.activeCell,
            C = this.bodyDiv,
            B = this.Ps7;
            if (this.activeColumn.frozen) {
                $ = this.qT7(this.activeCell)[1];
                C = this.freezeBodyDiv;
                B = 0
            }
            if (this.activeEditor && this.activeEditor instanceof Sigma.Dialog);
            else C.appendChild(this.activeEditor.bo7());
            this.activeEditor.show();
            this.activeEditor.setValue(A, _);
            if (this.activeEditor !== this.activeDialog) {
                this.activeEditor.Kn0(((Sigma.isFF2 || Sigma.isFF1) ? 0 : B) + $.offsetLeft, $.offsetTop);
                this.activeEditor.setSize($.offsetWidth, $.offsetHeight)
            }
            this.activeEditor.active()
        },
        validValue: function(A, _, C, $) {
            if (A.editor) {
                var B = A.editor.ge5(_, C, A, this);
                if (B !== true) this.eT1(_, B, $, A);
                return B
            }
            return true
        },
        Fl7: function() {
            if (this.editing) {
                var A = this.activeRow,
                B = this.activeValue,
                _ = this.activeEditor.parseValue(this.activeEditor.getValue()),
                $ = this.validValue(this.activeColumn, _, this.activeRecord, this.activeCell);
                if ($ === true && String(this.activeValue) !== String(_)) {
                    this.updateRecordField(this.activeCell, _);
                    this.fs2(A, this.activeRecord);
                    this.dirty(this.activeCell);
                    this.activeValue = _
                }
                Sigma.$invoke(this.activeColumn, "afterEdit", [_, B, this.activeRecord, this.activeColumn, this]);
                Sigma.$invoke(this, "afterEdit", [_, B, this.activeRecord, this.activeColumn, this])
            }
            if (this.activeEditor && this.activeEditor instanceof Sigma.Dialog);
            else this.gridEditorCache.appendChild(this.activeEditor.bo7());
            this.activeEditor.hide()
        },
        eT1: function(A, B, $, _) {
            var C = this.qT7($);
            Sigma.U.addClass(C[0], "gt-cell-vaildfailed");
            Sigma.U.addClass(C[1], "gt-cell-vaildfailed");
            B = [].concat(B);
            alert(B.join("\n") + "\n\n" + A);
            Sigma.$thread(function() {
                Sigma.U.removeClass(C[0], "gt-cell-vaildfailed");
                Sigma.U.removeClass(C[1], "gt-cell-vaildfailed")
            }, 1500)
        },
        NV8: function(B, A, $) {
            if (this.so6() === false) return;
            if (this.rowNum < 1) return;
            var _ = this.activeCell;
            this.is0(B, A);
            this.fp0(B, A, $);
            if (this.activeEditor && (this.clickStartEdit || _ && _ == this.activeCell)) {
                Sigma.U.stopEvent(B);
                this.Yh5(A);
                this.KD0()
            }
        },
        Ox5: function(A) {
            var B = A,
            $ = A.rowIndex,
            _ = !B.id ? this.gridTbodyList[0] : this.freezeBodyTable.tBodies[0];
            row2 = _ ? _.rows[$] : null;
            if (!row2 && _ && _.parentNode.tFoot) row2 = _.parentNode.tFoot.rows[$ - _.rows.length];
            return B.id ? [B, row2, $] : [row2, B, $]
        },
        qT7: function(E, _) {
            var A = E,
            $ = Sigma.U.getCellIndex(E),
            C = null,
            B = 0,
            D = E.parentNode;
            _ = _ || this.Ox5(D);
            if (_[1] == D) {
                B = $ - (this.showIndexColumn ? 1 : 1);
                return [_[0] ? _[0].cells[B] : null, E, $]
            }
            B = $ + (this.showIndexColumn ? 1 : 1);
            return [E, _[1] ? _[1].cells[B] : null, $]
        },
        eU8: function(C, _) {
            if (!C && !_) return;
            C = C || _.parentNode;
            var $ = this.Ox5(C),
            B = $[1],
            C = $[0];
            if (B && C) {
                B.className = C.className;
                Sigma.U.removeClass(B, "gt-row-over")
            }
            if (_) {
                var A = this.qT7(_, $),
                D = A[1],
                _ = A[0];
                if (D && _) {
                    D.className = _.className;
                    if (D.getElementsByTagName("input")[0]) _.innerHTML = D.innerHTML;
                    else D.innerHTML = _.innerHTML
                }
            }
        },
        clickBodyDiv: function(B, C, A) {
            C = C || Sigma.U.hN2("td", null, B);
            if (!C || C == this.bodyDiv) {
                this.so6();
                return
            }
            var $ = C.parentNode,
            _ = Sigma.U.getEventTarget(B),
            D = (Sigma.U.getTagName(_) == "INPUT" && _.className == "gt-f-check");
            if (D) Sigma.CL8(_, this);
            if (!this.selectRowByCheck) Sigma.Grid.qi0(B, this, $);
            this.ac8();
            if (!Sigma.U.hasClass(C, "gt-index-col")) this.NV8(B, C, A);
            this.eU8(null, C)
        },
        rE4: function() {
            var _ = this;
            Sigma.initGlobalEvent();
            if (_.monitorResize) {
                Sigma.U.addEvent(window, "resize", function($) {
                    _.Kh4()
                });
                _.hasResizeListener = true
            }
            Sigma.U.addEvent(_.gridDiv, "mousedown", function($) {
                _.ac8()
            });
            Sigma.U.addEvent(_.bodyDiv, "click", function($) {
                _.clickBodyDiv($, null, false)
            });
            Sigma.U.addEvent(_.freezeBodyDiv, "click", function($) {
                var A = Sigma.U.hN2("td", null, $);
                _.clickBodyDiv($, _.qT7(A)[0], false)
            });
            Sigma.U.addEvent(_.bodyDiv, "dblclick", function($) {
                _.clickBodyDiv($, null, true)
            });
            Sigma.U.addEvent(_.freezeBodyDiv, "dblclick", function($) {
                var A = Sigma.U.hN2("td", null, $);
                _.clickBodyDiv($, _.qT7(A)[0], true)
            });
            Sigma.U.addEvent(_.bodyDiv, "scroll", function($) {
                _.ac8();
                _.closeGridMenu();
                _.syncScroll()
            });
            Sigma.U.addEvent(_.headDiv, "selectstart", function($) {
                Sigma.U.stopEvent($);
                return false
            });

            function $(A) {
                A = A || window.event;
                var $ = Sigma.U.hN2("td", null, A);
                if ($) Sigma.U.addClass($, "gt-hd-row-over");
                if (_.lastOverHdCell != $) Sigma.U.removeClass(_.lastOverHdCell, "gt-hd-row-over");
                _.lastOverHdCell = $
            }
            Sigma.U.addEvent(_.headTable, "mousemove", $);
            Sigma.U.addEvent(_.freezeHeadTable, "mousemove", $);
            _.onmouseover = _.onmouseover || _.onMouseOver;
            if (_.onmouseover) Sigma.U.addEvent(_.bodyDiv, "mouseover", function($) {
                Sigma.$invoke(_, "onmouseover", [$, _])
            });
            _.onmouseout = _.onmouseout || _.onMouseOut;
            if (_.onmouseout) Sigma.U.addEvent(_.bodyDiv, "mouseout", function($) {
                Sigma.$invoke(_, "onmouseout", [$, _])
            });
            _.onmousemove = _.onmousemove || _.onMouseMove;
            if (_.lightOverRow) {
                Sigma.U.addEvent(_.bodyDiv, "mousemove", function($) {
                    Sigma.Grid.ql8($, _);
                    Sigma.$invoke(_, "onmousemove", [$, _, _.bodyDiv])
                });
                Sigma.U.addEvent(_.freezeBodyDiv, "mousemove", function($) {
                    Sigma.Grid.Or1($, _);
                    Sigma.$invoke(_, "onmousemove", [$, _, _.freezeBodyDiv])
                })
            }
        },
        toolTipDiv: null,
        showCellToolTip: function(_, $) {
            if (!this.toolTipDiv) {
                this.toolTipDiv = Sigma.$e("div", {
                    className: "gt-cell-tooltip gt-breakline"
                });
                this.toolTipDiv.style.display = "none"
            }
            this.toolTipDiv.innerHTML = Sigma.$getText(_);
            this.gridDiv.appendChild(this.toolTipDiv);
            this.toolTipDiv.style.left = _.offsetLeft + this.bodyDiv.offsetLeft - this.bodyDiv.scrollLeft + ((Sigma.isFF2 || Sigma.isFF1) ? 0 : this.Ps7) + "px";
            this.toolTipDiv.style.top = _.offsetTop + _.offsetHeight + this.bodyDiv.offsetTop - this.bodyDiv.scrollTop + this.De9 + (Sigma.isFF ? 1 : 0) + "px";
            $ && (this.toolTipDiv.style.width = $ + "px");
            this.toolTipDiv.style.display = "block"
        },
        hideCellToolTip: function() {
            if (this.toolTipDiv) {
                this.toolTipDiv.style.display = "none";
                this.gridEditorCache.appendChild(this.toolTipDiv);
                this.toolTipDiv.innerHTML = ""
            }
        },
        destroy: function() {
            Sigma.$invoke(this, "cb3");
            this.ih6();
            Sigma.GridCache[this.id] = null;
            delete Sigma.GridCache[this.id]
        },
        addParameters: function(_, $) {
            this.parameters = Sigma.U.add2Map(_, $, this.parameters)
        },
        setParameters: function($) {
            this.parameters = $
        },
        cleanParameters: function() {
            this.parameters = {}
        },
        setQueryParameters: function($) {
            this.queryParameters = $
        },
        cleanQueryParameters: function() {
            this.queryParameters = {}
        },
        addQueryParameter: function(_, $) {
            this.queryParameters = Sigma.U.add2Map(_, $, this.queryParameters)
        },
        removeQueryParameter: function(_) {
            var $ = this.queryParameters[_];
            this.queryParameters[_] = undefined;
            delete this.queryParameters[_];
            return $
        },
        exceptionHandler: function(_, $) {
            alert($ + "\n\n" + _)
        },
        getInsertedRecords: function() {
            return Sigma.$array(this.dataset.insertedRecords)
        },
        getUpdatedRecords: function() {
            return Sigma.$array(this.dataset.updatedRecords)
        },
        getUpdatedFields: function() {
            return Sigma.$array(this.dataset.updatedFields)
        },
        getDeletedRecords: function() {
            return Sigma.$array(this.dataset.deletedRecords)
        },
        getColumnInfo: function() {
            var A = [];
            for (var _ = 0; _ < this.columnList.length; _++) {
                var $ = this.columnList[_],
                B = {
                    id: $.id,
                    header: $.header || $.title,
                    fieldName: $.fieldName,
                    fieldIndex: $.fieldIndex,
                    sortOrder: $.sortOrder,
                    hidden: $.hidden,
                    exportable: $.exportable,
                    printable: $.printable
                };
                A.push(B)
            }
            return A
        },
        getSaveParam: function($) {
            $ = $ || {};
            $[this.CONST.fieldsName] = this.dataset.fieldsName;
            $[this.CONST.recordType] = this.dataset.getRecordType();
            $[this.CONST.parameters] = this.parameters;
            this.submitUpdatedFields && ($[this.CONST.updatedFields] = this.getUpdatedFields());
            return $
        },
        getLoadParam: function($) {
            $ = $ || {};
            $[this.CONST.recordType] = this.dataset.getRecordType();
            $[this.CONST.pageInfo] = this.getPageInfo(true);
            this.submitColumnInfo && ($[this.CONST.columnInfo] = this.getColumnInfo());
            $[this.CONST.sortInfo] = this.AP1();
            $[this.CONST.filterInfo] = this.rt0();
            $[this.CONST.parameters] = this.parameters;
            if (this.recount) $[this.CONST.pageInfo].totalRowNum = -1;
            return $
        },
        // Add new for the getting export with checkbox selection.
        getExportParam: function($) {
            $ = $ || {};
            $[this.CONST.selectedRecords] = this.dataset.selectedRecords;
            return $
        },
        iL9: function(A, F, _, $, D) {
            var E = this;
            E.requesting = true;
            var B = F[E.CONST.action];
            if (A) {
                try {
                    E.ajax = new Sigma.Ajax(A);
                    E.ajax.encoding = E.encoding || E.ajax.encoding;
                    E.ajax.method = E.ajaxMethod || E.ajax.method;
                    E.ajax.mimeType = E.mimeType || E.ajax.mimeType;
                    E.ajax.jsonParamName = E.jsonParamName || E.ajax.jsonParamName;
                    E.ajax.onSuccess = $ || Sigma.$empty;
                    E.ajax.onFailure = D || Sigma.$empty;
                    E.ajax.setQueryParameters(E.queryParameters);
                    E.ajax.send({
                        data: F
                    })
                } catch (C) {
                    D({
                        status: "Exception " + C.message
                    })
                }
            } else D({
                status: "url is null"
            })
        },
        save: function(K) {
            if (this.so6() === false) return;
            var _ = this.saveURL,
            L = this.getInsertedRecords(),
            M = this.getUpdatedRecords(),
            E = this.getDeletedRecords(),
            C = (L != null && L.length > 0 || M != null && M.length > 0 || E != null && E.length > 0);
            if (!K && !C) alert(this.getMsg("NO_MODIFIED"));
            else {
                var A = this.gridTable.tFoot ? this.gridTable.tFoot.rows : [];
                for (var B = 0, $ = L.length; B < $; B++) {
                    var N = L[B];
                    for (var G = 0; G < this.columnList.length; G++) {
                        var J = this.columnList[G];
                        if (J.editor) {
                            var H = N[J.fieldIndex],
                            F = A[B] ? A[B].cells[J.colIndex] : null;
                            if (this.validValue(J, H, N, F) !== true) return false
                        }
                    }
                }
                var D = this.getSaveParam();
                D[this.CONST.action] = "save";
                D[this.CONST.insertedRecords] = L;
                D[this.CONST.updatedRecords] = M;
                D[this.CONST.deletedRecords] = E;
                if (Sigma.$invoke(this, "beforeSave", [D, this]) !== false) {
                    this.showWaiting();
                    var I = this;
                    return this.iL9(_, D, "json", function($) {
                        return function(_) {
                            I.sr4(_, D, $)
                        }
                    } (K), function($, A) {
                        var _ = {};
                        _[I.CONST.exception] = " XMLHttpRequest Status : " + $.status;
                        I.saveFailure(_);
                        I.hideWaiting()
                    })
                }
            }
            if (K === true) this.load();
            return false
        },
        load: function(C, $) {
            var D = this,
            _ = this.loadURL,
            A = (!this.autoLoad && !this.rendered);
            if (A) {
                D.hideWaiting();
                D.hideFreezeZone();
                return
            }
            this.remotePaging = this.remotePaging === false ? false : !!_;
            var E = this.getLoadParam();
            if (C === true) E[this.CONST.pageInfo].totalRowNum = -1;
            E[this.CONST.action] = "load";
            if (Sigma.$invoke(this, "beforeLoad", [E, this]) !== false) {
                if (!_ || ($ !== true && this.remotePaging === false && !this.isFirstLoad)) {
                    D.requesting = true;
                    D.Qp9(function() {
                        var A = {};
                        A[D.dataRoot] = D.dataset.data || [];
                        var $ = D.getPageInfo(),
                        _ = D.dataset.getSize();
                        $.totalRowNum = _ > 0 ? _ : 0;
                        A[D.CONST.pageInfo] = $;
                        return A
                    } (D), E);
                    return
                }
                this.showWaiting();
                var B = this.iL9(_, E, "json", function($) {
                    D.Qp9($, E)
                }, function($, A) {
                    var _ = {};
                    _[D.CONST.exception] = " XMLHttpRequest Status : " + $.status;
                    D.loadFailure(_);
                    D.hideWaiting()
                });
                this.isFirstLoad = false;
                return B
            } else D.hideWaiting();
            return false
        },
        query: function($) {
            this.setQueryParameters($);
            this.lastAction = "query";
            this.reload(true, true)
        },
        Ip9: function(_, $) {
            Sigma.$chk(_) && (this.getPageInfo().pageNum = _);
            if (this.autoSaveOnNav) this.save(true);
            else this.load()
        },
        reload: function($, _) {
            if (_ !== false || !this.dataset || this.dataset.getSize() < 0) this.load($, true);
            else this.refresh()
        },
        refresh: function(C) {
            if (this.dataset && C) this.dataset.vk2(C);
            var $ = this,
            A = $.scrollLeft,
            _ = $.scrollTop;
            if ($.remotePaging === false) $.dataset.startRecordNo = ($.getPageInfo().startRowNum || 1) - 1;

            function B() {
                if (Sigma.$invoke($, "beforeRefresh", [$]) !== false) {
                    $.ih6();
                    !$.remoteSort && $.ei0();
                    $.br2();
                    $.autoUpdateSortState && $.updateSortState();
                    $.sorting = false;
                    $.autoUpdateEditState && $.updateEditState();
                    $.updateCheckState();
                    $.autoUpdateFreezeState && $.Ri6();
                    $.refreshToolBar();
                    $.syncScroll(A, _);
                    Sigma.$invoke($, "afterRefresh", [$]);
                    $.Tf2()
                }
            }
            Sigma.$thread(B)
        },
        saveSuccess: function($) {
            this.dataset.cleanModifiedData(true);
            if (this.autoSaveOnNav && Ip9 || this.reloadAfterSave) {
                if (this.recountAfterSave) this.getPageInfo().totalRowNum = -1;
                else if ($[this.CONST.pageInfo]) this.getPageInfo().totalRowNum = $[$.CONST.pageInfo].totalRowNum || this.getPageInfo().totalRowNum;
                this.reload()
            }
        },
        sr4: function(A, $, C) {
            var B = this.Rn8(A, $);
            if (this.requesting) {
                var _ = {};
                Sigma.$extend(_, B);
                this.requesting = false;
                if (_[this.CONST.success] === false || _[this.CONST.success] === "false") this.saveFailure(_);
                else this.saveSuccess(_);
                this.hideWaiting()
            }
        },
        loadSuccess: function($) {
            this.setContent($)
        },
        cleanContent: function() {
            this.setContent({
                data: [],
                pageInfo: {
                    pageNum: 1,
                    totalPageNum: 1,
                    totalRowNum: 0,
                    startRowNum: 0
                }
            })
        },
        setContent: function(_) {
            var $ = this.getPageInfo();
            if (Sigma.$type(_, "array")) _[this.dataRoot] = _;
            else {
                _[this.CONST.pageInfo] = _[this.dataPageInfo || this.CONST.pageInfo];
                if (_[this.CONST.recordType]) this.dataset.TB1(_[this.CONST.recordType]);
                if (_[this.CONST.pageInfo]) Sigma.$extend($, _[this.CONST.pageInfo]);
                $.totalRowNum = _.totalRowNum || $.totalRowNum
            }
            if (_[this.dataRoot] && Sigma.$invoke(this, "Un9", [_[this.dataRoot]]) !== false) {
                $.totalRowNum = $.totalRowNum || _[this.dataRoot].length;
                this.refresh(_[this.dataRoot])
            } else this.refresh()
        },
        Qp9: function(A, B) {
            var _ = this.Rn8(A, B);
            if (this.requesting) {
                var $ = {};
                Sigma.$extend($, _);
                if ($[this.CONST.success] === false || $[this.CONST.success] === "false") {
                    this.loadFailure($);
                    this.hideWaiting()
                } else this.loadSuccess($);
                this.requesting = false
            }
        },
        Rn8: function(response, reqParam, action) {
            action = action || reqParam[this.CONST.action];
            response = Sigma.$invoke(this, action + "ResponseHandler", [response, reqParam]) || response;
            if (!response || Sigma.$type(response, "string", "number")) response = {
                text: response
            };
            var respT = null;
            try {
                respT = response.text ? eval("(" + response.text + ")") : response
            } catch (e) {
                respT = {};
                respT[this.CONST.exception] = response.text
            }
            if (respT[this.CONST.exception]) respT[this.CONST.success] = false;
            return respT
        },
        exportGrid: function(A, F, B, C, E) {
            var $ = this;
            if (Sigma.$invoke($, "beforeExport", [A, F, B, C, E, $]) !== false) {
                try {
                    A = A || this.exportType;
                    F = F || this.exportFileName;
                    B = B || this.exportURL;
                    C = C || this.jsonParamName || (this.ajax ? this.ajax.jsonParamName : Sigma.AjaxDefault.paramName);
                    E = "export";

                    /*
                    if (this.html2pdf && A == "pdf") {
                    this.gridFormTextarea.name = "__gt_html";
                    var _ = ["<style type=\"text/css\">", this.Ie8("exportable"), "</style>"];
                    this.gridFormTextarea.value = _.join("\n") + "\n" + this.yt2(true)
                    } else {
                    var G = this.getLoadParam();
                    G[this.CONST.action] = E;
                    G[this.CONST.exportType] = A;
                    G[this.CONST.exportFileName] = F;
                    */

                    // Added for getting selected Rows data with checkbox.
                    var G = this.getExportParam();
                    var Z = $.getSelectedRecords();

                    if (Z.length <= 0) {
                        alert("Please select at least one record for export.");
                        return;
                    }

                    G[this.CONST.selectedRecords] = Z;
                    // End adding.

                    this.gridFormTextarea.name = C;
                    this.gridFormTextarea.value = Sigma.$json(G)

                    this.gridForm.action = B + (B.indexOf("?") >= 0 ? "&" : "?") + "exportType=" + A + "&exportFileName=" + F;
                    B && (this.gridForm.submit());
                    this.gridFormTextarea.value = ""
                } catch (D) {
                    this.exportFailure({
                        type: A,
                        fileName: F
                    }, D)
                }
            }
        },
        loadFailure: function(A, _) {
            var $ = A[this.CONST.exception] || (_ ? (_.message || "") : "");
            alert(" LOAD Failed! " + "\n Exception : \n" + $)
        },
        saveFailure: function(A, _) {
            var $ = A[this.CONST.exception] || (_ ? (_.message || "") : "");
            alert(" SAVE Failed! " + "\n Exception : \n" + $)
        },
        exportFailure: function(A, _) {
            var $ = A[this.CONST.exception] || (_ ? (_.message || "") : "");
            alert(" Export " + A.type + " ( " + A.fileName + " ) Failed! " + "\n Exception : \n" + $)
        },
        updateRecordField: function(A, $) {
            var _ = this.getColumn(A);
            if (_) {
                var B = this.getRecordByRow(A.parentNode);
                return this.update(B, _.fieldName, $)
            }
            return false
        },
        update: function(_, $, A) {
            if (Sigma.$invoke(this, "beforeUpdate", [_, $, A]) !== false) {
                this.dataset.updateRecord(_, $, A);
                return true
            }
        },
        Gh5: function(G, A) {
            var B = this.defaultRecord;
            if (Sigma.$type(B, "function")) B = B(this, this.dataset, this.dataset.getSize());
            G = G || Sigma.$clone(B);
            if (!G) if (this.dataset.getRecordType() == "array") G = [];
            else G = {};
            if (Sigma.$invoke(this, "beforeInsert", [G]) !== false) {
                this.dataset.BC8(G);
                G[Sigma.Const.DataSet.NOT_VAILD] = true;
                var $ = this.rowKey + this.getUniqueField(G);
                G[Sigma.Const.DataSet.ROW_KEY] = $;
                var E = this.dR3(G);
                this.bodyDiv.scrollTop = this.bodyDiv.scrollHeight;
                this.rowNum++;
                if (A !== false) {
                    var F = 0,
                    C = -1;
                    for (F = 0; F < this.columnList.length; F++) {
                        var D = this.columnList[F];
                        if (C < 0 && !D.hidden && D.editor) C = F;
                        if (D.frozen && E[1]) {
                            var H = E[0].cells[F].cloneNode(true);
                            E[1].appendChild(H)
                        }
                    }
                    var _ = E[0].cells[C]
                }
                this.syncScroll()
            }
            this.toggleEmptyRow()
        },
        add: function($, _) {
            this.Gh5($, _)
        },
        del: function(B) {
            var $ = B ? [].concat(B) : this.selectedRows;
            if (this.so6() === false) return;
            for (var C = 0; C < $.length; C++) {
                B = $[C];
                var D = this.getRecordByRow(B);
                this.unselectRow(B);
                if (!D) return;
                if (this.isInsertRow(B)) {
                    if (this.activeCell && this.activeRow == B) this.kr9();
                    var A = this.Ox5(B);
                    Sigma.U.removeNode(A[0], A[1]);
                    this.dataset.Ne8(D);
                    this.toggleEmptyRow();
                    return
                }
                if (Sigma.$invoke(this, "beforeDelete", [D, B, this]) !== false) {
                    var _ = this.dataset.ko8(D);
                    if (!_) {
                        this.dataset.Ne8(D);
                        Sigma.U.addClass(B, "gt-row-del")
                    } else {
                        this.dataset.undeleteRecord(D);
                        Sigma.U.removeClass(B, "gt-row-del")
                    }
                    this.eU8(B)
                }
            }
        },
        dR3: function(B) {
            var _, C, $ = this.colNum,
            D = Sigma.T_G.rowStart(this, this.rowNum);
            if (!this.gridTable.tFoot) this.gridTable.appendChild(Sigma.$e("tfoot"));
            if (!this.freezeBodyTable.tFoot) this.freezeBodyTable.appendChild(Sigma.$e("tfoot"));
            _ = Sigma.U.createTrFromHTML(this.mg8(D, B, this.rowNum, $), this.gridTable.tFoot);
            if (this.showIndexColumn) C = Sigma.U.createTrFromHTML(this.Cg8(D, B, this.rowNum, $), this.freezeBodyTable.tFoot);
            else {
                C = Sigma.U.createTrFromHTML(D + "</tr>", this.freezeBodyTable.tFoot);
                C.appendChild(Sigma.T_G.freezeBodyCell(this, 10, null))
            }
            Sigma.U.addClass(_, "gt-row-new");
            Sigma.U.addClass(C, "gt-row-new");
            var A = B[Sigma.Const.DataSet.ROW_KEY];
            _.id = A;
            _.setAttribute(Sigma.Const.DataSet.INDEX, B[Sigma.Const.DataSet.SN_FIELD]);
            return [_, C]
        },
        kr9: function() {
            this.activeCell = null;
            this.activeColumn = null;
            this.activeEditor = null;
            this.activeRecord = null;
            this.activeValue = null
        },
        ih6: function(A) {
            this.closeGridMenu();
            if (this.so6() === false) return;
            this.lastOverHdCell = null;
            if (A !== false) {
                this.kr9();
                this.selectedRows = [];
                this.overRow = null
            }
            this.gridRowList = [];
            this.bodyFirstRow = null;
            for (var B = 0; B < this.colNum; B++) {
                var _ = this.columnList[B];
                _.firstCell = null
            }
            var $ = this;
            Sigma.$each(this.gridTbodyList, function(A, _) {
                $.gridTbodyList[_] = null;
                Sigma.U.removeNode(A)
            });
            this.gridTbodyList = null;
            Sigma.U.removeNode(this.gridTable);
            this.gridTable = null;
            if (this.freezeHeadTable) Sigma.U.removeNode(this.freezeHeadTable.tBodies[0]);
            if (this.freezeBodyTable) {
                Sigma.U.removeNode(this.freezeBodyTable.tBodies[0], this.freezeBodyTable);
                this.freezeBodyTable = null
            }
            this.gridTbodyList = []
        },
        hasDataRow: function() {
            var $ = this.yg8().length > 0,
            _ = !!(this.gridTable.tFoot && this.gridTable.tFoot.rows.length > 0);
            return $ || _
        },
        toggleEmptyRow: function() {
            if (!this.hasDataRow()) {
                var A = ["<tr class=\"gt-row gt-row-empty\" >"];
                for (var _ = 0; _ < this.colNum; _++) A.push(Sigma.T_G.cell(this.columnList[_], "&#160;"));
                A.push(Sigma.T_G.rowEndHTML);
                Sigma.U.createTrFromHTML(A.join(""), this.gridTbodyList[0])
            } else {
                var $ = this.lu3();
                if (this.isEmptyRow($)) Sigma.U.removeNode($)
            }
        },
        br2: function($) {
            $ = $ || this;
            var A = $.dataset.getSize(),
            _ = $.getPageInfo();
            if (!this.remotePaging && !_.pageSize) _.pageSize = A;
            A = A > _.pageSize ? _.pageSize : A;
            var F = $.dataset.startRecordNo;
            $.rowNum = A;
            $.rowBegin = F;
            $.rowEnd = F + A;
            $.colNum = $.columnList.length;
            $.Ps7 = 0;
            var B = [],
            C = [];
            if ($.freezeHeadTable) $.freezeHeadTable.appendChild(Sigma.$e("tbody"));
            $.fV0($, B, C);
            $.bodyDiv.innerHTML = B.join("");
            $.freezeBodyDiv.innerHTML = C.join("");
            var G = Sigma.U.firstChildElement($.bodyDiv);
            if (G) {
                if (Sigma.U.getTagName(G) != "TABLE") G = Sigma.U.nextElement(G);
                if (Sigma.U.getTagName(G) == "TABLE") {
                    $.gridTable = G;
                    $.gridTbodyList.push(G.tBodies[0])
                }
            }
            G = Sigma.U.firstChildElement($.freezeBodyDiv);
            if (G) {
                if (Sigma.U.getTagName(G) != "TABLE") G = Sigma.U.nextElement(G);
                $.freezeBodyTable = G
            }
            $.bodyFirstRow = $.lu3();
            if ($.rowNum < 1) for (var E = 0; E < $.colNum; E++) {
                var D = $.columnList[E];
                if ($.bodyFirstRow) {
                    D.firstCell = $.bodyFirstRow.cells[E];
                    D.firstCell.style.height = "0px";
                    D.firstCell.style.borderBottomWidth = "0px"
                }
            }
            $.aT4 = $.showIndexColumn;
            $.VG7 = true;
            Sigma.$thread(function() {
                $.freezeBodyDiv.style.height = $.bodyDiv.clientHeight + "px";
                $.syncScroll()
            })
        },
        hideFreezeZone: function() {
            this.freezeHeadDiv && (this.freezeHeadDiv.style.display = "none");
            this.freezeBodyDiv && (this.freezeBodyDiv.style.display = "none")
        },
        fV0: function(_, H, J) {
            var C = ("" + _.rowEnd).length;
            C = (C < 2 ? 1.5 : C) * 7 + 2 + 1;
            var B = C + this.Im0,
            D = C + this.uq9,
            I = "style=\"width:" + B + "px;\"",
            A = "style=\"width:" + D + "px;\"";
            this.indexColumnCell = ["<td class=\"gt-index-col\" " + I + " ><div class=\"gt-inner\" " + A + " >", "</div></td>"];
            if (_.showIndexColumn) {
                _.Ps7 = C;
                var E = Sigma.$e("tr", {
                    className: "gt-hd-row"
                }),
                G = Sigma.T_G.Pn3(_, C, null);
                E.appendChild(G);
                _.freezeHeadTable.tBodies[0].appendChild(E);
                _.freezeHeadDiv.style.left = _.freezeBodyDiv.style.left = this.freezeFixW + "px";
                _.headTable.style.marginLeft = _.Ps7 + "px";
                _.freezeHeadDiv.style.display = _.freezeBodyDiv.style.display = "block";
                _.freezeBodyDiv.style.height = parseInt(_.bodyDiv.style.height) + "px"
            } else _.freezeHeadDiv.style.display = _.freezeBodyDiv.style.display = "none";
            J.push(Sigma.T_G.tableStartHTML);
            H.push(Sigma.U.replaceAll(Sigma.T_G.tableStartHTML, "margin-left:0px", "margin-left:" + _.Ps7 + "px"));
            var $ = _.rowBegin,
            F = _.rowEnd;
            _.currentRowNum = $;
            _.qP3($, F, -1, H, J);
            J.push(Sigma.T_G.tableEndHTML)
        },
        isNextGroup: function(_, $, A) { },
        isGroupRow: function($, _) {
            $ = $ || (_ ? _.cells[0] : null);
            return Sigma.U.hasClass($, "gt-group-row")
        },
        isEmptyRow: function($) {
            return Sigma.U.hasClass($, "gt-row-empty")
        },
        isInsertRow: function($) {
            return Sigma.U.hasClass($, "gt-row-new")
        },
        isDelRow: function($) {
            return Sigma.U.hasClass($, "gt-row-del")
        },
        Cg8: function(C, A, $, B) {
            var _ = [C];
            _.push(this.indexColumnCell[0]);
            _.push($ + 1 + this.indexColumnCell[1]);
            _.push(Sigma.T_G.rowEndHTML);
            return _.join("")
        },
        mg8: function(C, E, A, B, F) {
            var _ = [C];
            for (var D = 0; D < B; D++) {
                var G = this.columnList[D],
                $ = F && F[G.id] ? F[G.id].attr : null;
                _.push(Sigma.T_G.cell(G, G.renderer(E[G.fieldIndex], E, G, this, D, A), $))
            }
            _.push(Sigma.T_G.rowEndHTML);
            return _.join("")
        },
        Ph1: function(D, B, C, $) {
            var A = [D],
            _ = "<td colspan=\"" + $ + "\" class=\"gt-group-row\" > + " + C + " -------------</td>";
            A.push(_);
            A.push(Sigma.T_G.rowEndHTML);
            return A.join("")
        },
        resetFreeze: function($) { },
        Ri6: function() {
            if (this.frozenColumnList) {
                for (var _ = 0; _ < this.frozenColumnList.length; _++) {
                    var $ = this.columnMap[this.frozenColumnList[_]];
                    if ($) Sigma.Grid.Li9(this, $.colIndex, _, true)
                }
                for (_ = 0; _ < this.frozenColumnList.length; _++) {
                    $ = this.columnMap[this.frozenColumnList[_]];
                    if ($) $.freeze(true)
                }
            }
        },
        getGroupInfo: function($, _) {
            return this.getMergeGroupInfo($, _)
        },
        getSeparateGroupInfo: function(B, D) {
            var F = this.colNum,
            E = null;
            for (var G = 0; G < F; G++) {
                var J = this.columnList[G];
                if (J.grouped) {
                    E = J;
                    break
                }
            }
            var $ = {};
            if (E) {
                var H = D - B,
                C = B;
                for (var _ = 0; _ < H; _++) {
                    var A = this.dataset.getRecord(C++);
                    if (!A) continue;
                    var I = this.getUniqueField(A)
                }
            }
        },
        getMergeGroupInfo: function(L, F) {
            var A = this.colNum,
            H = F - L,
            $, E, I = 1,
            C = {},
            N = null,
            I = 1,
            B = [];
            for (var M = 0; M < A; M++) {
                var J = this.columnList[M],
                D = L;
                for (var _ = 0; _ < H; _++) {
                    var K = this.dataset.getRecord(D++);
                    if (!K) continue;
                    $ = B[_] = B[_] || {};
                    var G = $["__gt_group_s_"];
                    if (J.grouped) {
                        E = $[J.id] = $[J.id] || {};
                        if (N == K[J.fieldIndex] && (!G && G !== 0 || G > M)) {
                            E.attr = " style=\"display:none;\" ";
                            I++
                        } else {
                            C.attr = " rowspan=\"" + I + "\" style=\"background-color: #eef6ff;\"  ";
                            I = 1;
                            C = E;
                            N = K[J.fieldIndex];
                            $["__gt_group_s_"] = M
                        }
                    }
                }
                C.attr = " rowspan=\"" + I + "\" style=\"background-color: #eef6ff;\"  "
            }
            return B
        },
        hf3: function($) {
            return {
                columnId: $.id,
                fieldName: $.fieldName,
                sortOrder: $.sortOrder,
                getSortValue: $.getSortValue,
                sortFn: $.sortFn
            }
        },
        ei0: function() {
            if (!this.sortInfo || this.sortInfo.length < 1) return;
            this.dataset.sort(this.sortInfo)
        },
        Bn1: function($) {
            this.sortInfo = $ || this.sortInfo;
            if (this.remoteSort) this.reload();
            else this.refresh()
        },
        addSortInfo: function(B, _) {
            _ = _ || _ === false ? _ : this.multiSort;
            var $ = [],
            F = false;
            for (var E = 0; E < this.columnList.length; E++) {
                var G = this.columnList[E];
                if (G.grouped) {
                    if (!F && G.id == B.columnId) {
                        G.sortOrder = B.sortOrder;
                        F = true
                    } else {
                        var C = G.sortOrder;
                        C = C == "asc" || C == "desc" ? C : "asc";
                        G.sortOrder = C
                    }
                    $.push(this.hf3(G))
                }
            }
            if (!F && _ !== true) {
                this.sortInfo = $.concat(B);
                return
            }
            this.sortInfo = this.sortInfo || [];
            var D = B.columnId,
            H = false;
            for (var I = 0; I < this.sortInfo.length; I++) {
                var A = this.sortInfo[I];
                if (A && A.columnId === D) {
                    A.sortOrder = B.sortOrder;
                    H = true;
                    break
                }
            } !H && (this.sortInfo.push(B));
            for (I = 0; I < this.sortInfo.length; I++) {
                A = this.sortInfo[I];
                if (!A || (!A.sortOrder || A.sortOrder == "defaultsort")) {
                    this.sortInfo.splice(I, 1);
                    I--
                }
            }
        },
        updateSortState: function() {
            for (var E = 0; E < this.colNum; E++) {
                var C = this.columnList[E];
                C.sortIcon && (C.sortIcon.className = "gt-hd-icon");
                C.frozenSortIcon && (C.frozenSortIcon.className = "gt-hd-icon");
                C.sortOrder = null
            }
            if (!this.sortInfo || this.sortInfo.length < 1) return;
            for (var _ = 0; _ < this.sortInfo.length; _++) {
                var B = this.sortInfo[_];
                if (B) {
                    var C = this.columnMap[B.columnId],
                    A = B.sortOrder || "defaultsort";
                    C.sortOrder = A;
                    Sigma.U.addClass(C.sortIcon, "gt-hd-" + A);
                    Sigma.U.addClass(C.frozenSortIcon, "gt-hd-" + A)
                }
            }
            var D = this.lu3();
            if (D && !this.isEmptyRow(D)) {
                this.bodyFirstRow = D;
                for (E = 0; E < this.colNum; E++) {
                    var $ = this.columnList[E];
                    $.firstCell = this.bodyFirstRow.cells[E];
                    $.firstCell.className = $.styleClass
                }
            }
        },
        getRecord: function($) {
            var _;
            if (Sigma.$type($) == "number" && $ >= 0) _ = $;
            else if (Sigma.U.getTagName($) == "TD") return this.getRecordByRow($.parentNode);
            else if (Sigma.U.getTagName($) == "TR") return this.getRecordByRow($);
            else if (Sigma.$type($) == "object" && !$.tagName) return $;
            else if (this.selectedRows.length > 0) _ = this.selectedRows[this.selectedRows.length - 1].getAttribute(Sigma.Const.DataSet.INDEX) / 1;
            else _ = 0;
            return this.dataset.getRecord(_)
        },
        getRecordByRow: function($) {
            if (this.isInsertRow($)) {
                var A = $.getAttribute(Sigma.Const.DataSet.INDEX);
                return this.dataset.insertedRecords[A]
            }
            var _ = $.getAttribute(Sigma.Const.DataSet.INDEX) / 1;
            return _ || _ === 0 ? this.dataset.getRecord(_) : null
        },
        getRowByRecord: function($) {
            var _ = $[Sigma.Const.DataSet.ROW_KEY];
            return Sigma.doc.getElementById(_)
        },
        getUniqueField: function($) {
            return $[this.dataset.uniqueField]
        },
        updateCheckState: function() {
            var D = this.checkColumn;
            if (D) {
                var F = D.colIndex,
                A = this.yg8();
                for (var _ = 0, E = A.length; _ < E; _++) {
                    var $ = A[_],
                    C = $.cells[F],
                    B = C ? C.getElementsByTagName("input") : null;
                    B = B ? B[0] : B;
                    if (B && B.checked) this.selectRow($)
                }
            }
        },
        updateEditState: function() {
            var E = this.getInsertedRecords();
            for (var H = 0; H < E.length; H++) this.dR3(E[H]);
            for (var _ in this.dataset.updatedRecords) {
                var C = this.dataset.updatedRecords[_],
                B = this.dataset.qo1[_],
                A = this.getRowByRecord(C);
                if (A) {
                    var F = this.getRecordByRow(A);
                    if (F) for (var G in B) {
                        F[G] = C[G];
                        for (var H = 0, $ = this.columnList.length; H < $; H++) {
                            var D = this.columnList[H];
                            if (G == D.fieldIndex && A.cells) {
                                this.dirty(A.cells[H]);
                                A.cells[H].firstChild.innerHTML = D.renderer(F[D.fieldIndex], F, D, this, H, A.rowIndex)
                            }
                        }
                    }
                    this.dataset.updatedRecords[_] = F
                }
            }
            for (_ in this.dataset.deletedRecords) {
                C = this.dataset.deletedRecords[_], A = this.getRowByRecord(C);
                this.del(A)
            }
        },
        filterGrid: function($) {
            this.filterInfo = $ || this.filterInfo;
            if (this.remoteFilter) {
                this.reload();
                return
            }
            this.oP4 = this.dataset.Ht1;
            this.filterDataProxy = this.dataset.filterData(this.filterInfo);
            if (!this.remoteFilter && this.justShowFiltered) {
                this.dataset.Ht1 = this.filterDataProxy;
                this.refresh()
            }
            if (this.afterFilter) this.afterFilter(this.filterDataProxy);
            return this.filterDataProxy
        },
        unfilterGrid: function($) {
            this.filterGrid([]);
            return null
        },
        syncScroll: function($, _) {
            if (Sigma.$chk($)) this.bodyDiv.scrollLeft = $;
            if (Sigma.$chk(_)) this.bodyDiv.scrollTop = _;
            this.headDiv.scrollLeft = this.bodyDiv.scrollLeft;
            this.freezeBodyDiv.scrollTop = this.bodyDiv.scrollTop;
            this.scrollLeft = this.bodyDiv.scrollLeft;
            this.scrollTop = this.bodyDiv.scrollTop
        },
        Sq1: function() {
            if (this.resizable && (this.toolbarPosition == "bottom" || this.toolbarPosition == "b") && this.an8) {
                this.resizeButton = Sigma.$e("div", {
                    id: this.id + "_resizeButton",
                    className: "gt-tool-resize",
                    innerHTML: "&#160;"
                });
                this.resizeButton.setAttribute("unselectable", "on");
                this.an8.appendChild(this.resizeButton);
                var $ = this;
                Sigma.U.addEvent(this.resizeButton, "mousedown", function(_) {
                    Sigma.Grid.rt1(_, $)
                })
            }
            this.kS1();
            if (this.toolbarContent && this.toolbarPosition && this.toolbarPosition != "none") {
                this.toolbarContent = this.toolbarContent.toLowerCase();
                var D = this.toolbarContent.split(" "),
                C = null;
                for (var _ = 0; _ < D.length; _++) {
                    var A = D[_];
                    if (A == "|") {
                        var E = Sigma.ToolFactroy.create(this, "separator", true);
                        if (C) C.separator = E
                    } else if (A == "state" || A == "info" || A == "pagestate") {
                        if (!this.pageStateBar) this.pageStateBar = Sigma.ToolFactroy.create(this, "pagestate", this.showPageState);
                        if (_ != D.length - 1) this.pageStateBar.className += " gt-page-state-left";
                        C = this.pageStateBar
                    } else if (A == "nav") {
                        this.navigator.pp0(this);
                        C = this.navigator
                    } else {
                        var B = A.charAt(0).toUpperCase() + A.substring(1);
                        this[A + "Tool"] = Sigma.ToolFactroy.create(this, A, this["show" + B + "Tool"]);
                        C = this[A + "Tool"]
                    }
                }
            }
            this.expendMenu = {};
            this.over_initToolbar = true
        },
        refreshToolBar: function(_, $) {
            _ && (this.setPageInfo(_));
            if (this.over_initToolbar) {
                this.navigator.Ln4(_, $);
                this.navigator.YY1();
                var A = this.navigator.pageInput;
                if (this.pageStateBar) {
                    var _ = this.getPageInfo();
                    Sigma.U.removeNode(this.pageStateBar.firstChild);
                    this.pageStateBar.innerHTML = "<div>" + Sigma.$msg(this.getMsg(A ? "PAGE_STATE" : "PAGE_STATE_FULL"), _.startRowNum, _.endRowNum, _.totalPageNum, _.totalRowNum, _.pageNum) + "</div>"
                }
            }
        },
        kS1: function() {
            if (!this.showGridMenu || !this.an8 || !this.toolBar) return;
            var A = this,
            G = A.id;
            this.gridMenuButton = new Sigma.Button({
                gridId: this.id,
                parentItem: this,
                container: this.toolBar,
                cls: "gt-tool-gridmenu",
                Cd2: true
            });
            var A = this,
            F = !this.allowGroup ? null : Sigma.BM6("group", {
                gridId: G,
                checkValid: function($) {
                    return $.grouped
                },
                checkFn: "group",
                uncheckFn: "ungroup",
                checkType: A.multiGroup ? "checkbox" : "radio",
                canCheck: function($) {
                    return !$.hidden
                }
            }),
            _ = !this.allowFreeze ? null : Sigma.BM6("freeze", {
                gridId: G,
                checkValid: function($) {
                    return $.frozen
                },
                checkFn: "freeze",
                uncheckFn: "unfreeze",
                canCheck: function($) {
                    return !$.hidden
                }
            }),
            H = !this.allowHide ? null : Sigma.BM6("show", {
                gridId: G,
                checkValid: function($) {
                    return !$.hidden
                },
                checkFn: "show",
                uncheckFn: "hide",
                canCheck: function($) {
                    return !$.frozen
                }
            });

            function D(_, $) {
                if (!_) return;
                _.show();
                _.setTitle($);
                A.gridMenuButton.vy0()
            }
            var $ = this.toolbarPosition != "bottom" ? "B" : "T";

            function C($) {
                return function() {
                    Sigma.Grid.qa7(A, $)
                }
            }
            var E = null;
            if (this.allowCustomSkin) {
                E = new Sigma.MenuItem({
                    gridId: this.id,
                    type: "",
                    text: this.getMsg("CHANGE_SKIN"),
                    cls: "gt-icon-skin"
                });
                var B = [];
                for (var I = 0; I < this.skinList.length; I++) B.push(new Sigma.MenuItem({
                    gridId: this.id,
                    type: "radiobox",
                    text: this.skinList[I].text,
                    checked: I === 0,
                    onclick: C(this.skinList[I].value)
                }));
                E.lM7(B, "R")
            }
            this.gridMenuButton.lM7([E, F ? new Sigma.MenuItem({
                gridId: A.id,
                type: "",
                text: A.getMsg("MENU_GROUP_COL"),
                cls: "gt-icon-groupcol",
                onclick: function() {
                    D(F, A.getMsg("MENU_GROUP_COL"))
                }
            }) : null, _ ? new Sigma.MenuItem({
                gridId: A.id,
                type: "",
                text: A.getMsg("MENU_FREEZE_COL"),
                cls: "gt-icon-freeze",
                onclick: function() {
                    D(_, A.getMsg("MENU_FREEZE_COL"))
                }
            }) : null, H ? new Sigma.MenuItem({
                gridId: A.id,
                type: "",
                text: A.getMsg("MENU_SHOW_COL"),
                cls: "gt-icon-hidecol",
                onclick: function() {
                    D(H, A.getMsg("MENU_SHOW_COL"))
                }
            }) : null, new Sigma.MenuItem({
                gridId: this.id,
                type: "",
                text: Sigma_GRID_VER
            })], $)
        },
        fu1: function() {
            this.gridMask && (this.gridMask.style.display = "block");
            Sigma.U.addClass(this.gridMask, "gt-grid-mask-show");
            Sigma.U.addClass(this.gridMask, "gt-grid-mask-show-trp")
        },
        Vd9: function() {
            this.gridMask && (this.gridMask.style.display = "block");
            Sigma.U.addClass(this.gridMask, "gt-grid-mask-show")
        },
        showMask: function($) {
            if ($ || this.transparentMask) this.fu1();
            else this.Vd9()
        },
        hideMask: function() {
            Sigma.U.removeClass(this.gridMask, "gt-grid-mask-show");
            Sigma.U.removeClass(this.gridMask, "gt-grid-mask-show-trp");
            if (this.gridMask) {
                this.gridMask.style.cursor = "auto";
                this.gridMask.style.display = "none"
            }
        },
        showWaiting: function() {
            this.showMask();
            if (!this.transparentMask) this.gridWaiting.style.display = "block";
            this.isWaiting = true
        },
        hideWaiting: function() {
            this.gridWaiting.style.display = "none";
            this.hideMask();
            this.isWaiting = false
        },
        showDialog: function($) {
            var A = this;
            switch ($) {
                case "filter":
                    A.filterDialog = A.filterDialog || Sigma.qp8({
                        title: A.getMsg("DIAG_TITLE_FILTER"),
                        gridId: A.id
                    });
                    A.filterDialog.show();
                    break;
                case "chart":
                    var E = A.activeCell ? A.getRecordByRow(A.activeRow) : A.getRecord();
                    if (!E) break;
                    var D = [],
                C = "",
                B = 300,
                _ = 300;
                    if (E) {
                        A.charDialog = A.charDialog || new Sigma.Dialog({
                            gridId: A.id,
                            container: A.gridMask,
                            id: "charDialog",
                            width: B,
                            height: _,
                            autoRerender: true,
                            title: A.getMsg("DIAG_TITLE_CHART")
                        });
                        A.charDialog.show();
                        A.chart = new Sigma.Chart({
                            swfPath: A.SigmaGridPath + "/flashchart/fusioncharts/charts/",
                            width: B - 3,
                            height: _ - 23,
                            container: A.charDialog.bodyDiv
                        });
                        Sigma.$each(A.columnList, function(_, $) {
                            if (_.chartCaption) C = _.chartCaption.replace("{@}", E[_.fieldIndex]);
                            if (_.inChart) D.push([_.header || _.title, E[_.fieldIndex], _.chartColor || "66bbff"])
                        });
                        A.chart.caption = A.chartCaption;
                        A.chart.subCaption = C;
                        A.chart.data = D;
                        A.chart.NR7()
                    }
                    break
            }
        },
        closeDialog: function() {
            this.activeDialog && this.activeDialog.close();
            this.activeDialog = null
        },
        hideDialog: function() {
            this.activeDialog && this.activeDialog.hide();
            this.activeDialog = null
        },
        closeGridMenu: function() {
            if (this.gridMenuButton) this.gridMenuButton.vy0()
        },
        rt0: function() {
            return this.filterInfo || []
        },
        AP1: function() {
            return this.sortInfo || []
        },
        getPageInfo: function($) {
            return $ ? this.navigator.Ln4() : this.navigator.pageInfo
        },
        setPageInfo: function($) {
            Sigma.$extend(this.getPageInfo(), $)
        },
        setTotalRowNum: function($) {
            this.getPageInfo().totalRowNum = $
        },
        getTotalRowNum: function($) {
            return this.getPageInfo($).totalRowNum
        },
        addSkin: function($) {
            if (Sigma.$type($, "string")) $ = {
                text: this.getMsg("STYLE_NAME_" + $.toUpperCase()),
                value: $.toLowerCase()
            };
            this.skinList.push($)
        },
        GR5: function(_) {
            for (var $ = 0; $ < _.length; $++) this.gridRowList.push(_[$])
        },
        lu3: function() {
            return this.gridTbodyList[0] ? this.gridTbodyList[0].rows[0] : null
        },
        yg8: function() {
            return this.gridTbodyList[0].rows
        },
        Qa9: function($) {
            return this.yg8()[$]
        },
        getRowNumber: function() {
            return grid.rowNum
        },
        hasData: function() {
            return grid.rowNum > 0
        },
        getColumnValue: function(A, B) {
            var C = this.getColumn(A),
            $ = this.getRecord(B),
            _ = $ ? $[C.fieldIndex] : null;
            return _
        },
        setColumnValue: function(A, $, B) {
            var _ = $;
            if (Sigma.$type(_, "number")) _ = this.dataset.getRecord(_);
            this.update(_, this.columnMap[A].fieldName, B)
        },
        dirty: function($) {
            Sigma.U.addClass($, "gt-cell-updated")
        },
        selectFirstRow: function() {
            var $ = this.Qa9(0);
            if ($) this.selectRow($)
        },
        selectRow: function($) {
            var A = $.rowIndex;
            if (this.isEmptyRow($)) return;
            var _ = this.getRecordByRow($);
            if (Sigma.$invoke(this, "beforeSelectRow", [_, $, A, this]) !== false) {
                Sigma.U.addClass($, "gt-row-selected");
                this.eU8($);
                this.selectedRows.push($);
                this.activeRow = $;
                Sigma.$invoke(this, "afterSelectRow", [_, $, A, this])
            }
        },
        unselectRow: function($) {
            if ($) {
                Sigma.U.removeClass($, "gt-row-selected");
                this.eU8($);
                Sigma.U.remove(this.selectedRows, $)
            }
        },
        unselectAllRow: function() {
            var $ = this;
            Sigma.$each(this.selectedRows, function(_) {
                Sigma.U.removeClass(_, "gt-row-selected");
                $.eU8(_)
            });
            this.selectedRows = [];
            this.activeRow = null
        },
        getSelectedRecords: function() {
            var $ = [];
            for (var _ = 0; _ < this.selectedRows.length; _++) $.push(this.getRecordByRow(this.selectedRows[_]));
            return $
        },
        getSelectedRecord: function() {
            return this.getRecordByRow(this.selectedRows[this.selectedRows.length - 1]) || this.activeRecord
        },
        yt2: function(D, C) {
            var B = this.xt2();
            C = C || [Sigma.T_G.bodyTableStart(this.id, false), B, "<tbody>"];
            var A = 0,
            $ = this.dataset.getSize(),
            _ = D ? this.getPageInfo().pageSize : -1;
            C.push(this.qP3(A, $, _, C, null, true));
            return C.join("")
        },
        xt2: function() {
            var A = this.headTable.innerHTML,
            _ = A.toLowerCase().indexOf("<tr"),
            $ = A.toLowerCase().lastIndexOf("</tr>");
            if (this.customHead) _ = A.toLowerCase().indexOf("<tr", _ + 3);
            A = A.substring(_, $ + "</tr>".length);
            return "<!-- gt : head start  -->" + A + "<!-- gt : head end  -->"
        },
        qP3: function(L, A, F, I, D, _) {
            var H = this,
            B = H.colNum,
            G = H.getGroupInfo(L, A),
            E = " >",
            K = lastRecord = null,
            J = 0,
            $ = "";
            for (var C = L; C < A; C++) {
                K = H.dataset.getRecord(C);
                if (!K) break;
                var N = Sigma.T_G.rowStartS(H, C);
                if (!_) {
                    $ = H.rowKey + H.getUniqueField(K);
                    K[Sigma.Const.DataSet.ROW_KEY] = $;
                    H.currentRowNum++;
                    if (H.showIndexColumn) D.push(H.Cg8(N + E, K, C, B))
                } else if (C > 0 && F > 0 && (C % F) == 0) I.push("\n<!-- gt : page separator  -->\n");
                if (H.isNextGroup(K, lastRecord, C)) I.push(H.Ph1(N + E, K, C, B));
                var M = G[J++];
                I.push(H.mg8(N + " id=\"" + $ + "\"" + E, K, C, B, M));
                lastRecord = K
            }
            I.push(Sigma.T_G.tableEndHTML)
        },
        Ie8: function($) {
            var B = this,
            A = [];
            Sigma.$each(B.columnList, function(B, _) {
                if (B.hidden === true || ($ && B[$] === false)) {
                    A.push(B.CLASS_PREFIX + B.styleClass + " { display:none;width:0px; }");
                    A.push(B.CLASS_PREFIX + B.innerStyleClass + " { display:none;width:0px; }")
                }
            });
            var _ = A.join("\n");
            return Sigma.U.replaceAll(_, ".gt-grid ", "")
        },
        printGrid: function() {
            var A = this;
            A.closeGridMenu();
            A.showWaiting();
            if (!A.printCssText) {
                var _ = [" body { margin :5px;padding:0px;}", ".gt-table { width:100%;border-left:1px solid #000000 ; border-top:1px solid #000000; }", ".gt-table TD { font-size:12px;padding:2px; border-right:1px solid #000000 ; border-bottom:1px solid #000000; }", ".gt-hd-row TD { padding:3px; border-bottom:2px solid #000000 ;background-color:#e3e3e3; white-space:nowrap;word-break:keep-all;word-wrap:normal; }", ".gt-hd-hidden { }", ".gt-row-even {\tbackground-color:#f6f6f6; }"];
                _.push(this.Ie8("printable"));
                A.customPrintCss && _.push(A.customPrintCss);
                A.printCssText = _.join("\n")
            }
            var $ = A.yt2(),
            E = Sigma.doc.activeElement;

            function B(_) {
                _.writeln("<style>");
                _.writeln(A.printCssText);
                _.writeln("</style>");
                _.writeln($);
                _.close()
            }
            if (Sigma.isIE || Sigma.isGecko || Sigma.isSafari) {
                var C = A.gridIFrame.contentWindow.document;
                B(C);
                A.gridIFrame.contentWindow.focus();
                A.gridIFrame.contentWindow.print()
            } else if (Sigma.isOpera) {
                var D = window.open(""),
                C = D.document;
                B(C);
                D.focus();
                Sigma.$thread(function() {
                    D.print();
                    Sigma.$thread(function() {
                        D.close()
                    }, 2000)
                })
            }
            Sigma.$thread(function() {
                A.hideWaiting()
            }, 1000)
        }
    };
    Sigma.Grid = Sigma.$class(Sigma.GridDefault);
    Sigma.$extend(Sigma.Grid, {
        filterHandler: {
            hide: function($, _) {
                _ = _ || $.filterInfo;
                var A = Sigma.Grid.filterCheck[checkType](value, cv);
                if (A);
            }
        },
        isSelectedRow: function($) {
            return Sigma.U.hasClass($, "gt-row-selected")
        },
        qi0: function(_, A, $) {
            _ = _ || window.evt;
            $ = $ || Sigma.U.hN2("tr", null, _);
            if (!$ || Sigma.U.hasClass($.cells[0], "gt-nodata-cell")) return;
            _ = _ || {};
            if (Sigma.Grid.isSelectedRow($)) {
                if (A.multiSelect && !_.ctrlKey && A.selectedRows.length > 1) {
                    A.unselectAllRow();
                    A.selectRow($)
                } else A.unselectRow($)
            } else {
                if (!A.multiSelect || !_.ctrlKey) A.unselectAllRow();
                A.selectRow($)
            }
            return $
        },
        vn9: function(_, A, $) {
            if (!$ || A.overRow == $) {
                A.TF8 = false;
                return
            }
            A.TF8 = true;
            if (A.overRow) A.overRow.className = A.overRow.className.replace(" gt-row-over", "");
            $.className += " gt-row-over";
            A.overRow = $;
            A.TF8 = false;
            return $
        },
        ql8: function($, _) {
            $ = $ || window.event;
            row = Sigma.U.hN2("tr", null, $);
            if (_.isEmptyRow(row)) return;
            Sigma.Grid.vn9($, _, row)
        },
        Or1: function(_, $) {
            _ = _ || window.event;
            row = Sigma.U.hN2("tr", null, _);
            if ($.isEmptyRow(row)) return;
            if (row) {
                var A = $.Qa9(row.rowIndex);
                Sigma.Grid.vn9(_, $, A);
                $.overRowF = row
            }
        },
        rt1: function(A, B) {
            A = A || window.event;
            B = Sigma.$grid(B);
            B.closeGridMenu();
            B.Gi8 = true;
            B.resizeButton.style.cursor = B.gridGhost.style.cursor = "se-resize";
            B.NB3();
            B.gridGhost.style.top = B.top + Sigma.doc.body.scrollTop + "px";
            B.gridGhost.style.left = B.left + Sigma.doc.body.scrollLeft + "px";
            var $ = B.gridDiv.offsetWidth,
            _ = B.gridDiv.offsetHeight;
            B.gridGhost.cx = A.clientX - $;
            B.gridGhost.cy = A.clientY - _;
            B.gridGhost.style.width = $ + "px";
            B.gridGhost.style.height = _ + "px";
            B.gridGhost.style.display = "block"
        },
        rm1: function(B, A) {
            var $ = Sigma.U.parseInt(A.gridGhost.style.width) + "px",
            _ = Sigma.U.parseInt(A.gridGhost.style.height) + "px";
            A.gridGhost.style.cursor = "auto";
            A.gridMask.style.display = A.gridGhost.style.display = "none";
            A.Gi8 = false;
            A.setSize($, _)
        },
        ku7: function(B, A) {
            B = B || window.event;
            if (A.resizable === false) return;
            var _ = A.grid;
            _.mouseDown = true;
            if (B.ctrlKey) return;
            _.Di1 = true;
            _.closeGridMenu();
            _.showMask(true);
            _.headDiv.style.cursor = _.gridMask.style.cursor = "col-resize";
            _.Cu8 = A.id;
            var $ = Sigma.U.getPageX(B);
            A.hf1 = $ - _.Ue3[0];
            _.od3 = A.hf1 + A.minWidth - A.headCell.offsetWidth;
            _.separateLine.style.left = A.hf1 + "px";
            _.separateLine.style.height = _.viewport.offsetHeight - 2 + "px";
            _.separateLine.style.display = "block";
            _.columnMoveS.style.left = A.headCell.offsetLeft + ((Sigma.isFF2 || Sigma.isFF1) ? 0 : _.Ps7) + "px";
            _.columnMoveS.style.display = "block"
        },
        Kd1: function(_, B) {
            _ = _ || window.event;
            var C = B.grid;
            C.mouseDown = true;
            if (!_.ctrlKey || C.frozenColumnList[B.getColumnNo()]) return;
            C.closeGridMenu();
            var A = Sigma.U.getPageX(_),
            $ = B.headCell.offsetLeft;
            C.columnMoveS.setAttribute("newColIndex", null);
            var D = C.headerGhost;
            D.setAttribute("colIndex", B.getColumnNo());
            D.setAttribute("offsetX2", $ - A);
            D.style.left = $ + ((Sigma.isFF2 || Sigma.isFF1) ? 0 : C.Ps7) + "px";
            D.style.width = B.headCell.offsetWidth - 1 + "px";
            D.style.display = "block";
            D.innerHTML = "<span style=\"padding-left:2px;\" >" + Sigma.$getText(B.headCell) + "</span>"
        },
        YK3: function(F, B) {
            F = F || window.event;
            var A = Sigma.U.getPageX(F);
            if (B.separateLine.style.display == "block") {
                var _ = A - B.Ue3[0];
                _ = _ > B.od3 ? _ : B.od3;
                B.separateLine.style.left = _ + "px"
            } else if (!B.customHead && B.headerGhost.style.display == "block") {
                var H = A - B.Ue3[0] + B.headDiv.scrollLeft;
                B.headerGhost.style.left = A + ((Sigma.isFF2 || Sigma.isFF1) ? 0 : B.Ps7) + B.headerGhost.getAttribute("offsetX2") / 1 + "px";
                var G = -1,
                C = -1;
                for (var I = 0; I < B.headFirstRow.cells.length; I++) {
                    var E = B.headFirstRow.cells[I];
                    if (H > E.offsetLeft && H < E.offsetLeft + E.offsetWidth) {
                        G = E.offsetLeft;
                        C = I;
                        break
                    }
                }
                if (H <= E.offsetLeft) I = 0;
                if (G >= 0) {
                    B.columnMoveS.style.left = G + ((Sigma.isFF2 || Sigma.isFF1) ? 0 : B.Ps7) + "px";
                    B.columnMoveS.style.display = "block"
                } else B.columnMoveS.style.display = "none";
                B.columnMoveS.setAttribute("newColIndex", C)
            } else if (B.Gi8) {
                var $ = F.clientX - B.gridGhost.cx,
                D = F.clientY - B.gridGhost.cy;
                $ = $ < B.minWidth ? B.minWidth : $;
                D = D < B.minHeight ? B.minHeight : D;
                B.gridGhost.style.width = $ + "px";
                B.gridGhost.style.height = D + "px"
            }
        },
        ga9: function(C, _) {
            C = C || window.event;
            _ = Sigma.$grid(_);
            var $ = Sigma.U.getPageX(C);
            _.mouseDown = false;
            if (_.separateLine.style.display == "block") {
                var E = _.columnMap[_.Cu8];
                E.he3 = $ - _.Ue3[0];
                var F = E.he3 - E.hf1,
                D = F + parseInt(E.width);
                E.setWidth(D);
                _.Cu8 = -1;
                _.separateLine.style.display = _.columnMoveS.style.display = "none";
                _.headDiv.style.cursor = "auto";
                _.hideMask();
                _.syncScroll();
                if (!Sigma.isOpera) _.Di1 = false;
                Sigma.$invoke(_, "afterColumnResize", [E, D, _])
            } else if (!_.customHead && _.headerGhost.style.display == "block") {
                var A = Sigma.isIE ? C.x : C.pageX,
                B = _.columnMoveS.getAttribute("newColIndex"),
                G = _.headerGhost.getAttribute("colIndex");
                if (B !== null && (B + "").length > 0 && G !== null && (G + "").length > 0) {
                    B = B / 1;
                    if (B < 0) B = _.columnList.length;
                    Sigma.Grid.Li9(_.id, G / 1, B / 1);
                    _.syncScroll()
                }
                _.columnMoveS.style.display = "none";
                _.columnMoveS.setAttribute("newColIndex", null);
                _.headerGhost.style.display = "none";
                _.headerGhost.setAttribute("colIndex", null);
                _.headerGhost.style.cursor = "auto"
            } else if (_.Gi8) Sigma.Grid.rm1(C, _)
        },
        qa7: function(B, A) {
            B = Sigma.$grid(B);
            var $ = B.gridDiv.className.split(" ");
            for (var _ = 0; _ < $.length; _++) if ($[_].indexOf(Sigma.Const.Grid.SKIN_CLASSNAME_PREFIX) === 0) $[_] = "";
            $.push(Sigma.Const.Grid.SKIN_CLASSNAME_PREFIX + A);
            B.gridDiv.className = $.join(" ")
        },
        getAllRows: function($) {
            $ = Sigma.$grid($);
            if ($.gridRowList.length == 0) Sigma.$each($.gridTbodyList, function(_) {
                $.GR5(_.rows)
            });
            return $.gridRowList
        },
        getAllFreezeRows: function(_) {
            _ = Sigma.$grid(_);
            if (_.gridFreezeRowList.length == 0) {
                var $ = _.freezeBodyTable.tBodies[0].rows;
                for (var A = 0; A < $.length; A++) _.gridFreezeRowList.push($[A])
            }
            return _.gridFreezeRowList
        },
        pN2: function(E, _) {
            var D = _.id;
            E = Sigma.$grid(E);
            var C = E.id,
            $ = _.checkValid,
            F = _.checkValue,
            A = _.checkType || "checkbox";
            if (!F) F = Sigma.$chk(_.fieldIndex) ? "grid.getColumnValue(\"" + F + "\",record);" : "grid.getUniqueField(record);";
            if (typeof F == "string") F = new Function("value", "record", "col", "grid", "colNo", "rowNo", ["return ", F].join(""));
            if (!$) $ = function(C, D, A, B, E, _, $) {
                return E.checkedRows[C]
            };
            _.header = "";
            _.title = _.title || E.getMsg("CHECK_ALL");
            _.width = 30;
            _.resizable = false;
            _.printable = false;
            _.sortable = false;
            var B = "gt_" + C + "_chk_" + D;
            _.hdRenderer = function(_, C, $) {
                return "<input type=\"" + A + "\" class=\"gt-f-totalcheck\" name=\"" + B + "\" />"
            };
            _.renderer = function(C, G, E, D, J, H) {
                var _ = F(C, G, E, D, J, H),
                I = $(_, C, G, E, D, J, H) ? "checked=\"checked\"" : "";
                return "<input type=\"" + A + "\" class=\"gt-f-check\" value=\"" + _ + "\" " + I + " name=\"" + B + "\" />"
            };
            return _
        }
    });
    Sigma.Grid.prototype.initGrid = Sigma.Grid.prototype.render;
    Sigma.$extend(Sigma.Grid, {
        render: function($) {
            $ = Sigma.$grid($);
            return function() {
                $.render()
            }
        },
        ys4: function(B, A, C, _) {
            C = C || A.headCell;
            if (!C) return;
            _ = _ || Sigma.Grid.cl7(A, C);
            var D = Sigma.U.nextElement(_),
            $ = Sigma.U.nextElement(D);
            A.sortIcon = A.sortIcon || _;
            A.hdTool = A.sortIcon || Sigma.Grid.getHdTool(A, C);
            A.menuButton = A.menuButton || D;
            A.separator = A.separator || $;
            if (A.separator && A.resizable === false) A.separator.style.display = "none";
            Sigma.U.addEvent(C, "mousedown", function($) {
                B.ac8();
                if (B.so6() === false) return;
                B.closeGridMenu();
                if (!B.customHead) {
                    Sigma.U.stopEvent($);
                    Sigma.Grid.Kd1($, A)
                }
            });
            Sigma.U.addEvent(C, "click", function(D) {
                var $ = Sigma.U.getEventTarget(D);
                if (!B.Di1) {
                    Sigma.$invoke(B, "onClickHead", [D, C, A, B]);
                    if (Sigma.U.getTagName($) == "INPUT" && $.type == "checkbox" && Sigma.U.hasClass($, "gt-f-totalcheck")) Sigma.xe4($, B, A);
                    else if (A.sortable && $.className != "gt-hd-button") {
                        B.lastAction = "sort";
                        B.sorting = true;
                        var E = A.sortOrder == "asc" ? "desc" : (A.sortOrder == "desc" ? "defaultsort" : "asc"),
                        _ = B.hf3(A);
                        _.sortOrder = E;
                        B.addSortInfo(_);
                        Sigma.$thread(function() {
                            B.Bn1()
                        })
                    }
                }
                if (Sigma.isOpera) B.Di1 = false
            });
            if (A.resizable) {
                $.colID = A.id;
                $.style.cursor = "col-resize";
                Sigma.U.addEvent($, "mousedown", function($) {
                    B.ac8();
                    Sigma.U.stopEvent($);
                    Sigma.Grid.ku7($, A)
                })
            }
            if (!A.sortable && !A.resizable && A.hdTool) A.hdTool.style.display = "none"
        },
        Li9: function(E, G, B, C) {
            if (G == B) return;
            E = Sigma.$grid(E);
            var D = false,
            A = E.columnList.length,
            F = C !== true && E.freezeHeadDiv.style.display == "block" ? E.frozenColumnList.length : 0;
            B = B < F ? F : B;
            if (B >= A) {
                B = A - 1;
                B ^= G;
                G ^= B;
                B ^= G;
                D = true
            }
            var _ = Sigma.Grid.getAllRows(E);
            Sigma.U.insertNodeBefore(E.columnList[G].headCell, E.columnList[B].headCell);
            for (var $ = 0; $ < _.length; $++) Sigma.U.insertNodeBefore(_[$].cells[G], _[$].cells[B]);
            Sigma.U.moveItem(E.columnList, G, B);
            for ($ = 0; $ < A; $++) E.columnList[$].colIndex = $
        },
        getHdTool: function(_, A) {
            var $ = Sigma.U.firstChildElement(A || _.headCell);
            return Sigma.U.np8($)
        },
        cl7: function($, _) {
            oc9 = Sigma.Grid.getHdTool($, _);
            return Sigma.U.firstChildElement(oc9)
        },
        mappingRenderer: function(_, $) {
            return function(A) {
                return _[A] || ($ === undefined || $ === null ? A : $)
            }
        },
        findGridByElement: function(A) {
            var B = "DIV",
            $ = "gt-grid",
            _ = "";
            while ((A = A.parentNode)) if (Sigma.U.getTagName(A) == B && Sigma.U.hasClass(A, $)) {
                _ = A.id;
                break
            }
            if (_.indexOf("_div") === _.length - 4) _ = _.substring(0, _.length - 4);
            return Sigma.$grid(_)
        }
    });
    var Ext = Ext || null;
    (Ext && Ext.reg) && (Ext.reg("gtgrid", Sigma.Grid));
    Sigma.CL8 = function(D, C, B) {
        C = Sigma.$grid(C);
        D = Sigma.$(D);
        if (D.checked == B) return B;
        var A = Sigma.U.hN2("td", D),
        $ = A.parentNode,
        _ = C.Ox5($)[0];
        if (B === true || B === false) D.checked = B;
        if (D.checked) {
            C.checkedRows[D.value] = true;
            if (C.selectRowByCheck) C.selectRow(_)
        } else {
            delete C.checkedRows[D.value];
            if (C.selectRowByCheck) C.unselectRow(_)
        }
        return !!D.checked
    };
    Sigma.xe4 = function(G, I, B, H) {
        I = Sigma.$grid(I);
        G = Sigma.$(G);
        if (H !== null && H !== undefined) G.checked = H;
        var K = Sigma.U.hN2("td", G),
        D = Sigma.U.getCellIndex(K),
        J = G.checked,
        _ = B.frozen ? Sigma.Grid.getAllFreezeRows(I) : Sigma.Grid.getAllRows(I);
        for (var A = 0, F = _.length; A < F; A++) {
            var $ = _[A],
            E = $.cells[D];
            if (E) {
                var C = E.getElementsByTagName("input")[0];
                Sigma.CL8(C, I, J)
            }
        }
    };
    Sigma.ColumnDefault = {
        CLASS_PREFIX: ".",
        id: 0,
        fieldName: null,
        width: 120,
        minWidth: 45,
        header: null,
        styleClass: null,
        align: "left",
        headAlign: "left",
        emptyText: "",
        sortable: true,
        resizable: true,
        moveable: true,
        editable: true,
        hideable: true,
        frozenable: true,
        groupable: true,
        filterable: true,
        printable: true,
        exportable: true,
        sortOrder: null,
        hidden: false,
        frozen: false,
        toolTip: false,
        beforEdit: null,
        afterEdit: null,
        renderer: function(_, B, D, A, $, C) {
            return _ !== null && _ !== undefined ? _ : D.emptyText
        },
        hdRenderer: function(_, $) {
            return _
        },
        editor: null,
        filterField: null,
        fieldIndex: 0,
        gridId: null,
        newValue: null,
        cellAttributes: "",
        getSortValue: null,
        sortFn: null,
        format: null,
        syncRefresh: true,
        expression: null,
        isExpend: false,
        Or8: function($, A) {
            var _ = this;
            if (Sigma.$type($, "string")) this.id = $;
            else Sigma.$extend(this, $);
            this.id = this.id || encodeURIComponent(this.header);
            this.header = this.header || this.id;
            this.fieldName = this.fieldName || this.fieldIndex || this.id;
            this.fieldIndex = this.fieldIndex || this.fieldName || this.id;
            this.CLASS_PREFIX = ".gt-grid " + this.CLASS_PREFIX
        },
        getColumnNo: function() {
            return this.colIndex
        },
        setWidth: function($) {
            var _ = this.grid;
            $ = $ < this.minWidth ? this.minWidth : $;
            this.width = $ + "px";
            Sigma.U.CSS.updateRule(this.CLASS_PREFIX + this.styleClass, "width", ($ + _.Im0) + "px");
            Sigma.U.CSS.updateRule(this.CLASS_PREFIX + this.innerStyleClass, "width", ($ + _.uq9) + "px")
        },
        setHeader: function(A) {
            this.header = A;
            var _ = this.headCell.getElementsByTagName("div")[0];
            if (_) {
                var $ = _.getElementsByTagName("span")[0] || _;
                $.innerHTML = A
            }
        },
        hide: function() {
            if (this.frozen) return false;
            Sigma.U.CSS.updateRule(this.CLASS_PREFIX + this.styleClass, "display", "none");
            this.hidden = true
        },
        show: function() {
            if (this.frozen) return false;
            Sigma.U.CSS.updateRule(this.CLASS_PREFIX + this.styleClass, "display", "");
            this.hidden = false
        },
        toggle: function() {
            return this.hidden ? this.show() : this.hide()
        },
        group: function($, _) {
            this.grouped = true;
            this.grid.refresh()
        },
        ungroup: function($, _) {
            this.grouped = false;
            this.grid.refresh()
        },
        iC3: function(A, $, E, F, B, D, C, G) {
            if (!C.aT4) {
                E = A.cloneNode(false);
                E.id = "";
                E.appendChild(D.cloneNode(true));
                $.appendChild(E)
            }
            var _ = A.cells[B].cloneNode(true);
            E.appendChild(_);
            if (G && F === 0) {
                this.frozenHeadCell = _;
                this.frozenSortIcon = Sigma.Grid.cl7(this, this.frozenHeadCell);
                if (!Sigma.isIE) Sigma.Grid.ys4(C, this, this.frozenHeadCell, this.frozenSortIcon)
            }
        },
        freeze: function(E) {
            var C = this.grid,
            B = this.getColumnNo();
            if (!E && B < C.frozenColumnList.length) return false;
            var A = C.headTable.tBodies[0].rows,
            G = C.freezeHeadTable.tBodies[0].rows,
            D, $, F = 10;
            if (!C.aT4) {
                D = Sigma.T_G.Pn3(C, F, null);
                $ = Sigma.T_G.freezeBodyCell(C, F, null)
            }
            for (var _ = 0; _ < A.length; _++) this.iC3(A[_], C.freezeHeadTable.tBodies[0], G[_], _, B, D, C, true);
            if (C.rowNum < 1);
            C.VG7 = false;
            if (C.overRow) C.overRow.className = C.overRow.className.replace(" gt-row-over", "");
            A = Sigma.Grid.getAllRows(C);
            G = C.freezeBodyTable.tBodies[0].rows;
            for (_ = 0; _ < A.length; _++) this.iC3(A[_], C.freezeBodyTable.tBodies[0], G[_], _, B, $, C);
            if (!E) {
                Sigma.Grid.Li9(C, B, C.frozenColumnList.length);
                C.frozenColumnList.push(this.id)
            }
            this.frozen = true;
            C.freezeHeadDiv.style.display = C.freezeBodyDiv.style.display = "block";
            C.freezeHeadDiv.style.height = C.headDiv.offsetHeight + "px";
            C.freezeBodyDiv.style.height = C.bodyDiv.clientHeight + "px";
            if (!C.aT4) C.freezeHeadDiv.style.left = C.freezeBodyDiv.style.left = 0 - (F + C.Im0) + C.freezeFixW + "px";
            C.aT4 = true;
            C.syncScroll()
        },
        Ee7: function($, C) {
            for (var B = 0; B < $.length; B++) {
                var A = $[B],
                _ = $[B].cells[C];
                if (_) A.removeChild(_)
            }
        },
        unfreeze: function() {
            var A = this.grid,
            $ = this.getColumnNo();
            if (!A.frozenColumnList || $ >= A.frozenColumnList.length) return false;
            Sigma.Grid.Li9(A, $, A.frozenColumnList.length - 1);
            A.frozenColumnList.splice($, 1);
            var _ = A.freezeHeadTable.tBodies[0].rows;
            this.Ee7(_, $ + 1);
            this.frozenHeadCell = null;
            if (A.rowNum < 1);
            _ = A.freezeBodyTable.tBodies[0].rows;
            this.Ee7(_, $ + 1);
            this.frozen = false;
            if (A.frozenColumnList.length < 1) if (!A.showIndexColumn) A.freezeHeadDiv.style.display = A.freezeBodyDiv.style.display = "none";
            A.syncScroll()
        }
    };
    Sigma.Column = Sigma.$class(Sigma.ColumnDefault);
    Sigma.Navigator = Sigma.$class({
        nT9: function() {
            return {
                pageInfo: {
                    pageSize: 20,
                    pageNum: 1,
                    totalRowNum: 0,
                    totalPageNum: 1,
                    startRowNum: 0,
                    endRowNum: 0
                }
            }
        },
        inited: false,
        Or8: function(_) {
            var $ = _.pageInfo || {};
            delete _.pageInfo;
            Sigma.$extend(this, _);
            Sigma.$extend(this.pageInfo, $)
        },
        pp0: function() {
            var $ = Sigma.$grid(this.gridId);
            this.firstPageButton = new Sigma.Button({
                container: $.toolBar,
                cls: "gt-first-page",
                onclick: this.Bl0,
                onclickArgs: [this]
            });
            this.prevPageButton = new Sigma.Button({
                container: $.toolBar,
                cls: "gt-prev-page",
                onclick: this.Fx3,
                onclickArgs: [this]
            });
            this.nextPageButton = new Sigma.Button({
                container: $.toolBar,
                cls: "gt-next-page",
                onclick: this.Sh1,
                onclickArgs: [this]
            });
            this.ET7 = new Sigma.Button({
                container: $.toolBar,
                cls: "gt-last-page",
                onclick: this.re2,
                onclickArgs: [this]
            });
            this.inited = true;
            if (!$.loading) this.Ln4()
        },
        createGotoPage: function() {
            var A = Sigma.$grid(this.gridId);
            this.gotoPageButton = new Sigma.Button({
                container: A.toolBar,
                cls: "gt-goto-page",
                onclick: this.gB0,
                onclickArgs: [this],
                text: A.getMsg("GOTOPAGE_BUTTON_TEXT")
            });
            if (A.toolBar) {
                var B, $;
                this.pageInput = Sigma.$e("input", {
                    type: "text",
                    className: "gt-page-input"
                });
                var _ = this;
                Sigma.U.addEvent(this.pageInput, "keydown", function(A) {
                    var $ = A.keyCode;
                    if ($ == Sigma.Const.Key.ENTER) {
                        Sigma.U.stopEvent(A);
                        _.gB0(A, _)
                    }
                });
                B = Sigma.$e("div", {
                    innerHTML: A.getMsg("PAGE_BEFORE"),
                    className: "gt-toolbar-text"
                }), $ = Sigma.$e("div", {
                    innerHTML: A.getMsg("PAGE_AFTER"),
                    className: "gt-toolbar-text"
                });
                A.toolBar.appendChild(B);
                A.toolBar.appendChild(Sigma.Button.pd1(this.pageInput));
                A.toolBar.appendChild($)
            }
        },
        Ln4: function(A, _) {
            var $ = this.pageInfo = A || this.pageInfo;
            if (_ !== false) {
                if ($.totalRowNum < 1) {
                    var B = Sigma.$grid(this.gridId);
                    $.totalRowNum = B.dataset.getSize()
                }
                $.totalPageNum = Math.ceil($.totalRowNum / $.pageSize);
                $.pageNum = $.pageNum > $.totalPageNum ? $.totalPageNum : $.pageNum;
                $.pageNum = $.pageNum < 1 ? 1 : $.pageNum;
                $.startRowNum = ($.pageNum - 1) * $.pageSize + 1;
                $.startRowNum = isNaN($.startRowNum) ? 1 : $.startRowNum;
                $.endRowNum = $.startRowNum / 1 + $.pageSize / 1 - 1;
                $.endRowNum = $.endRowNum > $.totalRowNum ? $.totalRowNum : $.endRowNum
            }
            return $
        },
        YY1: function(_) {
            var $ = this.pageInfo = _ || this.pageInfo,
            A = Sigma.$grid(this.gridId);
            if (this.inited) {
                if (this.pageInput) {
                    this.pageInput.value = $.pageNum;
                    this.pageInput.maxLength = ("" + $.totalPageNum).length
                }
                if ($.pageNum == 1) {
                    this.firstPageButton.disable();
                    this.prevPageButton.disable()
                } else {
                    this.firstPageButton.enable();
                    this.prevPageButton.enable()
                }
                if ($.pageNum == $.totalPageNum) {
                    this.nextPageButton.disable();
                    this.ET7.disable()
                } else {
                    this.nextPageButton.enable();
                    this.ET7.enable()
                }
            }
            if (A && A.pageSizeSelect) {
                A.pageSizeList = !A.pageSizeList || A.pageSizeList.length < 1 ? [A.pageSize] : A.pageSizeList;
                A.pageSizeSelect.innerHTML = "";
                Sigma.U.createSelect(Sigma.U.listToMap(A.pageSizeList), this.pageInfo.pageSize, {}, A.pageSizeSelect)
            }
        },
        Ip9: function($, B, A) {
            $ = $ || this;
            var _ = $.pageInfo.pageNum,
            C = Sigma.$grid($.gridId);
            B = (!B || B < 1) ? 1 : (B > $.pageInfo.totalPageNum ? $.pageInfo.totalPageNum : B);
            if (Sigma.$invoke(C, "beforeGotoPage", [B, _, $, C]) !== false) {
                C.lastAction = A;
                C.Ip9(B, _)
            }
        },
        gB0: function($, _) {
            _.Ip9(_, Sigma.U.parseInt(_.pageInput.value, _.pageInfo.pageNum), "Ip9")
        },
        Bl0: function($, _) {
            _.Ip9(_, 1, "firstPage")
        },
        Fx3: function($, _) {
            _.Ip9(_, _.pageInfo.pageNum - 1, "prevPage")
        },
        Sh1: function($, _) {
            _.Ip9(_, _.pageInfo.pageNum + 1, "nextPage")
        },
        re2: function($, _) {
            _.Ip9(_, _.pageInfo.totalPageNum, "lastPage")
        },
        refreshPage: function($, _) {
            _.Ip9(_, _.pageInfo.pageNum, "refreshPage")
        }
    });
    Sigma.BaseMenuItem = Sigma.$class({
        id: null,
        gridId: null,
        cls: null,
        type: null,
        onclickArgs: null,
        parentItem: null,
        reference: null,
        container: null,
        text: null,
        toolTip: null,
        itemBox: null,
        itemIcon: null,
        itemText: null,
        itemAfterIcon: null,
        subMenu: null,
        Or8: function($) {
            this.disabled = false;
            this.Cd2 = false;
            this.overShowSubMenu = true;
            this.onclick = Sigma.$empty;
            Sigma.$extend(this, $);
            this.toolTip = this.toolTip || this.text || ""
        },
        rV5: function(A, _) {
            Sigma.activeGrid && Sigma.activeGrid.so6();
            var $ = _.subMenu ? _.subMenu.hidden : false;
            if (_.parentItem) {
                (_.parentItem.Ue5) && _.parentItem.Ue5(A);
                if (_.parentItem.currenItem) Sigma.U.removeClass(_.parentItem.currenItem.itemBox, "gt-menu-activemenu");
                _.parentItem.currenItem = _;
                Sigma.U.addClass(_.itemBox, "gt-menu-activemenu")
            }
            if (_.disabled || _.onclick.apply(_, [A].concat(_.onclickArgs || _)) === false) {
                Sigma.U.stopEvent(A);
                return
            }
            Sigma.U.stopEvent(A);
            if (_.type == "checkbox") _.toggleCheck();
            else if (_.type == "radiobox") {
                var C = _.parentItem.itemList;
                for (var B = 0; B < C.length; B++) if (C[B].type == "radiobox" && C[B] != _) C[B].uncheckMe();
                _.tl6()
            }
            if (_.subMenu) if ($) _.YT6(A);
            else _.vy0(A)
        },
        Ue5: Sigma.$empty,
        tl6: function() {
            Sigma.U.removeClass(this.itemIcon, "gt-icon-unchecked");
            Sigma.U.addClass(this.itemIcon, "gt-icon-" + this.type);
            this.checked = true
        },
        uncheckMe: function() {
            Sigma.U.removeClass(this.itemIcon, "gt-icon-" + this.type);
            Sigma.U.addClass(this.itemIcon, "gt-icon-unchecked");
            this.checked = false
        },
        toggleCheck: function() {
            if (this.checked === true) this.uncheckMe();
            else this.tl6()
        },
        disable: function() {
            Sigma.U.addClass(this.itemBox, "gt-button-disable");
            this.disabled = true
        },
        enable: function() {
            Sigma.U.removeClass(this.itemBox, "gt-button-disable");
            this.disabled = false
        },
        Pg1: function() {
            if (this.subMenu) return this.subMenu.position;
            return null
        },
        Sq6: function($) {
            if (this.subMenu && $) this.subMenu.position = $
        },
        YT6: function($) {
            if (this.subMenu) {
                if (!this.Pg1()) this.Sq6("R");
                this.subMenu.show($)
            }
        },
        toggleMenu: function($) {
            if (this.subMenu) {
                if (!this.Pg1()) this.Sq6("R");
                this.subMenu.toggle($)
            }
        },
        vy0: function($) {
            var _ = this;
            while ((_ = _.subMenu)) _.close($)
        },
        lM7: function(_, $) {
            if (_) {
                if (!this.subMenu) {
                    this.subMenu = new Sigma.GridMenu({
                        gridId: this.gridId,
                        parentItem: this,
                        reference: this.itemBox
                    });
                    this.itemAfterIcon && Sigma.U.addClass(this.itemAfterIcon, "gt-menu-parent")
                }
                _.gridId = this.gridId;
                this.Sq6($);
                this.subMenu.lM7(_)
            }
            return this
        }
    });
    Sigma.Button = Sigma.BaseMenuItem.extend({
        Or8: function(_) {
            this.className = "gt-image-button";
            this.clickClassName = "gt-image-button-down";
            this.gu9(_);
            if (!this.container) return;
            this.itemBox = Sigma.$e("a", {
                href: "javascript:void(0);return false;",
                className: this.className,
                title: this.toolTip
            });
            this.itemIcon = Sigma.$e("div", {
                className: this.cls
            });
            this.itemBox.appendChild(this.itemIcon);
            this.container.appendChild(this.itemBox);
            if (this.Cd2) Sigma.Button.VP3(this.container);
            var $ = this;
            Sigma.U.addEvent($.itemBox, "mousedown", function(_) {
                if (!$.disabled) Sigma.U.addClass($.itemBox, $.clickClassName)
            });
            Sigma.U.addEvent($.itemBox, "mouseup", function(_) {
                if (!$.disabled) Sigma.U.removeClass($.itemBox, $.clickClassName)
            });
            Sigma.U.addEvent($.itemBox, "click", function(_) {
                $.rV5(_, $)
            });
            Sigma.U.addEvent($.itemBox, "dblclick", function(_) {
                $.rV5(_, $)
            })
        }
    });
    Sigma.$extend(Sigma.Button, {
        VP3: function(_) {
            var $ = Sigma.$e("div", {
                className: "gt-image-button gt-button-split"
            });
            if (_) _.appendChild($);
            return $
        },
        createCommonButton: function($, D, _, B, C, A) {
            return new Sigma.Button({
                id: $,
                container: C,
                cls: D,
                onclick: _,
                onclickArgs: B,
                Cd2: A
            })
        },
        pd1: function(_) {
            var $ = Sigma.$e("div", {
                className: "gt-toolbar-comp"
            });
            if (_) if (Sigma.$type(_, "string", "number")) $.innerHTML = _;
            else $.appendChild(_);
            return $
        }
    });
    Sigma.MenuItem = Sigma.BaseMenuItem.extend({
        Or8: function(_) {
            this.gu9(_);
            if (this.type == "checkbox" || this.type == "radiobox") this.cls = this.checked ? ("gt-icon-" + this.type) : "gt-icon-unchecked";
            this.itemBox = Sigma.$e("a", {
                href: "javascript:void(0);return false;",
                className: "gt-menuitem"
            });
            this.itemIcon = Sigma.$e("div", {
                className: "gt-menu-icon " + this.cls
            });
            this.itemText = Sigma.$e("div", {
                className: "gt-checkboxtext",
                innerHTML: this.text,
                title: this.toolTip
            });
            this.itemAfterIcon = Sigma.$e("div", {
                className: "gt-aftericon " + this.afterIconClassName
            });
            this.itemBox.appendChild(this.itemIcon);
            this.itemBox.appendChild(this.itemText);
            this.itemBox.appendChild(this.itemAfterIcon);
            var $ = this;
            Sigma.U.addEvent($.itemBox, "click", function(_) {
                $.rV5(_, $)
            })
        }
    });
    Sigma.$extend(Sigma.MenuItem, {
        VP3: function(_) {
            var $ = Sigma.$e("div", {
                className: "gt-image-button gt-button-split"
            });
            if (_) _.appendChild($);
            return $
        }
    });
    Sigma.GridMenu = Sigma.$class({
        gridId: null,
        parentItem: null,
        container: null,
        tz7: null,
        Ko4: null,
        Or8: function(_) {
            this.itemList = [];
            this.refreshOnShow = false;
            this.currenItem = null;
            this.hidden = true;
            this.className = "gt-popmenu";
            this.position = "";
            Sigma.$extend(this, _);
            this.menuBox = Sigma.$e("div", {
                className: this.className,
                style: {
                    display: "none",
                    left: "10px",
                    top: "10px"
                }
            });
            var $ = Sigma.$grid(this.gridId) || {};
            this.container = this.container || $.gridDiv || Sigma.doc.body;
            this.container.appendChild(this.menuBox)
        },
        refresh: function() { },
        onshow: function() { },
        pr0: function() { },
        lM7: function($) {
            $ = [].concat($);
            for (var _ = 0; _ < $.length; _++) if ($[_]) {
                $[_].gridId = this.gridId;
                $[_].parentItem = this;
                $[_].container = this.menuBox;
                this.itemList.push($[_]);
                this.menuBox.appendChild($[_].itemBox)
            }
            return this
        },
        show: function(A) {
            if (this.container && this.container.parentNode && this.container.parentNode.className.indexOf("menu") > 1);
            this.menuBox.style.display = "block";
            var _, B, $ = Sigma.U.getXY(this.reference, this.container);
            _ = $[0];
            B = $[1];
            this.tz7 = this.tz7 || 0;
            this.Ko4 = this.Ko4 || 0;
            switch (this.position.toUpperCase()) {
                case "L":
                    _ -= this.menuBox.offsetWidth;
                    break;
                case "T":
                    B -= this.menuBox.offsetHeight;
                    break;
                case "R":
                    _ += this.reference.offsetWidth;
                    break;
                case "B":
                    B += this.reference.offsetHeight;
                    break;
                case "LT":
                    _ -= this.menuBox.offsetWidth;
                    B -= this.menuBox.offsetHeight - this.reference.offsetHeight;
                    break;
                case "RT":
                    _ += this.reference.offsetWidth;
                    B -= this.menuBox.offsetHeight - this.reference.offsetHeight;
                    break;
                case "RB":
                    _ += this.reference.offsetWidth;
                    B += this.reference.offsetHeight;
                    break;
                case "LB":
                    _ -= this.reference.offsetWidth;
                    B += this.menuBox.offsetHeight;
                    break;
                case "M":
                    _ = A.pageX || (A.clientX - A.x);
                    B = A.pageY || (A.clientY - A.y);
                    break;
                default:
                    B += this.reference.offsetHeight
            }
            Sigma.U.setXY(this.menuBox, [_ + this.tz7, B + this.Ko4]);
            this.hidden = false
        },
        close: function($) {
            this.Ue5($);
            this.menuBox.style.display = "none";
            this.hidden = true
        },
        Ue5: function($) {
            for (var _ = 0; _ < this.itemList.length; _++) this.itemList[_].vy0($)
        },
        toggle: function($) {
            Sigma.U.stopEvent($);
            var _ = Sigma.$grid(this.gridId);
            if (this.hidden === true) this.show($);
            else this.close($)
        }
    });
    Sigma.ToolFactroy = {
        register: function(_, $) {
            Sigma.ToolFactroy.tools[_] = $
        },
        create: function($, _, E) {
            if (E == false) return false;
            $ = Sigma.$grid($);
            var C = $;
            if (_ == "info" || _ == "pagestate") _ = "state";
            var D = Sigma.ToolFactroy.tools[_];
            if (D && Sigma.$type(D, "function")) D = D($, _, E);
            else if (D) {
                var A = D.name || _,
                B = D.onclick || D.action;
                D = new Sigma.Button({
                    container: D.container || $.toolBar,
                    cls: D.cls || "gt-tool-" + A,
                    toolTip: D.toolTip || $.getMsg("TOOL_" + A.toUpperCase()),
                    onclick: function(_) {
                        B(_, $)
                    }
                })
            }
            return D
        },
        tools: {
            "goto": function($) {
                return $.navigator.createGotoPage()
            },
            "pagesize": function($) {
                var A = Sigma.U.createSelect({});
                A.className = "gt-pagesize-select";
                $.pageSizeSelect = A;

                function _(B) {
                    $.setPageInfo({
                        pageSize: A.value / 1
                    });
                    $.navigator.Bl0(B, $.navigator);
                    $.pageSizeSelect.blur();
                    try {
                        $.bodyDiv.focus()
                    } catch (_) { }
                }
                Sigma.U.addEvent($.pageSizeSelect, "change", _);
                text1 = Sigma.$e("div", {
                    innerHTML: $.getMsg("PAGESIZE_BEFORE"),
                    className: "gt-toolbar-text"
                });
                text2 = Sigma.$e("div", {
                    innerHTML: $.getMsg("PAGESIZE_AFTER"),
                    className: "gt-toolbar-text"
                });
                $.toolBar.appendChild(text1);
                $.toolBar.appendChild(Sigma.Button.pd1($.pageSizeSelect));
                $.toolBar.appendChild(text2);
                return A
            },
            "add": {
                onclick: function($, _) {
                    _.add()
                }
            },
            "del": {
                onclick: function($, _) {
                    _.del()
                }
            },
            "save": {
                onclick: function($, _) {
                    _.lastAction = "save";
                    _.save()
                }
            },
            "reload": {
                onclick: function($, _) {
                    _.lastAction = "reload";
                    _.reload()
                }
            },
            "print": {
                onclick: function($, _) {
                    _.lastAction = "print";
                    _.printGrid()
                }
            },
            "xls": {
                onclick: function($, _) {
                    _.lastAction = "export";
                    _.exportGrid("xls", "LinkSpace.xls", "LinkSpaceCRUDController.aspx?p=xls")
                }
            },
            "pdf": {
                onclick: function($, _) {
                    _.lastAction = "export";
                    _.exportGrid("pdf", "LinkSpace.pdf", "LinkSpaceCRUDController.aspx?p=pdf")
                }
            },
            "csv": {
                onclick: function($, _) {
                    _.lastAction = "export";
                    _.exportGrid("csv", "LinkSpace.pdf", "LinkSpaceCRUDController.aspx?p=csv")
                }
            },
            "xml": {
                onclick: function($, _) {
                    _.lastAction = "export";
                    _.exportGrid("xml")
                }
            },
            "filter": {
                onclick: function($, _) {
                    _.lastAction = "filter";
                    _.showDialog("filter")
                }
            },
            "chart": {
                onclick: function($, _) {
                    _.showDialog("chart")
                }
            },
            "state": function(_) {
                var $ = Sigma.$e("div", {
                    innerHTML: "&#160;",
                    className: "gt-page-state"
                });
                _.toolBar.appendChild($);
                return $
            },
            "separator": function(_) {
                var $ = Sigma.Button.VP3(_.toolBar);
                return $
            },
            "fill": function(_) {
                var $ = "";
                return $
            }
        }
    };
    Sigma.Widget = Sigma.$class({
        id: null,
        dom: null,
        setDom: function($) {
            this.dom = $
        },
        bo7: function() {
            return this.dom
        },
        show: function() {
            this.dom && (this.dom.style.display = "block")
        },
        hide: function() {
            this.dom && (this.dom.style.display = "none")
        },
        close: function() {
            this.hide()
        },
        Kn0: function(_, $) {
            if (_ || _ === 0) {
                this.left = _;
                this.dom && (this.dom.style.left = this.left + "px")
            }
            if ($ || $ === 0) {
                this.top = $;
                this.dom && (this.dom.style.top = this.top + "px")
            }
        },
        setSize: function($, _) {
            this.width = $ || this.width;
            this.height = _ || this.height;
            if (!this.dom) return;
            if (this.width / 1 && this.width > 0) this.dom.style.width = (this.width - 1) + "px";
            if (this.height / 1 && this.height > 0) this.dom.style.height = (this.height - 1) + "px"
        },
        destroy: function() {
            Sigma.$invoke(this, "cb3")
        }
    });
    Sigma.DialogDefault = {
        Ok4: true,
        autoRerender: true,
        title: null,
        body: null,
        buttonZone: null,
        headHeight: 20,
        hidden: false,
        Or8: function($) {
            if ($) Sigma.$extend(this, $);
            this.domId = (this.gridId ? this.gridId + "_" : "") + this.id;
            this.buttonLayout = this.buttonLayout || "h";
            this.dialogId = this.id, Sigma.$widget[this.id] = this
        },
        titleRender: function($) {
            this.title = $ || this.title;
            return this.title
        },
        show: function() {
            var $ = Sigma.$grid(this.gridId);
            $.closeGridMenu();
            if (Sigma.$invoke(this, "beforeShow", [$]) !== false) {
                this.locked = true;
                $.showMask();
                this.autoRerender && this.render($.gridMask);
                $.gridMask.appendChild(this.dom);
                if (this.width / 1 && this.width > 0) this.dom.style.marginLeft = (0 - this.width / 2) + "px";
                this.dom.style.marginTop = "0px";
                this.dom.style.top = "25px";
                this.dom.style.display = "block";
                $.activeDialog = this;
                this.hidden = false;
                Sigma.$invoke(this, "afterShow", [$])
            }
        },
        hide: function() {
            var $ = Sigma.$grid(this.gridId);
            if (Sigma.$invoke(this, "beforeHide", [$]) !== false) {
                this.locked = false;
                $.hideMask();
                if (this.dom) {
                    this.dom.style.display = "none";
                    $.gridEditorCache.appendChild(this.dom)
                }
                $.activeDialog = null;
                this.hidden = true;
                Sigma.$invoke(this, "afterHide", [$])
            }
        },
        close: function() {
            var $ = Sigma.$grid(this.gridId);
            this.hide()
        },
        confirm: function() {
            var $ = Sigma.$grid(this.gridId);
            if ($.activeEditor == this) {
                this.locked = false;
                $.so6();
                $.activeEditor == this
            }
        },
        render: function($) {
            this.container = $ || this.container;
            if (!this.rendered) {
                this.dom = this.dom || Sigma.$e("div", {
                    className: "gt-grid-dialog"
                });
                this.dom.id = this.domId + "_dialog";
                this.container = this.container || Sigma.doc.body;
                this.container.appendChild(this.dom);
                this.dom.innerHTML = Sigma.T_D.create(this);
                this.titleDiv = Sigma.$(this.domId + "_dialog_title");
                this.bodyDiv = Sigma.$(this.domId + "_dialog_body");
                if (this.height) this.bodyDiv.style.height = this.height - (this.headHeight || 0) + "px";
                this.setBody();
                this.setButtons();
                this.setTitle();
                Sigma.$invoke(this, "afterRender", [this])
            }
            this.setSize();
            this.Kn0();
            if (Sigma.$type(this.valueDom, "function")) this.valueDom = this.valueDom();
            this.valueDom = Sigma.$(this.valueDom);
            this.rendered = true
        },
        setBody: function($) {
            var _ = Sigma.$grid(this.gridId);
            this.body = $ || this.body;
            this.bodyDiv.innerHTML = "";
            if (Sigma.$type(this.body, "function")) this.body = this.body(_);
            if (!this.body);
            else if (Sigma.$type(this.body, "string")) this.bodyDiv.innerHTML = this.body;
            else this.bodyDiv.appendChild(this.body)
        },
        setButtons: function(A) {
            this.buttons = A || this.buttons;
            if (!this.buttons) return;
            A = [].concat(this.buttons);
            if (A.length > 0) {
                this.buttonZone = this.buttonZone || Sigma.$e("div", {
                    className: "gt-dialog-buttonzone-" + this.buttonLayout,
                    id: this.domId + "_div"
                });
                if (this.buttonLayout == "h") this.buttonZone.style.width = this.width - 12 + "px";
                for (var $ = 0; $ < A.length; $++) {
                    var _ = null;
                    if (A[$].breakline) _ = Sigma.$e("br");
                    else if (A[$].html) _ = Sigma.$e("span", {
                        innerHTML: A[$].html
                    });
                    else {
                        _ = Sigma.$e("button", {
                            id: this.domId + "_" + A[$].id,
                            className: "gt-input-button",
                            innerHTML: A[$].text
                        });
                        Sigma.U.addEvent(_, "click", A[$].onclick)
                    }
                    this.buttonZone.appendChild(_)
                }
            }
            this.bodyDiv.appendChild(this.buttonZone)
        },
        setTitle: function($) {
            this.titleDiv.innerHTML = this.titleRender($)
        }
    };
    Sigma.Dialog = Sigma.Widget.extend(Sigma.DialogDefault);
    Sigma.qf5 = function(D, C) {
        D = Sigma.$grid(D);
        C = C || {};
        C.checkType = C.checkType || "checkbox";
        C.canCheck = C.canCheck ||
    function($) {
        return !$.hidden
    };

        function A(_, A) {
            var $ = _.canCheck === true || _.canCheck(A) !== false;
            return "<input type=\"" + _.checkType + "\" name=\"" + _.name + "\" value=\"" + _.value(A) + "\" class=\"gt-f-check\" " + (_.checked(A) ? " checked=\"checked\" " : "") + (!$ ? " disabled=\"disabled\" " : "") + " />"
        }
        function B($) {
            return $.checkType == "checkbox" ? "<input type=\"checkbox\" name=\"" + $.name + "\" class=\"gt-f-totalcheck\" />" : "<input type=\"radio\" name=\"" + $.name + "\" />"
        }
        var E = D.columnList,
        $ = ["<table class=\"gt-table\" style=\"margin-left:0px\" cellSpacing=\"0\"  cellPadding=\"0\" border=\"0\" >", "<col style=\"width:25px\" /><col style=\"width:105px\" />", "<thead>", Sigma.T_G.rowStart(D, 0), Sigma.T_G.cellStartHTML, B(C), Sigma.T_G.cellEndHTML, Sigma.T_G.cellStartHTML, D.getMsg("COLUMNS_HEADER"), Sigma.T_G.cellEndHTML, Sigma.T_G.rowEndHTML, "</thead>", "<tbody>"];
        for (var _ = 0; _ < E.length; _++) $.push([Sigma.T_G.rowStart(D, _), Sigma.T_G.cellStartHTML, A(C, E[_]), Sigma.T_G.cellEndHTML, Sigma.T_G.cellStartHTML, E[_].header || E[_].title, Sigma.T_G.cellEndHTML, Sigma.T_G.rowEndHTML].join(""));
        $.push("</tbody></table>");
        return $.join("\n")
    };
    Sigma.checkChecked = function($) {
        $ = Sigma.$grid($);
        var A = $.chkAll,
        G = Sigma.U.hN2("td", A),
        E = Sigma.U.getCellIndex(G),
        H = Sigma.Grid.getAllRows($),
        F = 0;
        for (var B = 0, _ = H.length; B < _; B++) {
            var D = H[B].cells[E];
            if (D) {
                var C = D.getElementsByTagName("input")[0];
                if (C && $.checkedRows[C.value]) {
                    C.checked = true;
                    F++
                }
            }
        }
        A.checked = F == H.length
    };
    Sigma.BM6 = function(F, _) {
        var E = F + "ColCheck",
        G = _.gridId,
        B = G + "_" + F + "ColDialog",
        $ = Sigma.$grid(G),
        D = function() {
            var H = Sigma.$(B + "_div"),
                D = (Sigma.U.getTagName(H) == "TABLE") ? H : H.getElementsByTagName("table")[0],
                A = D.tBodies[0],
                C = A.getElementsByTagName("input"),
                F = Sigma.U.getCheckboxState(C, E),
                I = [];
            for (var J = 0; J < $.columnList.length; J++) I.push($.columnList[J].id);
            for (J = 0; J < I.length; J++) {
                var G = $.columnMap[I[J]];
                if (F[G.id]) G[_.checkFn]();
                else G[_.uncheckFn]()
            }
            if (_.autoClose !== false) {
                $.Kh4();
                Sigma.$widget[B].close()
            }
        },
        C = function() {
            Sigma.$widget[B].close()
        },
        A = new Sigma.Dialog({
            id: B,
            gridId: G,
            title: _.title,
            width: 260,
            height: 220,
            buttonLayout: "v",
            body: ["<div id=\"" + B + "_div" + "\" onclick=\"Sigma.hm0.pt6(event)\" class=\"gt-column-dialog\" >", "</div>"].join(""),
            buttons: [{
                text: $.getMsg("TEXT_OK"),
                onclick: D
            }, {
                text: $.getMsg("TEXT_CLOSE"),
                onclick: C
}],
                afterShow: function() {
                    var $ = Sigma.$grid(this.gridId),
                    A = Sigma.qf5(this.gridId, {
                        type: "checkbox",
                        name: E,
                        value: function($) {
                            return $.id
                        },
                        checked: _.checkValid,
                        checkType: _.checkType,
                        canCheck: _.canCheck
                    });
                    Sigma.$(this.id + "_div").innerHTML = A
                }
            });
            return A
        };
        Sigma.qp8 = function(H) {
            var D = H.gridId,
        G = Sigma.$grid(D),
        J = D + "_filterDialog";
            G.justShowFiltered = H.justShowFiltered === true ? true : (H.justShowFiltered === false ? false : G.justShowFiltered);
            G.afterFilter = H.afterFilter || G.afterFilter;
            var C = function() {
                if (G._noFilter) {
                    A();
                    G._noFilter = false
                }
                var _ = Sigma.$(J + "_column_select");
                if (_ && _.options.length > 0) {
                    var B = _.value,
                    $ = _.options[_.selectedIndex].text;
                    Sigma.$(J + "_div").appendChild(Sigma.bi1(G, B, $))
                }
            },
        A = function() {
            Sigma.$(J + "_div").innerHTML = ""
        },
        $ = function() {
            var A = Sigma.$(J + "_div"),
                $ = [],
                F = A.childNodes;
            for (var K = 0; K < F.length; K++) if (Sigma.U.getTagName(F[K]) == "DIV" && F[K].className == "gt-filter-item") {
                var C = F[K].childNodes[1],
                    E = F[K].childNodes[2],
                    I = F[K].childNodes[3].firstChild,
                    B = Sigma.U.getValue(C),
                    D = G.columnMap[B];
                if (D && D.fieldName) $.push({
                    columnId: B,
                    fieldName: D.fieldName,
                    logic: Sigma.U.getValue(E),
                    value: Sigma.U.getValue(I)
                })
            }
            if ($.length > 0) var _ = G.filterGrid($);
            else G.unfilterGrid();
            if (H.autoClose !== false) {
                G.Kh4();
                Sigma.$widget[J].close()
            }
        },
        F = function() {
            Sigma.$widget[J].close()
        },
        //E = 430, -Original Filter Width
        E = 600,
        //_ = 220, -Original Filter Heigth
        _ = 300,
        B = E - (Sigma.isBoxModel ? 16 : 18),
        K = _ - (Sigma.isBoxModel ? 93 : 95),
        I = new Sigma.Dialog({
            id: J,
            gridId: D,
            title: H.title,
            width: E,
            height: _,
            buttonLayout: "h",
            body: ["<div id=\"" + J + "_div\" class=\"gt-filter-dialog\" style=\"width:" + B + "px;height:" + K + "px;\" onclick=\"Sigma.hm0.sa5(event)\" >", "</div>"].join(""),
            buttons: [{
                html: Sigma.oe8(G, J + "_column_select")
            }, {
                text: G.getMsg("TEXT_ADD_FILTER"),
                onclick: C
            }, {
                text: G.getMsg("TEXT_CLEAR_FILTER"),
                onclick: A
            }, {
                breakline: true
            }, {
                text: G.getMsg("TEXT_OK"),
                onclick: $
            }, {
                text: G.getMsg("TEXT_CLOSE"),
                onclick: F
}],
                afterShow: function() {
                    var _ = Sigma.$grid(this.gridId),
                    $ = _.filterInfo || [];
                    A();
                    for (var I = 0; I < $.length; I++) {
                        var B = $[I].columnId,
                        C = _.getColumn(B),
                        H = (C.header || C.title),
                        F = Sigma.bi1(_, B, H),
                        G = F.childNodes[1],
                        E = F.childNodes[2],
                        D = F.childNodes[3].firstChild;
                        Sigma.U.setValue(G, B);
                        Sigma.U.setValue(E, $[I].logic);
                        Sigma.U.setValue(D, $[I].value);
                        Sigma.$(this.id + "_div").appendChild(F)
                    }
                    if ($.length < 1) {
                        Sigma.$(this.id + "_div").innerHTML = "<div style=\"color:#999999;margin:10px;\">" + _.getMsg("DIAG_NO_FILTER") + "</div>";
                        _._noFilter = true
                    }
                }
            });
            return I
        };
        Sigma.oe8 = function(A, _) {
            A = Sigma.$grid(A);
            var C = ["<select" + (_ ? (" id=\"" + _ + "\" ") : " ") + " class=\"gt-input-select\">"];
            for (var B = 0; B < A.columnList.length; B++) {
                var $ = A.columnList[B];
                if ($ && $.filterable !== false) C.push("<option value=\"" + $.id + "\" >" + ($.header || $.title) + "</option>")
            }
            C.push("</select>");
            return C.join("")
        };
        Sigma.ra7 = function($, A) {
            $ = Sigma.$grid($);
            var B, _ = $.getColumn(A);
            if (typeof _.filterField == "function") B = _.filterField(_);
            else if (_.filterField) B = _.filterField;
            B = B || "<input type=\"text\" class=\"gt-input-text gt-filter-field-text\" value=\"\" />";
            return "<div class=\"gt-filter-field-box\">" + B + "</div>"
        };
        Sigma.bi1 = function(D, $, _) {
            D = Sigma.$grid(D);
            var C = Sigma.$e("div", {
                className: "gt-filter-item"
            }),
        A = "<input type=\"text\" readonly=\"readonly\" class=\"gt-input-text gt-filter-col-text\" value=\"" + _ + "\" />";
            A += "<input type=\"hidden\"  value=\"" + $ + "\" />";
            var B = Sigma.ra7(D, $),
        E = "<button class=\"gt-input-button gt-filter-del\" >" + D.getMsg("TEXT_DEL") + "</button>" + "<button class=\"gt-input-button gt-filter-up\" >" + D.getMsg("TEXT_UP") + "</button>" + "<button class=\"gt-input-button gt-filter-down\" >" + D.getMsg("TEXT_DOWN") + "</button>";
            C.innerHTML = A + Sigma.T_D.Nr5 + B + E;
            return C
        };
        Sigma.hm0 = {
            currentElement: null,
            sa5: function(A) {
                A = A || window.event;
                var _ = Sigma.U.getEventTarget(A),
            E = Sigma.U.hN2("table", null, A, 10);
                if (Sigma.U.getTagName(_) == "BUTTON") {
                    var $ = " " + _.className,
                C = _.parentNode;
                    if ($.indexOf(" gt-filter-del") >= 0) Sigma.U.removeNode(C);
                    else if ($.indexOf(" gt-filter-up") >= 0) {
                        var B = C.previousSibling;
                        if (B) C.parentNode.insertBefore(C, B)
                    } else if ($.indexOf(" gt-filter-down") >= 0) {
                        var D = C.nextSibling;
                        if (D) C.parentNode.insertBefore(D, C)
                    }
                }
            },
            pt6: function(B) {
                B = B || window.event;
                var $ = Sigma.U.getEventTarget(B),
            F = Sigma.U.hN2("table", null, B, 10);
                if (!$ || ($.type != "checkbox" && $.type != "radio")) return;
                if (Sigma.U.hasClass($, "gt-f-totalcheck")) {
                    var E = F.tBodies[0],
                D = E.getElementsByTagName("input");
                    for (var A = 0; A < D.length; A++) if (D[A].name == $.name && D[A].type == $.type) D[A].checked = $.checked
                } else if (Sigma.U.hasClass($, "gt-f-check")) {
                    var C = F.tHead,
                _ = C.getElementsByTagName("input")[0];
                    if (_) _.checked = false
                }
            }
        };
        Sigma.EditorDefault = {
            gridId: null,
            left: 0,
            top: 0,
            render: Sigma.$empty,
            validator: null,
            isFocus: Sigma.$empty,
            onKeyPress: Sigma.$empty,
            errMsg: null,
            isActive: null,
            valueDom: null,
            locked: false,
            Or8: function($) {
                if ($) Sigma.$extend(this, $);
                this.validator = this.validator || this.defaultValidator;
                if (Sigma.$type(this.validRule, "string")) this.validRule = this.validRule.split(",");
                if (this.required) this.validRule = ["required"].concat(this.validRule);
                this.dom = this.dom || Sigma.$e("div", {
                    className: "gt-editor-container"
                });
                Sigma.U.addEvent(this.dom, "click", function($) {
                    Sigma.U.stopEvent($)
                });
                Sigma.U.addEvent(this.dom, "dblclick", function($) {
                    Sigma.U.stopEvent($)
                })
            },
            setValue: function(C, E, B, D, _, $, A) {
                Sigma.U.setValue(this.valueDom, C)
            },
            getValue: function(C, E, B, D, _, $, A) {
                return Sigma.U.getValue(this.valueDom)
            },
            parseValue: function(C, E, B, D, _, $, A) {
                return C
            },
            getDisplayValue: function($) {
                return $ === undefined ? this.getValue() : $
            },
            defaultValidator: function(G, $, F, H, _) {
                var A = [],
            J = [].concat(_.validRule);
                for (var D = 0; D < J.length; D++) {
                    var B = J[D],
                I = [G];
                    if (Sigma.$type(B, "array") && B.length > 0) {
                        B = B[0];
                        I = I.concat(B.slice(1))
                    }
                    var E = Sigma.Validator.getValidator(B),
                C = true;
                    if (Sigma.$type(E, "function")) C = E.apply(E, I);
                    if (C !== true) {
                        var K = Sigma.Validator.getMessage(this.validRule[D]) || String(C);
                        A.push(K)
                    }
                }
                if (!A || A.length < 1) A = "";
                return A
            },
            ge5: function($, C, A, _) {
                if (!this.validRule && !this.validator) return true;
                $ = ($ === undefined || $ === null) ? this.getValue() : $;
                var B = this.validator($, C, A, _, this);
                if (B === true || B === undefined || B === null || B === "") return true;
                return B
            },
            active: function() {
                Sigma.U.focus(this.valueDom)
            }
        };
        Sigma.Editor = Sigma.Widget.extend(Sigma.EditorDefault);
        Sigma.DialogEditor = Sigma.Editor.extend(Sigma.$extend({
            bo7: function() {
                if (!this.dom && this.render) {
                    var $ = Sigma.$grid(this.gridId);
                    this.render($.gridMask)
                }
                return this.dom
            }
        }, Sigma.DialogDefault));
        Sigma.EditDialog = Sigma.DialogEditor;
        Sigma.Calendar = window.Calendar || {
            trigger: Sigma.$empty
        };
        Sigma.$extend(Sigma.Editor, {
            Le1: function($, _) {
                if (Sigma.$type($, "function")) $ = $(_);
                if (($ instanceof Sigma.DialogEditor) || ($ instanceof Sigma.Dialog)) {
                    $.gridId = _.id;
                    $.container = _.gridMask;
                    return $
                }
                if ($ instanceof Sigma.Editor) return $;
                $ = Sigma.$type($, "string") ? {
                    type: $
} : $;
                    return $ && Sigma.Editor.EDITORS[$.type] ? Sigma.Editor.EDITORS[$.type]($) : null
                },
                register: function(_, $) {
                    if ($ instanceof Sigma.Editor) $ = function() {
                        return $
                    };
                    Sigma.Editor.EDITORS[_] = $
                },
                EDITORS: {
                    text: function($) {
                        $ = new Sigma.Editor($);
                        $.valueDom = Sigma.$e("input", {
                            type: "text",
                            value: $.defaultValue || "",
                            className: "gt-editor-text"
                        });
                        $.dom.appendChild($.valueDom);
                        return $
                    },
                    textarea: function($) {
                        $ = new Sigma.Editor($);
                        $.valueDom = Sigma.$e("textarea", {
                            style: {
                                width: $.width || "100px",
                                height: $.height || "50px"
                            },
                            value: $.defaultValue || "",
                            className: "gt-editor-text"
                        });
                        $.dom.appendChild($.valueDom);
                        $.dom.style.width = $.valueDom.style.width;
                        $.dom.style.height = $.valueDom.style.height;
                        $.setSize = Sigma.$empty;
                        return $
                    },
                    select: function($) {
                        $ = new Sigma.Editor($);
                        $.valueDom = Sigma.U.createSelect($.options, null, {
                            className: "gt-editor-text"
                        });
                        $.dom.appendChild($.valueDom);
                        $.getDisplayValue = function($) {
                            $ = $ === undefined ? this.getValue() : $;
                            for (var _ = 0; _ < this.valueDom.options.length; _++) if (String(this.valueDom.options[_].value) === String($)) return this.valueDom.options[_].text || this.valueDom.options[_].innerHTML;
                            return (this.defaultText || this.defaultText === "") ? this.defaultText : null
                        };
                        return $
                    },
                    checkbox: function() {
                        editor = new Sigma.Editor(editor);
                        editor.valueDom = Sigma.U.createSelect(editor.options, null, {});
                        editor.dom.appendChild(editor.valueDom);
                        return editor
                    },
                    date: function(C) {
                        C = new Sigma.Editor(C);
                        var A = Sigma.$e("input", {
                            type: "text",
                            value: C.defaultValue || "",
                            className: "gt-editor-text",
                            style: {
                                width: "78px",
                                styleFloat: "left"
                            }
                        }),
                $ = Sigma.$e("input", {
                    type: "button",
                    value: C.defaultValue || "",
                    className: "gt-editor-date",
                    styleFloat: "left"
                });
                        C.dom.style.overflow = "hidden";
                        C.dom.appendChild(A);
                        C.dom.appendChild($);
                        C.setSize = function($, _) {
                            this.width = $ || this.width;
                            this.height = _ || this.height;
                            if (this.width / 1 && this.width > 0) this.dom.style.width = (this.width - 1) + "px";
                            if (this.height / 1 && this.height > 0) this.dom.style.height = (this.height - 1) + "px";
                            this.dom.firstChild.style.width = (this.width - 20) + "px"
                        };
                        var _ = function($) {
                            C.onClose && C.onClose();
                            $.hide()
                        },
                B = function() {
                    var $ = C.format || "%Y-%m-%d";
                    $ = Sigma.U.replaceAll($, "yyyy", "%Y");
                    $ = Sigma.U.replaceAll($, "MM", "%m");
                    $ = Sigma.U.replaceAll($, "dd", "%d");
                    $ = Sigma.U.replaceAll($, "HH", "%H");
                    $ = Sigma.U.replaceAll($, "mm", "%M");
                    $ = Sigma.U.replaceAll($, "ss", "%S");
                    Sigma.Calendar.trigger({
                        inputField: A,
                        ifFormat: $,
                        showsTime: true,
                        button: "date_button",
                        singleClick: true,
                        onClose: _,
                        step: 1
                    })
                };
                        Sigma.U.addEvent($, "click", B);
                        C.valueDom = A;
                        return C
                    }
                }
            });
            Sigma.Validator = {
                hasDepend: /^datetime|^date|^time|^minlength|^maxlength|^DT|^D|^T|^MINL|^MAXL/,
                hasArgument: /^equals|^lessthen|^EQ|^LT/,
                DATE_FORMAT: "yyyy-MM-dd",
                TIME_FORMAT: "HH:mm:ss",
                DATETIME_FORMAT: "yyyy-MM-dd HH:mm:ss",
                KeyMapping: {
                    "R": "required",
                    "DT": "datetime",
                    "D": "date",
                    "T": "time",
                    "E": "email",
                    "ID": "idcard",
                    "N": "number",
                    "int": "integer",
                    "I": "integer",
                    "F": "float",
                    "M": "money",
                    "RG": "range",
                    "EQ": "equals",
                    "LT": "lessthen",
                    "GT": "greatethen",
                    "U": "url",
                    "ENC": "enchar",
                    "CNC": "cnchar",
                    "MINL": "minlength",
                    "MAXL": "maxlength"
                },
                RegExpLib: {
                    "email": /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                    "number": /^\d+$/,
                    "integer": /^[1-9]\d*|0$/,
                    "float": /^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*|0)$/,
                    "money": /^([1-9]\d*\.\d{1,2}|0\.\d{1,2}|[1-9]\d*|0)$/,
                    "telephone": /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,16})+$/,
                    "enchar": /^[ \w]*$/,
                    "cnchar": /^[\u4E00-\u9FA5\uF900-\uFA2D]*$/,
                    "idcard": /^(\d{15}|\d{18}|\d{17}X?)$/i
                },
                getValidator: function($) {
                    return Sigma.Validator[$]
                },
                getMessage: function(msgKey) {
                    var msg = Sigma.Msg.Validator["default"][msgKey];
                    if (!msg) msg = Sigma.Msg.Validator["default"][Sigma.Validator.KeyMapping[msgKey]];
                    var _format = ((Sigma.Validator.KeyMapping[msgKey] || msgKey) + "_FORMAT").toUpperCase();
                    _format = Sigma.Validator[_format];
                    var AB6 = (" " + msg).split(/\{[0-9]/).length - 1;
                    for (var i = 1; i <= AB6; i++) {
                        var ns = arguments[i];
                        if (i == 2) ns = ns || _format;
                        var rex;
                        eval("rex = /{(" + (i - 1) + "[^#}]*)#?([^}]*)}/;");
                        var ostring = rex.exec(msg);
                        if (ostring && ostring.length > 2) if (!ns) msg = Sigma.U.replaceAll(msg, ostring[0], " " + ostring[2] + " ");
                        else msg = Sigma.U.replaceAll(msg, ostring[0], " " + ns + " ")
                    }
                    return msg
                },
                "required": function(_) {
                    if (_ === null || _ === undefined) return false;
                    if (typeof (_) != "string" && _.length) {
                        if (_.length < 1) return false;
                        for (var $ = 0; $ < _.length; $++) {
                            var A = Sigma.Validator.required(_[$]);
                            if (A) return true
                        }
                        return false
                    }
                    return Sigma.U.trim(_ + "").length > 0
                },
                "telephone": function($) {
                    if (!Sigma.Validator.RegExpLib.telephone.exec($)) return false;
                    return true
                },
                "email": function($) {
                    return $ && Sigma.Validator.RegExpLib["email"].test($)
                },
                "enchar": function($) {
                    return $ && Sigma.Validator.RegExpLib["enchar"].test($)
                },
                "cnchar": function($) {
                    return $ && Sigma.Validator.RegExpLib["cnchar"].test($)
                },
                "number": function($) {
                    return !isNaN($ / 1)
                },
                "integer": function($) {
                    return (String($).indexOf(".") < 0) && !isNaN($ / 1) && Sigma.Validator.RegExpLib["integer"].test(Math.abs($))
                },
                "float": function($) {
                    return !isNaN($ / 1) && Sigma.Validator.RegExpLib["float"].test(Math.abs($))
                },
                "money": function($) {
                    return !isNaN($ / 1) && Sigma.Validator.RegExpLib["money"].test($)
                },
                "idcard": function(_) {
                    if (!_ || _.length < 15 || !Sigma.Validator.RegExpLib["idcard"].test(_)) return false;
                    var $;
                    if (_.length == 18) $ = _.substr(6, 8);
                    else $ = "19" + _.substr(6, 6);
                    return Sigma.Validator.date($, "YYYYMMDD")
                },
                "date": function(J, C) {
                    J = [].concat(J);
                    if (!C || C.length < 1) C = Sigma.Validator.DATE_FORMAT;
                    C = C.toUpperCase();
                    var E = C.replace(/([$^.*+?=!:|\/\\\(\)\[\]\{\}])/g, "\\$1");
                    E = E.replace("YYYY", "([0-9]{4})");
                    E = E.replace("YY", "([0-9]{2})");
                    E = E.replace("MM", "(0[1-9]|10|11|12)");
                    E = E.replace("M", "([1-9]|10|11|12)");
                    E = E.replace("DD", "(0[1-9]|[12][0-9]|30|31)");
                    E = E.replace("D", "([1-9]|[12][0-9]|30|31)");
                    E = "^" + E + "$";
                    var F = new RegExp(E),
            I = 0,
            G = 1,
            $ = 1,
            H = C.match(/(YYYY|YY|MM|M|DD|D)/g);
                    for (var K = 0; K < J.length; K++) {
                        if (!F.test(J[K])) return false;
                        var B = F.exec(J[K]);
                        for (var _ = 0; _ < H.length; _++) switch (H[_]) {
                            case "YY":
                            case "yy":
                                var A = Number(B[_ + 1]);
                                I = 1900 + (A <= 30 ? A + 100 : A);
                                break;
                            case "YYYY":
                            case "yyyy":
                                I = Number(B[_ + 1]);
                                break;
                            case "M":
                            case "MM":
                                G = Number(B[_ + 1]);
                                break;
                            case "D":
                            case "d":
                            case "DD":
                            case "dd":
                                $ = Number(B[_ + 1]);
                                break
                        }
                        var D = (I % 4 === 0 && (I % 100 !== 0 || I % 400 === 0));
                        if ($ > 30 && (G == 2 || G == 4 || G == 6 || G == 9 || G == 11)) return false;
                        if (G == 2 && ($ == 30 || $ == 29 && !D)) return false
                    }
                    return true
                },
                "time": function(C, A) {
                    C = [].concat(C);
                    if (!A || A.length < 1) A = Sigma.Validator.TIME_FORMAT;
                    var _ = A.replace(/([.$?*!=:|{}\(\)\[\]\\\/^])/g, "\\$1");
                    _ = _.replace("HH", "([01][0-9]|2[0-3])");
                    _ = _.replace("H", "([0-9]|1[0-9]|2[0-3])");
                    _ = _.replace("mm", "([0-5][0-9])");
                    _ = _.replace("m", "([1-5][0-9]|[0-9])");
                    _ = _.replace("ss", "([0-5][0-9])");
                    _ = _.replace("s", "([1-5][0-9]|[0-9])");
                    _ = "^" + _ + "$";
                    var B = new RegExp(_);
                    for (var $ = 0; $ < C.length; $++) if (!B.test(C[$])) return false;
                    return true
                },
                "datetime": function(E, $) {
                    E = [].concat(E);
                    var D = /^\S+ \S+$/;
                    if (!$ || $.length < 1) $ = Sigma.Validator.DATETIME_FORMAT;
                    else if (!D.test($)) return false;
                    for (var A = 0; A < E.length; A++) {
                        if (!D.test(E[A])) return false;
                        var C = E[A].split(" "),
                _ = $.split(" "),
                B = Sigma.Validator.date(C[0], _[0]) && Sigma.Validator.time(C[1], _[1]);
                        if (!B) return false
                    }
                    return true
                },
                "range": function($, _, A) {
                    if (!Sigma.$chk(_)) return $ <= A;
                    else if (!Sigma.$chk(A)) return $ >= _;
                    return $ >= _ && $ <= A
                },
                "equals": function(_, A) {
                    A = [].concat(A);
                    for (var $ = 0; $ < A.length; $++) if (_ == A) return true;
                    return false
                },
                "lessthen": function(_, A) {
                    A = [].concat(A);
                    for (var $ = 0; $ < A.length; $++) if (_ <= A) return true;
                    return false
                },
                "greatethen": function(_, A) {
                    A = [].concat(A);
                    for (var $ = 0; $ < A.length; $++) if (_ >= A) return true;
                    return false
                },
                "minlength": function($, _) {
                    return Sigma.$chk($) && ($ + "").length >= _
                },
                "maxlength": function($, _) {
                    return Sigma.$chk($) && ($ + "").length <= _
                }
            };
            (function() {
                for (var $ in Sigma.Validator.KeyMapping) Sigma.Validator[$] = Sigma.Validator[Sigma.Validator.KeyMapping[$]]
            })();
            Sigma.Chart = Sigma.$class({
                Or8: function($) {
                    this.defaultColor = "66BBFF";
                    this.type = "column2D";
                    this.swfPath = "./charts/";
                    this.swf = Sigma.Chart.SWFMapping[this.type];
                    this.width = "100%";
                    this.height = "100%";
                    this.data = null;
                    this.container = null;
                    this.chart = null;
                    Sigma.$extend(this, $);
                    this.swf = Sigma.Chart.SWFMapping[this.type] || this.swf;
                    if (this.swfPath.lastIndexOf("/") == this.swfPath.length - 1) this.swfPath = this.swfPath.substring(0, this.swfPath.length - 1);
                    this.container = Sigma.$(this.container);
                    this.chart = this.chart || new FusionCharts(this.swfPath + "/" + this.swf, this.container.id + "_chart", this.width, this.height)
                },
                Bf2: function(A) {
                    if (A.isNull) {
                        if (A.name) A = {
                            name: A.name
                        };
                        else return ""
                    } else if (A.color) A.color = A.color || this.defaultColor;
                    var _ = [];
                    for (var $ in A) _.push($ + "='" + A[$] + "'");
                    return
                },
                as7: function(D) {
                    D = D || this.data;
                    var $ = [];
                    for (var A = 0; A < D.length; A++) {
                        var C = D[A],
                F, E, _, B;
                        if (C instanceof Array) {
                            E = C[0];
                            _ = C[1];
                            B = C[2];
                            B = (_ === null || _ === undefined) ? null : (B || this.defaultColor);
                            E = (E === null || E === undefined) ? _ : E;
                            str = [E !== null && E !== undefined ? "name='" + E + "'" : "", _ !== null && _ !== undefined ? "value='" + _ + "'" : "", B !== null && B !== undefined ? "color='" + B + "'" : ""].join(" ")
                        } else if (C) str = this.Bf2(C);
                        F = ["<set", str, "/>"];
                        F = F.join(" ");
                        if (F == "<set />" || (_ === null || _ === undefined));
                        $.push(F)
                    }
                    this.setsXML = $.join("");
                    return this.setsXML
                },
                re5: function($, _) {
                    _ = _ || this.setsXML;
                    var A = ["<graph", "caption='" + (this.caption || "") + "'", "subCaption='" + (this.subCaption || "") + "'", "outCnvBaseFontSize='12'", "animation='0'"];
                    A.push(">" + _ + "</graph>");
                    this.chartXML = A.join(" ");
                    return this.chartXML
                },
                updateChart: function($, _) {
                    $ = $ || this.container;
                    _ = _ || this.chartXML;
                    updateChartXML($, _)
                },
                NR7: function($, _) {
                    this.data = _ || this.data;
                    this.as7();
                    this.re5();
                    $ = $ || this.container;
                    this.chart.setDataXML(this.chartXML);
                    this.chart.render($)
                }
            });
            Sigma.Chart.SWFMapping = {
                "column2D": "FCF_Column2D.swf",
                "pie3D": "FCF_Pie3D.swf"
            }