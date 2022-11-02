import Four from "./4.png";


function PageNotFound() {


    return (
        <div>
            <h1>404</h1>
            <h2 className=" d-flex align-items-center justify-content-center m-5">Page Not Found</h2>
            <div  className=" d-flex align-items-center justify-content-center m-5">
            <img src={Four}></img>
            </div>
        </div>

    );
}
export default PageNotFound;

