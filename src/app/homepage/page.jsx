import FirstCarousel from '../../components/first-carousel'
import StepToCreateAGiftBox from '../../components/StepToCreateAGiftBox'
import FeedBack from '../../components/Feedback'
import Approve from '../../components/Approve'

function page() {
  return (
    <div>
      <FirstCarousel/>
      <StepToCreateAGiftBox/>
      <FeedBack/>
      <Approve/>
    </div>
  )
}

export default page
