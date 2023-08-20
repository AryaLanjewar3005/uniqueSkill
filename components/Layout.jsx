import Footer from "./Footer";
import Navbar from "./Navbar2";

const Layout = ({children}) => {
    return (
        <div>
            <Navbar/>
            <div>{children}</div>
            <Footer/>
        </div>
    )
}

export default Layout;