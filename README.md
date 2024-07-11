# Nano TIA

This project provides a minimal setup to get a React application working with Vite, including Hot Module Replacement (HMR).

## Getting Started

### Prerequisites

Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/alansory/nano-tia.git
   cd nano-tia

1. **Install dependencies**

   using npm:
   npm install

### Development
To start the development server with HMR:

  npm run dev

### Build
To build the app for production:

  npm run build


  The output will be in the dist directory.


### Preview
To preview the production build locally:

  npm run preview

## Features

### Front Page
- **Functionality:** Displays a list of posts with their titles and a snippet of the post content.
- **API Endpoint:** [Tech in Asia Posts](https://www.techinasia.com/wp-json/techinasia/2.0/posts)
- **Example:** Tech in Asia

### Single Post Page
- **Functionality:** 
  - Upon clicking a post title on the front page, users are redirected to a single post page.
  - The single post page should be paywalled on the frontend.
  - Users are allowed to view only 5 articles within a month.
  - If the user hits the limit, a portion of the content is blanked out.
- **API Endpoint:** [Tech in Asia Single Post](https://www.techinasia.com/wp-json/techinasia/2.0/posts/google-temasek-digital-economy-report-2018)
- **Example:** Tech in Asia Post

## Implementation Outline

### Front Page

1. **Fetch Posts Data**
   - Use the provided API endpoint to fetch the list of posts.
   - Extract relevant information (title and snippet) for each post.

2. **Display Posts**
   - Create a list to display the titles and snippets.
   - Each title should be a clickable link that redirects to the single post page.

### Single Post Page

1. **Fetch Single Post Data**
   - Use the provided API endpoint to fetch the full content of a single post.
   - Extract and display the full content of the post.

2. **Implement Paywall Logic**
   - Track the number of posts viewed by a user within the current month.
    - Use cookies or local storage to keep track of the count.
   - If the user has viewed 5 or more posts, blank out a portion of the content.
    - Display a message prompting the user to subscribe or wait until the next month.

