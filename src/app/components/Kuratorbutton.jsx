const Kuratorbutton = ({ children, variant = "solid" }) => {
  const baseStyles = "uppercase px-4 py-2 text-xl transition";

  const variantStyles = {
    solid:
      "bg-[#800000] text-white hover:bg-white hover:text-[#800000] border border-[#800000]",
    transparent:
      "bg-transparent text-[#800000] border border-[#800000] hover:bg-[#800000] hover:text-white",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </button>
  );
};

export default Kuratorbutton;
