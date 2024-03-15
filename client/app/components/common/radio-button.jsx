export default function RadioButton({
  label,
  value,
  id,
  onClick,
  name,
  defaultChecked,
}) {
  return (
    <div className="flex items-center mb-4">
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        className="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        // defaultChecked={defaultChecked}
        onClick={onClick}
      />
      <label
        htmlFor={id}
        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pl-4 pr-8"
      >
        {label}
      </label>
    </div>
  );
}
