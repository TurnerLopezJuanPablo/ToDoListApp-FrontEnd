<template>
    <div class="m-2">
        <div class="item py-2" id="settings" @click="this.goTo('settings')">
            <img src="/src/assets/icons/icons8-user-circle-32.png" alt="user icon" style="width: 3.3rem; height: 3rem">
            <div data-bs-toggle="tooltip" data-bs-placement="bottom" :title="this.tootlTipText">
                <h5 class="m-0">{{ this.userName }}</h5>
                <h6 class="m-0">{{ this.email }}</h6>
            </div>
        </div>

        <div class="search-container">
            <input type="text" class="form-control form-control-sm my-3" placeholder="Search...">
            <img src="/src/assets/icons/icons8-search-32.png" alt="Search Icon" class="search-icon">
        </div>

        <div class="item" id="tasksForToday" @click="this.goTo('tasksForToday')">
            <img src="/src/assets/icons/icons8-sun-32.png" alt="Sun Icon">
            <h6 class="my-3">Tasks for Today</h6>
        </div>

        <div class="item" id="tasksDueSoon" @click="this.goTo('tasksDueSoon')">
            <img src="/src/assets/icons/icons8-deadline-32.png" alt="Deadline Icon">
            <h6 class="my-3">Tasks Due Soon</h6>
        </div>

        <div class="item" id="completed" @click="this.goTo('completed')">
            <img src="/src/assets/icons/icons8-done-32.png" alt="Completed Icon">
            <h6 class="my-3">Completed</h6>
        </div>

        <div class="item" id="favorites" @click="this.goTo('favorites')">
            <img src="/src/assets/icons/icons8-star-32.png" alt="Favorites Icon">
            <h6 class="my-3">Favorites</h6>
        </div>

        <div class="item" id="assigned" @click="this.goTo('assigned')">
            <img src="/src/assets/icons/icons8-add-user-male-32.png" alt="Assigned to Me Icon">
            <h6 class="my-3">Assigned to Me</h6>
        </div>
    </div>

    <hr class="m-1">

    <div class="m-2">
        <div class="item" id="calendar" @click="this.goTo('calendar')">
            <img src="/src/assets/icons/icons8-calendar-32.png" alt="Calendar Icon">
            <h6 class="my-3">Calendar</h6>
        </div>

        <div class="item" id="calculator" @click="this.toggleDisplay">
            <img src="/src/assets/icons/icons8-calculator-32.png" alt="Calculator Icon">
            <h6 class="my-3">Calculator</h6>
        </div>
    </div>

    <hr class="m-1">

    <div class="m-2">
        <div v-if="this.boards.length > 0" class="item" :id="'board-' + board.id" v-for="board in this.boards"
            :key="board.id" @click="this.goToBoard('board', board.id)">
            <img src="/src/assets/icons/icons8-list-32.png" alt="Board Icon">
            <h6 class="my-3">{{ board.title }}</h6>
        </div>

        <div v-else>
            <h5 class="my-3 text-center">It seems that there are no active boards. Please try creating one! 😊</h5>
        </div>

        <div class="item">
            <img src="/src/assets/icons/icons8-add-32.png" alt="Create Board Icon">
            <h6 class="my-3">New Board</h6>
        </div>
    </div>

    <hr class="m-1">

    <div class="m-2">
        <div class="item">
            <img src="/src/assets/icons/icons8-lock-32.png" alt="Blocked Icon">
            <h6 class="my-3">Hidden Boards</h6>
        </div>
    </div>

    <!-- MODAL CALCULATOR -->

    <div id="modal" class="modal">
        <div class="modal-content">
            <div class="modal-header" @mousedown="this.dragMouseDown">
                <h5 class="modal-title">Calculator</h5>
                <button type="button" class="btn-close" @click="this.toggleDisplay"></button>
            </div>

            <div class="display">
                <p class="miniDisplay">{{ miniDisplay }}</p>
                <p :class="{ 'mt-4': this.miniDisplay === '' }">{{ display }}</p>
            </div>

            <div class="buttons">
                <button type="button" class="button" @click="processNumberInput('C')">C</button>
                <button type="button" class="button" @click="processNumberInput('P')">()</button>
                <button type="button" class="button" @click="processNumberInput('%')">%</button>
                <button type="button" class="button" @click="processNumberInput('/')">÷</button>

                <button type="button" class="button" @click="processNumberInput(7)">7</button>
                <button type="button" class="button" @click="processNumberInput(8)">8</button>
                <button type="button" class="button" @click="processNumberInput(9)">9</button>
                <button type="button" class="button" @click="processNumberInput('x')">x</button>

                <button type="button" class="button" @click="processNumberInput(4)">4</button>
                <button type="button" class="button" @click="processNumberInput(5)">5</button>
                <button type="button" class="button" @click="processNumberInput(6)">6</button>
                <button type="button" class="button" @click="processNumberInput('-')">-</button>

                <button type="button" class="button" @click="processNumberInput(1)">1</button>
                <button type="button" class="button" @click="processNumberInput(2)">2</button>
                <button type="button" class="button" @click="processNumberInput(3)">3</button>
                <button type="button" class="button" @click="processNumberInput('+')">+</button>

                <button type="button" class="button" @click="processNumberInput('S')">-/+</button>
                <button type="button" class="button" @click="processNumberInput(0)">0</button>
                <button type="button" class="button" @click="processNumberInput('.')">.</button>
                <button type="button" class="button" @click="processNumberInput('=')">=</button>
            </div>
        </div>
    </div>

</template>

<script>
import { instance } from '../../../utils/authorization';
import { userStore } from '../../../stores/userStore';
import apiUrl from '../../../config/config';
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            router: useRouter(),
            userStore: userStore(),
            userName: 'UserName',
            email: 'email',
            tootlTipText: 'name, surname, oldUserName',
            boards: [],
            itemActive: null,
            lastItemActive: null,
            modal: null,
            modalHeader: null,
            modalContent: null,
            closeButton: null,
            offsetX: 0,
            offsetY: 0,
            display: 0,
            miniDisplay: '',
        };
    },
    mounted() {
        this.$nextTick(() => {
            const tooltipTargets = this.$refs.tooltipTarget;
            if (tooltipTargets) {
                const tooltipElements = Array.isArray(tooltipTargets) ? tooltipTargets : [tooltipTargets];
                tooltipElements.forEach(tooltipTarget => {
                    new bootstrap.Tooltip(tooltipTarget);
                });
            }
        });

        this.setItemActive('tasksForToday');

        // MODAL CALCULATOR
        this.modal = document.getElementById("modal");
        this.modalHeader = modal.querySelector(".modal-header");
        this.modalContent = modal.querySelector(".modal-content");
        this.closeButton = modal.querySelector(".close");
    },
    methods: {
        setData() {
            this.userName = this.userStore.currentUser.userName;
            this.email = this.userStore.currentUser.email;

            this.tootlTipText = `${this.userStore.currentUser.name}, ${this.userStore.currentUser.surname}`;

            if (this.userStore.currentUser.oldUserName) {
                this.tootlTipText += `. Old User Name: ${this.userStore.currentUser.oldUserName}`;
            }

            this.userStore.currentUserData.forEach(e => {
                this.boards.push({
                    id: e.id,
                    title: e.Board.title,
                })
            });
        },
        goTo(path) {
            this.setItemActive(path);
            this.router.push({ name: path })
        },
        goToBoard(path, boardId) {
            this.setItemActive(`${path}-${boardId}`);
            this.router.push({ name: path, params: { id: boardId } })
        },
        setItemActive(itemId) {
            this.lastItemActive = this.itemActive;
            this.itemActive = document.getElementById(itemId);

            if (this.itemActive) this.itemActive.classList.add('active');
            if (this.lastItemActive) this.lastItemActive.classList.remove('active');
        },
        // MODAL CALCULTOR
        dragMouseDown(e) {
            this.offsetX = e.clientX - this.modal.offsetLeft;
            this.offsetY = e.clientY - this.modal.offsetTop;
            document.onmousemove = this.dragModal;
            document.onmouseup = this.closeDragElement;
        },
        dragModal(e) {
            this.modal.style.left = (e.clientX - this.offsetX) + "px";
            this.modal.style.top = (e.clientY - this.offsetY) + "px";
            this.modalHeader.style.cursor = 'grabbing';
        },
        closeDragElement() {
            document.onmousemove = null;
            document.onmouseup = null;
            this.modalHeader.style.cursor = 'grab';
        },
        toggleDisplay() {
            this.displayCalculator = !this.displayCalculator;
            const item = document.getElementById('calculator');

            if (this.displayCalculator) {
                this.modal.style.display = 'block';
                item.classList.add('active');
            } else {
                this.modal.style.display = 'none';
                item.classList.remove('active');
            }
        },
        processNumberInput(input) {
            if (typeof input === 'number') {
                if (this.display === 0) this.display = '';
                this.display = `${this.display}${input}`;
            } else {
                switch (input) {
                    case 'C':
                        this.display = 0;
                        this.miniDisplay = '';
                        break;
                    case 'P':
                        break;
                    case '%':
                        break;
                    case '.':
                        break;
                    case 'S':
                        break;
                    case '=':
                    case '/':
                    case 'x':
                    case '-':
                    case '+':
                        this.processResultInput(input);
                        break;
                }
            }
        },
        processResultInput(input) {
            const symbols = ['+', '-', 'x', '/'];
            const lastCharacter = this.miniDisplay[this.miniDisplay.length - 1];
            const numbers = this.miniDisplay.substring(0, this.miniDisplay.length - 1);

            if (symbols.includes(lastCharacter)) {
                let result = '';
                switch (lastCharacter) {
                    case '+':
                        result = parseFloat(numbers) + parseFloat(this.display);
                        break;
                    case '-':
                        result = parseFloat(numbers) - parseFloat(this.display);
                        break;
                    case 'x':
                        result = parseFloat(numbers) * parseFloat(this.display);
                        break;
                    case '/':
                        result = parseFloat(numbers) / parseFloat(this.display);
                        break;
                }

                this.miniDisplay = result.toString();
                this.display = 0;
            } else if (input !== '=') {
                if (this.display !== 0) {
                    this.miniDisplay = `${this.miniDisplay}${this.display}`;
                }
                this.miniDisplay = `${this.miniDisplay}${input}`;
                this.display = 0;
            } 
        }
    },
    watch: {
        'userStore.currentUserData': function (newValue) { if (newValue) { this.setData() } },
    }
}

</script>

<style scoped>
.item {
    display: flex;
    align-items: center;
    border-radius: 5px;

    overflow: hidden;
    text-overflow: ellipsis;

    & img {
        margin-right: 10px;
        padding-left: 4px;
        height: 1.5rem;
    }
}

.item:hover,
.active {
    background-color: rgba(73, 73, 73, 0.411);
    cursor: pointer;
    padding-left: 5px;
    transition: 300ms;
}

.form-control {
    background-color: #1a1a1a;
    color: white;
    outline: none;
}

.form-control::placeholder {
    color: white;
}

.form-control:focus {
    background-color: #1a1a1a;
    color: white;
    border-color: #ffffff;
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.10);
}

.search-container {
    position: relative;
}

.search-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
}

/* MODAL CALCULATOR */

.modal {
    display: none;
    z-index: 1;
    width: 350px;
    height: auto;
    color: #1a1a1a
}

.modal-header {
    border-bottom: 0;
    cursor: grab;
    padding-top: 0;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 10px;
    width: 350px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    text-decoration: none;
    cursor: pointer;
}

.display {
    text-align: right;
    font-size: 24px;
    background-color: #f7f7f7;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    height: 75px;
    white-space: nowrap;
    overflow: hidden;
}

.miniDisplay {
    margin: 0;
    font-size: 16px;
    color: gray;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
}

.button {
    padding: 15px;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #e0e0e0;
}

.button:hover {
    background-color: #ccc;
}
</style>
