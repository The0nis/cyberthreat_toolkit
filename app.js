const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();
const multer = require("multer"); // Require the multer library to handle file uploads
const upload = multer({ dest: "uploads/" });

// Allow CORS from any origin
const corsOptions = {
  origin: "http://localhost:3000/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

const { dummyNewsfeedData } = require("./dummyData");

// Simulated module settings (replace with your actual data)
const moduleSettings = {
  Newsfeed: {
    enabled: true,
    description: "Newsfeed module description",
  },
  "IOC Analyzer": {
    enabled: false,
    description: "IOC Analyzer module description",
  },
  "Email Analyzer": {
    enabled: true,
    description: "Email Analyzer module description",
  },
  "IOC Extractor": {
    enabled: false,
    description: "IOC Extractor module description",
  },
  "Domain Monitoring": {
    enabled: true,
    description: "Domain Monitoring module description",
  },
  "AI Assistant": {
    enabled: true,
    description: "AI Assistant module description",
  },
  "CVSS Calculator": {
    enabled: false,
    description: "CVSS Calculator module description",
  },
  Rules: {
    enabled: true,
    description: "Rules module description",
  },
  Settings: {
    enabled: true,
    description: "Settings module description",
  },
};

const generalSettings = {
  font: "Arial",
  // Add other general settings properties as needed
};

// Simulated API key state (replace with your actual data)
const apiKeysState = {
  is_active: true, // Change this value based on your API key state
};

// Define a route to get module settings
app.get("/api/settings/modules/", (req, res) => {
  res.json(moduleSettings);
});

// Define a new route to get the state of API keys
app.get("/api/apikeys/is_active", (req, res) => {
  // Respond with the state of API keys
  res.json(apiKeysState);
});

// Define a new route to get a dummy list of RSS feeds
app.get("/api/settings/modules/newsfeed/", (req, res) => {
  // Dummy RSS feed data
  const dummyFeeds = [
    {
      name: "Feed 1",
      url: "https://example.com/feed1",
    },
    {
      name: "Feed 2",
      url: "https://example.com/feed2",
    },
    {
      name: "Feed 3",
      url: "https://example.com/feed3",
    },
    // Add more feeds as needed
  ];

  res.json(dummyFeeds);
});

app.get("/api/settings/general/", (req, res) => {
  // Respond with the general settings data
  res.json([generalSettings]);
});

app.get("/api/newsfeed", (req, res) => {
  // Respond with the dummy newsfeed data
  res.json(dummyNewsfeedData);
});

// Define a route to handle file uploads (proxy)
app.options('/api/mailanalyzer', cors(corsOptions)); // Handle CORS preflight request
app.post('/api/mailanalyzer', cors(corsOptions), async (req, res) => {
  const apiUrl = 'https://eml-analyzer.herokuapp.com/api/analyze/file';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: req.body, // Forward the request body from your frontend
      headers: req.headers, // Forward headers, including any authentication headers
    });

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      console.error('Error in external API:', response.statusText);
      res.status(response.status).json({ error: 'Error in external API' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});


app.get("/api/settings/general/darkmode", (req, res) => {
  const { darkmode } = req.query;

  // You can save the dark mode state in your server or toggle it based on your requirements.
  // For this example, we'll simply respond with a JSON message indicating the current mode.
  if (darkmode === "true") {
    // Save or toggle dark mode to "true"
    res.json({ message: "Dark mode is enabled." });
  } else {
    // Save or toggle dark mode to "false"
    res.json({ message: "Dark mode is disabled." });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
