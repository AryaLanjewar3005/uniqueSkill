// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UniqueSkill {
    //variables
    struct SkillData {
        uint tokenId;
        string skill;
        string description;
        address currentOwner;
        uint value;
    }
    address payable creator;
    mapping(uint => address) public ownership;
    mapping(uint => SkillData) public skills;
    mapping(address => uint) public owners;
    uint public currentNumberOfTokens;
    mapping(uint => bytes32) tokens;

    constructor () {
        creator = payable(tx.origin);
        currentNumberOfTokens = 1;
    }


    function balanceOf(address ownerAddress) public view creatorAuth returns (uint){
        uint balance =  ownerAddress.balance;
        return balance;
    }
    function ownerOf(uint tokenId) public view creatorAuth returns (address) {
        address tokenOwner = ownership[tokenId];
        return tokenOwner;
    }
    function mint(string memory input, string memory skill, string memory description, uint value) public creatorAuth  {
        bytes32 hashToken = keccak256(abi.encodePacked(currentNumberOfTokens, input));
        tokens[currentNumberOfTokens] = hashToken;
        ownership[currentNumberOfTokens] = creator;
        SkillData memory newSkill = SkillData({
            tokenId: currentNumberOfTokens,
            skill: skill,
            description: description,
            currentOwner: creator,
            value: value
        });
        skills[currentNumberOfTokens] = newSkill;
        currentNumberOfTokens++;
        

    }
 
    modifier creatorAuth {
        require(msg.sender == creator);
        _;
    }
    function transfer(address toSend,uint tokenId) public creatorAuth {
        ownership[tokenId] = toSend;
        owners[toSend] = tokenId;
        skills[tokenId].currentOwner = toSend; 
    }
    function transferFrom(address sendTo, address sendFrom, uint tokenId) public {
        require(owners[sendFrom] == tokenId);
        owners[sendTo] = tokenId;
        owners[sendFrom] = 0;
        ownership[tokenId] = sendTo;
        skills[tokenId].currentOwner = sendTo; 
    }
    function transactionToCreator(uint tokenId) public payable  {
        require(msg.value >= skills[tokenId].value);
        uint value = msg.value;
        creator.transfer(value);

    }

}