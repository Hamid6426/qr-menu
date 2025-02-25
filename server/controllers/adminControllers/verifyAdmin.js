import { sendAdminConfirmationEmail } from "../../services/emailService";

export const verifyAdmin = async (req, res) => {
    try {
        const { token, accept } = req.query; // Extract verification token & decision

        if (!token) return res.status(400).json({ message: "Invalid request" });

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.email) return res.status(400).json({ message: "Invalid token" });

        // Find the pending admin
        const admin = await Admin.findOne({ email: decoded.email, isVerified: false });
        if (!admin) return res.status(404).json({ message: "Admin not found or already verified" });

        if (accept === "true") {
            // Approve the admin
            admin.isVerified = true;
            admin.verificationToken = null;
            await admin.save();

            // Send confirmation email
            await sendAdminConfirmationEmail(admin.email);

            return res.json({ message: "Admin approved successfully" });
        } else {
            // Reject & delete admin
            await Admin.deleteOne({ email: decoded.email });
            return res.json({ message: "Admin rejected and deleted" });
        }
    } catch (error) {
        console.error("Error verifying admin:", error);
        res.status(500).json({ message: "Server error" });
    }
};
