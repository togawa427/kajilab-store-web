type AdminPageTitleProps = {
  title: string;
  subtitle: string;
};

export const AdminPageTitle = ({ title, subtitle }: AdminPageTitleProps) => {
  return(
    <>
      <div className='text-2xl md:text-5xl my-2 md:my-5 font-black md:font-extrabold text-center'>{title}</div>
      <div className='text-1xl md:text-2xl px-10 md:px-20 mb-7 md:mb-10 font-bold text-center text-white mx-auto bg-kirby-purple w-fit rounded-full'>
        {subtitle}
      </div>
    </>
  )
}