export class Controller {
    static async update(req, res) {
        try {
            return res.send({ success: true });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}