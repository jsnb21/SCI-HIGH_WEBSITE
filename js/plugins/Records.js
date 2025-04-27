function displayLeaderboard() {
    // This will later be updated to real past run records
    var leaderboard = [
        {name: $gameParty.leader().name(), score: 3000},
        {name: $gameParty.leader().name(), score: 2500},
        {name: $gameParty.leader().name(), score: 2000},
    ];
    
    var message = "Top 3 Players!\n";
    leaderboard.forEach((entry, index) => {
        message += (index + 1) + ". " + entry.name + " - " + entry.score + " pts\n";
    });
    
    message += "Good job, keep up the great work!";
    
    $gameMessage.add(message);
}

function totalPlaytime() {
    return $gameSystem.playtime(); // Already returns seconds
}

function declareStart() {
    $gameVariables.setValue(27, $gameSystem.playtime()); // Save dungeon start time
}

function clearTime() {
    var startTime = $gameVariables.value(27);
    var endTime = $gameSystem.playtime();
    var clearSeconds = endTime - startTime;

    // Format to mm:ss
    var minutes = Math.floor(clearSeconds / 60);
    var seconds = clearSeconds % 60;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function calculateRank() {
    var startTime = $gameVariables.value(27);
    var endTime = $gameSystem.playtime();
    var clearSeconds = endTime - startTime;
    var clearMinutes = clearSeconds / 60;
    var mistakes = $gameVariables.value(30);

    if (clearMinutes <= 2 && mistakes <= 1) {
        return "\\{\\C[17]S\\C[0]\\}";
    } else if (clearMinutes <= 3 && mistakes <= 3) {
        return "\\{\\C[16]A\\C[0]\\}";
    } else {
        return "\\{\\C[18]B\\C[0]\\}";
    }
}

function displayClearStats() {
    $gameScreen.startTint([-120, -120, -120, 60], 60);
    $gameMessage.setBackground(1);
    $gameMessage.setPositionType(1);
    
    $gameMessage.add("\\C[17]Clear Time\\C[0]: " + clearTime() + "\n\\C[18]Total Mistakes\\C[0]: " + $gameVariables.value(30) + "\nYou got " + calculateRank() + " rank!");


    $gameScreen.startTint([0, 0, 0, 0], 60);
}
