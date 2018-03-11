/* Creating a single server which should serve the HTML
to the browser and also accept socket.io connections. */
const express = require('express');
var app = express();
//const contractABI = require('./contract.js');

const server = require("http").createServer(app);
const io = require("socket.io")(server);
server.listen(8080);
/* So basically, we have integrated both the express and
socket.io servers into one running server on port 8080. */

/* Creating routes to serve out static files and perhaps
the home page (if I am able to make one) */
app.use(express.static("public"));
app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/public/html/index.html");
});

/* Connecting to the contract we have made in Solidity */
const Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

/* If we are using a Chrome Extension like Metamask or Ethereum Browser like MIST,
the provider is automatically injected into the JavaScript context.
If Web3 is not undefined => use it as a provider */

/*if (typeof web3 != 'undefined') {
    web3 = new Web3(Web3.currentProvider);
} else {
    // If it is undefined => simply manually provide it
    // Basically, we need to get it either way
    web3 = new Web3(new Web3.provider.HttpProvider("http://localhost:8545"));
} */

/* We were given 10 accounts (fake) when we installed it.
We are saying that the first one is our default account. */

web3.eth.defaultAccount = web3.eth.accounts[0];

/*Initialize the contract: ABI => Application Binary Interface
This allows us to interact with our smart contract using the variable
defined below. */
var proofContract = web3.eth.contract([
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
	},
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
	}
]);

var proof = proofContract.at("0xf2cfe40e1034b402d4527faebc1724e4f4895108");

app.get('/submit', (req, res)=>{
    console.log("In Submit");
    var fileHash = req.query.hash;
    var owner = req.query.owner;
    proof.set.sendTransaction(owner, fileHash, {from: web3.eth.accounts[0]}, function(error, transcationHash){
        if(!error) {
            res.send(transcationHash);
        } else {
            res.send(error);
        }
    });
});

/* /get-info route calls the get method of the contract on the node itself instead
of creating a transcation; simply sends back whatever response it got.  */
app.get("/getInfo", (req, res) =>{
    console.log("In /getInfo");
    var fileHash = req.query.hash;
    var details = proof.get(fileHash);
    console.log("In /getInfo: sending details");
    res.send(details);
});

/* Adding the event listener to 'watch' for the event from the contract and broadcast
it to all the clients. */
proof.logFileAddedStatus().watch((err, result) =>{
    if(!err){
        if(result.args.status == true) {
            io.send(result);
        }
    } else {
        console.log(err);
    }
});
