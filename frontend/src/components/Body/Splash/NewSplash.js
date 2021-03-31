import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

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
`

const ImageContainer = styled.div`
  position: relative;
`

const TextComponent = (props) => {
  return (
    <TextBlock>
      <h1>{props.title}</h1>
      <p>{props.body}</p>
      <Button onClick={ }>{props.button_title}</Button>

    </TextBlock>
  )
}

const ImageComponent = (props) => {
  return (
    <ImageContainer>
      <img src={`${props.path}`} height='5rem' />
    </ImageContainer>
  )
}

const StoryComponent = (props) => {
  return (
    <>
      <ImageComponent />
      <TextComponent />
    </>
  )
}

const Splash = (props) => {
  return (
    <Root>
      <Fold>

      </Fold>
      <StoryComponent />
      <StoryComponent />

      <Fold>
        <Button onClick={ }>Start Your Journey</Button>
      </Fold>
    </Root>
  );
}

export default Splash;
