import axios from 'axios';

// Contains all the logic to update the google spreadsheet
var apiKey = "AIzaSyAHLfr3RDEhd3swkRubU-5bINyFZzDpUPs";
var googleUrl = "https://sheets.googleapis.com/v4/spreadsheets/1iB3ztJ3NqhQpgmYuqTaJJRGckMEjuQpgdUO_UULrQC4";
var scopes = "https://www.googleapis.com/auth/spreadsheets";

var availableUrl =      "https://hooks.zapier.com/hooks/catch/5048005/obrdkxs";
var notAvailableUrl =   "https://hooks.zapier.com/hooks/catch/5048005/obri02u";

var getRow = (currentTime) => {
    var row = 2; // Row 2 is where the data starts
    var hour = currentTime.hour24;
    row += (hour - 8) * 2;
    
    // Account for minutes
    if(currentTime.minute >= 30) {
        row += 1;
    }
    return row;
}

var getValue = (opts) => {
    return axios.get(googleUrl + "/values/" + opts.cell + "?key=" + apiKey)
        .then((result) => {
            return parseInt(result.data.values[0][0]);
        })
        .catch(error => {
            throw Error(error);
        });
}

var getUrl = (opts) => {
    var column = opts.isAvailable ? "B" : "C";
    var row = getRow(opts.currentTime);
    var cell = column + row;

    return getValue({
        cell: cell
    }).then(value => {
        var url = opts.isAvailable ? availableUrl : notAvailableUrl;
        url += "?row=" + row + "&value=" + (value + 1);
        return url;
    }).catch(error => {
        throw Error(error);
    });
}

var updateValue = async (opts) => {
    var url = await getUrl({
        currentTime: opts.currentTime,
        isAvailable: opts.isAvailable
    });
    
    if (url) {
        return axios.post(url);
    } else {
        throw Error('Url is null');
    }
}

var spreadsheet = {
    updateValue: updateValue
}

export default spreadsheet;