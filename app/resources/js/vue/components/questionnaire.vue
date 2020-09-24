<template>
    <div>
        <h1>
            {{ title }}
        </h1>
        <p>
            {{ message }}
        </p>
        <div class="container">
            <hr>
            
            <div class="progress">
                <div class="progress-bar"
                     :style="progressWidth">
                </div>
            </div>
            
            <p v-show="errorMessages.no_select_answer.hasError"
               class="alert alert-danger">
                {{ errorMessages.no_select_answer.text }}
            </p>
            
            <div v-for="(question, index) in quiz">
                <div v-if="index === questionIndex">
                    
                    <h4 class="mt-5 mb-3">
                        {{ question.text }}
                    </h4>
                    
                    <div v-for="variant in question.variants"
                         class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input"
                                   type="radio"
                                   :value="variant"
                                   :name="index"
                                   v-model="responses[questionIndex]">
                            
                            {{ variant }}
                        </label>
                    </div>
                    
                    <div class="mt-5">
                        <button
                                class="btn btn-secondary"
                                @click="goPrev"
                                :disabled="questionIndex === 0">
                            goPrev
                        </button>
                        <button class="btn btn-primary"
                                @click="goNext">
                            goNext
                        </button>
                    </div>
                </div>
            </div>
            
            <div v-if="questionIndex === quiz.length">
                <h3>Your Results</h3>
                <p>
                    You are: {{ calcCorrectAnswers }} / {{ quiz.length }}
                </p>
                
                <hr>
                
                <p>
                    Your answers:
                </p>
                
                <div v-for="(question, index) in quiz"
                     class="answer"
                     :class="checkCorrectAnswer(question.correctVariant, responses[index])">
                    
                    <span class="mt-5 mb-3">
                        {{ question.text }}
                    </span>
                    
                    <span class="form-check">
                        {{ responses[index] }}
                    </span>
                
                </div>
                
                <p>
                    Right answers:
                </p>
                
                <div v-for="question in quiz"
                     class="answer correct">
                    
                    <span class="mt-5 mb-3">
                        {{ question.text }}
                    </span>
                    
                    <span class="form-check">
                        {{ question.correctVariant }}
                    </span>
                
                </div>
                
                <br>
                
                <button class="btn btn-success"
                        @click="resetQuiz">
                    Play Again!
                </button>
            
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Questionnaire',
                message: 'Please answer some questions..',
                questionIndex: 0,
                responses: [],
                correctAnswers: 0,
                selectedItem: "",
                errorMessages: {
                    no_select_answer: {
                        text: 'Please select your answer',
                        hasError: false
                    }
                },
                quiz: [
                    {
                        text: '2 x 2 = ',
                        variants: [4, 2, 0],
                        correctVariant: 4
                    },
                    {
                        text: '5 + 5 = ',
                        variants: [0, 10, 25],
                        correctVariant: 10
                    },
                    {
                        text: '3 x 6 = ',
                        variants: [12, 9, 18],
                        correctVariant: 18
                    }
                ]
            };
        },
        methods: {
            goPrev() {
                if (this.questionIndex > 0) {
                    this.questionIndex--;
                }
            },
            
            goNext() {
                if (this.responses[this.questionIndex] !== undefined) {
                    this.errorMessages.no_select_answer.hasError = false;
                    this.questionIndex++;
                    // console.log(this.responses);
                    
                    return;
                }
                this.errorMessages.no_select_answer.hasError = true;
            },
    
            checkCorrectAnswer(correctAnswer, userAnswer) {
                return correctAnswer === userAnswer ? 'correct' : 'wrong';
            },
            
            resetQuiz() {
                this.responses = [];
                this.questionIndex = 0;
            },
            
        },
        computed: {
            progressWidth() {
                return {
                    width: (this.questionIndex / this.quiz.length * 100) + '%'
                };
            },
            
            calcCorrectAnswers() {
                for (let i = 0; i < this.quiz.length; i++) {
                    if (this.quiz[i].correctVariant === this.responses[i]) {
                        this.correctAnswers++;
                    }
                }
                
                return this.correctAnswers;
            },
        },
    };
</script>