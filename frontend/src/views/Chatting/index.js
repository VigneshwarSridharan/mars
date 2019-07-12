import React from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import '../../assets/sass/chatting.scss';
import { API_ROOT } from '../../constants';
import { User } from '../../utils/APIService';
import { UPDATE_USERS, SET_CHAT_TO, UPDATE_ACTIVE_USERS } from './constants';
import { Scrollbars } from 'react-custom-scrollbars'
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';

class Chatting extends React.Component {
    state = {}

    socket = {}

    componentDidMount = () => {
        this.createSoket()
        // Actions
        let { updateUsers } = this.props;
        User.getUsers().then(res => {
            if (res.status == "success") {
                console.log(res.data)
                updateUsers(res.data);
            }
            else {
                console.error(res.data)
            }
        })
    }

    createSoket = () => {
        let { token } = localStorage;

        // Actions
        let { updateActiveUsers } = this.props

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
            console.log(data);
        })

        window.sendMsg = (id, message) => {
            this.socket.emit('message', { id, message })
        }

    }

    componentWillUnmount = () => {
        this.socket.close();
    }

    render() {
        let { chatingIsOpen, users, chatTo, activeUsers } = this.props;

        // Actions
        let { setChatTo } = this.props;

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
                                            <div className="header text-capitalize d-flex align-items-center">
                                                <span className="mdi mdi-arrow-left mr-2 p-1 pointer" onClick={() => setChatTo({})}></span>{chatTo.first_name} {chatTo.last_name}
                                            </div>
                                        ) : (
                                            <div className="header">
                                                Chatting
                                            </div>
                                        )
                                }
                                <Scrollbars>
                                    <div className="chatting-contend">
                                        {
                                            Object.keys(chatTo).length ? (
                                                <div>
                                                    <Form name="send_message" className="d-flex">
                                                        <Input name="message" required />
                                                        <Button className="ml-2" type="submit" color="primary"><i className="mdi mdi-send"></i></Button>
                                                    </Form>
                                                </div>
                                            ) :
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

})

export default connect(mapStateToProps, mapDispatchToProps)(Chatting);