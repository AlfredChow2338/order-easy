<template>
    <div class="star">
        <span :key="itemClass" :class="itemClass" v-for="itemClass in itemClasses" class="star-item"></span>
    </div>
</template>

<script>
    const starLen = 5;
    const cls_on = 'on';
    const cls_half = 'half';
    const cls_off = 'off';

    export default {
        props: {
            score: {
                type: Number
            }
        },
        computed: {
            itemClasses () {
                let result = [];
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);

                for (let i = 0; i < integer; i++) {
                    result.push(cls_on);
                }

                if (hasDecimal) {
                    result.push(cls_half);
                }

                while (result.length < starLen) {
                    result.push(cls_off);
                }
                return result;
            }
        }
    }
</script>

<style scoped>
    .star {
        font-size: 0;
    }

    .star .star-item {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-repeat: no-repeat;
        background-size: 10px 10px;
    }

    .star .star-item:last-child {
        margin-right: 0;
    }

    .star .on {
        background-image: url(./star24_on@2x.png);
    }

    .star .half {
        background-image: url(./star24_half@2x.png);
    }

    .star .off {
        background-image: url(./star24_off@2x.png);
    }
</style>