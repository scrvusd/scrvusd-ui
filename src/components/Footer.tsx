const LINKS = [
    {
        label: "Curve UI",
        link: "https://crvusd.curve.fi/#/ethereum/scrvUSD",
        img: "https://crvusd.curve.fi/_next/static/media/scrvUSD-sm.6ea621f0.webp"
    },
    {
        label: "Curve Resources",
        link: "https://docs.curve.fi/"
    },
    {
        label: "Developer Docs",
        link: "https://resources.curve.fi"
    },
    {
        label: "scrvUSD Github",
        link: "https://github.com/scrvusd/scrvusd-ui"
    },
]

export const Footer = () => {
    return <footer className="text-center py-4">
        <div className="flex flex-row justify-center items-center w-full space-x-5 mb-5">
            {
                LINKS.map((link, index) => {
                    return <a key={`link-footer-${index}`} href={link.link} target="_blank" className="flex flex-row justify-start items-center space-x-2 text-sm text-white hover:underline">
                        {
                            link.img && <img src={link.img} className="w-5 h-5" />
                        }

                        <p>{link.label}</p>
                    </a>
                })
            }
        </div>
    </footer>
}
