import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #EBF8FF;
  border-radius: 1rem;
`

const Fold = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 25rem;
`
const Story = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background_color: ${props => props.color};
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
`

const ImageContainer = styled.img`
  position: relative;
  height: 5rem;
`

const Title = styled.div`
display: flex;
font-size: 3rem;
`

const Text = styled.div`
display: flex;
font-size: 1rem;
`

const Circle = styled.div`
position: relative;
width: 35rem;
height: 10rem;
border-radius: 50%;
background-color: ${props => props.color};
`

const TextComponent = (props) => {
  return (
    <TextBlock>
      <Title>{props.title}</Title>
      {Array.isArray(props.body) && props.body.map(txt => (
        <Text>{txt}</Text>
      ))}
      <Button onClick={() => props.handleClick()}>{props.button_title}</Button>
    </TextBlock>
  )
}

const ImageComponent = (props) => {
  return (
    <ImageContainer src={`${props.path}`} />
  )
}

const StoryComponent = (props) => {
  return (
    <Story color={props.color}>
      {/* <ImageComponent image_path={props.image_path} /> */}
      <TextComponent handleClick={props.handleClick} body={props.body} title={props.title} />
    </Story>
  )
}

const PageTransition = ({ color_1, color_2 }) => {
  const Circle_Container = styled.div`
    display: flex;
    flex-direction: row;
  `
  return (
    <Circle_Container>
      <Circle color={color_1} />
      <Circle color={color_2} />
    </Circle_Container>
  )
}

const data = {
  story: {
    title: 'Our Story',
    body: ['Not everyone feels the dopamine reward when they come back from a training session.',
      'Many of us struggle from delayed gratification and lose the meaning of training to the idea of chores.',
      'We all know our personal health is important to all of us',
      'so we want to bring you the answer that would revolutionize the way we train and maintain our health.',
    ],
    image_path: '',
  },
  mission: {
    title: 'Our Mision',
    body: ['Our mission is to bring a meaningful and motivational perspective to personal health.'],
    image_path: '',
  },
  features: ['Host your own hand crafted routes.', 'Compete in your local route leaderboards.',
    'Invite friends to become thier rivals.',
    'Track your progress and fitness in your dashboard.',
  ],
  cta: {
    title: '',
    body: 'There are many users around you who enjoy the benefits of training together competitvely!'
  }
}

const Splash = () => {
  const history = useHistory()

  const handleClick = (path) => {
    history.push(path)
  }

  return (
    <Root>
      <Fold>
        <Title>Catch Me If You Can</Title>
        <h3>Bringing fun and training together.</h3>
      </Fold>

      <PageTransition color_1={'white'} color_2={'red'} />

      <StoryComponent handleClick={handleClick} title={data.mission.title} body={data.mission.body} image_path={data.mission.image_path} color={'white'} />

      <PageTransition color_1={'red'} color_2={'white'} />

      <StoryComponent handleClick={handleClick} title={data.story.title} body={data.story.body} image_path={data.story.image_path} color={'red'} />

      <PageTransition color_1={'white'} color_2={'red'} />

      <Fold>
        {data.cta.body}
        <Button onClick={() => handleClick('/signup')}><Text>Start Your Journey</Text></Button>
      </Fold>
    </Root>
  );
}

export default Splash;
