
JavaScript Recurrent Addresses Scanner
This JavaScript project scans Ethereum token transactions for recurrent addresses. It retrieves token transactions from the Ethereum blockchain using the Etherscan API and identifies addresses that appear more than once in the transactions.

Prerequisites
Before running this project, make sure you have the following:

Node.js installed on your machine
Etherscan API key (to retrieve token transactions)
Installation
Clone the project repository:

bash
Copy code
git clone <repository_url>
Navigate to the project directory:

bash
Copy code
cd recurrent-addresses-scanner
Install the dependencies:

Copy code
npm install
Usage
Open the index.js file in a text editor.

Update the following variables in the code:

contracts: An array of Ethereum token contract addresses that you want to scan. Add or remove contract addresses as needed.
etherscanApiKey: Your Etherscan API key. Paste your API key in the etherscanApiKey variable.
Save the changes to the index.js file.

Run the project using Node.js:

Copy code
node index.js
The project will retrieve token transactions for the specified contracts, analyze the transactions, and output the recurrent addresses to the console. It will also save all addresses and their transaction counts to a addresses.txt file.

Note: If the addresses.txt file already exists, it will be overwritten.

Results
After running the project, you will see the recurrent addresses listed in the console. For each recurrent address, the output will display the address and the count of transactions involving that address.

If no recurrent addresses are found, the console will display a message indicating that no recurrent addresses were found.

The project will also save all addresses and their transaction counts to a addresses.txt file in JSON format. The file will be located in the project directory.
