/*:
 * @plugindesc Adds a custom progress screen to the menu.
 * @author Scott
 *
 * @help
 * This plugin adds a "Progress" option to the main menu,
 * which opens a new scene displaying progress bars for various skills.
 */

(function() {

    // ----- Modify Window_MenuCommand to Add "Progress" Option -----
    let _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.call(this); // Preserve existing commands
        this.addCommand("Progress", "progress", true); // Add "Progress" option
    };

    // ----- Modify Scene_Menu to Handle "Progress" Selection -----
    let _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this); // Keep existing commands
        this._commandWindow.setHandler("progress", this.commandProgress.bind(this)); // Handle "Progress"
    };

    Scene_Menu.prototype.commandProgress = function() {
        SceneManager.push(Scene_Progress); // Open custom scene
    };

    // ----- Define Scene_Progress -----
    function Scene_Progress() {
        this.initialize.apply(this, arguments);
    }

    Scene_Progress.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Progress.prototype.constructor = Scene_Progress;

    Scene_Progress.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Progress.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._progressWindow = new Window_Progress(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this.addWindow(this._progressWindow);
    };

    Scene_Progress.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
    
        // Listen for ESC key (cancel)
        if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
            SoundManager.playCancel(); // Play cancel sound effect
            SceneManager.pop(); // Return to the main menu
        }
    };

    // ----- Define Window_Progress -----
    function Window_Progress() {
        this.initialize.apply(this, arguments);
    }

    Window_Progress.prototype = Object.create(Window_Base.prototype);
    Window_Progress.prototype.constructor = Window_Progress;

    Window_Progress.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.drawAllItems();
    };

    Window_Progress.prototype.drawAllItems = function() {
        // Get progress values from game variables
        let htmlValue = $gameVariables.value(22);
        let cssValue = $gameVariables.value(23);
        let pythonValue = $gameVariables.value(24);
        let dsValue = $gameVariables.value(25);

        // Define colors for the progress bars
        let color1 = this.hpGaugeColor1();
        let color2 = this.hpGaugeColor2();

        // Define layout spacing
        let startX = this.padding;
        let startY = this.padding;
        let gaugeWidth = this.contentsWidth() - this.padding * 2;
        let lineHeight = this.lineHeight() + 50; // Add some spacing

        // Draw progress bars
        this.drawText("HTML: " + htmlValue + "%", startX, startY, gaugeWidth, 'left');
        this.drawGauge(startX, startY + 20, gaugeWidth, htmlValue / 100, color1, color2);

        this.drawText("CSS: " + cssValue + "%", startX, startY + lineHeight, gaugeWidth, 'left');
        this.drawGauge(startX, startY + lineHeight + 20, gaugeWidth, cssValue / 100, color1, color2);

        this.drawText("Python: " + pythonValue + "%", startX, startY + lineHeight * 2, gaugeWidth, 'left');
        this.drawGauge(startX, startY + lineHeight * 2 + 20, gaugeWidth, pythonValue / 100, color1, color2);

        this.drawText("DS & Algorithms: " + dsValue + "%", startX, startY + lineHeight * 3, gaugeWidth, 'left');
        this.drawGauge(startX, startY + lineHeight * 3 + 20, gaugeWidth, dsValue / 100, color1, color2);
    };

})();
