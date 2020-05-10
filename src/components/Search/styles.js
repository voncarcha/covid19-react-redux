import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 60px auto 40px;
  padding: 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    margin: 40px auto 30px;
  }

  .ant-select {
    flex: 0 0 50%;
    @media (max-width: 900px) {
      flex: 0 0 100%;
      max-width: 430px;
      width: 100%;
    }
  }
`;
