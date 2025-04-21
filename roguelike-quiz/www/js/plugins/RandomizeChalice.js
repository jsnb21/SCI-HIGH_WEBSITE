/*:
* @plugindesc Randomizes event self-switches when WinBattle switch is ON
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
    var winBattleSwitch = 2; // ID of the "WinBattle" switch
    var variableID = 10; // ID of the variable "RandomEventID"

    // Check if WinBattle switch is ON before randomizing
    if (!$gameSwitches.value(winBattleSwitch)) return;

    // Reset all self-switches for events on the current map
    $gameMap.events().forEach(event => {
        ["A", "B", "C", "D"].forEach(switchLetter => {
            $gameSelfSwitches.setValue([$gameMap.mapId(), event.eventId(), switchLetter], false);
        });

        // Generate a new random value
        var randomEventID = Math.floor(Math.random() * 100) + 1;
        $gameVariables.setValue(variableID, randomEventID);

        // Set a random self-switch based on the new value
        if (randomEventID <= 50) {
            $gameSelfSwitches.setValue([$gameMap.mapId(), event.eventId(), 'A'], true);
        } else if (randomEventID <= 70) {
            $gameSelfSwitches.setValue([$gameMap.mapId(), event.eventId(), 'B'], true);
        } else if (randomEventID <= 90) {
            $gameSelfSwitches.setValue([$gameMap.mapId(), event.eventId(), 'C'], true);
        } else {
            $gameSelfSwitches.setValue([$gameMap.mapId(), event.eventId(), 'D'], true);
        }
    });
};
