import { animateScroll } from "react-scroll";
import React, { Component } from "react";
import axios from "axios";
export class TextCommands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      messages: [],
      wallets: null,
      status: "findwallet",
      walletToWork: null
    };
  }
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
      messages.push(wallet.name + ". Coins: "+wallet.coins+ ". Wallet ID : " + wallet.seqId);
      return this.setState({ messages });
    });
  };
  answerToCommand = command => {
    let { status, messages, walletToWork } = this.state;
    if (command.includes('exit')||command.includes('cancel')) {
        messages.push("Process cancelled, let's start again. Here is the Wallets:");
        status='findwallet';
       return this.setState({messages, status},this.showWallets())
    }
    if (status === "findwallet") {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/api/walletBySeqId/` + command)
        .then(wallet => {
          messages.push(
            wallet.data.wallet.name +
              " is wallet of " +
              wallet.data.group.name +
              ". They have " +
              wallet.data.wallet.coins +
              " OneCoins in their account. What is your order?"
          );
          status = "waitForCommand";
          return this.setState(
            { walletToWork: wallet.data, messages, status },
            this.scrollToBottom()
          );
        })
        .catch(err => {
          status = "findwallet";
          messages.push(
            "I couldn't find this wallet, can you check the ID again?"
          );
          return this.setState({ messages, status }, this.scrollToBottom());
        });
    }
    if (status === "waitForCommand") {
      if (command.includes("add") || command.includes("give")) {
        messages.push(" How many OneCoin do you want to add?");
        status = "AddAmount";
        return this.setState({ messages, status }, this.scrollToBottom());
      }
      if (command.includes("subtract") || command.includes("take")) {
        messages.push(" How many OneCoin do you want to subtract?");
        status = "SubAmount";
        return this.setState({ messages, status }, this.scrollToBottom());
      }
    }
    if (status === "AddAmount") {
      if (!command.match(/\d+/)) {
        messages.push("Please write an integer..");
        return this.setState({ messages });
      }
      var amount = command.match(/\d+/gi)[0];
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/api/wallet/addOneCoin/${
            walletToWork.wallet._id
          }`,
          { amount }
        )
        .then(result => {
          messages.push(
            `I added ${amount} OneCoin to ${
              walletToWork.wallet.name
            } successfully. And if you want to do something more, here is the wallets:`
          );
          status = "findwallet";
          return this.setState(
            { messages, status },
            this.scrollToBottom(),
            this.showWallets()
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (status === "SubAmount") {
      amount = command.match(/\d+/gi)[0];
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/api/wallet/takeOneCoin/${
            walletToWork.wallet._id
          }`,
          { amount }
        )
        .then(result => {
          messages.push(
            `I subtracted ${amount} OneCoin from ${
              walletToWork.wallet.name
            } successfully. And if you want to do something more, here is the wallets:`
          );
          status = "findwallet";
          return this.setState(
            { messages, status },
            this.scrollToBottom(),
            this.showWallets()
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
      </div>
    );
  }
}

export default TextCommands;
