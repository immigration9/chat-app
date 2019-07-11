import styled from 'styled-components';

export const ChatMessageOutline = styled.div`
  min-height: 3rem;
  margin: 1rem;
  text-align: ${props => props.isOwner === true ? "right" : "left"};
`

export const ChatBalloon = styled.div`
  position: relative;
  background: #F0F0F0;
  border-radius: .4em;

  overflow-wrap: break-word;
  padding: 1rem;
`

export const ChatBalloonLeft = styled(ChatBalloon)`
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-right-color: #F0F0F0;
    border-left: 0;
    margin-top: -9px;
    margin-left: -9px;
  }
`

export const ChatBalloonRight = styled(ChatBalloon)`
  background-color: #1890FF;
  color: white;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-left-color: #1890FF;
    border-right: 0;
    margin-top: -9px;
    margin-right: -9px;
  }
`