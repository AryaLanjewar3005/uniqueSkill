import web3 from "./web3";
import uniqueSkill from './build/UniqueSkill.json';

const instance = new web3.eth.Contract(uniqueSkill.abi, '0x95E12cD21492E29658a0b4Ae5ba0e569B5480f6C');
export default instance;

