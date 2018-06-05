var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
!(function (g) {
    "use strict";
    if (!document.head) {
        document.head = document.getElementsByTagName('head')[0];
    }
    /**
     * @param {String} obj
     */
    var isString = function (obj) { return (typeof '' === typeof obj); };
    /**
     * @param {Array} obj
     */
    var isArray = function (obj) { return (obj.length != null && obj.push === Array.prototype.push); };
    /**
     * @param {()=>any} obj
     */
    var isFunction = function (obj) { return (typeof parseInt === typeof obj); };
    /**
     * convert relative url to absolute url
     * @param {String} url
     * @return {String}
     */
    var canonicalize = function (url) {
        var div = document.createElement('div');
        div.innerHTML = "<a></a>";
        div.firstChild.href = url; // Ensures that the href is properly escaped
        div.innerHTML = div.innerHTML; // Run the current innerHTML back through the parser
        return div.firstChild.href;
    };
    /**
     * @typedef {Object} Module
     * @property {Object} exports
     * @property {_Mod} _mod
     *
     * @typedef {Object} _Mod
     * @property {String} name
     * @property {String} url
     * @property {*[]} dep
     * @property {*} factory
     */
    /**
     * modules, each of which has inited
     * @type {Module[]}
    */
    var moduleArray = [];
    /**
     * load amd module from src
     * @param {String} src
     */
    var requireModule = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var loadedMod, out, moduleFactory, out_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src = canonicalize(src);
                        loadedMod = moduleArray.find(function (i) { return i._mod.url === src; });
                        if (!loadedMod) return [3 /*break*/, 1];
                        out = loadedMod.exports;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, loadAMDFile(src)];
                    case 2:
                        moduleFactory = (_a.sent()).moduleFactory;
                        if (!isFunction(moduleFactory._mod.factory)) {
                            out_1 = moduleFactory._mod.factory;
                            moduleFactory._mod.factory = function () { return out_1; };
                        }
                        if (moduleFactory._mod.dep) {
                            out = moduleFactory._mod.factory();
                        }
                        else {
                            out = moduleFactory._mod.factory(function () {
                                throw new Error('require is not supported!');
                            }, moduleFactory.exports, moduleFactory);
                            if (out === undefined)
                                out = moduleFactory.exports;
                        }
                        moduleFactory.exports = out;
                        delete moduleFactory._mod.factory;
                        moduleArray.push(moduleFactory);
                        _a.label = 3;
                    case 3:
                        console.log(moduleArray);
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * append js file to document
     * @see {@link https://pie.gd/test/script-link-events/}
     * @param {String} src
     * @param {(this:HTMLScriptElement,e:Event)=>} onload
     * @param {(this:HTMLScriptElement,e:Event)=>} onerror
     */
    var loadScriptFile = function (src, onload, onerror) {
        var scriptTag = document.createElement('script');
        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.type = 'text/javascript';
        scriptTag.charset = 'UTF-8';
        if ('onload' in scriptTag) {
            scriptTag.onload = onload;
            scriptTag.onerror = onerror;
            scriptTag.src = src;
            document.head.appendChild(scriptTag);
        }
        else if ('onreadystatechange' in scriptTag) {
            scriptTag.onreadystatechange = function (ev) {
                /**
                 * @see {@link https://stackoverflow.com/questions/6946631/dynamically-creating-script-readystate-never-complete/}
                 */
                var beforeState = this.readyState;
                scriptTag.children; //ie hack
                var afterState = this.readyState;
                if (beforeState === afterState) {
                    if (!ev)
                        ev = event;
                    document.head.appendChild(scriptTag);
                    if (afterState === 'loaded' || afterState === 'complete') {
                        onload.call(this, ev);
                    }
                    else {
                        onerror.call(this, ev);
                    }
                }
            };
            scriptTag.src = src;
        }
    };
    /**
     * load amd, get the factory function
     * @param {String} src
     * @return {Promise<{event:Event,scriptTag:HTMLScriptElement,moduleFactory:Module}>}
     */
    var loadAMDFile = function (src) {
        return new Promise(function (resolve, reject) {
            loadScriptFile(src, function (event) {
                document.head.removeChild(this);
                /**
                 * @type {Module}
                 */
                var moduleFactory = {
                    exports: {},
                    _mod: current_mod || {
                        factory: function () { return null; }
                    }
                };
                current_mod = null;
                moduleFactory._mod.url = src;
                if (!moduleFactory._mod.name)
                    moduleFactory._mod.name = src;
                resolve({
                    event: event,
                    scriptTag: this,
                    moduleFactory: moduleFactory
                });
            }, function (event) {
                document.head.removeChild(this);
                reject(new Error("Failed to load: " + src));
            });
        });
    };
    /*
        define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
            exports.verb = function() {
                return beta.verb();
                //Or:
                return require("beta").verb();
            }
        });

        define(function (require, exports, module) {
            var a = require('a'),
                b = require('b');

            exports.action = function () {};
        });
    */
    /**
     * module which has not inited yet, has a factory function
     * @type {_Mod}
     */
    var current_mod;
    var define = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /**@type {Module} */
        var _mod = {
            name: '',
            url: '',
            dep: null,
            factory: null
        };
        var arg = args.shift();
        if (isString(arg)) {
            _mod.name = arg;
            arg = args.shift();
        }
        if (isArray(arg)) {
            _mod.dep = arg;
            arg = args.shift();
        }
        if (isFunction(arg)) {
            _mod.factory = arg;
        }
        current_mod = _mod;
    };
    define.amd = {};
    g.requireModule = requireModule;
    requireModule.loadScriptFile = loadScriptFile;
    g.define = define;
})(this);
