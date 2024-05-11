import Logo from "../../../../assets/images/Product1.png";

const AboutUs = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <img
              src={Logo}
              alt="Restaurant Image"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg leading-relaxed">
              Welcome to our restaurant! We are committed to providing you with
              the best dining experience possible. Our menu features a wide
              variety of dishes from around the world, catering to all dietary
              preferences and tastes.
            </p>
            <p className="text-lg leading-relaxed mt-6">
              Our team of passionate chefs and experienced staff are dedicated
              to creating delicious and memorable meals for our guests. We
              strive to maintain high standards of quality, freshness, and
              safety in our kitchen.
            </p>
            <p className="text-lg leading-relaxed mt-6">
              We invite you to explore our website and discover our menu, or
              simply come in and enjoy a relaxed and enjoyable dining experience
              at our restaurant.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
