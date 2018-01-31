<template>
    <div>	 
        <DatePicker v-model="value5" @on-change="handleChange" type="week" placeholder="Select date" style="width: 300px"></DatePicker>   
          <DatePicker v-model="value" @on-change="handleChange" type="datetimerange" placeholder="Select date" style="width: 400px"></DatePicker>
        <DatePicker v-model="value2" type="datetime" @on-change="handleChange" style="width: 200px"></DatePicker>
      
        {{ value }}
        <br>erwrwe
        {{ value2 }}
        <br><br>
        <DatePicker type="year" v-model="value3" placeholder="Select year" style="width: 200px"></DatePicker>
        <DatePicker type="month" v-model="value4" placeholder="Select month" style="width: 200px"></DatePicker>    
    </div>
</template>
<script>
    import DatePicker from '../components/date-picker'
    export default {
        data () {
            return {
                value: ['2018-03-05 10:00:00', '2018-05-15 10:01:00'],
                value2: '2018-02-05 10:09:00',
                value3: '1978',
                value5: ['2018-03-05 10:00:00', '2018-05-15 10:01:00'],
                value4: '1978-05'
            }
        },
        created () {
            console.log(33323)
        },
        components: {DatePicker},
        methods: {
            handleChange (v,vis,index) {
                console.log(v);
                console.log(vis+'--------')
            }
        }
    }
</script>
