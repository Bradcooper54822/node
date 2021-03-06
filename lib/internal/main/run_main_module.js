'use strict';

const {
  initializeClusterIPC,
  initializePolicy,
  initializeESMLoader,
  loadPreloadModules
} = require('internal/bootstrap/pre_execution');

initializeClusterIPC();
initializePolicy();
initializeESMLoader();
loadPreloadModules();

// Expand process.argv[1] into a full path.
const path = require('path');
process.argv[1] = path.resolve(process.argv[1]);

const CJSModule = require('internal/modules/cjs/loader');

markBootstrapComplete();

// Note: this actually tries to run the module as a ESM first if
// --experimental-modules is on.
// TODO(joyeecheung): can we move that logic to here? Note that this
// is an undocumented method available via `require('module').runMain`
CJSModule.runMain();
