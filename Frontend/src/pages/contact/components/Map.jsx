/** @format */
import MapImage from "../../../assets/images/map.png";

const Map = () => {
    return (
        <div className="relative mt-28 min-h-[450px]">
            <img
                src={MapImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />
            <div className="p-8 relative min-h-[400px] text-gray-400 dark:text-slate-600">
                <div className="absolute right-[10%] bottom-[10%] p-8 bg-base/dark-bg-2-14 dark:bg-light-bg-1 w-full max-w-xs rounded-xl">
                    <h3 className="text-3xl font-semibold mb-4">
                        Chúng tôi ở đây
                    </h3>
                    <p className="inline-block text-xl">
                        Hai Van Commnuce, Hai Hau District, Nam Dinh Province
                    </p>
                    <a
                        className="inline-block underline mt-4 hover:text-primary-color transition-colors duration-200"
                        href="https://www.google.com/maps/place/91+%C4%90.+C%E1%BA%A7u+Di%E1%BB%85n,+Ph%C3%BAc+Di%E1%BB%85n,+B%E1%BA%AFc+T%E1%BB%AB+Li%C3%AAm,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0450679,105.7490562,17z/data=!3m1!4b1!4m6!3m5!1s0x313454ec1a00c13d:0x9911c6037af95f58!8m2!3d21.0450679!4d105.7516311!16s%2Fg%2F11fz95w480?entry=ttu"
                        target="_blank"
                        rel="noreferrer">
                        Open in Google Map
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Map;
