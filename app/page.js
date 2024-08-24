"use client";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the professor rating assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "..." },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages,{ role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      const assistantMessage = jsonResponse;
      // console.log(assistantMessage)

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          { ...lastMessage, content: assistantMessage },
        ];
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
    sx={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      position: "relative",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover', // Ensures the image fits within the viewport
      backgroundPosition: 'center', // Centers the image
      backgroundImage: ` url("https://img.freepik.com/free-photo/assortment-teacher-s-day-elements_23-2149044959.jpg")`,
  }}
  
    >
      <Box
        sx={{
          position: "absolute",
          top: 20,
          width: "100%",
          zIndex: 2,
        }}
      >
        <Typography
          align="center"
          variant="h2"
          color="white"
          // paddingRight={}
          sx={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)", 
            textAlign: "right",
            marginRight: "70px"
          }}
        >
          Professor Rating Assistant
        </Typography>
      </Box>

      {/* Foreground Content */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          position: "relative",
          zIndex: 1,
          marginRight: "20px", // Adjust the right margin as needed
          marginBottom: "20px", // Adjust the bottom margin as needed
          backgroundColor: "transparent" // Makes the background transparent
        }}
      >
        <Stack
          direction={"column"}
          width="500px"
          height="700px"
          // border="1px solid rgba(255, 255, 255, 0.5)"
          p={2}
          spacing={3}
          sx={{
            bgcolor: "rgba(1, 65, 255, 0)", // Slightly more opaque to contrast the background
            // borderRadius: 2,
            // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)", // Stronger shadow for more depth
            marginRight: 15,
            marginTop: 10,
          }}
        >
          <Stack
            direction={"column"}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages?.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
                sx={{ transition: "opacity 0.3s ease-in-out", opacity: 1 }}
              >
                <Box
                  bgcolor={
                    message.role === "assistant"
                      ? "#FFFF99" // Darker yellow color for the assistant role
                      : "#ADD8E6" // Light blue color for other roles
                  }                        
                  color="black"
                  borderRadius={10}
                  p={2.5}
                  maxWidth="80%"
                  sx={{
                    wordWrap: "break-word",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  }}
                >
                  <Typography lineHeight={1.5} variant="body1">
                    {message.content}
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <TextField
              label="Message"
              padding="10px"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: 'black !important', // Placeholder color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black !important', // Border color when not focused
                  },
                  '&:hover fieldset': {
                    borderColor: 'black !important', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black !important', // Border color when focused
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'black !important', // Text color inside the input
                },
                '& .MuiInputLabel-root': {
                  color: 'black !important', // Label color
                },
              }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              sx={{
                backgroundColor: "#ADD8E6", // Light blue color for the button
                color: "black", // White text color for contrast
                '&:hover': {
                  backgroundColor: "#87CEFA", // Slightly darker light blue for hover effect
                },
              }}
            >
            Send
          </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
