global.chai = require("chai");
global.sinonChai = require("sinon-chai");
global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();
global.chai.use(sinonChai);

require('./algorithms')