import { FiSearch } from "react-icons/fi";

interface IInput {
  placeholder: string;
  type?: "text" | "password" | "number";
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
}

const Input = ({ placeholder, type, onChange, value }: IInput) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="outline-none rounded-lg border-2 border-primary/50 p-2 text-sm"
    />
  );
};

const TextArea = ({ placeholder, className }: IInput) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`${className} text-sm outline-none rounded-lg border-2 border-primary/50 p-2`}
    ></textarea>
  );
};

const InputSearch = ({ placeholder, value, onChange }: IInput) => {
  return (
    <div className="relative h-[57px] rounded-[20px] border border-black/20 flex items-center overflow-hidden px-4 shadow-md">
      <input
        type="text"
        placeholder={placeholder}
        value={value} // Bind input value to searchQuery
        onChange={onChange} // Handle input changes
        className="w-full h-full outline-none"
      />
      <FiSearch className="w-6 h-6" />
    </div>
  );
};

export { InputSearch, Input, TextArea };
