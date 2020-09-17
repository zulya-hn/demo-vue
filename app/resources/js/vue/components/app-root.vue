<template>
    <div>
        <h1>
            {{ title }}
        </h1>
        <p>
            {{ text }}
        </p>
        <ul>
            <li v-for="user of usersList">
                <h3>
                    {{ user.name }}
                </h3>
                <p>
                    Возраст: {{ user.age }}
                </p>
                <p>
                    {{ user.phoneNumber }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'We did it!',
                text: 'git is works now!',
                usersList: [
                    {
                        name: 'Павел',
                        age: 25,
                        phoneNumber: '45645745754'
                    },
                    {
                        name: 'Денис',
                        age: 67,
                        phoneNumber: '4574575468767978'
                    },
                    {
                        name: 'Юля',
                        age: 34,
                        phoneNumber: '43534636'
                    },
                    {
                        name: 'Катя',
                        age: 28,
                        phoneNumber: '345637'
                    },
                    {
                        name: 'Роман',
                        age: 55,
                        phoneNumber: '657465спроагно'
                    },
                ]
            }
        }
    }
</script>