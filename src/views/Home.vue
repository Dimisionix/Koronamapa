<template>
    <div class="app app__container" :class="setTheme()" v-on:click.self="stopActiveLand()">
        <template v-if="isLoaded">
            <header class="app__topbar">
                <h1>Mapa zarażeń koronawirusem (SARS-CoV-2) w Polsce</h1>
                <div class="socials">
                    <p>Ministerstwo Zdrowia:</p>
                    <a href="https://twitter.com/MZ_GOV_PL" target="_blank">
                        <fa-icon :icon="['fab', 'twitter-square']"></fa-icon>
                    </a>
                    <a href="https://www.youtube.com/channel/UCTZL6hGYpx8VovtxLxhP88A/featured" target="_blank">
                        <fa-icon :icon="['fab', 'youtube-square']"></fa-icon>
                    </a>
                    <a href="https://www.linkedin.com/company/ministerstwo-zdrowia/" target="_blank">
                        <fa-icon :icon="['fab', 'linkedin']"></fa-icon>
                    </a>
                    <a href="https://www.instagram.com/ministerstwo_zdrowia/" target="_blank">
                        <fa-icon :icon="['fab', 'instagram-square']"></fa-icon>
                    </a>
                    <a href="https://www.flickr.com/photos/165923925@N07/albums/with/72157699270326744" target="_blank">
                        <fa-icon :icon="['fab', 'flickr']"></fa-icon>
                    </a>
                    <a class="hash" href="https://twitter.com/search?q=%23zostanwdomu" target="_blank"><fa-icon icon="hashtag"></fa-icon>ZostańWDomu</a>
                </div>
            </header>
            <section class="app__sidebar">
                <cases-list></cases-list>
            </section>
            <main class="app__map">
                <nation-map></nation-map>
            </main>
            <section class="app__modal">
                <region-info></region-info>
            </section>
            <section class="app__bottombar">
                <cases-summary></cases-summary>
            </section>
            <footer>
                <div class="desktop">
                    <p>Źródło grafiki Polski: <a href="http://amcharts.com/ammap">Amcharts</a> | Dane o zakażeniach dostarczone za pomocą <a :href="cases.readMe" target="_blank">APIFY</a>na podstawie danych <a :href="cases.sourceUrl">GOV</a> | Ostatnia aktualizacja danych: {{ cases.lastUpdatedAtApify | convertDate('pl', 'LLL')}} | Wersja aplikacji z dnia: 19.04.2020</p>
                    <p>Kontakt: <a target="_blank" href="mailto:koronamapa@dimision.pl">koronamapa@dimision.pl</a> | 2020 © Autor aplikacji: <span class="author">Sebastian Tomys</span><a target="_blank" href="https://www.linkedin.com/in/sebastian-tomys/"><fa-icon :icon="['fab', 'linkedin']"></fa-icon></a></p>
                </div>
                <div class="mobile">
                    <el-popover
                            placement="top-start"
                            trigger="click"
                            popper-class="app-footer-tooltip"
                            >
                        <p>Źródło grafiki Polski: <a href="http://amcharts.com/ammap">Amcharts</a><br>
                        Dane o zakażeniach dostarczone za pomocą <a :href="cases.readMe" target="_blank">APIFY</a><br>na podstawie danych <a :href="cases.sourceUrl">GOV</a><br>
                        Ostatnia aktualizacja: {{ cases.lastUpdatedAtApify | convertDate('pl', 'LLL')}}<br>
                        Kontakt: <a target="_blank" href="mailto:koronamapa@dimision.pl">koronamapa@dimision.pl</a></p>
                        <el-button slot="reference"><fa-icon icon="info-circle"></fa-icon></el-button>
                    </el-popover>
                    <p>2020 © Autor aplikacji: <span class="author">Sebastian Tomys</span></p>
                    <a target="_blank" href="https://www.linkedin.com/in/sebastian-tomys/"><fa-icon :icon="['fab', 'linkedin']"></fa-icon></a>
                </div>
            </footer>
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
    import linkedin from '../assets/images/icons/linkedin.png';

    export default {

        data: () => {
            return {
                loading: null,
                icons:{
                    linkedin: linkedin
                },

            };
        },

        computed:{

            ...mapState({
                cases: 'cases',
                isLoaded: 'casesLoaded',
                activeLand: 'activeLand',
                casesType: 'casesType'
            }),

        },

        methods:{

            /**
             * Commit false to SET_ACTIVE_LAND to remove active land
             */
            stopActiveLand() {
                this.$store.commit('SET_ACTIVE_LAND', false);
            },

            /**
             * Generate class name *-theme based on current cases type
             * @returns {string}
             */
            setTheme(){
                return this.casesType + '-theme';
            }

        },

        mounted(){
        },

        created(){
            this.loading = this.$loading({
                lock: true,
                text: 'Pobieranie danych o zarażeniach...',
                background: 'rgba(0, 0, 0, 1)',
                customClass: 'app-loader'
            });
            this.$store.dispatch('getCases');

        },

        watch:{
            /**
             * Close loader when isLoaded
             * @param val
             */
            isLoaded(val){
                if(val){
                    this.loading.close();
                    // this.$notify({
                    //     title: 'Wersja testowa',
                    //     message: 'Aktualnie trwa faza testowa aplikacji. Lista wspieranych urządzeń jest sukcesywnie rozszerzana. Wszelkie uwagi oraz pomysły proszę przesyłać na adres <a class="email" target="_blank" href="mailto:koronamapa@dimision.pl">email</a> podany w stopce lub poprzez Twittera <a class="twitter" href="https://twitter.com/Dimisionx" target="_blank">@Dimisionx</a>.',
                    //     duration: 0,
                    //     offset: 55,
                    //     customClass: 'app-notify',
                    //     dangerouslyUseHTMLString: true,
                    // });
                }
            }
        },

        filters: {
            /**
             * Convert date to string with moment.js
             * @param date
             * @param locale
             * @param format
             * @returns {string}
             */
            convertDate(date, locale, format) {
                return moment(date).locale(locale).format(format);
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/_variables.scss";
    .app{
        &__container{
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        &__topbar{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 10px;
            background-color: $trans-black;
            border-bottom: 1px solid $trans-black;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 2.917vw; ///56px;
            h1{
                font-size: 1.563vw; //30px;
            }
            .socials{
                display: flex;
                align-items: center;
                p{
                    margin-right: 10px;
                    font-size: 13px;
                }
                svg{
                    margin: 0 3px;
                    font-size: 1.563vw; //30px;
                    transition: color .33s ease-in-out;
                    &:hover{
                        color: $infected;
                    }
                    &.fa-hashtag{
                        color: $infected;
                    }
                }
                a.hash{
                    margin-left: 100px;
                    font-size: 1.458vw; //28px;
                    font-weight: 700;
                    transition: color .33s ease-in-out;
                    &:hover{
                        color: $infected;
                    }
                }
            }
        }
        &__bottombar{
            position: fixed;
            right: 0;
            bottom: 40px;
        }
        &__sidebar{
            position: fixed;
            bottom: 40px;
            left: 0;
        }
        &__modal{
            position: fixed;
            right: 0;
            pointer-events: none;
        }
        footer{
            position: fixed;
            bottom: 0;
            left: 0;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            width: 100%;
            background-color: $trans-black;
            border-top: 1px solid $trans-black;
            .mobile{
                display: none;
            }
            .desktop{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%
            }
            p{
                font-size: 11px;
                display: flex;
                align-items: center;
                a{
                    margin: 0 3px;
                    font-weight: 700;
                    transition: color .33s ease-in-out;
                    &:hover{
                        color: $infected;
                    }
                }
                span.author{
                    font-weight: 700;
                    margin-left: 3px;
                }
            }
            .fa-linkedin{
                font-size: 20px;
                margin: 0 3px;
                transition: color .33s ease-in-out;
                &:hover{
                    color: $infected;
                }
            }
        }
        .el-button {
            background-color: transparent;
            border: 2px solid $gray;
            color: $font-white;
            font-weight: 100;
            transition: background-color .33s ease-in-out;
            &:hover, &:focus {
                border: 2px solid $gray;
                background-color: rgba($gray, .4);
                color: $font-white;
            }
            &.is-active {
                border: 2px solid $gray;
                color: $font-white;
            }
            span {
                display: flex;
                justify-content: left;
                align-items: center;
                margin: 0 3px;
                &.infected {
                    color: $infected;
                }
                &.deceased {
                    color: $deceased;
                }
            }
        }
        &-loader{
            .el-loading{
                &-spinner {
                    .path {
                        stroke: $infected;
                    }
                    .el-loading-text{
                        margin-top: 100px;
                        color: $infected;
                    }
                }
            }
        }
        &-notify{
            &.el-notification {
                a.twitter{
                    color: #1DA1F2;
                    font-weight: 700;
                }
                a.email{
                    color: $infected;
                    font-weight: 700;
                }
                .el-icon-close {
                    top: 15px;
                    &:before {
                        content: "X";
                        font-family: 'Ubuntu', sans-serif;
                        color: black;
                        font-weight: 700;
                    }
                }
            }
        }
        &-donate-tooltip{
            border-radius: 8px!important;
            margin-right: 16px!important;
            border: 1px solid #EBEEF5;
            p{
                font-weight: 700;
                color: black;
                margin-bottom: 5px;
            }
            .payment{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 5px;
                padding: 5px;
                cursor: pointer;
                border-radius: 5px;
                color: black;
                transition: background-color .33s ease-in-out, color .15s;
                &:hover{
                    background-color: $trans-black;
                    color: white;
                }
                svg{
                    font-size: 25px;
                    margin-right: 5px;
                }
                .fa-credit-card{
                    color: $dark-gray;
                }
                .fa-cc-paypal{
                    color: #00457C;
                }
            }
        }
    }
    @include combined {
        .app {
            &__container {
                justify-content: flex-start;
                padding: 12.500vw 0 0 0; //40px 0 0 0;
            }
            &__topbar {
                height: 9.375vw; //30px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                h1 {
                    font-size: 3.438vw; //11px;
                }
                .socials {
                    p {
                        font-size: 3.125vw; //10px;
                        margin-right: 0.938vw; //3px;
                        display: none;
                    }
                    a.hash {
                        margin-left: 0;
                        font-size: 4.375vw; //14px;
                        position: absolute;
                        bottom: -6.250vw; //-20px;
                        right: 1.563vw; //5px;
                        svg {
                            display: inline-block;
                        }
                    }
                    svg {
                        display: none;
                        font-size: 4.375vw; //14px;
                    }
                }
            }
            footer {
                justify-content: center;
                align-items: center;
                height: 10vw; //32px;
                padding: 1.563vw; //5px;
                background-color: #191A1D;
                .mobile {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .el-button {
                        padding: 0;
                        margin: 0;
                        border: none;
                        background-color: transparent;
                        &:hover, &:focus {
                            border: none;
                            background-color: transparent;
                        }
                        i {
                            font-size: 6.250vw; //20px;
                        }
                    }
                }
                .desktop {
                    display: none;
                }
                p {
                    display: block;
                    font-size: 3.750vw; //12px;
                }
                svg.fa-linkedin{
                    font-size: 6.250vw; //20px;
                }
                svg.fa-info-circle {
                    font-size: 5vw; //16px;
                }
            }
            &-footer-tooltip {
                &.el-popover {
                    background: $dark-gray;
                    border-color: $trans-black;
                    border-radius: 0;
                    padding: 1.563vw; //5px;
                    max-width: 95%;
                    width: 95% !important;
                    left: 2.5% !important;
                    p {
                        font-size: 3.750vw; //12px;
                        color: $font-white;
                        a {
                            font-weight: 700;
                        }
                    }
                    .popper__arrow {
                        display: none;
                    }
                }
            }
            &-donate-tooltip{
                margin-right: 0!important;
                border: 1px solid #EBEEF5;
                width: 95% !important;
                left: 2.5% !important;
                border-radius: 0;
                padding: 1.563vw; //5px;
                p{
                    font-weight: 700;
                    color: black;
                    margin-bottom: 5px;
                    font-size: 3.750vw; //12px;
                }
                .payment{
                    font-size: 4.375vw; //14px;
                    svg{
                        font-size: 7.813vw; //25px;
                        margin-right: 5px;
                    }
                }
            }
            &__bottombar {
                bottom: 10vw; //32px;
                height: 11.563vw; //37px;
                width: 100%;
            }
            .el-button {
                &.el-button--small.is-round {
                    padding: 1.563vw 3.125vw; //5px 10px;
                    font-size: 3.750vw; //12px;
                    border-radius: 6.250vw; ///20px;
                }
            }
            &__sidebar {
                bottom: 21.563vw; //69px;
                top: 60vw;
            }
            &__modal {
                bottom: 25vw; //80px;
                width: 90%;
                right: 5%;
            }
            &-notify {
                &.el-notification {
                    max-width: 90%;
                }
            }
        }
    }
</style>