import ProductsCard from "./ProductsCard";

const skills = [
    {
        skillImage: 'something', 
        skillName: 'Devil Ghostie' , 
        value: '0.21 eth', 
        owner: 'Marco', 
    },
    {
        skillImage: 'something', 
        skillName: 'Devil Ghostie' , 
        value: '0.21 eth', 
        owner: 'Marco', 
    },
    {
        skillImage: 'something', 
        skillName: 'Devil Ghostie' , 
        value: '0.21 eth', 
        owner: 'Marco', 
    }
]

const ProductsGrid = () => {
    return (
        <div className="flex space-x-10 my-10 mx-4" >
            {skills.map((skill) => (
                <ProductsCard skillName={skill.skillName} skillImage={skill.skillImage} value={skill.value} owner={skill.owner}/>
            ))}
        </div>
    )
}

export default ProductsGrid;