import searchImg from '../../assets/searching-data.svg';
const EmptyTask = () => {
  return (
    <div className='section-style flex flex-col justify-center items-center'>
      <img
        src={searchImg}
        alt='search-image'
        className='w-[30%]'
      />
      <p className='text-center text-2xl'>
        No Tasks were Found. Please Add One...
      </p>
    </div>
  );
};
export default EmptyTask;
