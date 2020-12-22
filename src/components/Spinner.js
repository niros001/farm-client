import React from 'react';
import {Spin} from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Spinner = () => (
    <Container>
        <Spin size="large"/>
    </Container>
)

export default Spinner;
