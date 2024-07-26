import { Users } from "../models/user.model";

export const getFavCityHandler = async (req, res) => {
  try {
    const user = await Users.findById(req.user);

    if (user) {
      res.json({ city: user.favCity || [] });
    } else {
      res
        .status(404)
        .json({ message: "Something Went Wrong!, Try to Login Again" });
    }
  } catch (error) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

export const addCityToFavouriteHandler = async (req, res) => {
  try {
    const city = req.params.ProductId;

    const user = await Users.findById(req.user);

    if (user) {
      await user.updateOne({ $addToSet: { favCity: city } }); //using $addToSet to store only unique values

      res.status(201).json({ message: "city Added to favourite" });
    } else {
      res.status(404).json({ message: "Invalid User, Ty to Login Again" });
    }
  } catch (error) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

export const removeCityFromFavouriteHandler = async (req, res) => {
  try {
    const city = req.params.ProductId;

    var user = await Users.findById(req.user);

    if (user) {
      await user.updateOne({ $pull: { wishlist: city } });

      res.status(201).json({ message: "city Removed from favourites" });
    } else {
      res.status(404).json({ message: "Invalid User, Try to Login Again" });
    }
  } catch (error) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};