import bcrypt from "bcrypt";
import Owner from "../../models/Owner.js";

export const changePasswordController = async (req, res) => {
    try {
        const owner = await changeOwnerPasswordService(
            req.params._id,
            req.body.newPassword
        );
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedOwner = await Owner.findByIdAndUpdate(
                ownerId,
                { password: hashedPassword },
                { new: true }
            );
            if (!updatedOwner) {
                throw new Error("Owner not found");
            }
            return updatedOwner;
        } catch (error) {
            throw new Error("Error changing password: " + error.message);
        }
        res.status(200).json(owner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
