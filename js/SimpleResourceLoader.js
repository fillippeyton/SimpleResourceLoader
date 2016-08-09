var SimpleResourceLoader = (function(){
    var _ResourceLoader = function (resourceLocation) {
        this._resourceLocation = resourceLocation || document.getElementsByTagName('head')[0];

        this.require = function (resources, callback) {
            this._resourcesLoaded = 0;
            this._totalResources = resources.length;
            this._callback = callback;

            for (var i = 0; i < resources.length; i++) {
                this._addResourceToDom(resources[i]);
            }
        };

        this._loaded = function (event) {
            this._resourcesLoaded++;
            if (this._resourcesLoaded == this._totalResources && typeof this._callback === 'function') this._callback();
        };
    };

    var StyleLoader = function (styleLocation) {
        _ResourceLoader.call(this, styleLocation); // inherit from ScriptLoader

        this._addResourceToDom = function (href) {
            var styleTag = document.createElement('link');
            var thisJavascriptLoader = this;

            styleTag.rel = "stylesheet";
            styleTag.href = href;
            $(styleTag).load(function (event) {
                thisJavascriptLoader._loaded(event);
            });

            this._resourceLocation.appendChild(styleTag);
        };
    };

    var JavascriptLoader = function (scriptLocation) {
        _ResourceLoader.call(this, scriptLocation); // inherit from ScriptLoader

        this._addResourceToDom = function (src) {
            var scriptTag = document.createElement('script');
            var thisJavascriptLoader = this;

            scriptTag.type = "text/javascript";
            scriptTag.async = false;
            scriptTag.src = src;
            $(scriptTag).load(function (event) {
                thisJavascriptLoader._loaded(event);
            });

            this._resourceLocation.appendChild(scriptTag);
        };
    };

    return {
        JavascriptLoader: JavascriptLoader,
        StyleLoader: StyleLoader
    }
})();