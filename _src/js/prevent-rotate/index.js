(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define([
            "exports"
        ], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {
            }
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function(_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.PreventOrientation = void 0;
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    var PreventOrientation = function() {
        "use strict";
        function PreventOrientation(param) {
            var ref = param === void 0 ? {
            } : param, _text = ref.text, text = _text === void 0 ? 'Sorry, this device orientation is not supported' : _text, _color = ref.color, color = _color === void 0 ? 'rgb(90, 90, 90)' : _color, _background = ref.background, background = _background === void 0 ? 'linear-gradient(to right, rgb(255, 175, 189), rgb(255, 195, 160))' : _background, _fontSize = ref.fontSize, fontSize = _fontSize === void 0 ? '1.2rem' : _fontSize;
            _classCallCheck(this, PreventOrientation);
            this.angle = 0;
            this.className = 'wrapper-prevent-orientation';
            this.handlePrevent = (function() {
                var container = document.createElement('div');
                var text1 = document.createElement('p');
                container.className = this.className;
                text1.className = "iconize-text"
                if (this.angle === this.currentAngle) {
                    Object.assign(container.style, {
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        left: 0,
                        top: 0,
                        zIndex: 99999998,
                        color: this.color,
                        background: this.background
                    });
                    Object.assign(text1.style, {
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center',
                        top: '50%',
                        fontSize: this.fontSize,
                        transform: 'translateY(-50%)',
                        padding: '0 5px'
                    });
                    text1.innerHTML = this.text;
                    container.appendChild(text1);
                    document.body.appendChild(container);
                } else {
                    try {
                        Array.prototype.forEach.call(document.querySelectorAll('.' + this.className), function(node) {
                            node.parentNode.removeChild(node);
                        });
                    } catch (e) {
                    }
                }
            }).bind(this);
            this.preventOrientationToAngle = (function(angle) {
                this.angle = angle;
                this.handlePrevent();
                window.addEventListener(this.supportsOrientationChange, this.handlePrevent);
            }).bind(this);
            this.preventPortrait = (function() {
                return this.preventOrientationToAngle(0);
            }).bind(this);
            this.preventLandscape = (function() {
                return this.preventOrientationToAngle(90);
            }).bind(this);
            this.text = text;
            this.color = color;
            this.background = background;
            this.fontSize = fontSize;
        }
        _createClass(PreventOrientation, [
            {
                key: "currentAngle",
                get: function get() {
                    try {
                        return screen.orientation.angle;
                    } catch (e) {
                        return window.orientation;
                    }
                }
            },
            {
                key: "supportsOrientationChange",
                get: function get() {
                    return 'onorientationchange' in window ? 'orientationchange' : 'resize';
                }
            }
        ]);
        return PreventOrientation;
    }();
    _exports.PreventOrientation = PreventOrientation;
    if (typeof window !== 'undefined') {
        window.PreventOrientation = PreventOrientation;
    }
});
