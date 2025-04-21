function course_dungeon() {
    let html_clear = $gameSwitches.value(42);
    let css_clear = $gameSwitches.value(43);
    let python_clear = $gameSwitches.value(44);

    if (!html_clear && !css_clear && !python_clear) {
        
        // First Run: No courses completed
        AudioManager.playSe({
            name: "Teleport", // Name of the SE file (without extension)
            volume: 90,       // Volume (0-100)
            pitch: 100,       // Pitch (default 100)
            pan: 0            // Stereo panning (-100 left to 100 right)
        });
        
        $gamePlayer.reserveTransfer(6, 8, 7, 0, 1); // Map ID 6, Coordinates (8,7)
    
    } else if (html_clear && css_clear) {
        // Both HTML and CSS cleared
        $gameScreen.startTint([-120, -120, -120, 60], 60);
        
        $gameMessage.setBackground(1);
        $gameMessage.setPositionType(0);
        $gameMessage.add("Select \\C[17]Course\\C[0]:");
        
        $gameMessage.setChoiceBackground(1);
        $gameMessage.setChoicePositionType(1);
        $gameMessage.setChoices(["\\C[1]HTML\\C[0]", "\\C[2]CSS\\C[0]", "\\C[3]PYTHON\\C[0]", "Cancel"], 0, -1);
        $gameMessage.setChoiceCallback(function(choiceIndex) {
            if (choiceIndex === 0) {
                // HTML
                $gameScreen.startTint([0, 0, 0, 0], 60);
                AudioManager.playSe({
                    name: "Teleport",
                    volume: 90,
                    pitch: 100,
                    pan: 0
                });
                $gamePlayer.reserveTransfer(6, 8, 7, 0, 1); // Map ID 6, Coordinates (8,7)

            } else if (choiceIndex === 1) {
                // CSS
                $gameScreen.startTint([0, 0, 0, 0], 60);
                AudioManager.playSe({
                    name: "Teleport",
                    volume: 90,
                    pitch: 100,
                    pan: 0
                });
                $gamePlayer.reserveTransfer(5, 8, 7, 0, 1); // Map ID 5, Coordinates (8,7)

            } else if (choiceIndex === 2) {
                // Python
                $gameScreen.startTint([0, 0, 0, 0], 60);
                AudioManager.playSe({
                    name: "Teleport",
                    volume: 90,
                    pitch: 100,
                    pan: 0
                });
                $gamePlayer.reserveTransfer(12, 8, 7, 0, 1); // Map ID 12, Coordinates (8,7)

            } else {
                $gameScreen.startTint([0, 0, 0, 0], 1);
            }
        });
    } else if (html_clear) {
        // HTML Dungeon is Cleared
        $gameScreen.startTint([-120, -120, -120, 60], 60);
        
        $gameMessage.setBackground(1);
        $gameMessage.setPositionType(1);
        $gameMessage.add("Skip \\C[17]HTML Course\\C[0] and proceed to \\C[17]CSS Course\\C[0]?");
        
        $gameMessage.setChoiceBackground(1);
        $gameMessage.setChoicePositionType(1);
        $gameMessage.setChoices(["Yes", "No", "Cancel"], 0, -1);
        $gameMessage.setChoiceCallback(function(choiceIndex) {
            if (choiceIndex === 0) {
                // Proceed to CSS Course
                $gameScreen.startTint([0, 0, 0, 0], 60);
                AudioManager.playSe({
                    name: "Teleport",
                    volume: 90,
                    pitch: 100,
                    pan: 0
                });
                $gamePlayer.reserveTransfer(5, 8, 7, 0, 1); // Map ID 5, Coordinates (8,7)
            } else if (choiceIndex == 1) {
                // Stay on HTML Dungeon
                $gameScreen.startTint([0, 0, 0, 0], 60);
                AudioManager.playSe({
                    name: "Teleport",
                    volume: 90,
                    pitch: 100,
                    pan: 0
                });
                $gamePlayer.reserveTransfer(6, 8, 7, 0, 1); // Map ID 6, Coordinates (8,7)
            } else {
                $gameScreen.startTint([0, 0, 0, 0], 1);
            }
        });
    }
}
