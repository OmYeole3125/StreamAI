// import prisma from "../config/prismaClient.js";

// // Create Subscription
// export const createSubscription = async (req, res) => {
//     const { streamer_id } = req.body;
//     const user_id = req.userId; // Access the user ID from the request
  
//     if (!user_id) {
//       return res.status(400).json({ message: "User is not authenticated" });
//     }
  
//     try {
//       // Check if the user is already subscribed to the streamer
//       const existingSubscription = await prisma.subscription.findFirst({
//         where: {
//           user_id,
//           streamer_id,
//         },
//       });
  
//       if (existingSubscription) {
//         return res.status(400).json({ message: "Already subscribed to this streamer" });
//       }
  
//       // Create the new subscription
//       const newSubscription = await prisma.subscription.create({
//         data: {
//           user: { connect: { user_id: user_id } },  // Connect the user using `user_id`
//           streamer: { connect: { user_id: streamer_id } },  // Connect the streamer using `user_id`
//         },
//       });
  
//       return res.status(201).json(newSubscription);
  
//     } catch (error) {
//       console.error("Error creating subscription:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
  


// // Get all subscriptions of a user
// export const getUserSubscriptions = async (req, res) => {
//   const user_id = req.userId; // Use req.userId for authenticated user

//   try {
//     const subscriptions = await prisma.subscription.findMany({
//       where: { user_id },
//       include: {
//         streamer: true, // Include streamer info
//       },
//     });

//     return res.status(200).json(subscriptions);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Get all subscribers of a streamer
// export const getStreamerSubscriptions = async (req, res) => {
//   const streamer_id = req.userId; // Use req.userId to get the streamer_id from authenticated user

//   try {
//     const subscribers = await prisma.subscription.findMany({
//       where: { streamer_id },
//       include: {
//         user: true, // Include user info
//       },
//     });

//     return res.status(200).json(subscribers);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Unsubscribe from a streamer
// export const unsubscribe = async (req, res) => {
//   const { streamer_id } = req.body;
//   const user_id = req.userId; // Use req.userId for authenticated user

//   try {
//     const subscription = await prisma.subscription.findFirst({
//       where: {
//         user_id,
//         streamer_id,
//       },
//     });

//     if (!subscription) {
//       return res.status(404).json({ message: "Subscription not found" });
//     }

//     await prisma.subscription.delete({
//       where: {
//         subscription_id: subscription.subscription_id,
//       },
//     });

//     return res.status(200).json({ message: "Successfully unsubscribed" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


import prisma from "../config/prismaClient.js";

// Create Subscription
export const createSubscription = async (req, res) => {
  const { streamer_id } = req.body;
  const user_id = req.userId; // Assuming userId is set correctly after authentication
  
  if (!user_id) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    // Check if the user is already subscribed to the streamer
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        user_id: user_id,
        streamer_id: streamer_id,
      },
    });

    if (existingSubscription) {
      return res.status(400).json({ message: "Already subscribed to this streamer" });
    }

    // Create the new subscription
    const newSubscription = await prisma.subscription.create({
      data: {
        user: { connect: { user_id: user_id } }, // Correctly connect user using `user_id`
        streamer: { connect: { user_id: streamer_id } }, // Correctly connect streamer using `user_id`
      },
    });

    return res.status(201).json(newSubscription);
    
  } catch (error) {
    console.error("Error creating subscription:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all subscriptions of a user
export const getUserSubscriptions = async (req, res) => {
  const user_id = req.userId; // Use req.userId for authenticated user

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { user_id: user_id },
      include: {
        streamer: true, // Include streamer info
      },
    });

    return res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all subscribers of a streamer
export const getStreamerSubscriptions = async (req, res) => {
  const streamer_id = req.userId; // Use req.userId to get the streamer_id from authenticated user

  try {
    const subscribers = await prisma.subscription.findMany({
      where: { streamer_id: streamer_id },
      include: {
        user: true, // Include user info
      },
    });

    return res.status(200).json(subscribers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Unsubscribe from a streamer
export const unsubscribe = async (req, res) => {
  const { streamer_id } = req.body;
  const user_id = req.userId; // Use req.userId for authenticated user

  try {
    // Check if the subscription exists before deleting it
    const subscription = await prisma.subscription.findFirst({
      where: {
        user_id: user_id,
        streamer_id: streamer_id,
      },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Delete the subscription
    await prisma.subscription.delete({
      where: {
        subscription_id: subscription.subscription_id,
      },
    });

    return res.status(200).json({ message: "Successfully unsubscribed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
