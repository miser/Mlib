/*
var coin = require('../js/algorithms/coin.js');

describe('account', function() {

	describe('#register: no user data', function() {
		it('user data wasn‘t passed', function(done) {
			var t = coin.test();
			t.should.equal(2)
			//msg.message.should.equal('用户名不得为空，并且不得少于2位或长于12位');
		})
	});
});
*/
/*
1,1,1,1,1,1,1,1,1,1
1,1,1,1,1,1,1,1,2
1,1,1,1,1,1,2,2
1,1,1,1,2,2,2
1,1,2,2,2,2
2,2,2,2,2
1,1,1,1,1,5
1,1,1,5,2
1,2,5
5,5
*/

//总值是多少
//当前已经有多少
//余下的值能否被整除

var count = 0;

function sum(coins, sumValue, n) {
	var coin, n = n || 1;
	if ((canCoins.length == 0 && sumValue == 0) || canCoins.length == 0) {
		return;
	} else if (sumValue == 0) {
		count++;
		if (canCoins.length > 0) {
			coins = coins.slice(1);
			
		}
	} else if (sumValue > 0) {
		coin = coins[0];
		sumValue = sumValue - coin * n;
	}

	sum(coin, sumValue - coin * n);
}([1, 2, 5], 10)

console.log(count)