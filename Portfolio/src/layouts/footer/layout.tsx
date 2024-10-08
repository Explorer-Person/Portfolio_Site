import style from "./style.module.css"


const Footer = () => {
    return (
        <footer className={`text-center bg-dark-tertiary text-light ${style.footer}`}>
            <div className="container text-light pt-4">
                <section className="mb-4">

                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.instagram.com/et.fat"
                        role="button"
                    ><i className="fab fa-instagram text-light"></i
                    ></a>

                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.linkedin.com/in/fatih-etlik-353051267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        role="button"
                    ><i className="fab fa-linkedin text-light"></i
                    ></a>
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://github.com/Explorer-Person"
                        role="button"
                    ><i className="fab fa-github text-light"></i
                    ></a>
                </section>

            </div>

            <div className="text-center text-light p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>

                <a className="text-light" href="https://mdbootstrap.com/">Portfolio</a>
            </div>
        </footer>
    )
}

export default Footer