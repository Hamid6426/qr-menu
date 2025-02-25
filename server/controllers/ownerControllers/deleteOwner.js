import Owner from "../../models/Owner.js";

export const deleteOwnerController = async (req, res) => {
    try {
        const owner = await deleteOwnerService(req.params._id);
        try {
            const deletedOwner = await Owner.findByIdAndDelete(ownerId);
            if (!deletedOwner) {
                throw new Error("Owner not found");
            }
            return deletedOwner;
        } catch (error) {
            throw new Error("Error deleting owner: " + error.message);
        }
        res.status(200).json(owner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};