const Footer = () => {
    function getCurrentYear() {
        return new Date().getFullYear();
    };
    return (
        <footer className="fixed container mx-auto max-w-7xl pb-12 px-12 bottom-0">
            <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-sm dark:text-white">© {getCurrentYear()} rights reserved </p>
            </div>
        </footer>
    )
}

export default Footer;

