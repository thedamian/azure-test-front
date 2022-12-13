import '../assets/Styles.css';
import { Carousel } from "antd";
import React from 'react';

export default function PicsCarousel() {
    return (

        <Carousel className="pics-carousel" autoplay="true" 
        effect="fade"
        >
            <div className="image-resize1">
                <h3 contentContainerCustomStyle={{ alignItems: 'center' }}><img src={'https://images.pexels.com/photos/2433979/pexels-photo-2433979.jpeg?auto=compress&cs=tinysrgb&w=800'} width="370" height="350" /></h3>
            </div>
            <div className="image-resize2">
                <h3 contentContainerCustomStyle={{ alignItems: 'center' }}><img src={'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800'} width="370" height="350" /></h3>
            </div>
            <div className="image-resize3">
                <h3 contentContainerCustomStyle={{ alignItems: 'center' }}><img src={'https://images.pexels.com/photos/6529789/pexels-photo-6529789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} width="370" height="350" /></h3>
            </div>
            <div className="image-resize4">
                <h3 contentContainerCustomStyle={{ alignItems: 'center' }}><img src={'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=800'} width="370" height="350" /></h3>
            </div>
        </Carousel>
    )
}