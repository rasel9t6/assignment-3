import searchImg from '../../assets/searching-data.svg';
const EmptyTask = () => {
  return (
    <div className=' flex flex-col justify-center items-center'>
      <img
        src={searchImg}
        alt='search-image'
        className='w-[50%] h-[50%]'
      />
      <p className='text-center text-3xl'>
        No Tasks were Found. Please Add One...
      </p>
    </div>
  );
};
export default EmptyTask;
