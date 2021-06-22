import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@luckyswap/uikit'

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  margin-bottom: 39px;

  .custom-bt {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    a {
      padding: 25px;

      svg {
        width: 40px;
        height: 40px;
      }
    }
  }

  select{
    padding: 12px 56px 12px 14px;
    margin: 0 7px;
    background-color: #4a4873;
    font-size: 21px;
    color: #dcbd6b;
    border-radius: .5rem;
    cursor: pointer;
    border: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('../images/rocket.png');
    background-repeat: no-repeat;
    background-size: 1.5rem;
    background-position: right 1.2rem top 50%;
    width: 100%;
    max-width: 215px;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 100%;
      margin-bottom: 15px;
    }

    &.list-options {
      background-image: url('../images/plannet.svg');
    }
  }

  select:hover, 
  select:focus{
    background-size: 2rem;
    outline: none;
  }


  form{
    box-sizing: border-box;
    display: flex;
    margin-left: 10px;
    position: relative;

    @media (max-width: 768px) {
      margin-left: 0;
      width: 100%;
    }

    input{
      text-indent: 10px;
      height: 40px;
      width: 175px;
      border: 1px transparent solid;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      outline: none;

      @media (max-width: 768px) {
        width: 100%;
      }
    }

    img {
      width: 20px;
      height: 20px;
    }

    button {
      background-color:#f5c606;
      height: 40px;
      width: 40px;
      border:1px transparent solid;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      @media (max-width: 768px) {
        width: 50px;
        position: absolute;
        top: 0;
        right: 0;
      }

      &:hover {
        background-color: #fbcf1a;
        height:40px;
        width:40px;
        border:1px transparent solid;
      }
    }
  }
`

const Dflex = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`

const IfoTabButtons = () => {
  const { url, isExact } = useRouteMatch()

  return (
    <Wrapper>
      <div className="custom-bt">
        <Dflex>
          <select>
            <option>All</option>
            <option>BEP-20</option>
            <option>NFT</option>
          </select>

          <select className="list-options">
            <option>All</option>
            <option>Open</option>
            <option>Close</option>
            <option>Coming Soon</option>
          </select>

          <form>
            <input type="search" placeholder="search"/>
            <button type="submit" aria-label="Save" value="search">
              <img src="../images/icon-search.svg" alt=""></img>
            </button>
          </form>
        </Dflex>

        {/* <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="subtle">
          <ButtonMenuItem as={Link} to={`${url}`}>
            Launchpad BEP-20
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            Launchpad NFT
          </ButtonMenuItem>
        </ButtonMenu> */}
      </div>
    </Wrapper>
  )
}

export default IfoTabButtons
