const mongoose = require('mongoose');
const Destination = require('../models/destination.model');

const createTravelDestination = async (data) => {
  try {
    const newDestination = new Destination(data);
    const savedDestination = await newDestination.save();
    return savedDestination;
  }
  catch (error) {
    throw error;
  }
}

const readTravelDestinationByName = async (destinationName) => {
  try {
    const foundDestination = await Destination.find({ name: destinationName });
    return foundDestination;
  }
  catch (error) {
    throw error;
  }
}

const readAllTravelDestinations = async () => {
  try {
    const allDestinations = await Destination.find();
    return allDestinations;
  }
  catch (error) {
    throw error;
  }
}

const readTravelDestinationsByLocation = async (locationName) => {
  try {
    const foundDestinations = await Destination.find({ "location": { $regex: locationName, $options: 'i' } });
    return foundDestinations;
  }
  catch (error) {
    throw error;
  }
}

const readTravelDestinationsByRating = async () => {
  try {
    const allDestinations = await Destination.find();
    return allDestinations.sort((a, b) => b.rating - a.rating);
  }
  catch (error) {
    throw error;
  }
}

const updateTravelDestination = async (destinationID, updatedData) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(destinationID, updatedData, { new: true });
    return updatedDestination;
  }
  catch (error) {
    throw error;
  }
}

const deleteTravelDestination = async (destinationID) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(destinationID);
    return deletedDestination;
  }
  catch (error) {
    throw error;
  }
}

const filterDestinationByRating = async (minRating) => {
  try {
    const filteredDestinations = await Destination.find({ rating: { $gte: minRating } });
    return filteredDestinations;
  }
  catch (error) {
    throw error;
  }
}

const addReview = async (destinationID, reviewData) => {
  try {
    const foundDestination = await Destination.findById(destinationID);

    if (foundDestination) {
      foundDestination.reviews.push(reviewData);
      const updatedDestination = await foundDestination.save();
      return updatedDestination;
    }
    else {
      throw new Error("Could not find the desired destination.");
    }
  }
  catch (error) {
    throw error;
  }
}

const getAllReviews = async (destinationID) => {
  try {
    const foundDestination = await Destination.findById(destinationID);
    if (foundDestination) {
      const destinationWithPopulatedUsers = await foundDestination.populate('reviews.user');
      const allReviews = destinationWithPopulatedUsers.reviews.map((review) => {
        return ({
          user: review.user.name,
          username: review.user.userName,
          reviewText: review.reviewText
        })
      })
      return allReviews;
    } else {
      throw new Error('Could not find the desired destination.')
    }
  }
  catch (error) {
    throw error;
  }
}

module.exports = { createTravelDestination, readTravelDestinationByName, readAllTravelDestinations, readTravelDestinationsByLocation, readTravelDestinationsByRating, updateTravelDestination, deleteTravelDestination, filterDestinationByRating, addReview, getAllReviews }