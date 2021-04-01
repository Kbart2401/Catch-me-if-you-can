import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Root = styled.div`
  background-color: #EBF8FF;
  border-radius: 1rem;
`

const Fold = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Story = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
font-size: 3rem;
`

const Text = styled.div`
font-size: 1rem;
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
    <Story>
      <ImageComponent image_path={props.image_path} />
      <TextComponent handleClick={props.handleClick} body={props.body} title={props.title} />
    </Story>
  )
}

const Splash = (props) => {
  const history = useHistory()

  const data = {
    story: {
      title: 'Our Story',
      body: ['Not everyone feels the dopamine reward when they come back from a training session.',
        'Many of us struggle from delayed gratification and lose the meaning of training to the idea of chores.',
        'We all know our personal health is important to all of us, so we want to bring you the answer that would revolutionize the way we train and maintain our health.',
      ],
      image_path: '',
    },
    mission: {
      title: 'Our Mision',
      body: 'Our mission is to bring a meaningful and motivational perspective to personal health.',
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

  const handleClick = () => {
    history.push('/signup')
  }

  return (
    <Root>
      <Fold>
        <Title>Catch Me If You Can</Title>
        <h3>Bringing fun and training together.</h3>
      </Fold>

      <StoryComponent handleClick={handleClick} title={data.mission.title} body={data.mission.body} image_path={data.mission.image_path} />
      <StoryComponent handleClick={handleClick} title={data.story.title} body={data.story.body} image_path={data.story.image_path} />

      <Fold>
        {data.cta.body}
        <Button onClick={() => handleClick()}><Text>Start Your Journey</Text></Button>
      </Fold>
    </Root>
  );
}

export default Splash;
