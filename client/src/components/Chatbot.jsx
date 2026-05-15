import { useState } from "react";

import axios from "axios";

import ReactMarkdown from "react-markdown";

function Chatbot() {

  const [isOpen, setIsOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "Hello 👋 I am your AI Insurance Assistant. Ask me anything about vehicle insurance."
      }
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setLoading(true);

    try {

      const response =
        await axios.post(
          "http://localhost:5000/api/ai/chat",
          {
            message: input
          }
        );

      const botMessage = {
        sender: "bot",
        text:
          response.data.reply
      };

      setMessages((prev) => [
        ...prev,
        botMessage
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "❌ AI server error."
        }
      ]);
    }

    setInput("");

    setLoading(false);
  };

  return (
    <>

      {
        !isOpen && (

          <button
            className="chat-toggle-btn"
            onClick={() =>
              setIsOpen(true)
            }
          >
            💬
          </button>
        )
      }

      {
        isOpen && (

          <div className="chatbot">

            <div className="chat-header">

              <h3>
                Insurance AI Assistant
              </h3>

              <button
                onClick={() =>
                  setIsOpen(false)
                }
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "15px",
                  border: "none",
                  background: "transparent",
                  color: "white",
                  fontSize: "18px",
                  cursor: "pointer"
                }}
              >
                ✕
              </button>
            </div>

            <div className="chat-body">

              {
                messages.map(
                  (msg, index) => (

                    <div
                      key={index}
                      className={`message ${msg.sender}`}
                    >

                      {
                        msg.sender === "bot" ? (

                          <ReactMarkdown>
                            {msg.text}
                          </ReactMarkdown>

                        ) : (

                          msg.text
                        )
                      }

                    </div>
                  )
                )
              }

              {
                loading && (

                  <div className="message bot">

                    <div className="typing">

                      <span></span>
                      <span></span>
                      <span></span>

                    </div>

                  </div>
                )
              }

            </div>

            <div className="chat-footer">

              <input
                type="text"
                className="chat-input"
                placeholder="Ask something..."
                value={input}
                onChange={(e) =>
                  setInput(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {
                    sendMessage();
                  }
                }}
              />

              <button
                className="send-btn"
                onClick={sendMessage}
              >
                Send
              </button>

            </div>

          </div>
        )
      }

    </>
  );
}

export default Chatbot;