import React from 'react'
import Cart from '../utilComponent/cart/'
import { HotArtWorksStyled } from './styled'

function HotArtWorks() {
    return (
        <HotArtWorksStyled>
            <div className="header-artists">
                <div className="title-artists">HOT ARTWORK 🔥</div>
                <div className="more-artists">View more</div>
            </div>
            <div className="content-artwork" > 
            {
              [1,2,3,4,5,6].map( item => (
                <Cart />
              ))
            }
              
            </div>
        </HotArtWorksStyled>
    )
}

export default HotArtWorks


