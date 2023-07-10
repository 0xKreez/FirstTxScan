
import { ethers } from 'ethers';
import fs from 'fs';
import { abi } from './abi.js';

const contracts = [
    '0x2890df158d76e584877a1d17a85fea3aeeb85aa6',
    '0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676',
    '0xfb66321D7C674995dFcC2cb67A30bC978dc862AD',
    '0xF2ec4a773ef90c58d98ea734c0eBDB538519b988'
];

const etherscanApiKey = 'VBV9BRED49RMEYGK9NPUTJGZYFYVPTB11J';

async function getTransactions(contract) {
    const provider = new ethers.providers.InfuraWebSocketProvider('mainnet', '24d2e31f288a4d8a9a5560dbfe8bd11c');

    const contractInstance = new ethers.Contract(contract, JSON.parse(abi), provider);


    const filter = contractInstance.filters.Transfer(null, null, null);
    const transactions = await contractInstance.queryFilter(filter, 0, 20);

    return transactions.map(tx => ({
        hash: tx.transactionHash,
        from: tx.args.from,
        to: tx.args.to,
        value: tx.args.value.toString(),
        timeStamp: tx.blockNumber
    }));
}

async function findPurchaseTransactions() {
    const purchaseTransactions = [];

    for (const contract of contracts) {
        const transactions = await getTransactions(contract);
        purchaseTransactions.push(...transactions);
    }

    if (purchaseTransactions.length > 0) {
        console.log('Purchase transactions:');
        for (const tx of purchaseTransactions) {
            console.log(`Hash: ${tx.hash}, From: ${tx.from}, To: ${tx.to}, Value: ${tx.value}, TimeStamp: ${tx.timeStamp}`);
        }
    } else {
        console.log('No purchase transactions found.');
    }

    fs.writeFile('purchase_transactions.txt', JSON.stringify(purchaseTransactions, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Purchase transactions saved to purchase_transactions.txt');
        }
    });
}

findPurchaseTransactions();
