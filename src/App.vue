<template>
    <div>
        <div class="mobile-landscape-detector">
            <i class="fas fa-sync-alt"></i>
            <p>Proszę obrócić urządzenie</p>
        </div>
        <router-view/>
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
