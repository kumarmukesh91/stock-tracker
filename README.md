# Stock Tracker

## Overview

The **Stock Tracker** application is designed to provide real-time updates on stock prices with millisecond-level latency.
It leverages a WebSocket server to stream market data, allowing users to monitor the latest prices of their selected instruments efficiently.

---

## Glossary of Terms

| Term         | Definition                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `ISIN`       | A 12-digit alphanumeric code uniquely identifying a specific financial instrument.                               |
| `Instrument` | A tradable asset, such as a security, commodity, derivative, index, or any item that underlies a derivative.     |
| `Bid`        | The highest price a buyer is willing to pay to purchase a specified quantity of an instrument at any given time. |
| `Ask`        | The lowest price a seller is willing to accept to sell a specified quantity of an instrument at any given time.  |

---

## Usage Instructions

To start the application in development mode and launch the WebSocket server:

```bash
# npm
npm run dev
```

This will start the application in development mode. It will also start the WebSocket server on port 8425.

## Features

The Stock Tracker application supports the following core functionalities:

1.  **Subscription Management:** Users can subscribe or unsubscribe to a list of stocks by their ISIN (https://www.investopedia.com/terms/i/isin.asp).
2.  **Real-Time Updates:** Subscribed stocks display their latest prices, fetched via a WebSocket connection.

## User Stories

- As a user, I should be able to submit an ISIN and it should be added to my watch list.

- As a user, I should not be able to subscribe to the same ISIN twice so that I don’t get confused by seeing multiple versions of the same stock.

- As a user, I should not be able to subscribe to an empty or invalid ISIN.

- **Validation rules:** An ISIN is a 12-character alphanumeric code. It consists of three parts: A two letter country code, a nine character alpha-numeric national security identifier, and a single check digit.
  Example:- US0378331005.

- As a user, I should be able to view a list of my subscribed stocks displaying the latest stock price received from the WebSocket connection so that I can keep track of multiple stocks at the same time.

- As a user, I should be able to unsubscribe from a stock that’s in my watch list so that I can focus on the stocks I’m interested in.

- As a user, I should be notified if the websocket disconnects and the data is not up to date so that I know that the price is not accurate.

- As a user, I should be able to view their stocks on desktop and mobile screen widths so that I am able to use the app on my mobile browser.

---

## Socket Reference

The WebSocket server is started when you run `np run dev`. You can then connect to it at

```URL
ws://localhost:8425/
```

To subscribe to a specific security

```JSON
{
    "subscribe": "${ISIN}"
}
```

To unsubscribe to a specific security

```JSON
{
    "unsubscribe": "${ISIN}"
}
```

#### Sample Request

To subscribe to the BASF instrument you would use

```JSON
{
    "subscribe": "DE000BASF111"
}
```

#### Sample Response

You would then receive a WebSocket stream with messages in the following format

```JSON
{
    "isin": "DE000BASF111",
    "price": 11.316359370403822,
    "bid": 11.306359370403822,
    "ask": 11.326359370403821
}
```

---

## TODO:

1. What potential performance issues might you face when this app scales with multiple (100s) subscriptions ?
2. How would you improve the speed and user experience?
