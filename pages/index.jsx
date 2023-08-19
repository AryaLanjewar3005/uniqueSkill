import { useEffect, useState } from "react";
import uniqueSkill from '../ethereum/uniqueSkill';
import Layout from "../components/Layout";
const mainPage = () => {
    const [ownerAddress, setOwnerAddress] = useState('');
    useEffect(async () => {
        const contractOwner = await uniqueSkill.options.address;
        setOwnerAddress(contractOwner);
    }, [])
    return (
        <div>
            <Layout children={<div>{ownerAddress}</div>}/>
        </div>
    )
}

export default mainPage;