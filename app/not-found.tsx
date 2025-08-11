import Link from "next/link";

const NotFound = () => {
  return (
    <main className="xl:px-28 pt-10 px-6 lg:px-16 2xl:flex 2xl:justify-center min-h-screen 2xl:items-center sm:px-10">
      <section>
        <h1
          className={`text-custom-primary font-semibold text-[6.25rem] md:text-[9.375rem] lg:text-[12.5rem]`}
        >
          404
        </h1>
        <h2 className="text-[#292F36] max-w-[35.563rem] text-[1.125rem] md:text-[1.875rem] lg::text-[2.188rem]">
          We are sorry, but the page you requested for was not found!
        </h2>
        <Link href="/">
          <button className="text-[0.875rem] mt-10 lg:text-[1.125rem] cursor-pointer bg-custom-primary text-white shadow-md rounded-[0.5rem] hover:bg-white active:bg-white hover:text-custom-primary active:text-custom-primary transition-colors ease-in-out py-3 px-5">
            Back To Home
          </button>
        </Link>
      </section>
    </main>
  );
};
export default NotFound;
