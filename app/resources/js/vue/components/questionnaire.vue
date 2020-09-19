<template>
    <div>
        <h1>
            {{ title }}
        </h1>
        <p>
            {{ text }}
        </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Questionnaire',
                text: 'Please, answer some questions'
            }
        },
        methods: {
        
        }
    };
</script>