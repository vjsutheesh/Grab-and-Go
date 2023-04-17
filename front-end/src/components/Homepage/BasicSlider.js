import React from "react";
import HeroSlider,{Slide} from 'hero-slider';
import slide1 from './img/slide11.jpg';
import slide2 from './img/slide2.jpg';
import slide3 from './img/slide33.jpg';
const BasicSlider = () => {
    return ( 
            <HeroSlider
            slidingAnimation="left_to_right"
            orientation="horizontal"
            initialSlide={1}
            onBeForeChange={(previousSlide,nextSlide)=>console.log("onBeForeChange",previousSlide,nextSlide)}
            onChaange={nextSlide => console.log("onChange",nextSlide)}
            onAfterChange={nextSlide=>console.log("onAfterChange",nextSlide)}
            style={{
                backgroundColor:"rgba(0,0,0,0.33)"
            }}
            settings={{
                slidingDuration:250,
                slidingDelay:100,
                shouldAutoPlay:true,
                shouldDisplayButton:true,
                autoPlayDuration:5000,
                height:"100vh"
            }}
            > 
                <Slide 
                background={{
                    backgroundImageSrc:slide1,
                    backgroundAttachment:"Fixed"
                }}
                />
                <Slide 
                background={{
                    backgroundImageSrc:slide2,
                    backgroundAttachment:"Fixed"
                }}
                />
                <Slide 
                background={{
                    backgroundImageSrc:slide3,
                    backgroundAttachment:"Fixed"
                }}
                />
            </HeroSlider>
     );
}
 
export default BasicSlider;