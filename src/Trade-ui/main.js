import React from 'react'
import Header from './components/header'
import Services from './components/services'
import Contact from './components/contact'
import Footer from './components/footer'
// import Nav from '../containers/nav'
import Nav from './navbar'
import HalfBox from './components/halfBox'
import Boxes from './components/boxes'
// import SlickSlider from '../home-layout/components/slicker'
import Figures from './components/figures'

export default function MainLayout() {
    return (
        <div>
            <Header />
            <Nav />
            <Boxes />
            <Services />
            <HalfBox />
            {/* <SlickSlider /> */}
            <Figures/>
            <Contact />
            <Footer />
        </div>
    )
}