import { dotsToRoot } from './utils';

describe('add-global generator', () => {
  it('shoudl create dots up instead of folders', () => {
    const relative = dotsToRoot(
      '/tmp/test',
      '/tmp/test/libs/my-lib/src/second-app.ts'
    );
    expect(relative).toBe('../../../types/*.d.ts');
  });
  it('shoudl create dots up two leveles', () => {
    const relative = dotsToRoot(
      '/tmp/test',
      '/tmp/test/libs/my-lib/second-app.ts'
    );
    expect(relative).toBe('../../types/*.d.ts');
  });
});
