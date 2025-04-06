const myApp = {
    data() {
        return {
            minutes: 25,
            secondes: 0,
            intervalle: null,
            todoList: [],
            nouvelleTache: '',
            selectedBackground: 'dark-forest.jpg',
            showMenu: false,
            activeBtn: 'pomodoro',
            currentAudio: null,
        }
    },
    mounted() {
        this.changerFond()
    },
    methods: {
        changerFond() {
            document.body.style.backgroundImage = `url(assets/img/${this.selectedBackground})`
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        decompte() {
            if (this.minutes === 0 && this.secondes === 0) {
                clearInterval(this.intervalle)
                this.intervalle = null
                return

            } else {
                if (this.secondes > 0) {
                    this.secondes--
                } else {
                    this.minutes--
                    this.secondes = 59
                }
            }
        },
        demarrerChrono() {
            if (!this.intervalle) {
                this.intervalle = setInterval(this.decompte.bind(this), 1000)
            }
        },
        pauseChrono() {
            clearInterval(this.intervalle)
            this.intervalle = null
        },
        resetChrono() {
            this.pauseChrono()
            this.minutes = 25
            this.secondes = 0
        },
        ajouterTache() {
            if(this.nouvelleTache !== '') {
                this.todoList.push({ text: this.nouvelleTache, completed: false })
                this.nouvelleTache = ''
            }
        },
        timerPomodoro() {
            this.pauseChrono()
            this.minutes = 25,
            this.secondes = 0,
            this.activeBtn = 'pomodoro'
        },
        timerShortBreak() {
            this.pauseChrono()
            this.minutes = 5,
            this.secondes = 0,
            this.activeBtn = 'shortBreak'
        },
        timerLongBreak() {
            this.pauseChrono()
            this.minutes = 10,
            this.secondes = 0,
            this.activeBtn = 'longBreak'
        },
        suppTask(index) {
            this.todoList.splice(index, 1)
        },
        checkTask(index) {
            this.todoList[index].completed = !this.todoList[index].completed
        },
        playSound(soundName) {
            if (this.currentAudio) {
                this.currentAudio.pause()
                this.currentAudio.currentTime = 0
            }
            this.currentAudio = new Audio("./assets/sound/" + soundName + ".mp3")
            this.currentAudio.loop = true
            this.currentAudio.play()
        },
        stopSound() {
            if (this.currentAudio) {
                this.currentAudio.pause()
                this.currentAudio.currentTime = 0
                this.currentAudio = null
            }
        }
    }
}

Vue.createApp(myApp).mount('#app')