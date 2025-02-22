import React from "react";

const Messages = ({ messages }) => (
  <div className="w-full max-w-md">
    {messages.length > 0 &&
      messages.map((msg, index) => (
        <p
          key={index}
          className={`text-lg ${
            msg.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {msg}
        </p>
      ))}
  </div>
);

export default Messages;
