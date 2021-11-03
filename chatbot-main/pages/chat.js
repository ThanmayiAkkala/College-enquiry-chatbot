import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { ChatFeed, Message } from "react-chat-ui";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [newClientText, setNewClientText] = useState("");

  const handleChange = (e) => {
    setNewClientText(e.target.value);
  };

  const [messages, setMessages] = useState([
    new Message({
      id: 1,
      message: "Greetings ! How can I help you today ?",
    }),
  ]);

  useEffect(() => {
    if (!currentUser) {
      console.log("You need to signin to view this page !");
      router.push("/");
    }
  }, [currentUser, router]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const handleSubmit = () => {
    console.log(newClientText);
    axios({
      baseURL: window.location.origin,
      method: "POST",
      url: "/api/chat",
      data: {
        message: newClientText,
      },
    })
      .then((response) => {
        // console.log(response);
        setMessages([
          ...messages,
          new Message({ id: 0, message: newClientText }),
          new Message({ id: 1, message: response.data.message }),
        ]);
        setNewClientText("");
      })
      .catch((err) => {
        console.log(err);
        setMessages([
          ...messages,
          new Message({ id: 0, message: newClientText }),
        ]);
        setNewClientText("");
        toast.error("Unable to connect to server");
      });
  };

  return (
    <div className=" flex flex-col-reverse items-center min-h-screen py-2">
      <div className="flex w-2/3 flex-col items-center justify-center">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Type a message and hit return"
          onChange={handleChange}
          value={newClientText}
          className="rounded-xl h-14 mt-10 mb-10 p-4 text-lg focus:outline-none w-full shadow-lg"
        />
      </div>
      <div className="mt-32 w-2/3">
        <ChatFeed
          messages={messages}
          hasInputField={false}
          showSenderName
          bubblesCentered={false}
          bubbleStyles={{
            text: {
              fontSize: 20,
            },
            chatbubble: {
              borderRadius: 20,
              padding: 10,
              backgroundColor: "#67B8E0",
            },
          }}
        />
      </div>
    </div>
  );
}
