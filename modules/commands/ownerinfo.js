const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'ownerinfo',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Rickciel',
  usePrefix: false,
  description: 'Display bot owner information',
  commandCategory: 'system',
  usages: '',
  cooldowns: 20
};

module.exports.run = async ({ api, event }) => {
  try {
    const ownerInfo = {
      name: 'Edsel Paculanang',
      gender: 'Male',
      age: '17',
      height: '5\'2ft',
      facebookLink: 'https://www.facebook.com/edsel.garganerapaculanang.56',
      status: 'Single'
    };

    const videoUrl = 'https://drive.google.com/uc?export=download&id=1Z7a91hIbiVGAkphu-ctkdokC2URH82Yp'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
Owner Information:
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Age: ${ownerInfo.age}
Height: ${ownerInfo.height}
Facebook: ${ownerInfo.facebookLink}
Status: ${ownerInfo.status}
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🥵', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};
