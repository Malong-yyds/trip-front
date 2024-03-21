<template>
    <div class="cuisine">

        <el-card style="max-width: 200px" v-for="item in 4">

            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                style="width: 100%" />
            <template #footer>
                <span>user</span>
                <p>这个非常好吃
                </p>
            </template>
        </el-card>
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.cuisine {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>