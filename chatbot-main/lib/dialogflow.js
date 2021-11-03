import { SessionsClient } from "dialogflow";

const dialogflowConfig = {
  projectId: "chatbot-xiff",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5Dit7aITmF1BS\n855z4jUrbQjDXWhfSakoRpZlLbOYpK0CPQX28N4VBVGqiU7kpLRmM/iia8diI3h8\nRWOcykFneoWPSSXcJGsay3LvBgJMHJPUo2UG6WiX4ucQwHKNxvgBHdILccqPrnqR\nIuHfLF98KpOmNJUNJYaVfTwd7W+oX6rpsoIh1Sifig/0gHZ+VKvSUc7+9M05ascs\nDu6mjWBJSjK/SJc8EWYhLvFg3Tcaz3y8XLsgbTe5Wep9L9RkD24B0OTMuG5zpKSE\n22lIMZD+kf9Usw6Trah6Xd0cATmUtiQ7L0Txl8AaCaPJT9XTrWD/UdviuqZKfZXA\nal/MhZ73AgMBAAECggEAAgWRnAuMSCdBDWbz+DgkdJEAY4IFveTEIFiFFB3ntGc4\nLKoWApinFHu2ZLKTVhQmlGdE9CFRUFUq39CyQehDxqmkA+i8rScItIY8fzgFlmdJ\nhi0y0VyDdAVamOhBWCMwWnLE9LMNj3xMgoFrDlEhye19J3ezmS0rxz5TBdCuQ5yj\nMaj6ZHfCcQs8oxDiSRz4MJFC0QeyihWBPrqvz8voLRvhlHQCUR+EALUvxn80F3qa\n+6eSYD9Q9Il54RkSK1xGSUE7G+2y3HLVSRYDaa/gu6+asryMoYetRLX/mIBnZ3u1\nvNQ+GZHVHIY7LVZQQHUqNKXi3lzTvDEKijGqKI7PIQKBgQDnLHPH1aHHSmXHd+m1\nuvFCw00Abf1GfNtTzTMpCJwTWp+STkAu985elgupft9d4JcZ53a+NdW2+AwMWMFi\nVs+yv3r+UeVUH/cN4xTJ2JvWcnutTcnNLqI+OQEFm2NEXjqWoOgevMpvT8+ADHiv\nAEFkpmp3j4UDAqquvEKqTkPb7QKBgQDM7c8n51HNvPGgVW45nQpGL2TZMD8wSiGR\nUgLoe7gag2IoMBtwcV868x1jK0uVDOu0+StXFORNUk/dONQ/13V9NxEfRZ6ekJHL\nk7mSq+fQJ9rUw/ZaZO89yA+AzGqBaNrwF2y3b3aMA6s6xlGT9T1Eoz1f8hEiM4Yg\nfxOPg6Gx8wKBgQDT5JvvlLKoAFqQXip7Z/ISdv9SoH6iKHnFM3ZsazbcSpmvOkh8\nhKnFaxUfdGp7GwyFMvNVX/UXs/8fJg+D+vx/5CFxkVF6LZ5/PSDl7sTQ6LjSXlXV\n26PdEtUL9aUkmpZrUOvSmMuZAfe5cDUCe2J1RlCabJPH8Z7PcUJN5lUu9QKBgH8r\n/OhIds10OYZEPdjnCZ8wficB99ShzF8AQ+m+DSv26I0D/aMz1+MfR9do4MiocgWm\nsyyhPGR3djRUtfLAZJrF94wuihbgpHlvPTQ2Fe9pLDXpPhIunQD8DBLjyBxy05s3\nDjJvq2OMS1B4DdwBznmvy8Ck2dkdnFjCQ4NGLqvdAoGBAIuIVFmp3J/cneEH/nNj\nZ8BPydxjIlrcNoDX82I6IDmQ+oZ2sRcbdG/K7QVBGb/H3w2jo0rW09lxkLmAlEtS\njyARc6E1LUfE//oF3dVLSONAp0Mo5edl18zYsMExWHbApw4O2NPIvKGhmR6LoIMy\nQf12tU5KBjBiNl73tUMRWSWE\n-----END PRIVATE KEY-----\n",
  clientEmail: "tepigbot@chatbot-xiff.iam.gserviceaccount.com",
};

const configuration = {
  credentials: {
    private_key: dialogflowConfig.privateKey,
    client_email: dialogflowConfig.clientEmail,
  },
};

const sessionId = "987654";
const languageCode = "en-US";
const sessionClient = new SessionsClient(configuration);
const sessionPath = sessionClient.sessionPath(
  dialogflowConfig.projectId,
  sessionId
);

async function sendMessageToBot(message) {
  console.log(message);
  const botRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };
  try {
    const responses = await sessionClient.detectIntent(botRequest);
    console.log(JSON.stringify(responses));
    const response = responses[0].queryResult;
    return response;
  } catch (err) {
    console.log(err);
    return err.code;
  }
}

export { sendMessageToBot };
