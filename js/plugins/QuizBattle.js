(function() {
    var _Scene_Battle_create = Scene_Battle.prototype.create;
    Scene_Battle.prototype.create = function() {
        _Scene_Battle_create.call(this);
        this.createQuizWindow();
    };

    Scene_Battle.prototype.createQuizWindow = function() {
        this._quizWindow = new Window_Quiz();
        this._quizWindow.setHandler("answer", this.onAnswer.bind(this));
        this.addChild(this._quizWindow);
    };

    Scene_Battle.prototype.startQuiz = function() {
        if (this._quizWindow) {
            this._quizWindow.setQuestion("What is 2 + 2?", ["3", "4", "5", "6"], 1);
            this._quizWindow.open();
            this._quizWindow.show();
            this._quizWindow.activate();
        } else {
            console.error("Quiz window is not initialized.");
        }
    };

    Scene_Battle.prototype.onAnswer = function(correct) {
        this._quizWindow.hide();
        if (correct) {
            console.log("Correct Answer! You win!");
        } else {
            console.log("Wrong Answer! You lose!");
        }
    };

    function Window_Quiz() {
        this.initialize.apply(this, arguments);
    }

    Window_Quiz.prototype = Object.create(Window_Command.prototype);
    Window_Quiz.prototype.constructor = Window_Quiz;

    Window_Quiz.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, new Rectangle(100, 100, 400, 200));
        this.setBackgroundType(1);
        this.openness = 0;
        this.deactivate();
        this.hide();
        this._question = "";
        this._choices = [];
    };

    Window_Quiz.prototype.setQuestion = function(question, choices, correctIndex) {
        this._question = question;
        this._choices = choices || [];
        this._correctIndex = correctIndex;
        this.clearCommandList();
        this.makeCommandList();
        this.refresh();
        this.open();
        this.show();
        this.activate();
    };

    Window_Quiz.prototype.makeCommandList = function() {
        this._choices = this._choices || [];
        for (let i = 0; i < this._choices.length; i++) {
            this.addCommand(this._choices[i], "answer", true, i === this._correctIndex);
        }
    };

    Window_Quiz.prototype.refresh = function() {
        this.contents.clear();
        this.drawText(this._question, 10, 0, this.contentsWidth(), 'center');
        Window_Command.prototype.refresh.call(this);
    };

    Window_Quiz.prototype.callOkHandler = function() {
        this._handler["answer"].call(this, this.currentSymbol());
    };

    var _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);
        this.startQuiz();
    };
})();
