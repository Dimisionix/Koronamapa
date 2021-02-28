<template>
    <div>
        <noscript>
            <h1>Mapa zarażeń koronawirusem (SARS-CoV-2) w Polsce</h1>
        </noscript>
        <router-view/>
        <div class="mobile-landscape-detector">
            <i class="fas fa-sync-alt"></i>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">

    // import fonts
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');

    // import general scss's files
    @import 'assets/scss/_reset.scss';
    @import 'assets/scss/_variables.scss';
    @import 'assets/scss/_global.scss';
    @import 'assets/scss/_themes.scss';

</style>
