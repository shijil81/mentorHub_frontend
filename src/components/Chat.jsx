import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { Form, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getChatHistoryApi } from '../services/allApi';
import { disconnectSocket, initiateSocketConnection, joinRoom, sendMessage, subscribeToMessages } from '../services/socket';
import { serverUrl } from '../services/serverUrl';
import { useSelector } from 'react-redux';

function Chat({user}) {
  
  // get data from redux store
  const existingUser=useSelector((state)=>state.user.userInfo)
  const userId=existingUser._id
  const token = sessionStorage.getItem("token");
  const [messages, setMessages] = useState([]); // Messages array to store chat history
  const [newMessage, setNewMessage] = useState(""); // State for new message input
  const chatBodyRef = useRef(null); // Reference for chat body to enable auto-scroll

   // Generate a unique chat room ID based on user and recipient IDs
   const generateChatRoom = (userId, selectedUserId) => {
    const sortedIds = [userId, selectedUserId].sort();
    return `${sortedIds[0]}-${sortedIds[1]}`;
  };


    // Fetch chat history for the specific chat room
  const fetchChatHistory = async (chatRoom) => {
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await getChatHistoryApi(chatRoom, reqHeader);
      if (response && response.status === 200) {
        setMessages(response.data); // Set messages with fetched history
      } else {
        console.log("No chat history found");
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

   // Handle sending a new message
   const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        room: generateChatRoom(userId, user._id),
        sender: userId,
        receiver: user._id,
        message: newMessage,
      };
      sendMessage(messageData); // Emit message to server
      setNewMessage(""); // Clear input field after sending
    }
  };


   // useEffect to initialize socket connection and join chat room
   useEffect(() => {
    if (user && userId) {
      const chatRoom = generateChatRoom(userId, user._id);
      initiateSocketConnection(userId); // Initialize socket connection
      joinRoom(chatRoom); // Join the specific chat room
      fetchChatHistory(chatRoom); // Fetch chat history for this room

      // Subscribe to receive incoming messages
      subscribeToMessages((incomingMessage) => {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]); // Append new message to messages
      });

      return () => {
        disconnectSocket(); // Clean up socket connection on component unmount
      };
    }
  }, [user, userId]);

  // Auto-scroll chat to bottom when messages update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

    // Handle 'Enter' key press to send message
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
      }
    };

  
  return (
    <>
        <div className='border border-3 border-info shadow rounded-4' style={{
            backgroundImage: "linear-gradient(#563e43,#4c3c5d)",
            height: "90vh",
            overflow: "hidden",
          }}>
            <div className='p-3'>
                {/* Chat Header */}
                <div
              className="chat-header text-black fw-bold p-3 rounded-4 d-flex px-md-5"
              style={{ backgroundImage: "linear-gradient(#b542f8,#f05ea9)" }}
            >
              <div className="d-flex align-items-center">
                <img
                  src={
                    user.profile
                      ? `${serverUrl}/uploads/${user.profile}`
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFgQrbwN1RthTLcuPTI9yRyRAJDwHyP1KSQ&s'
                  }
                  alt="profile"
                  className="rounded-circle"
                  style={{ height: "50px", width: "50px" }}
                />
                <h3 className="ms-3">{user?.username}</h3>
              </div>
              
            </div>

                {/* chat body */}
                <div
              className="chat-body scrollable-container mt-3"
              ref={chatBodyRef}
              style={{ overflowY: "auto", maxHeight: "70vh" }}
            >
              {messages.map((msg, index) => (
                <div key={index} className={`d-flex ${msg.sender === userId ? "justify-content-end" : ""}`}>
                  <div
                    className={`chat-bubble rounded-4 px-3 p-2 my-1 ${
                      msg.sender === userId ? "bg-success text-white" : "bg-light text-dark"
                    }`}
                    style={{ maxWidth: "60%" }}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

                   {/* Chat Input */}
            <div className="p-2">
              <div className="d-flex ">
                <input
                  type="text"
                  placeholder="Send a message..."
                  className='form-control w-100'
                  value={newMessage}
                  onChange={(e)=>setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  type="button"
                  onClick={handleSendMessage}
                  variant="primary"
                  className="ms-2 px-4"
                >
                  Send
                </Button>
              </div>
            </div>



            </div>

        </div>
    </>
  )
}

export default Chat