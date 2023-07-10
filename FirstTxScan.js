
/*
Importer le module Axios : Au début du fichier, ajoutez la ligne const axios = require('axios'); pour importer le module axios, qui permet de faire des requêtes HTTP.

Définir les adresses des contrats : Créez un tableau contenant les adresses des contrats des tokens que vous voulez analyser. Par exemple : const contractAddresses = ['0x2890df158d76e584877a1d17a85fea3aeeb85aa6', '0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676', '0xfb66321D7C674995dFcC2cb67A30bC978dc862AD'];.

Créer la fonction getTransactions : Cette fonction sera utilisée pour récupérer les 20 premières transactions pour chaque token. Cette fonction utilise axios pour faire une requête GET à l'API d'Etherscan et retourne un tableau d'objets, où chaque objet représente une transaction.

Créer la fonction countAddresses : Cette fonction prend en entrée le tableau de toutes les transactions et renvoie un objet où les clés sont les adresses et les valeurs sont le nombre de fois qu'elles sont apparues dans les transactions.

Créer la fonction writeToFile : Cette fonction prend en entrée l'objet de comptage des adresses et écrit ces informations dans un nouveau fichier JSON. Cette fonction utilise la méthode JSON.stringify pour convertir l'objet JavaScript en une chaîne de caractères au format JSON.

Créer la fonction principale : Cette fonction utilise les fonctions précédemment définies pour récupérer les transactions, compter les adresses et écrire le résultat dans un fichier. Cette fonction utilise la méthode .map pour récupérer les transactions pour chaque adresse de contrat, puis la méthode Promise.all pour attendre que toutes les requêtes soient terminées. Ensuite, elle appelle la fonction countAddresses et writeToFile.

Exécuter la fonction principale : À la fin du fichier, appelez la fonction principale pour exécuter le script.*/





import fs from 'fs';
import axios from 'axios';
import Web3 from 'web3';

const contracts = [
    '0x2890df158d76e584877a1d17a85fea3aeeb85aa6',
    '0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676',
    '0xfb66321D7C674995dFcC2cb67A30bC978dc862AD',
    '0xF2ec4a773ef90c58d98ea734c0eBDB538519b988'
];

const etherscanApiKey = 'VBV9BRED49RMEYGK9NPUTJGZYFYVPTB11J';

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
