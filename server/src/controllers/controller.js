export class Controller {
    static async get(req, res) {
        try {
            return res.send({ success: true });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async create(req, res) {
        try {
            return res.send({ success: true });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async getInfo(req, res) {
        try {
            return res.send({ success: true });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async update(req, res) {
        try {
            return res.send({ success: true });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async delete(req, res) {
        try {
            return res.send({ success: true });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}