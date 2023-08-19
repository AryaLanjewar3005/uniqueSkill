const HDWalletProvider = require("@truffle/hdwallet-provider");
const {Web3} = require("web3");
const uniqueSkill = require('./build/UniqueSkill.json');

const provider = new HDWalletProvider("12 word mneomonics", "Infura API Link");
const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(uniqueSkill.abi).deploy({data: uniqueSkill.evm.bytecode.object}).send({gas: "14000000", from: accounts[0] });

    console.log("Contract deployed to ", result.options.address);
    provider.engine.stop();
};
deploy();