export const Header = () => {
  return (
    <div className="flex h-[10%] w-full justify-end py-6 px-8 bg-gradient-to-tr from-orange-400 to-orange-100">
      <div className="flex justify-center items-center w-full absolute">
        <p className="text-3xl">Finding Falcone !</p>
      </div>

      <div className="flex gap-x-3">
        <p>Reset</p>
        <p>|</p>
        <p>GeekTrust Home</p>
      </div>
    </div>
  );
};
