require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"NavbarComponent":[function(require,module,exports){

/*
	 * USING NAVBARCOMPONENT

	 * Require the module
	NavbarComponent = require "NavbarComponent"

	myNavbar = new NavbarComponent
		 * General
		style: <string> ("light" || "dark")
		size: <string> ("large" || "small")
		title: <string>

		 * Buttons
		buttonCount: <number>
		buttonSize: <number>
		buttonActions: <array of actions>
		imagePrefix: <string>
		imageSuffix: <string>
		backAction: <action>

		 * Search bar
		searchLabel: <string>
		search: <boolean>
		dictation: <boolean>

		 * Colors
		textColor: <string> (hex or rgba)
		backgroundColor: <string> (hex or rgba)
		searchBarColor: <string> (hex or rgba)
		searchIconColor: <string> (hex or rgba)
		accentColor: <string> (hex or rgba)

	 * Attach to a FlowComponent or ScrollComponent
	myNavbar.scrollWith(layer)

	 * Navigate to next title
	myNavbar.showNext(<string>)

	 * Navigate to previous title
	myNavbar.showPrevious()

	 * Current search field value
	myNavbar.search

	 * Inspect the stored titles
	myNavbar.history
 */
var NavbarComponent, defaults,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaults = {
  buttonCount: 0,
  title: "Large Title",
  searchLabel: "Search",
  style: "light",
  size: "large",
  search: false,
  dictation: false,
  textColor: "",
  backgroundColor: "",
  searchBarColor: "",
  searchIconColor: "#8E8E93",
  buttonSize: 24,
  accentColor: "#007AFF",
  imagePrefix: "",
  imageSuffix: "png",
  buttonActions: [],
  backAction: function() {}
};

NavbarComponent = (function(superClass) {
  extend(NavbarComponent, superClass);

  function NavbarComponent(options) {
    var animateToNextTitle, animateToPreviousTitle, chevronSVG, defaultAnimationDuration, dictationSVG, displayBackButton, heights, inputCSS, margins, noop, resetTitle, scrollThresholds, searchSVG, sizeTextLayer;
    this.options = options != null ? options : {};
    this.options = _.assign({}, defaults, this.options);
    NavbarComponent.__super__.constructor.call(this, this.options);
    noop = function() {};
    this.history = [this.options.title];
    this.navLevel = 0;
    defaultAnimationDuration = 0.25;
    sizeTextLayer = function(layer) {
      var ratio, style, textWidth;
      style = _.pick(layer.style, TextLayer._textProperties);
      textWidth = Math.ceil(Utils.textSize(layer.text, style).width);
      ratio = _.includes(Framer.Device.deviceType, "plus") ? 3 : 2;
      return layer.width = textWidth / ratio;
    };
    heights = {
      small: 64,
      large: 116,
      search: 54
    };
    scrollThresholds = {
      titleScaleThreshold: 70
    };
    margins = {
      side: 14
    };
    chevronSVG = "<svg xmlns='http://www.w3.org/2000/svg'><polygon points='0 10.5 10.5 0 12.5 2 4 10.5 12.5 19 10.5 21' fill='" + this.options.accentColor + "' /></svg>";
    searchSVG = "<svg xmlns='http://www.w3.org/2000/svg'><path d='m13.74309,12.57406l-3.833,-3.8345c0.68708,-0.9371 1.05514,-2.07003 1.05,-3.232c-0.01311,-3.03315 -2.46637,-5.48999 -5.4995,-5.5075c-1.45152,-0.00657 -2.84537,0.56765 -3.87106,1.59475c-1.02568,1.02709 -1.59799,2.42174 -1.58944,3.87325c0.01311,3.03342 2.46661,5.49048 5.5,5.508c1.16671,0.00505 2.30378,-0.3673 3.2415,-1.0615l0.004,-0.003l3.8295,3.8315c0.20705,0.21721 0.51557,0.30513 0.80602,0.2297c0.29045,-0.07544 0.51719,-0.30237 0.59238,-0.59289c0.07518,-0.29051 -0.013,-0.59895 -0.2304,-0.80581l0,0zm-8.247,-2.696c-2.42658,-0.01396 -4.38934,-1.9794 -4.4,-4.406c-0.00654,-1.16106 0.45134,-2.27655 1.27173,-3.09817c0.8204,-0.82161 1.93521,-1.28116 3.09627,-1.27633c2.42659,0.01395 4.38935,1.97939 4.4,4.406c0.00655,1.16105 -0.45133,2.27655 -1.27173,3.09816c-0.82039,0.82161 -1.9352,1.28116 -3.09627,1.27634z' fill='" + this.options.searchIconColor + "' /></svg>";
    dictationSVG = "<svg xmlns='http://www.w3.org/2000/svg'><path d='M6,0 L6,0 C7.65685425,0 9,1.34314575 9,3 L9,10 C9,11.6568542 7.65685425,13 6,13 L6,13 C4.34314575,13 3,11.6568542 3,10 L3,3 C3,1.34314575 4.34314575,0 6,0 Z M11.25,6.5 C10.8357864,6.5 10.5,6.83578644 10.5,7.25 L10.5,10 C10.5,12.4852814 8.48528137,14.5 6,14.5 C3.51471863,14.5 1.5,12.4852814 1.5,10 L1.5,7.25 C1.5,6.83578644 1.16421356,6.5 0.75,6.5 C0.335786438,6.5 0,6.83578644 0,7.25 L0,10 C0.00148134437,13.0225955 2.25111105,15.5721759 5.25,15.95 L5.25,17.5 L3.25,17.5 C2.83578644,17.5 2.5,17.8357864 2.5,18.25 C2.5,18.6642136 2.83578644,19 3.25,19 L8.75,19 C9.16421356,19 9.5,18.6642136 9.5,18.25 C9.5,17.8357864 9.16421356,17.5 8.75,17.5 L6.75,17.5 L6.75,15.95 C9.74888895,15.5721759 11.9985187,13.0225955 12,10 L12,7.25 C12,6.83578644 11.6642136,6.5 11.25,6.5 L11.25,6.5 Z' fill='" + this.options.searchIconColor + "' /></svg>";
    if (this.options.textColor === "") {
      this.options.textColor = (function() {
        switch (this.options.style) {
          case "dark":
            return "white";
          default:
            return "black";
        }
      }).call(this);
    }
    if (this.options.backgroundColor === "") {
      this.options.backgroundColor = (function() {
        switch (this.options.style) {
          case "dark":
            return "hsla(0, 0%, 11%, 0.72)";
          default:
            return "hsla(0, 0%, 97%, 0.82)";
        }
      }).call(this);
    }
    if (this.options.searchBarColor === "") {
      this.options.searchBarColor = (function() {
        switch (this.options.style) {
          case "dark":
            return "hsla(240, 2%, 57%, 0.14)";
          default:
            return "hsla(240, 2%, 57%, 0.12)";
        }
      }).call(this);
    }
    inputCSS = "input[type='text'] {\n  appearance: none;\n  color: " + this.options.textColor + ";\n  border: none;\n  outline: none;\n  background-color: transparent;\n  font-family: -apple-system, Helvetica, Arial, sans-serif;\n  font-weight: 500;\n  text-align: left;\n  font-size: 17px;\n  margin: 0;\n  padding: 0;\n  width: 100px;\n  height: 36px;\n  position: relative;\n  top: 0;\n}";
    Utils.insertCSS(inputCSS);
    this.layout = (function(_this) {
      return function() {
        var backButton, backLabel, bkgd, chevron, clippingFrame, dictationIcon, fn, i, icon, iconFrame, j, k, layer, len, ref, ref1, searchBar, searchBarClip, searchIcon, searchText, smallTitle, title, titleClip;
        ref = _this.children;
        for (j = 0, len = ref.length; j < len; j++) {
          layer = ref[j];
          layer.destroy();
        }
        _this.width = Screen.width;
        _this.height = heights[_this.options.size] + _this.options.search * heights.search;
        _this.backgroundColor = "clear";
        bkgd = new Layer({
          parent: _this,
          width: Screen.width,
          height: _this.height + Screen.height,
          y: Align.bottom,
          backgroundColor: _this.options.backgroundColor,
          shadowY: 0.5,
          shadowBlur: 0,
          shadowColor: "rgba(0,0,0,0.28)",
          style: {
            "-webkit-backdrop-filter": "blur(60px)"
          }
        });
        _this.bkgd = bkgd;
        clippingFrame = new Layer({
          parent: _this,
          width: Screen.width,
          height: _this.height,
          backgroundColor: "clear",
          clip: true
        });
        _this.clippingFrame = clippingFrame;
        fn = function(i) {
          var reversedIndex;
          reversedIndex = _this.options.buttonCount - 1 - i;
          if (_this.options.buttonActions[reversedIndex] !== noop && _this.options.buttonActions[reversedIndex] !== void 0) {
            return iconFrame.onClick(function() {
              return _this.options.buttonActions[reversedIndex]();
            });
          }
        };
        for (i = k = 0, ref1 = _this.options.buttonCount; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
          iconFrame = new Layer({
            parent: clippingFrame,
            name: "iconFrame" + i,
            width: 28,
            height: 28,
            x: Align.right(-11 - (39 * i)),
            y: 29,
            backgroundColor: "clear"
          });
          fn(i);
          icon = new Layer({
            parent: iconFrame,
            name: "icon" + i,
            backgroundColor: "clear",
            width: _this.options.buttonSize,
            height: _this.options.buttonSize,
            x: Align.center,
            y: Align.center,
            image: "images/" + _this.options.imagePrefix + i + "." + _this.options.imageSuffix
          });
        }
        titleClip = new Layer({
          parent: clippingFrame,
          y: heights.small,
          width: Screen.width,
          height: heights[_this.options.size] - heights.small,
          backgroundColor: "clear",
          clip: true
        });
        _this.titleClip = titleClip;
        title = new TextLayer({
          parent: titleClip,
          x: margins.side,
          y: 2,
          fontSize: 34,
          fontWeight: 700,
          color: _this.options.textColor,
          text: _this.options.title,
          originX: 0
        });
        _this.title = title;
        chevron = new Layer({
          parent: clippingFrame,
          x: 7.5,
          y: 12.5,
          width: 13,
          height: 22,
          backgroundColor: "clear",
          html: chevronSVG
        });
        backLabel = new TextLayer({
          parent: clippingFrame,
          x: 26,
          y: 12,
          color: _this.options.accentColor,
          fontSize: 17,
          fontWeight: 500,
          text: ""
        });
        _this.backLabel = backLabel;
        smallTitle = new TextLayer({
          parent: clippingFrame,
          y: 32,
          color: _this.options.textColor,
          fontSize: 17,
          fontWeight: 500,
          text: _this.options.title,
          opacity: _this.options.size === "small" ? 1 : 0
        });
        sizeTextLayer(smallTitle);
        smallTitle.x = Align.center;
        smallTitle.autoWidth = true;
        _this.smallTitle = smallTitle;
        backButton = new Layer({
          parent: clippingFrame,
          y: 20,
          width: Screen.width / 2,
          height: heights.small - 20,
          backgroundColor: "clear"
        });
        backButton.placeBefore(bkgd);
        _this.backButton = backButton;
        chevron.parent = backButton;
        backLabel.parent = backButton;
        backButton.states = {
          show: {
            opacity: 1,
            animationOptions: {
              time: defaultAnimationDuration
            }
          },
          hide: {
            opacity: 0,
            animationOptions: {
              time: defaultAnimationDuration
            }
          }
        };
        backButton.animate("hide", {
          instant: true
        });
        if (_this.options.backAction !== noop) {
          backButton.onClick(function() {
            return _this.options.backAction();
          });
        }
        if (_this.options.search === true) {
          searchBarClip = new Layer({
            parent: clippingFrame,
            y: Align.bottom,
            width: Screen.width,
            height: heights.search,
            backgroundColor: "clear",
            clip: true
          });
          searchBar = new Layer({
            parent: searchBarClip,
            x: 8,
            y: Align.bottom(-16),
            width: _this.width - 16,
            height: 36,
            borderRadius: 10,
            backgroundColor: _this.options.searchBarColor
          });
          _this.searchBar = searchBar;
          searchBar.onTap(function() {});
          searchIcon = new Layer({
            parent: searchBar,
            x: 10,
            y: 11,
            width: 14,
            height: 14,
            backgroundColor: "clear",
            html: searchSVG
          });
          searchText = new Layer({
            parent: searchBar,
            x: searchIcon.maxX + 7,
            width: searchBar.width - 58,
            height: searchBar.height,
            backgroundColor: "clear",
            html: "<input id='search' type='text' contenteditable='true' placeholder='" + _this.options.searchLabel + "'>"
          });
          _this.searchText = searchText;
          if (_this.options.dictation === true) {
            return dictationIcon = new Layer({
              parent: searchBar,
              x: Align.right(-10),
              y: 9,
              width: 12,
              height: 19,
              backgroundColor: "clear",
              html: dictationSVG
            });
          }
        }
      };
    })(this);
    this.layout();
    this.scrollWith = (function(_this) {
      return function(layer) {
        var enforceScrollMatching, minNavBarHeight, ref, ref1, ref2, scroll, searchBarHeight, searchBarShift, searchBarY, smallNavBarHeight, titleHeight, titleMoveStart;
        scroll = null;
        minNavBarHeight = heights[_this.options.size];
        smallNavBarHeight = heights.small;
        searchBarHeight = heights.searchBar;
        searchBarY = ((ref = _this.searchBar) != null ? ref.y : void 0) || 0;
        searchBarShift = ((ref1 = _this.searchBar) != null ? ref1.y : void 0) - 16 - ((ref2 = _this.searchBar) != null ? ref2.height : void 0) / 2 || 0;
        titleMoveStart = heights.small * _this.options.search;
        titleHeight = heights[_this.options.size] - heights.small;
        enforceScrollMatching = false;
        if (layer instanceof FlowComponent) {
          scroll = layer.scroll;
        } else if (layer instanceof ScrollComponent) {
          scroll = layer;
        }
        if (scroll !== null && scroll !== void 0) {
          return scroll.onMove(function() {
            var maxNavBarHeight, ref3, ref4;
            maxNavBarHeight = 0;
            if (_this.navLevel > 0) {
              maxNavBarHeight = heights.small;
            } else if (_this.options.search === true) {
              maxNavBarHeight = heights[_this.options.size] + heights.search;
            } else {
              maxNavBarHeight = heights[_this.options.size];
            }
            _this.title.scale = Utils.modulate(scroll.scrollY, [0, -scrollThresholds.titleScaleThreshold], [1, 1.1], true);
            _this.clippingFrame.height = Utils.modulate(scroll.scrollY, [0, minNavBarHeight], [maxNavBarHeight, smallNavBarHeight], true);
            _this.clippingFrame.y = Math.max(0, -scroll.scrollY);
            _this.bkgd.y = Math.max(-Screen.height, -scroll.scrollY - Screen.height);
            _this.title.y = Utils.modulate(scroll.scrollY, [titleMoveStart, minNavBarHeight], [2, -titleHeight], true);
            _this.bkgd.height = Utils.modulate(scroll.scrollY, [0, minNavBarHeight], [maxNavBarHeight, smallNavBarHeight], true) + Screen.height;
            if ((ref3 = _this.searchBar) != null) {
              ref3.opacity = Utils.modulate(scroll.scrollY, [0, smallNavBarHeight], [1, 0], true);
            }
            if ((ref4 = _this.searchBar) != null) {
              ref4.y = Utils.modulate(scroll.scrollY, [0, smallNavBarHeight], [searchBarY, searchBarShift], true);
            }
            if (_this.options.size === "large" && _this.navLevel === 0) {
              return _this.smallTitle.opacity = Utils.modulate(_this.title.y, [2 - titleHeight / 2, -titleHeight], [0, 1], true);
            }
          });
        }
      };
    })(this);
    resetTitle = (function(_this) {
      return function() {
        if (_this.navLevel === 1) {
          _this.bkgd.height = _this.height + Screen.height;
          _this.bkgd.y = Align.bottom;
          _this.title.scale = 1;
          _this.title.y = 2;
          _this.searchBar.y = Align.bottom(-16);
          _this.searchBar.opacity = 1;
          _this.clippingFrame.height = _this.height;
          return _this.clippingFrame.y = 0;
        }
      };
    })(this);
    animateToNextTitle = (function(_this) {
      return function(newTitle, oldTitle, titleLayer) {
        var tempLabel;
        if (newTitle == null) {
          newTitle = "";
        }
        if (oldTitle == null) {
          oldTitle = "";
        }
        if (titleLayer == null) {
          titleLayer = _this.title;
        }
        _this.smallTitle.opacity = 0;
        _this.title.opacity = 0;
        _this.backLabel.opacity = 0;
        titleLayer.opacity = 0;
        tempLabel = titleLayer.copy();
        tempLabel.opacity = 1;
        tempLabel.screenFrame = titleLayer.screenFrame;
        tempLabel.parent = _this.clippingFrame;
        tempLabel.x = titleLayer.screenFrame.x;
        tempLabel.y = titleLayer.screenFrame.y;
        tempLabel.text = oldTitle;
        tempLabel.animate({
          x: _this.backLabel.screenFrame.x,
          y: _this.backLabel.screenFrame.y,
          color: _this.options.accentColor,
          fontSize: 17,
          fontWeight: 500,
          options: {
            time: defaultAnimationDuration
          }
        });
        _this.backLabel.animate({
          opacity: 0,
          options: {
            time: defaultAnimationDuration - 0.05
          }
        });
        _this.smallTitle.text = newTitle;
        _this.smallTitle.animate({
          opacity: 1,
          options: {
            time: defaultAnimationDuration
          }
        });
        return tempLabel.onAnimationEnd(function() {
          _this.backLabel.text = oldTitle;
          _this.backLabel.width = Screen.width - margins.side * 2;
          _this.backLabel.opacity = 1;
          return Utils.delay(defaultAnimationDuration, function() {
            return tempLabel.destroy();
          });
        });
      };
    })(this);
    animateToPreviousTitle = (function(_this) {
      return function(prevBackLabel, currentBackLabel, titleLayer) {
        var tempTitle;
        if (prevBackLabel == null) {
          prevBackLabel = "";
        }
        if (currentBackLabel == null) {
          currentBackLabel = "";
        }
        if (titleLayer == null) {
          titleLayer = _this.title;
        }
        resetTitle();
        _this.title.opacity = 0;
        _this.smallTitle.opacity = 0;
        _this.backLabel.opacity = 0;
        tempTitle = _this.backLabel.copy();
        tempTitle.opacity = 1;
        tempTitle.screenFrame = _this.backLabel.screenFrame;
        tempTitle.parent = _this.clippingFrame;
        tempTitle.animate({
          x: titleLayer.screenFrame.x,
          y: titleLayer.screenFrame.y,
          color: _this.options.textColor,
          fontSize: titleLayer.fontSize,
          fontWeight: titleLayer.fontWeight,
          opacity: 1,
          options: {
            time: defaultAnimationDuration
          }
        });
        _this.backLabel.text = prevBackLabel;
        _this.backLabel.animate({
          opacity: 1,
          options: {
            time: defaultAnimationDuration
          }
        });
        return tempTitle.onAnimationEnd(function() {
          _this.title.text = currentBackLabel;
          _this.smallTitle.text = currentBackLabel;
          titleLayer.opacity = 1;
          return Utils.delay(defaultAnimationDuration, function() {
            return tempTitle.destroy();
          });
        });
      };
    })(this);
    this.showNext = Utils.throttle(0.5, (function(_this) {
      return function(newTitle) {
        if (newTitle == null) {
          newTitle = "New Title";
        }
        _this.history.splice(_this.navLevel + 1, 1, newTitle);
        if (_this.navLevel === 0 && _this.options.size === "large") {
          animateToNextTitle(newTitle, _this.history[_this.navLevel], _this.title);
        } else {
          animateToNextTitle(newTitle, _this.history[_this.navLevel], _this.smallTitle);
        }
        _this.clippingFrame.animate({
          height: heights.small,
          options: {
            time: defaultAnimationDuration
          }
        });
        _this.bkgd.animate({
          height: heights.small + Screen.height,
          options: {
            time: defaultAnimationDuration
          }
        });
        ++_this.navLevel;
        return displayBackButton();
      };
    })(this));
    this.showPrevious = Utils.throttle(0.5, (function(_this) {
      return function() {
        if (_this.navLevel > 0) {
          if (_this.navLevel === 1 && _this.options.size === "large") {
            animateToPreviousTitle(_this.history[_this.navLevel - 2], _this.history[_this.navLevel - 1], _this.title);
            _this.clippingFrame.animate({
              height: heights[_this.options.size] + _this.options.search * heights.search,
              options: {
                time: defaultAnimationDuration
              }
            });
            _this.bkgd.animate({
              height: heights[_this.options.size] + Screen.height + _this.options.search * heights.search,
              options: {
                time: defaultAnimationDuration
              }
            });
          } else {
            animateToPreviousTitle(_this.history[_this.navLevel - 2], _this.history[_this.navLevel - 1], _this.smallTitle);
          }
          _this.navLevel = Math.max(0, _this.navLevel - 1);
          return displayBackButton();
        }
      };
    })(this));
    displayBackButton = (function(_this) {
      return function() {
        if (_this.navLevel === 0) {
          return _this.backButton.animate("hide");
        } else {
          return _this.backButton.animate("show");
        }
      };
    })(this);
    if (Utils.isMobile()) {
      window.addEventListener("orientationchange", (function(_this) {
        return function() {
          return _this.layout();
        };
      })(this));
    } else {
      Framer.Device.on("change:orientation", (function(_this) {
        return function() {
          return _this.layout();
        };
      })(this));
    }
  }

  NavbarComponent.define('search', {
    get: function() {
      return document.getElementById('search').value;
    }
  });

  return NavbarComponent;

})(Layer);

module.exports = NavbarComponent;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvTmF2YmFyQ29tcG9uZW50LmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyMjXG5cdCMgVVNJTkcgTkFWQkFSQ09NUE9ORU5UXG5cblx0IyBSZXF1aXJlIHRoZSBtb2R1bGVcblx0TmF2YmFyQ29tcG9uZW50ID0gcmVxdWlyZSBcIk5hdmJhckNvbXBvbmVudFwiXG5cblx0bXlOYXZiYXIgPSBuZXcgTmF2YmFyQ29tcG9uZW50XG5cdFx0IyBHZW5lcmFsXG5cdFx0c3R5bGU6IDxzdHJpbmc+IChcImxpZ2h0XCIgfHwgXCJkYXJrXCIpXG5cdFx0c2l6ZTogPHN0cmluZz4gKFwibGFyZ2VcIiB8fCBcInNtYWxsXCIpXG5cdFx0dGl0bGU6IDxzdHJpbmc+XG5cblx0XHQjIEJ1dHRvbnNcblx0XHRidXR0b25Db3VudDogPG51bWJlcj5cblx0XHRidXR0b25TaXplOiA8bnVtYmVyPlxuXHRcdGJ1dHRvbkFjdGlvbnM6IDxhcnJheSBvZiBhY3Rpb25zPlxuXHRcdGltYWdlUHJlZml4OiA8c3RyaW5nPlxuXHRcdGltYWdlU3VmZml4OiA8c3RyaW5nPlxuXHRcdGJhY2tBY3Rpb246IDxhY3Rpb24+XG5cblx0XHQjIFNlYXJjaCBiYXJcblx0XHRzZWFyY2hMYWJlbDogPHN0cmluZz5cblx0XHRzZWFyY2g6IDxib29sZWFuPlxuXHRcdGRpY3RhdGlvbjogPGJvb2xlYW4+XG5cblx0XHQjIENvbG9yc1xuXHRcdHRleHRDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdGJhY2tncm91bmRDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdHNlYXJjaEJhckNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0c2VhcmNoSWNvbkNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0YWNjZW50Q29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblxuXHQjIEF0dGFjaCB0byBhIEZsb3dDb21wb25lbnQgb3IgU2Nyb2xsQ29tcG9uZW50XG5cdG15TmF2YmFyLnNjcm9sbFdpdGgobGF5ZXIpXG5cblx0IyBOYXZpZ2F0ZSB0byBuZXh0IHRpdGxlXG5cdG15TmF2YmFyLnNob3dOZXh0KDxzdHJpbmc+KVxuXG5cdCMgTmF2aWdhdGUgdG8gcHJldmlvdXMgdGl0bGVcblx0bXlOYXZiYXIuc2hvd1ByZXZpb3VzKClcblxuXHQjIEN1cnJlbnQgc2VhcmNoIGZpZWxkIHZhbHVlXG5cdG15TmF2YmFyLnNlYXJjaFxuXG5cdCMgSW5zcGVjdCB0aGUgc3RvcmVkIHRpdGxlc1xuXHRteU5hdmJhci5oaXN0b3J5XG4jIyNcblxuZGVmYXVsdHMgPVxuXHRidXR0b25Db3VudDogMFxuXHR0aXRsZTogXCJMYXJnZSBUaXRsZVwiXG5cdHNlYXJjaExhYmVsOiBcIlNlYXJjaFwiXG5cdHN0eWxlOiBcImxpZ2h0XCJcblx0c2l6ZTogXCJsYXJnZVwiXG5cdHNlYXJjaDogZmFsc2Vcblx0ZGljdGF0aW9uOiBmYWxzZVxuXHR0ZXh0Q29sb3I6IFwiXCJcblx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdHNlYXJjaEJhckNvbG9yOiBcIlwiXG5cdHNlYXJjaEljb25Db2xvcjogXCIjOEU4RTkzXCJcblx0YnV0dG9uU2l6ZTogMjRcblx0YWNjZW50Q29sb3I6IFwiIzAwN0FGRlwiXG5cdGltYWdlUHJlZml4OiBcIlwiXG5cdGltYWdlU3VmZml4OiBcInBuZ1wiXG5cdGJ1dHRvbkFjdGlvbnM6IFtdXG5cdGJhY2tBY3Rpb246ICgpIC0+XG5cbiMgTmF2YmFyQ29tcG9uZW50IGNsYXNzXG5jbGFzcyBOYXZiYXJDb21wb25lbnQgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zID0gXy5hc3NpZ24oe30sIGRlZmF1bHRzLCBAb3B0aW9ucylcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0bm9vcCA9ICgpIC0+XG5cdFx0QC5oaXN0b3J5ID0gW0BvcHRpb25zLnRpdGxlXVxuXHRcdEAubmF2TGV2ZWwgPSAwXG5cdFx0ZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uID0gMC4yNVxuXG5cdFx0c2l6ZVRleHRMYXllciA9IChsYXllcikgLT5cblx0XHRcdHN0eWxlID0gXy5waWNrKGxheWVyLnN0eWxlLCBUZXh0TGF5ZXIuX3RleHRQcm9wZXJ0aWVzKVxuXHRcdFx0dGV4dFdpZHRoID0gTWF0aC5jZWlsKFV0aWxzLnRleHRTaXplKGxheWVyLnRleHQsIHN0eWxlKS53aWR0aClcblx0XHRcdHJhdGlvID0gaWYgXy5pbmNsdWRlcyhGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUsIFwicGx1c1wiKSB0aGVuIDMgZWxzZSAyXG5cdFx0XHRsYXllci53aWR0aCA9IHRleHRXaWR0aC9yYXRpb1xuXG5cdFx0IyBoZWlnaHRzIGJ5IHNpemVcblx0XHRoZWlnaHRzID1cblx0XHRcdHNtYWxsOiA2NFxuXHRcdFx0bGFyZ2U6IDExNlxuXHRcdFx0c2VhcmNoOiA1NCAjIGFkZGl0aXZlXG5cblx0XHQjIHNjcm9sbCB0aHJlc2hvbGRzIGZvciB0cmlnZ2VyaW5nIG5hdmJhciBjaGFuZ2VzXG5cdFx0c2Nyb2xsVGhyZXNob2xkcyA9XG5cdFx0XHR0aXRsZVNjYWxlVGhyZXNob2xkOiA3MFxuXG5cdFx0bWFyZ2lucyA9XG5cdFx0XHRzaWRlOiAxNFxuXG5cdFx0IyBTVkdcblx0XHRjaGV2cm9uU1ZHID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBvbHlnb24gcG9pbnRzPScwIDEwLjUgMTAuNSAwIDEyLjUgMiA0IDEwLjUgMTIuNSAxOSAxMC41IDIxJyBmaWxsPScje0BvcHRpb25zLmFjY2VudENvbG9yfScgLz48L3N2Zz5cIlxuXG5cdFx0c2VhcmNoU1ZHID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nbTEzLjc0MzA5LDEyLjU3NDA2bC0zLjgzMywtMy44MzQ1YzAuNjg3MDgsLTAuOTM3MSAxLjA1NTE0LC0yLjA3MDAzIDEuMDUsLTMuMjMyYy0wLjAxMzExLC0zLjAzMzE1IC0yLjQ2NjM3LC01LjQ4OTk5IC01LjQ5OTUsLTUuNTA3NWMtMS40NTE1MiwtMC4wMDY1NyAtMi44NDUzNywwLjU2NzY1IC0zLjg3MTA2LDEuNTk0NzVjLTEuMDI1NjgsMS4wMjcwOSAtMS41OTc5OSwyLjQyMTc0IC0xLjU4OTQ0LDMuODczMjVjMC4wMTMxMSwzLjAzMzQyIDIuNDY2NjEsNS40OTA0OCA1LjUsNS41MDhjMS4xNjY3MSwwLjAwNTA1IDIuMzAzNzgsLTAuMzY3MyAzLjI0MTUsLTEuMDYxNWwwLjAwNCwtMC4wMDNsMy44Mjk1LDMuODMxNWMwLjIwNzA1LDAuMjE3MjEgMC41MTU1NywwLjMwNTEzIDAuODA2MDIsMC4yMjk3YzAuMjkwNDUsLTAuMDc1NDQgMC41MTcxOSwtMC4zMDIzNyAwLjU5MjM4LC0wLjU5Mjg5YzAuMDc1MTgsLTAuMjkwNTEgLTAuMDEzLC0wLjU5ODk1IC0wLjIzMDQsLTAuODA1ODFsMCwwem0tOC4yNDcsLTIuNjk2Yy0yLjQyNjU4LC0wLjAxMzk2IC00LjM4OTM0LC0xLjk3OTQgLTQuNCwtNC40MDZjLTAuMDA2NTQsLTEuMTYxMDYgMC40NTEzNCwtMi4yNzY1NSAxLjI3MTczLC0zLjA5ODE3YzAuODIwNCwtMC44MjE2MSAxLjkzNTIxLC0xLjI4MTE2IDMuMDk2MjcsLTEuMjc2MzNjMi40MjY1OSwwLjAxMzk1IDQuMzg5MzUsMS45NzkzOSA0LjQsNC40MDZjMC4wMDY1NSwxLjE2MTA1IC0wLjQ1MTMzLDIuMjc2NTUgLTEuMjcxNzMsMy4wOTgxNmMtMC44MjAzOSwwLjgyMTYxIC0xLjkzNTIsMS4yODExNiAtMy4wOTYyNywxLjI3NjM0eicgZmlsbD0nI3tAb3B0aW9ucy5zZWFyY2hJY29uQ29sb3J9JyAvPjwvc3ZnPlwiXG5cblx0XHRkaWN0YXRpb25TVkcgPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNNiwwIEw2LDAgQzcuNjU2ODU0MjUsMCA5LDEuMzQzMTQ1NzUgOSwzIEw5LDEwIEM5LDExLjY1Njg1NDIgNy42NTY4NTQyNSwxMyA2LDEzIEw2LDEzIEM0LjM0MzE0NTc1LDEzIDMsMTEuNjU2ODU0MiAzLDEwIEwzLDMgQzMsMS4zNDMxNDU3NSA0LjM0MzE0NTc1LDAgNiwwIFogTTExLjI1LDYuNSBDMTAuODM1Nzg2NCw2LjUgMTAuNSw2LjgzNTc4NjQ0IDEwLjUsNy4yNSBMMTAuNSwxMCBDMTAuNSwxMi40ODUyODE0IDguNDg1MjgxMzcsMTQuNSA2LDE0LjUgQzMuNTE0NzE4NjMsMTQuNSAxLjUsMTIuNDg1MjgxNCAxLjUsMTAgTDEuNSw3LjI1IEMxLjUsNi44MzU3ODY0NCAxLjE2NDIxMzU2LDYuNSAwLjc1LDYuNSBDMC4zMzU3ODY0MzgsNi41IDAsNi44MzU3ODY0NCAwLDcuMjUgTDAsMTAgQzAuMDAxNDgxMzQ0MzcsMTMuMDIyNTk1NSAyLjI1MTExMTA1LDE1LjU3MjE3NTkgNS4yNSwxNS45NSBMNS4yNSwxNy41IEwzLjI1LDE3LjUgQzIuODM1Nzg2NDQsMTcuNSAyLjUsMTcuODM1Nzg2NCAyLjUsMTguMjUgQzIuNSwxOC42NjQyMTM2IDIuODM1Nzg2NDQsMTkgMy4yNSwxOSBMOC43NSwxOSBDOS4xNjQyMTM1NiwxOSA5LjUsMTguNjY0MjEzNiA5LjUsMTguMjUgQzkuNSwxNy44MzU3ODY0IDkuMTY0MjEzNTYsMTcuNSA4Ljc1LDE3LjUgTDYuNzUsMTcuNSBMNi43NSwxNS45NSBDOS43NDg4ODg5NSwxNS41NzIxNzU5IDExLjk5ODUxODcsMTMuMDIyNTk1NSAxMiwxMCBMMTIsNy4yNSBDMTIsNi44MzU3ODY0NCAxMS42NjQyMTM2LDYuNSAxMS4yNSw2LjUgTDExLjI1LDYuNSBaJyBmaWxsPScje0BvcHRpb25zLnNlYXJjaEljb25Db2xvcn0nIC8+PC9zdmc+XCJcblxuXHRcdCMgc2V0IGRlZmF1bHQgY29sb3JzIHBlciBzdHlsZVxuXHRcdGlmIEBvcHRpb25zLnRleHRDb2xvciA9PSBcIlwiXG5cdFx0XHRAb3B0aW9ucy50ZXh0Q29sb3IgPSBzd2l0Y2ggQG9wdGlvbnMuc3R5bGVcblx0XHRcdFx0d2hlbiBcImRhcmtcIiB0aGVuIFwid2hpdGVcIlxuXHRcdFx0XHRlbHNlIFwiYmxhY2tcIlxuXG5cdFx0aWYgQG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID09IFwiXCJcblx0XHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IHN3aXRjaCBAb3B0aW9ucy5zdHlsZVxuXHRcdFx0XHR3aGVuIFwiZGFya1wiIHRoZW4gXCJoc2xhKDAsIDAlLCAxMSUsIDAuNzIpXCJcblx0XHRcdFx0ZWxzZSBcImhzbGEoMCwgMCUsIDk3JSwgMC44MilcIlxuXG5cdFx0aWYgQG9wdGlvbnMuc2VhcmNoQmFyQ29sb3IgPT0gXCJcIlxuXHRcdFx0QG9wdGlvbnMuc2VhcmNoQmFyQ29sb3IgPSBzd2l0Y2ggQG9wdGlvbnMuc3R5bGVcblx0XHRcdFx0d2hlbiBcImRhcmtcIiB0aGVuIFwiaHNsYSgyNDAsIDIlLCA1NyUsIDAuMTQpXCJcblx0XHRcdFx0ZWxzZSBcImhzbGEoMjQwLCAyJSwgNTclLCAwLjEyKVwiXG5cblx0XHRpbnB1dENTUyA9IFwiXCJcIlxuXHRcdGlucHV0W3R5cGU9J3RleHQnXSB7XG5cdFx0ICBhcHBlYXJhbmNlOiBub25lO1xuXHRcdCAgY29sb3I6ICN7QG9wdGlvbnMudGV4dENvbG9yfTtcblx0XHQgIGJvcmRlcjogbm9uZTtcblx0XHQgIG91dGxpbmU6IG5vbmU7XG5cdFx0ICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0XHQgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuXHRcdCAgZm9udC13ZWlnaHQ6IDUwMDtcblx0XHQgIHRleHQtYWxpZ246IGxlZnQ7XG5cdFx0ICBmb250LXNpemU6IDE3cHg7XG5cdFx0ICBtYXJnaW46IDA7XG5cdFx0ICBwYWRkaW5nOiAwO1xuXHRcdCAgd2lkdGg6IDEwMHB4O1xuXHRcdCAgaGVpZ2h0OiAzNnB4O1xuXHRcdCAgcG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdCAgdG9wOiAwO1xuXHRcdH1cIlwiXCJcblxuXHRcdFV0aWxzLmluc2VydENTUyhpbnB1dENTUylcblxuXHRcdEBsYXlvdXQgPSAoKSA9PlxuXHRcdFx0Zm9yIGxheWVyIGluIEAuY2hpbGRyZW5cblx0XHRcdFx0bGF5ZXIuZGVzdHJveSgpXG5cblx0XHRcdEAud2lkdGggPSBTY3JlZW4ud2lkdGhcblx0XHRcdEAuaGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXSArIEBvcHRpb25zLnNlYXJjaCAqIGhlaWdodHMuc2VhcmNoXG5cdFx0XHRALmJhY2tncm91bmRDb2xvciA9IFwiY2xlYXJcIlxuXG5cdFx0XHRia2dkID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRcdGhlaWdodDogQC5oZWlnaHQgKyBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRzaGFkb3dZOiAwLjVcblx0XHRcdFx0c2hhZG93Qmx1cjogMFxuXHRcdFx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMjgpXCJcblx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0XCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiOiBcImJsdXIoNjBweClcIlxuXG5cdFx0XHRALmJrZ2QgPSBia2dkXG5cblx0XHRcdGNsaXBwaW5nRnJhbWUgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRjbGlwOiB0cnVlXG5cblx0XHRcdEAuY2xpcHBpbmdGcmFtZSA9IGNsaXBwaW5nRnJhbWVcblxuXHRcdFx0Zm9yIGkgaW4gWzAuLi5Ab3B0aW9ucy5idXR0b25Db3VudF1cblxuXHRcdFx0XHRpY29uRnJhbWUgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRwYXJlbnQ6IGNsaXBwaW5nRnJhbWVcblx0XHRcdFx0XHRuYW1lOiBcImljb25GcmFtZVwiICsgaVxuXHRcdFx0XHRcdHdpZHRoOiAyOFxuXHRcdFx0XHRcdGhlaWdodDogMjhcblx0XHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtMTEgLSAoMzkgKiBpKSlcblx0XHRcdFx0XHR5OiAyOVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cblx0XHRcdFx0ZG8gKGkpID0+XG5cdFx0XHRcdFx0cmV2ZXJzZWRJbmRleCA9IEBvcHRpb25zLmJ1dHRvbkNvdW50IC0gMSAtIGkgIyByZXZlcnNlIHRoZSBvcmRlciBzbyB1c2VyIGNhbiBzdXBwbHkgYWN0aW9ucyBsZWZ0LXRvLXJpZ2h0XG5cdFx0XHRcdFx0aWYgQG9wdGlvbnMuYnV0dG9uQWN0aW9uc1tyZXZlcnNlZEluZGV4XSAhPSBub29wIGFuZCBAb3B0aW9ucy5idXR0b25BY3Rpb25zW3JldmVyc2VkSW5kZXhdICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0aWNvbkZyYW1lLm9uQ2xpY2sgPT5cblx0XHRcdFx0XHRcdFx0QG9wdGlvbnMuYnV0dG9uQWN0aW9uc1tyZXZlcnNlZEluZGV4XSgpXG5cblx0XHRcdFx0aWNvbiA9IG5ldyBMYXllclxuXHRcdFx0XHRcdHBhcmVudDogaWNvbkZyYW1lXG5cdFx0XHRcdFx0bmFtZTogXCJpY29uXCIgKyBpXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0XHRcdFx0XHR3aWR0aDogQG9wdGlvbnMuYnV0dG9uU2l6ZVxuXHRcdFx0XHRcdGhlaWdodDogQG9wdGlvbnMuYnV0dG9uU2l6ZVxuXHRcdFx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRcdGltYWdlOiBcImltYWdlcy8je0BvcHRpb25zLmltYWdlUHJlZml4fSN7aX0uI3tAb3B0aW9ucy5pbWFnZVN1ZmZpeH1cIlxuXG5cdFx0XHR0aXRsZUNsaXAgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHk6IGhlaWdodHMuc21hbGxcblx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGhlaWdodHNbQG9wdGlvbnMuc2l6ZV0gLSBoZWlnaHRzLnNtYWxsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdGNsaXA6IHRydWVcblxuXHRcdFx0QC50aXRsZUNsaXAgPSB0aXRsZUNsaXBcblxuXHRcdFx0dGl0bGUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdHBhcmVudDogdGl0bGVDbGlwXG5cdFx0XHRcdHg6IG1hcmdpbnMuc2lkZVxuXHRcdFx0XHR5OiAyXG5cdFx0XHRcdGZvbnRTaXplOiAzNFxuXHRcdFx0XHRmb250V2VpZ2h0OiA3MDBcblx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLnRleHRDb2xvclxuXHRcdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0XHRvcmlnaW5YOiAwXG5cblx0XHRcdEAudGl0bGUgPSB0aXRsZVxuXG5cdFx0XHRjaGV2cm9uID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogY2xpcHBpbmdGcmFtZVxuXHRcdFx0XHR4OiA3LjVcblx0XHRcdFx0eTogMTIuNSAjIHdpbGwgYmUgYWRkZWQgdG8geToyMFxuXHRcdFx0XHR3aWR0aDogMTNcblx0XHRcdFx0aGVpZ2h0OiAyMlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRodG1sOiBjaGV2cm9uU1ZHXG5cblx0XHRcdGJhY2tMYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHg6IDI2XG5cdFx0XHRcdHk6IDEyICMgd2lsbCBiZSBhZGRlZCB0byB5OjIwXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy5hY2NlbnRDb2xvclxuXHRcdFx0XHRmb250U2l6ZTogMTdcblx0XHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRcdHRleHQ6IFwiXCJcblxuXHRcdFx0QC5iYWNrTGFiZWwgPSBiYWNrTGFiZWxcblxuXHRcdFx0c21hbGxUaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHk6IDMyXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy50ZXh0Q29sb3Jcblx0XHRcdFx0Zm9udFNpemU6IDE3XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0XHRvcGFjaXR5OiBpZiBAb3B0aW9ucy5zaXplID09IFwic21hbGxcIiB0aGVuIDEgZWxzZSAwXG5cblx0XHRcdHNpemVUZXh0TGF5ZXIoc21hbGxUaXRsZSlcblx0XHRcdHNtYWxsVGl0bGUueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0c21hbGxUaXRsZS5hdXRvV2lkdGggPSB5ZXNcblxuXHRcdFx0QC5zbWFsbFRpdGxlID0gc21hbGxUaXRsZVxuXG5cdFx0XHRiYWNrQnV0dG9uID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogY2xpcHBpbmdGcmFtZVxuXHRcdFx0XHR5OiAyMFxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLzJcblx0XHRcdFx0aGVpZ2h0OiBoZWlnaHRzLnNtYWxsIC0gMjBcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblxuXHRcdFx0YmFja0J1dHRvbi5wbGFjZUJlZm9yZShia2dkKVxuXG5cdFx0XHRALmJhY2tCdXR0b24gPSBiYWNrQnV0dG9uXG5cblx0XHRcdGNoZXZyb24ucGFyZW50ID0gYmFja0J1dHRvblxuXHRcdFx0YmFja0xhYmVsLnBhcmVudCA9IGJhY2tCdXR0b25cblxuXHRcdFx0YmFja0J1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0XHRzaG93OlxuXHRcdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdFx0aGlkZTpcblx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cblx0XHRcdGJhY2tCdXR0b24uYW5pbWF0ZShcImhpZGVcIiwgaW5zdGFudDogdHJ1ZSlcblxuXHRcdFx0aWYgQG9wdGlvbnMuYmFja0FjdGlvbiAhPSBub29wXG5cdFx0XHRcdGJhY2tCdXR0b24ub25DbGljayA9PlxuXHRcdFx0XHRcdEBvcHRpb25zLmJhY2tBY3Rpb24oKVxuXG5cdFx0XHRpZiBAb3B0aW9ucy5zZWFyY2ggPT0gdHJ1ZVxuXHRcdFx0XHRzZWFyY2hCYXJDbGlwID0gbmV3IExheWVyXG5cdFx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdFx0eTogQWxpZ24uYm90dG9tXG5cdFx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0XHRcdGhlaWdodDogaGVpZ2h0cy5zZWFyY2hcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRcdGNsaXA6IHRydWVcblxuXHRcdFx0XHRzZWFyY2hCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRwYXJlbnQ6IHNlYXJjaEJhckNsaXBcblx0XHRcdFx0XHR4OiA4XG5cdFx0XHRcdFx0eTogQWxpZ24uYm90dG9tKC0xNilcblx0XHRcdFx0XHR3aWR0aDogQC53aWR0aCAtIDE2XG5cdFx0XHRcdFx0aGVpZ2h0OiAzNlxuXHRcdFx0XHRcdGJvcmRlclJhZGl1czogMTBcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBvcHRpb25zLnNlYXJjaEJhckNvbG9yXG5cblx0XHRcdFx0QC5zZWFyY2hCYXIgPSBzZWFyY2hCYXJcblxuXHRcdFx0XHRzZWFyY2hCYXIub25UYXAgLT5cblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRzZWFyY2hJY29uID0gbmV3IExheWVyXG5cdFx0XHRcdFx0cGFyZW50OiBzZWFyY2hCYXJcblx0XHRcdFx0XHR4OiAxMFxuXHRcdFx0XHRcdHk6IDExXG5cdFx0XHRcdFx0d2lkdGg6IDE0XG5cdFx0XHRcdFx0aGVpZ2h0OiAxNFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdFx0aHRtbDogc2VhcmNoU1ZHXG5cblx0XHRcdFx0c2VhcmNoVGV4dCA9IG5ldyBMYXllclxuXHRcdFx0XHRcdHBhcmVudDogc2VhcmNoQmFyXG5cdFx0XHRcdFx0eDogc2VhcmNoSWNvbi5tYXhYICsgN1xuXHRcdFx0XHRcdHdpZHRoOiBzZWFyY2hCYXIud2lkdGggLSA1OFxuXHRcdFx0XHRcdGhlaWdodDogc2VhcmNoQmFyLmhlaWdodFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdFx0aHRtbDogXCI8aW5wdXQgaWQ9J3NlYXJjaCcgdHlwZT0ndGV4dCcgY29udGVudGVkaXRhYmxlPSd0cnVlJyBwbGFjZWhvbGRlcj0nI3tAb3B0aW9ucy5zZWFyY2hMYWJlbH0nPlwiXG5cblx0XHRcdFx0QC5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dFxuXG5cdFx0XHRcdGlmIEBvcHRpb25zLmRpY3RhdGlvbiA9PSB0cnVlXG5cdFx0XHRcdFx0ZGljdGF0aW9uSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0XHRcdFx0cGFyZW50OiBzZWFyY2hCYXJcblx0XHRcdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xMClcblx0XHRcdFx0XHRcdHk6IDlcblx0XHRcdFx0XHRcdHdpZHRoOiAxMlxuXHRcdFx0XHRcdFx0aGVpZ2h0OiAxOVxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0XHRcdFx0XHRcdGh0bWw6IGRpY3RhdGlvblNWR1xuXG5cdFx0IyBlbmQgQGxheW91dCgpXG5cblx0XHRAbGF5b3V0KClcblxuXHRcdEBzY3JvbGxXaXRoID0gKGxheWVyKSA9PiAjIHNjcm9sbGluZyBlZmZlY3RzXG5cdFx0XHRzY3JvbGwgPSBudWxsXG5cdFx0XHRtaW5OYXZCYXJIZWlnaHQgPSBoZWlnaHRzW0BvcHRpb25zLnNpemVdXG5cdFx0XHRzbWFsbE5hdkJhckhlaWdodCA9IGhlaWdodHMuc21hbGxcblx0XHRcdHNlYXJjaEJhckhlaWdodCA9IGhlaWdodHMuc2VhcmNoQmFyXG5cdFx0XHRzZWFyY2hCYXJZID0gQC5zZWFyY2hCYXI/Lnkgb3IgMFxuXHRcdFx0c2VhcmNoQmFyU2hpZnQgPSBALnNlYXJjaEJhcj8ueSAtIDE2IC0gQC5zZWFyY2hCYXI/LmhlaWdodC8yIG9yIDBcblx0XHRcdHRpdGxlTW92ZVN0YXJ0ID0gaGVpZ2h0cy5zbWFsbCAqIEBvcHRpb25zLnNlYXJjaFxuXHRcdFx0dGl0bGVIZWlnaHQgPSBoZWlnaHRzW0BvcHRpb25zLnNpemVdIC0gaGVpZ2h0cy5zbWFsbFxuXHRcdFx0ZW5mb3JjZVNjcm9sbE1hdGNoaW5nID0gZmFsc2Vcblx0XHRcdGlmIGxheWVyIGluc3RhbmNlb2YgRmxvd0NvbXBvbmVudFxuXHRcdFx0XHRzY3JvbGwgPSBsYXllci5zY3JvbGxcblx0XHRcdGVsc2UgaWYgbGF5ZXIgaW5zdGFuY2VvZiBTY3JvbGxDb21wb25lbnRcblx0XHRcdFx0c2Nyb2xsID0gbGF5ZXJcblx0XHRcdGlmIHNjcm9sbCAhPSBudWxsIGFuZCBzY3JvbGwgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHNjcm9sbC5vbk1vdmUgPT5cbiMgXHRcdFx0XHRcdHByaW50IHNjcm9sbC5zY3JvbGxZXG5cdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gMFxuXHRcdFx0XHRcdGlmIEAubmF2TGV2ZWwgPiAwXG5cdFx0XHRcdFx0XHRtYXhOYXZCYXJIZWlnaHQgPSBoZWlnaHRzLnNtYWxsXG5cdFx0XHRcdFx0ZWxzZSBpZiBAb3B0aW9ucy5zZWFyY2ggPT0gdHJ1ZVxuXHRcdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXSArIGhlaWdodHMuc2VhcmNoXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXVxuXHRcdFx0XHRcdEAudGl0bGUuc2NhbGUgPSBVdGlscy5tb2R1bGF0ZShzY3JvbGwuc2Nyb2xsWSwgWzAsIC1zY3JvbGxUaHJlc2hvbGRzLnRpdGxlU2NhbGVUaHJlc2hvbGRdLCBbMSwgMS4xXSwgdHJ1ZSlcblx0XHRcdFx0XHQjIGNsaXBwaW5nXG5cdFx0XHRcdFx0QC5jbGlwcGluZ0ZyYW1lLmhlaWdodCA9IFV0aWxzLm1vZHVsYXRlKHNjcm9sbC5zY3JvbGxZLCBbMCwgbWluTmF2QmFySGVpZ2h0XSwgW21heE5hdkJhckhlaWdodCwgc21hbGxOYXZCYXJIZWlnaHRdLCB0cnVlKVxuXHRcdFx0XHRcdEAuY2xpcHBpbmdGcmFtZS55ID0gTWF0aC5tYXgoMCwtc2Nyb2xsLnNjcm9sbFkpXG5cdFx0XHRcdFx0QC5ia2dkLnkgPSBNYXRoLm1heCgtU2NyZWVuLmhlaWdodCwgLXNjcm9sbC5zY3JvbGxZIC0gU2NyZWVuLmhlaWdodClcblx0XHRcdFx0XHRALnRpdGxlLnkgPSBVdGlscy5tb2R1bGF0ZShzY3JvbGwuc2Nyb2xsWSwgW3RpdGxlTW92ZVN0YXJ0LCBtaW5OYXZCYXJIZWlnaHRdLCBbMiwgLXRpdGxlSGVpZ2h0XSwgdHJ1ZSlcblx0XHRcdFx0XHRALmJrZ2QuaGVpZ2h0ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBtaW5OYXZCYXJIZWlnaHRdLCBbbWF4TmF2QmFySGVpZ2h0LCBzbWFsbE5hdkJhckhlaWdodF0sIHRydWUpICsgU2NyZWVuLmhlaWdodFxuXHRcdFx0XHRcdEAuc2VhcmNoQmFyPy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBzbWFsbE5hdkJhckhlaWdodF0sIFsxLDBdLCB0cnVlKVxuXHRcdFx0XHRcdEAuc2VhcmNoQmFyPy55ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBzbWFsbE5hdkJhckhlaWdodF0sIFtzZWFyY2hCYXJZLCBzZWFyY2hCYXJTaGlmdF0sIHRydWUpXG5cdFx0XHRcdFx0aWYgQG9wdGlvbnMuc2l6ZSA9PSBcImxhcmdlXCIgYW5kIEAubmF2TGV2ZWwgPT0gMFxuXHRcdFx0XHRcdFx0QC5zbWFsbFRpdGxlLm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShALnRpdGxlLnksIFsyIC0gdGl0bGVIZWlnaHQvMiwgLXRpdGxlSGVpZ2h0XSwgWzAsIDFdLCB0cnVlKVxuXG5cdFx0IyBlbmQgQHNjcm9sbFdpdGgoKVxuXG5cdFx0cmVzZXRUaXRsZSA9ICgpID0+XG5cdFx0XHRpZiBALm5hdkxldmVsID09IDFcblx0XHRcdFx0QC5ia2dkLmhlaWdodCA9IEAuaGVpZ2h0ICsgU2NyZWVuLmhlaWdodFxuXHRcdFx0XHRALmJrZ2QueSA9IEFsaWduLmJvdHRvbVxuXHRcdFx0XHRALnRpdGxlLnNjYWxlID0gMVxuXHRcdFx0XHRALnRpdGxlLnkgPSAyXG5cdFx0XHRcdEAuc2VhcmNoQmFyLnkgPSBBbGlnbi5ib3R0b20oLTE2KVxuXHRcdFx0XHRALnNlYXJjaEJhci5vcGFjaXR5ID0gMVxuXHRcdFx0XHRALmNsaXBwaW5nRnJhbWUuaGVpZ2h0ID0gQC5oZWlnaHRcblx0XHRcdFx0QC5jbGlwcGluZ0ZyYW1lLnkgPSAwXG5cblx0XHQjIGVuZCByZXNldFRpdGxlKClcblxuXHRcdGFuaW1hdGVUb05leHRUaXRsZSA9IChuZXdUaXRsZSA9IFwiXCIsIG9sZFRpdGxlID0gXCJcIiwgdGl0bGVMYXllciA9IEAudGl0bGUpID0+XG5cdFx0XHRALnNtYWxsVGl0bGUub3BhY2l0eSA9IDBcblx0XHRcdEAudGl0bGUub3BhY2l0eSA9IDBcblx0XHRcdEAuYmFja0xhYmVsLm9wYWNpdHkgPSAwXG5cdFx0XHR0aXRsZUxheWVyLm9wYWNpdHkgPSAwXG5cdFx0XHR0ZW1wTGFiZWwgPSB0aXRsZUxheWVyLmNvcHkoKVxuXHRcdFx0dGVtcExhYmVsLm9wYWNpdHkgPSAxXG5cdFx0XHR0ZW1wTGFiZWwuc2NyZWVuRnJhbWUgPSB0aXRsZUxheWVyLnNjcmVlbkZyYW1lXG5cdFx0XHR0ZW1wTGFiZWwucGFyZW50ID0gQC5jbGlwcGluZ0ZyYW1lXG5cdFx0XHR0ZW1wTGFiZWwueCA9IHRpdGxlTGF5ZXIuc2NyZWVuRnJhbWUueFxuXHRcdFx0dGVtcExhYmVsLnkgPSB0aXRsZUxheWVyLnNjcmVlbkZyYW1lLnlcblx0XHRcdHRlbXBMYWJlbC50ZXh0ID0gb2xkVGl0bGVcblx0XHRcdHRlbXBMYWJlbC5hbmltYXRlXG5cdFx0XHRcdHg6IEAuYmFja0xhYmVsLnNjcmVlbkZyYW1lLnhcblx0XHRcdFx0eTogQC5iYWNrTGFiZWwuc2NyZWVuRnJhbWUueVxuXHRcdFx0XHRjb2xvcjogQG9wdGlvbnMuYWNjZW50Q29sb3Jcblx0XHRcdFx0Zm9udFNpemU6IDE3XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdEAuYmFja0xhYmVsLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb24gLSAwLjA1ICMgb3RoZXJ3aXNlIHdpbGwgc3RpbGwgYmUgYW5pbWF0aW5nIGluIG5leHQgc3RlcFxuXHRcdFx0QC5zbWFsbFRpdGxlLnRleHQgPSBuZXdUaXRsZVxuXHRcdFx0QC5zbWFsbFRpdGxlLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdHRlbXBMYWJlbC5vbkFuaW1hdGlvbkVuZCA9PlxuXHRcdFx0XHRALmJhY2tMYWJlbC50ZXh0ID0gb2xkVGl0bGVcblx0XHRcdFx0QC5iYWNrTGFiZWwud2lkdGggPSBTY3JlZW4ud2lkdGggLSBtYXJnaW5zLnNpZGUgKiAyXG5cdFx0XHRcdEAuYmFja0xhYmVsLm9wYWNpdHkgPSAxXG5cdFx0XHRcdFV0aWxzLmRlbGF5IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvbiwgPT5cblx0XHRcdFx0XHR0ZW1wTGFiZWwuZGVzdHJveSgpXG5cblx0XHQjIGVuZCBhbmltYXRlVG9OZXh0VGl0bGUoKVxuXG5cdFx0YW5pbWF0ZVRvUHJldmlvdXNUaXRsZSA9IChwcmV2QmFja0xhYmVsID0gXCJcIiwgY3VycmVudEJhY2tMYWJlbCA9IFwiXCIsIHRpdGxlTGF5ZXIgPSBALnRpdGxlKSA9PlxuXHRcdFx0cmVzZXRUaXRsZSgpXG5cdFx0XHRALnRpdGxlLm9wYWNpdHkgPSAwXG5cdFx0XHRALnNtYWxsVGl0bGUub3BhY2l0eSA9IDBcblx0XHRcdEAuYmFja0xhYmVsLm9wYWNpdHkgPSAwXG5cdFx0XHR0ZW1wVGl0bGUgPSBALmJhY2tMYWJlbC5jb3B5KClcblx0XHRcdHRlbXBUaXRsZS5vcGFjaXR5ID0gMVxuXHRcdFx0dGVtcFRpdGxlLnNjcmVlbkZyYW1lID0gQC5iYWNrTGFiZWwuc2NyZWVuRnJhbWVcblx0XHRcdHRlbXBUaXRsZS5wYXJlbnQgPSBALmNsaXBwaW5nRnJhbWVcblx0XHRcdHRlbXBUaXRsZS5hbmltYXRlXG5cdFx0XHRcdHg6IHRpdGxlTGF5ZXIuc2NyZWVuRnJhbWUueFxuXHRcdFx0XHR5OiB0aXRsZUxheWVyLnNjcmVlbkZyYW1lLnlcblx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLnRleHRDb2xvclxuXHRcdFx0XHRmb250U2l6ZTogdGl0bGVMYXllci5mb250U2l6ZVxuXHRcdFx0XHRmb250V2VpZ2h0OiB0aXRsZUxheWVyLmZvbnRXZWlnaHRcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdEAuYmFja0xhYmVsLnRleHQgPSBwcmV2QmFja0xhYmVsXG5cdFx0XHRALmJhY2tMYWJlbC5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cdFx0XHR0ZW1wVGl0bGUub25BbmltYXRpb25FbmQgPT5cblx0XHRcdFx0QC50aXRsZS50ZXh0ID0gY3VycmVudEJhY2tMYWJlbFxuXHRcdFx0XHRALnNtYWxsVGl0bGUudGV4dCA9IGN1cnJlbnRCYWNrTGFiZWxcblx0XHRcdFx0dGl0bGVMYXllci5vcGFjaXR5ID0gMVxuXHRcdFx0XHRVdGlscy5kZWxheSBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb24sID0+XG5cdFx0XHRcdFx0dGVtcFRpdGxlLmRlc3Ryb3koKVxuXG5cdFx0IyBlbmQgYW5pbWF0ZVRvUHJldmlvdXNUaXRsZSgpXG5cblx0XHRAc2hvd05leHQgPSBVdGlscy50aHJvdHRsZSAwLjUsIChuZXdUaXRsZSA9IFwiTmV3IFRpdGxlXCIpID0+XG5cdFx0XHRALmhpc3Rvcnkuc3BsaWNlKEAubmF2TGV2ZWwgKyAxLCAxLCBuZXdUaXRsZSlcblx0XHRcdGlmIEAubmF2TGV2ZWwgPT0gMCBhbmQgQG9wdGlvbnMuc2l6ZSA9PSBcImxhcmdlXCJcblx0XHRcdFx0YW5pbWF0ZVRvTmV4dFRpdGxlKG5ld1RpdGxlLCBALmhpc3RvcnlbQC5uYXZMZXZlbF0sIEAudGl0bGUpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGFuaW1hdGVUb05leHRUaXRsZShuZXdUaXRsZSwgQC5oaXN0b3J5W0AubmF2TGV2ZWxdLCBALnNtYWxsVGl0bGUpXG5cdFx0XHRALmNsaXBwaW5nRnJhbWUuYW5pbWF0ZVxuXHRcdFx0XHRoZWlnaHQ6IGhlaWdodHMuc21hbGxcblx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cdFx0XHRALmJrZ2QuYW5pbWF0ZVxuXHRcdFx0XHRoZWlnaHQ6IGhlaWdodHMuc21hbGwgKyBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxuXHRcdFx0KytALm5hdkxldmVsXG5cdFx0XHRkaXNwbGF5QmFja0J1dHRvbigpXG5cblx0XHQjIGVuZCBAc2hvd05leHQoKVxuXG5cdFx0QHNob3dQcmV2aW91cyA9IFV0aWxzLnRocm90dGxlIDAuNSwgKCkgPT5cblx0XHRcdGlmIEAubmF2TGV2ZWwgPiAwXG5cdFx0XHRcdGlmIEAubmF2TGV2ZWwgPT0gMSBhbmQgQG9wdGlvbnMuc2l6ZSA9PSBcImxhcmdlXCJcblx0XHRcdFx0XHRhbmltYXRlVG9QcmV2aW91c1RpdGxlKEAuaGlzdG9yeVtALm5hdkxldmVsIC0gMl0sIEAuaGlzdG9yeVtALm5hdkxldmVsIC0gMV0sIEAudGl0bGUpXG5cdFx0XHRcdFx0QC5jbGlwcGluZ0ZyYW1lLmFuaW1hdGVcblx0XHRcdFx0XHRcdGhlaWdodDogaGVpZ2h0c1tAb3B0aW9ucy5zaXplXSArIEBvcHRpb25zLnNlYXJjaCAqIGhlaWdodHMuc2VhcmNoXG5cdFx0XHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdFx0XHRALmJrZ2QuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBoZWlnaHRzW0BvcHRpb25zLnNpemVdICsgU2NyZWVuLmhlaWdodCArIEBvcHRpb25zLnNlYXJjaCAqIGhlaWdodHMuc2VhcmNoXG5cdFx0XHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGFuaW1hdGVUb1ByZXZpb3VzVGl0bGUoQC5oaXN0b3J5W0AubmF2TGV2ZWwgLSAyXSwgQC5oaXN0b3J5W0AubmF2TGV2ZWwgLSAxXSwgQC5zbWFsbFRpdGxlKVxuXHRcdFx0XHRALm5hdkxldmVsID0gTWF0aC5tYXgoMCwgQC5uYXZMZXZlbCAtIDEpXG5cdFx0XHRcdGRpc3BsYXlCYWNrQnV0dG9uKClcblxuXHRcdCMgZW5kIEBzaG93UHJldmlvdXMoKVxuXG5cdFx0ZGlzcGxheUJhY2tCdXR0b24gPSAoKSA9PlxuXHRcdFx0aWYgQC5uYXZMZXZlbCA9PSAwXG5cdFx0XHRcdEAuYmFja0J1dHRvbi5hbmltYXRlKFwiaGlkZVwiKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRALmJhY2tCdXR0b24uYW5pbWF0ZShcInNob3dcIilcblxuXHRcdCMgZW5kIGRpc3BsYXlCYWNrQnV0dG9uKClcblxuXHRcdCMgSGFuZGxlIG9yaWVudGF0aW9uIHN3aXRjaFxuXHRcdCMgQ2hlY2sgd2hldGhlciB0aGUgZGV2aWNlIGlzIG1vYmlsZSBvciBub3QgKHZlcnN1cyBGcmFtZXIpXG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdFx0IyBBZGQgZXZlbnQgbGlzdGVuZXIgb24gb3JpZW50YXRpb24gY2hhbmdlXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcIm9yaWVudGF0aW9uY2hhbmdlXCIsID0+XG5cdFx0XHRcdEBsYXlvdXQoKVxuXHRcdGVsc2Vcblx0XHRcdCMgTGlzdGVuIGZvciBvcmllbnRhdGlvbiBjaGFuZ2VzIG9uIHRoZSBkZXZpY2Ugdmlld1xuXHRcdFx0RnJhbWVyLkRldmljZS5vbiBcImNoYW5nZTpvcmllbnRhdGlvblwiLCA9PlxuXHRcdFx0XHRAbGF5b3V0KClcblxuXHRAZGVmaW5lICdzZWFyY2gnLCBnZXQ6ICgpIC0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKS52YWx1ZVxubW9kdWxlLmV4cG9ydHMgPSBOYXZiYXJDb21wb25lbnRcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBOztBREFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUEseUJBQUE7RUFBQTs7O0FBZ0RBLFFBQUEsR0FDQztFQUFBLFdBQUEsRUFBYSxDQUFiO0VBQ0EsS0FBQSxFQUFPLGFBRFA7RUFFQSxXQUFBLEVBQWEsUUFGYjtFQUdBLEtBQUEsRUFBTyxPQUhQO0VBSUEsSUFBQSxFQUFNLE9BSk47RUFLQSxNQUFBLEVBQVEsS0FMUjtFQU1BLFNBQUEsRUFBVyxLQU5YO0VBT0EsU0FBQSxFQUFXLEVBUFg7RUFRQSxlQUFBLEVBQWlCLEVBUmpCO0VBU0EsY0FBQSxFQUFnQixFQVRoQjtFQVVBLGVBQUEsRUFBaUIsU0FWakI7RUFXQSxVQUFBLEVBQVksRUFYWjtFQVlBLFdBQUEsRUFBYSxTQVpiO0VBYUEsV0FBQSxFQUFhLEVBYmI7RUFjQSxXQUFBLEVBQWEsS0FkYjtFQWVBLGFBQUEsRUFBZSxFQWZmO0VBZ0JBLFVBQUEsRUFBWSxTQUFBLEdBQUEsQ0FoQlo7OztBQW1CSzs7O0VBQ1EseUJBQUMsT0FBRDtBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUN0QixJQUFDLENBQUEsT0FBRCxHQUFXLENBQUMsQ0FBQyxNQUFGLENBQVMsRUFBVCxFQUFhLFFBQWIsRUFBdUIsSUFBQyxDQUFBLE9BQXhCO0lBQ1gsaURBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFBLEdBQU8sU0FBQSxHQUFBO0lBQ1AsSUFBQyxDQUFDLE9BQUYsR0FBWSxDQUFDLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVjtJQUNaLElBQUMsQ0FBQyxRQUFGLEdBQWE7SUFDYix3QkFBQSxHQUEyQjtJQUUzQixhQUFBLEdBQWdCLFNBQUMsS0FBRDtBQUNmLFVBQUE7TUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxLQUFLLENBQUMsS0FBYixFQUFvQixTQUFTLENBQUMsZUFBOUI7TUFDUixTQUFBLEdBQVksSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFLLENBQUMsUUFBTixDQUFlLEtBQUssQ0FBQyxJQUFyQixFQUEyQixLQUEzQixDQUFpQyxDQUFDLEtBQTVDO01BQ1osS0FBQSxHQUFXLENBQUMsQ0FBQyxRQUFGLENBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUF6QixFQUFxQyxNQUFyQyxDQUFILEdBQXFELENBQXJELEdBQTREO2FBQ3BFLEtBQUssQ0FBQyxLQUFOLEdBQWMsU0FBQSxHQUFVO0lBSlQ7SUFPaEIsT0FBQSxHQUNDO01BQUEsS0FBQSxFQUFPLEVBQVA7TUFDQSxLQUFBLEVBQU8sR0FEUDtNQUVBLE1BQUEsRUFBUSxFQUZSOztJQUtELGdCQUFBLEdBQ0M7TUFBQSxtQkFBQSxFQUFxQixFQUFyQjs7SUFFRCxPQUFBLEdBQ0M7TUFBQSxJQUFBLEVBQU0sRUFBTjs7SUFHRCxVQUFBLEdBQWEsOEdBQUEsR0FBK0csSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUF4SCxHQUFvSTtJQUVqSixTQUFBLEdBQVksbTJCQUFBLEdBQW8yQixJQUFDLENBQUEsT0FBTyxDQUFDLGVBQTcyQixHQUE2M0I7SUFFejRCLFlBQUEsR0FBZSxxMEJBQUEsR0FBczBCLElBQUMsQ0FBQSxPQUFPLENBQUMsZUFBLzBCLEdBQSsxQjtJQUc5MkIsSUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsS0FBc0IsRUFBekI7TUFDQyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQ7QUFBcUIsZ0JBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFoQjtBQUFBLGVBQ2YsTUFEZTttQkFDSDtBQURHO21CQUVmO0FBRmU7b0JBRHRCOztJQUtBLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxlQUFULEtBQTRCLEVBQS9CO01BQ0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxlQUFUO0FBQTJCLGdCQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBaEI7QUFBQSxlQUNyQixNQURxQjttQkFDVDtBQURTO21CQUVyQjtBQUZxQjtvQkFENUI7O0lBS0EsSUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDLGNBQVQsS0FBMkIsRUFBOUI7TUFDQyxJQUFDLENBQUEsT0FBTyxDQUFDLGNBQVQ7QUFBMEIsZ0JBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFoQjtBQUFBLGVBQ3BCLE1BRG9CO21CQUNSO0FBRFE7bUJBRXBCO0FBRm9CO29CQUQzQjs7SUFLQSxRQUFBLEdBQVcsc0RBQUEsR0FHQSxJQUFDLENBQUEsT0FBTyxDQUFDLFNBSFQsR0FHbUI7SUFnQjlCLEtBQUssQ0FBQyxTQUFOLENBQWdCLFFBQWhCO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7QUFDVCxZQUFBO0FBQUE7QUFBQSxhQUFBLHFDQUFBOztVQUNDLEtBQUssQ0FBQyxPQUFOLENBQUE7QUFERDtRQUdBLEtBQUMsQ0FBQyxLQUFGLEdBQVUsTUFBTSxDQUFDO1FBQ2pCLEtBQUMsQ0FBQyxNQUFGLEdBQVcsT0FBUSxDQUFBLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFSLEdBQXlCLEtBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxHQUFrQixPQUFPLENBQUM7UUFDOUQsS0FBQyxDQUFDLGVBQUYsR0FBb0I7UUFFcEIsSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO1VBQUEsTUFBQSxFQUFRLEtBQVI7VUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBRGQ7VUFFQSxNQUFBLEVBQVEsS0FBQyxDQUFDLE1BQUYsR0FBVyxNQUFNLENBQUMsTUFGMUI7VUFHQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BSFQ7VUFJQSxlQUFBLEVBQWlCLEtBQUMsQ0FBQSxPQUFPLENBQUMsZUFKMUI7VUFLQSxPQUFBLEVBQVMsR0FMVDtVQU1BLFVBQUEsRUFBWSxDQU5aO1VBT0EsV0FBQSxFQUFhLGtCQVBiO1VBUUEsS0FBQSxFQUNDO1lBQUEseUJBQUEsRUFBMkIsWUFBM0I7V0FURDtTQURVO1FBWVgsS0FBQyxDQUFDLElBQUYsR0FBUztRQUVULGFBQUEsR0FBb0IsSUFBQSxLQUFBLENBQ25CO1VBQUEsTUFBQSxFQUFRLEtBQVI7VUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBRGQ7VUFFQSxNQUFBLEVBQVEsS0FBQyxDQUFDLE1BRlY7VUFHQSxlQUFBLEVBQWlCLE9BSGpCO1VBSUEsSUFBQSxFQUFNLElBSk47U0FEbUI7UUFPcEIsS0FBQyxDQUFDLGFBQUYsR0FBa0I7YUFhZCxTQUFDLENBQUQ7QUFDRixjQUFBO1VBQUEsYUFBQSxHQUFnQixLQUFDLENBQUEsT0FBTyxDQUFDLFdBQVQsR0FBdUIsQ0FBdkIsR0FBMkI7VUFDM0MsSUFBRyxLQUFDLENBQUEsT0FBTyxDQUFDLGFBQWMsQ0FBQSxhQUFBLENBQXZCLEtBQXlDLElBQXpDLElBQWtELEtBQUMsQ0FBQSxPQUFPLENBQUMsYUFBYyxDQUFBLGFBQUEsQ0FBdkIsS0FBeUMsTUFBOUY7bUJBQ0MsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsU0FBQTtxQkFDakIsS0FBQyxDQUFBLE9BQU8sQ0FBQyxhQUFjLENBQUEsYUFBQSxDQUF2QixDQUFBO1lBRGlCLENBQWxCLEVBREQ7O1FBRkU7QUFYSixhQUFTLHVHQUFUO1VBRUMsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZjtZQUFBLE1BQUEsRUFBUSxhQUFSO1lBQ0EsSUFBQSxFQUFNLFdBQUEsR0FBYyxDQURwQjtZQUVBLEtBQUEsRUFBTyxFQUZQO1lBR0EsTUFBQSxFQUFRLEVBSFI7WUFJQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQUQsR0FBTSxDQUFDLEVBQUEsR0FBSyxDQUFOLENBQWxCLENBSkg7WUFLQSxDQUFBLEVBQUcsRUFMSDtZQU1BLGVBQUEsRUFBaUIsT0FOakI7V0FEZTthQVNaO1VBTUosSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO1lBQUEsTUFBQSxFQUFRLFNBQVI7WUFDQSxJQUFBLEVBQU0sTUFBQSxHQUFTLENBRGY7WUFFQSxlQUFBLEVBQWlCLE9BRmpCO1lBR0EsS0FBQSxFQUFPLEtBQUMsQ0FBQSxPQUFPLENBQUMsVUFIaEI7WUFJQSxNQUFBLEVBQVEsS0FBQyxDQUFBLE9BQU8sQ0FBQyxVQUpqQjtZQUtBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFMVDtZQU1BLENBQUEsRUFBRyxLQUFLLENBQUMsTUFOVDtZQU9BLEtBQUEsRUFBTyxTQUFBLEdBQVUsS0FBQyxDQUFBLE9BQU8sQ0FBQyxXQUFuQixHQUFpQyxDQUFqQyxHQUFtQyxHQUFuQyxHQUFzQyxLQUFDLENBQUEsT0FBTyxDQUFDLFdBUHREO1dBRFU7QUFqQlo7UUEyQkEsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZjtVQUFBLE1BQUEsRUFBUSxhQUFSO1VBQ0EsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxLQURYO1VBRUEsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQUZkO1VBR0EsTUFBQSxFQUFRLE9BQVEsQ0FBQSxLQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBUixHQUF5QixPQUFPLENBQUMsS0FIekM7VUFJQSxlQUFBLEVBQWlCLE9BSmpCO1VBS0EsSUFBQSxFQUFNLElBTE47U0FEZTtRQVFoQixLQUFDLENBQUMsU0FBRixHQUFjO1FBRWQsS0FBQSxHQUFZLElBQUEsU0FBQSxDQUNYO1VBQUEsTUFBQSxFQUFRLFNBQVI7VUFDQSxDQUFBLEVBQUcsT0FBTyxDQUFDLElBRFg7VUFFQSxDQUFBLEVBQUcsQ0FGSDtVQUdBLFFBQUEsRUFBVSxFQUhWO1VBSUEsVUFBQSxFQUFZLEdBSlo7VUFLQSxLQUFBLEVBQU8sS0FBQyxDQUFBLE9BQU8sQ0FBQyxTQUxoQjtVQU1BLElBQUEsRUFBTSxLQUFDLENBQUEsT0FBTyxDQUFDLEtBTmY7VUFPQSxPQUFBLEVBQVMsQ0FQVDtTQURXO1FBVVosS0FBQyxDQUFDLEtBQUYsR0FBVTtRQUVWLE9BQUEsR0FBYyxJQUFBLEtBQUEsQ0FDYjtVQUFBLE1BQUEsRUFBUSxhQUFSO1VBQ0EsQ0FBQSxFQUFHLEdBREg7VUFFQSxDQUFBLEVBQUcsSUFGSDtVQUdBLEtBQUEsRUFBTyxFQUhQO1VBSUEsTUFBQSxFQUFRLEVBSlI7VUFLQSxlQUFBLEVBQWlCLE9BTGpCO1VBTUEsSUFBQSxFQUFNLFVBTk47U0FEYTtRQVNkLFNBQUEsR0FBZ0IsSUFBQSxTQUFBLENBQ2Y7VUFBQSxNQUFBLEVBQVEsYUFBUjtVQUNBLENBQUEsRUFBRyxFQURIO1VBRUEsQ0FBQSxFQUFHLEVBRkg7VUFHQSxLQUFBLEVBQU8sS0FBQyxDQUFBLE9BQU8sQ0FBQyxXQUhoQjtVQUlBLFFBQUEsRUFBVSxFQUpWO1VBS0EsVUFBQSxFQUFZLEdBTFo7VUFNQSxJQUFBLEVBQU0sRUFOTjtTQURlO1FBU2hCLEtBQUMsQ0FBQyxTQUFGLEdBQWM7UUFFZCxVQUFBLEdBQWlCLElBQUEsU0FBQSxDQUNoQjtVQUFBLE1BQUEsRUFBUSxhQUFSO1VBQ0EsQ0FBQSxFQUFHLEVBREg7VUFFQSxLQUFBLEVBQU8sS0FBQyxDQUFBLE9BQU8sQ0FBQyxTQUZoQjtVQUdBLFFBQUEsRUFBVSxFQUhWO1VBSUEsVUFBQSxFQUFZLEdBSlo7VUFLQSxJQUFBLEVBQU0sS0FBQyxDQUFBLE9BQU8sQ0FBQyxLQUxmO1VBTUEsT0FBQSxFQUFZLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxLQUFpQixPQUFwQixHQUFpQyxDQUFqQyxHQUF3QyxDQU5qRDtTQURnQjtRQVNqQixhQUFBLENBQWMsVUFBZDtRQUNBLFVBQVUsQ0FBQyxDQUFYLEdBQWUsS0FBSyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxTQUFYLEdBQXVCO1FBRXZCLEtBQUMsQ0FBQyxVQUFGLEdBQWU7UUFFZixVQUFBLEdBQWlCLElBQUEsS0FBQSxDQUNoQjtVQUFBLE1BQUEsRUFBUSxhQUFSO1VBQ0EsQ0FBQSxFQUFHLEVBREg7VUFFQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBQVAsR0FBYSxDQUZwQjtVQUdBLE1BQUEsRUFBUSxPQUFPLENBQUMsS0FBUixHQUFnQixFQUh4QjtVQUlBLGVBQUEsRUFBaUIsT0FKakI7U0FEZ0I7UUFPakIsVUFBVSxDQUFDLFdBQVgsQ0FBdUIsSUFBdkI7UUFFQSxLQUFDLENBQUMsVUFBRixHQUFlO1FBRWYsT0FBTyxDQUFDLE1BQVIsR0FBaUI7UUFDakIsU0FBUyxDQUFDLE1BQVYsR0FBbUI7UUFFbkIsVUFBVSxDQUFDLE1BQVgsR0FDQztVQUFBLElBQUEsRUFDQztZQUFBLE9BQUEsRUFBUyxDQUFUO1lBQ0EsZ0JBQUEsRUFBa0I7Y0FBQSxJQUFBLEVBQU0sd0JBQU47YUFEbEI7V0FERDtVQUdBLElBQUEsRUFDQztZQUFBLE9BQUEsRUFBUyxDQUFUO1lBQ0EsZ0JBQUEsRUFBa0I7Y0FBQSxJQUFBLEVBQU0sd0JBQU47YUFEbEI7V0FKRDs7UUFPRCxVQUFVLENBQUMsT0FBWCxDQUFtQixNQUFuQixFQUEyQjtVQUFBLE9BQUEsRUFBUyxJQUFUO1NBQTNCO1FBRUEsSUFBRyxLQUFDLENBQUEsT0FBTyxDQUFDLFVBQVQsS0FBdUIsSUFBMUI7VUFDQyxVQUFVLENBQUMsT0FBWCxDQUFtQixTQUFBO21CQUNsQixLQUFDLENBQUEsT0FBTyxDQUFDLFVBQVQsQ0FBQTtVQURrQixDQUFuQixFQUREOztRQUlBLElBQUcsS0FBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEtBQW1CLElBQXRCO1VBQ0MsYUFBQSxHQUFvQixJQUFBLEtBQUEsQ0FDbkI7WUFBQSxNQUFBLEVBQVEsYUFBUjtZQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEVDtZQUVBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FGZDtZQUdBLE1BQUEsRUFBUSxPQUFPLENBQUMsTUFIaEI7WUFJQSxlQUFBLEVBQWlCLE9BSmpCO1lBS0EsSUFBQSxFQUFNLElBTE47V0FEbUI7VUFRcEIsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZjtZQUFBLE1BQUEsRUFBUSxhQUFSO1lBQ0EsQ0FBQSxFQUFHLENBREg7WUFFQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLEVBQWQsQ0FGSDtZQUdBLEtBQUEsRUFBTyxLQUFDLENBQUMsS0FBRixHQUFVLEVBSGpCO1lBSUEsTUFBQSxFQUFRLEVBSlI7WUFLQSxZQUFBLEVBQWMsRUFMZDtZQU1BLGVBQUEsRUFBaUIsS0FBQyxDQUFBLE9BQU8sQ0FBQyxjQU4xQjtXQURlO1VBU2hCLEtBQUMsQ0FBQyxTQUFGLEdBQWM7VUFFZCxTQUFTLENBQUMsS0FBVixDQUFnQixTQUFBLEdBQUEsQ0FBaEI7VUFHQSxVQUFBLEdBQWlCLElBQUEsS0FBQSxDQUNoQjtZQUFBLE1BQUEsRUFBUSxTQUFSO1lBQ0EsQ0FBQSxFQUFHLEVBREg7WUFFQSxDQUFBLEVBQUcsRUFGSDtZQUdBLEtBQUEsRUFBTyxFQUhQO1lBSUEsTUFBQSxFQUFRLEVBSlI7WUFLQSxlQUFBLEVBQWlCLE9BTGpCO1lBTUEsSUFBQSxFQUFNLFNBTk47V0FEZ0I7VUFTakIsVUFBQSxHQUFpQixJQUFBLEtBQUEsQ0FDaEI7WUFBQSxNQUFBLEVBQVEsU0FBUjtZQUNBLENBQUEsRUFBRyxVQUFVLENBQUMsSUFBWCxHQUFrQixDQURyQjtZQUVBLEtBQUEsRUFBTyxTQUFTLENBQUMsS0FBVixHQUFrQixFQUZ6QjtZQUdBLE1BQUEsRUFBUSxTQUFTLENBQUMsTUFIbEI7WUFJQSxlQUFBLEVBQWlCLE9BSmpCO1lBS0EsSUFBQSxFQUFNLHFFQUFBLEdBQXNFLEtBQUMsQ0FBQSxPQUFPLENBQUMsV0FBL0UsR0FBMkYsSUFMakc7V0FEZ0I7VUFRakIsS0FBQyxDQUFDLFVBQUYsR0FBZTtVQUVmLElBQUcsS0FBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEtBQXNCLElBQXpCO21CQUNDLGFBQUEsR0FBb0IsSUFBQSxLQUFBLENBQ25CO2NBQUEsTUFBQSxFQUFRLFNBQVI7Y0FDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWIsQ0FESDtjQUVBLENBQUEsRUFBRyxDQUZIO2NBR0EsS0FBQSxFQUFPLEVBSFA7Y0FJQSxNQUFBLEVBQVEsRUFKUjtjQUtBLGVBQUEsRUFBaUIsT0FMakI7Y0FNQSxJQUFBLEVBQU0sWUFOTjthQURtQixFQURyQjtXQTFDRDs7TUEvSVM7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBcU1WLElBQUMsQ0FBQSxNQUFELENBQUE7SUFFQSxJQUFDLENBQUEsVUFBRCxHQUFjLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxLQUFEO0FBQ2IsWUFBQTtRQUFBLE1BQUEsR0FBUztRQUNULGVBQUEsR0FBa0IsT0FBUSxDQUFBLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVDtRQUMxQixpQkFBQSxHQUFvQixPQUFPLENBQUM7UUFDNUIsZUFBQSxHQUFrQixPQUFPLENBQUM7UUFDMUIsVUFBQSx5Q0FBd0IsQ0FBRSxXQUFiLElBQWtCO1FBQy9CLGNBQUEsMkNBQTRCLENBQUUsV0FBYixHQUFpQixFQUFqQiwyQ0FBaUMsQ0FBRSxnQkFBYixHQUFvQixDQUExQyxJQUErQztRQUNoRSxjQUFBLEdBQWlCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEtBQUMsQ0FBQSxPQUFPLENBQUM7UUFDMUMsV0FBQSxHQUFjLE9BQVEsQ0FBQSxLQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBUixHQUF5QixPQUFPLENBQUM7UUFDL0MscUJBQUEsR0FBd0I7UUFDeEIsSUFBRyxLQUFBLFlBQWlCLGFBQXBCO1VBQ0MsTUFBQSxHQUFTLEtBQUssQ0FBQyxPQURoQjtTQUFBLE1BRUssSUFBRyxLQUFBLFlBQWlCLGVBQXBCO1VBQ0osTUFBQSxHQUFTLE1BREw7O1FBRUwsSUFBRyxNQUFBLEtBQVUsSUFBVixJQUFtQixNQUFBLEtBQVUsTUFBaEM7aUJBQ0MsTUFBTSxDQUFDLE1BQVAsQ0FBYyxTQUFBO0FBRWIsZ0JBQUE7WUFBQSxlQUFBLEdBQWtCO1lBQ2xCLElBQUcsS0FBQyxDQUFDLFFBQUYsR0FBYSxDQUFoQjtjQUNDLGVBQUEsR0FBa0IsT0FBTyxDQUFDLE1BRDNCO2FBQUEsTUFFSyxJQUFHLEtBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxLQUFtQixJQUF0QjtjQUNKLGVBQUEsR0FBa0IsT0FBUSxDQUFBLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFSLEdBQXlCLE9BQU8sQ0FBQyxPQUQvQzthQUFBLE1BQUE7Y0FHSixlQUFBLEdBQWtCLE9BQVEsQ0FBQSxLQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsRUFIdEI7O1lBSUwsS0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFSLEdBQWdCLEtBQUssQ0FBQyxRQUFOLENBQWUsTUFBTSxDQUFDLE9BQXRCLEVBQStCLENBQUMsQ0FBRCxFQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQXRCLENBQS9CLEVBQTJFLENBQUMsQ0FBRCxFQUFJLEdBQUosQ0FBM0UsRUFBcUYsSUFBckY7WUFFaEIsS0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFoQixHQUF5QixLQUFLLENBQUMsUUFBTixDQUFlLE1BQU0sQ0FBQyxPQUF0QixFQUErQixDQUFDLENBQUQsRUFBSSxlQUFKLENBQS9CLEVBQXFELENBQUMsZUFBRCxFQUFrQixpQkFBbEIsQ0FBckQsRUFBMkYsSUFBM0Y7WUFDekIsS0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFoQixHQUFvQixJQUFJLENBQUMsR0FBTCxDQUFTLENBQVQsRUFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFuQjtZQUNwQixLQUFDLENBQUMsSUFBSSxDQUFDLENBQVAsR0FBVyxJQUFJLENBQUMsR0FBTCxDQUFTLENBQUMsTUFBTSxDQUFDLE1BQWpCLEVBQXlCLENBQUMsTUFBTSxDQUFDLE9BQVIsR0FBa0IsTUFBTSxDQUFDLE1BQWxEO1lBQ1gsS0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFSLEdBQVksS0FBSyxDQUFDLFFBQU4sQ0FBZSxNQUFNLENBQUMsT0FBdEIsRUFBK0IsQ0FBQyxjQUFELEVBQWlCLGVBQWpCLENBQS9CLEVBQWtFLENBQUMsQ0FBRCxFQUFJLENBQUMsV0FBTCxDQUFsRSxFQUFxRixJQUFyRjtZQUNaLEtBQUMsQ0FBQyxJQUFJLENBQUMsTUFBUCxHQUFnQixLQUFLLENBQUMsUUFBTixDQUFlLE1BQU0sQ0FBQyxPQUF0QixFQUErQixDQUFDLENBQUQsRUFBSSxlQUFKLENBQS9CLEVBQXFELENBQUMsZUFBRCxFQUFrQixpQkFBbEIsQ0FBckQsRUFBMkYsSUFBM0YsQ0FBQSxHQUFtRyxNQUFNLENBQUM7O2tCQUMvRyxDQUFFLE9BQWIsR0FBdUIsS0FBSyxDQUFDLFFBQU4sQ0FBZSxNQUFNLENBQUMsT0FBdEIsRUFBK0IsQ0FBQyxDQUFELEVBQUksaUJBQUosQ0FBL0IsRUFBdUQsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUF2RCxFQUE4RCxJQUE5RDs7O2tCQUNaLENBQUUsQ0FBYixHQUFpQixLQUFLLENBQUMsUUFBTixDQUFlLE1BQU0sQ0FBQyxPQUF0QixFQUErQixDQUFDLENBQUQsRUFBSSxpQkFBSixDQUEvQixFQUF1RCxDQUFDLFVBQUQsRUFBYSxjQUFiLENBQXZELEVBQXFGLElBQXJGOztZQUNqQixJQUFHLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxLQUFpQixPQUFqQixJQUE2QixLQUFDLENBQUMsUUFBRixLQUFjLENBQTlDO3FCQUNDLEtBQUMsQ0FBQyxVQUFVLENBQUMsT0FBYixHQUF1QixLQUFLLENBQUMsUUFBTixDQUFlLEtBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBdkIsRUFBMEIsQ0FBQyxDQUFBLEdBQUksV0FBQSxHQUFZLENBQWpCLEVBQW9CLENBQUMsV0FBckIsQ0FBMUIsRUFBNkQsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUE3RCxFQUFxRSxJQUFyRSxFQUR4Qjs7VUFsQmEsQ0FBZCxFQUREOztNQWRhO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQXNDZCxVQUFBLEdBQWEsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ1osSUFBRyxLQUFDLENBQUMsUUFBRixLQUFjLENBQWpCO1VBQ0MsS0FBQyxDQUFDLElBQUksQ0FBQyxNQUFQLEdBQWdCLEtBQUMsQ0FBQyxNQUFGLEdBQVcsTUFBTSxDQUFDO1VBQ2xDLEtBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBUCxHQUFXLEtBQUssQ0FBQztVQUNqQixLQUFDLENBQUMsS0FBSyxDQUFDLEtBQVIsR0FBZ0I7VUFDaEIsS0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFSLEdBQVk7VUFDWixLQUFDLENBQUMsU0FBUyxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLEVBQWQ7VUFDaEIsS0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFaLEdBQXNCO1VBQ3RCLEtBQUMsQ0FBQyxhQUFhLENBQUMsTUFBaEIsR0FBeUIsS0FBQyxDQUFDO2lCQUMzQixLQUFDLENBQUMsYUFBYSxDQUFDLENBQWhCLEdBQW9CLEVBUnJCOztNQURZO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQWFiLGtCQUFBLEdBQXFCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxRQUFELEVBQWdCLFFBQWhCLEVBQStCLFVBQS9CO0FBQ3BCLFlBQUE7O1VBRHFCLFdBQVc7OztVQUFJLFdBQVc7OztVQUFJLGFBQWEsS0FBQyxDQUFDOztRQUNsRSxLQUFDLENBQUMsVUFBVSxDQUFDLE9BQWIsR0FBdUI7UUFDdkIsS0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFSLEdBQWtCO1FBQ2xCLEtBQUMsQ0FBQyxTQUFTLENBQUMsT0FBWixHQUFzQjtRQUN0QixVQUFVLENBQUMsT0FBWCxHQUFxQjtRQUNyQixTQUFBLEdBQVksVUFBVSxDQUFDLElBQVgsQ0FBQTtRQUNaLFNBQVMsQ0FBQyxPQUFWLEdBQW9CO1FBQ3BCLFNBQVMsQ0FBQyxXQUFWLEdBQXdCLFVBQVUsQ0FBQztRQUNuQyxTQUFTLENBQUMsTUFBVixHQUFtQixLQUFDLENBQUM7UUFDckIsU0FBUyxDQUFDLENBQVYsR0FBYyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxDQUFWLEdBQWMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxTQUFTLENBQUMsSUFBVixHQUFpQjtRQUNqQixTQUFTLENBQUMsT0FBVixDQUNDO1VBQUEsQ0FBQSxFQUFHLEtBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQTNCO1VBQ0EsQ0FBQSxFQUFHLEtBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBRDNCO1VBRUEsS0FBQSxFQUFPLEtBQUMsQ0FBQSxPQUFPLENBQUMsV0FGaEI7VUFHQSxRQUFBLEVBQVUsRUFIVjtVQUlBLFVBQUEsRUFBWSxHQUpaO1VBS0EsT0FBQSxFQUFTO1lBQUEsSUFBQSxFQUFNLHdCQUFOO1dBTFQ7U0FERDtRQU9BLEtBQUMsQ0FBQyxTQUFTLENBQUMsT0FBWixDQUNDO1VBQUEsT0FBQSxFQUFTLENBQVQ7VUFDQSxPQUFBLEVBQVM7WUFBQSxJQUFBLEVBQU0sd0JBQUEsR0FBMkIsSUFBakM7V0FEVDtTQUREO1FBR0EsS0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFiLEdBQW9CO1FBQ3BCLEtBQUMsQ0FBQyxVQUFVLENBQUMsT0FBYixDQUNDO1VBQUEsT0FBQSxFQUFTLENBQVQ7VUFDQSxPQUFBLEVBQVM7WUFBQSxJQUFBLEVBQU0sd0JBQU47V0FEVDtTQUREO2VBR0EsU0FBUyxDQUFDLGNBQVYsQ0FBeUIsU0FBQTtVQUN4QixLQUFDLENBQUMsU0FBUyxDQUFDLElBQVosR0FBbUI7VUFDbkIsS0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFaLEdBQW9CLE1BQU0sQ0FBQyxLQUFQLEdBQWUsT0FBTyxDQUFDLElBQVIsR0FBZTtVQUNsRCxLQUFDLENBQUMsU0FBUyxDQUFDLE9BQVosR0FBc0I7aUJBQ3RCLEtBQUssQ0FBQyxLQUFOLENBQVksd0JBQVosRUFBc0MsU0FBQTttQkFDckMsU0FBUyxDQUFDLE9BQVYsQ0FBQTtVQURxQyxDQUF0QztRQUp3QixDQUF6QjtNQTFCb0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBbUNyQixzQkFBQSxHQUF5QixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsYUFBRCxFQUFxQixnQkFBckIsRUFBNEMsVUFBNUM7QUFDeEIsWUFBQTs7VUFEeUIsZ0JBQWdCOzs7VUFBSSxtQkFBbUI7OztVQUFJLGFBQWEsS0FBQyxDQUFDOztRQUNuRixVQUFBLENBQUE7UUFDQSxLQUFDLENBQUMsS0FBSyxDQUFDLE9BQVIsR0FBa0I7UUFDbEIsS0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFiLEdBQXVCO1FBQ3ZCLEtBQUMsQ0FBQyxTQUFTLENBQUMsT0FBWixHQUFzQjtRQUN0QixTQUFBLEdBQVksS0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFaLENBQUE7UUFDWixTQUFTLENBQUMsT0FBVixHQUFvQjtRQUNwQixTQUFTLENBQUMsV0FBVixHQUF3QixLQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3BDLFNBQVMsQ0FBQyxNQUFWLEdBQW1CLEtBQUMsQ0FBQztRQUNyQixTQUFTLENBQUMsT0FBVixDQUNDO1VBQUEsQ0FBQSxFQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBMUI7VUFDQSxDQUFBLEVBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUQxQjtVQUVBLEtBQUEsRUFBTyxLQUFDLENBQUEsT0FBTyxDQUFDLFNBRmhCO1VBR0EsUUFBQSxFQUFVLFVBQVUsQ0FBQyxRQUhyQjtVQUlBLFVBQUEsRUFBWSxVQUFVLENBQUMsVUFKdkI7VUFLQSxPQUFBLEVBQVMsQ0FMVDtVQU1BLE9BQUEsRUFBUztZQUFBLElBQUEsRUFBTSx3QkFBTjtXQU5UO1NBREQ7UUFRQSxLQUFDLENBQUMsU0FBUyxDQUFDLElBQVosR0FBbUI7UUFDbkIsS0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFaLENBQ0M7VUFBQSxPQUFBLEVBQVMsQ0FBVDtVQUNBLE9BQUEsRUFBUztZQUFBLElBQUEsRUFBTSx3QkFBTjtXQURUO1NBREQ7ZUFHQSxTQUFTLENBQUMsY0FBVixDQUF5QixTQUFBO1VBQ3hCLEtBQUMsQ0FBQyxLQUFLLENBQUMsSUFBUixHQUFlO1VBQ2YsS0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFiLEdBQW9CO1VBQ3BCLFVBQVUsQ0FBQyxPQUFYLEdBQXFCO2lCQUNyQixLQUFLLENBQUMsS0FBTixDQUFZLHdCQUFaLEVBQXNDLFNBQUE7bUJBQ3JDLFNBQVMsQ0FBQyxPQUFWLENBQUE7VUFEcUMsQ0FBdEM7UUFKd0IsQ0FBekI7TUFyQndCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQThCekIsSUFBQyxDQUFBLFFBQUQsR0FBWSxLQUFLLENBQUMsUUFBTixDQUFlLEdBQWYsRUFBb0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLFFBQUQ7O1VBQUMsV0FBVzs7UUFDM0MsS0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFWLENBQWlCLEtBQUMsQ0FBQyxRQUFGLEdBQWEsQ0FBOUIsRUFBaUMsQ0FBakMsRUFBb0MsUUFBcEM7UUFDQSxJQUFHLEtBQUMsQ0FBQyxRQUFGLEtBQWMsQ0FBZCxJQUFvQixLQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsS0FBaUIsT0FBeEM7VUFDQyxrQkFBQSxDQUFtQixRQUFuQixFQUE2QixLQUFDLENBQUMsT0FBUSxDQUFBLEtBQUMsQ0FBQyxRQUFGLENBQXZDLEVBQW9ELEtBQUMsQ0FBQyxLQUF0RCxFQUREO1NBQUEsTUFBQTtVQUdDLGtCQUFBLENBQW1CLFFBQW5CLEVBQTZCLEtBQUMsQ0FBQyxPQUFRLENBQUEsS0FBQyxDQUFDLFFBQUYsQ0FBdkMsRUFBb0QsS0FBQyxDQUFDLFVBQXRELEVBSEQ7O1FBSUEsS0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFoQixDQUNDO1VBQUEsTUFBQSxFQUFRLE9BQU8sQ0FBQyxLQUFoQjtVQUNBLE9BQUEsRUFBUztZQUFBLElBQUEsRUFBTSx3QkFBTjtXQURUO1NBREQ7UUFHQSxLQUFDLENBQUMsSUFBSSxDQUFDLE9BQVAsQ0FDQztVQUFBLE1BQUEsRUFBUSxPQUFPLENBQUMsS0FBUixHQUFnQixNQUFNLENBQUMsTUFBL0I7VUFDQSxPQUFBLEVBQVM7WUFBQSxJQUFBLEVBQU0sd0JBQU47V0FEVDtTQUREO1FBR0EsRUFBRSxLQUFDLENBQUM7ZUFDSixpQkFBQSxDQUFBO01BYitCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwQjtJQWlCWixJQUFDLENBQUEsWUFBRCxHQUFnQixLQUFLLENBQUMsUUFBTixDQUFlLEdBQWYsRUFBb0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ25DLElBQUcsS0FBQyxDQUFDLFFBQUYsR0FBYSxDQUFoQjtVQUNDLElBQUcsS0FBQyxDQUFDLFFBQUYsS0FBYyxDQUFkLElBQW9CLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxLQUFpQixPQUF4QztZQUNDLHNCQUFBLENBQXVCLEtBQUMsQ0FBQyxPQUFRLENBQUEsS0FBQyxDQUFDLFFBQUYsR0FBYSxDQUFiLENBQWpDLEVBQWtELEtBQUMsQ0FBQyxPQUFRLENBQUEsS0FBQyxDQUFDLFFBQUYsR0FBYSxDQUFiLENBQTVELEVBQTZFLEtBQUMsQ0FBQyxLQUEvRTtZQUNBLEtBQUMsQ0FBQyxhQUFhLENBQUMsT0FBaEIsQ0FDQztjQUFBLE1BQUEsRUFBUSxPQUFRLENBQUEsS0FBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQVIsR0FBeUIsS0FBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCLE9BQU8sQ0FBQyxNQUEzRDtjQUNBLE9BQUEsRUFBUztnQkFBQSxJQUFBLEVBQU0sd0JBQU47ZUFEVDthQUREO1lBR0EsS0FBQyxDQUFDLElBQUksQ0FBQyxPQUFQLENBQ0M7Y0FBQSxNQUFBLEVBQVEsT0FBUSxDQUFBLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFSLEdBQXlCLE1BQU0sQ0FBQyxNQUFoQyxHQUF5QyxLQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0IsT0FBTyxDQUFDLE1BQTNFO2NBQ0EsT0FBQSxFQUFTO2dCQUFBLElBQUEsRUFBTSx3QkFBTjtlQURUO2FBREQsRUFMRDtXQUFBLE1BQUE7WUFTQyxzQkFBQSxDQUF1QixLQUFDLENBQUMsT0FBUSxDQUFBLEtBQUMsQ0FBQyxRQUFGLEdBQWEsQ0FBYixDQUFqQyxFQUFrRCxLQUFDLENBQUMsT0FBUSxDQUFBLEtBQUMsQ0FBQyxRQUFGLEdBQWEsQ0FBYixDQUE1RCxFQUE2RSxLQUFDLENBQUMsVUFBL0UsRUFURDs7VUFVQSxLQUFDLENBQUMsUUFBRixHQUFhLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUMsQ0FBQyxRQUFGLEdBQWEsQ0FBekI7aUJBQ2IsaUJBQUEsQ0FBQSxFQVpEOztNQURtQztJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEI7SUFpQmhCLGlCQUFBLEdBQW9CLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNuQixJQUFHLEtBQUMsQ0FBQyxRQUFGLEtBQWMsQ0FBakI7aUJBQ0MsS0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFiLENBQXFCLE1BQXJCLEVBREQ7U0FBQSxNQUFBO2lCQUdDLEtBQUMsQ0FBQyxVQUFVLENBQUMsT0FBYixDQUFxQixNQUFyQixFQUhEOztNQURtQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7SUFVcEIsSUFBRyxLQUFLLENBQUMsUUFBTixDQUFBLENBQUg7TUFFQyxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsbUJBQXhCLEVBQTZDLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFDNUMsS0FBQyxDQUFBLE1BQUQsQ0FBQTtRQUQ0QztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBN0MsRUFGRDtLQUFBLE1BQUE7TUFNQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWQsQ0FBaUIsb0JBQWpCLEVBQXVDLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFDdEMsS0FBQyxDQUFBLE1BQUQsQ0FBQTtRQURzQztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkMsRUFORDs7RUEvYVk7O0VBd2JiLGVBQUMsQ0FBQSxNQUFELENBQVEsUUFBUixFQUFrQjtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQU0sUUFBUSxDQUFDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBaUMsQ0FBQztJQUF4QyxDQUFMO0dBQWxCOzs7O0dBemI2Qjs7QUEwYjlCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIn0=
