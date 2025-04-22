/*:
 * @plugindesc Calls a Loading Screen to make sure everything is loaded properly.
 * @author Scott
 *
 * @help
 * Calls a Loading Screen to make sure everything is loaded properly.
 */

// File: PreloadJSON.js
(() => {
  const JSON_FILES_TO_LOAD = [
    "books.json",
  ];

  function Scene_LoadingAssets() {
    this.initialize(...arguments);
  }

  Scene_LoadingAssets.prototype = Object.create(Scene_Base.prototype);
  Scene_LoadingAssets.prototype.constructor = Scene_LoadingAssets;

  Scene_LoadingAssets.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this._loadedCount = 0;
    this._minimumTime = 60; // 60 frames per second × 3 = 3 seconds
    this._elapsedTime = 0;
    this._fadeOutStarted = false;
    this._nextScene = Scene_Map;
  };

  Scene_LoadingAssets.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createLoadingImage();
    this.startLoadingAll();
    this._fadeSprite = new ScreenSprite(); // For fade-out
    this._fadeSprite.opacity = 0;
    this.addChild(this._fadeSprite);
  };

  Scene_LoadingAssets.prototype.createLoadingImage = function () {
    const bitmap = ImageManager.loadSystem("Loading");
    this._loadingSprite = new Sprite(bitmap);
    this._loadingSprite.anchor.set(0.5, 0.5);
    this._loadingSprite.x = Graphics.width / 2;
    this._loadingSprite.y = Graphics.height / 2;
    this.addChild(this._loadingSprite);
  };

  Scene_LoadingAssets.prototype.startLoadingAll = function () {
    this._total = JSON_FILES_TO_LOAD.length;
    this._loadedCount = 0;
    this._loadedData = {};

    JSON_FILES_TO_LOAD.forEach(filename => {
      const url = filename;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.overrideMimeType("application/json");
      xhr.onload = () => {
        if (xhr.status < 400) {
          try {
            const data = JSON.parse(xhr.responseText);
            this._loadedData[filename] = data;
            this._loadedCount++;
          } catch (e) {
            console.error("JSON Parse Error:", e);
          }
        } else {
          console.error("Failed to load:", filename);
        }
      };
      xhr.onerror = () => console.error("Network error loading:", filename);
      xhr.send();
    });
  };

  Scene_LoadingAssets.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this._elapsedTime++;

    // Optional pulse effect
    this._loadingSprite.scale.x = 1 + 0.05 * Math.sin(Graphics.frameCount / 15);
    this._loadingSprite.scale.y = this._loadingSprite.scale.x;

    const timeReady = this._elapsedTime >= this._minimumTime;
    const dataReady = this._loadedCount >= this._total;

    if (timeReady && dataReady && !this._fadeOutStarted) {
      this.startFadeOut();
    }

    if (this._fadeOutStarted && this._fadeSprite.opacity >= 255) {
      $gameTemp._preloadedJson = this._loadedData;
      SceneManager.goto(this._nextScene);
    }
  };

  Scene_LoadingAssets.prototype.startFadeOut = function () {
    this._fadeOutStarted = true;
    this._fadeSprite.opacity = 0;
    this._fadeOutSpeed = 8; // Adjust speed if needed
  };

  Scene_LoadingAssets.prototype.updateFade = function () {
    if (this._fadeOutStarted && this._fadeSprite.opacity < 255) {
      this._fadeSprite.opacity += this._fadeOutSpeed;
    }
  };

  const _Scene_LoadingAssets_update = Scene_LoadingAssets.prototype.update;
  Scene_LoadingAssets.prototype.update = function () {
    _Scene_LoadingAssets_update.call(this);
    this.updateFade();
  };

  window.Scene_LoadingAssets = Scene_LoadingAssets;
})();