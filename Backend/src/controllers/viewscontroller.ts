import { Request, Response } from 'express';
import { DbHelper } from '../databasehelpers';


const dbHelper = new DbHelper();

export async function AddView(req: Request, res: Response) {
    try {
        const { Username, Location, Role, ViewText } = req.body;

        if (!Username || !Location || !Role || !ViewText) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        await dbHelper.exec('AddView', {
            Username,
            Location,
            Role,
            ViewText
        });

        res.status(200).json({ message: 'View added successfully' });
    } catch (error) {
        console.error('Error adding view:', error);
        res.status(500).json({ message: 'Failed to add view', error });
    }
}


export class ViewsController {
    async getViews(req: Request, res: Response): Promise<void> {
        try {
            const views = await dbHelper.getViews();
            res.status(200).json(views);
        } catch (err) {
            res.status(500).send(err);
        }
    }

}
