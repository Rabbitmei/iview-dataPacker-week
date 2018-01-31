import Vue from 'vue';
import Picker from '../picker.vue';
import DatePanel from '../panel/date.vue';
import DateRangePanel from '../panel/date-range.vue';
import DateRangeWeek from '../panel/date-week.vue';

const getPanel = function (type) {
    if (type === 'daterange' || type === 'datetimerange' ) {
        return DateRangePanel;
    }
    if (type === 'week'){
        return DateRangeWeek;
    }
    return DatePanel;
};

import { oneOf } from '../../../utils/assist';

export default {
    mixins: [Picker],
    props: {
        type: {
            validator (value) {
                return oneOf(value, ['week','year', 'month', 'date', 'daterange', 'datetime', 'datetimerange']);
            },
            default: 'date'
        },
        value: {}
    },
    watch: {        
        type(value){
            const typeMap = {
                year: 'year',
                month: 'month',
                date: 'day',
                week: 'week'
            };
            const validType = oneOf(value, Object.keys(typeMap));
            if (validType) this.Panel.selectionMode = typeMap[value];
        }
    },
    created () {
        if (!this.currentValue) {
            if (this.type === 'daterange' || this.type === 'datetimerange'|| this.type === 'week') {
                this.currentValue = ['',''];
            } else {
                this.currentValue = '';
            }
        }

        const panel = getPanel(this.type);
        this.Panel = new Vue(panel);
    }
};
