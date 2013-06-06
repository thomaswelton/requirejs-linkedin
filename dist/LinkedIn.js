(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  requirejs.config({
    paths: {
      "LinkedInSrc": '//platform.linkedin.com/in.js?async=true'
    },
    shim: {
      "LinkedInSrc": {
        exports: 'IN'
      }
    }
  });

  define(['EventEmitter', 'module'], function(EventEmitter, module) {
    var LinkedIn;
    LinkedIn = (function(_super) {
      __extends(LinkedIn, _super);

      function LinkedIn(config) {
        this.config = config;
        this.share = __bind(this.share, this);
        this.onReady = __bind(this.onReady, this);
        this.injectScript = __bind(this.injectScript, this);
        LinkedIn.__super__.constructor.call(this);
        this.injectScript();
        this.once('inInit', function(IN) {
          return IN.parse();
        });
      }

      LinkedIn.prototype.injectScript = function() {
        var _this = this;
        return requirejs(['LinkedInSrc'], function(IN) {
          var initFuncName;
          initFuncName = 'onLinkedInInit' + (new Date().getTime());
          window[initFuncName] = function() {
            _this.IN = IN;
            return _this.fireEvent('inInit', IN);
          };
          return IN.init({
            onLoad: initFuncName,
            deferParse: true,
            locale: 'en_GB'
          });
        });
      };

      LinkedIn.prototype.onReady = function(callback) {
        var _this = this;
        if (callback == null) {
          callback = this.cb;
        }
        if (this.IN != null) {
          return callback(this.IN);
        } else {
          return this.once('inInit', function() {
            return callback(_this.IN);
          });
        }
      };

      LinkedIn.prototype.renderPlugins = function(cb) {
        if (cb == null) {
          cb = this.cb;
        }
        return this.onReady(function(IN) {
          return IN.parse();
        });
      };

      LinkedIn.prototype.share = function(params) {
        var _this = this;
        return this.onReady(function(IN) {
          return IN.UI.Share().params(params).place();
        });
      };

      return LinkedIn;

    })(EventEmitter);
    return new LinkedIn(module.config());
  });

}).call(this);
