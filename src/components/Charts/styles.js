import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  position: relative;
  padding: 0 25px 60px 0;

  .ant-spin {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  tspan {
    font-size: 12px;
  }
`;
