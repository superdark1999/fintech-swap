import React from 'react'
import styled from 'styled-components'
import NotFound from 'assets/images/404.svg'
export default function Page404() {
    return (
        <Styled404>
            <img src={NotFound} alt="page-404" />
        </Styled404>
    )
}
const Styled404 = styled.div`
    width: 100%;
    height:calc(100vh - 80px);
    margin:auto;
    img {
        width:100%;
        height:100%;
    }
`
