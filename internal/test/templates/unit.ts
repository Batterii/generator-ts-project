import * as sinon from 'sinon';
import { expect } from 'chai';

describe('Example', () => {
	it('should fail', () => {
		const stub = sinon.stub();

		expect(stub).to.be.calledOnce;
	});
});
