const Footer = () => {
    function getCurrentYear() {
        return new Date().getFullYear();
    };
    return (
        <footer className="relative text-foreground bg-background  w-full pb-12 bottom-0">
            <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-sm">© {getCurrentYear()} rights reserved </p>
            </div>
        </footer>
    )
}

export default Footer;

