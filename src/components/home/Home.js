import React from 'react';
import styled from 'styled-components';
import cover from '../../assets/cover.jpeg';
import logo from '../../assets/logo.jpeg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Cover = styled.div`
  position: relative;
  margin-bottom: 80px;
`

const CoverImg = styled.img`
  width: 100%;
  height: 50%;
  max-height: 500px;
  object-fit: cover;
`

const LogoWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -79px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoImg = styled.img`
  width: 158px;
  border: 4px solid #f0f0f0;
  border-radius: 50%;
`

const Title = styled.div`
  font-size: 32px;
`

const Label = styled.div`
  flex: 1;
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
`

const Text = styled.div`
  flex: 1;
  font-size: 14px;
`

const Row = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  margin: 30px 15px;
  padding: 0 15%;
  justify-content: space-between;
`

const Home = () => (
    <Container>
        <Cover>
            <CoverImg src={cover} />
            <LogoWrapper>
                <LogoImg src={logo} />
            </LogoWrapper>
        </Cover>
        <Title>
            דביבוני פירות
        </Title>
        <Row>
            <Label>קצת עלינו</Label>
            <Text>
                אנחנו (מלודי ואורן) כבר 4 שנים מנגישים לכם את התוצרת הכי איכותית וטרייה שיש. התחלנו להביא את המנגו מהמשק של משפחתנו ולאט לאט התאהבנו בקונספט של יצירת אקו סיסטם חדש אשר מהווה אלטנטיבה למתכונת הקיימת.
                <br/><br/>
                החקלאים שאנחנו עובדים איתם נבחרו בקפידה לאחר ניסיון של הרבה שנים ואנחנו סומכים עליהם מאוד.
            </Text>
        </Row>
        <Row>
            <Label>הודעה למבקרים</Label>
            <Text>
                הקבוצה סגורה להזמנות כרגע ותיפתח שוב ביום ראשון.
                <br/><br/>
                ההזמנות נפתחות ביום ראשון ונסגרות ביום שני ב-24:00.
                <br/>
                המשלוחים והאיסוף בימי רביעי וחמישי.
                <br/><br/>
                התשלום הוא מראש וצריך להעשות באשראי במועד ההזמנה.
                <br/><br/>
                אם אתם רוצים להפוך לנקודת איסוף ביישובכם צרו קשר 054-679-0804
                <br/>
                (מינימום 20 ארגזים לנקודה).
                <br/><br/>
                אם אתם בעלי עסק הרוצה לרכוש פירות דברו איתנו בטלפון ותקבלו מחירים מיוחדים ומשלוח עד בית העסק (מותנה בכמויות ומרחקים). יש להתקשר ל- 050-3355-990
            </Text>
        </Row>
        <Row>
            <Label>מספר מוצרים זמינים</Label>
            <Text>141</Text>
        </Row>
    </Container>
)

export default Home
