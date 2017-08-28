/**
 * @class Helpers
 */

const fs = require("fs");

class Helpers {

    static establishEnvironment(project) {

        project = JSON.parse(project.toString());

        if (project.hasOwnProperty("environment")) {

            for (const variable in project.environment) {
                if (project.environment.hasOwnProperty(variable)) {
                    process.env[variable] = project.environment[variable]
                }
            }

        }

    }

}

module.exports = Helpers;
