import styled from 'styled-components'

interface IfoCardWrapperProps {
  isSingle?: boolean
}

const IfoCardWrapper = styled.div<IfoCardWrapperProps>`
  align-items: start;
  border-top: 2px solid #2b2c3a;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  padding-bottom: 40px;
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3,1fr);
  }

  @media (min-width: 991px) {
    grid-template-columns: repeat(3,1fr);
  }
`

IfoCardWrapper.defaultProps = {
  isSingle: false,
}

export default IfoCardWrapper
