<template>
    <h5 class="text-center py-5">{{ mainAppText }}</h5>
</template>

<script>
import { instance } from '../../../utils/authorization';
import apiUrl from '../../../config/config';

export default {
    data() {
        return {
            mainAppText: 'TaskMaster App'
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await instance.get(apiUrl, { withCredentials: true });

                if (response.status === 200) {
                    this.mainAppText = response.data;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    },
}

</script>

<style scoped></style>