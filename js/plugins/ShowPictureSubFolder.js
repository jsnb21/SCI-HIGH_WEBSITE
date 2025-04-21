/*:
 * @plugindesc Enables showing pictures from subfolders within img/pictures/ using showPicture script calls.
 * @author Scott
 *
 * @help Use $gameScreen.showPicture as usual, but include subfolder path:
 * Example: $gameScreen.showPicture(1, "cutscenes/intro1", 0, 0, 0, 100, 100, 255, 0);
 */

(function() {
    const _ImageManager_loadPicture = ImageManager.loadPicture;
    ImageManager.loadPicture = function(filename, hue) {
        if (filename.contains("/")) {
            return this.loadBitmap('img/pictures/', filename, hue, true);
        }
        return _ImageManager_loadPicture.call(this, filename, hue);
    };
})();
