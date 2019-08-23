const argv = require('yargs').argv;
const promise = require('bluebird');

var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;

function loadProcess(arg) {

    return new promise(function (resolve, reject) {
        var process = spawn('node', ['./process.js', arg]);

        process.stdout.on('data', function (data) {
            console.log(data.toString());
        });

        process.stderr.on('data', function (err) {
            reject(err.toString());
        });

        // process.on('exit', function () {
        //     resolve();
        // });
    });
}
if (argv.process) {
    var commands = argv.process.map(function (value) {
        return loadProcess.bind(null, value);
    });

    return promise.map(commands, function (command) {
        return command();
    })
        .then(function () {
            console.log('Child Processes Completed');
        });
}

if (argv.list) {
    execFile('tasklist', function (err, stdout, stderr) {
        console.log("stdout",stdout);
    });
}

