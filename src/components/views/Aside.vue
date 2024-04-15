<template>
    <div class="m-2">
        <div class="item py-2">
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

        <div class="item">
            <img src="/src/assets/icons/icons8-sun-32.png" alt="Sun Icon">
            <h6 class="my-3">Tasks for Today</h6>
        </div>

        <div class="item">
            <img src="/src/assets/icons/icons8-deadline-32.png" alt="Deadline Icon">
            <h6 class="my-3">Tasks Due Soon</h6>
        </div>

        <div class="item">
            <img src="/src/assets/icons/icons8-done-32.png" alt="Completed Icon">
            <h6 class="my-3">Completed</h6>
        </div>

        <div class="item">
            <img src="/src/assets/icons/icons8-star-32.png" alt="Favorites Icon">
            <h6 class="my-3">Favorites</h6>
        </div>

        <div class="item">
            <img src="/src/assets/icons/icons8-add-user-male-32.png" alt="Assigned to Me Icon">
            <h6 class="my-3">Assigned to Me</h6>
        </div>
    </div>

    <hr class="m-1">

    <div class="m-2">
        <div class="item">
            <img src="/src/assets/icons/icons8-calendar-32.png" alt="Calendar Icon">
            <h6 class="my-3">Calendar</h6>
        </div>

        <div class="item">
            <img src="/src/assets/icons/icons8-calculator-32.png" alt="Calculator Icon">
            <h6 class="my-3">Calculator</h6>
        </div>
    </div>

    <hr class="m-1">

    <div class="m-2">
        <div class="item">
            <img src="/src/assets/icons/icons8-list-32.png" alt="Board Icon">
            <h6 class="my-3">Board 1</h6>
        </div>

        <div class="item">
            <img src="/src/assets/icons/icons8-list-32.png" alt="Board Icon">
            <h6 class="my-3">Board 3</h6>
        </div>

        <div class="item">
            <img src="/src/assets/icons/icons8-list-32.png" alt="Board Icon">
            <h6 class="my-3">Board 3</h6>
        </div>

    </div>

    <hr class="m-1">

    <div class="m-2">
        <div class="item">
            <img src="/src/assets/icons/icons8-lock-32.png" alt="Blocked Icon">
            <h6 class="my-3">Hidden Boards</h6>
        </div>
    </div>
</template>

<script>
import { instance } from '../../../utils/authorization';
import { userStore } from '../../../stores/userStore';
import apiUrl from '../../../config/config';

export default {
    data() {
        return {
            userStore: userStore(),
            userName: 'UserName',
            email: 'email',
            tootlTipText: 'name, surname, oldUserName'
        };
    },
    mounted() {
        this.$nextTick(() => {
            // Initialize tooltips after the element is rendered in the DOM
            const tooltipTargets = this.$refs.tooltipTarget;
            if (tooltipTargets) {
                const tooltipElements = Array.isArray(tooltipTargets) ? tooltipTargets : [tooltipTargets];
                tooltipElements.forEach(tooltipTarget => {
                    new bootstrap.Tooltip(tooltipTarget);
                });
            }
        });
    },
    methods: {
        setData() {
            this.userName = this.userStore.currentUser.userName;
            this.email = this.userStore.currentUser.email;

            this.tootlTipText = `${this.userStore.currentUser.name}, ${this.userStore.currentUser.surname}`;

            if (this.userStore.currentUser.oldUserName) {
                this.tootlTipText += `. Old User Name: ${this.userStore.currentUser.oldUserName}`;
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

.item:hover {
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
</style>
