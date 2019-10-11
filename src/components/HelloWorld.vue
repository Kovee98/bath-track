<template>
    <div class="container">
        <h1 class="title has-centered-text">{{ msg }}</h1>
        <h1 class="title has-centered-text">{{ time.time12 }}</h1>
        <div class="level is-mobile">
            <button ref="available" @click="available" class="button is-primary level-item">Available</button>
            <button ref="not-available" @click="notAvailable" class="button is-danger level-item">Not Available</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

var apiKey = "AIzaSyAHLfr3RDEhd3swkRubU-5bINyFZzDpUPs";
var googleUrl = "https://sheets.googleapis.com/v4/spreadsheets/1iB3ztJ3NqhQpgmYuqTaJJRGckMEjuQpgdUO_UULrQC4";
var scopes = "https://www.googleapis.com/auth/spreadsheets";

var availableUrl =      "https://hooks.zapier.com/hooks/catch/5048005/obrdkxs";
var notAvailableUrl =   "https://hooks.zapier.com/hooks/catch/5048005/obri02u";

var getCurrentTime = () => {
    var date = new Date();
    var h24 = date.getHours();
    var h12 = (h24 + 24) % 12 || 12;
    var m = date.getMinutes();
    var mStr = m < 10 ? "0" + m : m;

    var currentTime = {
        hour12: h12,
        hour24: h24,
        minute: m,
        time12: h12 + ":" + mStr,
        time24: h24 + ":" + mStr
    }

    return currentTime;
}

var getRow = () => {
    var row = 2; // Row 2 is where the data starts
    var hour = time.hour24;
    row += (hour - 8) * 2;
    
    // Account for minutes
    if(this.time.minute >= 30) {
        row += 1;
    }
    return row;
}

var updateValue = (opts, success, fail) => {
    var success = success || console.log;
    var fail = fail || console.log;
    console.log(opts.el);
    success();
}

var getValue = (opts) => {
    var value = -1;

    axios.get(googleUrl + "/values/" + opts.cell + "?key=" + apiKey)
        .then((result) => {
            return result;
        });

    // $.ajax(
    // }).done(function(data) {
    //     value = data.values[0][0];
    // });
    // return value;
}

var getUrl = (opts) => {
    var column = opts.available ? "B" : "C";
    var row = getRow();
    var cell = column + row;
    var value = parseInt(getValue(cell)) + 1;
    var url = opts.available ? availableUrl : notAvailableUrl;
    url += "?row=" + row + "&value=" + value;
    return url;
}

export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Bath Track',
            time: getCurrentTime()
        }
    },
    methods: {
        available() {
            var available = this.$refs.available;
            available.classList.add('is-loading');

            getValue({
                cell: 
            })

            // update({ el: available }, () => {
            //     available.classList.remove('is-loading');
            // }, null);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
