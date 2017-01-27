/**
 * Created by lcom23_two on 1/24/2017.
 */
var _ = require('lodash');
// Load the core build.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

//loop
_(5).times(function() { console.log('kinjal'); } );

date
_.defer(function(stamp) {
    console.log(_.now() - stamp);
    console.log(_.now());
    console.log(stamp);
}, _.now());

var array =[1,2,3,1,2,3,4,5,6,7,8,9,1];
console.log(_.chunk(array, 2));
console.log(_.drop(_.chunk(array, 2),1));
console.log(_.dropRight(_.chunk(array, 2),1));

var users = [
    { 'user': 'barney',  'active': true },
    { 'user': 'fred',    'active': false },
    { 'user': 'pebbles', 'active': false }
];

var a = _.dropRightWhile(users, ['active', true]);
console.log(_.dropRightWhile(users, ['active', false]));
console.log(_.findIndex(users, 'active'));
console.log(_.findIndex(users, ['active',false]));
console.log(_.findLastIndex(users, ['active', false]));

console.log(_.indexOf([1, 2, 1, 2], 2));
console.log(_.indexOf([1, 2, 1, 2], 2, 2));
console.log(_.join(array, '_'));
console.log(_.lastIndexOf(array, 2));

