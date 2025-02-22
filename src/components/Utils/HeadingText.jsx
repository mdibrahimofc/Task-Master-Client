
const HeadingText = ({title, subTitle}) => {
    return (
        <div className='my-6'>
            <p className='text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold text-center mb-1'>{title}</p>
            {/* <p className='md:text-xl lg:text-2xl text-xs font-medium md:font-semibold text-center w-3/5 mx-auto text-gray-600'>{subTitle}</p> */}
        </div>
    );
};

export default HeadingText;