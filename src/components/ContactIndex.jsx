import React from "react";
import SideImg from "./ContactImg";
import Input from "./Input";

const ContactUs = () => {
  return (
    <section
      id="contact-us"
      className="bg-slate-950 relative z-10 min-h-screen flex items-center"
    >
      <div className="w-full flex flex-col lg:flex-row">
        {/* Image Half - takes exactly 50% width */}
        <div className="w-full lg:w-1/2">
          <SideImg />
        </div>

        {/* Form Half - takes exactly 50% width */}
        <div className="w-full lg:w-1/2 py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center">
          <div className="w-full max-w-lg mx-auto">
            <h2 className="text-white text-2xl md:text-3xl font-medium">
              CONTACT US
            </h2>
            <p className="mt-4 text-[#97afd5] text-base md:text-lg">
              We are always open and we welcome any questions you have for our
              team. If you wish to get in touch, please fill out the form below.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  id="name"
                  label="Your name"
                  placeholder="Introduce yourself"
                />
                <Input
                  id="email"
                  label="Your email"
                  placeholder="Who do we reply to"
                  type="email"
                />
              </div>

              <div className="mt-8">
                <label
                  htmlFor="message"
                  className="text-white uppercase text-sm font-medium block mb-2"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  placeholder="Leave your question or comment here"
                  className="w-full border border-[rgba(101,119,151,0.4)] rounded text-[#97afd5] outline-none placeholder:text-[#97afd5] placeholder:opacity-70 px-4 py-3 bg-transparent h-40 resize-none focus:border-teal-500 transition-colors"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-8 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300 w-full sm:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
