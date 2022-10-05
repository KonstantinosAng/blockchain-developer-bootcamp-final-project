const errorString = 'VM Exception while processing transaction: ';

const tryCatch = async (promise: any, reason: string = 'revert') => {
  try {
		return await promise;
  } catch (error: any) {
    assert(error, 'Expected a VM exception but did not get one');
    assert(error.message.search(errorString + reason) >= 0, `Expected an error containing '${errorString}${reason}' but got '${error.message}' instead`);
  }
};

export {
  tryCatch
};
