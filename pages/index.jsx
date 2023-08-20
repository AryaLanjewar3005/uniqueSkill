
import { useEffect, useState } from "react";

import uniqueSkill from '../ethereum/uniqueSkill';
import Layout from "../components/Layout";
import ProductsCard from "../components/ProductsCard";
import ProductsGrid from "../components/ProductsGrid";
const mainPage = () => {
    const [ownerAddress, setOwnerAddress] = useState('');
    useEffect(async () => {
        const contractOwner = await uniqueSkill.options.address;
        setOwnerAddress(contractOwner);
    }, [])
    return (
        <div className=" text-white">
            <Layout children={<div><ProductsGrid/></div>}/>
            
        </div>
    )
}

export default mainPage;