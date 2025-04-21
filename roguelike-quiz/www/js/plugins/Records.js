function displayLeaderboard() {

    // To be changed to records of previous runs instead of leaderboard
    var leaderboard = [
        {name: $gameParty.leader().name(), score: 3000},
        {name: $gameParty.leader().name(), score: 2500},
        {name: $gameParty.leader().name(), score: 2000},
    ];
    
    var message = "Top 3 Players!\n";
    leaderboard.forEach((entry, index) => {
        message += (index + 1) + ". " + entry.name + " - " + entry.score + " pts\n";
    });
    
    message += "Good job, Keep up the great work!";
    
    $gameMessage.add(message);
}