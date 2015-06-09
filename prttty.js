// beauty over everything.
var R = require('ramda');
var c = require('chalk');

function base(x){
	if(R.is(Array, x))
		return array(x);

	if(R.is(Object, x))
		return object(x);

	if(R.is(Number, x))
		return number(x);

	if(R.is(String, x))
		return string(x);

	if(R.is(Boolean, x))
		return boolean(x);	
}

function number(x){
	return c.blue(x);
}

function boolean(x){
	return c[x ? 'green' : 'red'](x);
}

function between(F, braces){
	return function(x){
		return F(braces[0]) + x + F(braces[1]);		
	}
}

var string = R.compose(
	between(c.white, "\"\""),
	c.white
);

var array = R.compose(
		between(c.white, "[]"),
		R.join(', '),
		R.valuesIn(),
		R.map(base)
	);

function entry(val, key){
	return c.cyan(key) + ': ' + base(val);
}

var object = R.compose(
		between(c.gray, "{}"),
		R.join(', '),
		R.valuesIn(),
		R.mapObjIndexed(entry)
	);

exports.render = base;