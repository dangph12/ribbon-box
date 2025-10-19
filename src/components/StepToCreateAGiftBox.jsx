import { Link } from 'react-router';
import demo1 from '../assets/demo1.svg';
import demo2 from '../assets/demo2.svg';
import demo3 from '../assets/demo3.svg';

const steps = [
  {
    number: '1',
    title: 'Chọn quà tặng bên trong quà',
    image: demo1
  },
  {
    number: '2',
    title: 'Chọn hộp quà & thiệp',
    image: demo2
  },
  {
    number: '3',
    title: 'Chill & chờ Ribbon Box giao đến cho bạn',
    image: demo3
  }
];

export default function StepToCreateAGiftBox() {
  return (
    <section className='bg-[#FFFDF1] py-16 px-6'>
      <div className='max-w-7xl mx-auto text-center'>
        <h2 className='text-3xl sm:text-4xl font-bold text-[#AD3542] mb-16'>
          Hướng Dẫn Tạo Hộp Quà Của Riêng Bạn
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-16'>
          {steps.map((step, idx) => (
            <div key={idx} className='flex flex-col items-center text-center'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 border-2 border-[#AD3542] rounded-full flex items-center justify-center font-semibold text-[#AD3542] text-lg'>
                  {step.number}
                </div>
                <p className='text-base font-medium text-[#AD3542]'>
                  {step.title}
                </p>
              </div>
              <img
                src={step.image}
                alt={`Bước ${step.number}`}
                className='w-full max-w-md object-contain'
              />
            </div>
          ))}
        </div>

        <button className='mt-16 px-10 py-4 rounded-full bg-[#AD3542] hover:bg-[#C25C61] transition font-semibold text-lg text-[#FFFDF1]'>
          <Link to={'/design-giftbox'}>
            Bắt Đầu Tùy Chỉnh Hộp Quà Của Bạn Với Ribbon Box Nhé
          </Link>
        </button>
      </div>
    </section>
  );
}
