import styled from 'styled-components';

export const ChatroomListWrapper = styled.div`
  height: 100%;
  width: 40rem;
  margin: 0 auto;
  text-align: center;
  text-align: -webkit-center;
  text-align: -moz-center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const TableWrapper = styled.div`
  padding: 1rem 0;
`

export const ChatroomInner = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-content: flex-end;
`

export const MessageWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  height: 81%;
  overflow-y: scroll

  border: 1px solid #F0F0F0;
`

export const WriteWrapper = styled.div`
  width: 100%;
  height: 12%;
  border: 1px solid #F0F0F0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-content: flex-end;
`

export const MenuBarWrapper = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const WriteArea = styled.div`
  padding: 0.25rem;
  width: 75%;
  height: 100%;
`

export const WriteComponent = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  padding: 0.5rem 0.75rem;
`

export const ButtonArea = styled.div`
  width: 20%;
  height: 100%;
  padding: 0 0.5rem;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`

