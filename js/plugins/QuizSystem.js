/*
old system

var QuizSystem = (function () {
    var topics = {
        html:[
            { question: "What does HTML stand for? ", choices: ["HyperText Markup Language", "HyperTransfer Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language"], answer: 1 }, // 1-based
            { question: "Which HTML tag is used to define an unordered list? ", choices: ["<ul>", "<ol>", "<li>", "<dl>"], answer: 1 },
            { question: "What is the purpose of the <title> tag in HTML? ", choices: ["To define the main heading", "To specify a webpage title", "To create a hyperlink", "To display an image"], answer: 2 },
            { question: "Which attribute is used to provide an alternative text \nfor an image?", choices: ["alt", "title", "href", "src"], answer: 1 },
            { question: "Which HTML tag is used for creating a hyperlink?", choices: ["<link>", "<a>", "<href>", "<nav>"], answer: 2 },
            { question: "How do you create a line break in HTML?", choices: ["<lb>", "<break>", "<'br'>", "<hr>"], answer: 3 },
            { question: "What is the correct HTML for inserting an image?", choices: ["<img src='image.jpg'>", "<image>image.jpg</image>", "<img>image.jpg</img>", "<src img='image.jpg'>"], answer: 1 },
            { question: "Which HTML element is used to specify a footer for a\ndocument?", choices: ["<foot>'>", "<footer>", "<bottom>", "<end>"], answer: 2 },
            { question: "Which HTML element is used for the largest heading?", choices: ["<head>", "<h1>", "<h6>", "<title>"], answer: 2 },
            { question: "What is the correct HTML5 doctype declaration?", choices: ["<!DOCTYPE html>", "<DOCTYPE HTML>", "<!DOCTYPE HTML5>", "<html doctype>"], answer: 1 },
            { question: "Which tag is used to create a new paragraph in HTML?", choices: ["<'br'>", "<p>", "<h1>", "<div>"], answer: 2 },
            { question: "What is the purpose of the <th> tag in an HTML table?", choices: ["To define a table row", "To define a table heading", "To create a table border", "To merge table cells"], answer: 2 },
            { question: "Which tag is used to make text italicized in HTML?", choices: ["<b>", "<em>", "<u>", "<i>"], answer: 4 },
            { question: "How do you insert a comment in an HTML document?", choices: ["// my comment", "/* my comment *", "<!-- my comment -->", "# my comment"], answer: 3 },
            { question: "Which HTML tag is used to embed an audio file?", choices: ["<sound>", "<audio>", "<media>", "<music>"], answer: 2 },
            { question: "Which attribute is used within the <audio> tag to \ndisplay audio controls?", choices: ["autoplay", "loop", "controls", "play"], answer: 3 },
            { question: "Which tag is used to embed a video in an HTML \ndocument?", choices: ["<vid>", "<media>", "<mp4>", "<video>"], answer: 4 },
            { question: "Which attribute is used within the <video> tag to \nset a video to play automatically?", choices: ["loop", "controls", "autoplay", "play"], answer: 3 },
            { question: "Which HTML tag is used to create a table?", choices: ["<tbl>", "<table>", "<tr>", "<td>"], answer: 2 },
            { question: "Which tag is used to define a tablerow in an HTML \ntable?", choices: ["<td>", "<th>", "<tr>", "<table>"], answer: 3 },
        ],
        css:[
            { question: "What does CSS stand for?", choices: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 2 },
            { question: "Which property is used to change the background color \nin CSS?", choices: ["bgcolor", "background", "background-color", "color"], answer: 3 },
            { question: "How do you select all elements of a particular type in \nCSS?", choices: ["#element", ".element", "element", "*"], answer: 3 },
            { question: "Which CSS property controls the text size?", choices: ["font-style", "text-style", "text-size", "font-size"], answer: 4 },
            { question: "Which CSS selector is used to target an element with a \nspecific ID?", choices: ["#", ".", ":", "*"], answer: 1 },
            { question: "What is the correct way to apply external CSS?", choices: ["<style>", "<css>", "<link>", "<stylesheet>"], answer: 3 },
            { question: "Which property is used to make text bold in CSS?", choices: ["text-bold", "font-weight", "font-style", "text-style"], answer: 2 },
            { question: "How do you apply a border in CSS?", choices: ["border: 1px solid black;", "border-width: 1px;", "border-color: black;", "border-style: solid;"], answer: 1 },
            { question: "Which CSS property controls the space between\nlines of text?", choices: ["spacing", "line-height", "letter-spacing", "text-indent"], answer: 2 },
            { question: "What is the default value of the position property in \nCSS?", choices: ["relative", "absolute", "static", "fixed"], answer: 3 },
            { question: "How do you apply a CSS rule to all <p> elements?", choices: ["p { ... }", ".p { ... }", "#p { ... }", "<p> { ... }"], answer: 1 },
            { question: "Which CSS property is used to make text bold?", choices: ["font-weight", "text-bold", "font-style", "bold"], answer: 1 },
            { question: "What unit is used in CSS for relative font sizes?", choices: ["px", "em", "cm", "pt"], answer: 2 },
            { question: "What is the default value of the background-color \nproperty?", choices: ["white", "transparent", "black", "none"], answer: 2 },
            { question: "What type of CSS is used in the following code? \n<style>\n  p{\n      color: red; \n      font-size: 16px; \n }\n</style>", choices: ["External CSS", "Internal CSS", "Inline CSS", "None of the above"], answer: 1 },
            { question: "What type of CSS is used in the following code?\n<tag style='property: value'> </tag>", choices: ["External CSS", "Internal CSS", "Inline CSS", "None of the above"], answer: 3 },
            { question: "Which CSS property is used to control the space outside \nan element’s border?", choices: ["padding", "margin", "spacing", "border-spacing"], answer: 2 },
            { question: "How do you apply an inline CSS style to a <div> \nelement?", choices: ["<div class='style'>", "<div style='color: blue;''>", "<div css='color: blue;''>", "<div id='style'>"], answer: 2 },
            { question: "What is the correct way to apply multiple CSS classes \nto an element?", choices: ["class='firstClass secondClass'", "class=’firstClass, secondClass’", "class=’firstClass; secondClass’", "class=’firstClass.secondClass'"], answer: 1 },
            { question: "Which CSS property is used to make an element’s text \nuppercase?", choices: ["text-transform", "text-style", "font-case", "text-uppercase"], answer: 1 }
        ],

        python: [
            { question: "What is the correct file extension for Python files?", choices: [".pyth", ".pt", ".py", ".p"], answer: 3 },
            { question: "How do you display output in Python?", choices: ["echo()", "print()", "display()", "write()"], answer: 2 },
            { question: "Which data type is used to store a sequence of characters in Python?", choices: ["int", "float", "str", "bool"], answer: 3 },
            { question: "How do you start a comment in Python?", choices: ["//", "<!--", "#", "/*"], answer: 3 },
            { question: "Which keyword is used to define a function in Python?", choices: ["define", "func", "def", "function"], answer: 1 },
            { question: "What is the output of print(type([]))?", choices: ["<class 'tuple'>", "<class 'dict'>", "<class 'list'>", "<class 'set'>"], answer: 3 },
            { question: "How do you create a loop that iterates over a sequence in Python?", choices: ["for", "while", "loop", "repeat"], answer: 1 },
            { question: "Which operator is used for exponentiation in Python?", choices: ["^", "**", "//", "%"], answer:21 },
            { question: "What is the correct way to declare a variable in Python?", choices: ["var x = 5", "x := 5", "let x = 5", "x = 5"], answer: 4 },
            { question: "What will len('hello') return?", choices: ["4", "5", "6", "d"], answer: 2 },
            { question: "What is the % operator in Python?", choices: ["Modulus Operator", "Exponentiation Operator", "Floor Division Operator", "Assignment Operator"], answer: 1 },
            { question: "Which variable name is correct in Python?", choices: ["42_variable = 'Hello'", "_spam = 'Hello'", "%$@variable = 'Hello'", "your_variable = 'Hello'"], answer: 4 },
            { question: "What will be the output of the following code?\nfruits = ['apple', 'banana', 'pineapple']\nfor fruit in fruits\n   print(fruit, end='-')", choices: ["apple banana pineapple", "apple-banana-pineapple", "apple-banana-pineapple", "apple, banana, pineapple"], answer: 2 },
            { question: "Which of the following is the correct way to declare a list in Python?", choices: ["list = {1, 2, 3, 4}", "list = (1, 2, 3, 4)", "list = [1, 2, 3, 4]", "list = <1, 2, 3, 4>"], answer: 3 },
            { question: "Which operator is used for exponentiation in Python?", choices: ["^", "**", "//", "%"], answer: 2 },
            { question: "Which of the following statements will correctly check if x is equal to 10?", choices: ["if x = 10:", "if x == 10:", "if x === 10:", "if (x,10):"], answer: 1 },
            { question: "What will be the output of the following code?\nprint(5 // 2)", choices: ["2.5", "2", "3", "2.0"], answer: 2 },
            { question: "Which of the following is NOT a valid Python data type?", choices: ["int", "real", "list", "tuple"], answer: 2 },
            { question: "What will be the result of the following operation?\n10 % 3", choices: ["3", "1", "0", "10"], answer: 2 },
            { question: "Which of the following is the correct way to write a function in Python?", choices: ["function myFunction():", "def myFunction():", "create function myFunction():", "define myFunction():"], answer: 2 }
        ],
        DS_Easy: [
            { question: "What is the time complexity of accessing an element in an array (average case)?", choices: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 3 },
            { question: "Which data structure uses LIFO (Last In, First Out) order?", choices: ["Queue", "Stack", "Linked List", "Array"], answer: 2 },
            { question: "What is the primary advantage of a linked list over an array?", choices: ["Faster access time", "Dynamic size", "More memory usage", "Simpler implementation"], answer: 2 },
            { question: "What is the worst-case time complexity for searching in a binary search tree (BST)?", choices: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 3 },
            { question: "Which sorting algorithm has the best average-case time complexity?", choices: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"], answer: 2 },
            { question: "Which data structure is used for BFS (Breadth-First Search)?", choices: ["Stack", "Queue", "Array", "Linked List"], answer: 2 },
            { question: "What is a characteristic of a queue?", choices: ["Last In, First Out", "First In, First Out", "Random Access", "Circular Structure"], answer: 2 },
            { question: "What is the space complexity of an in-place sorting algorithm?", choices: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: 1 },
            { question: "Which operation has the fastest time complexity in a hash table?", choices: ["Access", "Search", "Insert", "All of the above"], answer: 4 },
            { question: "Which algorithm is used to find the shortest path in an unweighted graph?", choices: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "BFS", "DFS"], answer: 3 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 }
        ],
        DS_Med: [
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 }
        ],
        DS_Hard: [
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 },
            { question: "", choices: ["", "", "", ""], answer: 1 }
        ]
    };

    var selectedTopic = "";
    var usedQuestions = [];

    return {
        setTopic: function (topic) {
            if (topics[topic]) {
                if (selectedTopic !== topic) {
                    selectedTopic = topic;
                    usedQuestions = []; // Reset only if topic changes
                }
            } else {
                console.error("QuizSystem: Invalid topic!");
            }
        },
        

        getQuestion: function () {
            var questionPool = topics[selectedTopic];
        
            if (!questionPool || questionPool.length === 0) {
                console.warn("QuizSystem: No questions available.");
                return null;
            }
        
            // Ensure `usedQuestions` is a Set for efficiency
            if (!Array.isArray(usedQuestions)) {
                usedQuestions = [];
            }
            let usedQuestionsSet = new Set(usedQuestions); // Convert to Set for fast lookup
        
            // Find available indexes (those not in usedQuestionsSet)
            let availableIndexes = [];
            for (let i = 0; i < questionPool.length; i++) {
                if (!usedQuestionsSet.has(i)) {
                    availableIndexes.push(i);
                }
            }
        
            if (availableIndexes.length === 0) {
                console.warn("QuizSystem: No more unique questions available.");
                return null;
            }
        
            // Pick a random index from the available ones
            let randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        
            // Store the index in usedQuestions
            usedQuestions.push(randomIndex);
        
            // Retrieve question data using the correct index
            let questionData = questionPool[randomIndex];
        
            // Store values in game variables
            $gameVariables.setValue(11, String(questionData.question));
            $gameVariables.setValue(12, String(questionData.choices[0]));
            $gameVariables.setValue(13, String(questionData.choices[1]));
            $gameVariables.setValue(14, String(questionData.choices[2]));
            $gameVariables.setValue(15, String(questionData.choices[3]));
            $gameVariables.setValue(16, questionData.answer);
        
            console.log("Stored Question:", questionData.question);
            console.log("Stored Answer Index (16):", questionData.answer);
            console.log("QuizSystem: Used Questions List:", usedQuestions);
        
            $gameMessage.add(questionData.question);
        },
        
        
        

        showChoices: function () {
            var choices = [
                $gameVariables.value(12),
                $gameVariables.value(13),
                $gameVariables.value(14),
                $gameVariables.value(15)
            ];

            // Display choices
            $gameMessage.setChoices(choices, 0, -1);
            $gameMessage.setChoiceCallback(function (choiceIndex) {
                // ✅ Convert player choice to 1-based index
                var selectedChoice = choiceIndex + 1;
                $gameVariables.setValue(17, selectedChoice);

                console.log("Player Choice (17):", selectedChoice);
                QuizSystem.checkAnswer();
            });
        },

        checkAnswer: function () {
            var playerChoice = parseInt($gameVariables.value(17)); // 1-based index
            var correctAnswer = parseInt($gameVariables.value(16)); // 1-based index
        
            console.log("Player Choice:", playerChoice);
            console.log("Correct Answer:", correctAnswer);
        
            if (playerChoice === correctAnswer) {
                $gameVariables.setValue(18, 1);
                window.addtimer([0, 5, 0, 0]);
                // ✅ Force message display immediately if in battle
                if (SceneManager._scene instanceof Scene_Battle) {
                    SceneManager._scene._logWindow.push("addText", "Correct Answer! 5 seconds added!");
                }
                AudioManager.playSe({ name: "Bell3", volume: 70, pitch: 100, pan: 0 });
        
                // Attack Enemy
                var actor = $gameActors.actor(1); // Actor ID 1
                var skillId = 1; // Skill ID from database
                var target = -2; // Target: -2 (Random Enemy), -1 (Last Target), 1+ (Specific Enemy/Actor)
        
                actor.forceAction(skillId, target);
                BattleManager.forceAction(actor);
                
                AudioManager.playSe({ name: "Decision1", volume: 90, pitch: 100, pan: 0 });
        
            } else {
                $gameVariables.setValue(18, 0);
                window.addtimer([0, -10, 0, 0]);
        
                // ✅ Force message display immediately if in battle
                if (SceneManager._scene instanceof Scene_Battle) {
                    SceneManager._scene._logWindow.push("addText", "Wrong answer! 10 seconds deducted!");
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
        checkTimer: function () {
            if ($gameTimer._frames <= 0) {
                $gameTimer.stop();
        
                // Force battle exit
                if (SceneManager._scene instanceof Scene_Battle) {
                    BattleManager.abort();
                    $gameTimer.stop();
                }
    
                // Exit battle and return to the map
                SceneManager.pop();
            }
        },
             
        restoreQuestions: function () {
            if (usedQuestions.length === 0) {
                console.warn("QuizSystem: No questions to restore.");
                return;
            }
    
            usedQuestions = []; // Simply clear used questions
            console.log("QuizSystem: All questions are now available again.");
        }
    };
})();

*/


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
        
                // Minus timer if wrong
                var currentTime = $gameTimer.seconds(); // Get current timer time
                $gameVariables.setValue(28, currentTime); // Store it in variable 28
                
                if (currentTime >= 3) {
                    window.addtimer([0, -2, 0, 0]); // Decrease timer by 2 seconds
                } else {
                    $gameTimer.stop(); // Stop the timer to prevent negative values
                    setTimeout(() => {
                        $gameTimer.start(1); // Start with at least 1 second to avoid instant expiration
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
                if (!$gameSwitches.value(99)) { 
                    $gameSwitches.setValue(99, true);
                    $gameTimer.stop();
                    BattleManager.abort();
                    setTimeout(() => {
                        if (SceneManager._scene instanceof Scene_Battle) {
                            SceneManager.pop();
                        }
                        $gameSwitches.setValue(99, false); 
                    }, 300);
                }
            }
            
        }                              
    };
})();

