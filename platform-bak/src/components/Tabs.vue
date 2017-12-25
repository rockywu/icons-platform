<template>

<ul class="nav nav-pills nav-app">
    <li :class="row.active ? 'active':''" v-for="(row, index) in data">
        <router-link :to="{name : row.name}" :data-toggle="row.active ? 'tab' : null">{{row.label}}</router-link>
    </li>
</ul>

</template>

<script>
export default {
    props : ['data']
}
</script>
<style></style>
