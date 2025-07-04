# Local Surveillance Player

This project provides a simple local web application for viewing sequential
surveillance recordings stored as one-minute `.mp4` files inside folders named
by date (`YYYY-MM-DD`). The player stitches the segments together so they behave
like a single video.

## Requirements

- [Node.js](https://nodejs.org/) 16+.
- Your video files organized in `VIDEO_ROOT/YYYY-MM-DD/HH-mm.mp4`.

## Usage

1. Install dependencies:

   ```sh
   npm install
   ```

2. Place your videos under a directory (e.g. `videos/`). The structure should be:

   ```
   videos/
     2025-06-29/
       00-00.mp4
       00-01.mp4
       ...
   ```

3. Start the server (specify the video root with `VIDEO_ROOT` if different):

   ```sh
   VIDEO_ROOT=videos npm start
   ```

4. Open `http://localhost:3000` in your browser. Choose a date and time to start
   playback. The player will automatically load subsequent minutes as the video
   ends. You can adjust playback speed using the selector.

## Notes

- The server exposes two API endpoints:
  - `GET /api/days` – list available days.
  - `GET /api/day/:day` – list segment URLs for a specific day.
- Only minute-based `.mp4` files are supported. Files are assumed to be named
  in lexicographical order (e.g. `00-00.mp4`, `00-01.mp4`, ...).
