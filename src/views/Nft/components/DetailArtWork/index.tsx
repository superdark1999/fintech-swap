import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BidArtWork from './BidArtWork';
import SellArtWork from './SellArtWork';
import SwapArtWork from './SwapArtWork'


const DetailArtWord = ()=>{
    const {id,type} = useParams()
    if(type=='auction'){
        return <BidArtWork id={id} />
    }else if(type=='swap-store'){
        return <SwapArtWork id={id} />
    }else{
        return <SellArtWork id={id} />
    }
}

export default DetailArtWord