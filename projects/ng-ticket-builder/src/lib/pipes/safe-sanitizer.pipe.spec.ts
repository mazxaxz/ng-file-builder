import { SafeSanitizerPipe } from './safe-sanitizer.pipe';

describe('SafeSanitizerPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeSanitizerPipe();
    expect(pipe).toBeTruthy();
  });
});
