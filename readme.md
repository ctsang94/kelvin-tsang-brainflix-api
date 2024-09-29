## BrainFlix API Documentation

This documentation outlines the BrainFlix API, a backend server that provides data for a video streaming platform. It uses JSON files to store video information and enables interactions through various HTTP methods.

### Inputs

The API accepts inputs via JSON payloads sent with HTTP requests. The specific structure of these payloads depends on the endpoint.

### Outputs

The API returns responses in JSON format, including data and status codes to indicate success or errors. 

### Endpoints

**`/videos`**: 
* **GET**: Returns a list of video data. Each video object includes `id`, `title`, `channel`, and `image` information.

**`/videos/:videoId`**: 
* **GET**: Returns detailed information about a specific video based on its `videoId`. The full video object is returned, including the video URL, timestamp, comments, and more. 

**`/videos`**: 
* **POST**: Adds a new video to the database. The request body should contain `title`, `description`, and `image` data. 

**`/videos/:videoId/comments`**: 
* **POST**: Adds a comment to the video associated with the provided `videoId`. The request body should include the `name` and `comment` text.
