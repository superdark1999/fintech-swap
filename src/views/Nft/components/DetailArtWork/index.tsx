import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BidArtWork from './BidArtWork';
import SellArtWork from './SellArtWork';

const DetailArtWord = ()=>{
    const {id,type} = useParams()
    if(type=='auction'){
        return <BidArtWork id={id} />
    }else{
        return <SellArtWork id={id}/>
    }
}

export default DetailArtWord