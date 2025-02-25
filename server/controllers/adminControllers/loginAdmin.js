export const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: "Admin not found" });

      // Check if admin is verified
      if (!admin.isVerified) {
        return res.status(403).json({ message: "Admin not verified. Please wait for approval." });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "12h"
      });
  
      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 12 * 60 * 60 * 1000, // 12 hours
      });
  
      res.json({ message: "Admin login successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
};
