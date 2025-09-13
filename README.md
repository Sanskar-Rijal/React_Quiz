# React Quiz App

This is a simple quiz application built with React. It demonstrates the use of React hooks such as `useReducer` and `useState`, and features a clean, modern UI.

## Features

- Multiple choice questions
- Progress tracking
- Answer validation and feedback
- Responsive design

## ScreenShots
<div align="center">
  <img src="https://i.imgur.com/5rdfn1I.gif" width="500" style="margin: 10px;" />
  <img src="https://i.imgur.com/AJrW3Ot.gif" width="500" style="margin: 10px;" />
  <br>
  <img src="https://i.imgur.com/M4pAl5H.gif" width="500" style="margin: 10px;" />
  <img src="https://i.imgur.com/x9jyNDP.gif" width="500" style="margin: 10px;" />
  <br>
  <img src="https://i.imgur.com/lp255e4.gif" width="500" style="margin: 10px;" />
  <img src="https://i.imgur.com/2S9KP0z.gif" width="500" style="margin: 10px;" />
</div>


## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sanskar-Rijal/React_Quiz
   cd React_Quiz
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

You need to run both the React development server and the questions API server:

1. Start the questions API server (required for quiz data):

   ```bash
   npm run server
   ```

   This will start a local JSON server at `http://localhost:8000/questions`.

2. In another terminal, start the React development server:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## Project Structure

- `src/` - React components and main logic
- `public/` - Static files and HTML template
- `Data/questions.json` - Quiz questions used by the API server

## Customization

You can add or modify questions in `Data/questions.json` or update the UI in the CSS files.
