const Footer = () => {
    function getCurrentYear() {
        return new Date().getFullYear();
    };
    return (
        <footer className="container mx-auto max-w-7xl pb-12 px-12">
            <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-sm dark:text-white">© {getCurrentYear()} rights reserved </p>
            </div>
        </footer>
    )
}

export default Footer;

