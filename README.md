# Smart Contract Downloader

This is a smart contract downloader which uses Etherscan, PolygonScan and BSCScan API to get verified contracts source code.

After finding the desired contract you can download the package as a compressed zip file.

Also feel free to open an issue for any feature request, bugs, etc.

## Adding a new network

Edit [`networks.ts`](https://github.com/amimaro/smart-contract-downloader/blob/main/networks.ts) file to add a new blockchain explorer option.

It is not necessary to fill in all the fields unless you know the API and want to do your own tests.

Otherwise, you can open an issue with the address of the blockchain to be added.

## Current networks available

- Ethereum Mainnet
- Rinkeby Testnet
- Ropsten Testnet
- Kovan Testnet
- Goerli Testnet
- Polygon Mainnet
- Polygon Mumbai Testnet
- Binance Smart Chain Mainnet
- Binance Smart Chain Testnet
- Arbitrum One Mainnet
- Arbitrum Nova Mainnet
- Arbitrum Goerli Testnet
- Fantom Mainnet
- Fantom Testnet

## Development - Getting started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


### Available Scripts

In the project directory, you can run:

### `npm dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## License

MIT [LICENSE.md](LICENSE.md)

## Contributing

Pull Requests are welcome.

1. Fork it
2. Create your feature branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create new Pull Request

