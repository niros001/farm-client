import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Shop from './components/shop/Shop';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import styled from 'styled-components';
import {Menu} from 'antd';

const StyledMenu = styled(Menu)`
  display: flex;
  text-align: center !important;
  border-bottom: 2px solid #3333;
  position: relative;
`

const App = () =>  {
    return (
        <Router>
            <StyledMenu>
                <Menu.Item><Link to="/">דף הבית</Link></Menu.Item>
                <Menu.Item><Link to="/shop">לביצוע הזמנה</Link></Menu.Item>
                <Menu.Item><Link to="/about">על החקלאים</Link></Menu.Item>
                <Profile />
            </StyledMenu>
            <Switch>
                <Route path="/shop">
                    <Shop />
                </Route>
                <Route path="/about">
                    <div>About</div>
                </Route>
                <Route path="/dashboard">
                    <div>Dashboard</div>
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
