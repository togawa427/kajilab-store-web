type TextInputProps = {
  placeholder: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export const TextInput = ({ placeholder, setText }: TextInputProps) => {
  return(
    <input
      type='text'
      placeholder={placeholder}
      // value={totalWithdrawal}
      className='py-0 px-2 border border-gray-300 rounded-md text-center'
      onChange={(e) => {
        const v = e.target.value;
        setText(v)
        // setTotalWithDrawal(v === "" ? 0 : Number(v)); // 空欄は "" のまま
      }}
    />
  )
}