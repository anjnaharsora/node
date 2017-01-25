/**
 * Created by lcom23_two on 1/24/2017.
 */
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

//loop
_.times(10,function (res) {
    res.send("kinjal");
});

//date
_.defer(function(stamp) {
    console.log(_.now() - stamp);
}, _.now());