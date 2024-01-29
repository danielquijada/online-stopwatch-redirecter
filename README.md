# Context

online-stopwatch.com has a Timer utility, so you can easily create a timer for an arbitrary amount of time.

However, it's bugged so currently if you input a time with more than 1 variable (like 1 min 5 sec) it only reads the last one.

# This tool

This simple tool is devised to convert the arbitrary tags into a number of seconds and redirect to the online-stopwatch with only 1 parameter.

Check it  [Here](https://danielquijada.github.io/online-stopwatch-redirecter/)!

## Usage

Time tags can be inputed directly in the input or as an URL parameter.

Example: `danielquijada.github.io/online-stopwatch-redirecter/?timer=10m15s` [Test](https://danielquijada.github.io/online-stopwatch-redirecter/?timer=10m15s)

## Supported Time Tags

- Seconds (_numbers with any non-accepted keywords or without keywords will default to seconds_)
- Minutes (minutes/minute/mins/min/m)
- Hours (hours/hour/hrs/hr/h)
- Days (days/day/d)
- Weeks (weeks/week/w)
- Months (31 days) (months/month/mon)
- Years (years/year/yrs/yr/y)