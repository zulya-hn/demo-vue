<template>
    <div>
        <h1>
            {{ title }}
        </h1>
        <p>
            {{ text }}
        </p>
        <ul>
            <li v-for="post of postStack">
                <h3>
                    {{ post.title }} - <span>Post #{{ post.id }}</span>
                </h3>
                <p>
                    Возраст: {{ post.body }}
                </p>
            </li>
            <li v-if="isNewPostFailed">
                Post loading was failed... Sorry!
            </li>
        </ul>
        <button @click="fetchNewPost">
            {{ postStack.length ? 'load more..' : 'download' }}
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Fetch data test',
                text: 'click button for getting new post',
                postStack: [],
                nextPost: 1,
                isNewPostFailed: false
            };
        },
        methods: {
            fetchNewPost() {
                console.log('start fetch data..');
                
                fetch(`https://jsonplaceholder.typicode.com/posts/${this.nextPost}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Not 2xx response');
                        }
                        
                        return response.json();
                    })
                    .then((json) => { // почему тут жсон?
                        console.log(json);
                        
                        this.addNewPost(json);
                    })
                    .catch((error) => {
                        console.log('Response not received..\n', error);
                        
                        this.isNewPostFailed = true;
                    });
            },
            addNewPost(post) {
                this.isNewPostFailed = false;
                
                this.postStack.push(post);
                this.nextPost = post.id + 1; // блочить кнопку
            },
        }
    };
</script>

<style lang="scss"
       scoped>
    button {
        padding: 10px 15px;
        font-size: 16px;
        font-weight: 600;
    }
</style>