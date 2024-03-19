export default function DropdownList({ label, options, handleDropdown }) {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for={label}
        >
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        <select
          name={label}
          id={label}
          className="bg-gray-200  border-2 border-gray-200   rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 md:text-left "
          onChange={handleDropdown}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option}
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4  appearance-none "
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
