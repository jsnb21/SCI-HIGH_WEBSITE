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

        // Prevent overcapping 100%
        if (htmlValue > 100) htmlValue = 100;
        if (cssValue > 100) cssValue = 100;
        if (pythonValue > 100) pythonValue = 100;
        if (dsValue > 100) dsValue = 100;

        // Draw progress bars
        this.drawText("HTML: " + htmlValue + "%", startX, startY, gaugeWidth, 'left');
        this.drawGauge(startX, startY + 20, gaugeWidth, htmlValue / 100, color1, color2);

        this.drawText("CSS: " + cssValue + "%", startX, startY + lineHeight, gaugeWidth, 'left');
        this.drawGauge(startX, startY + lineHeight + 20, gaugeWidth, cssValue / 100, color1, color2);

        this.drawText("Python: " + pythonValue + "%", startX, startY + lineHeight * 2, gaugeWidth, 'left');
        this.drawGauge(startX, startY + lineHeight * 2 + 20, gaugeWidth, pythonValue / 100, color1, color2);

        let unlocked = htmlValue >= 100 && cssValue >= 100 && pythonValue >= 100;

        if (unlocked) {
            this.drawText("DS & Algorithms: " + dsValue + "%", startX, startY + lineHeight * 3, gaugeWidth, 'left');
            this.drawGauge(startX, startY + lineHeight * 3 + 20, gaugeWidth, dsValue / 100, color1, color2);
        } else {
            this.changePaintOpacity(false);
            this.drawText("???", startX, startY + lineHeight * 3, gaugeWidth, 'left');
            this.drawGauge(startX, startY + lineHeight * 3 + 20, gaugeWidth, dsValue / 100, color1, color2);
            this.changePaintOpacity(true);
        }

        // Calculate Y position below the last gauge (DS & Algorithms)
        let badgeStartY = startY + (lineHeight * 4) + 40; // 4 lines * spacing + extra padding
        let badgeX = startX;

        let badges = [
            { switchId: 42, faceIndex: 0 },
            { switchId: 43, faceIndex: 1 },
            { switchId: 44, faceIndex: 2 },
        ];

        badges.forEach(badge => {
            if ($gameSwitches.value(badge.switchId)) {
                this.drawFace("COURSE_BADGES", badge.faceIndex, badgeX, badgeStartY, 144, 144);
                badgeX += 150; // Move right for the next badge
            }
        });
    };

})();

// Check if all Courses are 100%
function dsUnlocked() {
    let htmlValue = $gameVariables.value(22);
    let cssValue = $gameVariables.value(23);
    let pythonValue = $gameVariables.value(24);
    let dsValue = $gameVariables.value(25);

    if (htmlValue === 100 && cssValue === 100 && pythonValue === 100) {
        $gameMessage.add("Enter the world of \\C[17]Data Structures and Algorithms\\C[0]?");
        $gameMessage.setChoices(["Yes", "No"], 0, -1);
        $gameMessage.setChoiceCallback(function(choiceIndex) {
            if (choiceIndex === 0) {
                AudioManager.stopBgm();
                $gamePlayer.reserveTransfer(25, 17, 98, 0, 1);
            }
        });
    }
}

// Minigames Progress

function noahProgress() {

    let milestone = $gameVariables.value(45);
    let trigger = $gameVariables.value(78);

    if (milestone == 3 && trigger == 3) {
        $gameMessage.setFaceImage("School_NPCFaces-M", 4)
        $gameMessage.setBackground(0)
        $gameMessage.add("\\C[20]Noah\\C[0]\nI will be focusing on studying now.")
    } 

    if (milestone <= 0) {
        $gameMessage.setBackground(1)
        $gameMessage.add("He completely ignores your prescence.")
    } else {
        switch (milestone) {
        case 3:
            if (trigger == 3) break;

            if (trigger == 0) {
                $gameParty.gainItem($dataItems[25], 2);
            }

            if (trigger == 2) {
                $gameParty.gainItem($dataItems[25], 1);
            }

            $gameVariables.setValue(78, 3);
            $gameSelfSwitches.setValue([11, 1, 'D'], true);
            break;

        case 2:
            if (trigger == 2) break;

            if (trigger == 0) {
                $gameParty.gainItem($dataItems[25], 1);
            }

            $gameVariables.setValue(78, 2);
            $gameSelfSwitches.setValue([11, 1, 'C'], true);
            break;

        case 1:
            if (trigger == 1) break;

            $gameSelfSwitches.setValue([11, 1, 'B'], true);
            $gameVariables.setValue(78, 1);
            break;

        default:
            break;
        }

        // Switches to A if Noah Quest is still not done
         if (!(milestone == 3 && trigger == 3)) {
        $gameSelfSwitches.setValue([11, 1, 'A'], true);
         }
        

    }

}

function tinaProgress () {

    let milestone = $gameVariables.value(54);
    let trigger = $gameVariables.value(79);

    if (milestone == 3 && trigger == 3) {
        $gameMessage.setFaceImage("School_NPCFaces-F", 6)
        $gameMessage.setBackground(0)
        $gameMessage.add("\\C[10]Tina\\C[0]\nNever stop progressing!")
    } 

    if (milestone <= 0) {
        $gameMessage.setFaceImage("School_NPCFaces-F", 6)
        $gameMessage.setBackground(0)
        $gameMessage.add("\\C[25]???\\C[0]\nGet out of the way!")
    } else {
        switch (milestone) {
        case 3:
            if (trigger == 3) break;

            if (trigger == 0) {
                $gameParty.gainItem($dataItems[25], 2);
            }

            if (trigger == 2) {
                $gameParty.gainItem($dataItems[25], 1);
            }

            $gameVariables.setValue(79, 3);
            $gameSelfSwitches.setValue([13, 8, 'D'], true);
            break;

        case 2:
            if (trigger == 2) break;

            if (trigger == 0) {
                $gameParty.gainItem($dataItems[25], 1);
            }

            $gameVariables.setValue(79, 2);
            $gameSelfSwitches.setValue([13, 8, 'C'], true);
            break;

        case 1:
            if (trigger == 1) break;

            $gameSelfSwitches.setValue([13, 8, 'B'], true);
            $gameVariables.setValue(79, 1);
            break;

        default:
            break;
        }

        // Switches to A if Tina Quest is still not done
         if (!(milestone == 3 && trigger == 3)) {
        $gameSelfSwitches.setValue([13, 8, 'A'], true);
         }
    }
}

function evelynProgress () {


    let milestone = $gameVariables.value(49);
    let trigger = $gameVariables.value(80);

    if (milestone == 3 && trigger == 3) {
        $gameMessage.setFaceImage("School_NPCFaces-F", 4)
        $gameMessage.setBackground(0)
        $gameMessage.add("\\C[31]Evelyn\\C[0]\nI will be focusing on studying now.")
    } 

    if (milestone <= 0) {
        $gameMessage.setBackground(1)
        $gameMessage.add("You feel an intimidating prescence. It's best not to talk to her.")
    } else {
        switch (milestone) {
        case 3:
            if (trigger == 3) break;

            if (trigger == 0) {
                $gameParty.gainItem($dataItems[25], 2);
            }

            if (trigger == 2) {
                $gameParty.gainItem($dataItems[25], 1);
            }

            $gameVariables.setValue(80, 3);
            $gameSelfSwitches.setValue([9, 6, 'D'], true);
            break;

        case 2:
            if (trigger == 2) break;

            if (trigger == 0) {
                $gameParty.gainItem($dataItems[25], 1);
            }

            $gameVariables.setValue(80, 2);
            $gameSelfSwitches.setValue([9, 6, 'C'], true);
            break;

        case 1:
            if (trigger == 1) break;

            $gameSelfSwitches.setValue([9, 6, 'B'], true);
            $gameVariables.setValue(80, 1);
            break;

        default:
            break;
        }

        // Switches to A if Evelyn Quest is still not done
         if (!(milestone == 3 && trigger == 3)) {
        $gameSelfSwitches.setValue([9, 6, 'A'], true);
         }
        

    }
}
