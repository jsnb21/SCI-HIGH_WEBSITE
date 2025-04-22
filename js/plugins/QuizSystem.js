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

            let availableIndexes = [];
            for (let i = 0; i < questionPool.length; i++) {
                if (!usedQuestions.includes(i) && !questionPool[i].answered) {
                    availableIndexes.push(i);
                }
            }

            if (!availableIndexes.length) {
                console.warn("QuizSystem: No more unique questions available.");
                this.restoreQuestions();
                return;
            }

            let randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
            usedQuestions.push(randomIndex);
            let questionData = questionPool[randomIndex];

            console.log("Selected Question Index:", randomIndex);
            console.log("Selected Question Data:", questionData);

            let choices = questionData.choices.slice();
            let answer = questionData.answer;

            if (choices.length >= 3) {
                let paired = choices.map((choice, index) => ({ choice, index: index + 1 }));
                for (let i = paired.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [paired[i], paired[j]] = [paired[j], paired[i]];
                }
                choices = paired.map(p => p.choice);
                answer = paired.findIndex(p => p.index === questionData.answer) + 1;
            }

            $gameVariables.setValue(11, String(questionData.question));
            choices.forEach((choice, i) => {
                $gameVariables.setValue(12 + i, String(choice));
            });
            $gameVariables.setValue(29, choices.length);
            $gameVariables.setValue(16, answer);
            $gameMessage.add(questionData.question);
        },

        checkAnswer: function () {
            var playerChoice = parseInt($gameVariables.value(17));
            var correctAnswer = parseInt($gameVariables.value(16));

            console.log("Player Choice:", playerChoice);
            console.log("Correct Answer:", correctAnswer);

            if (playerChoice === correctAnswer) {
                // Sets variable 18 to 1 for a correct answer
                $gameVariables.setValue(18, 1);
            
                // Get current timer seconds
                var currentTime = $gameTimer.seconds();
            
                // Check if the timer has already run out
                if (currentTime <= 0) {
                    // If timer is done, does not add time
                    console.log("Game Over: Timer has already ended.");
                    return;
                }
            
                // Otherwise, continue adding time
                var newTime = currentTime + 10;
                var actor = $gameActors.actor(1);
                var smartWatch = actor.hasArmor($dataArmors[3])
                $gameVariables.setValue(28, currentTime);
            
                // Check if the new time will exceed 30 seconds
                if (newTime >= 30) {
                    window.settimer([0, 30, 0, 0]); // Set timer to 30 seconds
                } else {
                    if (smartWatch) {
                        window.addtimer([0, 15, 0, 0]); // Add 15 seconds to the timer if Smart Watch is Equipped
                    } else {
                        window.addtimer([0, 10, 0, 0]); // Add 10 seconds to the timer
                    }
                }


                if (SceneManager._scene instanceof Scene_Battle) {
                    if (smartWatch) {
                        SceneManager._scene._logWindow.push("addText", "Correct Answer! 15 seconds added!");
                    } else {
                        SceneManager._scene._logWindow.push("addText", "Correct Answer! 10 seconds added!");
                    }
                }

                AudioManager.playSe({ name: "Bell3", volume: 70, pitch: 100, pan: 0 });

                let lastIndex = usedQuestions[usedQuestions.length - 1];
                if (topics[selectedTopic][lastIndex]) {
                    topics[selectedTopic][lastIndex].answered = true;
                }

                var actor = $gameActors.actor(1);
                var target = -2;
                var normalSkillId = 1;
                var bonusSkillId = 3;
                var powerBank = actor.hasArmor($dataArmors[2])

                // Max Phone I
                if (actor.hasWeapon($dataWeapons[2])) {
                    var bonusSkillId = 3;
                    if (actor.mp >= 10) {
                        // Power Bank
                        if (powerBank) {
                            actor.gainMp(-5);
                        } else {
                            actor.gainMp(-10);
                        }

                        actor.forceAction(bonusSkillId, target);
                        BattleManager.forceAction(actor);
                    } else {
                        actor.forceAction(normalSkillId, target);
                        BattleManager.forceAction(actor);
                    }
                } else if (actor.hasWeapon($dataWeapons[3])) /* Tab Pro Ultra + */  {
                    if (actor.mp >= 10 && actor.hp < actor.mhp) {
                         // Power Bank
                        if (powerBank) {
                            actor.gainMp(-5);
                        } else {
                            actor.gainMp(-10);
                        }

                        // Heal When Attacking
                        actor.gainHp(10);

                        actor.forceAction(normalSkillId, target);
                        BattleManager.forceAction(actor);
                    } else {
                        actor.forceAction(normalSkillId, target);
                        BattleManager.forceAction(actor);
                    }
                } else if (actor.hasWeapon($dataWeapons[4])) /* Milkway Laptop */  {
                    if (actor.mp >= 10 && actor.hp < actor.mhp) {
                         // Power Bank
                         if (powerBank) {
                            actor.gainMp(-12);
                        } else {
                            actor.gainMp(-25);
                        }
                        actor.gainHp(10);

                        actor.forceAction(bonusSkillId, target);
                        BattleManager.forceAction(actor);
                    } else {
                        actor.forceAction(normalSkillId, target);
                        BattleManager.forceAction(actor);
                    }

                } else /* Basic Phone */ {
                    actor.forceAction(normalSkillId, target);
                    BattleManager.forceAction(actor);
                }

            } else {
                $gameVariables.setValue(18, 0);
                var currentTime = $gameTimer.seconds();
                var newTime = currentTime - 5;

                if (newTime <= 0) {
                    window.settimer([0, 0.3, 0, 0]);
                    console.log("Timer is at 0. Skipping all actions.");

                    $gameScreen.startFlash([255, 0, 0, 160], 60);
                    const actor = $gameParty.leader();
                    if (actor && actor.isAlive()) {
                        const maxHp = actor.mhp;
                        const damage = Math.floor(maxHp * 100); // 10% of max HP
                        actor.gainHp(-damage);
                        actor.performDamage();
                        AudioManager.playSe({ name: "Monster1", volume: 90, pitch: 100, pan: 0 });
                        $gameScreen.startShake(5, 5, 30);
                        SceneManager._scene._logWindow.push("addText", "Time's up!");
                        console.log(`Player took ${damage} damage due to timeout.`);
                    }
                    
                } else {
                    window.addtimer([0, -5, 0, 0]);
                }

                if (SceneManager._scene instanceof Scene_Battle) {
                    SceneManager._scene._logWindow.push("addText", "Wrong answer! 5 seconds deducted!");
                }

                var enemy = $gameTroop.members()[0];
                var skills = enemy.enemy().actions.map(action => action.skillId);
                if (skills.length > 0) {
                    var randomSkill = skills[Math.floor(Math.random() * skills.length)];
                    var target = -2;
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
            let allQuestions = topics[selectedTopic];
            let usedQuestionIndexes = usedQuestions;

            if (answeredQuestions.length === 0) {
                console.log("QuizSystem: No questions have been answered correctly yet.");
                return;
            }

            console.log("✅ Answered Questions:");
            answeredQuestions.forEach((q, index) => {
                console.log(`${index + 1}. ${q.question} (Answer: ${q.answer})`);
            });

            console.log("📌 Total Questions in Topic:", allQuestions.length);
            console.log("📌 Used Question Indexes:", usedQuestionIndexes);
            console.log("📌 Remaining Questions:", allQuestions.filter(q => !q.answered));

            let skippedQuestions = allQuestions.filter((q, i) => !usedQuestionIndexes.includes(i) && !q.answered);
            console.log("❌ Skipped Questions:", skippedQuestions);
        },

        restoreQuestions: function () {
            if (usedQuestions.length === 0) {
                console.warn("QuizSystem: No questions to restore.");
                return;
            }

            usedQuestions.length = 0;

            Object.keys(topics).forEach(topicKey => {
                topics[topicKey].forEach(question => {
                    question.answered = false;
                });
            });

            console.log("QuizSystem: All questions are now available again.");
        },

        showChoices: function () {
            var choices = [];
            var choiceCount = $gameVariables.value(29);
            var correctAnswer = $gameVariables.value(16);
            var actor = $gameActors.actor(1);

            var hasSpecialEquip = actor.hasArmor($dataArmors[1]);
            var hideChoices = hasSpecialEquip && Math.random() < 0.10;
            var hiddenIndexes = [];

            if (hideChoices && choiceCount >= 3) {
                let wrongIndexes = [];
                for (let i = 0; i < choiceCount; i++) {
                    if ((i + 1) !== correctAnswer) {
                        wrongIndexes.push(i);
                    }
                }

                while (hiddenIndexes.length < 2 && wrongIndexes.length > 0) {
                    let randomIdx = Math.floor(Math.random() * wrongIndexes.length);
                    hiddenIndexes.push(wrongIndexes[randomIdx]);
                    wrongIndexes.splice(randomIdx, 1);
                }

                console.log("Hiding incorrect choices at indexes:", hiddenIndexes);
            }

            for (let i = 0; i < choiceCount; i++) {
                if (hiddenIndexes.includes(i)) {
                    choices.push("\\C[18]!!!");
                } else {
                    choices.push($gameVariables.value(12 + i));
                }
            }

            $gameMessage.setChoices(choices, 0, -1);
            $gameMessage.setChoiceCallback(choiceIndex => {
                $gameVariables.setValue(17, choiceIndex + 1);
                QuizSystem.checkAnswer();
            });
        },
    };
})();