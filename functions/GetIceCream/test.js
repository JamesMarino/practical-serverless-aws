/**
 * @class Test
 */

if (process.env.DEVELOPMENT) {

    const fs = require("fs");

    require("./../../common/helpers").establishEnvironment(
        fs.readFileSync(__dirname + "/./../../project.json")
    );

    require("./index").handler(
        require("./event.json"),
        require("./../../common/handler")
    );
}
