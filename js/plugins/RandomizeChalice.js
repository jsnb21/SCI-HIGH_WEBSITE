/*:
* @plugindesc Randomizes event self-switches when WinBattle switch is ON, with less frequent 'D' use
* @author Scott
*
* @help
* This plugin resets and randomizes specific event self-switches
* whenever the "WinBattle" switch (ID 2) is turned ON.
*
* To use this plugin, call:
*   RandomEventManager.randomizeEvents();
*/

var RandomEventManager = RandomEventManager || {};

RandomEventManager.randomizeEvents = function() {
    var winBattleSwitch = 2;       // ID of the "WinBattle" switch
    var variableID = 10;           // Variable for debug or tracking
    var lastSwitchVar = 41;        // Optional: persistent switch tracking

    if (!$gameSwitches.value(winBattleSwitch)) return;

    let usedD = false; // New: Track if 'D' has already been used in this run

    $gameMap.events().forEach(event => {
        // Reset all self-switches
        ["A", "B", "C", "D"].forEach(switchLetter => {
            $gameSelfSwitches.setValue([$gameMap.mapId(), event.eventId(), switchLetter], false);
        });

        // Generate a random number
        var randomEventID = Math.floor(Math.random() * 100) + 1;
        $gameVariables.setValue(variableID, randomEventID);

        // Decide switch
        let chosenSwitch = '';
        if (randomEventID <= 50) {
            chosenSwitch = 'A';
        } else if (randomEventID <= 70) {
            chosenSwitch = 'B';
        } else if (randomEventID <= 90) {
            chosenSwitch = 'C';
        } else {
            chosenSwitch = 'D';
        }

        // Prevent more than one 'D' per run
        if (chosenSwitch === 'D') {
            if (usedD) {
                const fallback = ['A', 'B', 'C'];
                chosenSwitch = fallback[Math.floor(Math.random() * fallback.length)];
            } else {
                usedD = true;
            }
        }

        // Set the self-switch
        $gameSelfSwitches.setValue([$gameMap.mapId(), event.eventId(), chosenSwitch], true);
        $gameVariables.setValue(lastSwitchVar, chosenSwitch); // Optional: store last switch
    });
};
