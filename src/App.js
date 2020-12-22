import React, {useState} from 'react';
import styled from 'styled-components';
import {Menu, Button} from 'antd';
import {FaApple, FaCarrot, FaStore, FaBreadSlice, FaWineBottle} from 'react-icons/fa';
import {GiAcorn} from 'react-icons/gi';
import {useQuery} from '@apollo/client';
import ItemModal from './components/ItemModal'
import * as queries from './graphql/queries'
import Card from './components/customer/Card'
import Spinner from './components/Spinner'

const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
`

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #3333;
`

const StyledMenu = styled(Menu)`
  text-align: center !important;
`

const Title = styled.span`
  margin-right: 5px;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const App = () => {
  const [selected, setSelected] = useState('fruits');
  const [visible, setVisible] = useState(false);
  const {loading, error, data} = useQuery(queries.ITEMS_QUERY);
  return (
      <Container>
        <MenuContainer>
          <StyledMenu onClick={({key}) => setSelected(key)} selectedKeys={selected} mode="horizontal">
            <Menu.Item key="fruits" icon={<FaApple />}>
              <Title>פירות</Title>
            </Menu.Item>
            <Menu.Item key="vegetables" icon={<FaCarrot />}>
              <Title>ירקות</Title>
            </Menu.Item>
            <Menu.Item key="nuts" icon={<GiAcorn />}>
              <Title>אגוזים ויבשים</Title>
            </Menu.Item>
            <Menu.Item key="products" icon={<FaStore />}>
              <Title>מוצרים</Title>
            </Menu.Item>
            <Menu.Item key="pastries" icon={<FaBreadSlice />}>
              <Title>מאפים</Title>
            </Menu.Item>
            <Menu.Item key="olive-oil" icon={<FaWineBottle />}>
              <Title>שמן זית</Title>
            </Menu.Item>
          </StyledMenu>
          <Button onClick={() => setVisible(true)}>הוסף פריט</Button>
        </MenuContainer>
        <ItemModal visible={visible} onCancel={() => setVisible(false)}/>
        {loading && <Spinner />}
        {!loading && !error && data && (
            <Grid>
              {(data?.items || []).filter(({category}) => category === selected).map(({id, img_base64, title, subtitle, amount, unit, description, tags = ''}) => (
                  <Card
                      key={id}
                      imgSrc={img_base64}
                      title={title}
                      subtitle={subtitle}
                      price={{amount, unit}}
                      description={description}
                      tags={tags.split(', ')}
                  />
              ))}
            </Grid>
        )}
      </Container>
  );
}

export default App;
