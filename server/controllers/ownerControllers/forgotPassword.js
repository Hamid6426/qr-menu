import Owner from "../../models/Owner.js";

export const forgotPasswordController = async (req, res) => {
    try {
      try {
        const owner = await Owner.findOne({ email });
        if (!owner) {
          throw new Error("Owner not found");
        }
        // Logic to send password reset email goes here
        return { message: "Password reset email sent" };
      } catch (error) {
        throw new Error("Error handling forgot password: " + error.message);
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };