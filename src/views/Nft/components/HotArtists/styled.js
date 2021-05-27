import styled from 'styled-components'

export const HotArtistsStyled = styled.div`
    .header-artists{
        height:48px;
        width:100%;
        display:flex;    
        align-items: center;
        .title-artists{
            font-weight: bold;
            flex:1;
            font-size: 32px;
        }    
        .more-artists{
            font-weight: 700;
            font-size: 20px;
            width: 108px;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .content-artists{
        margin: auto;
        width: 1000px;
        max-width: 1280px;
        overflow-x: auto;
        .card-artists{
            margin-top:24px;
            width:300px;
            height:420px;
            border: 1px solid #E7EBEF;
            box-sizing: border-box;
            border-radius: 24px;
        }
    }
`