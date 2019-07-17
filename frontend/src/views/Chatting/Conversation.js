import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars'

const Conversation = props => {
    let { conversationData } = props;
    const scrollbar = useRef(null);
    useEffect(() => {
        scrollbar.current.scrollToBottom();
    }, [conversationData])
    return (
        <Scrollbars ref={scrollbar}>
            <div className="conversation">
                {
                    conversationData.map((item, inx) => {
                        return (
                            <div className={`item ${item.type} bg-gradient-primary`} key={inx}>{item.message}</div>
                        )
                    })
                }
            </div>
        </Scrollbars>
    )
}

const mapStateToProps = ({ Chatting }) => ({
    conversationData: Chatting.conversation,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);