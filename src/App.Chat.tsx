import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ILetter {
  message: string;
  sent: boolean;
}
export function App() {
  const [message, setMessage] = useState<string>('');

  const [sending, setSending] = useState(false);

  const [alreadySending, setAlreadySending] = useState(false);

  const [messages, setMessages] = useState<ILetter[]>([]);



  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send();
  }


  function send() {
    if (!message)
      return;

    if (sending) {

      if (!alreadySending) {
        setAlreadySending(true);
      }

      return;
    }

    // sending code 
    push({ message, sent: true });

    setSending(true);

    postMessage(message).then(async (responseMessage: string) => {
      console.log(responseMessage);
      push({ message: responseMessage, sent: false });
    }).finally(() => {
      setSending(false);
      setAlreadySending(false);
    });

  }

  async function postMessage(message: string): Promise<string> {
    const response = await fetch('https://pulseapi.flairsdev.com/chat/api/chat/MockChat', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: message })
    });
    const responseJson = await response.json();
    return responseJson.answer;
  }

  function push(message: ILetter) {
    setMessages(previous => [...previous, message]);
  }

  const messageNodes = messages.map(m => (
    <div key={uuidv4()} className={'chat-message-row'}>
      <div key={uuidv4()} className={'chat-message' + ' ' + (m.sent ? 'sent-message' : 'recieved-message')}>{m.message}</div>
    </div>));

  return (
    <div className='App'>
      <h1>Chat</h1>
      <section className="chat-section">
        <div className="chat-messages-container">
          {messageNodes}
          <div id="typing" hidden={!sending}>sending...</div>
          <div id="already-sending" hidden={!alreadySending}>already sending!!</div>
        </div>
        <div className="chat-input-container">
          <form onSubmit={submitMessage}>
            <input id="message-input" name="message" onChange={e => setMessage(e.target.value)} /><button type='submit'>Send</button>
          </form>
        </div>
      </section>
    </div>
  );
}
