import { sendMessageToBot } from "../../lib/dialogflow";

export default function chat(req, res) {
  const message = req.body.message;
  console.log(message);
  sendMessageToBot(message)
    .then((response) => {
      const answer = response.fulfillmentText;
      res.status(200).json({ message: answer });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
      res.status(400).json({
        error: "Error occured here",
      });
    });
}
