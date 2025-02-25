export const logoutOwner = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true, // Ensure this is true in production
        sameSite: "Strict",
      });
  
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  