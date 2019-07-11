import React, { Component } from 'react';
import ReactTable from 'react-table';
import { ChatroomListWrapper, TableWrapper } from './ChatroomStyles';
import SideButton from 'components/Buttons/SideButton';
import SocketHandler from 'utils/socket';
import { connect } from 'react-redux';

const chatroomColumns = (history) => {
  return [{
    accessor: 'chatroom',
    Cell: (row) => {
      const rowData = row.original;
      return (
        <div onClick={() => history.push({ pathname: `/chatroom/${rowData.id}`})}>{rowData.name}</div>
      )
    }
  }]
}

class ChatroomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatroomList: []
    }
  }

  componentDidMount() {
    const { username } = this.props;
    this.client = SocketHandler.instance;

    if (username) {
      this.client.register(username, this.handleRegister);
    }
  }

  handleRegister = () => {
    this.client.getChatroomList(this.handleChatroomList);
  }

  handleChatroomList = (chatroomList) => {
    console.log("got chatroomlist", chatroomList);
    this.setState({ chatroomList })
  }
  
  render() {
    const { chatroomList } = this.state;
    const { history } = this.props;

    return (
      <ChatroomListWrapper>
        <TableWrapper>
          <ReactTable
            columns={chatroomColumns(history)}
            data={chatroomList}
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

const mapStateToProps = (state) => {
  return { 
    username: state.userInfo.user
  }
}

export default connect(mapStateToProps)(ChatroomList);