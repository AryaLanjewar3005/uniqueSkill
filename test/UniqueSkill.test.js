const assert = require('assert');
const ganache = require('ganache');
const {Web3} = require('web3');

const web3 = new Web3(ganache.provider());

const compiledUniqueSkill = require('../ethereum/build/UniqueSkill.json');

let accounts;
let uniqueSkill;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    uniqueSkill = await new web3.eth.Contract(compiledUniqueSkill.abi).deploy({data: compiledUniqueSkill.evm.bytecode.object}).send({from: accounts[0], gas: "1400000"});
})

describe("Checking everything", () => {
    it("deploys", () => {
        assert.ok(uniqueSkill.options.address);
    });
    it("balanceOf functionality", async() => {
        const balance = await uniqueSkill.methods.balanceOf(accounts[0]).call({from: accounts[0]});
        assert.ok(balance);
    } );
    it("mints token", async() => {
        await uniqueSkill.methods.mint("helloworld", "Duel Weilding", "Special Kirito Skill", 100).send({from: accounts[0], gas: "1400000"})
        const skillName = await uniqueSkill.methods.skills(1).call({from: accounts[0]});
        assert.equal("Duel Weilding" ,skillName.skill);
    });
    it("transferToken", async() => {
        await uniqueSkill.methods.mint("Random", "Duel Weilding", "Special Kirito Skill", 100).send({from: accounts[0], gas: '1400000'});
        const skill = await uniqueSkill.methods.skills(1).call({from: accounts[0], gas: '14000000'});
        await uniqueSkill.methods.transfer(accounts[1], 1).send({from: accounts[0], gas: '1400000'});
        const tokenOfOwner = await uniqueSkill.methods.owners(accounts[1]).call({from: accounts[0]});
        assert.equal(Number(skill.tokenId), Number(tokenOfOwner));
        
    });
    it('transfers token from one account to the other', async() => {
        await uniqueSkill.methods.mint("Random", "Duel Weilding", "Special Kirito Skill", 100).send({from: accounts[0], gas: '1400000'});
        await uniqueSkill.methods.transfer(accounts[1], 1).send({from: accounts[0], gas: '1400000'});
        await uniqueSkill.methods.transferFrom(accounts[2], accounts[1], 1).send({from: accounts[1]});
        const tokenOfOwner = await uniqueSkill.methods.owners(accounts[2]).call({from: accounts[0]});
        const skill = await uniqueSkill.methods.skills(1).call({from: accounts[0], gas: '14000000'});
        assert.equal(Number(skill.tokenId), Number(tokenOfOwner));
    });
    it('only creator can mint tokens', async() => {
        try {
            await uniqueSkill.methods.mint("Random", "Duel Weilding", "Special Kirito Skill", 100).send({from: accounts[2], gas: '1400000'});
            assert.ok(false);
        } catch (error) {
            assert.ok(true);
        }
    });
    it('only owner of the token can use the transferFrom method to send token', async() => {
        try {
            await uniqueSkill.methods.mint("Random", "Duel Weilding", "Special Kirito Skill", 100).send({from: accounts[2], gas: '1400000'});
            await uniqueSkill.methods.transfer(accounts[1], 1).send({from: accounts[0]});
            await uniqueSkill.methods.transferFrom(accounts[3],accounts[1] ,1).send({from: accounts[2], gas: '14000000'});
            assert.ok(false);
        } catch (error) {
            assert.ok(true);
        }
    });
})