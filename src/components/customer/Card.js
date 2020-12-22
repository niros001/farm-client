import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 390px;
  min-height: 540px;
  margin: 12px;
  box-shadow: 0 0 5px 3px #333333;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 15px 6px #333333;
  }
`

const Cover = styled.img`
  width: 100%;
`

const Tags = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.div`
  background-color: #EEE;
  color: #424242;
  font-size: 12px;
  margin: 5px;
  padding: 5px 12px;
  border-radius: 16px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
`

const Content = styled.div`
  padding: 5px 15px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  color: #212121;
  font-size: 24px;
  margin-bottom: 8px;
`

const Subtitle = styled.div`
  color: #757575;
  font-size: 14px;
  margin-bottom: 8px;
`

const Amount = styled.div`
  color: #212121;
  font-size: 18px;
  margin-bottom: 8px;
`

const Unit = styled.div`
  color: #616161;
  font-size: 14px;
`

const Description = styled.div`
  color: #000;
  font-size: 14px;
  margin-top: 20px;
`

const Card = ({handleClick, imgSrc, title, subtitle, price: {amount, unit}, description, tags = []}) => {
    return (
        <Container onClick={handleClick}>
            <Cover src={`data:image/jpeg;base64,${imgSrc}`}/>
            <Tags>
                {tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
            </Tags>
            <Content>
                <Row>
                    <Column>
                        <Title>{title}</Title>
                        <Subtitle>{subtitle}</Subtitle>
                    </Column>
                    <Column>
                        <Amount>{amount}₪</Amount>
                        <Unit>{unit}</Unit>
                    </Column>
                </Row>
                <Description>{description}</Description>
            </Content>
        </Container>
    );
}

export default Card;
