

const { generateMessage } = require('./message');
describe('generateMessage', () => {
    it('Generate Correct Result From Message', () => {
        const from = 'Sayed',
              text = 'Hey, From Sayed';
        const message = generateMessage(from, text);
        if( typeof message.createdAt !== 'number')
            throw new Error('Created At Must Be A Number');
        if(from !== message.from || text !== message.text)
            throw new Error('From Or Text is no equal');
        
    })
})