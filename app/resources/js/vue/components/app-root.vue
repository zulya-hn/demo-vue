<template>
    <div>
        <nav class="navigation">
            <button v-for="(component, screen) of this.$options.components"
                    @click="changeCurrentScreen(screen)">
                {{ screen }}
            </button>
        </nav>
        <posts-feed v-show="currentScreen === 'PostsFeed'"/>
        <questionnaire v-if="currentScreen === 'Questionnaire'"/>
    </div>
</template>

<script>
    import PostsFeed from './posts-feed.vue';
    import Questionnaire from './questionnaire.vue';
    
    export default {
        components: {
            PostsFeed,
            Questionnaire
        },
        data() {
            return {
                currentScreen: 'Questionnaire'
            };
        },
        methods: {
            changeCurrentScreen(screen) {
                console.log('change screen to', screen);
                
                this.currentScreen = screen;
            },
        }
    };
</script>