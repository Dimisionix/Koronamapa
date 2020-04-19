<template>
    <div class="region-info region-info__container" :class="{'is-visible': activeLand}">
        <div class="close" v-on:click="stopActiveLand()">
            <div></div>
            <div></div>
        </div>
        <template v-if="cachedLand">
            <div class="region-info__title">
                <img :src="crests[cachedLand.region.replace('-', '_')]"/>
                <h1>{{ cachedLand.region | capitalizeFirstLetter }}</h1>
            </div>
            <div class="region-info__stats">
                <el-button class="infected" size="small" round>
                    Zarażonych: <span>{{ cachedLand.infectedCount }}</span>
                </el-button>
                <el-button class="deceased" size="small" round>
                    Zgony: <span>{{ cachedLand.deceasedCount }}</span>
                </el-button>
            </div>
            <el-progress type="circle" :percentage="getPercentageDeath()"></el-progress>
        </template>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {

        data: () => {
            return {
                cachedLand: false
            }
        },

        computed: {

            ...mapState({
                activeLand: 'activeLand',
                crests: 'crests'
            })

        },

        methods: {

            /**
             * Calculate percentage death
             * @returns {string}
             */
            getPercentageDeath(){
                return parseFloat((this.cachedLand.deceasedCount / this.cachedLand.infectedCount * 100).toFixed(1));
            },

            /**
             * Commit false to SET_ACTIVE_LAND to remove active land
             */
            stopActiveLand() {
                this.$store.commit('SET_ACTIVE_LAND', false);
            },

        },

        created() {

        },

        watch:{
            activeLand(land){
                if(land)this.cachedLand = land;
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

    .region-info {
        pointer-events: all;
        &__container{
            background-color: $trans-black;
            border: 1px solid $trans-black;
            padding: 15px 60px 30px 30px;
            border-radius: 25px 0 0 25px;
            transform: translateX(100%);
            transition: all .6s ease-in;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            &.is-visible{
                transform: translateX(0);
                transition: all .3s ease-out;
            }
        }
        &__title{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
            img{
                width: 25px;
                height: 30px;
                margin-right: 10px;
            }
        }
        &__stats{
            .el-button {
                &.infected{
                    span > span{
                        color: $infected;
                    }
                }
                &.deceased{
                    span > span{
                        color: $deceased;
                    }
                }
                &:nth-child(1) {
                    float: left;
                }
                &:nth-child(2) {
                    float: right;
                }
            }
        }

        .el-progress {;
            height: 100%;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            &--circle{
                display: flex;
            }
            &__text {
                color: white;
                font-size: 14px!important;
                display: block;
                &:before{
                    content: 'Śmiertelność';
                    display: block;
                    margin-bottom: 20px;
                    font-size: 11px;
                }
            }
            &-circle {
                &__path {
                    stroke: $deceased;
                }
                &__track {
                    stroke: $gray;
                    stroke-width: 2px;
                }
            }
        }

        .close{
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            transform-origin: center;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid $trans-black;
            border-radius: 5px;
            cursor: pointer;
            transition: border-color .33s ease-in-out;
            div{
                height: 2px;
                width: 10px;
                background-color: $font-white;
                position: absolute;
                transform-origin: center;
                border-radius: 2px;
                transition: width .33s ease-in-out;
                &:first-of-type{
                    transform: rotate(45deg);
                }
                &:last-of-type{
                    transform: rotate(-45deg);
                }
            }
            &:hover{
                border-color: $font-white;
            }
        }
    }
    @include combined{
        .region-info {
            transform: translateX(0) scale(0);
            opacity: 0;
            background-color: lighten(black, 15);
            transition: all .15s ease-in;
            width: 100%;
            height: auto;
            border-radius: 3.125vw; //10px;
            padding: 4.688vw; //15px;
            &.is-visible {
                transform: translateX(0) scale(1);
                opacity: 1;
                transition: all .15s ease-out;
            }
            .el-progress {
                margin-top: 3.125vw; //10px;
            }
        }
    }
</style>
