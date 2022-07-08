const routerAbi = [
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "recipients",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "routTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


export default routerAbi