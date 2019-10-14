// Contains all the time-based logic

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

var time = {
    getCurrentTime: getCurrentTime
}

export default time;