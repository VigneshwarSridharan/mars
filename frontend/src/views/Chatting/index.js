import React from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import '../../assets/sass/chatting.scss';
import { API_ROOT } from '../../constants';
import { User } from '../../utils/APIService';
import { UPDATE_USERS, SET_CHAT_TO, UPDATE_ACTIVE_USERS, UPDATE_CONVERSATION, TOGGLE_CHATTING, TOGGLE_TYPING } from './constants';
import { Scrollbars } from 'react-custom-scrollbars'
import Conversation from './Conversation';
import SendMessage from './SendMessage';

class Chatting extends React.Component {
    state = {}

    socket = {}

    componentDidMount = () => {
        this.createSoket()
        // Actions
        let { updateUsers } = this.props;
        User.getUsers().then(res => {
            if (res.status == "success") {
                updateUsers(res.data);
            }
            else {
                console.error(res.data)
            }
        })
    }

    componentWillReceiveProps = (props) => {
        if (this.props.chatTo != props.chatTo) {
            let { chatTo } = props;
            let { toggleTyping } = this.props
            this.socket.on('typing', data => {
                console.log({ data, chatTo });
                let { focus, user_id } = data;
                if (chatTo.user_id == user_id) {
                    toggleTyping(focus)
                }
            })
        }
    }

    createSoket = () => {
        let { token } = localStorage;

        // Actions
        let { updateActiveUsers, updateConversation, toggleChatting } = this.props

        if (!token) return console.error("Token missing, can't create soket connection");

        this.socket = window.io(API_ROOT, {
            path: '/soket/chatting',
            query: `token=${token}`
        });

        this.socket.on('connect', () => {

        });
        this.socket.on('active', data => {
            console.log('active', data);
            updateActiveUsers(data)
        })

        this.socket.on('message', data => {
            updateConversation(data)
        })

        window.setFocus = (user_id, focus) => {
            this.socket.emit('typing', { user_id, focus })
        }

    }

    sendMessage = message => {
        let { chatTo } = this.props;

        // Actions
        let { updateConversation } = this.props;
        let data = { user_id: chatTo.user_id, message, type: "send" };
        this.socket.emit('message', data);
        updateConversation(data);
    }

    componentWillUnmount = () => {
        this.socket.close();
    }

    render() {
        let { chatingIsOpen, users, chatTo, activeUsers } = this.props;

        // Actions
        let { setChatTo } = this.props;
        let { sendMessage } = this;

        return (
            <Spring
                from={{ width: chatingIsOpen ? 0 : 'auto' }}
                to={{ width: chatingIsOpen ? 'auto' : 0 }}
            >
                {
                    style => (
                        <div className="flex-shrink-0" style={{ ...style, overflow: 'hidden' }}>
                            <div className="chatting-wrapper">
                                {
                                    Object.keys(chatTo).length ?
                                        (
                                            <div className="header text-capitalize d-flex align-items-center border-bottom">
                                                <div className="d-flex align-items-center">
                                                    <span className="mdi mdi-arrow-left mr-2 p-1 pointer" onClick={() => setChatTo({})}></span>
                                                    <div>
                                                        <div className="person-name">
                                                            {chatTo.first_name} {chatTo.last_name}
                                                        </div>
                                                        {
                                                            chatTo.typing ? <small>Typing..</small> :
                                                                Object.values(activeUsers).indexOf(chatTo.user_id) == -1 ? '' : <small className="text-success">Active</small>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="header">
                                                Chatting
                                            </div>
                                        )
                                }
                                {
                                    Object.keys(chatTo).length ? (
                                        <div className="chatting-contend">
                                            <Conversation />
                                            <SendMessage sendMessage={sendMessage} />
                                        </div>
                                    ) :
                                        <Scrollbars>
                                            <div className="chatting-users">
                                                {
                                                    users.map((user, inx) => {
                                                        let checkActive = Object.values(activeUsers).indexOf(user.user_id)
                                                        return (
                                                            <div className="p-3 mb-1 bg-light text-capitalize pointer" key={`chat-user-${inx}`} onClick={() => setChatTo(user)}>
                                                                <span>{user.first_name} {user.last_name}</span> {checkActive != -1 && '( A )'}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Scrollbars>
                                }
                            </div>
                        </div>
                    )
                }
            </Spring>
        )
    }
}


const mapStateToProps = ({ Chatting }) => ({
    chatingIsOpen: Chatting.isOpen,
    users: Chatting.users,
    chatTo: Chatting.chatTo,
    activeUsers: Chatting.active
})

const mapDispatchToProps = dispatch => ({
    updateUsers: payload => dispatch({
        type: UPDATE_USERS,
        payload
    }),

    setChatTo: payload => dispatch({
        type: SET_CHAT_TO,
        payload
    }),

    updateActiveUsers: payload => dispatch({
        type: UPDATE_ACTIVE_USERS,
        payload
    }),

    updateConversation: payload => dispatch({
        type: UPDATE_CONVERSATION,
        payload
    }),

    toggleTyping: payload => dispatch({
        type: TOGGLE_TYPING,
        payload
    }),

})

export default connect(mapStateToProps, mapDispatchToProps)(Chatting);