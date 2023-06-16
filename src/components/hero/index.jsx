import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Hero = () => {
    return (
        <div className="">
             <Carousel showThumbs={false} showStatus={false} showArrows={false} infiniteLoop={true} autoPlay={true} emulateTouch={true}>
                <div>
                    <img src="images/p1.jpg" />
                </div>
                <div>
                    <img src="images/p2.jpg" />
                </div>
                <div>
                    <img src="images/p3.jpg" />
                </div>
            </Carousel>
        </div>
    )
}

export default Hero;