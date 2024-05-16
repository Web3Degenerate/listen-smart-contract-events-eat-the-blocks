const ethers = require('ethers');
const usdtABI = require('./abis/usdt.json');
//Resume at (2:14): https://youtu.be/7GT_-jvSZIA?si=a2WlCpWqNrTffJbO&t=134
require ("dotenv").config();


async function main(){
  const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  const provider = new ethers.providers.WebSocketProvider(
    `wss://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_WEBSOCKET}`
  );
  
  //instatiate contract using ethers (3:24)
  const contract = new ethers.Contract(usdtAddress, usdtABI, provider );

  //pass in event we want to listen to. Transfer takes several parameters:
  // contract.on('Transfer', from, to, value);
  contract.on('Transfer', (from, to, value, event) =>{
        //to format nicely create object called info
        let info = {
          from: from,
          to: to,
          value: ethers.utils.formatUnits(value, 6), //convert bigNumber. usdt uses 6 decimals, not like others which can be up to 18. 
          data: event,
        };
        //(4:28) - to make this more readable, stringify in the console
        console.log(JSON.stringify(info, null, 4));
  });
}


main();