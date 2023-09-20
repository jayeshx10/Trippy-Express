const express = require('express');
const destinationsRouter = express.Router();
const { createTravelDestination, readTravelDestinationByName, readAllTravelDestinations, readTravelDestinationsByLocation, readTravelDestinationsByRating, updateTravelDestination, deleteTravelDestination, filterDestinationByRating, addReview, getAllReviews } = require('../functions/destinations.functions');

destinationsRouter.get('/', async (req, res) => {
  try {
    const allDestinations = await readAllTravelDestinations();
    if (allDestinations.length > 0) {
      res.status(200).json({ status: 200, message: "Travel destinations found.", data: allDestinations })
    } else {
      res.status(404).json({ status: 404, message: "Travel destinations not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.post('/', async (req, res) => {
  const destinationDetails = req.body;

  if (!destinationDetails) {
    res.status(400).json({ status: 400, message: "Provide travel destination details please." })
  }
  
  try {
    const newDestination = await createTravelDestination(destinationDetails);
    if (newDestination) {
      res.status(201).json({ status: 201, message: "A new travel destination has been created.", data: newDestination })
    } else {
      res.status(400).json({ status: 400, message: "Could not create a new travel destination." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.get('/rating', async (req, res) => {
  try {
    const sortedDestinations = await readTravelDestinationsByRating();
    if (sortedDestinations.length > 0) {
      res.status(200).json({ status: 200, message: "Travel destinations sorted according to rating.", data: sortedDestinations })
    } else {
      res.status(404).json({ status: 404, message: "Travel destinations not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.get('/:destinationName', async (req, res) => {
  const { destinationName } = req.params;
  
  if (!destinationName) {
    res.status(400).json({ status: 400, message: "Specify destination name please." })
  }
  
  try {
    const foundDestination = await readTravelDestinationByName(destinationName);
    if (foundDestination.length > 0) {
      res.status(200).json({ status: 200, message: "Travel destination found.", data: foundDestination })
    } else {
      res.status(404).json({ status: 404, message: "Travel destination not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.get('/location/:location', async (req, res) => {
  const { location } = req.params;

  if (!location) {
    res.status(400).json({ status: 400, message: "Specify location please." })
  }
  
  try {
    const foundDestinations = await readTravelDestinationsByLocation(location);
    if (foundDestinations.length > 0) {
      res.status(200).json({ status: 200, message: "Travel destinations found.", data: foundDestinations })
    } else {
      res.status(404).json({ status: 404, message: "Travel destinations not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.post('/:destinationID', async (req, res) => {
  const { destinationID } = req.params;
  const updatedData = req.body;

  if (!destinationID || !updatedData) {
    res.status(400).json({ status: 400, message: "Provide the Destination ID and the updated data please." })
  }
  
  try {
    const updatedDestination = await updateTravelDestination(destinationID, updatedData);
    if (updatedDestination) {
      res.status(201).json({ status: 200, message: "Travel destination updated successfully.", data: updatedDestination })
    } else {
      res.status(404).json({ status: 404, message: "Travel destination not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.delete('/:destinationID', async (req, res) => {
  const { destinationID } = req.params;

  if (!destinationID) {
    res.status(400).json({ status: 400, message: "Provide Destination ID please." })
  }
  
  try {
    const deletedDestination = await deleteTravelDestination(destinationID);
    if (deletedDestination) {
      res.status(200).json({ status: 200, message: "Travel destination deleted successfully.", data: deletedDestination })
    } else {
      res.status(404).json({ status: 404, message: "Travel destination not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.get('/filter/:minRating', async (req, res) => {
  const { minRating } = req.params;

  if (!minRating) {
    res.status(400).json({ status: 400, message: "Provide minimum rating please." })
  }
  
  try {
    const filteredDestinations = await filterDestinationByRating(minRating);
    if (filteredDestinations.length > 0) {
      res.status(200).json({ status: 200, message: "Travel destinations filtered successfully.", data: filteredDestinations })
    } else {
      res.status(404).json({ status: 404, message: "Travel destinations not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.post('/:destinationID/reviews', async (req, res) => {
  const { destinationID } = req.params;
  const reviewData = req.body;

  if (!destinationID || !reviewData) {
    res.status(400).json({ status: 400, message: "Provide the Destination ID and the review data please." })
  }
  
  try {
    const updatedDestination = await addReview(destinationID, reviewData);
    if (updatedDestination) {
      res.status(200).json({ status: 200, message: "Review added successfully.", data: updatedDestination })
    } else {
      res.status(404).json({ status: 404, message: "Travel destination not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

destinationsRouter.get('/:destinationID/reviews', async (req, res) => {
  const { destinationID } = req.params;

  if (!destinationID) {
    res.status(400).json({ status: 400, message: "Provide the Destination ID please." })
  }
  
  try {
    const allReviews = await getAllReviews(destinationID);
    if (allReviews) {
      res.status(200).json({ status: 200, message: "Reviews fetched successfully.", data: allReviews })
    } else {
      res.status(404).json({ status: 404, message: "Travel Destination not found." })
    }
  }
  catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error."})
  }
})

module.exports = destinationsRouter;