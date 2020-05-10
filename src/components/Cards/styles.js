import styled from 'styled-components';

export const Wrapper = styled.ul`
  max-width: 1200px;
  width: 100%;
  margin: 40px auto 60px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
  }

  li {
    flex: 0 0 31%;
    @media (max-width: 900px) {
      max-width: 430px;
      width: 100%;
      margin: 0 auto 20px;
    }

    section {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        height: 70px;
        @media (max-width: 600px) {
          height: 50px;
        }
      }
    }
  }
  .confirmed .ant-statistic-content {
    color: #8884d8;
  }
  .deaths .ant-statistic-content {
    color: #e02828;
  }
  .recovered .ant-statistic-content {
    color: #82ca9d;
  }
  .ant-statistic-content {
    font-size: 34px;
    @media (max-width: 600px) {
      font-size: 24px;
    }
  }
`;
