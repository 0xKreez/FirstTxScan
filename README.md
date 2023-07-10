# JavaScript Recurrent Addresses Scanner

This JavaScript project scans Ethereum token transactions for recurrent addresses. It retrieves token transactions from the Ethereum blockchain using the Etherscan API and identifies addresses that appear more than once in the transactions.

## Prerequisites

Before running this project, make sure you have the following:

- Node.js installed on your machine
- Etherscan API key (to retrieve token transactions)

## Installation

1. Clone the project repository:


2. Navigate to the project directory:


3. Install the dependencies:


## Usage

1. Open the `index.js` file in a text editor.

2. Update the following variables in the code:

- `contracts`: An array of Ethereum token contract addresses that you want to scan. Add or remove contract addresses as needed.
- `etherscanApiKey`: Your Etherscan API key. Paste your API key in the `etherscanApiKey` variable.

3. Save the changes to the `index.js` file.

4. Run the project using Node.js:


The project will retrieve token transactions for the specified contracts, analyze the transactions, and output the recurrent addresses to the console. It will also save all addresses and their transaction counts to a `addresses.txt` file.

> Note: If the `addresses.txt` file already exists, it will be overwritten.

## Results

After running the project, you will see the recurrent addresses listed in the console. For each recurrent address, the output will display the address and the count of transactions involving that address.

If no recurrent addresses are found, the console will display a message indicating that no recurrent addresses were found.

The project will also save all addresses and their transaction counts to a `addresses.txt` file in JSON format. The file will be located in the project directory.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request on the project repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for more information.
