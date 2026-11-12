const Brand = ({ name }) => (
  <div className="flex h-20 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-center text-base font-extrabold tracking-wide text-gray-700 transition hover:border-red-500 hover:text-red-600 hover:shadow-md">
    {name}
  </div>
);

export default Brand;
