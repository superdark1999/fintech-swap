import styled from 'styled-components'
export const TrendingBarStyled = styled.div`
  display: flex;
  padding: 14px;
  height: 100%;
  .title-bar {
    display: flex;
    align-items: center;
    width: 150px;
    height: 100%;
    font-weight: 700;
    font-size: 18px;
  }
  .filter-bar {
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 1280px;
    min-width: 300px;
    overflow-x: auto;
    .filter-bar-item {
      border: 1px solid #e7ebef;
      border-radius: 100px;
      padding: 4px 16px;
      font-weight: 600;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
        background-color: #35a5fc;
        color: #fff;
      }
    }
  }
  .filter-bar-more {
    width: 60px;
    font-weight: 700;
    text-decoration: underline;
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    margin: 0 20px;
  }
`
