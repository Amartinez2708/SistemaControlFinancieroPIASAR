"use strict";

function createCommonjsModule(t, e) {
    return e = {
        exports: {}
    }, t(e, e.exports), e.exports
}
var commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
    domToImage = createCommonjsModule(function (t) {
        ! function (e) {
            function n(t, e) {
                function n(t) {
                    return e.bgcolor && (t.style.backgroundColor = e.bgcolor), e.width && (t.style.width = e.width + "px"), e.height && (t.style.height = e.height + "px"), e.style && Object.keys(e.style).forEach(function (n) {
                        t.style[n] = e.style[n]
                    }), t
                }
                return e = e || {}, Promise.resolve(t).then(function (t) {
                    return M(t, e.filter, !0)
                }).then(c).then(s).then(n).then(function (n) {
                    return l(n, e.width || L.width(t), e.height || L.height(t))
                })
            }

            function i(t, e) {
                return u(t, e || {}).then(function (e) {
                    return e.getContext("2d").getImageData(0, 0, L.width(t), L.height(t)).data
                })
            }

            function r(t, e) {
                return u(t, e || {}).then(function (t) {
                    return t.toDataURL()
                })
            }

            function o(t, e) {
                return e = e || {}, u(t, e).then(function (t) {
                    return t.toDataURL("image/jpeg", e.quality || 1)
                })
            }

            function a(t, e) {
                return u(t, e || {}).then(L.canvasToBlob)
            }

            function u(t, e) {
                function i(t) {
                    var n = document.createElement("canvas");
                    if (n.width = e.width || L.width(t), n.height = e.height || L.height(t), e.bgcolor) {
                        var i = n.getContext("2d");
                        i.fillStyle = e.bgcolor, i.fillRect(0, 0, n.width, n.height)
                    }
                    return n
                }
                return n(t, e).then(L.makeImage).then(L.delay(100)).then(function (e) {
                    var n = i(t);
                    return n.getContext("2d").drawImage(e, 0, 0), n
                })
            }

            function M(t, e, n) {
                function i(t) {
                    return t instanceof HTMLCanvasElement ? L.makeImage(t.toDataURL()) : t.cloneNode(!1)
                }

                function r(t, e, n) {
                    var i = t.childNodes;
                    return 0 === i.length ? Promise.resolve(e) : function (t, e, n) {
                        var i = Promise.resolve();
                        return e.forEach(function (e) {
                            i = i.then(function () {
                                return M(e, n)
                            }).then(function (e) {
                                e && t.appendChild(e)
                            })
                        }), i
                    }(e, L.asArray(i), n).then(function () {
                        return e
                    })
                }

                function o(t, e) {
                    function n() {
                        ! function (t, e) {
                            t.cssText ? e.cssText = t.cssText : function (t, e) {
                                L.asArray(t).forEach(function (n) {
                                    e.setProperty(n, t.getPropertyValue(n), t.getPropertyPriority(n))
                                })
                            }(t, e)
                        }(window.getComputedStyle(t), e.style)
                    }

                    function i() {
                        function n(n) {
                            var i = window.getComputedStyle(t, n),
                                r = i.getPropertyValue("content");
                            if ("" !== r && "none" !== r) {
                                var o = L.uid();
                                e.className = e.className + " " + o;
                                var a = document.createElement("style");
                                a.appendChild(function (t, e, n) {
                                    var i = "." + t + ":" + e,
                                        r = n.cssText ? function (t) {
                                            var e = t.getPropertyValue("content");
                                            return t.cssText + " content: " + e + ";"
                                        }(n) : function (t) {
                                            function e(e) {
                                                return e + ": " + t.getPropertyValue(e) + (t.getPropertyPriority(e) ? " !important" : "")
                                            }
                                            return L.asArray(t).map(e).join("; ") + ";"
                                        }(n);
                                    return document.createTextNode(i + "{" + r + "}")
                                }(o, n, i)), e.appendChild(a)
                            }
                        } [":before", ":after"].forEach(function (t) {
                            n(t)
                        })
                    }

                    function r() {
                        t instanceof HTMLTextAreaElement && (e.innerHTML = t.value), t instanceof HTMLInputElement && e.setAttribute("value", t.value)
                    }

                    function o() {
                        e instanceof SVGElement && (e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), e instanceof SVGRectElement && ["width", "height"].forEach(function (t) {
                            var n = e.getAttribute(t);
                            n && e.style.setProperty(t, n)
                        }))
                    }
                    return e instanceof Element ? Promise.resolve().then(n).then(i).then(r).then(o).then(function () {
                        return e
                    }) : e
                }
                return n || !e || e(t) ? Promise.resolve(t).then(i).then(function (n) {
                    return r(t, n, e)
                }).then(function (e) {
                    return o(t, e)
                }) : Promise.resolve()
            }

            function c(t) {
                return w.resolveAll().then(function (e) {
                    var n = document.createElement("style");
                    return t.appendChild(n), n.appendChild(document.createTextNode(e)), t
                })
            }

            function s(t) {
                return d.inlineAll(t).then(function () {
                    return t
                })
            }

            function l(t, e, n) {
                return Promise.resolve(t).then(function (t) {
                    return t.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), (new XMLSerializer).serializeToString(t)
                }).then(L.escapeXhtml).then(function (t) {
                    return '<foreignObject x="0" y="0" width="100%" height="100%">' + t + "</foreignObject>"
                }).then(function (t) {
                    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + e + '" height="' + n + '">' + t + "</svg>"
                }).then(function (t) {
                    return "data:image/svg+xml;charset=utf-8," + t
                })
            }
            var L = function () {
                function t() {
                    var t = "application/font-woff";
                    return {
                        woff: t,
                        woff2: t,
                        ttf: "application/font-truetype",
                        eot: "application/vnd.ms-fontobject",
                        png: "image/png",
                        jpg: "image/jpeg",
                        jpeg: "image/jpeg",
                        gif: "image/gif",
                        tiff: "image/tiff",
                        svg: "image/svg+xml"
                    }
                }

                function e(t) {
                    var e = /\.([^\.\/]*?)$/g.exec(t);
                    return e ? e[1] : ""
                }

                function n(n) {
                    var i = e(n).toLowerCase();
                    return t()[i] || ""
                }

                function i(t) {
                    return -1 !== t.search(/^(data:)/)
                }

                function r(t) {
                    return new Promise(function (e) {
                        for (var n = window.atob(t.toDataURL().split(",")[1]), i = n.length, r = new Uint8Array(i), o = 0; o < i; o++) r[o] = n.charCodeAt(o);
                        e(new Blob([r], {
                            type: "image/png"
                        }))
                    })
                }

                function o(t) {
                    return t.toBlob ? new Promise(function (e) {
                        t.toBlob(e)
                    }) : r(t)
                }

                function a(t, e) {
                    var n = document.implementation.createHTMLDocument(),
                        i = n.createElement("base");
                    n.head.appendChild(i);
                    var r = n.createElement("a");
                    return n.body.appendChild(r), i.href = e, r.href = t, r.href
                }

                function u(t) {
                    return new Promise(function (e, n) {
                        var i = new Image;
                        i.onload = function () {
                            e(i)
                        }, i.onerror = n, i.src = t
                    })
                }

                function M(t) {
                    var e = 3e4;
                    return new Promise(function (n) {
                        function i() {
                            if (4 === a.readyState) {
                                if (200 !== a.status) return void o("cannot fetch resource: " + t + ", status: " + a.status);
                                var e = new FileReader;
                                e.onloadend = function () {
                                    var t = e.result.split(/,/)[1];
                                    n(t)
                                }, e.readAsDataURL(a.response)
                            }
                        }

                        function r() {
                            o("timeout of " + e + "ms occured while fetching resource: " + t)
                        }

                        function o(t) {
                            console.error(t), n("")
                        }
                        var a = new XMLHttpRequest;
                        a.onreadystatechange = i, a.ontimeout = r, a.responseType = "blob", a.timeout = e, a.open("GET", t, !0), a.send()
                    })
                }

                function c(t, e) {
                    return "data:" + e + ";base64," + t
                }

                function s(t) {
                    return t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1")
                }

                function l(t) {
                    return function (e) {
                        return new Promise(function (n) {
                            setTimeout(function () {
                                n(e)
                            }, t)
                        })
                    }
                }

                function L(t) {
                    for (var e = [], n = t.length, i = 0; i < n; i++) e.push(t[i]);
                    return e
                }

                function g(t) {
                    return t.replace(/#/g, "%23").replace(/\n/g, "%0A")
                }

                function w(t) {
                    var e = y(t, "border-left-width"),
                        n = y(t, "border-right-width");
                    return t.scrollWidth + e + n
                }

                function d(t) {
                    var e = y(t, "border-top-width"),
                        n = y(t, "border-bottom-width");
                    return t.scrollHeight + e + n
                }

                function y(t, e) {
                    var n = window.getComputedStyle(t).getPropertyValue(e);
                    return parseFloat(n.replace("px", ""))
                }
                return {
                    escape: s,
                    parseExtension: e,
                    mimeType: n,
                    dataAsUrl: c,
                    isDataUrl: i,
                    canvasToBlob: o,
                    resolveUrl: a,
                    getAndEncode: M,
                    uid: function () {
                        var t = 0;
                        return function () {
                            return "u" + function () {
                                return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
                            }() + t++
                        }
                    }(),
                    delay: l,
                    asArray: L,
                    escapeXhtml: g,
                    makeImage: u,
                    width: w,
                    height: d
                }
            }(),
                g = function () {
                    function t(t) {
                        return -1 !== t.search(r)
                    }

                    function e(t) {
                        for (var e, n = []; null !== (e = r.exec(t)) ;) n.push(e[1]);
                        return n.filter(function (t) {
                            return !L.isDataUrl(t)
                        })
                    }

                    function n(t, e, n, i) {
                        function r(t) {
                            return new RegExp("(url\\(['\"]?)(" + L.escape(t) + ")(['\"]?\\))", "g")
                        }
                        return Promise.resolve(e).then(function (t) {
                            return n ? L.resolveUrl(t, n) : t
                        }).then(i || L.getAndEncode).then(function (t) {
                            return L.dataAsUrl(t, L.mimeType(e))
                        }).then(function (n) {
                            return t.replace(r(e), "$1" + n + "$3")
                        })
                    }

                    function i(i, r, o) {
                        return function () {
                            return !t(i)
                        }() ? Promise.resolve(i) : Promise.resolve(i).then(e).then(function (t) {
                            var e = Promise.resolve(i);
                            return t.forEach(function (t) {
                                e = e.then(function (e) {
                                    return n(e, t, r, o)
                                })
                            }), e
                        })
                    }
                    var r = /url\(['"]?([^'"]+?)['"]?\)/g;
                    return {
                        inlineAll: i,
                        shouldProcess: t,
                        impl: {
                            readUrls: e,
                            inline: n
                        }
                    }
                }(),
                w = function () {
                    function t() {
                        return e(document).then(function (t) {
                            return Promise.all(t.map(function (t) {
                                return t.resolve()
                            }))
                        }).then(function (t) {
                            return t.join("\n")
                        })
                    }

                    function e() {
                        function t(t) {
                            return t.filter(function (t) {
                                return t.type === CSSRule.FONT_FACE_RULE
                            }).filter(function (t) {
                                return g.shouldProcess(t.style.getPropertyValue("src"))
                            })
                        }

                        function e(t) {
                            var e = [];
                            return t.forEach(function (t) {
                                try {
                                    L.asArray(t.cssRules || []).forEach(e.push.bind(e))
                                } catch (e) {
                                    console.log("Error while reading CSS rules from " + t.href, e.toString())
                                }
                            }), e
                        }

                        function n(t) {
                            return {
                                resolve: function () {
                                    var e = (t.parentStyleSheet || {}).href;
                                    return g.inlineAll(t.cssText, e)
                                },
                                src: function () {
                                    return t.style.getPropertyValue("src")
                                }
                            }
                        }
                        return Promise.resolve(L.asArray(document.styleSheets)).then(e).then(t).then(function (t) {
                            return t.map(n)
                        })
                    }
                    return {
                        resolveAll: t,
                        impl: {
                            readAll: e
                        }
                    }
                }(),
                d = function () {
                    function t(t) {
                        function e(e) {
                            return L.isDataUrl(t.src) ? Promise.resolve() : Promise.resolve(t.src).then(e || L.getAndEncode).then(function (e) {
                                return L.dataAsUrl(e, L.mimeType(t.src))
                            }).then(function (e) {
                                return new Promise(function (n, i) {
                                    t.onload = n, t.onerror = i, t.src = e
                                })
                            })
                        }
                        return {
                            inline: e
                        }
                    }

                    function e(n) {
                        return n instanceof Element ? function (t) {
                            var e = t.style.getPropertyValue("background");
                            return e ? g.inlineAll(e).then(function (e) {
                                t.style.setProperty("background", e, t.style.getPropertyPriority("background"))
                            }).then(function () {
                                return t
                            }) : Promise.resolve(t)
                        }(n).then(function () {
                            return n instanceof HTMLImageElement ? t(n).inline() : Promise.all(L.asArray(n.childNodes).map(function (t) {
                                return e(t)
                            }))
                        }) : Promise.resolve(n)
                    }
                    return {
                        inlineAll: e,
                        impl: {
                            newImage: t
                        }
                    }
                }(),
                y = {
                    toSvg: n,
                    toPng: r,
                    toJpeg: o,
                    toBlob: a,
                    toPixelData: i,
                    impl: {
                        fontFaces: w,
                        images: d,
                        util: L,
                        inliner: g
                    }
                };
            t.exports = y
        }()
    }),
    FileSaver = createCommonjsModule(function (t) {
        var e = e || function (t) {
            if (!(void 0 === t || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
                var e = t.document,
                    n = function () {
                        return t.URL || t.webkitURL || t
                    },
                    i = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                    r = "download" in i,
                    o = function (t) {
                        var e = new MouseEvent("click");
                        t.dispatchEvent(e)
                    },
                    a = /constructor/i.test(t.HTMLElement) || t.safari,
                    u = /CriOS\/[\d]+/.test(navigator.userAgent),
                    M = function (e) {
                        (t.setImmediate || t.setTimeout)(function () {
                            throw e
                        }, 0)
                    },
                    c = function (t) {
                        var e = function () {
                            "string" == typeof t ? n().revokeObjectURL(t) : t.remove()
                        };
                        setTimeout(e, 4e4)
                    },
                    s = function (t, e, n) {
                        e = [].concat(e);
                        for (var i = e.length; i--;) {
                            var r = t["on" + e[i]];
                            if ("function" == typeof r) try {
                                r.call(t, n || t)
                            } catch (t) {
                                M(t)
                            }
                        }
                    },
                    l = function (t) {
                        return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], {
                            type: t.type
                        }) : t
                    },
                    L = function (e, M, L) {
                        L || (e = l(e));
                        var g, w = this,
                            d = e.type,
                            y = "application/octet-stream" === d,
                            j = function () {
                                s(w, "writestart progress write writeend".split(" "))
                            };
                        if (w.readyState = w.INIT, r) return g = n().createObjectURL(e), void setTimeout(function () {
                            i.href = g, i.download = M, o(i), j(), c(g), w.readyState = w.DONE
                        });
                        ! function () {
                            if ((u || y && a) && t.FileReader) {
                                var i = new FileReader;
                                return i.onloadend = function () {
                                    var e = u ? i.result : i.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                                    t.open(e, "_blank") || (t.location.href = e), e = void 0, w.readyState = w.DONE, j()
                                }, i.readAsDataURL(e), void (w.readyState = w.INIT)
                            }
                            if (g || (g = n().createObjectURL(e)), y) t.location.href = g;
                            else {
                                t.open(g, "_blank") || (t.location.href = g)
                            }
                            w.readyState = w.DONE, j(), c(g)
                        }()
                    },
                    g = L.prototype,
                    w = function (t, e, n) {
                        return new L(t, e || t.name || "download", n)
                    };
                return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (t, e, n) {
                    return e = e || t.name || "download", n || (t = l(t)), navigator.msSaveOrOpenBlob(t, e)
                } : (g.abort = function () { }, g.readyState = g.INIT = 0, g.WRITING = 1, g.DONE = 2, g.error = g.onwritestart = g.onprogress = g.onwrite = g.onabort = g.onerror = g.onwriteend = null, w)
            }
        }("undefined" != typeof self && self || "undefined" != typeof window && window || commonjsGlobal.content);
        t.exports && (t.exports.saveAs = e)
    });
L.Control.EasyPrint = L.Control.extend({
    options: {
        title: "Print map",
        position: "topleft",
        sizeModes: "native",
        filename: "mymap",
        titlereport: "",
        titlereportfontsize: 0,
        titlereportmarginleft: 0,
        titlereportmargintop: 0,
        div: "null",
        divmarginleft: 0,
        divmargintop: 0,
        divwidth: 0,
        divheight: 0,
        divlogoclass: "null",
        divlogomarginleft: 0,
        divlogomargintop: 0,
        divlogowidth: 0,
        divlogoheight: 0,
        mapmarginleft: 0,
        mapmargintop: 0,
        mapwidth: 0,
        mapheight: 0
    },
    onAdd: function () {
        this.addCss();
        var t = L.DomUtil.create("div", "leaflet-control-easyPrint leaflet-bar leaflet-control");
        return L.DomEvent.addListener(t, "mouseover", this.displayPageSizeButtons, this), L.DomEvent.addListener(t, "mouseout", this.hidePageSizeButtons, this), this.link = L.DomUtil.create("a", "leaflet-control-easyPrint-button", t), this.link.id = "leafletEasyPrint", this.link.title = this.options.title, this.holder = L.DomUtil.create("ul", "easyPrintHolder", t), this.options.sizeModes.forEach(function (t) {
            var e = L.DomUtil.create("li", "easyPrintSizeMode", this.holder);
            e.title = t;
            L.DomUtil.create("a", "easyPrint" + t, e);
            L.DomEvent.addListener(e, "click", this.printPage, this)
        }, this), L.DomEvent.disableClickPropagation(t), t
    },
    createOuterContainer: function (t) {
        $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
        var e = document.createElement("div");
        return t.parentNode.insertBefore(e, t), t.parentNode.removeChild(t), e.appendChild(t), e.getElementsByClassName('leaflet-top leaflet-left')[0].style.display = "none", e.style.width = t.style.width, e.style.height = t.style.height, e.style.display = "inline-block", e.style.overflow = "hidden", e
    },
    removeOuterContainer: function (t, e, n) {
        e.getElementsByClassName('leaflet-top leaflet-left')[0].style.display = "inherit", e.parentNode.insertBefore(t, e), e.parentNode.removeChild(n), e.parentNode.removeChild(e)
    },
    printPage: function (t) {
        if (this._map.fire("beforePrint"), this.hidePageSizeButtons(), this.mapContainer = this._map.getContainer(), "easyPrintCurrentSize" === t.target.className) return void this.printOpertion();
        this.outerContainer = this.createOuterContainer(this.mapContainer), this.createImagePlaceholder(t.target.className)
    },
    createImagePlaceholder: function (t) {
        var e = this;
        domToImage.toPng(this.mapContainer).then(function (n) {
            e.blankDiv = document.createElement("div");
            var i = e.blankDiv;
            e.outerContainer.parentElement.insertBefore(i, e.outerContainer), i.className = "epHolder", i.style.backgroundImage = 'url("' + n + '")', i.style.position = "absolute", i.style.zIndex = 1011, i.style.display = "initial", i.style.width = e.mapContainer.style.width, i.style.height = e.mapContainer.style.height, e.resizeAndPrintMap(t)
        }).catch(function (t) {
            console.error("oops, something went wrong!", t)
        })
    },
    resizeAndPrintMap: function (t) {
        var e = {
            height: "715px",
            width: "1045px"
        },
            n = this.mapContainer;
        this.originalMapWidth = n.style.width, this.originalMapHeight = n.style.height, this.origCenter = this._map.getCenter(), this.origZoom = this._map.getZoom(), this.outerContainer.style.opacity = 0, "easyPrintA4Landscape" === t && (n.style.width = e.height, n.style.height = e.width), "easyPrintA4Portrait" === t && (n.style.width = e.height, n.style.height = e.width), this._map.setView(this.origCenter), this._map.setZoom(this.origZoom), this._map.invalidateSize();
        var i = this,
            r = setInterval(function () {
                i.options.tileLayer.isLoading() || (clearInterval(r), i.printOpertion())
            }, 500)
    },
    printOpertion: function () {
        var t = this;
        domToImage.toPng(t.mapContainer, {
            width: parseInt(t.mapContainer.style.width.replace("px")),
            height: parseInt(t.mapContainer.style.height.replace("px"))
        }).then(function (e) {
            var n = t.dataURItoBlob(e);
            const pdf = new jsPDF('l', 'mm', 'a4');
            pdf.setFont("helvetica");
            pdf.setFontSize(t.options.titlereportfontsize);
            pdf.text(t.options.titlereport, t.options.titlereportmarginleft, t.options.titlereportmargintop);
            pdf.addImage(e, 'png', t.options.mapmarginleft, t.options.mapmargintop, t.options.mapwidth, t.options.mapheight);

            html2canvas(document.querySelector(t.options.div), { scale: 2 }).then(canvas => {
                pdf.addImage(canvas.toDataURL('image/png'), 'png', t.options.divmarginleft, t.options.divmargintop, t.options.divwidth, t.options.divheight);
                html2canvas(document.getElementsByClassName(t.options.divlogoclass)[0], { scale: 2 }).then(canvas => {
                    pdf.addImage(canvas.toDataURL('image/png'), 'png', t.options.divlogomarginleft, t.options.divlogomargintop, t.options.divlogowidth, t.options.divlogoheight);
                    pdf.save(t.options.filename), t._map.fire("afterPrint"), t.mapContainer.style.width = t.originalMapWidth, t.mapContainer.style.height = t.originalMapHeight, t.outerContainer && (t.removeOuterContainer(t.mapContainer, t.outerContainer, t.blankDiv), t._map.invalidateSize(), t._map.setView(t.origCenter), t._map.setZoom(t.origZoom));
                    $.unblockUI();
                });  
            });

            //window.FileSaver.saveAs(n, t.options.filename + ".png"), t._map.fire("afterPrint"), t.mapContainer.style.width = t.originalMapWidth, t.mapContainer.style.height = t.originalMapHeight, t.outerContainer && (t.removeOuterContainer(t.mapContainer, t.outerContainer, t.blankDiv), t._map.invalidateSize(), t._map.setView(t.origCenter), t._map.setZoom(t.origZoom))

        }).catch(function (t) {
            console.error("Print operation failed", t)
        })
    },
    addCss: function () {
        var t = document.createElement("style");
        t.type = "text/css", t.innerHTML = ".leaflet-control-easyPrint a { \n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTI4LDMyaDI1NnY2NEgxMjhWMzJ6IE00ODAsMTI4SDMyYy0xNy42LDAtMzIsMTQuNC0zMiwzMnYxNjBjMCwxNy42LDE0LjM5OCwzMiwzMiwzMmg5NnYxMjhoMjU2VjM1Mmg5NiAgIGMxNy42LDAsMzItMTQuNCwzMi0zMlYxNjBDNTEyLDE0Mi40LDQ5Ny42LDEyOCw0ODAsMTI4eiBNMzUyLDQ0OEgxNjBWMjg4aDE5MlY0NDh6IE00ODcuMTk5LDE3NmMwLDEyLjgxMy0xMC4zODcsMjMuMi0yMy4xOTcsMjMuMiAgIGMtMTIuODEyLDAtMjMuMjAxLTEwLjM4Ny0yMy4yMDEtMjMuMnMxMC4zODktMjMuMiwyMy4xOTktMjMuMkM0NzYuODE0LDE1Mi44LDQ4Ny4xOTksMTYzLjE4Nyw0ODcuMTk5LDE3NnoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);\n      background-size: 16px 16px; \n      cursor: pointer; \n    }\n    .easyPrintHolder .easyPrintA4Landscape { \n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTcuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0MiA0NDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0MiA0NDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTM3Ni45NzcsMTA0LjIwOWMtMC4wMjQtMC4yNDUtMC4wNjYtMC40ODQtMC4xMDgtMC43MjRjLTAuMDE0LTAuMDgyLTAuMDIxLTAuMTY1LTAuMDM4LTAuMjQ2ICBjLTAuMDU4LTAuMjktMC4xMzItMC41NzQtMC4yMTUtMC44NTRjLTAuMDA5LTAuMDMtMC4wMTQtMC4wNjEtMC4wMjMtMC4wOTFjLTAuMDg3LTAuMjg1LTAuMTg5LTAuNTYzLTAuMy0wLjgzOCAgYy0wLjAxMS0wLjAyNi0wLjAxOS0wLjA1NS0wLjAzLTAuMDgxYy0wLjEwOC0wLjI2LTAuMjMxLTAuNTEzLTAuMzYtMC43NjFjLTAuMDIxLTAuMDQxLTAuMDM4LTAuMDgzLTAuMDYtMC4xMjUgIGMtMC4xMjEtMC4yMjUtMC4yNTUtMC40NDEtMC4zOTItMC42NTVjLTAuMDM5LTAuMDYyLTAuMDczLTAuMTI2LTAuMTE0LTAuMTg3Yy0wLjEzMi0wLjE5Ny0wLjI3Ny0wLjM4My0wLjQyMi0wLjU3ICBjLTAuMDU2LTAuMDcxLTAuMTA1LTAuMTQ3LTAuMTYzLTAuMjE3Yy0wLjE4MS0wLjIyLTAuMzc0LTAuNDI5LTAuNTczLTAuNjMzYy0wLjAyOS0wLjAyOS0wLjA1My0wLjA2Mi0wLjA4Mi0wLjA5MUwyNzguODkyLDIuOTI5ICBjLTAuMDI2LTAuMDI2LTAuMDU1LTAuMDQ4LTAuMDgyLTAuMDc0Yy0wLjIwNi0wLjIwMi0wLjQxOS0wLjM5OC0wLjY0Mi0wLjU4MmMtMC4wNy0wLjA1OC0wLjE0Ni0wLjEwNy0wLjIxOC0wLjE2MyAgYy0wLjE4Ni0wLjE0NS0wLjM3My0wLjI5LTAuNTY5LTAuNDIxYy0wLjA2My0wLjA0Mi0wLjEyOS0wLjA3Ny0wLjE5My0wLjExN2MtMC4yMTItMC4xMzYtMC40MjYtMC4yNjktMC42NDktMC4zODggIGMtMC4wNDQtMC4wMjQtMC4wOTEtMC4wNDItMC4xMzUtMC4wNjVjLTAuMjQ1LTAuMTI3LTAuNDk0LTAuMjQ4LTAuNzUtMC4zNTRjLTAuMDMxLTAuMDEzLTAuMDYzLTAuMDIyLTAuMDk0LTAuMDM0ICBjLTAuMjctMC4xMDktMC41NDQtMC4yMS0wLjgyNS0wLjI5NmMtMC4wMzQtMC4wMS0wLjA2OC0wLjAxNi0wLjEwMi0wLjAyNmMtMC4yNzctMC4wODEtMC41NTctMC4xNTUtMC44NDMtMC4yMTIgIGMtMC4wODQtMC4wMTctMC4xNy0wLjAyNC0wLjI1NC0wLjAzOWMtMC4yMzctMC4wNDEtMC40NzQtMC4wODMtMC43MTYtMC4xMDdDMjcyLjQ4OCwwLjAxNywyNzIuMTU1LDAsMjcxLjgyLDBINzQuOTczICBjLTUuNTIzLDAtMTAsNC40NzctMTAsMTB2NDIyYzAsNS41MjMsNC40NzcsMTAsMTAsMTBoMjkyLjA1NWM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwVjEwNS4yMDcgIEMzNzcuMDI3LDEwNC44NzMsMzc3LjAxLDEwNC41NCwzNzYuOTc3LDEwNC4yMDl6IE0yODEuODIsMzQuMTQzbDYxLjA2NSw2MS4wNjRIMjgxLjgyVjM0LjE0M3ogTTg0Ljk3Myw0MjJWMjBIMjYxLjgydjg1LjIwNyAgYzAsNS41MjMsNC40NzgsMTAsMTAsMTBoODUuMjA3VjQyMkg4NC45NzN6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo);\n      background-size: 16px 16px;\n      cursor: pointer;\n      transform: rotate(-90deg);\n    }\n    .easyPrintHolder .easyPrintA4Portrait { \n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTcuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0MiA0NDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0MiA0NDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTM3Ni45NzcsMTA0LjIwOWMtMC4wMjQtMC4yNDUtMC4wNjYtMC40ODQtMC4xMDgtMC43MjRjLTAuMDE0LTAuMDgyLTAuMDIxLTAuMTY1LTAuMDM4LTAuMjQ2ICBjLTAuMDU4LTAuMjktMC4xMzItMC41NzQtMC4yMTUtMC44NTRjLTAuMDA5LTAuMDMtMC4wMTQtMC4wNjEtMC4wMjMtMC4wOTFjLTAuMDg3LTAuMjg1LTAuMTg5LTAuNTYzLTAuMy0wLjgzOCAgYy0wLjAxMS0wLjAyNi0wLjAxOS0wLjA1NS0wLjAzLTAuMDgxYy0wLjEwOC0wLjI2LTAuMjMxLTAuNTEzLTAuMzYtMC43NjFjLTAuMDIxLTAuMDQxLTAuMDM4LTAuMDgzLTAuMDYtMC4xMjUgIGMtMC4xMjEtMC4yMjUtMC4yNTUtMC40NDEtMC4zOTItMC42NTVjLTAuMDM5LTAuMDYyLTAuMDczLTAuMTI2LTAuMTE0LTAuMTg3Yy0wLjEzMi0wLjE5Ny0wLjI3Ny0wLjM4My0wLjQyMi0wLjU3ICBjLTAuMDU2LTAuMDcxLTAuMTA1LTAuMTQ3LTAuMTYzLTAuMjE3Yy0wLjE4MS0wLjIyLTAuMzc0LTAuNDI5LTAuNTczLTAuNjMzYy0wLjAyOS0wLjAyOS0wLjA1My0wLjA2Mi0wLjA4Mi0wLjA5MUwyNzguODkyLDIuOTI5ICBjLTAuMDI2LTAuMDI2LTAuMDU1LTAuMDQ4LTAuMDgyLTAuMDc0Yy0wLjIwNi0wLjIwMi0wLjQxOS0wLjM5OC0wLjY0Mi0wLjU4MmMtMC4wNy0wLjA1OC0wLjE0Ni0wLjEwNy0wLjIxOC0wLjE2MyAgYy0wLjE4Ni0wLjE0NS0wLjM3My0wLjI5LTAuNTY5LTAuNDIxYy0wLjA2My0wLjA0Mi0wLjEyOS0wLjA3Ny0wLjE5My0wLjExN2MtMC4yMTItMC4xMzYtMC40MjYtMC4yNjktMC42NDktMC4zODggIGMtMC4wNDQtMC4wMjQtMC4wOTEtMC4wNDItMC4xMzUtMC4wNjVjLTAuMjQ1LTAuMTI3LTAuNDk0LTAuMjQ4LTAuNzUtMC4zNTRjLTAuMDMxLTAuMDEzLTAuMDYzLTAuMDIyLTAuMDk0LTAuMDM0ICBjLTAuMjctMC4xMDktMC41NDQtMC4yMS0wLjgyNS0wLjI5NmMtMC4wMzQtMC4wMS0wLjA2OC0wLjAxNi0wLjEwMi0wLjAyNmMtMC4yNzctMC4wODEtMC41NTctMC4xNTUtMC44NDMtMC4yMTIgIGMtMC4wODQtMC4wMTctMC4xNy0wLjAyNC0wLjI1NC0wLjAzOWMtMC4yMzctMC4wNDEtMC40NzQtMC4wODMtMC43MTYtMC4xMDdDMjcyLjQ4OCwwLjAxNywyNzIuMTU1LDAsMjcxLjgyLDBINzQuOTczICBjLTUuNTIzLDAtMTAsNC40NzctMTAsMTB2NDIyYzAsNS41MjMsNC40NzcsMTAsMTAsMTBoMjkyLjA1NWM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwVjEwNS4yMDcgIEMzNzcuMDI3LDEwNC44NzMsMzc3LjAxLDEwNC41NCwzNzYuOTc3LDEwNC4yMDl6IE0yODEuODIsMzQuMTQzbDYxLjA2NSw2MS4wNjRIMjgxLjgyVjM0LjE0M3ogTTg0Ljk3Myw0MjJWMjBIMjYxLjgydjg1LjIwNyAgYzAsNS41MjMsNC40NzgsMTAsMTAsMTBoODUuMjA3VjQyMkg4NC45NzN6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo);\n      background-size: 16px 16px;\n      cursor: pointer;\n    }\n    .leaflet-control-easyPrint-button{\n      display: inline-block;\n    }\n    .easyPrintHolder{\n      margin-top:-31px;\n      margin-bottom: -5px;\n      margin-left: 30px;\n      padding-left: 0px;\n      display: none;\n    }\n\n    .easyPrintSizeMode {\n      display: inline-block;\n    }\n    .easyPrintHolder .easyPrintSizeMode a {\n      border-radius: 0px;\n    }\n\n    .easyPrintHolder .easyPrintSizeMode:last-child a{\n      border-top-right-radius: 2px;\n      border-bottom-right-radius: 2px;\n    }\n\n    .easyPrintPortrait:hover, .easyPrintLandscape:hover{\n      background-color: #757570;\n      cursor: pointer;\n    }", document.body.appendChild(t)
    },
    dataURItoBlob: function (t) {
        for (var e = atob(t.split(",")[1]), n = t.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(e.length), r = new DataView(i), o = 0; o < e.length; o++) r.setUint8(o, e.charCodeAt(o));
        return new Blob([i], {
            type: n
        })
    },
    displayPageSizeButtons: function () {
        this.holder.style.display = "block", this.link.style.borderTopRightRadius = "0", this.link.style.borderBottomRightRadius = "0"
    },
    hidePageSizeButtons: function () {
        this.holder.style.display = "none", this.link.style.borderTopRightRadius = "2px", this.link.style.borderBottomRightRadius = "2px"
    }
}), L.easyPrint = function (t) {
    return new L.Control.EasyPrint(t)
};