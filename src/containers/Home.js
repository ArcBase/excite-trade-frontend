import React, {Fragment} from 'react'
import Header from './Header'
import Section from './Section'
import ProductListHome from './Cards'
import Stacks from './Stacks'
import Nav from './nav'

export default function HomepageLayout() {
    return (
        <>
            <Nav />
        <div className="container mx-auto">                
            <Header />
            <ProductListHome />
            <Stacks />
            <Section />
        </div>
        </>
    )
}
