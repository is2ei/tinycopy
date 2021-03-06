(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TinyCopy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  tinycopy - A small library for clipboard copy
 */

var TinyCopy = function () {
  function TinyCopy(trigger, target) {
    var _this = this;

    _classCallCheck(this, TinyCopy);

    if (!TinyCopy.isElement(trigger)) {
      throw new Error('Illegal arguments error: trigger');
    }
    if (!TinyCopy.isElement(target) && !TinyCopy.isText(target)) {
      throw new Error('Illegal arguments error: target');
    }

    this.listeners = {};

    var getValue = function getValue(target) {
      return TinyCopy.isText(target) ? target : target.value;
    };

    trigger.addEventListener('click', function () {
      TinyCopy.exec(getValue(target), function (err, data) {
        if (!err) {
          _this.emit('success', data);
        } else {
          _this.emit('error', err);
        }
      });
    });
  }

  _createClass(TinyCopy, [{
    key: 'on',
    value: function on(event, action) {
      this.listeners[event] = action;
      return this;
    }
  }, {
    key: 'emit',
    value: function emit(event) {
      this.listeners[event] && this.listeners[event].apply(null, [].slice.call(arguments, 1));
    }
  }], [{
    key: 'createTempElement',
    value: function createTempElement(value) {
      var element = document.createElement('input');
      element.style.opacity = '0';
      element.setAttribute('readonly', '');
      element.value = value;
      return element;
    }
  }, {
    key: 'exec',
    value: function exec(value, callback) {
      var temp = TinyCopy.createTempElement(value);
      document.body.appendChild(temp);
      temp.select();
      try {
        if (document.execCommand('copy')) {
          callback(null, value);
        } else {
          callback(new Error('Not supported the execCommand.'), null);
        }
      } catch (e) {
        callback(new Error('Not supported the execCommand.'), null);
      } finally {
        document.body.removeChild(temp);
      }
    }
  }, {
    key: 'isElement',
    value: function isElement(node) {
      return !!(node && (node.nodeName || node.prop && node.attr && node.find));
    }
  }, {
    key: 'isText',
    value: function isText(obj) {
      return TinyCopy.is('String', obj) || TinyCopy.is('Number', obj);
    }
  }, {
    key: 'is',
    value: function is(type, obj) {
      var clazz = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== undefined && obj !== null && clazz === type;
    }
  }]);

  return TinyCopy;
}();

exports.default = TinyCopy;
module.exports = exports['default'];
},{}]},{},[1])(1)
});