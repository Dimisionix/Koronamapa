<template>
    <div class="cases-summary cases-summary__container">
        <img :src="icons.pl_flag"/>
        <el-button :class="[{'is-active': isActiveType('infected')}]" class="infected" size="small" round v-on:click="setCasesType('infected')">
            <div class="circle infected"></div> Zarażonych: <span class="infected"> {{ cases.infected }}</span>
        </el-button>
        <el-button :class="[{'is-active': isActiveType('deceased')}]" class="deceased" size="small" round v-on:click="setCasesType('deceased')">
            <div class="circle"></div> Zgony: <span class="deceased"> {{ cases.deceased }}</span>
        </el-button>
        <template v-if="width <= 1279">
            <el-button class="infected" size="small" round>
                <div class="circle infected"></div> Dzienne zarażenia: <span class="infected"> {{ cases.dailyInfected }}</span>
            </el-button>
            <el-button class="deceased" size="small" round>
                <div class="circle"></div> Dzienne zgodny: <span class="deceased"> {{ cases.dailyDeceased }}</span>
            </el-button>
            <el-button class="recovered" size="small" round>
                <div class="circle"></div> Dzienne ozdrowienia: <span class="recovered"> {{ cases.dailyRecovered }}</span>
            </el-button>
            <el-button class="tested" size="small" round>
                <div class="circle"></div> Dzienne testy: <span class="tested"> {{ cases.dailyTested }}</span>
            </el-button>
        </template>
<!--        <el-popover-->
<!--                placement="top-start"-->
<!--                trigger="click"-->
<!--                popper-class="app-donate-tooltip"-->
<!--        >-->
<!--            <p>Wesprzyj rozwój projektu:</p>-->
<!--            <a href="https://www.paypal.me/sebastiantomys" target="_blank" class="payment"><fa-icon :icon="['fab', 'cc-paypal']"></fa-icon>PayPal</a>-->
<!--            <a href="https://tipanddonation.com/dimision" target="_blank" class="payment"><fa-icon icon="credit-card"></fa-icon> BLIK, SMS oraz inne formy płatności</a>-->
<!--            <el-button class="donate" slot="reference"><fa-icon icon="gift"></fa-icon></el-button>-->
<!--        </el-popover>-->
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import pl_flag from '../assets/images/icons/pl_flag.png';

    export default {

        data: () => {
            return {
                sortedCases: [],
                icons: {
                    pl_flag: pl_flag
                },
                width: 0
            }
        },

        computed: {

            ...mapState({
                cases: 'cases',
                casesType: 'casesType'
            })

        },

        methods: {

            /**
             * Commit selected type of cases to SET_CASES_TYPE
             * @param type
             */
            setCasesType(type){
                this.$store.commit('SET_CASES_TYPE', type)
            },

            /**
             * Check if given type is active type
             * @param type
             * @returns {boolean}
             */
            isActiveType(type){
                return (this.casesType === type);
            },

            /**
             *  Commit false to SET_HOVER_LAND to stop hover lands
             */
            stopHoverLands(){
                this.$store.commit('SET_HOVER_LAND', false);
            }
        },

        mounted(){
            this.width = window.innerWidth;
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/_variables.scss";

    .cases-summary{
        &__container{
            padding: 10px 10px 10px 15px;
            background-color: $trans-black;
            border-radius: 25px 0 0 0;
            border-top: 1px solid $trans-black;
            border-left: 1px solid $trans-black;
            display: flex;
            align-items: center;
        }
        img{
            margin-right: 10px;
        }
        .el-button{
            pointer-events: all;
            .circle{
                pointer-events: all;
                border-radius: 50%;
                width: 12px;
                height: 12px;
                margin-right: 10px;
            }
            &.infected{
                .circle{
                    background-color: $infected;
                }
                &:hover, &:focus, &.is-active{
                    background-color: rgba($infected, .15);
                }
            }
            &.deceased{
                .circle{
                    background-color: $deceased;
                }
                &:hover, &:focus, &.is-active{
                    background-color: rgba($deceased, .15);
                }
            }
            &.recovered{
                .circle{
                    background-color: $recovered;
                }
                &:hover, &:focus, &.is-active{
                    background-color: rgba($recovered, .15);
                }
            }
            &.tested{
                .circle{
                    background-color: $tested;
                }
                &:hover, &:focus, &.is-active{
                    background-color: rgba($tested, .15);
                }
            }
        }
        .donate{
            position: absolute;
            top: -76px;
            right: 16px;
            animation: pulse 10s infinite;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba($infected, 0.0);
                }
                75% {
                    box-shadow: 0 0 0 0 rgba($infected, 0.4);
                }
                98% {
                    box-shadow: 0 0 0 10px rgba($infected, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba($infected, 0);
                }
            }
            .fa-gift{
                font-size: 25px;
            }
        }
    }
    @include combined {
        .cases-summary {
            padding: 1.563vw; //5px;
            width: 100%;
            border-radius: 0;
            justify-content: flex-start;
            height: 100%;
            background-color: #191A1D;
            img{
                width: 7.500vw; //24px;
                height: 7.500vw; //24px;
                margin-right: 3.125vw; //10px;
            }
            &__container {
                height: 100%;
                max-width: 100vw;
                overflow: scroll;
            }
            .el-button {
                +.el-button {
                    margin-left: 3.125vw; //10px;
                }
                .circle {
                    border-radius: 50%;
                    width: 3.750vw; //12px;
                    height: 3.750vw; //12px;
                    margin-right: 3.125vw; //10px;
                }
            }
            .donate{
                position: fixed;
                top: calc(9.375vw + 3.125vw);
                left: 3.125vw; //10px;
                width: 9.375vw; //30px;
                height: 9.375vw; //30px;
                .fa-gift{
                    font-size: 4.688vw; //15px;
                }
            }
        }
    }
</style>
