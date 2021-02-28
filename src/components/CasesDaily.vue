<template>
    <div class="cases-daily">
        <div class="cases-daily__container">
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
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {


        computed: {

            ...mapState({
                cases: 'cases',
            })

        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/_variables.scss";

    .cases-daily{
        position: fixed;
        top: 2.917vw; ///56px;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-content: center;
        &__container{
            padding: 5px 15px 10px 15px;
            background-color: $trans-black;
            border-radius: 0 0 25px 25px;
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

    }
    @media screen and (min-width: $tablet-large) and (max-width: 1450px){
        .cases-daily{
            justify-content: flex-end;
            &__container {
                border-bottom-right-radius: 0;
            }
        }
    }
    @include combined {
        .cases-daily {
           display: none;
        }
    }
</style>
