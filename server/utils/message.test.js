var expect = require('expect');
var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'test@example.com';
    var text = 'this is a text';
    var message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof(message.createdAt)).toBe('number');
  });
});