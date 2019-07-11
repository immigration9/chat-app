import React, { Component } from 'react';
import ReactTable from 'react-table';
import { ChatroomListWrapper, TableWrapper } from './ChatroomStyles';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ButtonWrapper } from 'styles/global';
import ConfirmButton from 'components/Buttons/ConfirmButton';
import SideButton from 'components/Buttons/SideButton';

const chatroomColumns = [
  {
    accessor: 'chatroom'
  }
]
const dummyData = [
  {
    chatroom: 'Hello, World!'
  },
  {
    chatroom: 'Hello, World222!'
  },
]

class ChatroomList extends Component {
  render() {
    return (
      <ChatroomListWrapper>
        <TableWrapper>
          <ReactTable
            columns={chatroomColumns}
            data={dummyData}
            minRows={15}
            showPagination={false}
            sortable={false}
            getTheadThProps={(state, rowInfo, column) => {
              return {style: { display: 'none' }};
            }}
          />
        </TableWrapper>
        <SideButton link={'/chatrooms/add'} text={'채팅방 추가'} type={'primary'}/>
      </ChatroomListWrapper>
    )
  }
}

export default ChatroomList