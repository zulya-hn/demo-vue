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
            
            <p v-if="errors[questionIndex]" class="alert alert-danger">
                {{ errorMessage }}
            </p>
            <div v-for="(question, index) in quiz.questions">
                <div v-show="index === questionIndex">
            
                    <h4 class="mt-5 mb-3">{{ question.text }}</h4>
            
                    <div v-for="answer in question.answers" class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio"
                                   :value="answer.value"
                                   :name="index"
                                   v-model="responses[index]">
                            {{answer.answer}}
                        </label>
                    </div>
            
                    <div class="mt-5">
                        <button
                                class="btn btn-secondary"
                                @click="prev"
                                :disabled="!isButtonWorks">
                            prev
                        </button>
                        <button class="btn btn-primary" @click="next">
                            next
                        </button>
                    </div>
                </div>
            </div>
    
            <div v-show="questionIndex === quiz.questions.length">
                <h3>Your Results</h3>
                <p>
                    You are: {{ score() }} / {{ quiz.questions.length }}
                </p>
                <p>
                    
                    Your answers:
                </p>
                <div v-for="(question, index) in quiz.questions">
                    
                    <h4 class="mt-5 mb-3">{{ question.text }}</h4>
                    
                    <div v-for="answer in question.answers" class="form-check">
                        
                            {{answer.answer}}
                        
                    </div>
                </div>
    
                <p>
                     Right answers:
                </p>
                
                <div v-for="(question, index) in quiz.questions">
        
                    <h4 class="mt-5 mb-3">{{ question.text }}</h4>
        
                    <div v-for="answer in question.answers" class="form-check">
            
                        {{answer.answer}}
        
                    </div>
                </div>
                
                
                
                <button class="btn btn-success" @click="playAgain">
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
                message: 'Please, answer some questions',
                questionIndex: 0,
                responses: [],
                errors: [],
                errorMessage: '',
                isButtonWorks: '',
                quiz: {
                    questions: [
                        {
                            text: '2 x 2 = ',
                            answers: [
                                {
                                    answer: '4',
                                    value: 'correct'
                                },
                                {
                                    answer: '2',
                                    value: 'wrong'
                                },
                                {
                                    answer: '0',
                                    value: 'wrong'
                                },
                            ]
                        },
                        {
                            text: '5 + 5 = ',
                            answers: [
                                {
                                    answer: '0',
                                    value: 'wrong'
                                },
                                {
                                    answer: '10',
                                    value: 'correct'
                                },
                                {
                                    answer: '25',
                                    value: 'wrong'
                                },
                            ]
                        },
                        {
                            text: '3 x 6 = ',
                            answers: [
                                {
                                    answer: '12',
                                    value: 'wrong'
                                },
                                {
                                    answer: '9',
                                    value: 'wrong'
                                },
                                {
                                    answer: '18',
                                    value: 'correct'
                                },
                            ]
                        }
                    ]
                }
            }
        },
        methods: {
            prev() {
                if(this.questionIndex > 0) {
                    this.isButtonWorks = !this.isButtonWorks;
                }
                this.questionIndex--;
            },
    
            next() {
                if (this.responses[this.questionIndex] === undefined) {
                    this.errors[this.questionIndex] = 1;
                    this.errorMessage = 'Please select your answer';
                    this.questionIndex++;
                    this.questionIndex--;
                }
                else {
                    this.errors[this.questionIndex] = 0;
                    this.questionIndex++;
                }
            },
    
            score() {
                let count = 0;
                
                for (let i = 0; i < this.responses.length; ++i) {
                    if (this.responses[i] === 'correct') {
                       count++;
                    }
                }
    
                return count;
            },
    
            playAgain() {
                this.responses = [];
                this.questionIndex = 0;
            },

        },
        computed: {
    
            answeredLine() {
                
                let answeredLine = 0;
        
                for (let i = 0; i < this.responses.length; i++) {
                    if (this.responses[i]) {
                        answeredLine++;
                    }
                }
        
                return answeredLine;
            },
    
            progressWidth(){
                return {
                    width: (this.answeredLine / this.quiz.questions.length * 100) + '%'
                }
            }
        }
    }
</script>