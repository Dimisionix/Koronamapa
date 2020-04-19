<template>
    <div class="cases-list cases-list__container">
        <ul>
            <li v-for="(region, index) in sortedCases"
                :key="index"
                :class="[region.region, casesType, {'is-active': isActiveLand(region.region)}, {'is-hover': isHoverLand(region.region)}]"
                v-on:click="onRegionClick(region.region)"
                v-on:mouseenter="onRegionHover(region.region)"
                v-on:mouseleave="stopHoverLands()">
                <el-button size="small" round>
                    <img :src="crests[region.region.replace('-', '_')]"/>
                    <p>
                        {{ region.region | capitalizeFirstLetter }}
                        <span class="theme">{{ getCurrentTypeCount(region) }}</span>
                    </p>
                </el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import _ from 'lodash';

    export default {

        data: () => {
            return {
                sortedCases: [],
            }
        },

        computed: {

            ...mapState({
                cases: 'cases',
                activeLand: 'activeLand',
                hoverLand: 'hoverLand',
                casesType: 'casesType',
                crests: 'crests'
            })

        },

        methods: {

            /**
             * Order cases by given type and assign to sortedCases
             * @param {string} type
             */
            sortCasesBy(type) {
                this.sortedCases = _.orderBy(this.cases.infectedByRegion, type + 'Count', 'desc');
            },

            /**
             * Commit clicked region to SET_ACTIVE_LAND
             * @param {string|boolean} region
             */
            onRegionClick(region) {
                this.$store.commit('SET_ACTIVE_LAND', region);
            },

            /**
             * Commit hovered region to SET_HOVER_LAND
             * @param {string|boolean} region
             */
            onRegionHover(region){
                this.$store.commit('SET_HOVER_LAND', region);
            },

            /**
             * Check if given region is a active region
             * @param {string|boolean} region
             * @returns {boolean}
             */
            isActiveLand(region){
                return (this.activeLand && this.activeLand.region === region);
            },

            /**
             * Check if given region is a hover region
             * @param {string|boolean} region
             * @returns {boolean}
             */
            isHoverLand(region){
                return (this.hoverLand && this.hoverLand.region === region);
            },

            /**
             *  Commit false to SET_HOVER_LAND to stop hover lands
             */
            stopHoverLands(){
                this.$store.commit('SET_HOVER_LAND', false);
            },

            /**
             * Get current type of cases
             * @param {object} region
             * @returns {string}
             */
            getCurrentTypeCount(region){
                return region[this.casesType + 'Count'];
            }

        },

        created() {
            this.sortCasesBy(this.casesType);
        },

        watch:{
            casesType(type){
                this.sortCasesBy(type);
            }
        },

        filters: {
            /**
             * Capitalize first letter in given text
             * @param text
             * @returns {string}
             */
            capitalizeFirstLetter(text) {
                return text[0].toUpperCase() + text.slice(1);
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/_variables.scss";

    .cases-list {

        $header-height: 2.917vw;
        $footer-height: 40px;

        max-height: calc(100vh - #{$header-height} - #{$footer-height});
        direction: rtl;
        overflow-y:auto;
        overflow-x: hidden;
        &::-webkit-scrollbar-track {
            background-color: $trans-black;
        }
        &::-webkit-scrollbar{
            width: 15px;
            background-color: transparent;
            border-right: 1px solid $trans-black;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 0;
            border: 1px solid $trans-black;
            background-color: $dark-gray;
        }
        ul {
            direction:ltr;
            li {
                display: table;
                margin-bottom: 5px;
                padding: 5px;
                background-color: $trans-black;
                border-right: 1px solid $trans-black;
                border-top: 1px solid $trans-black;
                border-bottom: 1px solid $trans-black;
                border-radius: 0 25px 25px 0;
                transition: padding-left .33s ease-out;
                cursor: pointer;
                opacity: 0;
                transform: translateX(-100%);
                box-sizing: content-box;
                position: relative;
                &:first-of-type{
                    margin-top: 5px;
                }
                .el-button--small.is-round{
                    padding: 7px 15px;
                }
                img{
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                }
                span.theme{
                    display: inline;
                    transition: color .33s ease-out;
                    margin-right: 0;
                }
                &.is-active{
                    padding-left: 50px;
                }
                &:not(.is-active){
                    &.is-hover {
                        padding-left: 25px;
                    }
                }
                // fastest way to re-render animation...
                &.infected{
                    animation: .2s ease-in-out both slide-in-infected;
                }
                &.deceased{
                    animation: .2s ease-in-out both slide-in-deceased;
                }
                @for $i from 1 through 16{
                    &:nth-child(#{$i}){
                        animation-delay: $i * .15s;
                    }
                }
                @keyframes slide-in-deceased {
                    0% {
                        opacity: 0;
                        transform: translateX(-100%);
                    }

                    100% {
                        opacity: 1;
                        transform: translateX(0%);;
                    }
                }
                @keyframes slide-in-infected {
                    0% {
                        opacity: 0;
                        transform: translateX(-100%);
                    }

                    100% {
                        opacity: 1;
                        transform: translateX(0%);;
                    }
                }
            }
        }
    }
    @include combined {
        .cases-list {
            //max-height: 100vw;//93.750vw; //300px;
            max-height: calc(100vh - 21.563vw - 60vw);
            direction: ltr;
            padding-left: 6.250vw; //20px;
            &::-webkit-scrollbar-track {
                background-color: transparent;
            }
            &::-webkit-scrollbar {
                width: 3.125vw; //10px;
                background-color: transparent;
                border-right: none;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 4.688vw; //15px;
                border: 1px solid $trans-black;
                background-color: $infected
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin-right: 3.125vw; //10px;
                padding-bottom: 21.563vw; //69px;
                li {
                    border-radius: 7.813vw; //25px;
                    padding: 0.938vw; //3px;
                    margin-bottom: 0.938vw; //3px;
                    width: 100%;
                    &:first-of-type {
                        margin-top: 0;
                    }
                    .el-button {
                        width: 100%;
                        padding: 0.938vw 2.188vw; //3px 7px;
                        span {
                            justify-content: center;
                            .theme {
                                float: right;
                            }
                        }
                        p {
                            width: 100%;
                        }
                        img {
                            width: 3.438vw; //11px;
                            height: 3.438vw; //11px;
                        }
                    }
                    &.is-active {
                        padding-left: 0.938vw; //3px;;
                    }
                    &:not(.is-active) {
                        &.is-hover {
                            padding-left: 0.938vw; //3px;
                        }
                    }
                }
            }
        }
    }
</style>
