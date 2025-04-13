var QuizSystem = (function () {
    var topics = {};
    var selectedTopic = "";
    var usedQuestions = [];
    var quizLoaded = false;

    function fetchQuestions(callback) {
        fetch("data/quizData.json")
            .then(response => response.json())
            .then(data => {
                QuizSystem.loadQuestions(data);
                quizLoaded = true;
                console.log("JSON Loaded. Available topics:", Object.keys(data));
                if (callback) callback();
            })
            .catch(error => console.error("QuizSystem: Error loading JSON:", error));
    }

    return {
        loadQuestions: function (jsonData) {
            if (!jsonData || Object.keys(jsonData).length === 0) {
                console.error("QuizSystem: JSON data is empty or undefined.");
                return;
            }
            topics = jsonData;
            console.log("QuizSystem: Questions loaded successfully. Topics:", Object.keys(topics));
        },

        setTopic: function (topic) {
            if (!quizLoaded) {
                console.warn("QuizSystem: Questions not loaded yet! Fetching now...");
                fetchQuestions(() => QuizSystem.setTopic(topic));
                return;
            }

            if (topics.hasOwnProperty(topic)) {
                if (selectedTopic !== topic) {
                    selectedTopic = topic;
                    usedQuestions = [];
                }
                console.log("QuizSystem: Topic set to", topic);
            } else {
                console.error("QuizSystem: Invalid topic!");
            }
        },

        getQuestion: function () {
            if (!selectedTopic || !topics[selectedTopic]) {
                console.warn("QuizSystem: No valid topic selected.");
                return;
            }
        
            let questionPool = topics[selectedTopic];
            if (!questionPool.length) {
                console.warn("QuizSystem: No questions available.");
                return;
            }
        
            // Collect only unasked and unanswered question indexes
            let availableIndexes = [];
            for (let i = 0; i < questionPool.length; i++) {
                if (!usedQuestions.includes(i) && !questionPool[i].answered) {
                    availableIndexes.push(i);
                }
            }
        
            if (!availableIndexes.length) {
                console.warn("QuizSystem: No more unique questions available.");

                // Restore the questions automatically
                this.restoreQuestions();
                return;
            }
        
            // Select a random unused question
            let randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
            usedQuestions.push(randomIndex);
            let questionData = questionPool[randomIndex];
        
            console.log("Selected Question Index:", randomIndex);
            console.log("Selected Question Data:", questionData);
        
            // Update game variables only if needed
            if ($gameVariables.value(11) !== String(questionData.question)) {
                $gameVariables.setValue(11, String(questionData.question));
            }
        
            questionData.choices.forEach((choice, i) => {
                if ($gameVariables.value(12 + i) !== String(choice)) {
                    $gameVariables.setValue(12 + i, String(choice));
                }
            });
        
            if ($gameVariables.value(16) !== questionData.answer) {
                $gameVariables.setValue(16, questionData.answer);
            }
        
            $gameMessage.add(questionData.question);
        },        
        
        
        checkAnswer: function () {
            var playerChoice = parseInt($gameVariables.value(17)); // 1-based index
            var correctAnswer = parseInt($gameVariables.value(16)); // 1-based index
        
            console.log("Player Choice:", playerChoice);
            console.log("Correct Answer:", correctAnswer);
        
            // Check if the timer is finished
            if ($gameTimer.seconds() === 0) {
                console.log("Timer is at 0. Skipping all actions.");
                return; // Stop execution entirely
            }
        
            if (playerChoice === correctAnswer) {
                $gameVariables.setValue(18, 1);
        
                // Timer adding if correct
                var currentTime = $gameTimer.seconds(); 
                var newTime = currentTime + 10; // Store the computed time before modifying
                $gameVariables.setValue(28, currentTime); 
                
                if (newTime >= 30) {
                    window.settimer([0,30,0,0]);
                } else {
                    window.addtimer([0,10,0,0]);
                }
        
                if (SceneManager._scene instanceof Scene_Battle) {
                    SceneManager._scene._logWindow.push("addText", "Correct Answer! 3 seconds added!");
                }
                AudioManager.playSe({ name: "Bell3", volume: 70, pitch: 100, pan: 0 });
        
                // Mark last used question as answered
                let lastIndex = usedQuestions[usedQuestions.length - 1];
                if (topics[selectedTopic][lastIndex]) {
                    topics[selectedTopic][lastIndex].answered = true;
                    console.log("Marked Question as Answered:", topics[selectedTopic][lastIndex]);
                }
        
                // Attack Enemy
                var actor = $gameActors.actor(1); // Actor ID 1
                var skillId = 1; // Skill ID from database
                var target = -2; // Target: -2 (Random Enemy), -1 (Last Target), 1+ (Specific Enemy/Actor)
        
                actor.forceAction(skillId, target);
                BattleManager.forceAction(actor);
        
                AudioManager.playSe({ name: "Decision1", volume: 90, pitch: 100, pan: 0 });
        
            } else {
                $gameVariables.setValue(18, 0);
                // Timer minus if wrong
                var currentTime = $gameTimer.seconds();
                var newTime = currentTime - 2; // Subtract 2 seconds for a wrong answer

                // Ensure the timer does not go below zero
                if (newTime < 0) {
                    newTime = 0;
                }

                // Update the timer
                $gameVariables.setValue(28, currentTime); // Store the current time in variable 28
                if (newTime > 0) {
                    window.addtimer([0, -2, 0, 0]); // Decrease timer by 2 seconds
                } else {
                    $gameTimer.stop(); // Stop the timer if it reaches zero
                    setTimeout(() => {
                        $gameTimer.start(0); // Start with at least 1 second to avoid instant expiration
                    }, 100);
                }
                        
                // ✅ Force message display immediately if in battle
                if (SceneManager._scene instanceof Scene_Battle) {
                    SceneManager._scene._logWindow.push("addText", "Wrong answer! 2 seconds deducted!");
                }
        
                // Enemy Attack Player
                var enemy = $gameTroop.members()[0]; // Get the first enemy in the troop
                var skills = enemy.enemy().actions.map(action => action.skillId); // Get enemy's skills
        
                if (skills.length > 0) {
                    var randomSkill = skills[Math.floor(Math.random() * skills.length)]; // Pick a random skill
                    var target = -2; // Random actor target
        
                    AudioManager.playSe({ name: "Bell1", volume: 70, pitch: 100, pan: 0 });
                    enemy.forceAction(randomSkill, target);
                    BattleManager.forceAction(enemy);
                } else {
                    console.log("Enemy has no skills assigned in the database.");
                }
            }
        },        

        listAnsweredQuestions: function () {
            if (!selectedTopic || !topics[selectedTopic]) {
                console.warn("QuizSystem: No valid topic selected.");
                return;
            }
        
            let answeredQuestions = topics[selectedTopic].filter(q => q.answered);
            let allQuestions = topics[selectedTopic]; // Get all questions
            let usedQuestionIndexes = usedQuestions; // Track used questions
        
            if (answeredQuestions.length === 0) {
                console.log("QuizSystem: No questions have been answered correctly yet.");
                return;
            }
        
            console.log("✅ Answered Questions:");
            answeredQuestions.forEach((q, index) => {
                console.log(`${index + 1}. ${q.question} (Answer: ${q.answer})`);
            });
        
            // 🔍 Debugging Logs
            console.log("📌 Total Questions in Topic:", allQuestions.length);
            console.log("📌 Used Question Indexes:", usedQuestionIndexes);
            console.log("📌 Remaining Questions:", allQuestions.filter(q => !q.answered));
            
            // Identify skipped questions
            let skippedQuestions = allQuestions.filter((q, i) => !usedQuestionIndexes.includes(i) && !q.answered);
            console.log("❌ Skipped Questions:", skippedQuestions);
        },
        
        restoreQuestions: function () {
            if (usedQuestions.length === 0) {
                console.warn("QuizSystem: No questions to restore.");
                return;
            }
        
            usedQuestions.length = 0; // Clears used questions without creating a new array
        
            Object.keys(topics).forEach(topicKey => {
                topics[topicKey].forEach(question => {
                    question.answered = false;
                });
            });
        
            console.log("QuizSystem: All questions are now available again.");
        },
        

        showChoices: function () {
            var choices = [
                $gameVariables.value(12),
                $gameVariables.value(13),
                $gameVariables.value(14),
                $gameVariables.value(15)
            ];

            $gameMessage.setChoices(choices, 0, -1);
            $gameMessage.setChoiceCallback(choiceIndex => {
                $gameVariables.setValue(17, choiceIndex + 1);
                QuizSystem.checkAnswer();
            });
        },
        checkTimer: function () {
            if ($gameTimer && $gameTimer.seconds() <= 0) {
                const actor = $gameParty.leader(); // Get the party leader
        
                if (actor && actor.hp > 0 && !$gameSwitches.value(99)) {
                    $gameSwitches.setValue(99, true);
                    $gameTimer.start(0);
                    $gameTimer.stop();
        
                    // Slight delay before aborting
                    setTimeout(() => {
                        BattleManager.abort();
        
                        setTimeout(() => {
                            const waitForMap = () => {
                                if (SceneManager._scene instanceof Scene_Map) {
                                    $gameSwitches.setValue(99, false);
                                } else {
                                    setTimeout(waitForMap, 100);
                                }
                            };
                            waitForMap();
                        }, 300);
                    }, 100);
                }
            }
        }
        
                                  
    };
})();

