const fs = require('fs');
const OpenAI = require('openai');
const models = require('../models');

const run = async () => {
  const openai = new OpenAI({
    apiKey: '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',
    maxRetries: 0, // default is 2
  });
  const html = fs.readFileSync('./input/a.html');
  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: "Dịch cho tôi đoạn html dưới ra tiếng anh\n" + html }],
    stream: true,
  });

  let i = 0;
  for await (const chunk of stream) {
    fs.writeFileSync('./output/out' + i + '.json', JSON.stringify(chunk, null, 4));
    i++;
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }


  // const response = await openai.images.generate({
  //   prompt: 'Cute cat',
  //   model: 'dall-e-3',
  //   quality: 'standard',
  //   response_format: 'url',
  //   size: '1024x1024',
  // });

  // fs.writeFileSync('./out.json', JSON.stringify(response, null, 4));

  // const a = await models.Message.findAll({});
  // console.log(a[0]);
  // await models.sequelize.close();
};

module.exports = run;
