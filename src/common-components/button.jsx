export const Button = ({ className, ...rest }) => {
  return (
    <button
      className={`text-neutral-0 text-preset-5 bg-blue-500 px-6 py-4 rounded-lg hover:bg-blue-700 transition cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-blue-500 ${
        className || ""
      }`}
      {...rest}
    />
  );
};
