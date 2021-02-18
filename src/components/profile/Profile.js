import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import LoginModal from '../profile/LoginModal'

const Container = styled.div`
  position: absolute;
  align-self: center;
  left: 15px;
`


const Profile = () => {
    const [visible, setVisible] = useState(false);
    return (
        <Container>
            <Button onClick={() => setVisible(true)}>הירשם/התחבר</Button>
            <LoginModal visible={visible} onCancel={() => setVisible(false)} />
        </Container>
    )
};

export default Profile;
