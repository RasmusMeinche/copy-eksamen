const Button = ({ title }) => {
  return (
    <div>
      <button
        type="submit"
        className="relative border-2 border-white text-white px-4 py-5 w-40 h-14 hover:bg-white hover:text-[#800000] cursor-pointer"
      >
        <span className="absolute bottom-2 left-2 text-left">{title}</span>
      </button>
    </div>
  );
};

export default Button;
