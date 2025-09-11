import { Link } from 'react-router';

const Page = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-8'>
          Ribbon Box Designer
        </h1>
        <p className='text-gray-600 mb-8'>
          Create beautiful gift boxes with drag and drop design
        </p>
        <Link
          to='/design-giftbox'
          className='bg-blue-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-200 inline-block'
        >
          Start Designing 🎁
        </Link>
      </div>
    </div>
  );
};

export default Page;
