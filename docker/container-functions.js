var secrets = require('../secrets.js');
var spawn = require('child-process-promise').spawn;
var exec = require('child-process-promise').exec;

var containerFunctions = {};

//Start a container at the specified port
//Returns a promise
containerFunctions.spinUpContainer = function(port) {
  return spawn(secrets.rootDirectory + '/docker/start-hero-brain-container.sh', [port])
    .progress(function(childProcess) {
      console.log('[spawn] childProcess.pid: ', childProcess.pid);
      childProcess.stdout.on('data', function(data) {
          console.log('[spawn] stdout: ', data.toString());
      });
      childProcess.stderr.on('data', function(data) {
          console.log('[spawn] stderr: ', data.toString()); 
      });
    });
};

//Return a promise that resolves after stopping all containers,
//then removing all containers
containerFunctions.shutDownAllContainers = function() {
  return exec('sudo docker stop $(sudo docker ps -q)')
    .progress(function(childProcess) {
      console.log('[spawn] childProcess.pid: ', childProcess.pid);
      childProcess.stdout.on('data', function(data) {
          console.log('[spawn] stdout: ', data.toString());
      });
      childProcess.stderr.on('data', function(data) {
          console.log('[spawn] stderr: ', data.toString()); 
      });
    }).then(function() {
      return exec('sudo docker rm $(sudo docker ps -a -q)')
        .progress(function(childProcess) {
          console.log('[spawn] childProcess.pid: ', childProcess.pid);
          childProcess.stdout.on('data', function(data) {
              console.log('[spawn] stdout: ', data.toString());
          });
          childProcess.stderr.on('data', function(data) {
              console.log('[spawn] stderr: ', data.toString()); 
          });
        });
    });
};

containerFunctions.shutDownAllContainers();

module.exports = containerFunctions;