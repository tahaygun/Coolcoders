import { animateScroll } from "react-scroll";
import React, { Component } from "react";
import axios from "axios";
const BrowserSpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition ||
    window.oSpeechRecognition);
const recognition = BrowserSpeechRecognition
  ? new BrowserSpeechRecognition()
  : null;
let listening = false;
let pauseAfterDisconnect = false;
let interimTranscript = "";
let finalTranscript = "";

export class VoiceCommands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interimTranscript,
      finalTranscript,
      listening: false,
      input: "",
      answer: "",
      messages: [],
      wallets: null,
      status: "findwallet",
      walletToWork: null
    };
    this.speaker = new SpeechSynthesisUtterance();
    this.speaker.lang = "en-US";
  }
  componentWillMount() {
    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = this.updateTranscript.bind(this);
      recognition.onend = this.onRecognitionDisconnect.bind(this);
      this.setState({ listening });
    }
  }
  disconnect = disconnectType => {
    if (recognition) {
      switch (disconnectType) {
        case "ABORT":
          pauseAfterDisconnect = true;
          recognition.abort();
          break;
        case "RESET":
          pauseAfterDisconnect = false;
          recognition.abort();
          break;
        case "STOP":
        default:
          pauseAfterDisconnect = true;
          recognition.stop();
      }
    }
  };
  voiceStatusHandler = () => {
    if (this.state.listening) {
      return this.stopListening();
    } else {
      return this.startListening();
    }
  };
  onRecognitionDisconnect() {
    listening = false;
    if (pauseAfterDisconnect) {
      this.setState({ listening });
    } else {
      this.startListening();
    }
    pauseAfterDisconnect = false;
  }
  resetTranscript = () => {
    interimTranscript = "";
    finalTranscript = "";
    this.disconnect("RESET");
    this.setState({ interimTranscript, finalTranscript });
  };
  answerToUser = arg => {
    let messages = this.state.messages;
    setTimeout(() => {
      messages.push("Command " + this.state.finalTranscript);
      this.setState(
        { messages },
        this.answerToCommand(arg),
        this.scrollToBottom()
      );
    }, 1000);
  };
  updateTranscript(event) {
    interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript = event.results[i][0].transcript;
        this.answerToUser(finalTranscript);
        this.voiceStatusHandler();
        this.setState({ finalTranscript, nowlistening: false });
      } else {
        speechSynthesis.cancel();
        interimTranscript = this.concatTranscripts(
          interimTranscript,
          event.results[i][0].transcript
        );
        this.setState({ interimTranscript, nowlistening: true });
      }
    }
  }
  concatTranscripts(...transcriptParts) {
    return transcriptParts
      .map(t => t.trim())
      .join(" ")
      .trim();
  }
  startListening = () => {
    if (recognition && !listening) {
      try {
        recognition.start();
      } catch (DOMException) {
        // Tried to start recognition after it has already started - safe to swallow this error
      }
      listening = true;
      this.setState({ listening });
    }
  };
  abortListening = () => {
    listening = false;
    this.setState({ listening });
    this.disconnect("ABORT");
  };

  stopListening = () => {
    listening = false;
    this.setState({ listening });
    this.disconnect("STOP");
  };

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chatbox"
    });
  }
  getAllWallets = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allwallets`)
      .then(wallets => {
        this.setState({ wallets: wallets.data });
        setTimeout(() => {
          this.showWallets();
          this.scrollToBottom();
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getAllWallets();
    let { messages } = this.state;
    let msg =
      "Hi, Could you give me ID of wallet that you want to work? Here is the list:";
    messages.push(msg);
    this.setState({ messages });
  }
  showWallets = () => {
    let { messages, wallets } = this.state;
    wallets.map(wallet => {
      messages.push(
        wallet.name +
          ". Coins: " +
          wallet.coins +
          ". Wallet ID : " +
          wallet.seqId
      );
      return this.setState({ messages });
    });
  };
  answerToCommand = command => {
    let { status, messages, walletToWork } = this.state;
    if (command.includes("exit") || command.includes("cancel")) {
      let message =
        "Process cancelled, let's start again. Here is the Wallets:";
      messages.push(message);
      status = "findwallet";
      this.speaker.text = message;
      speechSynthesis.speak(this.speaker);
      return this.setState({ messages, status }, this.showWallets());
    }
    if (status === "findwallet") {
      if (!command.match(/\d+/)) {
        let message = "Please write the number as integer..";
        messages.push(message);
        this.speaker.text = message;
        speechSynthesis.speak(this.speaker);
        return this.setState({ messages });
      }
      command = command.match(/\d+/)[0];
      axios
        .get(`${process.env.REACT_APP_BACKEND}/api/walletBySeqId/` + command)
        .then(wallet => {
          let message =
            wallet.data.wallet.name +
            " is wallet of " +
            wallet.data.group.name +
            ". They have " +
            wallet.data.wallet.coins +
            " OneCoins in their account. Do you want to add or subtract Coins?";
          messages.push(message);
          status = "waitForCommand";
          this.speaker.text = message;
          speechSynthesis.speak(this.speaker);
          return this.setState(
            { walletToWork: wallet.data, messages, status },
            this.scrollToBottom()
          );
        })
        .catch(err => {
          status = "findwallet";
          let message =
            "I couldn't find this wallet, can you check the ID again?";
          messages.push(message);
          this.speaker.text = message;
          speechSynthesis.speak(this.speaker);
          return this.setState({ messages, status }, this.scrollToBottom());
        });
    }
    if (status === "waitForCommand") {
      if (command.includes("add") || command.includes("give")) {
        let message =
          "Can you give me amount (as integer) and reason by starting 'because'?";
        messages.push(message);
        this.speaker.text = message;
        speechSynthesis.speak(this.speaker);
        status = "AddAmount";
        return this.setState({ messages, status }, this.scrollToBottom());
      }
      if (command.includes("subtract") || command.includes("take")) {
        let message =
          "Can you give me amount (as integer) and reason by starting 'because'?";
        messages.push(message);
        this.speaker.text = message;
        speechSynthesis.speak(this.speaker);
        status = "SubAmount";
        return this.setState({ messages, status }, this.scrollToBottom());
      }
      let message =
        "Sorry but I didn't understand you, do you want to add or take money?";
      messages.push(message);
      this.speaker.text = message;
      speechSynthesis.speak(this.speaker);
      return this.setState({ messages }, this.scrollToBottom());
    }
    if (status === "AddAmount") {
      if (!command.match(/\d+/) && command.match(/because/)) {
        let message =
          "Please write the number as integer and tell me the reason..";
        messages.push(message);
        messages.push(message);
        this.speaker.text = message;
        speechSynthesis.speak(this.speaker);
        return this.setState({ messages });
      }
      var amount = command.match(/\d+/gi);
      var reason = command.match(/because\s+(.*)$/)[1];
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/api/wallet/addOneCoin/${
            walletToWork.wallet._id
          }`,
          { amount, reason }
        )
        .then(result => {
          let message = `I added ${amount} OneCoin to ${
            walletToWork.wallet.name
          } successfully. And if you want to do something more, here is the wallets:`;
          messages.push(message);
          this.speaker.text = message;
          speechSynthesis.speak(this.speaker);
          status = "findwallet";
          return this.setState(
            { messages, status },
            this.scrollToBottom(),
            this.getAllWallets()
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (status === "SubAmount") {
      if (!command.match(/^\d+/ && command.match(/because/))) {
        let message =
          "Please write the number as integer and tell me the reason..";
        messages.push(message);
        this.speaker.text = message;
        speechSynthesis.speak(this.speaker);
        return this.setState({ messages });
      }
      amount = command.match(/\d+/gi);
      console.log(amount);
      reason = command.match(/because\s+(.*)$/)[1];
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/api/wallet/takeOneCoin/${
            walletToWork.wallet._id
          }`,
          { amount, reason }
        )
        .then(result => {
          let message = `I subtracted ${amount} OneCoin from ${
            walletToWork.wallet.name
          } successfully. And if you want to do something more, here is the wallets:`;
          messages.push(message);
          this.speaker.text = message;
          speechSynthesis.speak(this.speaker);
          status = "findwallet";
          return this.setState(
            { messages, status },
            this.scrollToBottom(),
            this.getAllWallets()
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  commandHandler = e => {
    e.preventDefault();

    let messages = this.state.messages;
    messages.push("Command " + this.state.input);
    let input = "";
    let command = this.state.input;
    setTimeout(() => {
      this.answerToCommand(command);
    }, 1000);
    this.setState({ messages, input }, this.scrollToBottom());
  };
  changeHandler = e => {
    this.setState({ input: e.target.value });
  };
  render() {
    var { messages } = this.state;
    return (
      <div className="container content-wrapper">
        <div className="container-fluid">
          <div id="chatbox" className="rounded shadow m-2 chatbox">
            {messages.map((msg, key) => {
              if (msg.includes("Command")) {
                return (
                  <div key={key}>
                    <p className="list-group-item list-group-item-warning m-2">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          color: "red"
                        }}
                      >
                        Command:
                      </span>{" "}
                      {msg.replace(/Command/, "")}
                    </p>
                  </div>
                );
              }
              return (
                <div key={key}>
                  <p className="list-group-item list-group-item-primary m-2">
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        color: "blue"
                      }}
                    >
                      OneAI:
                    </span>{" "}
                    {msg}
                  </p>
                </div>
              );
            })}
          </div>
          <form className="m-4" onSubmit={this.commandHandler}>
            <div className="input-group mb-3">
              <input
                type="text"
                onChange={this.changeHandler}
                className="form-control"
                placeholder="Command"
                autoComplete="off"
                name="command"
                value={this.state.input}
                aria-label="Command"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
        <div id="listenButton">
          <button
            className={
              this.state.listening ? "btn btn-danger" : "btn btn-secondary"
            }
            onClick={this.voiceStatusHandler}
          >
            Listen
          </button>
        </div>
      </div>
    );
  }
}

export default VoiceCommands;
