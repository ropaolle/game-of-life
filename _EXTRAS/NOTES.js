/**
 * Timer functions
 */
 console.time('genArray');
 console.timeEnd('genArray');

 var start = window.performance.now();
 var end = window.performance.now();
 var time = end - start;
 console.log(time);

 /**
  * React stuff
  */
componentWillReceiveProps(nextProps) { console.log('componentWillReceiveProps'); }
shouldComponentUpdate(nextProps, nextState) { console.log('shouldComponentUpdate'); return true; }
componentWillUpdate(nextProps, nextState) { console.log('componentWillUpdate'); }
componentDidUpdate(prevProps, prevState) { console.log('componentDidUpdate'); }

// Count changed items in an array
const changed = genDiff.reduce(function(sum, value) {
  return (value < 2) ? sum + 1 : sum;
}, 0);


const spinner = '0000000000000000000000000000000000000000000010000000001000000000100000000000000000000000000000000000';
grid = spinner.split('').map((val) => {
  return (val === '0') ? 0 : 1;
});
