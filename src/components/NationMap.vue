<template>
    <div class="map map__container">
        <div class="map__overlay">
            <p class="tip">Kliknij w województwo aby zobaczyć szczegóły</p>
        </div>
        <svg viewBox="0 0 610 580" class="map__nation" :class="[{'all-hovered': (!hoverLand && !activeLand)}]" xmlns="http://www.w3.org/2000/svg" xmlns:amcharts="http://amcharts.com/ammap"
             xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <defs>
                <amcharts:ammap projection="mercator" leftLongitude="14.122232" topLatitude="54.834941"
                                rightLongitude="24.149724" bottomLatitude="49.002699"></amcharts:ammap>
            </defs>
            <path v-for="land in lands"
                  :key="land.id"
                  :id="land.id"
                  class="map__land"
                  :class="[land.region, {'is-active': isActiveLand(land.region)}, {'is-hover': isHoverLand(land.region)}]"
                  :d="land.path"
                  :style="'fill-opacity:' + getIntensity(land.region)"
                  v-on:click="onLandClick(land.region)"
                  v-on:mouseenter="onLandHover(land.region)"
                  v-on:mouseleave="stopHoverLands()">

            </path>
        </svg>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';

    export default {

        data: () => {
            return {

            }
        },

        computed:{

            ...mapState({
                lands: 'lands',
                cases: 'cases',
                isLoaded: 'casesLoaded',
                activeLand: 'activeLand',
                hoverLand: 'hoverLand',
                casesType: 'casesType'
            }),

            ...mapGetters({
                getMostInfectedRegion: 'getMostInfectedRegion',
                getMostDeceasedRegion: 'getMostDeceasedRegion',
            })

        },

        methods:{

            /**
             * Commit clicked region to SET_ACTIVE_LAND
             * @param {string|boolean} region
             */
            onLandClick(region){
                this.$store.commit('SET_ACTIVE_LAND', region);
            },

            /**
             * Commit hovered region to SET_HOVER_LAND
             * @param {string|boolean} region
             */
            onLandHover(region){
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
             * Calculate the intensity of region's infection or deceased rates
             * @param {string} region
             * @returns {string}
             */
            getIntensity(region) {
                let matched = this.cases.infectedByRegion.find(el => el.region === region);
                let matchedCases = 0;
                let mostCases = 0;
                if(this.casesType === 'infected'){
                    matchedCases = matched.infectedCount;
                    mostCases = this.getMostInfectedRegion.infectedCount;
                }
                else if(this.casesType === 'deceased'){
                    matchedCases = matched.deceasedCount;
                    mostCases = this.getMostInfectedRegion.deceasedCount;
                }
                let percent = parseInt(matchedCases / mostCases * 100);
                let intensity = (percent / 100).toString();
                return intensity;
            }

        },


        watch:{

        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/_variables.scss";

    $width: 84.7215vh;
    $height: 80.556vh;

    $mobile-width: 45vw;
    $mobile-height: 45vw;

    .map {
        &__container{
            height: $height;
            width: $width;
        }
        &__nation{
            &:not(.all-hovered) {
                .map__land {
                    fill-opacity: 0!important;
                    &.is-active{
                        fill-opacity: 1!important;
                    }
                    &:not(.is-active) {
                        &.is-hover {
                            fill-opacity: 0.7!important;
                        }
                    }
                }
            }
        }
        &__land {
            stroke: lighten(black, 8);
            stroke-opacity: 1;
            stroke-width: 1;
            transition: all .3s ease-in;
            cursor: pointer;
            &:not(.is-active) {
                &.is-hover {
                    stroke-width: 2;
                    transition: all .6s ease-out;
                }
            }
            &.is-active{
                stroke-width: 2;
                transition: all .6s ease-out;
            }
        }
        &__overlay{
            position: absolute;
            z-index: 2;
            height: $height;
            width: $width;
            left: calc(50% - #{$width} / 2);
            pointer-events: none;
            display: flex;
            justify-content: center;
            p.tip{
                position: absolute;
                bottom: -1.823vh; //-35px;
                font-size: 11px;
            }
        }
    }
    @include combined{
        .map {
            width: $mobile-width;
            height: $mobile-height;
            &__overlay {
                height: $mobile-height;
                width: $mobile-width;
                left: calc(50% - #{$mobile-width} / 2);
                p.tip {
                    white-space: nowrap;
                    bottom: -0.938vw; //-3vw;
                    font-size: 3.125vw; //10px;
                }
            }
            &__land {
                stroke-width: 5px;
            }
        }
    }
</style>
