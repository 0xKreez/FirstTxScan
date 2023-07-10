
import fs from 'fs';
import axios from 'axios';
import Web3 from 'web3';

 // input token CA you want to scan 
const contracts = [
    '0x2890df158d76e584877a1d17a85fea3aeeb85aa6',
    '0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676',
    '0xfb66321D7C674995dFcC2cb67A30bC978dc862AD',
    '0xF2ec4a773ef90c58d98ea734c0eBDB538519b988'
];
// past your ethscan api key
const etherscanApiKey = '';

async function getTransactions(contract) {
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contract}&page=1&offset=20&sort=asc&apikey=${etherscanApiKey}`;

    try {
        const response = await axios.get(url);
        const transactions = response.data.result;
        return transactions.map(tx => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: tx.value,
            timeStamp: tx.timeStamp
        }));
    } catch (error) {
        console.error(`Failed to fetch transactions for contract ${contract}: ${error}`);
    }
}

async function findRecurrentAddresses() {
    const allAddresses = {};

    for (const contract of contracts) {
        const transactions = await getTransactions(contract);
        for (const tx of transactions) {
            allAddresses[tx.from] = (allAddresses[tx.from] || 0) + 1;
            allAddresses[tx.to] = (allAddresses[tx.to] || 0) + 1;
        }
    }

    const recurrentAddresses = Object.entries(allAddresses).filter(([address, count]) => count > 1);

    if (recurrentAddresses.length > 0) {
        console.log('Recurrent addresses:');
        for (const [address, count] of recurrentAddresses) {
            console.log(`Address: ${address}, Count: ${count}`);
        }
    } else {
        console.log('No recurrent addresses found.');
    }


    fs.writeFile('addresses.txt', JSON.stringify(allAddresses, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Addresses saved to addresses.txt');
        }
    });
}

findRecurrentAddresses();
