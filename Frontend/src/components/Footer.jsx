/** @format */

import FooterCol from "./FooterCol";

const Footer = () => {
    return (
        <div className="pt-40 bg-base/dark-bg-2-14 dark:bg-light-bg-1">
            <div className="max-w-screen-lg mx-auto flex gap-12">
                <div className="flex-[2] text-gray-400 dark:text-slate-600">
                    <h1 className="text-5xl mb-4 font-semibold">Restaurant</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam
                        voluptate. Quisquam, quibusdam voluptate. Quisquam, quibusdam voluptate.
                    </p>
                </div>
                <div className="flex-1">
                    <FooterCol
                        heading="Important Links"
                        links={[
                            {
                                type: "link",
                                text: "Home",
                                path: "/home",
                            },
                            {
                                type: "link",
                                text: "About",
                                path: "/about",
                            },
                            {
                                type: "link",
                                text: "Projects",
                                path: "/projects",
                            },
                            {
                                type: "link",
                                text: "Contact",
                                path: "/contact",
                            },
                        ]}
                    />
                </div>
                <div className="flex-1">
                    <FooterCol
                        heading="Contact Info"
                        links={[
                            {
                                text: "+84 65 898 302",
                                path: "tel:+84 65 898 302",
                            },
                            {
                                text: "maidoan709@gmail.com",
                                path: "mailto: maidoan709@gmail.com",
                            },
                            {
                                text: "Hai Van, Hai Hau, Nam Dinh",
                                path: "",
                            },
                        ]}
                    />
                </div>
                <div className="flex-1">
                    <FooterCol
                        heading="Social Links"
                        links={[
                            {
                                text: "Facebook",
                                path: "https://www.facebook.com/",
                            },
                            {
                                text: "Instagram",
                                path: "https://www.instagram.com/",
                            },
                            {
                                text: "Github",
                                path: "https://github.com/doank15",
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="bg-base/dark-line dark:bg-light-bg-2 text-center py-4 mt-20">
                <p className="text-gray-400 font-semibold">2024 &copy; Doan K15. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
