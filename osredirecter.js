// Supported timer tags
const tags = {
    minutes: {
        value: 60, // Default unit is seconds
        names: ['minutes', 'minute', 'mins', 'min', 'm']
    },
    hours: {
        value: 60, unit: 'minutes',
        names: ['hours', 'hour', 'hrs', 'hr', 'h']
    },
    days: {
        value: 24, unit: 'hours',
        names: ['days', 'day', 'd']
    },
    weeks: {
        value: 7, unit: 'days',
        names: ['weeks', 'week', 'w']
    },
    months: {
        value: 31, unit: 'days', // Used 31 since it's online-stopwatch's interpretation of month
        names: ['months', 'month', 'mon']
    },
    years: {
        value: 365, unit: 'days', // Used 364 since it's online-stopwatch's interpretation of year
        names: ['years', 'year', 'yrs', 'yr', 'y']
    }
}

// If we have the urlParam timer, redirect instantly
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('timer')) processTimer(urlParams.get('timer'));

function processTimerClick() {
    let input = document.getElementById('timer').value;
    processTimer(input);
}

function processTimer(timerString) {
    const totalSeconds = getTotalSeconds(timerString);

    // And that's it, there we go, bye bye ^^
    urlParams.delete('timer');
    // Set sound to default bell
    urlParams.append('ns', '1');
    urlParams.append('countdown', getCountdownString(totalSeconds));
    window.location.replace(`https://www.online-stopwatch.com/eggtimer-countdown/?${urlParams.toString()}`);
}

function getCountdownString(seconds) {
    return '00:00:' + (seconds < 10 ? '0' : '') + seconds;
}

function getTotalSeconds(timerString) {
    return getTimeTokens(timerString)
        .map(token => getSecondsFromToken(token)) // Transform all tokens to it's values in seconds
        .reduce((a, b) => a + b, 0); // Get seconds from all tokens added up
}

function getTimeTokens(timerString) {
    return timerString
        .replace(/(\d)\s([a-zA-Z])/g, '$1$2') // Remove spaces between numbers and tags
        .replace(/([+-])\s(\d)/g, '$1$2') // Remove spaces between +- signs and numbers
        .replace(/([a-zA-Z]+)|\s/g, '$&#') // Add # as separators between tokens
        .split(/#/).filter(e => e != '') // Get array of tokens
        .map(token => token.replace(/\s/g, '')) // Remove white spaces of every token
        .filter(token => token != ''); // Remove empty tokens.
}

function getSecondsFromToken(token) {
    const regex = /([+-\d]+)(\D*)/;
    if (!regex.test(token)) {
        return 0;
    }
    const matches = token.match(regex);
    const value = +matches[1];
    const tagName = Object.keys(tags)
        .find(name => tags[name].names.includes(matches[2]));
    const tag = tagName ? tags[tagName] : { value: 1 };

    let resultValue = value * tag.value;
    return tag.unit ? getSecondsFromToken(resultValue + tag.unit) : resultValue;
}

