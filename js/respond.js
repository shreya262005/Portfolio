/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * https://j.mp/respondjs */

!(function (a) {
  "use strict";
  a.matchMedia =
    a.matchMedia ||
    (function (a) {
      var b,
        c = a.documentElement,
        d = c.firstElementChild || c.firstChild,
        e = a.createElement("body"),
        f = a.createElement("div");
      return (
        (f.id = "mq-test-1"),
        (f.style.cssText = "position:absolute;top:-100em"),
        (e.style.background = "none"),
        e.appendChild(f),
        function (a) {
          return (
            (f.innerHTML =
              '&shy;<style media="' +
              a +
              '"> #mq-test-1 { width: 42px; }</style>'),
            c.insertBefore(e, d),
            (b = 42 === f.offsetWidth),
            c.removeChild(e),
            { matches: b, media: a }
          );
        }
      );
    })(a.document);
})(this),
  (function (a) {
    "use strict";
    function b() {
      v(!0);
    }
    var c = {};
    (a.respond = c), (c.update = function () {});
    var d = [],
      e = (function () {
        var b = !1;
        try {
          b = new a.XMLHttpRequest();
        } catch (c) {
          b = new a.ActiveXObject("Microsoft.XMLHTTP");
        }
        return function () {
          return b;
        };
      })(),
      f = function (a, b) {
        var c = e();
        c &&
          (c.open("GET", a, !0),
          (c.onreadystatechange = function () {
            4 !== c.readyState ||
              (200 !== c.status && 304 !== c.status) ||
              b(c.responseText);
          }),
          4 !== c.readyState && c.send(null));
      },
      g = function (a) {
        return a.replace(c.regex.minmaxwh, "").match(c.regex.other);
      };
    if (
      ((c.ajax = f),
      (c.queue = d),
      (c.unsupportedmq = g),
      (c.regex = {
        media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
        keyframes:
          /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
        comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
        urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
        findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
        only: /(only\s+)?([a-zA-Z]+)\s?/,
        minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        minmaxwh:
          /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
        other: /\([^\)]*\)/g,
      }),
      (c.mediaQueriesSupported =
        a.matchMedia &&
        null !== a.matchMedia("only all") &&
        a.matchMedia("only all").matches),
      !c.mediaQueriesSupported)
    ) {
      var h,
        i,
        j,
        k = a.document,
        l = k.documentElement,
        m = [],
        n = [],
        o = [],
        p = {},
        q = 30,
        r = k.getElementsByTagName("head")[0] || l,
        s = k.getElementsByTagName("base")[0],
        t = r.getElementsByTagName("link"),
        u = function () {
          var a,
            b = k.createElement("div"),
            c = k.body,
            d = l.style.fontSize,
            e = c && c.style.fontSize,
            f = !1;
          return (
            (b.style.cssText = "position:absolute;font-size:1em;width:1em"),
            c ||
              ((c = f = k.createElement("body")),
              (c.style.background = "none")),
            (l.style.fontSize = "100%"),
            (c.style.fontSize = "100%"),
            c.appendChild(b),
            f && l.insertBefore(c, l.firstChild),
            (a = b.offsetWidth),
            f ? l.removeChild(c) : c.removeChild(b),
            (l.style.fontSize = d),
            e && (c.style.fontSize = e),
            (a = j = parseFloat(a))
          );
        },
        v = function (b) {
          var c = "clientWidth",
            d = l[c],
            e = ("CSS1Compat" === k.compatMode && d) || k.body[c] || d,
            f = {},
            g = t[t.length - 1],
            p = new Date().getTime();
          if (b && h && q > p - h)
            return a.clearTimeout(i), (i = a.setTimeout(v, q)), void 0;
          h = p;
          for (var s in m)
            if (m.hasOwnProperty(s)) {
              var w = m[s],
                x = w.minw,
                y = w.maxw,
                z = null === x,
                A = null === y,
                B = "em";
              x && (x = parseFloat(x) * (x.indexOf(B) > -1 ? j || u() : 1)),
                y && (y = parseFloat(y) * (y.indexOf(B) > -1 ? j || u() : 1)),
                (w.hasquery &&
                  ((z && A) || !(z || e >= x) || !(A || y >= e))) ||
                  (f[w.media] || (f[w.media] = []),
                  f[w.media].push(n[w.rules]));
            }
          for (var C in o)
            o.hasOwnProperty(C) &&
              o[C] &&
              o[C].parentNode === r &&
              r.removeChild(o[C]);
          o.length = 0;
          for (var D in f)
            if (f.hasOwnProperty(D)) {
              var E = k.createElement("style"),
                F = f[D].join("\n");
              (E.type = "text/css"),
                (E.media = D),
                r.insertBefore(E, g.nextSibling),
                E.styleSheet
                  ? (E.styleSheet.cssText = F)
                  : E.appendChild(k.createTextNode(F)),
                o.push(E);
            }
        },
        w = function (a, b, d) {
          var e = a
              .replace(c.regex.comments, "")
              .replace(c.regex.keyframes, "")
              .match(c.regex.media),
            f = (e && e.length) || 0;
          b = b.substring(0, b.lastIndexOf("/"));
          var h = function (a) {
              return a.replace(c.regex.urls, "$1" + b + "$2$3");
            },
            i = !f && d;
          b.length && (b += "/"), i && (f = 1);
          for (var j = 0; f > j; j++) {
            var k, l, o, p;
            i
              ? ((k = d), n.push(h(a)))
              : ((k = e[j].match(c.regex.findStyles) && RegExp.$1),
                n.push(RegExp.$2 && h(RegExp.$2))),
              (o = k.split(",")),
              (p = o.length);
            for (var q = 0; p > q; q++)
              (l = o[q]),
                g(l) ||
                  m.push({
                    media:
                      (l.split("(")[0].match(c.regex.only) && RegExp.$2) ||
                      "all",
                    rules: n.length - 1,
                    hasquery: l.indexOf("(") > -1,
                    minw:
                      l.match(c.regex.minw) &&
                      parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                    maxw:
                      l.match(c.regex.maxw) &&
                      parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                  });
          }
          v();
        },
        x = function () {
          if (d.length) {
            var b = d.shift();
            f(b.href, function (c) {
              w(c, b.href, b.media),
                (p[b.href] = !0),
                a.setTimeout(function () {
                  x();
                }, 0);
            });
          }
        },
        y = function () {
          for (var b = 0; b < t.length; b++) {
            var c = t[b],
              e = c.href,
              f = c.media,
              g = c.rel && "stylesheet" === c.rel.toLowerCase();
            e &&
              g &&
              !p[e] &&
              (c.styleSheet && c.styleSheet.rawCssText
                ? (w(c.styleSheet.rawCssText, e, f), (p[e] = !0))
                : ((!/^([a-zA-Z:]*\/\/)/.test(e) && !s) ||
                    e.replace(RegExp.$1, "").split("/")[0] ===
                      a.location.host) &&
                  ("//" === e.substring(0, 2) && (e = a.location.protocol + e),
                  d.push({ href: e, media: f })));
          }
          x();
        };
      y(),
        (c.update = y),
        (c.getEmValue = u),
        a.addEventListener
          ? a.addEventListener("resize", b, !1)
          : a.attachEvent && a.attachEvent("onresize", b);
    }
  })(this);
