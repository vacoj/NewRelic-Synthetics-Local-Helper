require('geckodriver');
require('chromedriver');

module.exports = function() {
    var DEFAULT_TIMEOUT = 1000;
    this.assert = require('assert'),
        $driver = require('selenium-webdriver');
    this.$browser = new $driver.Builder()
        .forBrowser('chrome')
        .build()

    this.$browser.waitForElement = function(locatorOrElement, timeoutMsOpt) {
        return $browser.wait($driver.until.elementLocated(locatorOrElement), timeoutMsOpt || 1000, 'Timed-out waiting for element to be located using: ' + locatorOrElement);
    };

    this.$browser.waitForAndFindElement = function(locatorOrElement, timeoutMsOpt) {
        return $browser.waitForElement(locatorOrElement, timeoutMsOpt)
            .then(function(element) {
                return $browser.wait($driver.until.elementIsVisible(element), timeoutMsOpt || 1000, 'Timed-out waiting for element to be visible using: ' + locatorOrElement)
                    .then(function() {
                        return element;
                    });
            });
    };

    this.$driver.waitForElement = function(locator, timeout) {
        var timeout = timeout || DEFAULT_TIMEOUT;
        return $browser.wait($driver.until.elementLocated(locator), timeout);
    };

    this.$driver.waitForVisibleElement = function(locator, timeout) {
        var timeout = timeout || DEFAULT_TIMEOUT;
        var element = $browser.wait($driver.until.elementLocated(locator), timeout);
        return $browser.wait(new $driver.until.WebElementCondition('for element to be visible ' + locator, function() {
            return element.isDisplayed().then(v => v ? element : null);
        }), timeout);
    };

    this.writeScreenshot = function(data, name) {
        name = name || 'ss.png';
        var screenshotPath = '/Users/joe/Projects/nr_synth/';
        fs.writeFileSync(screenshotPath + name, data, 'base64');
    };

    this.saveScreenshot = function() {
        $driver.getScreenshotAs().then(function(data) {
            this.writeScreenshot(data, 'out1.png');
        });
        // $driver.takeScreenshot().then(function(data) {
        //     var base64Data = data.replace(/^data:image\/png;base64,/, "")
        //     fs.writeFile("/Users/joe/Projects/nr_synth/out.png", base64Data, 'base64', function(err) {
        //         if (err) console.log(err);
        //     });
        // });
    }

    this.makeid = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 12; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

}