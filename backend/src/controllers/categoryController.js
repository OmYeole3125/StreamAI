// import prisma from "../config/prismaClient.js";


// export const createCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     // Validate input
//     if (!name) {
//       return res.status(400).json({ message: "Category name is required." });
//     }

//     // Check if category with the same name already exists
//     const existingCategory = await prisma.category.findUnique({
//       where: { name },
//     });

//     if (existingCategory) {
//       return res.status(400).json({ message: "Category name already exists." });
//     }

//     // Create the category
//     const category = await prisma.category.create({
//       data: {
//         name,
//         description,
//       },
//     });

//     res.status(201).json({ message: "Category created successfully", category });
//   } catch (error) {
//     console.error("Error creating category:", error);

//     // Handle other errors
//     res.status(500).json({ message: "Something went wrong!" });
//   }
// };


import prisma from "../config/prismaClient.js";

// Create a category (Admin only)
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json({ message: "Category created successfully", newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    if (error.code === "P2002") {
      res.status(400).json({ message: "Category with this name already exists." });
    } else {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ message: "Categories fetched successfully", categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { category_id: id },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category fetched successfully", category });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Update a category (Admin only)
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { category_id: id },
    });

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Update category
    const updatedCategory = await prisma.category.update({
      where: { category_id: id },
      data: {
        name: name || existingCategory.name,
        description: description || existingCategory.description,
      },
    });

    res.status(200).json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Delete a category (Admin only)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { category_id: id },
    });

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Delete category
    await prisma.category.delete({
      where: { category_id: id },
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
