# NewRelic-Synthetics-Local-Helper
A NodeJS helper for developing NewRelic Synthetics tests locally.


Add the following to the top of your NewRelic Synthetics script to run them locally.  This assumes the localtesting.js file was placed in the same directory as the scripts your trying to run.

```
require("./localtesting")();
```

