import { NextResponse } from 'next/server'; 
require('dotenv').config({ path: '.env.local' });

const dataobject = {
  "reviews": [
    {
      "professor": "Dr. Alice Johnson",
      "review": "Dr. Alice Johnson is an outstanding professor who excels at breaking down complex mathematical concepts into easy-to-understand segments. Her lectures are always engaging and well-structured, making even the toughest topics accessible to everyone. Highly recommended for anyone looking to deepen their understanding of mathematics.",
      "subject": "Mathematics",
      "stars": 5
    },
    {
      "professor": "Dr. Robert Smith",
      "review": "Dr. Robert Smith is incredibly knowledgeable in physics, though his lectures can sometimes be quite dry. He has a deep understanding of the subject and provides valuable insights, but a bit more interaction during lectures would enhance the learning experience.",
      "subject": "Physics",
      "stars": 4
    },
    {
      "professor": "Dr. Emily Davis",
      "review": "Dr. Emily Davis brings a lot of enthusiasm to her chemistry classes. She has a knack for making intricate chemical reactions and theories more approachable. Her practical examples help students grasp the material effectively.",
      "subject": "Chemistry",
      "stars": 4
    },
    {
      "professor": "Dr. Michael Brown",
      "review": "Dr. Michael Brown is exceptional in biology, with a remarkable ability to simplify complex biological processes. His passion for the subject shines through, and he always makes time to help students with questions. His classes are both informative and inspiring.",
      "subject": "Biology",
      "stars": 5
    },
    {
      "professor": "Dr. Jessica Lee",
      "review": "Dr. Jessica Lee is a highly skilled professor in computer science, although her classes can sometimes start late. Her deep knowledge and practical approach make her lectures valuable for anyone looking to excel in the field of technology.",
      "subject": "Computer Science",
      "stars": 3
    },
    {
      "professor": "Dr. Daniel Wilson",
      "review": "Dr. Daniel Wilson is a fantastic history professor who brings the past to life with his engaging storytelling and thorough research. His passion for history is evident, and his classes are always interactive and thought-provoking.",
      "subject": "History",
      "stars": 5
    },
    {
      "professor": "Dr. Sarah Martinez",
      "review": "Dr. Sarah Martinez offers insightful lectures in economics and provides strong support for students. While the subject matter can be challenging, her clear explanations and willingness to help make her a valuable resource for anyone studying economics.",
      "subject": "Economics",
      "stars": 4
    },
    {
      "professor": "Dr. James Thompson",
      "review": "Dr. James Thompson's English classes are both engaging and educational. His ability to dissect and discuss literature and writing techniques helps students improve their skills and appreciation for the subject.",
      "subject": "English",
      "stars": 5
    }
]}

const data1 = JSON.stringify(dataobject)

const systemPrompt = "You are a friendly professor rating assistant, the data of all professors would be given to you as json which would include: \"professor\": \"Prof1\",\"review\": \"Great professor...\",\"subject\": \"Math\",\"stars\": 5. You need to provide the student with details of the professor that matches their situation. the professor should be best match for the student. Also, cater other queries from students and guide them accordingly. it would be better to review each professor according to the student criteria. Here is the data of all the professors. Donot present the entire data to the student, and engage the student into finding the right professor by naming the professors. remember that you are directly talking to the student, donot sound as if you are not talking to the student" + data1;

// POST request to the API
export async function POST(req) {
  try{
      const data = await req.json(); 
      // console.log(data)

      const systemPr = {"role": "system", "content": systemPrompt};
      data.push(systemPr);
      // const userInput = data[0]['content']; 
      // console.log(userInput)

      // Create a request to the TextCortex API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
        
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.1-8b-instruct:free",
          "messages": data,
        })
      });

      const responsefiltered = await response.json();
      // console.log(responsefiltered.choices[0].message.content)
      return NextResponse.json(responsefiltered.choices[0].message.content);
  }
  catch(e){
    return NextResponse.json({error:e.message,status:500});

}
}
