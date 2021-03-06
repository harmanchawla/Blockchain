module.exports =  {[
    	{
    		"constant": false,
    		"inputs": [
    			{
    				"name": "owner",
    				"type": "string"
    			},
    			{
    				"name": "fileHash",
    				"type": "string"
    			}
    		],
    		"name": "set",
    		"outputs": [],
    		"payable": false,
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"anonymous": false,
    		"inputs": [
    			{
    				"indexed": false,
    				"name": "status",
    				"type": "bool"
    			},
    			{
    				"indexed": false,
    				"name": "timestamp",
    				"type": "uint256"
    			},
    			{
    				"indexed": false,
    				"name": "owner",
    				"type": "string"
    			},
    			{
    				"indexed": false,
    				"name": "fileHash",
    				"type": "string"
    			}
    		],
    		"name": "logFileAddedStatus",
    		"type": "event"
    	},
    	{
    		"constant": false,
    		"inputs": [
    			{
    				"name": "fileHash",
    				"type": "string"
    			}
    		],
    		"name": "get",
    		"outputs": [
    			{
    				"name": "timestamp",
    				"type": "uint256"
    			},
    			{
    				"name": "owner",
    				"type": "string"
    			}
    		],
    		"payable": false,
    		"stateMutability": "nonpayable",
    		"type": "function"
    	}]
};
